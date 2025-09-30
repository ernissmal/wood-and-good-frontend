// Server component for static generation
export async function generateStaticParams() {
  // Return empty array for now - no dynamic routes to pre-generate
  return [];
}

// Server component - no 'use client' needed
export default function ProductDetailPage() {
  return (
    <div className="min-h-screen bg-oak-50 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-oak-800 mb-4">Product Details</h1>
        <p className="text-oak-600">Coming Soon</p>
        <div className="mt-6">
          <a
            href="/products"
            className="bg-oak-600 text-white px-6 py-3 rounded-lg hover:bg-oak-700 transition-colors inline-block"
          >
            Browse All Products
          </a>
        </div>
      </div>
    </div>
  );
}