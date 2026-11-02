import type { Metadata } from 'next';
import { fetchBlogBySlug } from '@/lib/api';

// page.tsx is a client component, so the tab title is set here.
// Matches the original site's Yoast post title template: "%%title%% By PAJASA".
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  try {
    const blog = await fetchBlogBySlug(slug);
    return { title: { absolute: `${blog.title} By PAJASA` } };
  } catch {
    return {};
  }
}

export default function BlogDetailLayout({ children }: { children: React.ReactNode }) {
  return children;
}
