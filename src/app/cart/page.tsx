'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useCart } from '../../hooks/api';
import { LoadingSpinner, ErrorMessage } from '../../components/ui';

export default function CartPage() {
  const { cart, loading, error, updateCartItem, removeFromCart, clearCart, refetch } = useCart();
  const [isProcessing, setIsProcessing] = useState(false);
  
  useEffect(() => {
    // Refresh cart data when component mounts
    refetch();
  }, [refetch]);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('lv-LV', {
      style: 'currency',
      currency: 'EUR',
    }).format(price);
  };

  const calculateItemTotal = (price: number, quantity: number) => {
    return price * quantity;
  };

  const calculateCartTotal = () => {
    if (!cart?.items) return 0;
    return cart.items.reduce((total, item) => {
      return total + calculateItemTotal(item.product.price, item.quantity);
    }, 0);
  };

  const handleQuantityChange = async (productId: number, newQuantity: number) => {
    if (newQuantity < 1) return;
    
    setIsProcessing(true);
    try {
      await updateCartItem(productId, newQuantity);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleRemoveItem = async (productId: number) => {
    setIsProcessing(true);
    try {
      await removeFromCart(productId);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleClearCart = async () => {
    if (confirm('Are you sure you want to clear your cart?')) {
      setIsProcessing(true);
      try {
        await clearCart();
      } finally {
        setIsProcessing(false);
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <LoadingSpinner size="large" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <ErrorMessage message={error} onRetry={refetch} />
      </div>
    );
  }

  const isEmpty = !cart?.items || cart.items.length === 0;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between">
            <h1 className="text-4xl font-bold text-oak-800">Shopping Cart</h1>
            {!isEmpty && (
              <button
                onClick={handleClearCart}
                disabled={isProcessing}
                className="text-red-600 hover:text-red-800 font-medium disabled:opacity-50"
              >
                Clear Cart
              </button>
            )}
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {isEmpty ? (
          /* Empty Cart */
          <div className="text-center py-16">
            <div className="text-8xl mb-6">🛒</div>
            <h2 className="text-2xl font-bold text-oak-800 mb-4">Your cart is empty</h2>
            <p className="text-oak-600 mb-8 max-w-md mx-auto">
              Looks like you haven't added any items to your cart yet. 
              Start shopping to fill it up!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/products"
                className="bg-oak-600 hover:bg-oak-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors"
              >
                Browse All Products
              </Link>
              <Link
                href="/categories/tabletops"
                className="bg-transparent border-2 border-oak-600 text-oak-600 hover:bg-oak-600 hover:text-white font-semibold py-3 px-8 rounded-lg transition-colors"
              >
                Shop Tabletops
              </Link>
            </div>
          </div>
        ) : (
          /* Cart with Items */
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-sm">
                <div className="p-6 border-b border-gray-200">
                  <h2 className="text-xl font-semibold text-oak-800">
                    Cart Items ({cart?.items?.length || 0})
                  </h2>
                </div>
                
                <div className="divide-y divide-gray-200">
                  {cart?.items?.map((item) => (
                    <div key={`${item.product_id}-${item.variant_id || 'default'}`} className="p-6">
                      <div className="flex items-start space-x-4">
                        
                        {/* Product Image */}
                        <Link href={`/products/${item.product.seo_slug}`} className="flex-shrink-0">
                          <div className="w-24 h-24 bg-oak-100 rounded-lg overflow-hidden">
                            {item.product.image_url ? (
                              <img
                                src={item.product.image_url}
                                alt={item.product.name}
                                className="w-full h-full object-cover hover:scale-105 transition-transform"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-oak-400 text-2xl">
                                🪵
                              </div>
                            )}
                          </div>
                        </Link>

                        {/* Product Details */}
                        <div className="flex-1 min-w-0">
                          <Link 
                            href={`/products/${item.product.seo_slug}`}
                            className="text-lg font-semibold text-oak-800 hover:text-oak-600 transition-colors"
                          >
                            {item.product.name}
                          </Link>
                          
                          <div className="mt-1 space-y-1 text-sm text-oak-600">
                            {item.product.wood_type && (
                              <div>Material: {item.product.wood_type}</div>
                            )}
                            {item.product.dimensions && (
                              <div>Size: {item.product.dimensions}</div>
                            )}
                            {item.product.finish && (
                              <div>Finish: {item.product.finish}</div>
                            )}
                          </div>

                          <div className="mt-4 flex items-center justify-between">
                            
                            {/* Quantity Controls */}
                            <div className="flex items-center space-x-2">
                              <label className="text-sm font-medium text-oak-700">Qty:</label>
                              <button
                                onClick={() => handleQuantityChange(item.product_id, item.quantity - 1)}
                                disabled={item.quantity <= 1 || isProcessing}
                                className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 disabled:opacity-50"
                              >
                                −
                              </button>
                              <span className="w-12 text-center font-medium">{item.quantity}</span>
                              <button
                                onClick={() => handleQuantityChange(item.product_id, item.quantity + 1)}
                                disabled={isProcessing}
                                className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 disabled:opacity-50"
                              >
                                +
                              </button>
                            </div>

                            {/* Price and Remove */}
                            <div className="text-right">
                              <div className="text-lg font-semibold text-oak-800">
                                {formatPrice(calculateItemTotal(item.product.price, item.quantity))}
                              </div>
                              <div className="text-sm text-oak-600">
                                {formatPrice(item.product.price)} each
                              </div>
                              <button
                                onClick={() => handleRemoveItem(item.product_id)}
                                disabled={isProcessing}
                                className="mt-2 text-sm text-red-600 hover:text-red-800 disabled:opacity-50"
                              >
                                Remove
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-sm p-6 sticky top-8">
                <h2 className="text-xl font-semibold text-oak-800 mb-6">Order Summary</h2>
                
                <div className="space-y-4">
                  <div className="flex justify-between text-oak-700">
                    <span>Subtotal ({cart?.items?.length || 0} items)</span>
                    <span>{formatPrice(calculateCartTotal())}</span>
                  </div>
                  
                  <div className="flex justify-between text-oak-700">
                    <span>Shipping</span>
                    <span className="text-green-600">Free</span>
                  </div>
                  
                  <div className="border-t border-gray-200 pt-4">
                    <div className="flex justify-between text-lg font-semibold text-oak-800">
                      <span>Total</span>
                      <span>{formatPrice(calculateCartTotal())}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-8 space-y-4">
                  <button className="w-full bg-oak-600 hover:bg-oak-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors">
                    Proceed to Checkout
                  </button>
                  
                  <Link
                    href="/products"
                    className="w-full bg-transparent border-2 border-oak-600 text-oak-600 hover:bg-oak-600 hover:text-white font-semibold py-3 px-6 rounded-lg transition-colors text-center block"
                  >
                    Continue Shopping
                  </Link>
                </div>

                {/* Shipping Info */}
                <div className="mt-8 p-4 bg-green-50 rounded-lg">
                  <div className="flex items-center text-green-800 mb-2">
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="font-semibold">Free Delivery</span>
                  </div>
                  <p className="text-sm text-green-700">
                    Free delivery within 50km of our workshop. 
                    Estimated delivery: 2-4 weeks for in-stock items.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}