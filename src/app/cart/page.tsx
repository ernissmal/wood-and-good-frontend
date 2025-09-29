'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  category: string;
}

export default function CartPage() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem('wood_good_cart') || '[]');
    setCart(savedCart);
    setLoading(false);
  }, []);

  const updateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeItem(id);
      return;
    }
    const updatedCart = cart.map(item =>
      item.id === id ? { ...item, quantity: newQuantity } : item
    );
    setCart(updatedCart);
    localStorage.setItem('wood_good_cart', JSON.stringify(updatedCart));
  };

  const removeItem = (id: string) => {
    const updatedCart = cart.filter(item => item.id !== id);
    setCart(updatedCart);
    localStorage.setItem('wood_good_cart', JSON.stringify(updatedCart));
  };

  const clearCart = () => {
    setCart([]);
    localStorage.removeItem('wood_good_cart');
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-oak-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <section className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center space-x-4">
            <Link 
              href="/products"
              className="text-oak-600 hover:text-oak-800 flex items-center space-x-2"
            >
              <span>← Continue Shopping</span>
            </Link>
            <div className="h-6 w-px bg-gray-300"></div>
            <h1 className="text-3xl font-bold text-oak-800">
              Shopping Cart ({getTotalItems()} items)
            </h1>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {cart.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-8xl mb-6">🛒</div>
            <h2 className="text-2xl font-semibold text-oak-800 mb-4">Your cart is empty</h2>
            <p className="text-oak-600 mb-8">
              Start exploring our beautiful oak furniture collection!
            </p>
            <Link
              href="/products"
              className="bg-oak-600 text-white px-8 py-3 rounded-lg hover:bg-oak-700 transition-colors font-semibold"
            >
              Browse Products
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-oak-800">Cart Items</h2>
                <button
                  onClick={clearCart}
                  className="text-red-600 hover:text-red-700 text-sm"
                >
                  Clear Cart
                </button>
              </div>

              {cart.map((item) => (
                <div key={item.id} className="bg-white rounded-lg shadow-sm p-6">
                  <div className="flex gap-4">
                    <div className="w-24 h-24 bg-oak-50 rounded-lg flex-shrink-0 flex items-center justify-center text-2xl">
                      🪵
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="font-semibold text-oak-800 text-lg">{item.name}</h3>
                          <p className="text-sm text-oak-600">{item.category}</p>
                        </div>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-red-500 hover:text-red-700 p-1"
                        >
                          ✕
                        </button>
                      </div>
                      <div className="flex justify-between items-center">
                        <div className="text-xl font-bold text-oak-800">
                          €{item.price.toFixed(2)}
                        </div>
                        <div className="flex items-center space-x-3">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="w-8 h-8 bg-oak-100 hover:bg-oak-200 rounded-full flex items-center justify-center"
                          >
                            -
                          </button>
                          <span className="font-semibold text-oak-800 min-w-[2rem] text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="w-8 h-8 bg-oak-100 hover:bg-oak-200 rounded-full flex items-center justify-center"
                          >
                            +
                          </button>
                        </div>
                      </div>
                      <div className="mt-2 text-right text-sm text-oak-600">
                        Subtotal: €{(item.price * item.quantity).toFixed(2)}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-sm p-6 sticky top-8">
                <h2 className="text-xl font-semibold text-oak-800 mb-6">Order Summary</h2>
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between">
                    <span className="text-oak-600">Subtotal ({getTotalItems()} items)</span>
                    <span className="font-semibold">€{getTotalPrice().toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-oak-600">Shipping</span>
                    <span className="text-green-600 font-medium">Free</span>
                  </div>
                  <div className="border-t pt-3">
                    <div className="flex justify-between text-lg">
                      <span className="font-semibold text-oak-800">Total</span>
                      <span className="font-bold text-oak-800">€{getTotalPrice().toFixed(2)}</span>
                    </div>
                  </div>
                </div>
                <button
                  className="w-full bg-oak-600 text-white py-3 rounded-lg hover:bg-oak-700 transition-colors font-semibold mb-4"
                  onClick={() => alert('Checkout functionality coming next!')}
                >
                  Proceed to Checkout
                </button>
                <Link
                  href="/products"
                  className="block w-full text-center bg-oak-100 text-oak-800 py-3 rounded-lg hover:bg-oak-200 transition-colors font-medium"
                >
                  Continue Shopping
                </Link>
                <div className="mt-6 p-4 bg-oak-50 rounded-lg">
                  <h4 className="font-semibold text-oak-800 mb-2">Free Delivery</h4>
                  <p className="text-sm text-oak-600">
                    Free delivery within 50km of our workshop in Latvia.
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
