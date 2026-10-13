// src/components/OrdersBoardView.jsx
import React, { useState } from 'react';
import { 
  Package, 
  Clock, 
  Truck, 
  CheckCircle2, 
  AlertTriangle, 
  ExternalLink, 
  Send, 
  CreditCard, 
  ShieldCheck,
  Search,
  Filter
} from 'lucide-react';
import { playTapSound, playNotificationSound } from '../utils/audio';

export default function OrdersBoardView({ orders, onSendDelayWhatsApp }) {
  const [filterText, setFilterText] = useState('');

  const filteredOrders = (orders || []).filter((o) => {
    return (
      o.id.toLowerCase().includes(filterText.toLowerCase()) ||
      o.customerName.toLowerCase().includes(filterText.toLowerCase()) ||
      o.city.toLowerCase().includes(filterText.toLowerCase())
    );
  });

  const processingOrders = filteredOrders.filter(o => o.status === 'processing');
  const shippedOrders = filteredOrders.filter(o => o.status === 'shipped');
  const deliveredOrders = filteredOrders.filter(o => o.status === 'delivered');

  const delayedOrders = filteredOrders.filter(o => o.isDelayed);

  return (
    <div className="space-y-6">
      
      {/* Top Banner: Delayed Order Alert (Function 6: Must Build) */}
      {delayedOrders.length > 0 && (
        <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-950/80 via-slate-900 to-slate-900 border border-amber-500/40 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4 animate-fade-in">
          <div className="flex items-start space-x-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 shrink-0">
              <AlertTriangle className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-bold text-sm text-white">Delayed Order Flag Triggered</span>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  +54h Transit Lag
                </span>
              </div>
              <p className="text-xs text-slate-300 mt-1">
                Order <strong>#WC-9432</strong> for <strong>Aarav Sharma</strong> held at DTDC Bhiwandi Hub. Sandbox CRM detected courier bottleneck exceeding 48h SLA.
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              playTapSound();
              onSendDelayWhatsApp(delayedOrders[0]);
            }}
            className="flex items-center space-x-2 px-3.5 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 text-xs font-bold shadow-glow-amber transition active:scale-95 shrink-0"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Send WhatsApp Delay Update & ₹50 Coupon</span>
          </button>
        </div>
      )}

      {/* Filter and Stats Bar */}
      <div className="glass-panel rounded-xl p-4 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center space-x-3 w-full sm:w-auto">
          <h2 className="text-base font-bold text-white flex items-center">
            <Package className="w-4 h-4 mr-2 text-indigo-400" />
            WooCommerce Order Pipeline
          </h2>
          <span className="text-xs font-mono text-slate-400 bg-slate-800 px-2 py-0.5 rounded">
            {filteredOrders.length} orders
          </span>
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Search order ID, customer..."
            value={filterText}
            onChange={(e) => setFilterText(e.target.value)}
            className="w-full bg-slate-900 border border-slate-700/80 rounded-lg pl-8 pr-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
          />
        </div>
      </div>

      {/* Kanban Pipeline Columns */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Column 1: Processing */}
        <div className="space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <div className="flex items-center space-x-2">
              <span className="w-2.5 h-2.5 rounded-full bg-sky-400"></span>
              <span className="font-bold text-sm text-slate-200">Processing</span>
            </div>
            <span className="px-2 py-0.5 rounded text-xs font-mono bg-sky-500/10 text-sky-400 border border-sky-500/20 font-semibold">
              {processingOrders.length}
            </span>
          </div>

          <div className="space-y-3">
            {processingOrders.map((order) => (
              <OrderCard key={order.id} order={order} />
            ))}
            {processingOrders.length === 0 && (
              <div className="text-center py-8 text-xs text-slate-500 italic">No processing orders.</div>
            )}
          </div>
        </div>

        {/* Column 2: Shipped */}
        <div className="space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <div className="flex items-center space-x-2">
              <span className="w-2.5 h-2.5 rounded-full bg-indigo-400"></span>
              <span className="font-bold text-sm text-slate-200">Shipped</span>
            </div>
            <span className="px-2 py-0.5 rounded text-xs font-mono bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 font-semibold">
              {shippedOrders.length}
            </span>
          </div>

          <div className="space-y-3">
            {shippedOrders.map((order) => (
              <OrderCard key={order.id} order={order} />
            ))}
          </div>
        </div>

        {/* Column 3: Delivered */}
        <div className="space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <div className="flex items-center space-x-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
              <span className="font-bold text-sm text-slate-200">Delivered</span>
            </div>
            <span className="px-2 py-0.5 rounded text-xs font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-semibold">
              {deliveredOrders.length}
            </span>
          </div>

          <div className="space-y-3">
            {deliveredOrders.map((order) => (
              <OrderCard key={order.id} order={order} />
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}

function OrderCard({ order }) {
  const isCod = order.paymentMethod.toLowerCase().includes('cod') || order.paymentMethod.toLowerCase().includes('cash');

  return (
    <div className={`glass-panel rounded-xl p-4 transition-all space-y-3 ${
      order.isDelayed 
        ? 'border-amber-500/70 bg-amber-950/20 shadow-glow-amber' 
        : 'hover:border-slate-700'
    }`}>
      {/* Top Header */}
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center space-x-2">
            <span className="font-bold font-mono text-sm text-white">#{order.id}</span>
            {order.isDelayed && (
              <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40 animate-pulse">
                Delayed +54h
              </span>
            )}
          </div>
          <span className="text-xs text-slate-300 font-medium block mt-0.5">{order.customerName}</span>
          <span className="text-[10px] text-slate-500">{order.city} • {order.date}</span>
        </div>

        <div className="text-right">
          <span className="text-sm font-bold font-mono text-white block">₹{order.total.toLocaleString('en-IN')}</span>
          <span className={`inline-block px-1.5 py-0.5 rounded text-[9px] font-bold border mt-0.5 ${
            isCod 
              ? 'bg-rose-500/15 text-rose-300 border-rose-500/30' 
              : 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30'
          }`}>
            {isCod ? 'COD' : 'Prepaid UPI'}
          </span>
        </div>
      </div>

      {/* Items List */}
      <div className="p-2.5 rounded-lg bg-slate-900/60 border border-slate-800/80 space-y-1.5">
        {(order.items || []).map((item, idx) => (
          <div key={idx} className="flex items-center justify-between text-xs">
            <span className="text-slate-300 truncate max-w-[190px]">{item.name}</span>
            <span className="text-slate-400 font-mono text-[11px] shrink-0">x{item.qty}</span>
          </div>
        ))}
      </div>

      {/* Tracking info if shipped */}
      {order.trackingNumber && (
        <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1 border-t border-slate-800">
          <span className="flex items-center">
            <Truck className="w-3 h-3 mr-1 text-indigo-400" />
            {order.carrier || 'Courier'}
          </span>
          <span className="font-mono text-indigo-300 font-medium">{order.trackingNumber}</span>
        </div>
      )}

      {/* Delay reason if flagged */}
      {order.isDelayed && order.delayReason && (
        <div className="p-2 rounded bg-amber-500/10 border border-amber-500/20 text-[10px] text-amber-300 leading-tight">
          ⚠️ <strong>Carrier Delay:</strong> {order.delayReason}
        </div>
      )}

      {/* Order Notes from AI write-back */}
      {order.notes?.length > 0 && (
        <div className="text-[10px] text-slate-400 italic pt-1 border-t border-slate-800/60 truncate" title={order.notes[order.notes.length - 1]}>
          📝 {order.notes[order.notes.length - 1]}
        </div>
      )}
    </div>
  );
}
