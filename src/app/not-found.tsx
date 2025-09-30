export default function Custom404() {
  return (
    <div className="min-h-screen bg-oak-50 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-oak-800 mb-4">404</h1>
        <h2 className="text-xl font-semibold text-oak-700 mb-4">Page Not Found</h2>
        <p className="text-oak-600 mb-8">
          The page you are looking for could not be found.
        </p>
        <div className="space-x-4">
          <a
            href="/"
            className="bg-oak-600 text-white px-6 py-3 rounded-lg hover:bg-oak-700 transition-colors inline-block"
          >
            Go Home
          </a>
          <a
            href="/products"
            className="bg-white text-oak-600 px-6 py-3 rounded-lg border border-oak-300 hover:bg-oak-50 transition-colors inline-block"
          >
            Browse Products
          </a>
        </div>
      </div>
    </div>
  );
}