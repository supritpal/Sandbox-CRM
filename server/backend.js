// server/backend.js - Core API router and business logic for Sandbox CRM
import { 
  initialCustomers, 
  initialOrders, 
  initialDebateHistory, 
  initialSimulations, 
  initialStats, 
  initialGuardrails 
} from './data.js';

class CRMStore {
  constructor() {
    this.reset();
  }

  reset() {
    this.customers = JSON.parse(JSON.stringify(initialCustomers));
    this.orders = JSON.parse(JSON.stringify(initialOrders));
    this.debateHistory = JSON.parse(JSON.stringify(initialDebateHistory));
    this.simulations = JSON.parse(JSON.stringify(initialSimulations));
    this.stats = JSON.parse(JSON.stringify(initialStats));
    this.guardrails = JSON.parse(JSON.stringify(initialGuardrails));
    this.virtualPhoneMessages = [
      {
        id: 'msg-seed-1',
        sender: 'brand',
        recipient: '+91 98201 44521',
        text: 'Order #WC-8421 confirmed! Your Grooming Kit is being packed.',
        timestamp: '10:30 AM',
        status: 'read'
      }
    ];
    this.activities = [
      {
        id: 'act-1',
        type: 'webhook',
        title: 'WooCommerce Webhook Received',
        description: 'New order #WC-9430 processed via UPI',
        timestamp: '3 hours ago',
        icon: 'Package'
      },
      {
        id: 'act-2',
        type: 'alert',
        title: 'Delayed Order Alert Flagged',
        description: 'Order #WC-9432 held at DTDC Bhiwandi Hub (+54h)',
        timestamp: '5 hours ago',
        icon: 'AlertTriangle'
      },
      {
        id: 'act-3',
        type: 'agent',
        title: 'At-Risk Customer Flagged',
        description: 'Aarav Sharma reached 62 days dormancy (Health score: 34)',
        timestamp: '1 day ago',
        icon: 'Users'
      }
    ];
    this.storeConfig = {
      storeUrl: 'https://demo-grooming-store.instawp.xyz',
      consumerKey: 'ck_mock_sandbox_crm_2026',
      consumerSecret: 'cs_mock_sandbox_crm_2026',
      isConnected: true,
      lastSyncTime: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }) + ' IST'
    };
  }

  getCustomers() {
    return this.customers;
  }

  getCustomer(id) {
    return this.customers.find(c => c.id === id);
  }

  getOrders() {
    return this.orders;
  }

  getStats() {
    // Recalculate stats dynamically
    const totalRev = this.orders.reduce((sum, o) => sum + o.total, 0) + 235000;
    const atRiskCusts = this.customers.filter(c => c.segment === 'At-Risk');
    const atRiskRev = atRiskCusts.reduce((sum, c) => sum + c.ltv, 0);

    return {
      ...this.stats,
      totalRevenue: totalRev,
      atRiskRevenueAtStake: atRiskRev,
    };
  }

  addOrderFromWebhook(orderData) {
    const orderId = orderData.id || `WC-${Math.floor(1000 + Math.random() * 9000)}`;
    const custName = orderData.billing?.first_name 
      ? `${orderData.billing.first_name} ${orderData.billing.last_name || ''}`.trim()
      : (orderData.customerName || 'Pooja Nair');
    const custPhone = orderData.billing?.phone || orderData.phone || '+91 98765 43210';
    const city = orderData.billing?.city || orderData.city || 'Mumbai';
    const total = parseFloat(orderData.total || 3499);
    const paymentMethod = orderData.payment_method_title || orderData.paymentMethod || 'Razorpay UPI (Prepaid)';
    const isCod = paymentMethod.toLowerCase().includes('cod') || paymentMethod.toLowerCase().includes('cash');

    const newOrder = {
      id: orderId,
      customerId: 'cust-101', // Link or create
      customerName: custName,
      city,
      total,
      status: 'processing',
      paymentMethod,
      date: 'Just now',
      dateIso: new Date().toISOString(),
      items: orderData.line_items || [
        { name: 'Radiance Peptide Facial Oil (30ml)', qty: 1, price: total, marginPercent: 34 }
      ],
      isDelayed: false,
      notes: [
        `[Webhook Receiver] order.created received from WooCommerce Storefront`,
        `[Payment Verified] ${paymentMethod} verified successfully.`
      ]
    };

    this.orders.unshift(newOrder);

    // Update customer or add order to customer
    let customer = this.customers.find(c => c.phone === custPhone || c.name === custName);
    if (!customer) {
      customer = {
        id: `cust-${Date.now()}`,
        name: custName,
        phone: custPhone,
        email: orderData.billing?.email || 'customer@example.in',
        city,
        state: 'Maharashtra',
        pincode: '400001',
        language: 'Hindi',
        segment: 'New',
        rfm: { recency: 5, frequency: 1, monetary: 3, score: '513' },
        ltv: total,
        orderCount: 1,
        avgOrderValue: total,
        lastOrderDate: 'Just now',
        lastOrderDateIso: new Date().toISOString(),
        healthScore: 88,
        codRiskScore: isCod ? 58 : 18,
        codRiskFactors: isCod ? ['New customer using COD'] : ['Prepaid digital payment verified'],
        tags: ['New Customer', isCod ? 'COD Buyer' : 'Prepaid Buyer'],
        digitalTwin: {
          priceSensitivity: 'Moderate',
          discountAffinity: 0.6,
          urgencyResponse: 0.65,
          valueLoyalty: 0.7,
          preferredSendTime: '18:00 IST',
          preferredLanguage: 'Hindi',
          personaSummary: 'Recently acquired customer. Evaluating service speed and product quality.'
        },
        communicationHistory: [],
        guardrailsStatus: { canMessageToday: true, lastMessagedDate: 'Never', weeklyMessageCount: 0, dndActive: false },
        recoveryStatus: 'Healthy'
      };
      this.customers.push(customer);
    } else {
      customer.ltv += total;
      customer.orderCount += 1;
      customer.lastOrderDate = 'Just now';
      customer.healthScore = Math.min(100, customer.healthScore + 25);
      if (customer.segment === 'At-Risk') {
        customer.segment = 'Regular';
        customer.recoveryStatus = 'Recovered';
      }
    }

    this.activities.unshift({
      id: `act-${Date.now()}`,
      type: 'webhook',
      title: 'WooCommerce Webhook Processed',
      description: `Order #${orderId} (₹${total}) synced for ${custName}`,
      timestamp: 'Just now',
      icon: 'Zap'
    });

    return { order: newOrder, customer };
  }

  runAgentDebate(customerId, options = {}) {
    const customer = this.getCustomer(customerId) || this.customers[0];
    const initialOffer = options.initialOffer || '25% Flat Discount';
    const language = options.language || customer.language || 'Hindi';

    // Agent Debate Logic
    const debate = {
      id: `debate-${Date.now()}`,
      customerId: customer.id,
      customerName: customer.name,
      timestamp: 'Just now',
      status: 'Consensus Reached',
      settledOffer: '10% OFF + Free Express Delivery',
      settledCoupon: `WINBACK10-${customer.name.split(' ')[0].toUpperCase()}`,
      steps: [
        {
          agent: 'Retention Agent',
          avatar: '🎯',
          role: 'Customer Lifetime Value Maximizer',
          argument: `${customer.name} has been inactive for ${customer.lastOrderDate} (LTV: ₹${customer.ltv.toLocaleString('en-IN')}). RFM status is ${customer.segment}. I propose an aggressive 25% discount code to trigger immediate win-back and prevent churn to competitors.`,
          sentiment: 'Aggressive Win-Back',
          offerProposal: '25% Flat Discount',
          timestamp: 'Step 1'
        },
        {
          agent: 'Margin Guard Agent',
          avatar: '🛡️',
          role: 'Gross Margin & Profitability Sentry',
          argument: `VETO! 🛑 25% discount severely compromises profitability. Average product gross margin is 28.5%. A 25% discount combined with courier fulfillment (₹85) would produce a NEGATIVE unit contribution margin (-₹28). I veto 25%. My counter-offer is 10% discount + Free Express Delivery (our enterprise shipping rate is only ₹45), preserving an 18.2% net profit margin.`,
          sentiment: 'Veto & Counter-Offer',
          offerProposal: '10% OFF + Free Express Delivery',
          veto: true,
          timestamp: 'Step 2'
        },
        {
          agent: 'Retention Agent',
          avatar: '🎯',
          role: 'Customer Lifetime Value Maximizer',
          argument: `Counter-offer approved. 10% discount plus free express delivery gives ${customer.name.split(' ')[0]} ₹430 in perceived value without diluting brand pricing integrity. Proceeding with consensus.`,
          sentiment: 'Consensus Accepted',
          consensus: true,
          timestamp: 'Step 3'
        },
        {
          agent: 'Messenger Agent',
          avatar: '✍️',
          role: 'Multilingual Persuasion Specialist',
          argument: `Translating offer for ${customer.name}. Customer language detected as ${language}. Crafting 3 psychological copy variants (Direct Discount, Urgency/Scarcity, VIP Loyalty) for Digital Twin simulation.`,
          sentiment: 'Copy Generated',
          language,
          readyForTwin: true,
          timestamp: 'Step 4'
        }
      ]
    };

    this.debateHistory.unshift(debate);

    this.activities.unshift({
      id: `act-${Date.now()}`,
      type: 'agent',
      title: 'Multi-Agent Consensus Reached',
      description: `Retention & Margin Guard agreed on 10% + Free Delivery for ${customer.name}`,
      timestamp: 'Just now',
      icon: 'MessageSquare'
    });

    return debate;
  }

  runTwinSimulation(customerId, options = {}) {
    const customer = this.getCustomer(customerId) || this.customers[0];
    const language = options.language || customer.language || 'Hindi';
    const couponCode = `WINBACK10-${customer.name.split(' ')[0].toUpperCase()}`;

    // Language tailored variants
    let variants = [];

    if (language === 'Hindi') {
      variants = [
        {
          id: 'variant-A',
          name: 'Variant A: Direct Discount',
          language: 'Hindi',
          copy: `नमस्ते ${customer.name.split(' ')[0]} जी! 🙏 आपकी पसंदीदा स्किनकेयर किट ख़त्म हो गई है? आपके लिए विशेष 10% छूट + मुफ़्त शिपिंग कूपन: ${couponCode}. अभी ऑर्डर करें: https://store.in/c/8421`,
          metrics: {
            predictedOpenRate: 88,
            predictedClickRate: 42,
            predictedConversion: 58,
            expectedRevenue: 2233
          },
          twinCritique: 'Good value proposition, but lacks local delivery urgency. Twin Aarav tends to postpone action without a deadline.'
        },
        {
          id: 'variant-B',
          name: 'Variant B: Urgency & Restock Alert (WINNER)',
          language: 'Hindi',
          copy: `नमस्ते ${customer.name.split(' ')[0]} जी! 🙏 आपके पिछले ऑर्डर की स्किनकेयर किट के ${customer.city} वेयरहाउस में केवल 4 पैक बचे हैं! विशेष 10% छूट + मुफ़्त एक्सप्रेस डिलीवरी के लिए कूपन ${couponCode} उपयोग करें। आज रात 9 बजे तक वैध: https://store.in/c/8421`,
          metrics: {
            predictedOpenRate: 94,
            predictedClickRate: 68,
            predictedConversion: 76,
            expectedRevenue: 2926
          },
          twinCritique: 'Highest conversion probability (76%)! Twin persona has high urgency sensitivity (0.78) and responds immediately to local warehouse stock depletion alerts.',
          isWinner: true
        },
        {
          id: 'variant-C',
          name: 'Variant C: VIP Relationship / Emotional Hook',
          language: 'Hindi',
          copy: `नमस्ते ${customer.name.split(' ')[0]} भाई! ✨ हमें आपकी याद आ रही है। आपकी त्वचा का ख़ास ख़्याल रखने के लिए हम लाए हैं एक ख़ास तोहफ़ा — 10% छूट और मुफ़्त डिलीवरी। कूपन: ${couponCode}. https://store.in/c/8421`,
          metrics: {
            predictedOpenRate: 84,
            predictedClickRate: 36,
            predictedConversion: 44,
            expectedRevenue: 1694
          },
          twinCritique: 'Too informal. Persona is a busy urban professional who prioritizes utility and speed over emotional greetings.'
        }
      ];
    } else if (language === 'Marathi') {
      variants = [
        {
          id: 'variant-A',
          name: 'Variant A: Direct Discount',
          language: 'Marathi',
          copy: `नमस्कार ${customer.name.split(' ')[0]} जी! 🙏 तुमची आवडती ग्रूमिंग किट संपली आहे का? खास तुमच्यासाठी 10% सूट + मोफत डिलिव्हरी! कूपन कोड: ${couponCode}. ऑर्डर करा: https://store.in/c/8421`,
          metrics: { predictedOpenRate: 86, predictedClickRate: 40, predictedConversion: 56, expectedRevenue: 2156 },
          twinCritique: 'Clean Marathi phrasing, but misses urgency trigger.'
        },
        {
          id: 'variant-B',
          name: 'Variant B: Urgency & Restock Alert (WINNER)',
          language: 'Marathi',
          copy: `नमस्कार ${customer.name.split(' ')[0]} जी! 🙏 तुमच्या आवडत्या किटचे ${customer.city} वेअरहाऊसमध्ये फक्त 4 पॅक शिल्लक आहेत! 10% विशेष सूट + मोफत एक्सप्रेस डिलिव्हरीसाठी कूपन ${couponCode} वापरा. आज रात्री 9 वाजेपर्यंत वैध: https://store.in/c/8421`,
          metrics: { predictedOpenRate: 95, predictedClickRate: 71, predictedConversion: 78, expectedRevenue: 3003 },
          twinCritique: 'Outstanding performance (78% predicted conversion). Native Marathi urgency combined with city-level warehouse mention creates high trust.',
          isWinner: true
        },
        {
          id: 'variant-C',
          name: 'Variant C: VIP Loyalty',
          language: 'Marathi',
          copy: `नमस्कार ${customer.name.split(' ')[0]} जी! ✨ तुम्ही आमचे खास ग्राहक आहात. तुमच्यासाठी 10% सूट आणि मोफत भेटवस्तू. कूपन: ${couponCode}. https://store.in/c/8421`,
          metrics: { predictedOpenRate: 82, predictedClickRate: 38, predictedConversion: 48, expectedRevenue: 1848 },
          twinCritique: 'Moderate response.'
        }
      ];
    } else {
      // English
      variants = [
        {
          id: 'variant-A',
          name: 'Variant A: Direct Discount',
          language: 'English',
          copy: `Hey ${customer.name.split(' ')[0]}! 👋 Running low on your skincare essentials? Here's an exclusive 10% OFF + Free Express Shipping. Use code: ${couponCode}. Shop now: https://store.in/c/8421`,
          metrics: { predictedOpenRate: 87, predictedClickRate: 44, predictedConversion: 60, expectedRevenue: 2310 },
          twinCritique: 'Crisp copy, reliable baseline conversion.'
        },
        {
          id: 'variant-B',
          name: 'Variant B: Urgency & Restock Alert (WINNER)',
          language: 'English',
          copy: `Hey ${customer.name.split(' ')[0]}! 👋 Quick heads up: Only 4 units left of your favorite Skincare Kit at our ${customer.city} fulfillment center. Enjoy 10% OFF + Free Express Delivery with code ${couponCode} before 9 PM: https://store.in/c/8421`,
          metrics: { predictedOpenRate: 93, predictedClickRate: 69, predictedConversion: 75, expectedRevenue: 2887 },
          twinCritique: 'Highest predicted conversion (75%). Scarcity + geographical relevance maximizes click-through rate.',
          isWinner: true
        },
        {
          id: 'variant-C',
          name: 'Variant C: VIP Relationship',
          language: 'English',
          copy: `Hey ${customer.name.split(' ')[0]}! ✨ We noticed it's been a while since your last glow routine. Here's 10% OFF + a complimentary travel cleanser: ${couponCode}. https://store.in/c/8421`,
          metrics: { predictedOpenRate: 83, predictedClickRate: 39, predictedConversion: 46, expectedRevenue: 1771 },
          twinCritique: 'Good engagement, but free gift lacks urgency incentive.'
        }
      ];
    }

    const simulation = {
      id: `sim-${Date.now()}`,
      customerId: customer.id,
      customerName: customer.name,
      twinPersona: `${customer.digitalTwin.priceSensitivity} (${customer.city})`,
      evaluatedRuns: 100,
      winnerVariantId: 'variant-B',
      variants
    };

    this.simulations.unshift(simulation);

    this.activities.unshift({
      id: `act-${Date.now()}`,
      type: 'simulation',
      title: 'Digital Twin Simulation Completed',
      description: `Tested 3 variants across 100 twin runs for ${customer.name}. Variant B won (76% conversion).`,
      timestamp: 'Just now',
      icon: 'Cpu'
    });

    return simulation;
  }

  sendWhatsAppMessage(customerId, messageText, options = {}) {
    const customer = this.getCustomer(customerId) || this.customers[0];
    const timeStr = new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });

    // Guardrail Check
    if (this.guardrails.maxMessagesPerWeekPerCustomer <= customer.guardrailsStatus.weeklyMessageCount) {
      return {
        success: false,
        error: 'Guardrail Block: Frequency limit exceeded (1 message/week allowed).'
      };
    }

    const newMsg = {
      id: `msg-${Date.now()}`,
      sender: 'brand',
      recipient: customer.phone,
      text: messageText,
      timestamp: timeStr,
      status: 'delivered' // sent -> delivered -> read
    };

    this.virtualPhoneMessages.push(newMsg);

    // Update customer communication history
    customer.communicationHistory.unshift({
      id: `comm-${Date.now()}`,
      type: 'WhatsApp',
      direction: 'outbound',
      timestamp: 'Just now',
      content: messageText,
      status: 'delivered'
    });

    customer.guardrailsStatus.weeklyMessageCount += 1;
    customer.guardrailsStatus.lastMessagedDate = 'Today';
    customer.recoveryStatus = 'Sent';

    // Simulate write-back to WooCommerce
    this.orders.forEach(o => {
      if (o.customerId === customer.id) {
        o.notes.push(`[Sandbox CRM AI] Retention WhatsApp dispatched to ${customer.phone}: "${messageText.substring(0, 45)}..."`);
      }
    });

    this.activities.unshift({
      id: `act-${Date.now()}`,
      type: 'whatsapp',
      title: 'WhatsApp Campaign Dispatched',
      description: `Delivered winning copy to ${customer.name} (${customer.phone})`,
      timestamp: 'Just now',
      icon: 'Send'
    });

    return {
      success: true,
      message: 'WhatsApp dispatched successfully',
      data: newMsg
    };
  }

  simulateCustomerReply(customerId, replyText = 'Thanks! I just ordered using the 10% coupon code!') {
    const customer = this.getCustomer(customerId) || this.customers[0];
    const timeStr = new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });

    const replyMsg = {
      id: `msg-${Date.now()}`,
      sender: 'customer',
      recipient: 'brand',
      text: replyText,
      timestamp: timeStr,
      status: 'read'
    };

    this.virtualPhoneMessages.push(replyMsg);

    // Update customer communication history
    customer.communicationHistory.unshift({
      id: `comm-${Date.now()}`,
      type: 'WhatsApp',
      direction: 'inbound',
      timestamp: 'Just now',
      content: replyText,
      status: 'received'
    });

    // Mark as recovered and bump ROI
    customer.recoveryStatus = 'Recovered';
    customer.segment = 'VIP';
    customer.healthScore = 92;
    customer.lastOrderDate = 'Today';

    const recoveredAmount = 3850;
    this.stats.recoveredRevenue += recoveredAmount;
    this.stats.recoveredCustomersCount += 1;
    this.stats.roiMultiplier = +(this.stats.recoveredRevenue / (this.stats.costOfDiscountsGiven + 385)).toFixed(1);

    // Create write-back order in WooCommerce
    const newOrder = {
      id: `WC-${Math.floor(9500 + Math.random() * 400)}`,
      customerId: customer.id,
      customerName: customer.name,
      city: customer.city,
      total: recoveredAmount - 385, // 10% coupon applied
      status: 'processing',
      paymentMethod: 'UPI (Prepaid - Converted from COD!)',
      date: 'Just now',
      dateIso: new Date().toISOString(),
      items: [
        { name: 'Complete Anti-Pollution Men\'s Kit (Reorder)', qty: 1, price: 3850, marginPercent: 28.5 }
      ],
      isDelayed: false,
      notes: [
        `[WooCommerce] Order placed using AI Win-Back coupon WINBACK10-${customer.name.split(' ')[0].toUpperCase()}`,
        `[Sandbox CRM] At-risk customer successfully converted! COD risk mitigated to Prepaid UPI.`
      ]
    };
    this.orders.unshift(newOrder);

    this.activities.unshift({
      id: `act-${Date.now()}`,
      type: 'roi',
      title: 'Customer Recovered via WhatsApp! 🎉',
      description: `${customer.name} redeemed 10% offer. ₹${recoveredAmount.toLocaleString('en-IN')} revenue recovered!`,
      timestamp: 'Just now',
      icon: 'Award'
    });

    return {
      success: true,
      replyMsg,
      newOrder,
      stats: this.getStats()
    };
  }

  writeBackWooCommerce(couponCode, orderId, note) {
    const order = this.orders.find(o => o.id === orderId);
    if (order && note) {
      order.notes.push(`[WooCommerce Write-Back] ${note}`);
    }

    this.activities.unshift({
      id: `act-${Date.now()}`,
      type: 'woocommerce',
      title: 'WooCommerce Write-Back Completed',
      description: `Coupon ${couponCode || 'PROMO'} synchronized & order note logged`,
      timestamp: 'Just now',
      icon: 'RefreshCw'
    });

    return {
      success: true,
      couponCode,
      orderId,
      message: 'Coupon created and order note written back to WooCommerce store.'
    };
  }
}

