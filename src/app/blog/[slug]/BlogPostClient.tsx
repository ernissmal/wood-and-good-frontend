'use client';

import { useSanityBlogPost } from '../../../hooks/sanity';
import { useSanityBlogPosts } from '../../../hooks/sanity';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { notFound } from 'next/navigation';

interface BlogPostClientProps {
  slug: string;
}

export default function BlogPostClient({ slug }: BlogPostClientProps) {
  const { post, loading, error } = useSanityBlogPost(slug);
  const { posts: relatedPosts } = useSanityBlogPosts();

  // Debug logging
  useEffect(() => {
    console.log('BlogPostClient Debug:', {
      slug,
      post,
      loading,
      error
    });
  }, [slug, post, loading, error]);

  // If post is not found and not loading, show 404
  useEffect(() => {
    if (!loading && !post && !error) {
      console.log('Blog post not found, calling notFound()');
      // notFound(); // Temporarily disabled for debugging
    }
  }, [loading, post, error]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Breadcrumb skeleton */}
          <div className="mb-8">
            <div className="flex items-center space-x-2 text-sm">
              <div className="bg-oak-200 rounded w-16 h-4 animate-pulse"></div>
              <span className="text-oak-400">/</span>
              <div className="bg-oak-200 rounded w-20 h-4 animate-pulse"></div>
              <span className="text-oak-400">/</span>
              <div className="bg-oak-200 rounded w-32 h-4 animate-pulse"></div>
            </div>
          </div>

          {/* Article header skeleton */}
          <div className="mb-8">
            <div className="bg-oak-200 rounded w-3/4 h-10 mb-4 animate-pulse"></div>
            <div className="bg-oak-200 rounded w-1/2 h-6 mb-6 animate-pulse"></div>
            <div className="aspect-video bg-oak-200 rounded-lg animate-pulse"></div>
          </div>

          {/* Content skeleton */}
          <div className="space-y-4">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-oak-200 rounded w-full h-4 animate-pulse"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-600 mb-4">
            <p className="text-xl font-semibold">Error loading blog post</p>
            <p className="text-sm">{error}</p>
          </div>
          <Link
            href="/blog"
            className="inline-block bg-oak-600 text-white px-6 py-2 rounded-lg hover:bg-oak-700 transition-colors"
          >
            Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center bg-white p-8 rounded-lg shadow-md">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Debug Information</h1>
          <div className="text-left">
            <p><strong>Slug:</strong> {slug}</p>
            <p><strong>Loading:</strong> {loading ? 'true' : 'false'}</p>
            <p><strong>Error:</strong> {error || 'none'}</p>
            <p><strong>Post:</strong> {post ? 'found' : 'not found'}</p>
          </div>
        </div>
      </div>
    );
  }

  // Get related posts (same categories, exclude current post)
  const relatedPostsFiltered = relatedPosts
    ?.filter((p: any) => p._id !== post._id)
    ?.slice(0, 3) || [];

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Render portable text content
  const renderPortableText = (content: any[]) => {
    if (!Array.isArray(content)) return null;
    
    return content.map((block: any, index: number) => {
      if (block._type === 'block') {
        const Tag = block.style === 'h1' ? 'h1' : 
                   block.style === 'h2' ? 'h2' : 
                   block.style === 'h3' ? 'h3' : 'p';
        
        const className = block.style === 'h1' ? 'text-3xl font-bold text-oak-800 mb-6 mt-8' :
                         block.style === 'h2' ? 'text-2xl font-bold text-oak-800 mb-4 mt-6' :
                         block.style === 'h3' ? 'text-xl font-semibold text-oak-800 mb-3 mt-5' :
                         'text-oak-700 leading-relaxed mb-4';

        return (
          <Tag key={block._key || index} className={className}>
            {block.children?.map((child: any) => child.text).join('') || ''}
          </Tag>
        );
      }
      
      if (block._type === 'image' && block.asset) {
        return (
          <div key={block._key || index} className="my-8">
            <img
              src={block.asset.url}
              alt={block.alt || 'Blog post image'}
              className="w-full rounded-lg shadow-md"
            />
            {block.caption && (
              <p className="text-sm text-oak-600 text-center mt-2 italic">
                {block.caption}
              </p>
            )}
          </div>
        );
      }
      
      return null;
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <div className="flex items-center space-x-2 text-sm text-oak-600">
            <Link href="/" className="hover:text-oak-800">Home</Link>
            <span>/</span>
            <Link href="/blog" className="hover:text-oak-800">Blog</Link>
            <span>/</span>
            <span className="text-oak-800 font-medium">{post.title}</span>
          </div>
        </nav>

        {/* Article Header */}
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-oak-800 mb-4">{post.title}</h1>
          
          {/* Article Meta */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-oak-600 mb-6">
            {post.publishedAt && (
              <time dateTime={post.publishedAt}>
                {formatDate(post.publishedAt)}
              </time>
            )}
            
            {post.author && (
              <span>By {post.author}</span>
            )}
            
            {post.categories && post.categories.length > 0 && (
              <div className="flex gap-2">
                {post.categories.map((category: any, index: number) => (
                  <span
                    key={index}
                    className="bg-oak-100 text-oak-800 px-2 py-1 rounded-full text-xs"
                  >
                    {category.title}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Featured Image */}
          {post.imageUrl && (
            <div className="aspect-video mb-8 overflow-hidden rounded-lg shadow-md">
              <img
                src={post.imageUrl}
                alt={post.imageAlt || post.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {/* Excerpt */}
          {post.excerpt && (
            <div className="bg-oak-50 border-l-4 border-oak-600 p-4 mb-8">
              <p className="text-lg text-oak-700 italic">{post.excerpt}</p>
            </div>
          )}
        </header>

        {/* Article Content */}
        <article className="prose prose-oak max-w-none">
          <div className="bg-white rounded-lg shadow-sm p-8">
            {post.content && renderPortableText(post.content)}
          </div>
        </article>

        {/* Article Footer */}
        <footer className="mt-12 pt-8 border-t border-oak-200">
          <div className="flex flex-wrap justify-between items-center gap-4">
            <Link
              href="/blog"
              className="inline-flex items-center text-oak-600 hover:text-oak-800 transition-colors"
            >
              ← Back to Blog
            </Link>
            
            <div className="flex gap-3">
              <button
                onClick={() => {
                  if (navigator.share) {
                    navigator.share({
                      title: post.title,
                      text: post.excerpt,
                      url: window.location.href,
                    });
                  } else {
                    navigator.clipboard.writeText(window.location.href);
                    alert('Link copied to clipboard!');
                  }
                }}
                className="bg-oak-600 text-white px-4 py-2 rounded-lg hover:bg-oak-700 transition-colors text-sm"
              >
                Share
              </button>
            </div>
          </div>
        </footer>

        {/* Related Posts */}
        {relatedPostsFiltered.length > 0 && (
          <section className="mt-16">
            <h2 className="text-2xl font-bold text-oak-800 mb-8">Related Articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedPostsFiltered.map((relatedPost: any) => (
                <Link
                  key={relatedPost._id}
                  href={`/blog/${relatedPost.slug?.current}`}
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                >
                  <div className="aspect-video bg-oak-50 flex items-center justify-center">
                    {relatedPost.imageUrl ? (
                      <img
                        src={relatedPost.imageUrl}
                        alt={relatedPost.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="text-oak-400 text-3xl">📝</div>
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-oak-800 mb-2 line-clamp-2">
                      {relatedPost.title}
                    </h3>
                    {relatedPost.excerpt && (
                      <p className="text-sm text-oak-600 line-clamp-3 mb-2">
                        {relatedPost.excerpt}
                      </p>
                    )}
                    {relatedPost.publishedAt && (
                      <time className="text-xs text-oak-500">
                        {formatDate(relatedPost.publishedAt)}
                      </time>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Newsletter Signup */}
        <section className="mt-16 bg-oak-800 text-white rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Stay Updated</h2>
          <p className="text-oak-200 mb-6 max-w-2xl mx-auto">
            Subscribe to our newsletter for more insights about woodworking, furniture care, 
            and behind-the-scenes stories from our workshop.
          </p>
          <div className="max-w-md mx-auto flex gap-4">
            <input 
              type="email" 
              placeholder="Enter your email" 
              className="flex-1 px-4 py-2 rounded-md text-oak-800 focus:outline-none focus:ring-2 focus:ring-oak-500"
            />
            <button className="bg-oak-600 hover:bg-oak-700 px-6 py-2 rounded-md font-medium transition-colors">
              Subscribe
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}