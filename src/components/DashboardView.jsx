// src/components/DashboardView.jsx
import React from 'react';
import { 
  TrendingUp, 
  Users, 
  ShieldAlert, 
  Sparkles, 
  Award, 
  ArrowUpRight, 
  RotateCcw, 
  CheckCircle, 
  Clock, 
  DollarSign, 
  Percent,
  Cpu,
  Layers,
  ArrowRight
} from 'lucide-react';
import { playTapSound } from '../utils/audio';

export default function DashboardView({ 
  stats, 
  customers, 
  orders, 
  activities,
  onNavigateToTab 
}) {
  const recoveredAmount = stats?.recoveredRevenue || 34850;
  const totalRev = stats?.totalRevenue || 248650;
  const repeatRate = stats?.repeatPurchaseRate || 38.4;
  const roiMultiplier = stats?.roiMultiplier || 14.8;
  const discountSpend = stats?.costOfDiscountsGiven || 2350;

  // Segment counts
  const segmentStats = stats?.segmentBreakdown || [
    { name: 'VIP', count: 28, share: 19.7, color: '#10B981' },
    { name: 'Regular', count: 54, share: 38.0, color: '#6366F1' },
    { name: 'New', count: 32, share: 22.5, color: '#38BDF8' },
    { name: 'At-Risk', count: 18, share: 12.7, color: '#F59E0B' },
    { name: 'Lapsed', count: 10, share: 7.1, color: '#EF4444' }
  ];

  // Learning curve data points: Week 1 to Week 8
  const learningCurve = [
    { week: 'W1', predicted: 62, actual: 48, delta: -14 },
    { week: 'W2', predicted: 66, actual: 55, delta: -11 },
    { week: 'W3', predicted: 70, actual: 64, delta: -6 },
    { week: 'W4', predicted: 72, actual: 68, delta: -4 },
    { week: 'W5', predicted: 74, actual: 71, delta: -3 },
    { week: 'W6', predicted: 75, actual: 73, delta: -2 },
    { week: 'W7', predicted: 76, actual: 75, delta: -1 },
    { week: 'W8', predicted: 77, actual: 76, delta: -1 },
  ];

  return (
    <div className="space-y-6">
      
      {/* Hero ROI Banner (Function 22: Must Build) */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-indigo-950 via-slate-900 to-slate-900 border border-indigo-500/30 p-6 shadow-2xl">
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 right-32 -mb-12 w-48 h-48 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none"></div>

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Multi-Agent Brain & Twin Attribution Engine</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
              ₹{recoveredAmount.toLocaleString('en-IN')} <span className="text-slate-400 text-lg font-normal">Revenue Recovered</span>
            </h1>
            <p className="text-sm text-slate-300 max-w-2xl leading-relaxed">
              Three autonomous AI agents (Retention, Margin Guard, Messenger) negotiated profitable win-back offers and simulated customer response on digital twins, driving <strong className="text-emerald-400">{roiMultiplier}x Net ROI</strong> on retention spend.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 shrink-0">
            <div className="bg-slate-800/80 backdrop-blur-md rounded-xl p-3 border border-slate-700/60">
              <span className="text-[11px] font-medium text-slate-400 uppercase tracking-wider block">ROI Multiplier</span>
              <span className="text-xl sm:text-2xl font-bold font-mono text-emerald-400">{roiMultiplier}x</span>
              <span className="text-[10px] text-slate-400 block mt-0.5">Net Return</span>
            </div>
            <div className="bg-slate-800/80 backdrop-blur-md rounded-xl p-3 border border-slate-700/60">
              <span className="text-[11px] font-medium text-slate-400 uppercase tracking-wider block">Recovered Custs</span>
              <span className="text-xl sm:text-2xl font-bold font-mono text-white">{stats?.recoveredCustomersCount || 9}</span>
              <span className="text-[10px] text-emerald-400 block mt-0.5">+1 Just Now (Aarav)</span>
            </div>
            <div className="bg-slate-800/80 backdrop-blur-md rounded-xl p-3 border border-slate-700/60 col-span-2 sm:col-span-1">
              <span className="text-[11px] font-medium text-slate-400 uppercase tracking-wider block">Discount Budget</span>
              <span className="text-xl sm:text-2xl font-bold font-mono text-indigo-300">₹{discountSpend.toLocaleString('en-IN')}</span>
              <span className="text-[10px] text-slate-400 block mt-0.5">Capped by Guard</span>
            </div>
          </div>
        </div>
      </div>

      {/* Top 4 Core Metrics Cards (Function 21: Dashboard) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Total Store Revenue */}
        <div className="glass-panel glass-panel-hover rounded-xl p-5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">Total Store Revenue</span>
            <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-400">
              <DollarSign className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline justify-between">
            <span className="text-2xl font-extrabold font-mono text-white">
              ₹{totalRev.toLocaleString('en-IN')}
            </span>
            <span className="text-xs font-semibold text-emerald-400 flex items-center">
              +18.2% <ArrowUpRight className="w-3 h-3 ml-0.5" />
            </span>
          </div>
          <p className="mt-1 text-xs text-slate-400">Synced from WooCommerce store</p>
        </div>

        {/* Repeat Purchase Rate */}
        <div className="glass-panel glass-panel-hover rounded-xl p-5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">Repeat Purchase Rate</span>
            <div className="w-8 h-8 rounded-lg bg-indigo-500/10 flex items-center justify-center text-indigo-400">
              <Percent className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline justify-between">
            <span className="text-2xl font-extrabold font-mono text-indigo-300">
              {repeatRate}%
            </span>
            <span className="text-xs font-semibold text-emerald-400 flex items-center">
              +6.4% MoM <ArrowUpRight className="w-3 h-3 ml-0.5" />
            </span>
          </div>
          <p className="mt-1 text-xs text-slate-400">Target: 40% (Benchmark: 22%)</p>
        </div>

        {/* At-Risk Revenue at Stake */}
        <div className="glass-panel glass-panel-hover rounded-xl p-5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">At-Risk Revenue</span>
            <div className="w-8 h-8 rounded-lg bg-amber-500/10 flex items-center justify-center text-amber-400">
              <ShieldAlert className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline justify-between">
            <span className="text-2xl font-extrabold font-mono text-amber-300">
              ₹{(stats?.atRiskRevenueAtStake || 64200).toLocaleString('en-IN')}
            </span>
            <span className="text-xs font-semibold text-amber-400">
              18 Customers
            </span>
          </div>
          <div className="mt-1 flex items-center justify-between">
            <p className="text-xs text-slate-400">&gt; 45 days dormant</p>
            <button 
              onClick={() => onNavigateToTab('agents')} 
              className="text-[11px] text-indigo-400 hover:text-indigo-300 flex items-center font-medium"
            >
              Debate Offers <ArrowRight className="w-3 h-3 ml-0.5" />
            </button>
          </div>
        </div>

        {/* Twin Model Accuracy */}
        <div className="glass-panel glass-panel-hover rounded-xl p-5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">Twin Prediction Fit</span>
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-400">
              <Cpu className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline justify-between">
            <span className="text-2xl font-extrabold font-mono text-emerald-400">
              {stats?.twinPredictionAccuracy || 89.2}%
            </span>
            <span className="text-xs font-semibold text-emerald-400">
              Calibrated
            </span>
          </div>
          <p className="mt-1 text-xs text-slate-400">100 virtual simulations/campaign</p>
        </div>

      </div>

      {/* Two Column Section: Segment Breakdown & Learning Curve */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* RFM Auto Segmentation Breakdown (Function 7 & 21) */}
        <div className="glass-panel rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-base font-bold text-white flex items-center">
                <Layers className="w-4 h-4 mr-2 text-indigo-400" />
                Customer RFM Segmentation
              </h2>
              <p className="text-xs text-slate-400">Automated recency, frequency & monetary scoring</p>
            </div>
            <button 
              onClick={() => onNavigateToTab('customers')}
              className="text-xs text-indigo-400 hover:text-indigo-300 font-medium flex items-center"
            >
              View Customers <ArrowRight className="w-3.5 h-3.5 ml-1" />
            </button>
          </div>

          <div className="space-y-3">
            {segmentStats.map((seg) => (
              <div key={seg.name} className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center space-x-2">
                    <span 
                      className="w-2.5 h-2.5 rounded-full inline-block"
                      style={{ backgroundColor: seg.color }}
                    ></span>
                    <span className="font-semibold text-slate-200">{seg.name}</span>
                    <span className="text-slate-400">({seg.count} shoppers)</span>
                  </div>
                  <span className="font-mono text-slate-300 font-medium">{seg.share}%</span>
                </div>
                {/* Progress bar */}
                <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                  <div 
                    className="h-full rounded-full transition-all duration-500"
                    style={{ width: `${seg.share}%`, backgroundColor: seg.color }}
                  ></div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-5 p-3 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-start space-x-3">
            <ShieldAlert className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <div className="text-xs text-amber-200/90 leading-relaxed">
              <strong>At-Risk Alert:</strong> 18 high-LTV customers have lapsed beyond their typical 45-day replenishment cycle. The Retention Agent has queued priority win-back campaigns for these shoppers.
            </div>
          </div>
        </div>

        {/* Function 23: Learning Curve Chart (Prediction vs Actual) */}
        <div className="glass-panel rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-base font-bold text-white flex items-center">
                <TrendingUp className="w-4 h-4 mr-2 text-emerald-400" />
                Twin Learning Curve (Prediction vs. Actual)
              </h2>
              <p className="text-xs text-slate-400">AI twin response modeling accuracy improving over 8 campaign iterations</p>
            </div>
            <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
              Calibrated (±1% error)
            </span>
          </div>

          {/* Bar / Column Chart Visualization */}
          <div className="h-48 flex items-end justify-between gap-2 pt-6 pb-2 border-b border-slate-800">
            {learningCurve.map((item) => (
              <div key={item.week} className="flex-1 flex flex-col items-center gap-1 group relative">
                {/* Tooltip */}
                <div className="absolute -top-10 opacity-0 group-hover:opacity-100 transition-opacity bg-slate-900 text-white text-[10px] font-mono p-1 rounded shadow-lg border border-slate-700 pointer-events-none z-20 whitespace-nowrap">
                  Pred: {item.predicted}% | Act: {item.actual}% (Gap: {Math.abs(item.delta)}%)
                </div>

                <div className="w-full flex items-end justify-center gap-1 h-36">
                  {/* Predicted Bar */}
                  <div 
                    className="w-2.5 sm:w-3.5 bg-indigo-500/60 rounded-t transition-all group-hover:bg-indigo-400"
                    style={{ height: `${item.predicted * 1.5}px` }}
                    title={`Predicted: ${item.predicted}%`}
                  ></div>
                  {/* Actual Bar */}
                  <div 
                    className="w-2.5 sm:w-3.5 bg-emerald-500 rounded-t transition-all group-hover:bg-emerald-400 shadow-glow-green"
                    style={{ height: `${item.actual * 1.5}px` }}
                    title={`Actual: ${item.actual}%`}
                  ></div>
                </div>
                <span className="text-[10px] text-slate-400 font-mono mt-1">{item.week}</span>
              </div>
            ))}
          </div>

          {/* Legend */}
          <div className="mt-3 flex items-center justify-between text-xs text-slate-400">
            <div className="flex items-center space-x-4">
              <span className="flex items-center">
                <span className="w-2.5 h-2.5 bg-indigo-500/60 rounded-sm mr-1.5"></span>
                Twin Predicted %
              </span>
              <span className="flex items-center">
                <span className="w-2.5 h-2.5 bg-emerald-500 rounded-sm mr-1.5"></span>
                Actual WhatsApp Conversion %
              </span>
            </div>
            <span className="text-[11px] font-mono text-emerald-400 font-medium">Delta: -1% (Locked)</span>
          </div>
        </div>

      </div>

      {/* Bottom Section: Live Activity Stream & COD Risk Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* COD Risk Distribution (Function 8) */}
        <div className="glass-panel rounded-xl p-6 lg:col-span-1">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-base font-bold text-white flex items-center">
              <ShieldAlert className="w-4 h-4 mr-2 text-rose-400" />
              Cash on Delivery (COD) Risk
            </h2>
            <span className="text-xs text-slate-400 font-mono">142 total</span>
          </div>
          <p className="text-xs text-slate-400 mb-4">
            Predicts Return-to-Origin (RTO) before courier dispatch to safeguard courier margin.
          </p>

          <div className="space-y-3">
            {(stats?.codRiskDistribution || []).map((risk) => (
              <div key={risk.level} className="flex items-center justify-between p-2.5 rounded-lg bg-slate-800/40 border border-slate-700/40">
                <span className="text-xs font-medium text-slate-300">{risk.level}</span>
                <div className="flex items-center space-x-2">
                  <span className="font-mono text-xs font-bold text-white">{risk.count}</span>
                  <span className="text-[10px] text-slate-400 font-mono">({risk.share}%)</span>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 p-2.5 rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-xs text-indigo-300">
            💡 <strong>RTO Mitigation:</strong> High COD risk orders are prompted via WhatsApp to convert to UPI with a ₹50 instant cashback link.
          </div>
        </div>

        {/* Real-time Activity Feed */}
        <div className="glass-panel rounded-xl p-6 lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-bold text-white flex items-center">
              <Clock className="w-4 h-4 mr-2 text-indigo-400" />
              Live Multi-Agent Activity Log
            </h2>
            <span className="text-xs text-emerald-400 flex items-center">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping mr-1.5"></span>
              Live Stream
            </span>
          </div>

          <div className="space-y-3 max-h-72 overflow-y-auto pr-1">
            {(activities || []).map((act) => (
              <div 
                key={act.id}
                className="flex items-start space-x-3 p-3 rounded-lg bg-slate-800/40 hover:bg-slate-800/70 border border-slate-700/40 transition-colors text-xs"
              >
                <div className="w-7 h-7 rounded-lg bg-indigo-500/15 border border-indigo-500/30 flex items-center justify-center text-indigo-400 shrink-0 mt-0.5">
                  <Sparkles className="w-3.5 h-3.5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-slate-200">{act.title}</span>
                    <span className="text-[10px] text-slate-400 font-mono">{act.timestamp}</span>
                  </div>
                  <p className="text-slate-400 mt-0.5 truncate">{act.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}
