// src/App.jsx
import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import PitchFlowBar from './components/PitchFlowBar';
import DashboardView from './components/DashboardView';
import CustomersView from './components/CustomersView';
import OrdersBoardView from './components/OrdersBoardView';
import MultiAgentBrainView from './components/MultiAgentBrainView';
import DigitalTwinLabView from './components/DigitalTwinLabView';
import WhatsAppHubView from './components/WhatsAppHubView';
import StoreSimulatorView from './components/StoreSimulatorView';
import GuardrailsSettingsView from './components/GuardrailsSettingsView';

import {
  fetchCustomers,
  fetchOrders,
  fetchStats,
  fetchGuardrails,
  updateGuardrails,
  fetchActivity,
  fetchDebates,
  fetchSimulations,
  fetchWhatsAppMessages,
  sendWebhook,
  syncWooCommerce,
  writeBackWooCommerce,
  runDebate,
  runSimulation,
  sendWhatsApp,
  simulateReply,
  resetDemo
} from './api/client';

import { playTapSound, playNotificationSound, playSuccessSound } from './utils/audio';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [pitchStep, setPitchStep] = useState(1);
  const [loading, setLoading] = useState(true);
  const [syncing, setSyncing] = useState(false);

  // Core Data State
  const [customers, setCustomers] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [orders, setOrders] = useState([]);
  const [stats, setStats] = useState(null);
  const [guardrails, setGuardrails] = useState(null);
  const [activities, setActivities] = useState([]);
  const [debates, setDebates] = useState([]);
  const [simulations, setSimulations] = useState([]);
  const [virtualMessages, setVirtualMessages] = useState([]);
  const [notification, setNotification] = useState(null);

  // Load Initial State
  const loadAllData = async () => {
    try {
      const [custs, ords, st, gr, act, deb, sim, msgs] = await Promise.all([
        fetchCustomers(),
        fetchOrders(),
        fetchStats(),
        fetchGuardrails(),
        fetchActivity(),
        fetchDebates(),
        fetchSimulations(),
        fetchWhatsAppMessages()
      ]);

      setCustomers(custs);
      setSelectedCustomer(custs.find(c => c.id === 'cust-101') || custs[0]);
      setOrders(ords);
      setStats(st);
      setGuardrails(gr);
      setActivities(act);
      setDebates(deb);
      setSimulations(sim);
      setVirtualMessages(msgs);
    } catch (err) {
      console.error('Failed to load initial data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAllData();
  }, []);

  const showToast = (message, type = 'info') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 4000);
  };

  // Sync WooCommerce Store
  const handleSyncStore = async () => {
    setSyncing(true);
    try {
      const res = await syncWooCommerce();
      await loadAllData();
      showToast(`WooCommerce store synced: ${res.customersCount} customers, ${res.ordersCount} orders.`);
    } finally {
      setSyncing(false);
    }
  };

  // Reset Demo to pitch Step 1
  const handleResetDemo = async () => {
    await resetDemo();
    await loadAllData();
    setPitchStep(1);
    setActiveTab('store');
    showToast('Demo reset to initial pitch state. Step 1: WooCommerce Storefront ready!', 'success');
  };

  // Step Click Handler in 3-Minute Story Bar
  const handleStepClick = (stepObj) => {
    setPitchStep(stepObj.step);
    setActiveTab(stepObj.tab);

    if (stepObj.step === 2) {
      const aarav = customers.find(c => c.id === 'cust-101');
      if (aarav) setSelectedCustomer(aarav);
      showToast('Step 2: Seeded at-risk customer Aarav Sharma highlighted (Health: 34%, COD Risk: High).');
    } else if (stepObj.step === 3) {
      showToast('Step 3: Multi-agent negotiation: Retention Agent proposes 25%, Margin Guard vetoes to protect margin.');
    } else if (stepObj.step === 4) {
      showToast('Step 4: Digital twin simulator evaluates 3 variants across 100 runs.');
    } else if (stepObj.step === 5) {
      showToast('Step 5: WhatsApp message dispatched to virtual phone.');
    } else if (stepObj.step === 6) {
      showToast('Step 6: Dashboard proof of ₹34,850+ recovered revenue and 14.8x ROI!');
    }
  };

  // Webhook trigger from store
  const handleTriggerWebhook = async (payload) => {
    const res = await sendWebhook(payload);
    await loadAllData();
    showToast(`Webhook order.created received: Order #${payload.id} added!`, 'success');
    return res;
  };

  // Write-Back to WooCommerce
  const handleWriteBack = async (couponCode, orderId, note) => {
    const res = await writeBackWooCommerce(couponCode, orderId, note);
    await loadAllData();
    showToast(`Write-back confirmed: Coupon ${couponCode} created in WooCommerce.`, 'success');
    return res;
  };

  // Agent Debate Run
  const handleRunDebate = async (customerId, options) => {
    const res = await runDebate(customerId, options);
    await loadAllData();
    showToast('Consensus reached: 10% OFF + Free Delivery agreed by Margin Guard and Retention Agent.', 'success');
    return res;
  };

  // Twin Simulation Run
  const handleRunSimulation = async (customerId, options) => {
    const res = await runSimulation(customerId, options);
    await loadAllData();
    showToast('Simulation complete: Variant B (Urgency & Restock Alert) won at 76% conversion probability!', 'success');
    return res;
  };

  // WhatsApp Message Dispatch
  const handleSendMessage = async (customerId, message) => {
    const res = await sendWhatsApp(customerId, message);
    if (!res.success) {
      showToast(res.error, 'error');
      return res;
    }
    await loadAllData();
    showToast('WhatsApp campaign delivered to customer phone!', 'success');
    return res;
  };

  // WhatsApp Customer Reply Simulation (Conversion & Win-Back Proof)
  const handleSimulateReply = async (customerId, replyText) => {
    const res = await simulateReply(customerId, replyText);
    await loadAllData();
    setPitchStep(6);
    showToast('Customer converted via WhatsApp! ₹3,850 recovered revenue added to dashboard ROI tracker 🎉', 'success');
    return res;
  };

  // Guardrails update
  const handleSaveGuardrails = async (newGuardrails) => {
    const res = await updateGuardrails(newGuardrails);
    setGuardrails(res.guardrails);
    showToast('Guardrails settings saved.');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0B0F19] flex flex-col items-center justify-center space-y-4">
        <div className="w-12 h-12 rounded-2xl bg-indigo-600 animate-pulse flex items-center justify-center text-white font-extrabold text-xl shadow-glow-indigo">
          SC
        </div>
        <p className="text-sm text-slate-400 font-mono">Initializing Sandbox CRM Multi-Agent Brain...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0B0F19] text-slate-100 flex flex-col">
      
      {/* App Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onSyncStore={handleSyncStore}
        onResetDemo={handleResetDemo}
        syncing={syncing}
        stats={stats}
      />

      {/* 3-Minute Story Pitch Guide Bar */}
      <PitchFlowBar
        currentStep={pitchStep}
        setCurrentStep={setPitchStep}
        onStepClick={handleStepClick}
      />

      {/* Toast Notification Banner */}
      {notification && (
        <div className="fixed bottom-6 right-6 z-50 animate-slide-up">
          <div className={`px-4 py-3 rounded-xl shadow-2xl text-xs font-semibold flex items-center space-x-2 border ${
            notification.type === 'success'
              ? 'bg-emerald-950/95 border-emerald-500/50 text-emerald-200'
              : notification.type === 'error'
              ? 'bg-rose-950/95 border-rose-500/50 text-rose-200'
              : 'bg-slate-900/95 border-slate-700 text-slate-200'
          }`}>
            <span>{notification.message}</span>
          </div>
        </div>
      )}

      {/* Main Tab Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {activeTab === 'dashboard' && (
          <DashboardView
            stats={stats}
            customers={customers}
            orders={orders}
            activities={activities}
            onNavigateToTab={(tab) => { playTapSound(); setActiveTab(tab); }}
          />
        )}

        {activeTab === 'customers' && (
          <CustomersView
            customers={customers}
            selectedCustomer={selectedCustomer}
            setSelectedCustomer={setSelectedCustomer}
            onStartDebate={(cust) => {
              setSelectedCustomer(cust);
              setPitchStep(3);
              setActiveTab('agents');
            }}
            onOpenWhatsApp={(cust) => {
              setSelectedCustomer(cust);
              setActiveTab('whatsapp');
            }}
          />
        )}

        {activeTab === 'orders' && (
          <OrdersBoardView
            orders={orders}
            onSendDelayWhatsApp={(delayedOrder) => {
              const cust = customers.find(c => c.id === delayedOrder.customerId) || customers[0];
              setSelectedCustomer(cust);
              setActiveTab('whatsapp');
            }}
          />
        )}

        {activeTab === 'agents' && (
          <MultiAgentBrainView
            customers={customers}
            selectedCustomer={selectedCustomer}
            setSelectedCustomer={setSelectedCustomer}
            debateHistory={debates}
            onRunDebate={handleRunDebate}
            onProceedToTwins={(cust, debate) => {
              setSelectedCustomer(cust);
              setPitchStep(4);
              setActiveTab('twins');
            }}
            guardrails={guardrails}
          />
        )}

        {activeTab === 'twins' && (
          <DigitalTwinLabView
            customers={customers}
            selectedCustomer={selectedCustomer}
            simulations={simulations}
            onRunSimulation={handleRunSimulation}
            onDeployToWhatsApp={(cust, winningCopy) => {
              setSelectedCustomer(cust);
              setPitchStep(5);
              setActiveTab('whatsapp');
            }}
          />
        )}

        {activeTab === 'whatsapp' && (
          <WhatsAppHubView
            customers={customers}
            selectedCustomer={selectedCustomer}
            virtualMessages={virtualMessages}
            onSendMessage={handleSendMessage}
            onSimulateReply={handleSimulateReply}
            guardrails={guardrails}
            onToggleHumanApproval={(val) => handleSaveGuardrails({ ...guardrails, humanApprovalRequired: val })}
            stats={stats}
          />
        )}

        {activeTab === 'store' && (
          <StoreSimulatorView
            onTriggerWebhook={handleTriggerWebhook}
            onWriteBack={handleWriteBack}
            onNavigateToOrders={() => setActiveTab('orders')}
            storeConfig={{
              storeUrl: 'https://demo-grooming-store.instawp.xyz'
            }}
          />
        )}

        {activeTab === 'guardrails' && (
          <GuardrailsSettingsView
            guardrails={guardrails}
            onSaveGuardrails={handleSaveGuardrails}
            storeConfig={{
              storeUrl: 'https://demo-grooming-store.instawp.xyz'
            }}
          />
        )}
      </main>

      {/* Footer Status Bar */}
      <footer className="border-t border-slate-800/80 bg-slate-950/80 py-3 px-4 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>Sandbox CRM © 2026 • Built for Indian D2C WooCommerce Stores</span>
          <div className="flex items-center space-x-3 font-mono text-[11px]">
            <span className="text-emerald-400">● Multi-Agent Engine: Healthy</span>
            <span className="text-indigo-400">● Twin Simulator: Calibrated</span>
            <span className="text-sky-400">● WhatsApp Cloud API: Active</span>
          </div>
        </div>
      </footer>

    </div>
  );
}
