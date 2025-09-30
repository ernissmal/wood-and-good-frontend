import { sanityApi } from '../../../lib/sanity';
import BlogPostClient from './BlogPostClient';

interface BlogPostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

// Generate static paths for all blog posts (required for static export)
export async function generateStaticParams() {
  try {
    const posts = await sanityApi.getBlogPosts();
    if (!posts || !Array.isArray(posts)) {
      return [];
    }
    
    return posts.map((post: any) => {
      console.log('Generating static param for blog post:', { slug: post.slug?.current, title: post.title });
      return { slug: post.slug?.current };
    }).filter(param => param.slug); // Filter out posts without slugs
  } catch (error) {
    console.error('Error generating static params for blog posts:', error);
    return [];
  }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  return <BlogPostClient slug={slug} />;
}