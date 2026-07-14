import React, { useState } from 'react';
import { ShoppingCart, Trash2, CreditCard, BarChart3, Plus, Minus, Check, ArrowRight } from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  image: string;
  rating: number;
}

const PRODUCTS: Product[] = [
  { id: 1, name: "IntelliMesh IoT Node v2", price: 49.99, category: "Hardware", image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=300&q=80", rating: 4.8 },
  { id: 2, name: "VectorDB Managed Cloud Node", price: 199.00, category: "SaaS Cloud", image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=300&q=80", rating: 4.9 },
  { id: 3, name: "NeuralSynth Speech SoC Board", price: 89.50, category: "Hardware", image: "https://images.unsplash.com/photo-1601524909162-be87252be298?auto=format&fit=crop&w=300&q=80", rating: 4.7 },
  { id: 4, name: "DevOps Orchestration Engine", price: 29.99, category: "Software", image: "https://images.unsplash.com/photo-1618401471353-b98aedd07871?auto=format&fit=crop&w=300&q=80", rating: 4.6 }
];

const ANALYTICS_DATA = [
  { day: "Mon", sales: 2400, transactions: 120 },
  { day: "Tue", sales: 1398, transactions: 98 },
  { day: "Wed", sales: 9800, transactions: 340 },
  { day: "Thu", sales: 3908, transactions: 180 },
  { day: "Fri", sales: 4800, transactions: 210 },
  { day: "Sat", sales: 3800, transactions: 190 },
  { day: "Sun", sales: 4300, transactions: 200 }
];

export const FullStackECommerce: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'storefront' | 'cart' | 'checkout' | 'admin'>('storefront');
  const [cart, setCart] = useState<{ product: Product; quantity: number }[]>([]);
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [discountCode, setDiscountCode] = useState('');
  const [discountApplied, setDiscountApplied] = useState(false);
  const [orderCompleted, setOrderCompleted] = useState(false);

  // Card payment mock state
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCVC, setCardCVC] = useState('');

  const handleAddToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        return prev.map(item => item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { product, quantity: 1 }];
    });
  };

  const handleUpdateQuantity = (productId: number, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.product.id === productId) {
        const nextQty = item.quantity + delta;
        return nextQty > 0 ? { ...item, quantity: nextQty } : item;
      }
      return item;
    }));
  };

  const handleRemoveFromCart = (productId: number) => {
    setCart(prev => prev.filter(item => item.product.id !== productId));
  };

  const cartTotal = cart.reduce((acc, item) => acc + (item.product.price * item.quantity), 0);
  const discountAmount = discountApplied ? cartTotal * 0.15 : 0;
  const grandTotal = Math.max(0, cartTotal - discountAmount);

  const applyPromo = () => {
    if (discountCode.toUpperCase() === 'ATS15' || discountCode.toUpperCase() === 'JULES15') {
      setDiscountApplied(true);
      alert("Promo code applied: 15% discount registered!");
    } else {
      alert("Invalid mock promo code. Try 'JULES15'!");
    }
  };

  const handleCompletePayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!cardNumber || !cardExpiry || !cardCVC) {
      alert("Please fill in all credit card details.");
      return;
    }
    setOrderCompleted(true);
    setCart([]);
    setDiscountApplied(false);
    setDiscountCode('');
    setActiveTab('checkout');
  };

  const filteredProducts = categoryFilter === 'All'
    ? PRODUCTS
    : PRODUCTS.filter(p => p.category === categoryFilter);

  return (
    <div className="space-y-8 py-4">
      <div className="border-b border-slate-200 dark:border-slate-800 pb-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">Full Stack E-Commerce</h1>
          <p className="text-slate-500 dark:text-slate-400">Experience a complete storefront flow, including reactive filters, shopping carts, promo algorithms, and high-fidelity Stripe payment checkout.</p>
        </div>

        {/* Dashboard sub tabs */}
        <div className="flex bg-slate-100 dark:bg-slate-900 p-1 rounded-xl w-fit self-start">
          <button
            onClick={() => { setActiveTab('storefront'); setOrderCompleted(false); }}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'storefront' ? 'bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 shadow-sm' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Storefront
          </button>
          <button
            onClick={() => { setActiveTab('cart'); setOrderCompleted(false); }}
            className={`relative px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'cart' ? 'bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 shadow-sm' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Cart ({cart.reduce((a, b) => a + b.quantity, 0)})
          </button>
          <button
            onClick={() => { setActiveTab('admin'); setOrderCompleted(false); }}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'admin' ? 'bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 shadow-sm' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Admin Dashboard
          </button>
        </div>
      </div>

      {activeTab === 'storefront' && (
        <div className="space-y-6">
          <div className="flex flex-wrap gap-2">
            {['All', 'Hardware', 'SaaS Cloud', 'Software'].map(cat => (
              <button
                key={cat}
                onClick={() => setCategoryFilter(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-colors cursor-pointer ${
                  categoryFilter === cat
                    ? 'bg-indigo-600 border-indigo-600 text-white'
                    : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredProducts.map(product => (
              <div key={product.id} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-sm flex flex-col justify-between">
                <div className="relative h-44 bg-slate-100 dark:bg-slate-950">
                  <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                  <span className="absolute top-2.5 right-2.5 px-2 py-1 text-[10px] font-black uppercase tracking-wider rounded bg-white/95 text-slate-800 shadow-sm">
                    {product.category}
                  </span>
                </div>

                <div className="p-4 space-y-4 flex-1 flex flex-col justify-between">
                  <div className="space-y-1">
                    <h4 className="font-extrabold text-slate-900 dark:text-white text-sm line-clamp-1">{product.name}</h4>
                    <div className="flex items-center gap-1.5 text-xs text-amber-500 font-bold">
                      ★ {product.rating} <span className="text-slate-400 dark:text-slate-500">({Math.floor(product.rating * 12)} reviews)</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800/80">
                    <span className="font-black text-slate-900 dark:text-white text-base">${product.price.toFixed(2)}</span>
                    <button
                      onClick={() => handleAddToCart(product)}
                      className="px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs flex items-center gap-1 transition-transform active:scale-95 cursor-pointer"
                    >
                      <Plus className="h-3.5 w-3.5" /> Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'cart' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            {cart.length === 0 ? (
              <div className="text-center py-16 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-8 text-slate-400">
                <ShoppingCart className="h-12 w-12 mx-auto text-slate-300 dark:text-slate-700 mb-2" />
                <p className="font-bold text-sm">Shopping Cart is Empty</p>
                <p className="text-xs mt-1">Navigate back to the storefront tab to add interactive mock nodes and digital cloud licenses.</p>
              </div>
            ) : (
              cart.map(item => (
                <div key={item.product.id} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 rounded-2xl flex items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <img src={item.product.image} className="h-16 w-16 rounded-xl object-cover" alt="" />
                    <div>
                      <h4 className="font-extrabold text-sm text-slate-900 dark:text-white">{item.product.name}</h4>
                      <p className="text-xs text-slate-500">${item.product.price.toFixed(2)} each</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="flex items-center border border-slate-200 dark:border-slate-800 rounded-lg p-0.5">
                      <button onClick={() => handleUpdateQuantity(item.product.id, -1)} className="p-1 hover:bg-slate-100 dark:hover:bg-slate-800 rounded text-slate-500">
                        <Minus className="h-3 w-3" />
                      </button>
                      <span className="px-3 text-xs font-bold text-slate-900 dark:text-white">{item.quantity}</span>
                      <button onClick={() => handleUpdateQuantity(item.product.id, 1)} className="p-1 hover:bg-slate-100 dark:hover:bg-slate-800 rounded text-slate-500">
                        <Plus className="h-3 w-3" />
                      </button>
                    </div>

                    <button onClick={() => handleRemoveFromCart(item.product.id)} className="p-1.5 text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/20 rounded-lg transition-colors cursor-pointer">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Checkout Overview Sidepane */}
          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 h-fit space-y-6">
            <h3 className="font-extrabold text-slate-900 dark:text-white text-base">Order Review</h3>

            <div className="space-y-2 text-xs border-b border-slate-100 dark:border-slate-800 pb-4">
              <div className="flex justify-between font-medium text-slate-600 dark:text-slate-400">
                <span>Subtotal</span>
                <span>${cartTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-medium text-slate-600 dark:text-slate-400">
                <span>Estimated VAT / Tax</span>
                <span>$0.00</span>
              </div>
              {discountApplied && (
                <div className="flex justify-between font-semibold text-emerald-600 dark:text-emerald-400">
                  <span>15% Promotion Applied</span>
                  <span>-${discountAmount.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between font-extrabold text-sm text-slate-900 dark:text-white pt-2 border-t border-dashed border-slate-200 dark:border-slate-800">
                <span>Grand Total</span>
                <span>${grandTotal.toFixed(2)}</span>
              </div>
            </div>

            {/* Promo Area */}
            <div className="space-y-2">
              <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">Promo Discount</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={discountCode}
                  onChange={(e) => setDiscountCode(e.target.value)}
                  placeholder="Try JULES15"
                  className="flex-1 p-2 text-xs bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg text-slate-900 dark:text-white"
                />
                <button onClick={applyPromo} className="px-3 bg-slate-800 hover:bg-slate-700 text-white rounded-lg text-xs font-bold cursor-pointer">
                  Apply
                </button>
              </div>
            </div>

            <button
              onClick={() => setActiveTab('checkout')}
              disabled={cart.length === 0}
              className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-200 dark:disabled:bg-slate-800 disabled:text-slate-400 text-white font-semibold text-sm rounded-xl transition-all flex items-center justify-center gap-1 cursor-pointer"
            >
              Proceed to Payment Gateway <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}

      {activeTab === 'checkout' && (
        <div className="max-w-md mx-auto">
          {orderCompleted ? (
            <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl border border-slate-200 dark:border-slate-800 text-center space-y-6">
              <div className="h-12 w-12 rounded-full bg-emerald-100 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto">
                <Check className="h-6 w-6" strokeWidth={3} />
              </div>
              <div className="space-y-1.5">
                <h3 className="font-extrabold text-slate-900 dark:text-white text-lg">Stripe Mock Payment Successful</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  Your simulated transactional pipeline was successfully parsed. Checkout token registers have been logged securely.
                </p>
              </div>
              <button
                onClick={() => { setOrderCompleted(false); setActiveTab('storefront'); }}
                className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-100 text-white dark:text-slate-900 font-bold text-xs rounded-xl cursor-pointer"
              >
                Back to Digital Catalog
              </button>
            </div>
          ) : (
            <form onSubmit={handleCompletePayment} className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
              <div className="flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-4 mb-2">
                <CreditCard className="h-5 w-5 text-indigo-500" />
                <h3 className="font-extrabold text-slate-900 dark:text-white text-base">Secured Checkout Gateway</h3>
              </div>

              <div className="space-y-3 text-xs font-semibold">
                <div>
                  <label className="block text-slate-500 mb-1">Card Number</label>
                  <input
                    required
                    type="text"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    placeholder="4242 4242 4242 4242 (Stripe Mock)"
                    className="w-full p-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-900 dark:text-white"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-500 mb-1">Expiration Date</label>
                    <input
                      required
                      type="text"
                      value={cardExpiry}
                      onChange={(e) => setCardExpiry(e.target.value)}
                      placeholder="MM/YY"
                      className="w-full p-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-900 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-500 mb-1">CVC Code</label>
                    <input
                      required
                      type="text"
                      value={cardCVC}
                      onChange={(e) => setCardCVC(e.target.value)}
                      placeholder="123"
                      className="w-full p-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-900 dark:text-white"
                    />
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="w-full mt-4 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl transition-all cursor-pointer shadow-md"
              >
                Confirm Payment & Authorize
              </button>
            </form>
          )}
        </div>
      )}

      {activeTab === 'admin' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl">
              <div className="text-[10px] font-bold text-slate-400 uppercase">Gross Simulated Sales</div>
              <div className="text-xl font-black text-slate-950 dark:text-white mt-1">$34,086.00</div>
              <div className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold mt-1">↑ 14% vs. previous week</div>
            </div>
            <div className="p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl">
              <div className="text-[10px] font-bold text-slate-400 uppercase">Active Subscribers</div>
              <div className="text-xl font-black text-slate-950 dark:text-white mt-1">1,842 nodes</div>
              <div className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold mt-1">↑ 4% this month</div>
            </div>
            <div className="p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl">
              <div className="text-[10px] font-bold text-slate-400 uppercase">Redis Memory Cache hit</div>
              <div className="text-xl font-black text-slate-950 dark:text-white mt-1">98.42%</div>
              <div className="text-[10px] text-indigo-600 dark:text-indigo-400 font-bold mt-1">High performance (0.12ms)</div>
            </div>
          </div>

          {/* Recharts Analytics Area */}
          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-extrabold text-slate-900 dark:text-white text-base flex items-center gap-1.5">
                <BarChart3 className="h-5 w-5 text-indigo-500" /> Weekly Sales Performance Chart
              </h3>
            </div>

            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={ANALYTICS_DATA}>
                  <defs>
                    <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#6366f1" stopOpacity={0.2}/>
                      <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                  <XAxis dataKey="day" tickLine={false} style={{ fontSize: '10px', fontWeight: 'bold' }} stroke="#94a3b8" />
                  <YAxis tickLine={false} axisLine={false} style={{ fontSize: '10px', fontWeight: 'bold' }} stroke="#94a3b8" />
                  <Tooltip />
                  <Area type="monotone" dataKey="sales" stroke="#6366f1" strokeWidth={2} fillOpacity={1} fill="url(#colorSales)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
export default FullStackECommerce;
