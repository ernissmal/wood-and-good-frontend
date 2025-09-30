import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <div className="text-8xl mb-4">🔍</div>
        <h1 className="text-3xl font-bold text-oak-800 mb-4">Product Not Found</h1>
        <p className="text-oak-600 mb-8 max-w-md">
          The product you're looking for doesn't exist or may have been removed from our catalog.
        </p>
        <div className="flex gap-4 justify-center">
          <Link
            href="/products"
            className="bg-oak-600 text-white px-6 py-3 rounded-lg hover:bg-oak-700 transition-colors font-medium"
          >
            Browse All Products
          </Link>
          <Link
            href="/"
            className="border border-oak-300 text-oak-800 px-6 py-3 rounded-lg hover:bg-oak-50 transition-colors font-medium"
          >
            Go Home
          </Link>
        </div>
      </div>
    </div>
  );
}