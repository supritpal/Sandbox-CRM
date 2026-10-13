// src/components/PitchFlowBar.jsx
import React from 'react';
import { 
  PlayCircle, 
  ChevronRight, 
  ShoppingBag, 
  UserX, 
  Scale, 
  Cpu, 
  MessageSquare, 
  TrendingUp,
  Sparkles
} from 'lucide-react';
import { playTapSound } from '../utils/audio';

export const PITCH_STEPS = [
  {
    step: 1,
    title: '1. Store Webhook',
    subtitle: 'Place WooCommerce order',
    tab: 'store',
    icon: ShoppingBag,
    color: 'from-blue-500 to-indigo-600',
    funcs: 'Func 1, 5, 6'
  },
  {
    step: 2,
    title: '2. Seeded At-Risk',
    subtitle: 'Aarav (Health 34%)',
    tab: 'customers',
    icon: UserX,
    color: 'from-amber-500 to-rose-500',
    funcs: 'Func 7, 8'
  },
  {
    step: 3,
    title: '3. Agent Debate',
    subtitle: '25% vetoed → 10% consensus',
    tab: 'agents',
    icon: Scale,
    color: 'from-indigo-500 to-purple-600',
    funcs: 'Func 9, 10, 12'
  },
  {
    step: 4,
    title: '4. Twin Simulator',
    subtitle: '3 variants tested on AI twin',
    tab: 'twins',
    icon: Cpu,
    color: 'from-purple-500 to-pink-600',
    funcs: 'Func 14, 15, 16'
  },
  {
    step: 5,
    title: '5. WhatsApp Phone',
    subtitle: 'Live message in Hindi/Marathi',
    tab: 'whatsapp',
    icon: MessageSquare,
    color: 'from-emerald-500 to-teal-600',
    funcs: 'Func 11, 17'
  },
  {
    step: 6,
    title: '6. Rupee ROI Proof',
    subtitle: 'Customer recovered & tracked',
    tab: 'dashboard',
    icon: TrendingUp,
    color: 'from-emerald-400 to-green-600',
    funcs: 'Func 21, 22'
  }
];

export default function PitchFlowBar({ currentStep, setCurrentStep, onStepClick }) {
  return (
    <div className="bg-slate-900/90 border-b border-slate-800 px-4 py-2.5">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-2">
        
        {/* Story Intro Tag */}
        <div className="flex items-center space-x-2 shrink-0">
          <div className="flex items-center space-x-1 px-2.5 py-1 rounded-md bg-indigo-500/20 border border-indigo-500/40 text-indigo-300 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
            <span>3-Min Demo Flow</span>
          </div>
          <span className="text-xs text-slate-400 hidden xl:inline">
            Follow the 6 locked hackathon pitch steps:
          </span>
        </div>

        {/* 6 Step Interactive Pills */}
        <div className="flex items-center space-x-1.5 overflow-x-auto no-scrollbar py-0.5">
          {PITCH_STEPS.map((s, index) => {
            const Icon = s.icon;
            const isCurrent = currentStep === s.step;
            const isPast = currentStep > s.step;

            return (
              <React.Fragment key={s.step}>
                <button
                  onClick={() => {
                    playTapSound();
                    setCurrentStep(s.step);
                    onStepClick(s);
                  }}
                  className={`flex items-center space-x-2 px-2.5 py-1.5 rounded-lg text-left text-xs transition-all whitespace-nowrap active:scale-95 ${
                    isCurrent
                      ? 'bg-gradient-to-r text-white shadow-lg ring-1 ring-white/30 ' + s.color
                      : isPast
                      ? 'bg-slate-800/90 text-slate-200 border border-emerald-500/30'
                      : 'bg-slate-800/40 text-slate-400 hover:text-slate-200 hover:bg-slate-800/80 border border-slate-800'
                  }`}
                >
                  <div className={`w-5 h-5 rounded-md flex items-center justify-center text-[10px] font-bold ${
                    isCurrent ? 'bg-white/20 text-white' : isPast ? 'bg-emerald-500/20 text-emerald-400' : 'bg-slate-700/60 text-slate-400'
                  }`}>
                    {isPast ? '✓' : s.step}
                  </div>
                  <div>
                    <div className="font-semibold leading-tight flex items-center space-x-1">
                      <span>{s.title}</span>
                    </div>
                    <div className={`text-[10px] ${isCurrent ? 'text-white/80' : 'text-slate-400'}`}>
                      {s.subtitle}
                    </div>
                  </div>
                </button>

                {index < PITCH_STEPS.length - 1 && (
                  <ChevronRight className="w-3.5 h-3.5 text-slate-600 shrink-0 hidden sm:block" />
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </div>
  );
}
