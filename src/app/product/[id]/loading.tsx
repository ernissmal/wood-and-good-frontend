export default function Loading() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb skeleton */}
        <div className="mb-8">
          <div className="flex items-center space-x-2 text-sm">
            <div className="bg-oak-200 rounded w-16 h-4 animate-pulse"></div>
            <span className="text-oak-400">/</span>
            <div className="bg-oak-200 rounded w-20 h-4 animate-pulse"></div>
            <span className="text-oak-400">/</span>
            <div className="bg-oak-200 rounded w-24 h-4 animate-pulse"></div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product images skeleton */}
          <div>
            <div className="aspect-square bg-oak-200 rounded-lg mb-4 animate-pulse"></div>
            <div className="grid grid-cols-4 gap-2">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="aspect-square bg-oak-200 rounded animate-pulse"></div>
              ))}
            </div>
          </div>

          {/* Product info skeleton */}
          <div>
            <div className="bg-oak-200 rounded w-3/4 h-8 mb-4 animate-pulse"></div>
            <div className="bg-oak-200 rounded w-1/4 h-6 mb-6 animate-pulse"></div>
            <div className="bg-oak-200 rounded w-full h-20 mb-6 animate-pulse"></div>
            <div className="bg-oak-200 rounded w-1/3 h-10 mb-6 animate-pulse"></div>
            
            {/* Specifications skeleton */}
            <div className="bg-white rounded-lg p-4 shadow-sm mb-6">
              <div className="bg-oak-200 rounded w-32 h-5 mb-3 animate-pulse"></div>
              <div className="grid grid-cols-2 gap-4">
                {[...Array(4)].map((_, i) => (
                  <div key={i}>
                    <div className="bg-oak-200 rounded w-20 h-4 mb-1 animate-pulse"></div>
                    <div className="bg-oak-200 rounded w-16 h-3 animate-pulse"></div>
                  </div>
                ))}
              </div>
            </div>

            {/* Add to cart skeleton */}
            <div className="border-t pt-6">
              <div className="flex items-center gap-4 mb-4">
                <div>
                  <div className="bg-oak-200 rounded w-16 h-4 mb-1 animate-pulse"></div>
                  <div className="bg-oak-200 rounded w-20 h-10 animate-pulse"></div>
                </div>
              </div>
              <div className="bg-oak-200 rounded w-full h-12 animate-pulse"></div>
            </div>
          </div>
        </div>

        {/* Related products skeleton */}
        <section className="mt-16">
          <div className="bg-oak-200 rounded w-48 h-8 mb-8 animate-pulse"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="aspect-square bg-oak-200 animate-pulse"></div>
                <div className="p-4">
                  <div className="bg-oak-200 rounded w-3/4 h-4 mb-2 animate-pulse"></div>
                  <div className="bg-oak-200 rounded w-1/2 h-3 mb-2 animate-pulse"></div>
                  <div className="bg-oak-200 rounded w-1/3 h-5 animate-pulse"></div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}