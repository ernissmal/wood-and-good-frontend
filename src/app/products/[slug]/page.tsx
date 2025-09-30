import ProductDetailClient from './ProductDetailClient';

// This function is required for static export
export async function generateStaticParams() {
  // For now, return an empty array to prevent build errors
  // In production, you would fetch all product slugs from your CMS
  return [];
}

export default function ProductDetailPage() {
  return <ProductDetailClient />;
}
  const params = useParams();
  const productId = params.slug as string; // Using slug as product ID for now
  const [product, setProduct] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  
  const { addToCart, loading: cartLoading } = useCart();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Fetch product from Sanity by ID
        const productData = await sanityApi.getProductById(productId);
        
        if (!productData) {
          throw new Error('Product not found');
        }
        
        setProduct(productData);
        
      } catch (err) {
        console.error('Error fetching product:', err);
        setError(err instanceof Error ? err.message : 'Failed to load product');
      } finally {
        setLoading(false);
      }
    };

    if (productId) {
      fetchProduct();
    }
  }, [productId]);

  const handleAddToCart = async () => {
    if (!product) return;
    
    try {
      // Add product to local storage cart for now
      const cart = JSON.parse(localStorage.getItem('wood_good_cart') || '[]');
      const existingItem = cart.find((item: any) => item.id === product.id);
      
      if (existingItem) {
        existingItem.quantity += selectedQuantity;
      } else {
        cart.push({
          id: product.id,
          name: product.name,
          price: product.price,
          quantity: selectedQuantity,
          image: product.images?.[0] || null,
          category: product.category
        });
      }
      
      localStorage.setItem('wood_good_cart', JSON.stringify(cart));
      
      // Show success feedback (you can replace with a toast notification later)
      alert(`Added ${selectedQuantity} × ${product.name} to cart!`);
      
      console.log('Added to cart:', product.name, selectedQuantity, `€${product.price}`);
    } catch (err) {
      console.error('Failed to add to cart:', err);
      alert('Failed to add to cart. Please try again.');
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('lv-LV', {
      style: 'currency',
      currency: 'EUR',
    }).format(price);
  };

  const productImages = product?.images || [];

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <LoadingSpinner size="large" />
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4 text-oak-600 flex justify-center">
            <SentimentDissatisfied sx={{ fontSize: 72 }} />
          </div>
          <h1 className="text-2xl font-bold text-oak-800 mb-2">Product Not Found</h1>
          <p className="text-oak-600 mb-6">The product you're looking for doesn't exist or has been moved.</p>
          <Link 
            href="/products"
            className="bg-oak-600 hover:bg-oak-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
          >
            Browse All Products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <section className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex text-sm">
            <Link href="/" className="text-oak-600 hover:text-oak-800">Home</Link>
            <span className="mx-2 text-gray-400">/</span>
            <Link href="/products" className="text-oak-600 hover:text-oak-800">Products</Link>
            {product?.category && (
              <>
                <span className="mx-2 text-gray-400">/</span>
                <Link 
                  href={`/categories/${product.category}`} 
                  className="text-oak-600 hover:text-oak-800"
                >
                  {product.category}
                </Link>
              </>
            )}
            <span className="mx-2 text-gray-400">/</span>
            <span className="text-gray-900">{product?.name}</span>
          </nav>
        </div>
      </section>

      {/* Product Details */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            
            {/* Product Images */}
            <div>
              <div className="aspect-square bg-white rounded-lg shadow-md overflow-hidden mb-4">
                {productImages && productImages.length > 0 ? (
                  <img
                    src={productImages[selectedImage]}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-oak-50">
                    <div className="text-oak-400 text-8xl">
                      <TableBar sx={{ fontSize: 96 }} />
                    </div>
                  </div>
                )}
              </div>
              
              {/* Thumbnail Gallery (when multiple images available) */}
              {productImages && productImages.length > 1 && (
                <div className="flex space-x-2">
                  {productImages.map((image: string, index: number) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`aspect-square w-20 rounded-lg overflow-hidden border-2 transition-colors ${
                        selectedImage === index ? 'border-oak-600' : 'border-gray-200'
                      }`}
                    >
                      <img
                        src={image}
                        alt={`${product.name} view ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Information */}
            <div>
              {product?.featured && (
                <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-amber-100 text-amber-800 mb-4">
                  <Star className="text-amber-600 mr-1" sx={{ fontSize: 16 }} />
                  Featured Product
                </div>
              )}
              
              <h1 className="text-4xl font-bold text-oak-800 mb-4">{product?.name}</h1>
              
              {product?.category && (
                <Link 
                  href={`/categories/${product.category}`}
                  className="text-oak-600 hover:text-oak-800 font-medium mb-4 inline-block"
                >
                  {product.category} →
                </Link>
              )}
              
              <div className="text-3xl font-bold text-oak-800 mb-6">
                {product?.price ? `€${product.price.toFixed(2)}` : 'Price on Request'}
              </div>

              <div className="prose prose-oak mb-8">
                {product?.detailedDescription && (
                  <div className="text-lg text-oak-700 space-y-4">
                    {product.detailedDescription.map((block: any, index: number) => (
                      <p key={index}>{block.children?.[0]?.text || ''}</p>
                    ))}
                  </div>
                )}
              </div>

              {/* Product Specifications */}
              <div className="bg-white rounded-lg p-6 mb-8 shadow-sm">
                <h3 className="text-xl font-bold text-oak-800 mb-4">Product Specifications</h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  {product?.specifications?.dimensions && (
                    <div>
                      <span className="font-semibold text-oak-800">Dimensions:</span>
                      <div className="text-oak-600">
                        {product.category === 'table' && product.tableShape === 'rectangular' && (
                          <>
                            {product.specifications.dimensions.length} × {product.specifications.dimensions.width} × {product.specifications.dimensions.height} cm
                          </>
                        )}
                        {product.category === 'table' && product.tableShape === 'oval' && (
                          <>
                            ⌀{product.specifications.dimensions.diameter} × {product.specifications.dimensions.depth} × {product.specifications.dimensions.height} cm
                          </>
                        )}
                        {product.category !== 'table' && (
                          <>
                            {product.specifications.dimensions.genericLength} × {product.specifications.dimensions.genericWidth} × {product.specifications.dimensions.genericHeight} cm
                          </>
                        )}
                      </div>
                    </div>
                  )}
                  {product?.specifications?.finish && (
                    <div>
                      <span className="font-semibold text-oak-800">Finish:</span>
                      <div className="text-oak-600">{product.specifications.finish}</div>
                    </div>
                  )}
                  {product?.tableShape && (
                    <div>
                      <span className="font-semibold text-oak-800">Shape:</span>
                      <div className="text-oak-600">{product.tableShape}</div>
                    </div>
                  )}
                  {product?.specifications?.legShape && (
                    <div>
                      <span className="font-semibold text-oak-800">Leg Shape:</span>
                      <div className="text-oak-600">{product.specifications.legShape}</div>
                    </div>
                  )}
                  {product?.specifications?.weight && (
                    <div>
                      <span className="font-semibold text-oak-800">Weight:</span>
                      <div className="text-oak-600">{product.specifications.weight} kg</div>
                    </div>
                  )}
                  {product?.specifications?.color && (
                    <div>
                      <span className="font-semibold text-oak-800">Color:</span>
                      <div className="text-oak-600">{product.specifications.color}</div>
                    </div>
                  )}
                  <div>
                    <span className="font-semibold text-oak-800">Stock:</span>
                    <div className="text-green-600">
                      {product?.inStock ? 'Available' : 'Made to Order'}
                    </div>
                  </div>
                </div>
              </div>

              {/* Add to Cart Section */}
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <div className="flex items-center space-x-4 mb-6">
                  <label className="text-oak-800 font-medium">Quantity:</label>
                  <select
                    value={selectedQuantity}
                    onChange={(e) => setSelectedQuantity(parseInt(e.target.value))}
                    className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-oak-500"
                  >
                    {[...Array(10)].map((_, i) => (
                      <option key={i + 1} value={i + 1}>
                        {i + 1}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <button
                    onClick={handleAddToCart}
                    disabled={cartLoading || !product?.price}
                    className={`flex-1 py-3 px-6 rounded-lg font-semibold transition-colors ${
                      product?.price 
                        ? 'bg-oak-600 hover:bg-oak-700 text-white' 
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`}
                  >
                    {cartLoading ? 'Adding...' : product?.price ? 'Add to Cart' : 'Price on Request'}
                  </button>
                  
                  <Link
                    href="/contact"
                    className="flex-1 py-3 px-6 rounded-lg font-semibold bg-transparent border-2 border-oak-600 text-oak-600 hover:bg-oak-600 hover:text-white transition-colors text-center"
                  >
                    Contact Us
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Additional Information Tabs */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-oak-50 rounded-lg p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              
              {/* Care Instructions */}
              <div>
                <h3 className="text-xl font-bold text-oak-800 mb-4 flex items-center">
                  <CleaningServices className="text-oak-600 mr-2" sx={{ fontSize: 24 }} />
                  Care Instructions
                </h3>
                <ul className="space-y-2 text-oak-600 text-sm">
                  {product?.careInstructions && product.careInstructions.length > 0 ? (
                    product.careInstructions.map((instruction: string, index: number) => (
                      <li key={index}>• {instruction}</li>
                    ))
                  ) : (
                    <>
                      <li>• Dust regularly with a soft, lint-free cloth</li>
                      <li>• Clean spills immediately to prevent staining</li>
                      <li>• Use coasters and placemats to protect surface</li>
                      <li>• Reapply oil finish annually for natural oil finishes</li>
                      <li>• Avoid harsh chemicals and abrasive cleaners</li>
                    </>
                  )}
                </ul>
              </div>

              {/* Delivery Information */}
              <div>
                <h3 className="text-xl font-bold text-oak-800 mb-4 flex items-center">
                  <LocalShipping className="text-oak-600 mr-2" sx={{ fontSize: 24 }} />
                  Delivery & Setup
                </h3>
                <ul className="space-y-2 text-oak-600 text-sm">
                  <li>• Free delivery within 50km of our workshop</li>
                  <li>• Professional assembly service available</li>
                  <li>• Delivery time: 2-4 weeks for in-stock items</li>
                  <li>• Custom pieces: 6-8 weeks lead time</li>
                  <li>• White glove delivery service included</li>
                </ul>
              </div>

              {/* Warranty */}
              <div>
                <h3 className="text-xl font-bold text-oak-800 mb-4 flex items-center">
                  <Security className="text-oak-600 mr-2" sx={{ fontSize: 24 }} />
                  Warranty & Support
                </h3>
                <ul className="space-y-2 text-oak-600 text-sm">
                  <li>• 25-year structural warranty</li>
                  <li>• 5-year finish warranty</li>
                  <li>• Free annual maintenance check</li>
                  <li>• Refinishing services available</li>
                  <li>• Lifetime repair guarantee</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Products */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-oak-800 mb-8 text-center">
            You Might Also Like
          </h2>
          <div className="text-center text-oak-600">
            <p>Related products will be displayed here based on category and style.</p>
            <Link 
              href={product?.category ? `/categories/${product.category}` : '/products'}
              className="inline-block mt-4 text-oak-600 hover:text-oak-800 font-medium"
            >
              Browse {product?.category ? product.category : 'All Products'} →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}