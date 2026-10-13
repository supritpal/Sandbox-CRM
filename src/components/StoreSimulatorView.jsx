// src/components/StoreSimulatorView.jsx
import React, { useState } from 'react';
import { 
  Store, 
  ShoppingBag, 
  CreditCard, 
  Send, 
  CheckCircle2, 
  RefreshCw, 
  ExternalLink, 
  Sparkles, 
  Code,
  Tag,
  ArrowRight
} from 'lucide-react';
import { playTapSound, playNotificationSound } from '../utils/audio';

export default function StoreSimulatorView({ 
  onTriggerWebhook, 
  onWriteBack, 
  onNavigateToOrders,
  storeConfig 
}) {
  const [selectedProduct, setSelectedProduct] = useState('Complete Anti-Pollution Men\'s Kit');
  const [productPrice, setProductPrice] = useState(3850);
  const [customerName, setCustomerName] = useState('Pooja Nair');
  const [customerPhone, setCustomerPhone] = useState('+91 98204 99120');
  const [customerCity, setCustomerCity] = useState('Mumbai');
  const [paymentMethod, setPaymentMethod] = useState('Razorpay UPI (Prepaid)');
  const [placingOrder, setPlacingOrder] = useState(false);
  const [lastWebhookResponse, setLastWebhookResponse] = useState(null);

  // Write-back tester state
  const [couponCode, setCouponCode] = useState('WINBACK10-AARAV');
  const [orderIdForNote, setOrderIdForNote] = useState('WC-8421');
  const [orderNote, setOrderNote] = useState('Retention offer 10% OFF delivered via WhatsApp. Customer reorder in progress.');
  const [writeBackResponse, setWriteBackResponse] = useState(null);

  const products = [
    { name: 'Complete Anti-Pollution Men\'s Kit', price: 3850, margin: 28.5 },
    { name: '24K Gold Peptide Radiance Elixir (50ml)', price: 4400, margin: 38 },
    { name: 'Organic Cedarwood Beard Growth Oil', price: 1499, margin: 35 },
    { name: 'Ultra-Hydrating Barrier Repair Moisturizer', price: 1850, margin: 32 }
  ];

  const handleProductSelect = (p) => {
    setSelectedProduct(p.name);
    setProductPrice(p.price);
  };

  const handlePlaceOrder = async () => {
    playTapSound();
    setPlacingOrder(true);

    const payload = {
      id: `WC-${Math.floor(9500 + Math.random() * 400)}`,
      status: 'processing',
      total: productPrice,
      payment_method_title: paymentMethod,
      billing: {
        first_name: customerName.split(' ')[0],
        last_name: customerName.split(' ')[1] || '',
        phone: customerPhone,
        city: customerCity,
        email: `${customerName.toLowerCase().replace(' ', '.')}@example.in`
      },
      line_items: [
        { name: selectedProduct, qty: 1, price: productPrice, marginPercent: 30 }
      ]
    };

    try {
      const res = await onTriggerWebhook(payload);
      playNotificationSound();
      setLastWebhookResponse({
        event: 'order.created',
        orderId: payload.id,
        timestamp: new Date().toLocaleTimeString(),
        data: res
      });
    } finally {
      setPlacingOrder(false);
    }
  };

  const handleTestWriteBack = async () => {
    playTapSound();
    const res = await onWriteBack(couponCode, orderIdForNote, orderNote);
    playNotificationSound();
    setWriteBackResponse(res);
  };

  return (
    <div className="space-y-6">
      
      {/* Header Banner */}
      <div className="glass-panel rounded-2xl p-6 border-blue-500/30">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-500/15 border border-blue-500/30 text-blue-400 text-xs font-semibold">
              <Store className="w-3.5 h-3.5" />
              <span>WooCommerce Storefront & Webhook Foundation (Module 1)</span>
            </div>
            <h1 className="text-2xl font-extrabold text-white">
              WooCommerce Storefront Simulator
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
              Demonstrates <strong>instant two-way synchronization</strong> between the WooCommerce store and Sandbox CRM. Place a live test order below to trigger an <code>order.created</code> webhook, or execute coupon write-backs.
            </p>
          </div>

          <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300 font-mono shrink-0">
            <div className="flex items-center text-emerald-400 font-bold mb-1">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse mr-2"></span>
              Live WooCommerce API Hooked
            </div>
            <div className="text-[11px] text-slate-400 truncate max-w-xs">{storeConfig?.storeUrl || 'demo-grooming-store.instawp.xyz'}</div>
          </div>
        </div>
      </div>

      {/* Two Column Simulator: Store Checkout & Live Webhook Inspector */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Simulated Storefront Checkout (7 Cols) */}
        <div className="lg:col-span-7 glass-panel rounded-2xl p-6 space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <h2 className="text-base font-bold text-white flex items-center">
              <ShoppingBag className="w-4 h-4 mr-2 text-blue-400" />
              Storefront Checkout (Step 1 of Demo Flow)
            </h2>
            <span className="text-xs text-indigo-400 font-semibold bg-indigo-500/10 px-2.5 py-1 rounded">
              Interactive Pitch Trigger
            </span>
          </div>

          {/* Product Picker */}
          <div>
            <label className="text-xs font-semibold text-slate-300 uppercase block mb-2">Select Item to Purchase</label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {products.map((p) => {
                const isSelected = selectedProduct === p.name;
                return (
                  <div
                    key={p.name}
                    onClick={() => handleProductSelect(p)}
                    className={`p-3 rounded-xl border cursor-pointer transition ${
                      isSelected
                        ? 'bg-indigo-600/20 border-indigo-500 shadow-glow-indigo text-white'
                        : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 text-slate-300'
                    }`}
                  >
                    <div className="font-semibold text-xs truncate">{p.name}</div>
                    <div className="mt-1 flex items-center justify-between text-xs">
                      <span className="font-mono font-bold text-white">₹{p.price.toLocaleString('en-IN')}</span>
                      <span className="text-[10px] text-slate-400 font-mono">{p.margin}% Gross Margin</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Customer & Shipping Details */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="text-[11px] text-slate-400 block mb-1">Customer Name</label>
              <input
                type="text"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-indigo-500"
              />
            </div>
            <div>
              <label className="text-[11px] text-slate-400 block mb-1">Phone Number</label>
              <input
                type="text"
                value={customerPhone}
                onChange={(e) => setCustomerPhone(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-indigo-500"
              />
            </div>
            <div>
              <label className="text-[11px] text-slate-400 block mb-1">Shipping City</label>
              <input
                type="text"
                value={customerCity}
                onChange={(e) => setCustomerCity(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>

          {/* Payment Method */}
          <div>
            <label className="text-xs font-semibold text-slate-300 uppercase block mb-1.5">Payment Method</label>
            <div className="grid grid-cols-2 gap-3">
              {['Razorpay UPI (Prepaid)', 'Cash on Delivery (COD)'].map((method) => {
                const isSelected = paymentMethod === method;
                return (
                  <button
                    key={method}
                    type="button"
                    onClick={() => setPaymentMethod(method)}
                    className={`py-2 px-3 rounded-xl text-xs font-semibold border text-center transition ${
                      isSelected
                        ? 'bg-emerald-600/20 border-emerald-500 text-emerald-300 font-bold'
                        : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    {method}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Checkout Button */}
          <div className="pt-2 flex items-center justify-between">
            <div className="text-xs text-slate-400">
              Order Total: <strong className="text-white font-mono text-sm">₹{productPrice.toLocaleString('en-IN')}</strong>
            </div>

            <button
              onClick={handlePlaceOrder}
              disabled={placingOrder}
              className="flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-500 hover:to-indigo-500 text-white text-xs font-bold shadow-glow-indigo transition active:scale-95 disabled:opacity-50"
            >
              <Send className={`w-3.5 h-3.5 ${placingOrder ? 'animate-spin' : ''}`} />
              <span>{placingOrder ? 'Emitting Webhook...' : 'Place Order & Emit Webhook'}</span>
            </button>
          </div>
        </div>

        {/* Right Column: Live Webhook & Write-Back Inspector (5 Cols) */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Live Webhook Output Card (Function 1) */}
          <div className="glass-panel rounded-2xl p-5 space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <span className="font-bold text-xs text-white flex items-center">
                <Code className="w-3.5 h-3.5 mr-1.5 text-indigo-400" />
                Live Webhook Receiver (Function 1: Must Build)
              </span>
              <span className="text-[10px] text-emerald-400 font-mono">POST /api/webhooks/woocommerce</span>
            </div>

            {lastWebhookResponse ? (
              <div className="space-y-2 animate-fade-in">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-emerald-400 font-semibold flex items-center">
                    <CheckCircle2 className="w-3.5 h-3.5 mr-1 text-emerald-400" />
                    Webhook 200 OK Processed
                  </span>
                  <span className="text-slate-400 font-mono text-[10px]">{lastWebhookResponse.timestamp}</span>
                </div>

                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 font-mono text-[11px] text-slate-300 overflow-x-auto max-h-44">
                  <pre>{JSON.stringify(lastWebhookResponse, null, 2)}</pre>
                </div>

                <button
                  onClick={() => onNavigateToOrders()}
                  className="w-full py-1.5 rounded-lg bg-indigo-600/30 hover:bg-indigo-600/50 border border-indigo-500/40 text-indigo-300 text-xs font-semibold flex items-center justify-center space-x-1"
                >
                  <span>See Order #{lastWebhookResponse.orderId} in Tracking Board</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-1" />
                </button>
              </div>
            ) : (
              <div className="p-6 rounded-xl bg-slate-900/60 border border-slate-800/80 text-center text-xs text-slate-500 space-y-1">
                <p>Waiting for incoming webhook event...</p>
                <p className="text-[10px]">Click "Place Order" to trigger a real payload.</p>
              </div>
            )}
          </div>

          {/* Function 3: WooCommerce Write-Back Tester */}
          <div className="glass-panel rounded-2xl p-5 space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <span className="font-bold text-xs text-white flex items-center">
                <Tag className="w-3.5 h-3.5 mr-1.5 text-emerald-400" />
                WooCommerce Write-Back (Function 3)
              </span>
              <span className="text-[10px] text-indigo-400 font-mono">Coupons & Notes</span>
            </div>

            <p className="text-xs text-slate-400">
              Creates promotional coupons in WooCommerce and pushes internal AI notes into the order record.
            </p>

            <div className="space-y-2">
              <div>
                <label className="text-[10px] text-slate-400 block mb-0.5">Coupon Code to Sync</label>
                <input
                  type="text"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1 text-xs text-white font-mono"
                />
              </div>

              <div>
                <label className="text-[10px] text-slate-400 block mb-0.5">Order Note</label>
                <input
                  type="text"
                  value={orderNote}
                  onChange={(e) => setOrderNote(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1 text-xs text-white"
                />
              </div>

              <button
                onClick={handleTestWriteBack}
                className="w-full py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition active:scale-95 shadow"
              >
                Sync Coupon & Note to WooCommerce
              </button>

              {writeBackResponse && (
                <div className="p-2.5 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-[11px] text-emerald-300 animate-fade-in flex items-center">
                  <CheckCircle2 className="w-3.5 h-3.5 mr-1.5 text-emerald-400 shrink-0" />
                  <span>Coupon <strong>{writeBackResponse.couponCode}</strong> created in WooCommerce.</span>
                </div>
              )}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