export const crmStore = new CRMStore();

// Request Handler for Vite Dev Server Middleware
export async function handleApiRequest(req, res) {
  const url = new URL(req.url, 'http://localhost:3000');
  const pathname = url.pathname;
  const method = req.method;

  // Set headers
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (method === 'OPTIONS') {
    res.statusCode = 204;
    res.end();
    return;
  }

  // Parse JSON Body for POST requests
  let body = {};
  if (method === 'POST' || method === 'PUT') {
    try {
      const chunks = [];
      for await (const chunk of req) {
        chunks.push(chunk);
      }
      const raw = Buffer.concat(chunks).toString();
      if (raw) body = JSON.parse(raw);
    } catch (err) {
      console.error('Error parsing request body:', err);
    }
  }

  try {
    // Routes:
    if (pathname === '/api/customers' && method === 'GET') {
      res.statusCode = 200;
      res.end(JSON.stringify(crmStore.getCustomers()));
      return;
    }

    if (pathname.startsWith('/api/customers/') && method === 'GET') {
      const id = pathname.replace('/api/customers/', '');
      const cust = crmStore.getCustomer(id);
      if (cust) {
        res.statusCode = 200;
        res.end(JSON.stringify(cust));
      } else {
        res.statusCode = 404;
        res.end(JSON.stringify({ error: 'Customer not found' }));
      }
      return;
    }

    if (pathname === '/api/orders' && method === 'GET') {
      res.statusCode = 200;
      res.end(JSON.stringify(crmStore.getOrders()));
      return;
    }

    if (pathname === '/api/dashboard/stats' && method === 'GET') {
      res.statusCode = 200;
      res.end(JSON.stringify(crmStore.getStats()));
      return;
    }

    if (pathname === '/api/guardrails' && method === 'GET') {
      res.statusCode = 200;
      res.end(JSON.stringify(crmStore.guardrails));
      return;
    }

    if (pathname === '/api/guardrails' && method === 'POST') {
      crmStore.guardrails = { ...crmStore.guardrails, ...body };
      res.statusCode = 200;
      res.end(JSON.stringify({ success: true, guardrails: crmStore.guardrails }));
      return;
    }

    if (pathname === '/api/activity' && method === 'GET') {
      res.statusCode = 200;
      res.end(JSON.stringify(crmStore.activities));
      return;
    }

    if (pathname === '/api/debates' && method === 'GET') {
      res.statusCode = 200;
      res.end(JSON.stringify(crmStore.debateHistory));
      return;
    }

    if (pathname === '/api/simulations' && method === 'GET') {
      res.statusCode = 200;
      res.end(JSON.stringify(crmStore.simulations));
      return;
    }

    if (pathname === '/api/whatsapp/messages' && method === 'GET') {
      res.statusCode = 200;
      res.end(JSON.stringify(crmStore.virtualPhoneMessages));
      return;
    }

    // Action Endpoints:
    if (pathname === '/api/webhooks/woocommerce' && method === 'POST') {
      const result = crmStore.addOrderFromWebhook(body);
      res.statusCode = 200;
      res.end(JSON.stringify({ success: true, ...result }));
      return;
    }

    if (pathname === '/api/woocommerce/sync' && method === 'POST') {
      crmStore.storeConfig.lastSyncTime = new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }) + ' IST';
      res.statusCode = 200;
      res.end(JSON.stringify({
        success: true,
        message: 'WooCommerce initial sync completed',
        customersCount: crmStore.customers.length,
        ordersCount: crmStore.orders.length,
        storeConfig: crmStore.storeConfig
      }));
      return;
    }

    if (pathname === '/api/woocommerce/writeback' && method === 'POST') {
      const result = crmStore.writeBackWooCommerce(body.couponCode, body.orderId, body.note);
      res.statusCode = 200;
      res.end(JSON.stringify(result));
      return;
    }

    if (pathname === '/api/agents/debate' && method === 'POST') {
      const result = crmStore.runAgentDebate(body.customerId, body);
      res.statusCode = 200;
      res.end(JSON.stringify(result));
      return;
    }

    if (pathname === '/api/simulations/run' && method === 'POST') {
      const result = crmStore.runTwinSimulation(body.customerId, body);
      res.statusCode = 200;
      res.end(JSON.stringify(result));
      return;
    }

    if (pathname === '/api/whatsapp/send' && method === 'POST') {
      const result = crmStore.sendWhatsAppMessage(body.customerId, body.message, body);
      res.statusCode = 200;
      res.end(JSON.stringify(result));
      return;
    }

    if (pathname === '/api/whatsapp/reply' && method === 'POST') {
      const result = crmStore.simulateCustomerReply(body.customerId, body.text);
      res.statusCode = 200;
      res.end(JSON.stringify(result));
      return;
    }

    if (pathname === '/api/reset-demo' && method === 'POST') {
      crmStore.reset();
      res.statusCode = 200;
      res.end(JSON.stringify({ success: true, message: 'Demo reset to initial pitch state.' }));
      return;
    }

    // Default 404 for unknown api routes
    res.statusCode = 404;
    res.end(JSON.stringify({ error: `Endpoint not found: ${pathname}` }));
  } catch (err) {
    console.error('API Error:', err);
    res.statusCode = 500;
    res.end(JSON.stringify({ error: err.message }));
  }
}
