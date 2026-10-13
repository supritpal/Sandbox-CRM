// src/components/CustomersView.jsx
import React, { useState } from 'react';
import { 
  Users, 
  Search, 
  Filter, 
  Phone, 
  MapPin, 
  Mail, 
  ShieldAlert, 
  Sparkles, 
  ChevronRight, 
  Clock, 
  Package, 
  MessageSquare, 
  X,
  Scale,
  Cpu,
  Send,
  CheckCircle,
  ExternalLink
} from 'lucide-react';
import { playTapSound } from '../utils/audio';

export default function CustomersView({ 
  customers, 
  selectedCustomer, 
  setSelectedCustomer, 
  onStartDebate,
  onOpenWhatsApp
}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [segmentFilter, setSegmentFilter] = useState('ALL');
  const [activeCustomer360, setActiveCustomer360] = useState(selectedCustomer || customers[0]);

  const filteredCustomers = (customers || []).filter((c) => {
    const matchesSearch = 
      c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.phone.includes(searchTerm) ||
      c.city.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSegment = segmentFilter === 'ALL' || c.segment === segmentFilter;
    return matchesSearch && matchesSegment;
  });

  const getSegmentBadgeColor = (segment) => {
    switch (segment) {
      case 'VIP': return 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30';
      case 'Regular': return 'bg-indigo-500/15 text-indigo-400 border-indigo-500/30';
      case 'New': return 'bg-sky-500/15 text-sky-400 border-sky-500/30';
      case 'At-Risk': return 'bg-amber-500/15 text-amber-400 border-amber-500/30 animate-pulse';
      case 'Lapsed': return 'bg-rose-500/15 text-rose-400 border-rose-500/30';
      default: return 'bg-slate-700 text-slate-300 border-slate-600';
    }
  };

  const getHealthBadgeColor = (score) => {
    if (score >= 80) return 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20';
    if (score >= 50) return 'text-indigo-400 bg-indigo-500/10 border-indigo-500/20';
    if (score >= 35) return 'text-amber-400 bg-amber-500/10 border-amber-500/20';
    return 'text-rose-400 bg-rose-500/10 border-rose-500/20';
  };

  const getCodRiskBadge = (score) => {
    if (score >= 70) return { label: 'High COD Risk', color: 'bg-rose-500/15 text-rose-400 border-rose-500/30' };
    if (score >= 40) return { label: 'Medium Risk', color: 'bg-amber-500/15 text-amber-400 border-amber-500/30' };
    return { label: 'Low Risk', color: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30' };
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      
      {/* Left List Column (7 cols) */}
      <div className="lg:col-span-7 space-y-4">
        
        {/* Search & Segment Filters */}
        <div className="glass-panel rounded-xl p-4 flex flex-col sm:flex-row gap-3 items-center justify-between">
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search name, phone, city..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700/80 rounded-lg pl-9 pr-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
            />
          </div>

          {/* Segment Pills */}
          <div className="flex items-center space-x-1 overflow-x-auto w-full sm:w-auto no-scrollbar">
            {['ALL', 'At-Risk', 'VIP', 'Regular', 'New', 'Lapsed'].map((seg) => (
              <button
                key={seg}
                onClick={() => { playTapSound(); setSegmentFilter(seg); }}
                className={`px-2.5 py-1 rounded-md text-[11px] font-semibold whitespace-nowrap transition ${
                  segmentFilter === seg
                    ? 'bg-indigo-600 text-white'
                    : 'bg-slate-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                {seg === 'ALL' ? 'All' : seg}
              </button>
            ))}
          </div>
        </div>

        {/* Customer Cards List */}
        <div className="space-y-3">
          {filteredCustomers.map((cust) => {
            const isSelected = activeCustomer360?.id === cust.id;
            const codBadge = getCodRiskBadge(cust.codRiskScore);

            return (
              <div
                key={cust.id}
                onClick={() => {
                  playTapSound();
                  setActiveCustomer360(cust);
                  setSelectedCustomer(cust);
                }}
                className={`glass-panel rounded-xl p-4 cursor-pointer transition-all ${
                  isSelected
                    ? 'border-indigo-500/80 bg-slate-800/90 shadow-glow-indigo'
                    : 'hover:border-slate-700 hover:bg-slate-800/40'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-start space-x-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-slate-700 to-slate-800 border border-slate-600/60 flex items-center justify-center font-bold text-sm text-indigo-300 shrink-0">
                      {cust.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="font-bold text-sm text-white">{cust.name}</span>
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${getSegmentBadgeColor(cust.segment)}`}>
                          {cust.segment}
                        </span>
                        {cust.recoveryStatus === 'Recovered' && (
                          <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                            Recovered ✓
                          </span>
                        )}
                      </div>
                      <div className="flex items-center space-x-3 text-xs text-slate-400 mt-1">
                        <span className="flex items-center"><Phone className="w-3 h-3 mr-1 text-slate-500" />{cust.phone}</span>
                        <span className="flex items-center"><MapPin className="w-3 h-3 mr-1 text-slate-500" />{cust.city}</span>
                        <span className="text-slate-500 font-mono text-[11px]">Lang: {cust.language}</span>
                      </div>
                    </div>
                  </div>

                  {/* LTV & Health Indicators */}
                  <div className="flex items-center justify-between sm:justify-end space-x-4 border-t sm:border-t-0 pt-2 sm:pt-0 border-slate-800">
                    <div className="text-right">
                      <div className="text-xs text-slate-400">Lifetime Value</div>
                      <div className="text-sm font-bold font-mono text-white">₹{cust.ltv.toLocaleString('en-IN')}</div>
                      <div className="text-[10px] text-slate-500">{cust.orderCount} orders</div>
                    </div>

                    <div className="text-right">
                      <div className="text-xs text-slate-400">Health</div>
                      <span className={`inline-block px-1.5 py-0.5 rounded text-xs font-mono font-bold border ${getHealthBadgeColor(cust.healthScore)}`}>
                        {cust.healthScore}/100
                      </span>
                    </div>

                    <ChevronRight className="w-4 h-4 text-slate-600 hidden sm:block" />
                  </div>
                </div>

                {/* Tags and Risk Pill */}
                <div className="mt-3 pt-3 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-2 text-xs">
                  <div className="flex flex-wrap gap-1">
                    {cust.tags.map((tag) => (
                      <span key={tag} className="px-2 py-0.5 rounded bg-slate-800 text-slate-400 text-[10px]">
                        #{tag}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-semibold border ${codBadge.color}`}>
                      {codBadge.label} ({cust.codRiskScore})
                    </span>
                    <span className="text-[11px] text-slate-400 font-mono">
                      Last: {cust.lastOrderDate}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Right Column: Customer 360 View Drawer (Function 5: Must Build) */}
      <div className="lg:col-span-5">
        {activeCustomer360 ? (
          <div className="glass-panel rounded-2xl p-6 space-y-6 sticky top-28 border-indigo-500/30">
            
            {/* Header with Hero Action */}
            <div className="flex items-start justify-between pb-4 border-b border-slate-800">
              <div className="space-y-1">
                <div className="flex items-center space-x-2">
                  <h2 className="text-xl font-extrabold text-white">{activeCustomer360.name}</h2>
                  <span className={`px-2 py-0.5 rounded text-xs font-bold border ${getSegmentBadgeColor(activeCustomer360.segment)}`}>
                    {activeCustomer360.segment}
                  </span>
                </div>
                <div className="text-xs text-slate-400 flex items-center space-x-2">
                  <Mail className="w-3.5 h-3.5" />
                  <span>{activeCustomer360.email}</span>
                  <span>•</span>
                  <span>{activeCustomer360.city}, {activeCustomer360.state}</span>
                </div>
              </div>

              {/* Action Trigger for Agent Win-back */}
              {activeCustomer360.segment === 'At-Risk' || activeCustomer360.segment === 'Lapsed' ? (
                <button
                  onClick={() => {
                    playTapSound();
                    onStartDebate(activeCustomer360);
                  }}
                  className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white text-xs font-bold shadow-glow-indigo transition active:scale-95 animate-pulse"
                >
                  <Scale className="w-3.5 h-3.5" />
                  <span>Debate Win-Back</span>
                </button>
              ) : (
                <button
                  onClick={() => {
                    playTapSound();
                    onOpenWhatsApp(activeCustomer360);
                  }}
                  className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-glow-green transition active:scale-95"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>Open WhatsApp</span>
                </button>
              )}
            </div>

            {/* RFM Score & Financial Health Grid */}
            <div className="grid grid-cols-3 gap-3">
              <div className="bg-slate-800/60 rounded-xl p-3 border border-slate-700/60">
                <span className="text-[10px] text-slate-400 uppercase font-semibold block">RFM Score</span>
                <span className="text-lg font-mono font-bold text-indigo-300">
                  {activeCustomer360.rfm.recency}{activeCustomer360.rfm.frequency}{activeCustomer360.rfm.monetary}
                </span>
                <span className="text-[10px] text-slate-400 block mt-0.5">R:{activeCustomer360.rfm.recency} F:{activeCustomer360.rfm.frequency} M:{activeCustomer360.rfm.monetary}</span>
              </div>
              <div className="bg-slate-800/60 rounded-xl p-3 border border-slate-700/60">
                <span className="text-[10px] text-slate-400 uppercase font-semibold block">Relationship Health</span>
                <span className="text-lg font-mono font-bold text-amber-400">
                  {activeCustomer360.healthScore}/100
                </span>
                <span className="text-[10px] text-slate-400 block mt-0.5">
                  {activeCustomer360.healthScore < 40 ? 'Dormancy Alert' : 'Stable'}
                </span>
              </div>
              <div className="bg-slate-800/60 rounded-xl p-3 border border-slate-700/60">
                <span className="text-[10px] text-slate-400 uppercase font-semibold block">COD Risk Score</span>
                <span className="text-lg font-mono font-bold text-rose-400">
                  {activeCustomer360.codRiskScore}/100
                </span>
                <span className="text-[10px] text-rose-300 block mt-0.5">RTO Vulnerable</span>
              </div>
            </div>

            {/* COD Risk Factors (Function 8) */}
            <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1.5 text-xs">
              <span className="font-semibold text-slate-300 flex items-center">
                <ShieldAlert className="w-3.5 h-3.5 mr-1.5 text-rose-400" />
                COD Risk Analysis
              </span>
              <ul className="space-y-1 text-slate-400 text-[11px] list-disc list-inside">
                {(activeCustomer360.codRiskFactors || []).map((factor, idx) => (
                  <li key={idx}>{factor}</li>
                ))}
              </ul>
            </div>

            {/* Digital Twin AI Persona (Function 14) */}
            <div className="p-4 rounded-xl bg-indigo-950/40 border border-indigo-500/30 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-indigo-300 flex items-center">
                  <Cpu className="w-3.5 h-3.5 mr-1.5 text-indigo-400" />
                  Digital Twin Persona Model
                </span>
                <span className="text-[10px] font-mono text-indigo-400 bg-indigo-500/20 px-2 py-0.5 rounded">
                  Lang: {activeCustomer360.language}
                </span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed italic">
                "{activeCustomer360.digitalTwin.personaSummary}"
              </p>
              <div className="grid grid-cols-2 gap-2 pt-2 border-t border-indigo-500/20 text-[11px] text-slate-400">
                <div>
                  <span className="text-slate-400">Discount Affinity: </span>
                  <span className="font-mono text-emerald-400 font-bold">{(activeCustomer360.digitalTwin.discountAffinity * 100).toFixed(0)}%</span>
                </div>
                <div>
                  <span className="text-slate-400">Urgency Response: </span>
                  <span className="font-mono text-amber-400 font-bold">{(activeCustomer360.digitalTwin.urgencyResponse * 100).toFixed(0)}%</span>
                </div>
                <div className="col-span-2 text-slate-400">
                  <span>Send Window: </span>
                  <span className="text-slate-200 font-medium">{activeCustomer360.digitalTwin.preferredSendTime}</span>
                </div>
              </div>
            </div>

            {/* Communication History (WhatsApp Log) */}
            <div className="space-y-2">
              <span className="text-xs font-bold text-slate-300 flex items-center">
                <MessageSquare className="w-3.5 h-3.5 mr-1.5 text-emerald-400" />
                WhatsApp Communication History
              </span>
              {activeCustomer360.communicationHistory?.length > 0 ? (
                <div className="space-y-2 max-h-40 overflow-y-auto">
                  {activeCustomer360.communicationHistory.map((comm) => (
                    <div key={comm.id} className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-xs">
                      <div className="flex items-center justify-between text-[10px] text-slate-400 mb-1">
                        <span className="text-emerald-400 font-semibold">{comm.type} ({comm.direction})</span>
                        <span className="font-mono">{comm.timestamp}</span>
                      </div>
                      <p className="text-slate-200">{comm.content}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-slate-500 italic">No previous WhatsApp campaigns sent to this customer.</p>
              )}
            </div>

          </div>
        ) : (
          <div className="glass-panel rounded-2xl p-8 text-center text-slate-400">
            Select a customer on the left to inspect their 360 profile.
          </div>
        )}
      </div>

    </div>
  );
}
