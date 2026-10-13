// src/components/Header.jsx
import React, { useState } from 'react';
import { 
  Bot, 
  Store, 
  RefreshCw, 
  RotateCcw, 
  Volume2, 
  VolumeX, 
  Sparkles,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';
import { isSoundEnabled, toggleSound, playTapSound } from '../utils/audio';

export default function Header({ 
  activeTab, 
  setActiveTab, 
  onSyncStore, 
  onResetDemo,
  syncing,
  stats
}) {
  const [soundOn, setSoundOn] = useState(isSoundEnabled());
  const [showSyncSuccess, setShowSyncSuccess] = useState(false);

  const handleSoundToggle = () => {
    const newVal = !soundOn;
    toggleSound(newVal);
    setSoundOn(newVal);
    if (newVal) playTapSound();
  };

  const handleSyncClick = async () => {
    playTapSound();
    await onSyncStore();
    setShowSyncSuccess(true);
    setTimeout(() => setShowSyncSuccess(false), 3000);
  };

  const navItems = [
    { id: 'dashboard', label: 'Dashboard & ROI', icon: '📊' },
    { id: 'customers', label: 'Customers 360', icon: '👥' },
    { id: 'orders', label: 'Order Pipeline', icon: '📦' },
    { id: 'agents', label: 'Multi-Agent Brain', icon: '🧠' },
    { id: 'twins', label: 'Digital Twin Lab', icon: '🧬' },
    { id: 'whatsapp', label: 'WhatsApp Phone', icon: '💬' },
    { id: 'store', label: 'WooCommerce Store', icon: '🛍️' },
    { id: 'guardrails', label: 'Guardrails & Settings', icon: '⚙️' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#0B0F19]/90 backdrop-blur-xl border-b border-slate-800/80">
      {/* Top Brand Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo & Connected Store */}
          <div className="flex items-center space-x-3 sm:space-x-4">
            <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-emerald-400 p-0.5 shadow-glow-indigo">
              <div className="w-full h-full bg-[#0B0F19] rounded-[10px] flex items-center justify-center">
                <Bot className="w-5 h-5 text-indigo-400" />
              </div>
            </div>
            
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-extrabold text-lg sm:text-xl tracking-tight bg-gradient-to-r from-white via-slate-100 to-indigo-200 bg-clip-text text-transparent">
                  Sandbox CRM
                </span>
                <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded text-[10px] font-semibold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                  <Sparkles className="w-3 h-3 mr-1" />
                  Multi-Agent AI
                </span>
              </div>
              <div className="flex items-center space-x-2 text-xs text-slate-400">
                <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                <span className="hidden md:inline font-mono">demo-grooming-store.instawp.xyz</span>
                <span className="md:hidden font-mono">WooCommerce Live</span>
              </div>
            </div>
          </div>

          {/* Quick Actions & Status */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            {/* Live Rupee Recovered Pill */}
            <div className="hidden lg:flex items-center space-x-2 px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-medium">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>AI Recovered: </span>
              <span className="font-bold font-mono text-emerald-300">
                ₹{(stats?.recoveredRevenue || 34850).toLocaleString('en-IN')}
              </span>
            </div>

            {/* Sync WooCommerce Store Button */}
            <button
              onClick={handleSyncClick}
              disabled={syncing}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium transition border border-slate-700/60 active:scale-95 disabled:opacity-50"
              title="Sync Customers & Orders from WooCommerce"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${syncing ? 'animate-spin text-indigo-400' : 'text-slate-400'}`} />
              <span className="hidden sm:inline">{syncing ? 'Syncing...' : 'Sync Store'}</span>
            </button>

            {/* Sound Toggle */}
            <button
              onClick={handleSoundToggle}
              className="p-2 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 transition border border-slate-700/60 active:scale-95 text-xs"
              title={soundOn ? 'Sound FX Enabled' : 'Sound FX Muted'}
            >
              {soundOn ? (
                <Volume2 className="w-4 h-4 text-emerald-400" />
              ) : (
                <VolumeX className="w-4 h-4 text-slate-500" />
              )}
            </button>

            {/* Reset Demo Button */}
            <button
              onClick={() => { playTapSound(); onResetDemo(); }}
              className="flex items-center space-x-1 px-3 py-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 border border-rose-500/30 text-xs font-medium transition active:scale-95"
              title="Reset Demo to Step 1"
            >
              <RotateCcw className="w-3.5 h-3.5 mr-0.5" />
              <span className="hidden sm:inline">Reset Demo</span>
            </button>
          </div>
        </div>

        {/* Sync Success Notification Bar */}
        {showSyncSuccess && (
          <div className="py-1 px-3 mb-2 rounded bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs flex items-center justify-center animate-fade-in">
            <CheckCircle2 className="w-3.5 h-3.5 mr-1.5 text-emerald-400" />
            WooCommerce store state synchronized successfully with Sandbox CRM.
          </div>
        )}

        {/* Nav Tabs Bar */}
        <nav className="flex space-x-1 overflow-x-auto py-2 border-t border-slate-800/60 no-scrollbar">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => { playTapSound(); setActiveTab(item.id); }}
                className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all duration-200 ${
                  isActive
                    ? 'bg-indigo-600 text-white shadow-glow-indigo font-semibold'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                }`}
              >
                <span>{item.icon}</span>
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
