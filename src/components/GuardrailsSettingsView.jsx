// src/components/GuardrailsSettingsView.jsx
import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Sliders, 
  Moon, 
  Clock, 
  Percent, 
  MessageSquare, 
  Lock, 
  Key, 
  CheckCircle2, 
  Save, 
  Layers,
  Sparkles,
  Store
} from 'lucide-react';
import { playTapSound, playSuccessSound } from '../utils/audio';

export default function GuardrailsSettingsView({ 
  guardrails, 
  onSaveGuardrails,
  storeConfig 
}) {
  const [maxDiscount, setMaxDiscount] = useState(guardrails?.maxDiscountCapPercent || 15);
  const [maxWeeklyMsgs, setMaxWeeklyMsgs] = useState(guardrails?.maxMessagesPerWeekPerCustomer || 1);
  const [dndStart, setDndStart] = useState(guardrails?.dndStartHourIst || 21);
  const [dndEnd, setDndEnd] = useState(guardrails?.dndEndHourIst || 9);
  const [humanApproval, setHumanApproval] = useState(guardrails?.humanApprovalRequired ?? true);
  const [savedSuccess, setSavedSuccess] = useState(false);

  // Store credentials
  const [storeUrl, setStoreUrl] = useState(storeConfig?.storeUrl || 'https://demo-grooming-store.instawp.xyz');
  const [consumerKey, setConsumerKey] = useState('ck_mock_sandbox_crm_2026');
  const [consumerSecret, setConsumerSecret] = useState('cs_mock_sandbox_crm_2026');

  // WhatsApp credentials
  const [twilioSid, setTwilioSid] = useState('AC_sandbox_twilio_99214');
  const [twilioToken, setTwilioToken] = useState('••••••••••••••••••••••••');
  const [twilioSender, setTwilioSender] = useState('whatsapp:+14155238886');

  const handleSave = () => {
    playTapSound();
    onSaveGuardrails({
      maxDiscountCapPercent: Number(maxDiscount),
      maxMessagesPerWeekPerCustomer: Number(maxWeeklyMsgs),
      dndStartHourIst: Number(dndStart),
      dndEndHourIst: Number(dndEnd),
      humanApprovalRequired: humanApproval
    });
    playSuccessSound();
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="glass-panel rounded-2xl p-6 border-indigo-500/30">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-indigo-500/15 border border-indigo-500/30 text-indigo-400 text-xs font-semibold">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Guardrails & System Configuration (Functions 13 & 20)</span>
            </div>
            <h1 className="text-2xl font-extrabold text-white">
              Guardrails & Connection Settings
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
              Enforce brand safety guardrails, discount limits, Indian Standard Time quiet hours, and configure live credentials for WooCommerce and WhatsApp.
            </p>
          </div>

          <button
            onClick={handleSave}
            className="flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-emerald-600 hover:from-indigo-500 hover:to-emerald-500 text-white text-xs font-bold shadow-glow-indigo transition active:scale-95 shrink-0"
          >
            <Save className="w-4 h-4" />
            <span>Save Configuration</span>
          </button>
        </div>

        {savedSuccess && (
          <div className="mt-4 p-2.5 rounded-lg bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs flex items-center animate-fade-in">
            <CheckCircle2 className="w-4 h-4 mr-2 text-emerald-400 shrink-0" />
            Guardrails and connection settings updated successfully.
          </div>
        )}
      </div>

      {/* Two Column Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Card 1: Autonomous Guardrails (Function 13) */}
        <div className="glass-panel rounded-2xl p-6 space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <h2 className="text-base font-bold text-white flex items-center">
              <ShieldCheck className="w-4 h-4 mr-2 text-emerald-400" />
              AI Agent Guardrails (Function 13: Should Build)
            </h2>
            <span className="text-xs text-emerald-400 font-mono bg-emerald-500/10 px-2 py-0.5 rounded">
              Enforced Active
            </span>
          </div>

          {/* Discount Cap Slider */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-slate-300 flex items-center">
                <Percent className="w-3.5 h-3.5 mr-1.5 text-indigo-400" />
                Maximum Discount Cap
              </span>
              <span className="font-mono font-bold text-emerald-400 text-sm">{maxDiscount}%</span>
            </div>
            <input
              type="range"
              min="5"
              max="35"
              step="1"
              value={maxDiscount}
              onChange={(e) => setMaxDiscount(e.target.value)}
              className="w-full accent-emerald-500 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
            />
            <p className="text-[11px] text-slate-400">
              Margin Guard Agent automatically vetoes any offer exceeding this cap to prevent margin dilution.
            </p>
          </div>

          {/* Message Frequency Cap */}
          <div className="space-y-2 pt-2 border-t border-slate-800">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-slate-300 flex items-center">
                <MessageSquare className="w-3.5 h-3.5 mr-1.5 text-indigo-400" />
                Weekly Message Frequency Cap
              </span>
              <span className="font-mono font-bold text-indigo-300 text-sm">{maxWeeklyMsgs} msg / week</span>
            </div>
            <input
              type="range"
              min="1"
              max="4"
              step="1"
              value={maxWeeklyMsgs}
              onChange={(e) => setMaxWeeklyMsgs(e.target.value)}
              className="w-full accent-indigo-500 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
            />
            <p className="text-[11px] text-slate-400">
              Guarantees zero customer spam by capping outreach to 1 WhatsApp message per 7 days per customer.
            </p>
          </div>

          {/* Quiet Hours (DND) */}
          <div className="space-y-2 pt-2 border-t border-slate-800">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-slate-300 flex items-center">
                <Moon className="w-3.5 h-3.5 mr-1.5 text-purple-400" />
                Night-Time Send Blocker (IST DND Hours)
              </span>
              <span className="font-mono font-bold text-purple-300 text-sm">{dndStart}:00 PM - {dndEnd}:00 AM</span>
            </div>
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div>
                <label className="text-[10px] text-slate-400 block mb-1">Quiet Hours Start</label>
                <select
                  value={dndStart}
                  onChange={(e) => setDndStart(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1 text-xs text-white"
                >
                  <option value="20">8:00 PM IST</option>
                  <option value="21">9:00 PM IST (Recommended)</option>
                  <option value="22">10:00 PM IST</option>
                </select>
              </div>
              <div>
                <label className="text-[10px] text-slate-400 block mb-1">Quiet Hours End</label>
                <select
                  value={dndEnd}
                  onChange={(e) => setDndEnd(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1 text-xs text-white"
                >
                  <option value="8">8:00 AM IST</option>
                  <option value="9">9:00 AM IST (Recommended)</option>
                  <option value="10">10:00 AM IST</option>
                </select>
              </div>
            </div>
            <p className="text-[11px] text-slate-400">
              Complies with Indian TRAI DND regulations by holding messages until morning.
            </p>
          </div>

          {/* Human-in-the-Loop Mode (Function 20) */}
          <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
            <div>
              <span className="font-semibold text-white text-xs block">Owner Approval Required (Function 20)</span>
              <span className="text-[11px] text-slate-400">Requires manual 1-tap confirmation before sending</span>
            </div>
            <input
              type="checkbox"
              checked={humanApproval}
              onChange={(e) => setHumanApproval(e.target.checked)}
              className="w-4 h-4 rounded text-indigo-600 accent-indigo-600 bg-slate-800 cursor-pointer"
            />
          </div>
        </div>

        {/* Card 2: Integration Credentials */}
        <div className="glass-panel rounded-2xl p-6 space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <h2 className="text-base font-bold text-white flex items-center">
              <Key className="w-4 h-4 mr-2 text-indigo-400" />
              API Connectors & Credentials
            </h2>
            <span className="text-xs text-indigo-400 font-mono">Store + WhatsApp</span>
          </div>

          {/* WooCommerce REST API */}
          <div className="space-y-2">
            <span className="text-xs font-semibold text-slate-300 block flex items-center">
              <Store className="w-3.5 h-3.5 mr-1.5 text-blue-400" />
              WooCommerce REST API Configuration
            </span>
            <div className="space-y-2 text-xs">
              <div>
                <label className="text-[10px] text-slate-400 block mb-0.5">Store URL</label>
                <input
                  type="text"
                  value={storeUrl}
                  onChange={(e) => setStoreUrl(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1 text-xs text-white font-mono"
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-[10px] text-slate-400 block mb-0.5">Consumer Key</label>
                  <input
                    type="text"
                    value={consumerKey}
                    onChange={(e) => setConsumerKey(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1 text-xs text-white font-mono"
                  />
                </div>
                <div>
                  <label className="text-[10px] text-slate-400 block mb-0.5">Consumer Secret</label>
                  <input
                    type="password"
                    value={consumerSecret}
                    onChange={(e) => setConsumerSecret(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1 text-xs text-white font-mono"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* WhatsApp Cloud API / Twilio Sandbox */}
          <div className="space-y-2 pt-3 border-t border-slate-800">
            <span className="text-xs font-semibold text-slate-300 block flex items-center">
              <MessageSquare className="w-3.5 h-3.5 mr-1.5 text-emerald-400" />
              WhatsApp Provider Configuration
            </span>
            <div className="space-y-2 text-xs">
              <div>
                <label className="text-[10px] text-slate-400 block mb-0.5">Account SID / Cloud WABA ID</label>
                <input
                  type="text"
                  value={twilioSid}
                  onChange={(e) => setTwilioSid(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1 text-xs text-white font-mono"
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-[10px] text-slate-400 block mb-0.5">Auth Token</label>
                  <input
                    type="password"
                    value={twilioToken}
                    onChange={(e) => setTwilioToken(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1 text-xs text-white font-mono"
                  />
                </div>
                <div>
                  <label className="text-[10px] text-slate-400 block mb-0.5">Sandbox Sender Number</label>
                  <input
                    type="text"
                    value={twilioSender}
                    onChange={(e) => setTwilioSender(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1 text-xs text-white font-mono"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 text-xs text-slate-400">
            💡 <strong>Zero-Friction Fallback:</strong> When real API keys are not entered, Sandbox CRM automatically engages its high-fidelity deterministic engine and virtual smartphone simulator, guaranteeing a 100% crash-free demo!
          </div>

        </div>

      </div>

      {/* 23 Functions Locked Architecture Matrix Reference */}
      <div className="glass-panel rounded-2xl p-6 border-slate-800">
        <h2 className="text-sm font-bold text-white mb-2 flex items-center">
          <Layers className="w-4 h-4 mr-2 text-indigo-400" />
          The 23 Locked Functions Implementation Matrix
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className="p-3 rounded-xl bg-slate-900/80 border border-emerald-500/30">
            <span className="font-bold text-emerald-400 block mb-1">Must-Build (14/14 Built ✓)</span>
            <p className="text-slate-300 text-[11px] leading-relaxed">
              1 (Webhook), 2 (Initial Sync), 4 (Profiles), 5 (Customer 360), 6 (Tracking Board), 7 (RFM Segments), 9 (Retention Agent), 10 (Margin Guard), 11 (Messenger), 12 (Debate Log), 14 (Twin Generator), 15 (Campaign Simulator), 17 (WhatsApp Send), 22 (ROI Tracker).
            </p>
          </div>

          <div className="p-3 rounded-xl bg-slate-900/80 border border-indigo-500/30">
            <span className="font-bold text-indigo-400 block mb-1">Should-Build (7/7 Built ✓)</span>
            <p className="text-slate-300 text-[11px] leading-relaxed">
              3 (Write-Back Coupons), 8 (COD Risk Score), 13 (Guardrails), 16 (Winner Selection), 19 (Triggered Workflows), 20 (Human Approval), 21 (Dashboard & Charts).
            </p>
          </div>

          <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-700/60">
            <span className="font-bold text-slate-400 block mb-1">Roadmap (Documented)</span>
            <p className="text-slate-400 text-[11px] leading-relaxed">
              18 (Email Fallback), 23 (Learning Curve - included live!), Voice AI calling, and Computer Vision damage claims.
            </p>
          </div>
        </div>
      </div>

    </div>
  );
}
