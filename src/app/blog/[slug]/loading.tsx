export default function Loading() {
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
        <div className="bg-white rounded-lg shadow-sm p-8">
          <div className="space-y-4">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="bg-oak-200 rounded w-full h-4 animate-pulse"></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}