'use client';'use client';'use client';'use client';



import { useState, useEffect } from 'react';

import Link from 'next/link';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';import { useState, useEffect } from 'react';

import DeleteIcon from '@mui/icons-material/Delete';

import AddIcon from '@mui/icons-material/Add';import Link from 'next/link';

import RemoveIcon from '@mui/icons-material/Remove';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';import { useState, useEffect } from 'react';import { TableBar } from '@mui/icons-material';

interface CartItem {

  id: string;import DeleteIcon from '@mui/icons-material/Delete';

  name: string;

  price: number;import AddIcon from '@mui/icons-material/Add';import Link from 'next/link';

  quantity: number;

  image?: string;import RemoveIcon from '@mui/icons-material/Remove';

  category: string;

}import ArrowBackIcon from '@mui/icons-material/ArrowBack';import { useState, useEffect } from 'react';



export default function CartPage() {interface CartItem {

  const [cart, setCart] = useState<CartItem[]>([]);

  const [loading, setLoading] = useState(true);  id: string;import DeleteIcon from '@mui/icons-material/Delete';import Link from 'next/link';



  useEffect(() => {  name: string;

    const savedCart = JSON.parse(localStorage.getItem('wood_good_cart') || '[]');

    setCart(savedCart);  price: number;import AddIcon from '@mui/icons-material/Add';import { useCart } from '../../hooks/api';

    setLoading(false);

  }, []);  quantity: number;



  const updateQuantity = (id: string, newQuantity: number) => {  image?: string;import RemoveIcon from '@mui/icons-material/Remove';import { LoadingSpinner, ErrorMessage } from '../../components/ui';

    if (newQuantity <= 0) {

      removeItem(id);  category: string;

      return;

    }}



    const updatedCart = cart.map(item =>

      item.id === id ? { ...item, quantity: newQuantity } : item

    );export default function CartPage() {interface CartItem {export default function CartPage() {

    setCart(updatedCart);

    localStorage.setItem('wood_good_cart', JSON.stringify(updatedCart));  const [cart, setCart] = useState<CartItem[]>([]);

  };

  const [loading, setLoading] = useState(true);  id: string;  const { cart, loading, error, updateCartItem, removeFromCart, clearCart, refetch } = useCart();

  const removeItem = (id: string) => {

    const updatedCart = cart.filter(item => item.id !== id);

    setCart(updatedCart);

    localStorage.removeItem('wood_good_cart');  useEffect(() => {  name: string;  const [isProcessing, setIsProcessing] = useState(false);

  };

    const savedCart = JSON.parse(localStorage.getItem('wood_good_cart') || '[]');

  const clearCart = () => {

    setCart([]);    setCart(savedCart);  price: number;  

    localStorage.removeItem('wood_good_cart');

  };    setLoading(false);



  const getTotalPrice = () => {  }, []);  quantity: number;  useEffect(() => {

    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);

  };



  const getTotalItems = () => {  const updateQuantity = (id: string, newQuantity: number) => {  image?: string;    // Refresh cart data when component mounts

    return cart.reduce((total, item) => total + item.quantity, 0);

  };    if (newQuantity <= 0) {



  if (loading) {      removeItem(id);  category: string;    refetch();

    return (

      <div className="min-h-screen bg-gray-50 flex items-center justify-center">      return;

        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-oak-600"></div>

      </div>    }}  }, [refetch]);

    );

  }



  return (    const updatedCart = cart.map(item =>

    <div className="min-h-screen bg-gray-50">

      <section className="bg-white shadow-sm">      item.id === id ? { ...item, quantity: newQuantity } : item

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

          <div className="flex items-center space-x-4">    );export default function CartPage() {  const formatPrice = (price: number) => {

            <Link 

              href="/products"    setCart(updatedCart);

              className="text-oak-600 hover:text-oak-800 flex items-center space-x-2"

            >    localStorage.setItem('wood_good_cart', JSON.stringify(updatedCart));  const [cart, setCart] = useState<CartItem[]>([]);    return new Intl.NumberFormat('lv-LV', {

              <ArrowBackIcon className="w-5 h-5" />

              <span>Continue Shopping</span>  };

            </Link>

            <div className="h-6 w-px bg-gray-300"></div>  const [loading, setLoading] = useState(true);      style: 'currency',

            <h1 className="text-3xl font-bold text-oak-800">

              Shopping Cart ({getTotalItems()} {getTotalItems() === 1 ? 'item' : 'items'})  const removeItem = (id: string) => {

            </h1>

          </div>    const updatedCart = cart.filter(item => item.id !== id);      currency: 'EUR',

        </div>

      </section>    setCart(updatedCart);



      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">    localStorage.setItem('wood_good_cart', JSON.stringify(updatedCart));  useEffect(() => {    }).format(price);

        {cart.length === 0 ? (

          <div className="text-center py-16">  };

            <div className="w-24 h-24 bg-oak-100 rounded-full flex items-center justify-center mx-auto mb-6">

              <span className="text-4xl">🛒</span>    // Load cart from localStorage  };

            </div>

            <h2 className="text-2xl font-semibold text-oak-800 mb-4">Your cart is empty</h2>  const clearCart = () => {

            <p className="text-oak-600 mb-8 max-w-md mx-auto">

              Start exploring our beautiful oak furniture collection!    setCart([]);    const savedCart = JSON.parse(localStorage.getItem('wood_good_cart') || '[]');

            </p>

            <Link    localStorage.removeItem('wood_good_cart');

              href="/products"

              className="bg-oak-600 text-white px-8 py-3 rounded-lg hover:bg-oak-700 transition-colors font-semibold"  };    setCart(savedCart);  const calculateItemTotal = (price: number, quantity: number) => {

            >

              Browse Products

            </Link>

          </div>  const getTotalPrice = () => {    setLoading(false);    return price * quantity;

        ) : (

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);

            <div className="lg:col-span-2 space-y-4">

              <div className="flex justify-between items-center mb-6">  };  }, []);  };

                <h2 className="text-xl font-semibold text-oak-800">Cart Items</h2>

                <button

                  onClick={clearCart}

                  className="text-red-600 hover:text-red-700 text-sm flex items-center space-x-1"  const getTotalItems = () => {

                >

                  <DeleteIcon className="w-4 h-4" />    return cart.reduce((total, item) => total + item.quantity, 0);

                  <span>Clear Cart</span>

                </button>  };  const updateQuantity = (id: string, newQuantity: number) => {  const calculateCartTotal = () => {

              </div>



              {cart.map((item) => (

                <div key={item.id} className="bg-white rounded-lg shadow-sm p-6 flex gap-4">  if (loading) {    if (newQuantity <= 0) {    if (!cart?.items) return 0;

                  <div className="w-24 h-24 bg-oak-50 rounded-lg flex-shrink-0 overflow-hidden">

                    {item.image ? (    return (

                      <img

                        src={item.image}      <div className="min-h-screen bg-gray-50 flex items-center justify-center">      removeItem(id);    return cart.items.reduce((total, item) => {

                        alt={item.name}

                        className="w-full h-full object-cover"        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-oak-600"></div>

                      />

                    ) : (      </div>      return;      return total + calculateItemTotal(item.product.price, item.quantity);

                      <div className="w-full h-full flex items-center justify-center text-2xl">🪵</div>

                    )}    );

                  </div>

  }    }    }, 0);

                  <div className="flex-1">

                    <div className="flex justify-between items-start mb-2">

                      <div>

                        <h3 className="font-semibold text-oak-800 text-lg">{item.name}</h3>  return (  };

                        <p className="text-sm text-oak-600">{item.category}</p>

                      </div>    <div className="min-h-screen bg-gray-50">

                      <button

                        onClick={() => removeItem(item.id)}      <section className="bg-white shadow-sm">    const updatedCart = cart.map(item =>

                        className="text-red-500 hover:text-red-700 p-1"

                      >        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

                        <DeleteIcon className="w-5 h-5" />

                      </button>          <div className="flex items-center space-x-4">      item.id === id ? { ...item, quantity: newQuantity } : item  const handleQuantityChange = async (productId: number, newQuantity: number) => {

                    </div>

            <Link 

                    <div className="flex justify-between items-center">

                      <div className="text-xl font-bold text-oak-800">              href="/products"    );    if (newQuantity < 1) return;

                        €{item.price.toFixed(2)}

                      </div>              className="text-oak-600 hover:text-oak-800 flex items-center space-x-2"



                      <div className="flex items-center space-x-3">            >    setCart(updatedCart);    

                        <button

                          onClick={() => updateQuantity(item.id, item.quantity - 1)}              <ArrowBackIcon className="w-5 h-5" />

                          className="w-8 h-8 bg-oak-100 hover:bg-oak-200 rounded-full flex items-center justify-center"

                        >              <span>Continue Shopping</span>    localStorage.setItem('wood_good_cart', JSON.stringify(updatedCart));    setIsProcessing(true);

                          <RemoveIcon className="w-4 h-4 text-oak-600" />

                        </button>            </Link>

                        

                        <span className="font-semibold text-oak-800 min-w-[2rem] text-center">            <div className="h-6 w-px bg-gray-300"></div>  };    try {

                          {item.quantity}

                        </span>            <h1 className="text-3xl font-bold text-oak-800">

                        

                        <button              Shopping Cart ({getTotalItems()} {getTotalItems() === 1 ? 'item' : 'items'})      await updateCartItem(productId, newQuantity);

                          onClick={() => updateQuantity(item.id, item.quantity + 1)}

                          className="w-8 h-8 bg-oak-100 hover:bg-oak-200 rounded-full flex items-center justify-center"            </h1>

                        >

                          <AddIcon className="w-4 h-4 text-oak-600" />          </div>  const removeItem = (id: string) => {    } finally {

                        </button>

                      </div>        </div>

                    </div>

      </section>    const updatedCart = cart.filter(item => item.id !== id);      setIsProcessing(false);

                    <div className="mt-2 text-right text-sm text-oak-600">

                      Subtotal: €{(item.price * item.quantity).toFixed(2)}

                    </div>

                  </div>      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">    setCart(updatedCart);    }

                </div>

              ))}        {cart.length === 0 ? (

            </div>

          <div className="text-center py-16">    localStorage.setItem('wood_good_cart', JSON.stringify(updatedCart));  };

            <div className="lg:col-span-1">

              <div className="bg-white rounded-lg shadow-sm p-6 sticky top-8">            <div className="w-24 h-24 bg-oak-100 rounded-full flex items-center justify-center mx-auto mb-6">

                <h2 className="text-xl font-semibold text-oak-800 mb-6">Order Summary</h2>

                              <span className="text-4xl">🛒</span>  };

                <div className="space-y-3 mb-6">

                  <div className="flex justify-between">            </div>

                    <span className="text-oak-600">Subtotal ({getTotalItems()} items)</span>

                    <span className="font-semibold">€{getTotalPrice().toFixed(2)}</span>            <h2 className="text-2xl font-semibold text-oak-800 mb-4">Your cart is empty</h2>  const handleRemoveItem = async (productId: number) => {

                  </div>

                  <div className="flex justify-between">            <p className="text-oak-600 mb-8 max-w-md mx-auto">

                    <span className="text-oak-600">Shipping</span>

                    <span className="text-green-600 font-medium">Free</span>              Start exploring our beautiful oak furniture collection!  const clearCart = () => {    setIsProcessing(true);

                  </div>

                  <div className="border-t pt-3">            </p>

                    <div className="flex justify-between text-lg">

                      <span className="font-semibold text-oak-800">Total</span>            <Link    setCart([]);    try {

                      <span className="font-bold text-oak-800">€{getTotalPrice().toFixed(2)}</span>

                    </div>              href="/products"

                  </div>

                </div>              className="bg-oak-600 text-white px-8 py-3 rounded-lg hover:bg-oak-700 transition-colors font-semibold"    localStorage.removeItem('wood_good_cart');      await removeFromCart(productId);



                <button            >

                  className="w-full bg-oak-600 text-white py-3 rounded-lg hover:bg-oak-700 transition-colors font-semibold mb-4"

                  onClick={() => alert('Checkout functionality coming next!')}              Browse Products  };    } finally {

                >

                  Proceed to Checkout            </Link>

                </button>

          </div>      setIsProcessing(false);

                <Link

                  href="/products"        ) : (

                  className="block w-full text-center bg-oak-100 text-oak-800 py-3 rounded-lg hover:bg-oak-200 transition-colors font-medium"

                >          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">  const getTotalPrice = () => {    }

                  Continue Shopping

                </Link>            <div className="lg:col-span-2 space-y-4">



                <div className="mt-6 p-4 bg-oak-50 rounded-lg">              <div className="flex justify-between items-center mb-6">    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);  };

                  <h4 className="font-semibold text-oak-800 mb-2">Free Delivery</h4>

                  <p className="text-sm text-oak-600">                <h2 className="text-xl font-semibold text-oak-800">Cart Items</h2>

                    Free delivery within 50km of our workshop in Latvia.

                  </p>                <button  };

                </div>

              </div>                  onClick={clearCart}

            </div>

          </div>                  className="text-red-600 hover:text-red-700 text-sm flex items-center space-x-1"  const handleClearCart = async () => {

        )}

      </div>                >

    </div>

  );                  <DeleteIcon className="w-4 h-4" />  const getTotalItems = () => {    if (confirm('Are you sure you want to clear your cart?')) {

}
                  <span>Clear Cart</span>

                </button>    return cart.reduce((total, item) => total + item.quantity, 0);      setIsProcessing(true);

              </div>

  };      try {

              {cart.map((item) => (

                <div key={item.id} className="bg-white rounded-lg shadow-sm p-6 flex gap-4">        await clearCart();

                  <div className="w-24 h-24 bg-oak-50 rounded-lg flex-shrink-0 overflow-hidden">

                    {item.image ? (  if (loading) {      } finally {

                      <img

                        src={item.image}    return (        setIsProcessing(false);

                        alt={item.name}

                        className="w-full h-full object-cover"      <div className="min-h-screen bg-gray-50 flex items-center justify-center">      }

                      />

                    ) : (        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-oak-600"></div>    }

                      <div className="w-full h-full flex items-center justify-center text-2xl">🪵</div>

                    )}      </div>  };

                  </div>

    );

                  <div className="flex-1">

                    <div className="flex justify-between items-start mb-2">  }  if (loading) {

                      <div>

                        <h3 className="font-semibold text-oak-800 text-lg">{item.name}</h3>    return (

                        <p className="text-sm text-oak-600">{item.category}</p>

                      </div>  return (      <div className="min-h-screen bg-gray-50 flex items-center justify-center">

                      <button

                        onClick={() => removeItem(item.id)}    <div className="min-h-screen bg-gray-50">        <LoadingSpinner size="large" />

                        className="text-red-500 hover:text-red-700 p-1"

                      >      {/* Header */}      </div>

                        <DeleteIcon className="w-5 h-5" />

                      </button>      <section className="bg-white shadow-sm">    );

                    </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">  }

                    <div className="flex justify-between items-center">

                      <div className="text-xl font-bold text-oak-800">          <div className="flex items-center space-x-4">

                        €{item.price.toFixed(2)}

                      </div>            <Link   if (error) {



                      <div className="flex items-center space-x-3">              href="/products"    return (

                        <button

                          onClick={() => updateQuantity(item.id, item.quantity - 1)}              className="text-oak-600 hover:text-oak-800 flex items-center space-x-2"      <div className="min-h-screen bg-gray-50 flex items-center justify-center">

                          className="w-8 h-8 bg-oak-100 hover:bg-oak-200 rounded-full flex items-center justify-center"

                        >            >        <ErrorMessage message={error} onRetry={refetch} />

                          <RemoveIcon className="w-4 h-4 text-oak-600" />

                        </button>              <ArrowBackIcon className="w-5 h-5" />      </div>

                        

                        <span className="font-semibold text-oak-800 min-w-[2rem] text-center">              <span>Continue Shopping</span>    );

                          {item.quantity}

                        </span>            </Link>  }

                        

                        <button            <div className="h-6 w-px bg-gray-300"></div>

                          onClick={() => updateQuantity(item.id, item.quantity + 1)}

                          className="w-8 h-8 bg-oak-100 hover:bg-oak-200 rounded-full flex items-center justify-center"            <h1 className="text-3xl font-bold text-oak-800">  const isEmpty = !cart?.items || cart.items.length === 0;

                        >

                          <AddIcon className="w-4 h-4 text-oak-600" />              Shopping Cart ({getTotalItems()} {getTotalItems() === 1 ? 'item' : 'items'})

                        </button>

                      </div>            </h1>  return (

                    </div>

          </div>    <div className="min-h-screen bg-gray-50">

                    <div className="mt-2 text-right text-sm text-oak-600">

                      Subtotal: €{(item.price * item.quantity).toFixed(2)}        </div>      {/* Header */}

                    </div>

                  </div>      </section>      <section className="bg-white shadow-sm">

                </div>

              ))}        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

            </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">          <div className="flex items-center justify-between">

            <div className="lg:col-span-1">

              <div className="bg-white rounded-lg shadow-sm p-6 sticky top-8">        {cart.length === 0 ? (            <h1 className="text-4xl font-bold text-oak-800">Shopping Cart</h1>

                <h2 className="text-xl font-semibold text-oak-800 mb-6">Order Summary</h2>

                          /* Empty Cart */            {!isEmpty && (

                <div className="space-y-3 mb-6">

                  <div className="flex justify-between">          <div className="text-center py-16">              <button

                    <span className="text-oak-600">Subtotal ({getTotalItems()} items)</span>

                    <span className="font-semibold">€{getTotalPrice().toFixed(2)}</span>            <div className="w-24 h-24 bg-oak-100 rounded-full flex items-center justify-center mx-auto mb-6">                onClick={handleClearCart}

                  </div>

                  <div className="flex justify-between">              <span className="text-4xl">🛒</span>                disabled={isProcessing}

                    <span className="text-oak-600">Shipping</span>

                    <span className="text-green-600 font-medium">Free</span>            </div>                className="text-red-600 hover:text-red-800 font-medium disabled:opacity-50"

                  </div>

                  <div className="border-t pt-3">            <h2 className="text-2xl font-semibold text-oak-800 mb-4">Your cart is empty</h2>              >

                    <div className="flex justify-between text-lg">

                      <span className="font-semibold text-oak-800">Total</span>            <p className="text-oak-600 mb-8 max-w-md mx-auto">                Clear Cart

                      <span className="font-bold text-oak-800">€{getTotalPrice().toFixed(2)}</span>

                    </div>              Looks like you haven't added any beautiful oak furniture to your cart yet.               </button>

                  </div>

                </div>              Start exploring our collection!            )}



                <button            </p>          </div>

                  className="w-full bg-oak-600 text-white py-3 rounded-lg hover:bg-oak-700 transition-colors font-semibold mb-4"

                  onClick={() => alert('Checkout functionality coming next!')}            <Link        </div>

                >

                  Proceed to Checkout              href="/products"      </section>

                </button>

              className="bg-oak-600 text-white px-8 py-3 rounded-lg hover:bg-oak-700 transition-colors font-semibold"

                <Link

                  href="/products"            >      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

                  className="block w-full text-center bg-oak-100 text-oak-800 py-3 rounded-lg hover:bg-oak-200 transition-colors font-medium"

                >              Browse Products        {isEmpty ? (

                  Continue Shopping

                </Link>            </Link>          /* Empty Cart */



                <div className="mt-6 p-4 bg-oak-50 rounded-lg">          </div>          <div className="text-center py-16">

                  <h4 className="font-semibold text-oak-800 mb-2">Free Delivery</h4>

                  <p className="text-sm text-oak-600">        ) : (            <div className="text-8xl mb-6">🛒</div>

                    Free delivery within 50km of our workshop in Latvia.

                  </p>          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">            <h2 className="text-2xl font-bold text-oak-800 mb-4">Your cart is empty</h2>

                </div>

              </div>            {/* Cart Items */}            <p className="text-oak-600 mb-8 max-w-md mx-auto">

            </div>

          </div>            <div className="lg:col-span-2 space-y-4">              Looks like you haven't added any items to your cart yet. 

        )}

      </div>              <div className="flex justify-between items-center mb-6">              Start shopping to fill it up!

    </div>

  );                <h2 className="text-xl font-semibold text-oak-800">Cart Items</h2>            </p>

}
                <button            <div className="flex flex-col sm:flex-row gap-4 justify-center">

                  onClick={clearCart}              <Link

                  className="text-red-600 hover:text-red-700 text-sm flex items-center space-x-1"                href="/products"

                >                className="bg-oak-600 hover:bg-oak-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors"

                  <DeleteIcon className="w-4 h-4" />              >

                  <span>Clear Cart</span>                Browse All Products

                </button>              </Link>

              </div>              <Link

                href="/categories/tabletops"

              {cart.map((item) => (                className="bg-transparent border-2 border-oak-600 text-oak-600 hover:bg-oak-600 hover:text-white font-semibold py-3 px-8 rounded-lg transition-colors"

                <div key={item.id} className="bg-white rounded-lg shadow-sm p-6 flex gap-4">              >

                  {/* Product Image */}                Shop Tabletops

                  <div className="w-24 h-24 bg-oak-50 rounded-lg flex-shrink-0 overflow-hidden">              </Link>

                    {item.image ? (            </div>

                      <img          </div>

                        src={item.image}        ) : (

                        alt={item.name}          /* Cart with Items */

                        className="w-full h-full object-cover"          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                      />            

                    ) : (            {/* Cart Items */}

                      <div className="w-full h-full flex items-center justify-center text-2xl">🪵</div>            <div className="lg:col-span-2">

                    )}              <div className="bg-white rounded-lg shadow-sm">

                  </div>                <div className="p-6 border-b border-gray-200">

                  <h2 className="text-xl font-semibold text-oak-800">

                  {/* Product Details */}                    Cart Items ({cart?.items?.length || 0})

                  <div className="flex-1">                  </h2>

                    <div className="flex justify-between items-start mb-2">                </div>

                      <div>                

                        <h3 className="font-semibold text-oak-800 text-lg">{item.name}</h3>                <div className="divide-y divide-gray-200">

                        <p className="text-sm text-oak-600">{item.category}</p>                  {cart?.items?.map((item) => (

                      </div>                    <div key={`${item.product_id}-${item.variant_id || 'default'}`} className="p-6">

                      <button                      <div className="flex items-start space-x-4">

                        onClick={() => removeItem(item.id)}                        

                        className="text-red-500 hover:text-red-700 p-1"                        {/* Product Image */}

                        title="Remove item"                        <Link href={`/products/${item.product.seo_slug}`} className="flex-shrink-0">

                      >                          <div className="w-24 h-24 bg-oak-100 rounded-lg overflow-hidden">

                        <DeleteIcon className="w-5 h-5" />                            {item.product.image_url ? (

                      </button>                              <img

                    </div>                                src={item.product.image_url}

                                alt={item.product.name}

                    <div className="flex justify-between items-center">                                className="w-full h-full object-cover hover:scale-105 transition-transform"

                      <div className="text-xl font-bold text-oak-800">                              />

                        €{item.price.toFixed(2)}                            ) : (

                      </div>                              <div className="w-full h-full flex items-center justify-center text-oak-400 text-2xl">

                                <TableBar sx={{ fontSize: 32 }} />

                      {/* Quantity Controls */}                              </div>

                      <div className="flex items-center space-x-3">                            )}

                        <button                          </div>

                          onClick={() => updateQuantity(item.id, item.quantity - 1)}                        </Link>

                          className="w-8 h-8 bg-oak-100 hover:bg-oak-200 rounded-full flex items-center justify-center transition-colors"

                        >                        {/* Product Details */}

                          <RemoveIcon className="w-4 h-4 text-oak-600" />                        <div className="flex-1 min-w-0">

                        </button>                          <Link 

                                                    href={`/products/${item.product.seo_slug}`}

                        <span className="font-semibold text-oak-800 min-w-[2rem] text-center">                            className="text-lg font-semibold text-oak-800 hover:text-oak-600 transition-colors"

                          {item.quantity}                          >

                        </span>                            {item.product.name}

                                                  </Link>

                        <button                          

                          onClick={() => updateQuantity(item.id, item.quantity + 1)}                          <div className="mt-1 space-y-1 text-sm text-oak-600">

                          className="w-8 h-8 bg-oak-100 hover:bg-oak-200 rounded-full flex items-center justify-center transition-colors"                            {item.product.wood_type && (

                        >                              <div>Material: {item.product.wood_type}</div>

                          <AddIcon className="w-4 h-4 text-oak-600" />                            )}

                        </button>                            {item.product.dimensions && (

                      </div>                              <div>Size: {item.product.dimensions}</div>

                    </div>                            )}

                            {item.product.finish && (

                    <div className="mt-2 text-right text-sm text-oak-600">                              <div>Finish: {item.product.finish}</div>

                      Subtotal: €{(item.price * item.quantity).toFixed(2)}                            )}

                    </div>                          </div>

                  </div>

                </div>                          <div className="mt-4 flex items-center justify-between">

              ))}                            

            </div>                            {/* Quantity Controls */}

                            <div className="flex items-center space-x-2">

            {/* Order Summary */}                              <label className="text-sm font-medium text-oak-700">Qty:</label>

            <div className="lg:col-span-1">                              <button

              <div className="bg-white rounded-lg shadow-sm p-6 sticky top-8">                                onClick={() => handleQuantityChange(item.product_id, item.quantity - 1)}

                <h2 className="text-xl font-semibold text-oak-800 mb-6">Order Summary</h2>                                disabled={item.quantity <= 1 || isProcessing}

                                                className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 disabled:opacity-50"

                <div className="space-y-3 mb-6">                              >

                  <div className="flex justify-between">                                −

                    <span className="text-oak-600">Subtotal ({getTotalItems()} items)</span>                              </button>

                    <span className="font-semibold">€{getTotalPrice().toFixed(2)}</span>                              <span className="w-12 text-center font-medium">{item.quantity}</span>

                  </div>                              <button

                  <div className="flex justify-between">                                onClick={() => handleQuantityChange(item.product_id, item.quantity + 1)}

                    <span className="text-oak-600">Shipping</span>                                disabled={isProcessing}

                    <span className="text-green-600 font-medium">Free</span>                                className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 disabled:opacity-50"

                  </div>                              >

                  <div className="border-t pt-3">                                +

                    <div className="flex justify-between text-lg">                              </button>

                      <span className="font-semibold text-oak-800">Total</span>                            </div>

                      <span className="font-bold text-oak-800">€{getTotalPrice().toFixed(2)}</span>

                    </div>                            {/* Price and Remove */}

                  </div>                            <div className="text-right">

                </div>                              <div className="text-lg font-semibold text-oak-800">

                                {formatPrice(calculateItemTotal(item.product.price, item.quantity))}

                <button                              </div>

                  className="w-full bg-oak-600 text-white py-3 rounded-lg hover:bg-oak-700 transition-colors font-semibold mb-4"                              <div className="text-sm text-oak-600">

                  onClick={() => alert('Checkout functionality will be implemented next!')}                                {formatPrice(item.product.price)} each

                >                              </div>

                  Proceed to Checkout                              <button

                </button>                                onClick={() => handleRemoveItem(item.product_id)}

                                disabled={isProcessing}

                <Link                                className="mt-2 text-sm text-red-600 hover:text-red-800 disabled:opacity-50"

                  href="/products"                              >

                  className="block w-full text-center bg-oak-100 text-oak-800 py-3 rounded-lg hover:bg-oak-200 transition-colors font-medium"                                Remove

                >                              </button>

                  Continue Shopping                            </div>

                </Link>                          </div>

                        </div>

                {/* Delivery Info */}                      </div>

                <div className="mt-6 p-4 bg-oak-50 rounded-lg">                    </div>

                  <h4 className="font-semibold text-oak-800 mb-2">Free Delivery</h4>                  ))}

                  <p className="text-sm text-oak-600">                </div>

                    Free delivery within 50km of our workshop in Latvia.               </div>

                    Professional assembly service available.            </div>

                  </p>

                </div>            {/* Order Summary */}

              </div>            <div className="lg:col-span-1">

            </div>              <div className="bg-white rounded-lg shadow-sm p-6 sticky top-8">

          </div>                <h2 className="text-xl font-semibold text-oak-800 mb-6">Order Summary</h2>

        )}                

      </div>                <div className="space-y-4">

    </div>                  <div className="flex justify-between text-oak-700">

  );                    <span>Subtotal ({cart?.items?.length || 0} items)</span>

}                    <span>{formatPrice(calculateCartTotal())}</span>
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