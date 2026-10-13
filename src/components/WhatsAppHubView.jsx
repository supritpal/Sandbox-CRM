// src/components/WhatsAppHubView.jsx
import React, { useState } from 'react';
import { 
  MessageSquare, 
  Send, 
  Phone, 
  Video, 
  MoreVertical, 
  Check, 
  CheckCheck, 
  Sparkles, 
  Bot, 
  User, 
  Clock, 
  Smile, 
  Paperclip, 
  Mic, 
  CheckCircle2, 
  RotateCcw,
  ShieldCheck,
  ToggleLeft,
  ToggleRight,
  Award
} from 'lucide-react';
import { playTapSound, playNotificationSound, playSuccessSound } from '../utils/audio';

export default function WhatsAppHubView({ 
  customers, 
  selectedCustomer, 
  virtualMessages, 
  onSendMessage, 
  onSimulateReply,
  guardrails,
  onToggleHumanApproval,
  stats
}) {
  const [activeCustomer, setActiveCustomer] = useState(selectedCustomer || customers[0]);
  const [messageDraft, setMessageDraft] = useState(
    `नमस्ते ${selectedCustomer?.name?.split(' ')[0] || 'आरव'} जी! 🙏 आपके पिछले ऑर्डर की स्किनकेयर किट के पुणे वेयरहाउस में केवल 4 पैक बचे हैं! विशेष 10% छूट + मुफ़्त एक्सप्रेस डिलीवरी के लिए कूपन WINBACK10-AARAV उपयोग करें। आज रात 9 बजे तक वैध: https://store.in/c/8421`
  );
  const [selectedLanguage, setSelectedLanguage] = useState(activeCustomer?.language || 'Hindi');
  const [sending, setSending] = useState(false);
  const [replyInput, setReplyInput] = useState('');
  const [humanApproved, setHumanApproved] = useState(true);

  const handleLanguageChange = (lang) => {
    setSelectedLanguage(lang);
    const firstName = activeCustomer.name.split(' ')[0];
    const coupon = `WINBACK10-${firstName.toUpperCase()}`;

    if (lang === 'Hindi') {
      setMessageDraft(`नमस्ते ${firstName} जी! 🙏 आपके पिछले ऑर्डर की स्किनकेयर किट के ${activeCustomer.city} वेयरहाउस में केवल 4 पैक बचे हैं! विशेष 10% छूट + मुफ़्त एक्सप्रेस डिलीवरी के लिए कूपन ${coupon} उपयोग करें। आज रात 9 बजे तक वैध: https://store.in/c/8421`);
    } else if (lang === 'Marathi') {
      setMessageDraft(`नमस्कार ${firstName} जी! 🙏 तुमच्या आवडत्या किटचे ${activeCustomer.city} वेअरहाऊसमध्ये फक्त 4 पॅक शिल्लक आहेत! 10% विशेष सूट + मोफत एक्सप्रेस डिलिव्हरीसाठी कूपन ${coupon} वापरा। आज रात्री 9 वाजेपर्यंत वैध: https://store.in/c/8421`);
    } else {
      setMessageDraft(`Hey ${firstName}! 👋 Quick heads up: Only 4 units left of your favorite Skincare Kit at our ${activeCustomer.city} fulfillment center. Enjoy 10% OFF + Free Express Delivery with code ${coupon} before 9 PM: https://store.in/c/8421`);
    }
  };

  const handleSend = async () => {
    if (!messageDraft.trim()) return;
    playTapSound();
    setSending(true);

    try {
      await onSendMessage(activeCustomer.id, messageDraft);
      playNotificationSound();
    } finally {
      setSending(false);
    }
  };

  const handleQuickReply = async (replyText) => {
    playTapSound();
    await onSimulateReply(activeCustomer.id, replyText);
    playSuccessSound();
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      
      {/* Left Column: Outbound Campaign Dispatcher & Controls (7 Cols) */}
      <div className="lg:col-span-7 space-y-6">
        
        {/* Module Header */}
        <div className="glass-panel rounded-2xl p-6 border-emerald-500/30">
          <div className="space-y-1">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs font-semibold">
              <MessageSquare className="w-3.5 h-3.5" />
              <span>WhatsApp-First Communication (Module 5)</span>
            </div>
            <h1 className="text-2xl font-extrabold text-white">
              WhatsApp Campaign Dispatcher
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Dispatches the winning variant straight to Indian shoppers in English, Hindi, or Marathi through WhatsApp Cloud API or Twilio Sandbox, with built-in human-in-the-loop governance.
            </p>
          </div>
        </div>

        {/* Human-in-the-Loop Approval Toggle (Function 20) */}
        <div className="glass-panel rounded-xl p-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-lg bg-indigo-500/15 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <span className="font-bold text-sm text-white block">Human Approval Mode (Function 20)</span>
              <span className="text-xs text-slate-400">
                {guardrails?.humanApprovalRequired ? 'Owner must tap approve before send' : 'Fully autonomous send'}
              </span>
            </div>
          </div>

          <button
            onClick={() => {
              playTapSound();
              onToggleHumanApproval(!guardrails?.humanApprovalRequired);
            }}
            className="flex items-center space-x-2 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-semibold border border-slate-700 transition"
          >
            {guardrails?.humanApprovalRequired ? (
              <span className="text-indigo-400 flex items-center">
                <ToggleRight className="w-5 h-5 mr-1" /> HITL Active
              </span>
            ) : (
              <span className="text-emerald-400 flex items-center">
                <ToggleLeft className="w-5 h-5 mr-1" /> Autonomous
              </span>
            )}
          </button>
        </div>

        {/* Campaign Composer Card */}
        <div className="glass-panel rounded-2xl p-6 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-800">
            <div>
              <label className="text-xs text-slate-400 font-semibold uppercase block mb-1">Target Shopper</label>
              <select
                value={activeCustomer.id}
                onChange={(e) => {
                  const c = customers.find(x => x.id === e.target.value);
                  if (c) {
                    setActiveCustomer(c);
                    handleLanguageChange(c.language || 'Hindi');
                  }
                }}
                className="bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-indigo-500"
              >
                {customers.map(c => (
                  <option key={c.id} value={c.id}>
                    {c.name} ({c.phone} • {c.language})
                  </option>
                ))}
              </select>
            </div>

            {/* Language Selector */}
            <div>
              <label className="text-xs text-slate-400 font-semibold uppercase block mb-1">Language Tone</label>
              <div className="flex items-center space-x-1 bg-slate-900 p-1 rounded-lg border border-slate-700">
                {['Hindi', 'Marathi', 'English'].map(lang => (
                  <button
                    key={lang}
                    onClick={() => { playTapSound(); handleLanguageChange(lang); }}
                    className={`px-2.5 py-1 rounded text-xs font-semibold transition ${
                      selectedLanguage === lang
                        ? 'bg-emerald-600 text-white'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    {lang}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Message Text Editor */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-bold text-white flex items-center">
                <Sparkles className="w-3.5 h-3.5 mr-1 text-emerald-400" />
                Validated Copy (Digital Twin Winner)
              </label>
              <span className="text-[10px] text-slate-400 font-mono">
                {messageDraft.length} chars
              </span>
            </div>

            <textarea
              rows={4}
              value={messageDraft}
              onChange={(e) => setMessageDraft(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-xs sm:text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-emerald-500 leading-relaxed font-sans"
            />
          </div>

          {/* Send / Human Approve Bar */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="text-xs text-slate-400">
              <span>Delivery Channel: </span>
              <strong className="text-emerald-400 font-mono">WhatsApp Cloud API (+91 {activeCustomer.phone})</strong>
            </div>

            <button
              onClick={handleSend}
              disabled={sending}
              className="w-full sm:w-auto flex items-center justify-center space-x-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-bold shadow-glow-green transition active:scale-95 disabled:opacity-50"
            >
              <Send className={`w-3.5 h-3.5 ${sending ? 'animate-spin' : ''}`} />
              <span>{sending ? 'Dispatching...' : 'Approve & Send to WhatsApp'}</span>
            </button>
          </div>
        </div>

        {/* Event-Triggered Workflows Card (Function 19) */}
        <div className="glass-panel rounded-xl p-5 space-y-3">
          <h2 className="text-sm font-bold text-white flex items-center">
            <Bot className="w-4 h-4 mr-2 text-indigo-400" />
            Automated Event-Triggered Workflows (Function 19)
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="p-3 rounded-lg bg-slate-900/80 border border-slate-800 text-xs space-y-1">
              <span className="font-semibold text-amber-400 block">1. Order Delayed</span>
              <p className="text-slate-400 text-[11px]">Triggers proactive WhatsApp update with ₹50 apology coupon if courier lags &gt; 48h.</p>
              <span className="text-[10px] text-emerald-400 font-mono">● Active</span>
            </div>

            <div className="p-3 rounded-lg bg-slate-900/80 border border-slate-800 text-xs space-y-1">
              <span className="font-semibold text-indigo-400 block">2. Order Shipped</span>
              <p className="text-slate-400 text-[11px]">Sends live tracking link and prompts COD buyers to confirm address to cut RTO.</p>
              <span className="text-[10px] text-emerald-400 font-mono">● Active</span>
            </div>

            <div className="p-3 rounded-lg bg-slate-900/80 border border-slate-800 text-xs space-y-1">
              <span className="font-semibold text-emerald-400 block">3. Win-Back</span>
              <p className="text-slate-400 text-[11px]">Retention vs Margin debate + Twin test on 60d dormant shoppers.</p>
              <span className="text-[10px] text-emerald-400 font-mono">● Active</span>
            </div>
          </div>
        </div>

      </div>

      {/* Right Column: Interactive Live WhatsApp Phone Simulator (5 Cols) */}
      <div className="lg:col-span-5 flex justify-center">
        <div className="w-[340px] sm:w-[360px] bg-slate-950 rounded-[44px] p-3 shadow-2xl phone-frame border border-slate-800">
          
          {/* Phone Speaker & Dynamic Island */}
          <div className="flex justify-center mb-2">
            <div className="w-24 h-4 bg-slate-900 rounded-full flex items-center justify-center">
              <div className="w-3 h-3 rounded-full bg-slate-950 mr-2"></div>
              <div className="w-8 h-1 rounded-full bg-slate-800"></div>
            </div>
          </div>

          {/* Screen Content Container */}
          <div className="bg-[#0b141a] rounded-[36px] overflow-hidden flex flex-col h-[600px] border border-slate-800/80 wa-wallpaper">
            
            {/* WhatsApp App Header */}
            <div className="bg-[#1f2c34] px-3.5 py-3 flex items-center justify-between text-white border-b border-slate-800/80 shadow-md">
              <div className="flex items-center space-x-2.5">
                <div className="w-9 h-9 rounded-full bg-emerald-700 flex items-center justify-center font-bold text-xs text-white">
                  SC
                </div>
                <div>
                  <div className="flex items-center space-x-1">
                    <span className="font-bold text-xs">Sandbox Grooming</span>
                    <span className="w-3.5 h-3.5 rounded-full bg-emerald-500 flex items-center justify-center text-[9px] text-slate-950 font-bold">✓</span>
                  </div>
                  <span className="text-[10px] text-emerald-400">Official Business Account</span>
                </div>
              </div>

              <div className="flex items-center space-x-3 text-slate-300">
                <Video className="w-4 h-4 cursor-pointer hover:text-white" />
                <Phone className="w-4 h-4 cursor-pointer hover:text-white" />
                <MoreVertical className="w-4 h-4 cursor-pointer hover:text-white" />
              </div>
            </div>

            {/* Chat Messages Body */}
            <div className="flex-1 p-3.5 overflow-y-auto space-y-3 flex flex-col justify-end text-xs">
              
              {/* Encrypted Notice Pill */}
              <div className="flex justify-center">
                <span className="px-2.5 py-1 rounded-md bg-[#182229] text-[#ffd279] text-[9px] text-center max-w-[260px] leading-tight shadow-sm">
                  🔒 Messages are end-to-end encrypted. Sandbox CRM AI Agent connected.
                </span>
              </div>

              {/* Chat Message Bubbles */}
              {virtualMessages.map((msg) => {
                const isBrand = msg.sender === 'brand';

                return (
                  <div 
                    key={msg.id}
                    className={`flex ${isBrand ? 'justify-end' : 'justify-start'} animate-fade-in`}
                  >
                    <div 
                      className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-xs shadow-md ${
                        isBrand 
                          ? 'bg-[#005c4b] text-white rounded-tr-none' 
                          : 'bg-[#202c33] text-white rounded-tl-none'
                      }`}
                    >
                      <p className="whitespace-pre-line leading-relaxed">{msg.text}</p>
                      <div className={`mt-1 flex items-center justify-end space-x-1 text-[9px] ${
                        isBrand ? 'text-emerald-200/80' : 'text-slate-400'
                      }`}>
                        <span>{msg.timestamp}</span>
                        {isBrand && (
                          <CheckCheck className="w-3.5 h-3.5 text-sky-400" />
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}

              {/* Interactive Quick Action Buttons on Customer Phone */}
              <div className="p-2 rounded-xl bg-slate-900/90 border border-emerald-500/30 space-y-1.5 animate-slide-up">
                <span className="text-[10px] font-semibold text-emerald-400 block text-center uppercase tracking-wider">
                  ⚡ 1-Tap Customer Response (Test Simulation)
                </span>
                <div className="grid grid-cols-1 gap-1">
                  <button
                    onClick={() => handleQuickReply(`Thanks! Claiming 10% coupon WINBACK10-${activeCustomer.name.split(' ')[0].toUpperCase()} for my skincare kit order now!`)}
                    className="w-full py-1.5 px-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-[11px] font-bold text-center transition active:scale-95 shadow"
                  >
                    🎉 Claim 10% Discount & Reorder
                  </button>
                  <button
                    onClick={() => handleQuickReply('Please share the direct payment link via UPI')}
                    className="w-full py-1 px-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-[10px] text-center transition active:scale-95"
                  >
                    Send UPI Payment Link
                  </button>
                </div>
              </div>

            </div>

            {/* WhatsApp Input Bar */}
            <div className="bg-[#1f2c34] p-2 flex items-center space-x-2 border-t border-slate-800">
              <Smile className="w-5 h-5 text-slate-400 shrink-0" />
              <input
                type="text"
                placeholder="Type a message as customer..."
                value={replyInput}
                onChange={(e) => setReplyInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && replyInput.trim()) {
                    handleQuickReply(replyInput);
                    setReplyInput('');
                  }
                }}
                className="flex-1 bg-[#2a3942] rounded-full px-3.5 py-1.5 text-xs text-white placeholder-slate-400 focus:outline-none"
              />
              <button
                onClick={() => {
                  if (replyInput.trim()) {
                    handleQuickReply(replyInput);
                    setReplyInput('');
                  }
                }}
                className="w-8 h-8 rounded-full bg-[#00a884] flex items-center justify-center text-white shrink-0 active:scale-90 transition"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>
        </div>
      </div>

    </div>
  );
}
