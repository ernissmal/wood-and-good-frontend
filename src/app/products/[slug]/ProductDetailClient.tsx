'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { LoadingSpinner, ErrorMessage } from '../../../components/ui';
import { useCart } from '../../../hooks/api';
import { sanityApi } from '../../../lib/sanity';
import { SentimentDissatisfied, CleaningServices, LocalShipping, Security, Star, TableBar } from '@mui/icons-material';

export default function ProductDetailClient() {
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
          setError('Product not found');
          return;
        }

        // Mock data with detailed oak furniture information
        const mockProduct = {
          id: productId,
          name: productData.name || `Premium Oak ${productId.charAt(0).toUpperCase() + productId.slice(1)}`,
          description: productData.description || `Handcrafted solid oak furniture piece with exceptional quality and timeless design. Each piece is sustainably sourced from Latvian forests and crafted using traditional techniques passed down through generations.`,
          price: productData.price || Math.floor(Math.random() * 1000) + 300,
          originalPrice: productData.originalPrice,
          category: productData.category || 'Furniture',
          images: productData.images || [
            `/api/placeholder/800/600?text=Oak+${productId}`,
            `/api/placeholder/800/600?text=Oak+${productId}+Detail`,
            `/api/placeholder/800/600?text=Oak+${productId}+Angle`,
          ],
          inStock: productData.inStock !== undefined ? productData.inStock : true,
          stockCount: productData.stockCount || Math.floor(Math.random() * 20) + 5,
          dimensions: productData.dimensions || {
            length: '120cm',
            width: '80cm',
            height: '75cm',
            weight: '45kg'
          },
          materials: productData.materials || ['100% Solid Oak', 'Natural Oil Finish', 'Steel Hardware'],
          features: productData.features || [
            'Sustainably sourced oak wood',
            'Traditional joinery techniques',
            'Natural oil finish',
            'Handcrafted in Latvia',
            'Made to order',
            '25-year quality guarantee'
          ],
          careInstructions: productData.careInstructions || [
            'Dust regularly with a soft, dry cloth',
            'Use coasters and placemats to protect surface',
            'Apply oak-specific oil treatment annually',
            'Avoid direct sunlight and heat sources',
            'Clean spills immediately with a dry cloth'
          ],
          shipping: productData.shipping || {
            freeShipping: true,
            deliveryTime: '4-6 weeks',
            returnPolicy: '30-day return guarantee'
          },
          craftsman: productData.craftsman || {
            name: 'Master Jānis Bērziņš',
            experience: '35 years',
            specialization: 'Traditional Oak Furniture'
          },
          sustainability: productData.sustainability || {
            carbonNeutral: true,
            localWood: true,
            wasteMinimization: 95,
            certifications: ['FSC Certified', 'PEFC Certified']
          }
        };

        setProduct(mockProduct);
      } catch (err) {
        console.error('Error fetching product:', err);
        setError('Failed to load product details');
      } finally {
        setLoading(false);
      }
    };

    if (productId) {
      fetchProduct();
    }
  }, [productId]);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'EUR'
    }).format(price);
  };

  const handleAddToCart = async () => {
    if (!product) return;
    
    try {
      // Simple localStorage cart for now
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
          image: product.images[0],
          category: product.category
        });
      }
      
      localStorage.setItem('wood_good_cart', JSON.stringify(cart));
      
      // Show success message
      alert(`Added ${selectedQuantity} ${product.name} to cart!`);
    } catch (err) {
      console.error('Error adding to cart:', err);
      alert('Failed to add item to cart. Please try again.');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-oak-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center items-center min-h-[400px]">
            <LoadingSpinner />
          </div>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-oak-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-16">
            <SentimentDissatisfied sx={{ fontSize: 80 }} className="text-oak-400 mb-6" />
            <h1 className="text-2xl font-bold text-oak-800 mb-4">Product Not Found</h1>
            <p className="text-oak-600 mb-8">
              We couldn&apos;t find the product you&apos;re looking for. It may have been moved or is no longer available.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/products"
                className="bg-oak-600 text-white px-6 py-3 rounded-lg hover:bg-oak-700 transition-colors"
              >
                Browse All Products
              </Link>
              <Link
                href="/"
                className="bg-white text-oak-600 px-6 py-3 rounded-lg border border-oak-300 hover:bg-oak-50 transition-colors"
              >
                Return Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-oak-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-oak-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex text-sm text-oak-600">
            <Link href="/" className="hover:text-oak-800">Home</Link>
            <span className="mx-2">/</span>
            <Link href="/products" className="hover:text-oak-800">Products</Link>
            <span className="mx-2">/</span>
            <span className="text-oak-800 font-medium">{product.name}</span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div>
            <div className="aspect-square bg-white rounded-xl overflow-hidden shadow-lg mb-4">
              <img
                src={product.images[selectedImage]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Thumbnail Images */}
            {product.images.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-2">
                {product.images.map((image: string, index: number) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${
                      selectedImage === index
                        ? 'border-oak-600'
                        : 'border-oak-200 hover:border-oak-400'
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

          {/* Product Details */}
          <div>
            <div className="mb-6">
              <div className="flex items-center gap-3 mb-3">
                <span className="bg-oak-100 text-oak-800 px-3 py-1 rounded-full text-sm font-medium">
                  {product.category}
                </span>
                {product.inStock && (
                  <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                    In Stock ({product.stockCount} available)
                  </span>
                )}
              </div>
              
              <h1 className="text-3xl lg:text-4xl font-bold text-oak-800 mb-4">
                {product.name}
              </h1>
              
              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center gap-2">
                  <div className="flex text-oak-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-current" />
                    ))}
                  </div>
                  <span className="text-oak-700 font-medium">5.0 (127 reviews)</span>
                </div>
              </div>
              
              <div className="text-3xl font-bold text-oak-800 mb-6">
                €{product.price.toFixed(2)}
                {product.originalPrice && (
                  <span className="text-lg text-oak-500 line-through ml-3">
                    €{product.originalPrice.toFixed(2)}
                  </span>
                )}
              </div>
            </div>

            <div className="mb-8">
              <h3 className="text-lg font-semibold text-oak-800 mb-3">Description</h3>
              <p className="text-oak-700 leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Quantity and Add to Cart */}
            <div className="mb-8">
              <div className="flex items-center gap-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-oak-700 mb-2">
                    Quantity
                  </label>
                  <select
                    value={selectedQuantity}
                    onChange={(e) => setSelectedQuantity(Number(e.target.value))}
                    className="bg-white border border-oak-300 rounded-lg px-4 py-2 text-oak-800 focus:ring-2 focus:ring-oak-500 focus:border-oak-500"
                  >
                    {[...Array(Math.min(product.stockCount, 10))].map((_, i) => (
                      <option key={i + 1} value={i + 1}>
                        {i + 1}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={handleAddToCart}
                  disabled={!product.inStock || cartLoading}
                  className="flex-1 bg-oak-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-oak-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {cartLoading ? 'Adding...' : 'Add to Cart'}
                </button>
                <button className="flex-1 bg-white text-oak-600 px-8 py-4 rounded-lg font-semibold border border-oak-300 hover:bg-oak-50 transition-colors">
                  Request Custom Quote
                </button>
              </div>
            </div>

            {/* Key Features */}
            <div className="border-t border-oak-200 pt-8">
              <h3 className="text-lg font-semibold text-oak-800 mb-4">Key Features</h3>
              <ul className="space-y-2">
                {product.features.map((feature: any, index: number) => (
                  <li key={index} className="flex items-center gap-3 text-oak-700">
                    <Star className="w-4 h-4 text-oak-500" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Additional Details Tabs */}
        <div className="mt-16">
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="border-b border-oak-200">
              <div className="flex overflow-x-auto">
                <button className="flex-shrink-0 px-6 py-4 text-oak-800 font-medium border-b-2 border-oak-600 bg-oak-50">
                  Specifications
                </button>
                <button className="flex-shrink-0 px-6 py-4 text-oak-600 hover:text-oak-800 hover:bg-oak-50 transition-colors">
                  Care Instructions
                </button>
                <button className="flex-shrink-0 px-6 py-4 text-oak-600 hover:text-oak-800 hover:bg-oak-50 transition-colors">
                  Shipping
                </button>
                <button className="flex-shrink-0 px-6 py-4 text-oak-600 hover:text-oak-800 hover:bg-oak-50 transition-colors">
                  Sustainability
                </button>
              </div>
            </div>
            
            <div className="p-6">
              {/* Specifications Tab */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h4 className="font-semibold text-oak-800 mb-4">Dimensions</h4>
                  <div className="space-y-2 text-oak-700">
                    <div className="flex justify-between">
                      <span>Length:</span>
                      <span className="font-medium">{product.dimensions.length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Width:</span>
                      <span className="font-medium">{product.dimensions.width}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Height:</span>
                      <span className="font-medium">{product.dimensions.height}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Weight:</span>
                      <span className="font-medium">{product.dimensions.weight}</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-semibold text-oak-800 mb-4">Materials</h4>
                  <ul className="space-y-2">
                    {product.materials.map((material: any, index: number) => (
                      <li key={index} className="flex items-center gap-2 text-oak-700">
                        <TableBar className="w-4 h-4 text-oak-500" />
                        {material}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Craftsman Info */}
        <div className="mt-12 bg-gradient-to-r from-oak-100 to-oak-50 rounded-xl p-8">
          <div className="flex items-center gap-6">
            <div className="w-20 h-20 bg-oak-600 rounded-full flex items-center justify-center">
              <span className="text-2xl text-white font-bold">
                {product.craftsman.name.split(' ').map((n: any) => n[0]).join('')}
              </span>
            </div>
            <div>
              <h4 className="text-xl font-bold text-oak-800 mb-1">
                Crafted by {product.craftsman.name}
              </h4>
              <p className="text-oak-700">
                {product.craftsman.experience} of experience in {product.craftsman.specialization}
              </p>
              <p className="text-oak-600 text-sm mt-2">
                Each piece is individually inspected and bears the craftsman's signature of quality.
              </p>
            </div>
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white rounded-lg p-6 text-center shadow-md">
            <LocalShipping className="w-8 h-8 text-oak-600 mx-auto mb-3" />
            <h5 className="font-semibold text-oak-800 mb-2">Free Delivery</h5>
            <p className="text-sm text-oak-600">Throughout Latvia</p>
          </div>
          
          <div className="bg-white rounded-lg p-6 text-center shadow-md">
            <Security className="w-8 h-8 text-oak-600 mx-auto mb-3" />
            <h5 className="font-semibold text-oak-800 mb-2">25-Year Guarantee</h5>
            <p className="text-sm text-oak-600">Quality assurance</p>
          </div>
          
          <div className="bg-white rounded-lg p-6 text-center shadow-md">
            <CleaningServices className="w-8 h-8 text-oak-600 mx-auto mb-3" />
            <h5 className="font-semibold text-oak-800 mb-2">Care Support</h5>
            <p className="text-sm text-oak-600">Maintenance guidance</p>
          </div>
          
          <div className="bg-white rounded-lg p-6 text-center shadow-md">
            <Star className="w-8 h-8 text-oak-600 mx-auto mb-3" />
            <h5 className="font-semibold text-oak-800 mb-2">Handcrafted</h5>
            <p className="text-sm text-oak-600">Traditional methods</p>
          </div>
        </div>
      </div>
    </div>
  );
}