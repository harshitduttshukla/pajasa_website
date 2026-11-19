import { parse, HTMLElement, Node, NodeType } from 'node-html-parser';
import { renderWpContent } from './wpautop';

/**
 * Turns a city's free-form (WordPress) description HTML into structured
 * sections so the page can lay each part out with a fitting design
 * (cards, checklists, split rows, FAQs...) instead of one long text wall.
 */

export type Block =
  | { kind: 'html'; html: string }
  | { kind: 'features'; items: { title: string; html: string }[] }
  | { kind: 'checklist'; items: string[] }
  | { kind: 'table'; html: string };

export interface Group {
  title: string;
  blocks: Block[];
  textLength: number;
}

export interface Section {
  id: string;
  title: string;
  intro: Block[];
  groups: Group[];
  /** H3 headings with no body text (keyword lists) */
  chips: string[];
}

const WRAPPERS = new Set(['div', 'section', 'article', 'span', 'main', 'font', 'center']);
const HEADINGS = /^h[1-6]$/;

function cleanTitle(s: string): string {
  return s.replace(/\s+/g, ' ').replace(/[\s:–-]+$/, '').trim();
}

function slugify(s: string): string {
  return s.toLowerCase().replace(/&amp;/g, 'and').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 60);
}

function stripJunkAttrs(html: string): string {
  return html.replace(/\s(class|dir|style|data-[\w-]+)="[^"]*"/g, '');
}

function containsHeading(el: HTMLElement): boolean {
  return el.querySelector('h1, h2, h3, h4') !== null;
}

/** Remove wrapper divs and lists that only exist to hold headings. */
function flatten(nodes: Node[], out: Node[] = []): Node[] {
  for (const n of nodes) {
    if (n.nodeType === NodeType.TEXT_NODE) {
      if (n.text.trim()) out.push(parse(`<p>${n.toString().trim()}</p>`).firstChild!);
      continue;
    }
    if (n.nodeType !== NodeType.ELEMENT_NODE) continue;
    const el = n as HTMLElement;
    const tag = el.tagName.toLowerCase();
    if (WRAPPERS.has(tag) && (tag !== 'span' || containsHeading(el))) {
      flatten(el.childNodes, out);
    } else if ((tag === 'ul' || tag === 'ol') && containsHeading(el)) {
      for (const li of el.childNodes) {
        if (li.nodeType === NodeType.ELEMENT_NODE) flatten((li as HTMLElement).childNodes, out);
      }
    } else if (tag === 'p' && !el.text.trim() && !el.querySelector('img')) {
      // drop empty paragraphs
    } else {
      out.push(el);
    }
  }
  return out;
}

function toBlock(el: HTMLElement): Block {
  const tag = el.tagName.toLowerCase();
  const html = stripJunkAttrs(el.toString());
  if (tag === 'table') return { kind: 'table', html };
  if (tag === 'ul' || tag === 'ol') {
    const lis = el.childNodes.filter(
      (c): c is HTMLElement => c.nodeType === NodeType.ELEMENT_NODE && (c as HTMLElement).tagName === 'LI',
    );
    if (lis.length >= 3) {
      // "<li><strong>Title:</strong> text</li>" → feature cards
      const withLead = lis.filter((li) => {
        const first = li.childNodes.find((c) => c.nodeType !== NodeType.TEXT_NODE || c.text.trim());
        return first instanceof HTMLElement && ['STRONG', 'B'].includes(first.tagName) && first.text.trim().length < 70;
      });
      if (withLead.length / lis.length >= 0.6) {
        return {
          kind: 'features',
          items: lis.map((li) => {
            const first = li.childNodes.find((c) => c.nodeType !== NodeType.TEXT_NODE || c.text.trim());
            if (first instanceof HTMLElement && ['STRONG', 'B'].includes(first.tagName)) {
              const title = cleanTitle(first.text);
              first.remove();
              return { title, html: stripJunkAttrs(li.innerHTML).trim().replace(/^[:\s–-]+/, '') };
            }
            return { title: '', html: stripJunkAttrs(li.innerHTML) };
          }),
        };
      }
      if (lis.every((li) => li.text.trim().length <= 140)) {
        return { kind: 'checklist', items: lis.map((li) => stripJunkAttrs(li.innerHTML).trim()) };
      }
    }
  }
  return { kind: 'html', html };
}

export function parseCityContent(raw: string | null | undefined): { lead: Block[]; sections: Section[] } {
  const html = renderWpContent(raw);
  if (!html.trim()) return { lead: [], sections: [] };

  const nodes = flatten(parse(html).childNodes);
  const lead: Block[] = [];
  const sections: Section[] = [];
  const usedIds = new Set<string>();
  let section: Section | null = null;
  let group: Group | null = null;

  const newSection = (title: string) => {
    let id = slugify(title) || `section-${sections.length + 1}`;
    while (usedIds.has(id)) id += '-2';
    usedIds.add(id);
    section = { id, title, intro: [], groups: [], chips: [] };
    sections.push(section);
    group = null;
  };

  for (const n of nodes) {
    const el = n as HTMLElement;
    const tag = el.tagName.toLowerCase();
    if (HEADINGS.test(tag)) {
      const title = cleanTitle(el.text);
      if (!title) continue;
      if (tag === 'h1' || tag === 'h2') {
        newSection(title);
      } else {
        if (!section) newSection(title);
        group = { title, blocks: [], textLength: 0 };
        section!.groups.push(group);
      }
      continue;
    }
    const block = toBlock(el);
    if (group) {
      (group as Group).blocks.push(block);
      (group as Group).textLength += el.text.trim().length;
    } else if (section) {
      (section as Section).intro.push(block);
    } else {
      lead.push(block);
    }
  }

  // H3s without body text are keyword headings: show them as chips.
  for (const s of sections) {
    s.chips = s.groups.filter((g) => g.textLength === 0).map((g) => g.title);
    s.groups = s.groups.filter((g) => g.textLength > 0);
  }

  return { lead, sections: sections.filter((s) => s.intro.length || s.groups.length || s.chips.length) };
}

export type SectionLayout = 'faq' | 'cards' | 'columns' | 'split' | 'stack';

/** Pick a layout from the shape of the content; `seed` varies designs between cities. */
export function pickLayout(s: Section, seed: number): SectionLayout {
  const g = s.groups;
  if (g.length === 0) return 'stack';
  if (g.length >= 2 && g.filter((x) => x.title.trim().endsWith('?')).length / g.length >= 0.6) return 'faq';
  const avg = g.reduce((a, x) => a + x.textLength, 0) / g.length;
  if (g.length >= 3 && avg < 650) return seed % 2 === 0 ? 'cards' : 'columns';
  if (g.length >= 2 && avg < 1400) return seed % 3 === 0 ? 'columns' : 'split';
  return 'split';
}
