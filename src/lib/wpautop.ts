// Port of WordPress core wpautop() (wp-includes/formatting.php), used to render migrated
// post_content / term descriptions with the same paragraph structure WordPress produced.
// The text itself is never altered; only <p>/<br> wrapping is added.

const ALL_BLOCKS =
  '(?:table|thead|tfoot|caption|col|colgroup|tbody|tr|td|th|div|dl|dd|dt|ul|ol|li|pre|form|map|area|blockquote|address|style|p|h[1-6]|hr|fieldset|legend|section|article|aside|hgroup|header|footer|nav|figure|figcaption|details|menu|summary)';

export function wpautop(input: string, br = true): string {
  if (!input || input.trim() === '') return '';
  let text = input + '\n';
  const preTags: Record<string, string> = {};

  if (text.includes('<pre')) {
    const parts = text.split('</pre>');
    const last = parts.pop() as string;
    text = '';
    parts.forEach((part, i) => {
      const start = part.indexOf('<pre');
      if (start === -1) {
        text += part;
        return;
      }
      const name = `<pre wp-pre-tag-${i}></pre>`;
      preTags[name] = part.slice(start) + '</pre>';
      text += part.slice(0, start) + name;
    });
    text += last;
  }

  text = text.replace(/<br\s*\/?>\s*<br\s*\/?>/g, '\n\n');
  text = text.replace(new RegExp(`(<${ALL_BLOCKS}[\\s/>])`, 'g'), '\n\n$1');
  text = text.replace(new RegExp(`(</${ALL_BLOCKS}>)`, 'g'), '$1\n\n');
  text = text.replace(/<hr\s*?\/?>/g, '<hr />\n\n');
  text = text.replace(/\r\n|\r/g, '\n');

  // Keep newlines inside tags (and comments) from being treated as paragraph breaks
  text = text.replace(/<[^>]*>/g, (tag) => tag.replace(/\n/g, ' <!-- wpnl --> '));

  if (text.includes('<option')) {
    text = text.replace(/\s*<option/g, '<option').replace(/<\/option>\s*/g, '</option>');
  }
  if (text.includes('</object>')) {
    text = text.replace(/(<object[^>]*>)\s*/g, '$1').replace(/\s*<\/object>/g, '</object>');
    text = text.replace(/\s*(<\/?(?:param|embed)[^>]*>)\s*/g, '$1');
  }
  if (text.includes('<source') || text.includes('<track')) {
    text = text.replace(/([<\[](?:audio|video)[^>\]]*[>\]])\s*/g, '$1');
    text = text.replace(/\s*([<\[]\/(?:audio|video)[>\]])/g, '$1');
    text = text.replace(/\s*(<(?:source|track)[^>]*>)\s*/g, '$1');
  }
  if (text.includes('<figcaption')) {
    text = text.replace(/\s*(<figcaption[^>]*>)/g, '$1').replace(/<\/figcaption>\s*/g, '</figcaption>');
  }

  text = text.replace(/\n\n+/g, '\n\n');
  const paragraphs = text.split(/\n\s*\n/).filter((t) => t !== '');
  text = '';
  for (const p of paragraphs) text += '<p>' + p.replace(/^\n*|\n*$/g, '') + '</p>\n';

  text = text.replace(/<p>\s*<\/p>/g, '');
  text = text.replace(/<p>([^<]+)<\/(div|address|form)>/g, '<p>$1</p></$2>');
  text = text.replace(new RegExp(`<p>\\s*(</?${ALL_BLOCKS}[^>]*>)\\s*</p>`, 'g'), '$1');
  text = text.replace(/<p>(<li.+?)<\/p>/g, '$1');
  text = text.replace(/<p><blockquote([^>]*)>/gi, '<blockquote$1><p>');
  text = text.replace(/<\/blockquote><\/p>/g, '</p></blockquote>');
  text = text.replace(new RegExp(`<p>\\s*(</?${ALL_BLOCKS}[^>]*>)`, 'g'), '$1');
  text = text.replace(new RegExp(`(</?${ALL_BLOCKS}[^>]*>)\\s*</p>`, 'g'), '$1');

  if (br) {
    text = text.replace(/<(script|style|svg|math)[\s\S]*?<\/\1>/g, (m) => m.replace(/\n/g, '<WPPreserveNewline />'));
    text = text.replace(/<br>|<br\/>/g, '<br />');
    text = text.replace(/(<br \/>)?\s*\n/g, (m, b) => (b ? m : '<br />\n'));
    text = text.replace(/<WPPreserveNewline \/>/g, '\n');
  }

  text = text.replace(new RegExp(`(</?${ALL_BLOCKS}[^>]*>)\\s*<br />`, 'g'), '$1');
  text = text.replace(/<br \/>(\s*<\/?(?:p|li|div|dl|dd|dt|th|pre|td|ul|ol)[^>]*>)/g, '$1');
  text = text.replace(/\n<\/p>$/g, '</p>');

  for (const [name, html] of Object.entries(preTags)) text = text.replace(name, html);
  if (text.includes('<!-- wpnl -->')) text = text.replace(/ <!-- wpnl --> |<!-- wpnl -->/g, '\n');

  return text;
}

// Subset of WordPress wptexturize(): single quotes/apostrophes in text (not inside tags).
// Migrated copy contains no double quotes, dashes or ellipses, so only these rules apply.
export function wptexturizeQuotes(html: string): string {
  return html
    .split(/(<[^>]*>)/)
    .map((part) =>
      part.startsWith('<')
        ? part
        : part
            .replace(/(\w)'(\w)/g, '$1’$2') // it's, India's
            .replace(/(^|[\s(\[{"-])'(?=\S)/g, '$1‘') // opening quote
            .replace(/'/g, '’') // closing quote / trailing apostrophe
    )
    .join('');
}

// Empty <p><br></p> spacers left between list items are invalid list children (a11y "list" rule).
const EMPTY_P = String.raw`\s*<p>(?:\s|&nbsp;|</?br\s*/?>)*</p>`;
const stripEmptyListParagraphs = (html: string) =>
  html.replace(new RegExp(String.raw`(<(?:ul|ol)\b[^>]*>|</li>)(?:${EMPTY_P})+`, 'g'), '$1');

export function renderWpContent(raw: string | null | undefined): string {
  return stripEmptyListParagraphs(wptexturizeQuotes(wpautop(raw || '')));
}
