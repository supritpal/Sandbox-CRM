// src/api/client.js - API client for Sandbox CRM

const API_BASE = '/api';

export async function fetchCustomers() {
  const res = await fetch(`${API_BASE}/customers`);
  return res.json();
}

export async function fetchCustomer(id) {
  const res = await fetch(`${API_BASE}/customers/${id}`);
  return res.json();
}

export async function fetchOrders() {
  const res = await fetch(`${API_BASE}/orders`);
  return res.json();
}

export async function fetchStats() {
  const res = await fetch(`${API_BASE}/dashboard/stats`);
  return res.json();
}

export async function fetchGuardrails() {
  const res = await fetch(`${API_BASE}/guardrails`);
  return res.json();
}

export async function updateGuardrails(data) {
  const res = await fetch(`${API_BASE}/guardrails`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  return res.json();
}

export async function fetchActivity() {
  const res = await fetch(`${API_BASE}/activity`);
  return res.json();
}

export async function fetchDebates() {
  const res = await fetch(`${API_BASE}/debates`);
  return res.json();
}

export async function fetchSimulations() {
  const res = await fetch(`${API_BASE}/simulations`);
  return res.json();
}

export async function fetchWhatsAppMessages() {
  const res = await fetch(`${API_BASE}/whatsapp/messages`);
  return res.json();
}

export async function sendWebhook(orderData) {
  const res = await fetch(`${API_BASE}/webhooks/woocommerce`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(orderData)
  });
  return res.json();
}

export async function syncWooCommerce() {
  const res = await fetch(`${API_BASE}/woocommerce/sync`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({})
  });
  return res.json();
}

export async function writeBackWooCommerce(couponCode, orderId, note) {
  const res = await fetch(`${API_BASE}/woocommerce/writeback`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ couponCode, orderId, note })
  });
  return res.json();
}

export async function runDebate(customerId, options = {}) {
  const res = await fetch(`${API_BASE}/agents/debate`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ customerId, ...options })
  });
  return res.json();
}

export async function runSimulation(customerId, options = {}) {
  const res = await fetch(`${API_BASE}/simulations/run`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ customerId, ...options })
  });
  return res.json();
}

export async function sendWhatsApp(customerId, message, options = {}) {
  const res = await fetch(`${API_BASE}/whatsapp/send`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ customerId, message, ...options })
  });
  return res.json();
}

export async function simulateReply(customerId, text) {
  const res = await fetch(`${API_BASE}/whatsapp/reply`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ customerId, text })
  });
  return res.json();
}

export async function resetDemo() {
  const res = await fetch(`${API_BASE}/reset-demo`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({})
  });
  return res.json();
}
