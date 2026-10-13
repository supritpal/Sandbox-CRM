// src/components/DigitalTwinLabView.jsx
import React, { useState } from 'react';
import { 
  Cpu, 
  Sparkles, 
  Play, 
  CheckCircle2, 
  ArrowRight, 
  MessageSquare, 
  TrendingUp, 
  DollarSign, 
  Percent, 
  Award,
  Clock,
  Layers,
  Send,
  Zap
} from 'lucide-react';
import { playTapSound, playSuccessSound } from '../utils/audio';

export default function DigitalTwinLabView({ 
  customers, 
  selectedCustomer, 
  simulations, 
  onRunSimulation, 
  onDeployToWhatsApp 
}) {
  const [activeCustomer, setActiveCustomer] = useState(selectedCustomer || customers[0]);
  const [isSimulating, setIsSimulating] = useState(false);
  const [currentSimulation, setCurrentSimulation] = useState(simulations[0] || null);

  const handleSimulate = async () => {
    playTapSound();
    setIsSimulating(true);

    try {
      const result = await onRunSimulation(activeCustomer.id, {
        language: activeCustomer.language || 'Hindi'
      });
      setTimeout(() => {
        playSuccessSound();
      }, 1200);
      setCurrentSimulation(result);
    } finally {
      setIsSimulating(false);
    }
  };

  const winner = currentSimulation?.variants?.find(v => v.isWinner) || currentSimulation?.variants?.[1];

  return (
    <div className="space-y-6">
      
      {/* Hero Header */}
      <div className="glass-panel rounded-2xl p-6 border-purple-500/30">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-purple-500/15 border border-purple-500/30 text-purple-400 text-xs font-semibold">
              <Cpu className="w-3.5 h-3.5" />
              <span>Digital Twin Simulation Engine (Module 4: Wow Factor)</span>
            </div>
            <h1 className="text-2xl font-extrabold text-white">
              AI Customer Twin Simulation Lab
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
              Before sending any message to a real customer, we test 3 distinct psychological variants on <strong>AI customer twins</strong> calibrated from their past purchase velocity, price sensitivity, and discount affinity.
            </p>
          </div>

          <div className="flex items-center space-x-3 shrink-0">
            <button
              onClick={handleSimulate}
              disabled={isSimulating}
              className="flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 hover:from-purple-500 hover:to-pink-500 text-white text-xs font-bold shadow-lg transition active:scale-95 disabled:opacity-50"
            >
              <Play className={`w-3.5 h-3.5 ${isSimulating ? 'animate-spin' : ''}`} />
              <span>{isSimulating ? 'Evaluating 100 Twins...' : 'Run Twin Simulation (100 Runs)'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Function 14: Customer Twin Persona Architecture Card */}
      <div className="glass-panel rounded-2xl p-6 border-indigo-500/20">
        <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-800">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/20 border border-indigo-500/40 flex items-center justify-center text-lg text-indigo-300">
              🧬
            </div>
            <div>
              <h2 className="text-base font-bold text-white flex items-center">
                <span>Customer Twin Model: {activeCustomer.name}</span>
                <span className="ml-2 text-xs font-mono text-indigo-400 font-normal">
                  ({activeCustomer.city}, {activeCustomer.segment})
                </span>
              </h2>
              <p className="text-xs text-slate-400">Order-history derived psychological parameters</p>
            </div>
          </div>

          <span className="px-2.5 py-1 rounded text-xs font-mono bg-purple-500/10 text-purple-300 border border-purple-500/20 font-semibold">
            Twin Status: Active
          </span>
        </div>

        {/* Persona Traits Bar Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-slate-800/50 rounded-xl p-3 border border-slate-700/60">
            <span className="text-[10px] text-slate-400 uppercase font-semibold block">Price Sensitivity</span>
            <span className="text-base font-bold text-amber-400 font-mono mt-0.5 block">
              {activeCustomer.digitalTwin.priceSensitivity}
            </span>
            <span className="text-[10px] text-slate-400 block mt-0.5">Prefers perceived exclusivity</span>
          </div>

          <div className="bg-slate-800/50 rounded-xl p-3 border border-slate-700/60">
            <span className="text-[10px] text-slate-400 uppercase font-semibold block">Discount Affinity</span>
            <div className="flex items-baseline justify-between mt-0.5">
              <span className="text-base font-bold text-emerald-400 font-mono">
                {(activeCustomer.digitalTwin.discountAffinity * 100).toFixed(0)}%
              </span>
              <span className="text-[10px] text-emerald-400">High response</span>
            </div>
            <div className="w-full h-1.5 rounded-full bg-slate-700 mt-1">
              <div 
                className="h-full rounded-full bg-emerald-400"
                style={{ width: `${activeCustomer.digitalTwin.discountAffinity * 100}%` }}
              ></div>
            </div>
          </div>

          <div className="bg-slate-800/50 rounded-xl p-3 border border-slate-700/60">
            <span className="text-[10px] text-slate-400 uppercase font-semibold block">Urgency Sensitivity</span>
            <div className="flex items-baseline justify-between mt-0.5">
              <span className="text-base font-bold text-purple-400 font-mono">
                {(activeCustomer.digitalTwin.urgencyResponse * 100).toFixed(0)}%
              </span>
              <span className="text-[10px] text-purple-400">Stock fear of missing out</span>
            </div>
            <div className="w-full h-1.5 rounded-full bg-slate-700 mt-1">
              <div 
                className="h-full rounded-full bg-purple-400"
                style={{ width: `${activeCustomer.digitalTwin.urgencyResponse * 100}%` }}
              ></div>
            </div>
          </div>

          <div className="bg-slate-800/50 rounded-xl p-3 border border-slate-700/60">
            <span className="text-[10px] text-slate-400 uppercase font-semibold block">Preferred Send Window</span>
            <span className="text-sm font-bold text-slate-200 mt-0.5 block">
              {activeCustomer.digitalTwin.preferredSendTime}
            </span>
            <span className="text-[10px] text-slate-400 block mt-0.5">Highest open probability</span>
          </div>
        </div>

        <div className="mt-4 p-3 rounded-xl bg-slate-900/80 border border-slate-800 text-xs text-slate-300 leading-relaxed italic">
          "{activeCustomer.digitalTwin.personaSummary}"
        </div>
      </div>

      {/* Function 15 & 16: Campaign Simulator & Winner Selection */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-white flex items-center">
              <Sparkles className="w-4 h-4 mr-2 text-pink-400" />
              Campaign Simulator: 3 Message Variants (Function 15 & 16: Must Build)
            </h2>
            <p className="text-xs text-slate-400">
              Evaluated across 100 Monte Carlo runs on Aarav's digital twin persona.
            </p>
          </div>

          {winner && (
            <button
              onClick={() => {
                playTapSound();
                onDeployToWhatsApp(activeCustomer, winner.copy);
              }}
              className="flex items-center space-x-1.5 px-3.5 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-bold shadow-glow-green transition active:scale-95 animate-fade-in"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Deploy Winner to WhatsApp</span>
              <ArrowRight className="w-3.5 h-3.5 ml-1" />
            </button>
          )}
        </div>

        {/* 3 Variant Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {(currentSimulation?.variants || []).map((variant) => {
            const isWin = variant.isWinner;

            return (
              <div
                key={variant.id}
                className={`glass-panel rounded-2xl p-5 flex flex-col justify-between transition-all ${
                  isWin
                    ? 'border-emerald-500/80 bg-gradient-to-b from-slate-900 via-slate-900 to-emerald-950/30 shadow-glow-green ring-1 ring-emerald-500/40'
                    : 'border-slate-800 bg-slate-900/60'
                }`}
              >
                <div>
                  {/* Variant Badge */}
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-bold text-sm text-white">{variant.name}</span>
                    {isWin ? (
                      <span className="px-2 py-0.5 rounded text-[10px] font-extrabold bg-emerald-500 text-slate-950 flex items-center shadow-glow-green uppercase">
                        <Award className="w-3 h-3 mr-1" />
                        Selected Winner
                      </span>
                    ) : (
                      <span className="text-[10px] text-slate-400 font-mono">Tested</span>
                    )}
                  </div>

                  {/* WhatsApp Message Preview Bubble */}
                  <div className="p-3.5 rounded-xl bg-wa-bubbleOut border border-emerald-900/40 text-xs text-slate-100 leading-relaxed mb-4 shadow-sm relative">
                    <p className="whitespace-pre-line">{variant.copy}</p>
                    <div className="mt-2 flex items-center justify-end space-x-1 text-[10px] text-emerald-300/80">
                      <span>19:30</span>
                      <span>✓✓</span>
                    </div>
                  </div>

                  {/* Twin Predicted Metrics */}
                  <div className="grid grid-cols-2 gap-2 mb-4 font-mono">
                    <div className="p-2 rounded-lg bg-slate-800/60 border border-slate-700/60">
                      <span className="text-[10px] text-slate-400 block font-sans">Predicted Open Rate</span>
                      <span className="text-sm font-bold text-white">{variant.metrics.predictedOpenRate}%</span>
                    </div>
                    <div className="p-2 rounded-lg bg-slate-800/60 border border-slate-700/60">
                      <span className="text-[10px] text-slate-400 block font-sans">Click-Through</span>
                      <span className="text-sm font-bold text-indigo-300">{variant.metrics.predictedClickRate}%</span>
                    </div>
                    <div className={`p-2 rounded-lg border ${isWin ? 'bg-emerald-500/10 border-emerald-500/30' : 'bg-slate-800/60 border-slate-700/60'}`}>
                      <span className="text-[10px] text-slate-400 block font-sans">Conversion Prob</span>
                      <span className={`text-sm font-bold ${isWin ? 'text-emerald-400 font-extrabold' : 'text-slate-200'}`}>
                        {variant.metrics.predictedConversion}%
                      </span>
                    </div>
                    <div className="p-2 rounded-lg bg-slate-800/60 border border-slate-700/60">
                      <span className="text-[10px] text-slate-400 block font-sans">Expected Revenue</span>
                      <span className="text-sm font-bold text-white">₹{variant.metrics.expectedRevenue}</span>
                    </div>
                  </div>
                </div>

                {/* Twin Critique Explanation */}
                <div className={`p-3 rounded-xl text-xs leading-relaxed ${
                  isWin ? 'bg-emerald-950/40 border border-emerald-500/30 text-emerald-200' : 'bg-slate-800/40 text-slate-400'
                }`}>
                  <strong className="block mb-0.5 text-[11px] uppercase tracking-wide">
                    {isWin ? '🎯 Why Twin Converted:' : 'Twin Feedback:'}
                  </strong>
                  {variant.twinCritique}
                </div>

              </div>
            );
          })}
        </div>

      </div>

    </div>
  );
}
