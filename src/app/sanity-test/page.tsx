'use client';

import { useEffect, useState } from 'react';
import { sanityClient, sanityApi } from '../../lib/sanity';

export default function SanityTest() {
  const [status, setStatus] = useState<{
    connected: boolean;
    error?: string;
    products?: any[];
    categories?: any[];
    blogPosts?: any[];
  }>({ connected: false });

  useEffect(() => {
    async function testConnection() {
      try {
        console.log('Testing Sanity connection...');
        
        // Test basic connection
        const testQuery = '*[_type == "productContent"][0...3]{_id, name, category}';
        const testResult = await sanityClient.fetch(testQuery);
        
        console.log('Sanity test query result:', testResult);
        
        // Test API methods
        const [products, categories, blogPosts] = await Promise.all([
          sanityApi.getAllProducts(),
          sanityApi.getAllCategories(),
          sanityApi.getBlogPosts()
        ]);

        console.log('API results:', { products, categories, blogPosts });

        setStatus({
          connected: true,
          products: Array.isArray(products) ? products : [],
          categories: Array.isArray(categories) ? categories : [],
          blogPosts: Array.isArray(blogPosts) ? blogPosts : []
        });
      } catch (error) {
        console.error('Sanity connection error:', error);
        setStatus({
          connected: false,
          error: error instanceof Error ? error.message : 'Connection failed'
        });
      }
    }

    testConnection();
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8">Sanity CMS Connection Test</h1>
      
      <div className="space-y-6">
        {/* Connection Status */}
        <div className={`p-4 rounded-lg border-2 ${
          status.connected 
            ? 'bg-green-50 border-green-200 text-green-800' 
            : 'bg-red-50 border-red-200 text-red-800'
        }`}>
          <h2 className="text-xl font-semibold mb-2">
            Connection Status: {status.connected ? '✅ Connected' : '❌ Disconnected'}
          </h2>
          {status.error && (
            <p className="text-sm">Error: {status.error}</p>
          )}
        </div>

        {/* Environment Info */}
        <div className="p-4 bg-blue-50 border-2 border-blue-200 rounded-lg">
          <h2 className="text-xl font-semibold mb-2">Environment Configuration</h2>
          <div className="text-sm space-y-1">
            <p>Project ID: {process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}</p>
            <p>Dataset: {process.env.NEXT_PUBLIC_SANITY_DATASET}</p>
            <p>API URL: {process.env.NEXT_PUBLIC_API_URL}</p>
            <p>Node ENV: {process.env.NODE_ENV}</p>
          </div>
        </div>

        {/* Products */}
        {status.products && (
          <div className="p-4 bg-gray-50 border-2 border-gray-200 rounded-lg">
            <h2 className="text-xl font-semibold mb-2">
              Products ({status.products.length})
            </h2>
            {status.products.length > 0 ? (
              <div className="grid gap-2">
                {status.products.slice(0, 5).map((product: any) => (
                  <div key={product._id} className="p-2 bg-white rounded border">
                    <p className="font-medium">{product.name || product.id}</p>
                    <p className="text-sm text-gray-600">Category: {product.category}</p>
                    <p className="text-sm text-gray-500">ID: {product._id}</p>
                  </div>
                ))}
                {status.products.length > 5 && (
                  <p className="text-sm text-gray-500">... and {status.products.length - 5} more</p>
                )}
              </div>
            ) : (
              <p className="text-gray-600">No products found</p>
            )}
          </div>
        )}

        {/* Categories */}
        {status.categories && (
          <div className="p-4 bg-gray-50 border-2 border-gray-200 rounded-lg">
            <h2 className="text-xl font-semibold mb-2">
              Categories ({status.categories.length})
            </h2>
            {status.categories.length > 0 ? (
              <div className="grid gap-2">
                {status.categories.map((category: any) => (
                  <div key={category._id} className="p-2 bg-white rounded border">
                    <p className="font-medium">{category.name}</p>
                    <p className="text-sm text-gray-500">ID: {category._id}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-600">No categories found</p>
            )}
          </div>
        )}

        {/* Blog Posts */}
        {status.blogPosts && (
          <div className="p-4 bg-gray-50 border-2 border-gray-200 rounded-lg">
            <h2 className="text-xl font-semibold mb-2">
              Blog Posts ({status.blogPosts.length})
            </h2>
            {status.blogPosts.length > 0 ? (
              <div className="grid gap-2">
                {status.blogPosts.slice(0, 3).map((post: any) => (
                  <div key={post._id} className="p-2 bg-white rounded border">
                    <p className="font-medium">{post.title}</p>
                    <p className="text-sm text-gray-500">ID: {post._id}</p>
                  </div>
                ))}
                {status.blogPosts.length > 3 && (
                  <p className="text-sm text-gray-500">... and {status.blogPosts.length - 3} more</p>
                )}
              </div>
            ) : (
              <p className="text-gray-600">No blog posts found</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}