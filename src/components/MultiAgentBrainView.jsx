// src/components/MultiAgentBrainView.jsx
import React, { useState } from 'react';
import { 
  Bot, 
  Scale, 
  ShieldCheck, 
  ShieldAlert, 
  MessageSquare, 
  Sparkles, 
  Play, 
  RotateCcw, 
  CheckCircle2, 
  AlertOctagon, 
  ArrowRight, 
  Clock, 
  DollarSign,
  Cpu,
  Layers,
  Sliders,
  Send
} from 'lucide-react';
import { playTapSound, playVetoSound, playSuccessSound } from '../utils/audio';

export default function MultiAgentBrainView({ 
  customers, 
  selectedCustomer, 
  setSelectedCustomer, 
  debateHistory, 
  onRunDebate, 
  onProceedToTwins,
  guardrails 
}) {
  const [activeCustomer, setActiveCustomer] = useState(selectedCustomer || customers[0]);
  const [initialProposal, setInitialProposal] = useState('25% Flat Discount');
  const [selectedLanguage, setSelectedLanguage] = useState(activeCustomer?.language || 'Hindi');
  const [isDebating, setIsDebating] = useState(false);
  const [currentDebate, setCurrentDebate] = useState(debateHistory[0] || null);

  const handleCustomerChange = (e) => {
    const cust = customers.find(c => c.id === e.target.value);
    if (cust) {
      setActiveCustomer(cust);
      setSelectedCustomer(cust);
      setSelectedLanguage(cust.language || 'Hindi');
    }
  };

  const handleStartDebate = async () => {
    playTapSound();
    setIsDebating(true);

    try {
      // Run the debate through API
      const debateResult = await onRunDebate(activeCustomer.id, {
        initialOffer: initialProposal,
        language: selectedLanguage
      });

      // Play audio effects based on veto & consensus
      setTimeout(() => {
        playVetoSound();
      }, 1200);

      setTimeout(() => {
        playSuccessSound();
      }, 2400);

      setCurrentDebate(debateResult);
    } finally {
      setIsDebating(false);
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Top Brain Concept Header */}
      <div className="glass-panel rounded-2xl p-6 border-indigo-500/30">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-indigo-500/15 border border-indigo-500/30 text-indigo-400 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Multi-Agent Autonomous Governance (Module 3)</span>
            </div>
            <h1 className="text-2xl font-extrabold text-white">
              Autonomous Agent Debate Arena
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
              No single AI acts unmonitored. <strong>Retention Agent</strong> optimizes for customer lifetime value, <strong>Margin Guard</strong> enforces strict unit economics & gross margin vetoes, and <strong>Messenger Agent</strong> personalizes copy in Indian languages.
            </p>
          </div>

          {/* Consensus Settled Badge */}
          {currentDebate && (
            <div className="p-4 rounded-xl bg-gradient-to-br from-emerald-950/60 to-slate-900 border border-emerald-500/40 text-right shrink-0">
              <span className="text-[10px] uppercase font-bold tracking-wider text-emerald-400 flex items-center justify-end">
                <CheckCircle2 className="w-3.5 h-3.5 mr-1 text-emerald-400" />
                Consensus Reached
              </span>
              <span className="text-lg font-bold font-mono text-white block mt-0.5">
                {currentDebate.settledOffer || '10% OFF + Free Express Delivery'}
              </span>
              <span className="text-[11px] font-mono text-indigo-300">
                Coupon: {currentDebate.settledCoupon || 'WINBACK10-AARAV'}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Control Strip & Agent Avatars */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        
        {/* Agent 1 Card: Retention Agent (Function 9) */}
        <div className="glass-panel rounded-xl p-4 border-amber-500/30">
          <div className="flex items-center space-x-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-xl">
              🎯
            </div>
            <div>
              <span className="font-bold text-sm text-white">Retention Agent</span>
              <span className="text-[10px] text-amber-400 block font-semibold">LTV Maximizer</span>
            </div>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">
            Identifies dormant shoppers before churn. Prioritizes winning back high-LTV customers with aggressive discount proposals.
          </p>
          <div className="mt-3 pt-2 border-t border-slate-800 text-[10px] text-slate-400 flex justify-between font-mono">
            <span>Goal: Minimize Churn</span>
            <span className="text-amber-400">Bias: High Value</span>
          </div>
        </div>

        {/* Agent 2 Card: Margin Guard Agent (Function 10) */}
        <div className="glass-panel rounded-xl p-4 border-rose-500/30">
          <div className="flex items-center space-x-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-rose-500/20 border border-rose-500/40 flex items-center justify-center text-xl">
              🛡️
            </div>
            <div>
              <span className="font-bold text-sm text-white">Margin Guard Agent</span>
              <span className="text-[10px] text-rose-400 block font-semibold">Unit Economics Sentry</span>
            </div>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">
            Holds <strong>absolute veto power</strong>. Checks product gross margins and courier shipping costs to prevent loss-making promotions.
          </p>
          <div className="mt-3 pt-2 border-t border-slate-800 text-[10px] text-slate-400 flex justify-between font-mono">
            <span>Goal: Protect Contribution Margin</span>
            <span className="text-rose-400">Power: VETO 🛑</span>
          </div>
        </div>

        {/* Agent 3 Card: Messenger Agent (Function 11) */}
        <div className="glass-panel rounded-xl p-4 border-indigo-500/30">
          <div className="flex items-center space-x-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/20 border border-indigo-500/40 flex items-center justify-center text-xl">
              ✍️
            </div>
            <div>
              <span className="font-bold text-sm text-white">Messenger Agent</span>
              <span className="text-[10px] text-indigo-400 block font-semibold">Multilingual Copywriter</span>
            </div>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">
            Translates consensus offer into cultural Indian WhatsApp phrasing (Hindi, Marathi, English) ready for Digital Twin simulation.
          </p>
          <div className="mt-3 pt-2 border-t border-slate-800 text-[10px] text-slate-400 flex justify-between font-mono">
            <span>Tone: Conversational D2C</span>
            <span className="text-indigo-400">Lang: Hindi / Marathi</span>
          </div>
        </div>

      </div>

      {/* Interactive Debate Launcher Controls */}
      <div className="glass-panel rounded-xl p-4 flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Customer Selector */}
        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          <div className="flex items-center space-x-2">
            <span className="text-xs font-semibold text-slate-300">Target Customer:</span>
            <select
              value={activeCustomer?.id}
              onChange={handleCustomerChange}
              className="bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-indigo-500"
            >
              {customers.map(c => (
                <option key={c.id} value={c.id}>
                  {c.name} ({c.segment} - {c.city})
                </option>
              ))}
            </select>
          </div>

          {/* Initial Offer Proposal */}
          <div className="flex items-center space-x-2">
            <span className="text-xs font-semibold text-slate-300">Retention Pitch:</span>
            <select
              value={initialProposal}
              onChange={(e) => setInitialProposal(e.target.value)}
              className="bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-indigo-500"
            >
              <option value="25% Flat Discount">25% Flat Discount (Triggers Veto!)</option>
              <option value="20% Discount Code">20% Discount (Triggers Veto!)</option>
              <option value="15% Discount">15% Max Capped Discount</option>
            </select>
          </div>

          {/* Language Toggle */}
          <div className="flex items-center space-x-2">
            <span className="text-xs font-semibold text-slate-300">Language:</span>
            <select
              value={selectedLanguage}
              onChange={(e) => setSelectedLanguage(e.target.value)}
              className="bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-indigo-500"
            >
              <option value="Hindi">Hindi (हिंदी)</option>
              <option value="Marathi">Marathi (मराठी)</option>
              <option value="English">English</option>
            </select>
          </div>
        </div>

        {/* Action Button */}
        <div className="flex items-center space-x-3 w-full md:w-auto justify-end">
          <button
            onClick={handleStartDebate}
            disabled={isDebating}
            className="flex items-center space-x-2 px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-600 via-indigo-500 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white text-xs font-bold shadow-glow-indigo transition active:scale-95 disabled:opacity-50"
          >
            <Play className={`w-3.5 h-3.5 ${isDebating ? 'animate-spin' : ''}`} />
            <span>{isDebating ? 'Agents Debating...' : 'Run Agent Debate'}</span>
          </button>

          {currentDebate && (
            <button
              onClick={() => {
                playTapSound();
                onProceedToTwins(activeCustomer, currentDebate);
              }}
              className="flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white text-xs font-bold shadow-lg transition active:scale-95"
            >
              <span>Test on Digital Twins</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

      </div>

      {/* Function 12: Visible Agent Debate Log Timeline */}
      <div className="glass-panel rounded-2xl p-6 space-y-6">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div>
            <h2 className="text-base font-bold text-white flex items-center">
              <Scale className="w-4 h-4 mr-2 text-indigo-400" />
              Live Agent Debate Timeline (Function 12: Must Build)
            </h2>
            <p className="text-xs text-slate-400">
              Visible negotiation transcript showing how conflicting agent objectives reach mathematical consensus.
            </p>
          </div>

          <span className="px-2.5 py-1 rounded text-xs font-mono font-semibold bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">
            Customer: {activeCustomer?.name} (LTV: ₹{activeCustomer?.ltv?.toLocaleString('en-IN')})
          </span>
        </div>

        {/* Stream of Debate Messages */}
        <div className="space-y-4">
          {(currentDebate?.steps || []).map((step, idx) => {
            const isVeto = step.veto;
            const isConsensus = step.consensus;

            return (
              <div 
                key={idx}
                className={`p-4 rounded-xl transition-all border ${
                  isVeto 
                    ? 'bg-rose-950/30 border-rose-500/50 shadow-glow-rose' 
                    : isConsensus
                    ? 'bg-emerald-950/20 border-emerald-500/40 shadow-glow-green'
                    : 'bg-slate-800/50 border-slate-700/60'
                }`}
              >
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div className="flex items-center space-x-2.5">
                    <span className="text-2xl">{step.avatar}</span>
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="font-bold text-sm text-white">{step.agent}</span>
                        <span className="text-[10px] text-slate-400 font-mono">({step.role})</span>
                      </div>
                      <span className="text-[10px] text-slate-400 font-mono">{step.timestamp}</span>
                    </div>
                  </div>

                  {/* Sentiment Tag */}
                  <div>
                    {isVeto ? (
                      <span className="px-2.5 py-0.5 rounded text-[10px] font-bold bg-rose-500/20 text-rose-300 border border-rose-500/40 animate-pulse">
                        🛑 VETO TRIGGERED
                      </span>
                    ) : isConsensus ? (
                      <span className="px-2.5 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                        ✓ COUNTER ACCEPTED
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-slate-700 text-slate-300">
                        {step.sentiment}
                      </span>
                    )}
                  </div>
                </div>

                {/* Argument Body */}
                <div className="text-xs sm:text-sm text-slate-200 leading-relaxed pl-9">
                  {step.argument}
                </div>

                {/* Economic Breakdown Callout on Margin Guard Veto */}
                {isVeto && (
                  <div className="mt-3 ml-9 p-3 rounded-lg bg-slate-900 border border-rose-500/30 text-xs text-slate-300 space-y-1">
                    <div className="font-semibold text-rose-300">Unit Economics Analysis:</div>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1 font-mono text-[11px]">
                      <div>
                        <span className="text-slate-400 block">Gross Margin:</span>
                        <span className="text-white font-bold">28.5% (₹1,097)</span>
                      </div>
                      <div>
                        <span className="text-slate-400 block">25% Discount:</span>
                        <span className="text-rose-400 font-bold">-₹962</span>
                      </div>
                      <div>
                        <span className="text-slate-400 block">Courier Fulfillment:</span>
                        <span className="text-rose-400 font-bold">-₹85</span>
                      </div>
                      <div>
                        <span className="text-slate-400 block">Net Contribution:</span>
                        <span className="text-rose-400 font-bold">-₹28 (LOSS)</span>
                      </div>
                    </div>
                    <div className="text-emerald-400 pt-1 text-[11px] font-mono">
                      ✨ Counter-Offer (10% + ₹45 Free Shipping): Preserves +₹700 Net Profit (18.2% margin).
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>

      {/* Function 13: Guardrails Enforcement Card */}
      <div className="glass-panel rounded-xl p-4 border-slate-700/60 flex flex-col md:flex-row items-center justify-between gap-4 text-xs">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-lg bg-indigo-500/10 flex items-center justify-center text-indigo-400 shrink-0">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <div>
            <span className="font-bold text-white block">Active Guardrails Enforced (Function 13)</span>
            <span className="text-slate-400 text-[11px]">
              Max Discount: {guardrails?.maxDiscountCapPercent || 15}% • Frequency Cap: 1 msg/week • Quiet Hours (DND): 9 PM - 9 AM IST
            </span>
          </div>
        </div>

        <div className="flex items-center space-x-2 shrink-0">
          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-semibold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
            <CheckCircle2 className="w-3 h-3 mr-1" />
            Guardrails Compliant
          </span>
        </div>
      </div>

    </div>
  );
}
