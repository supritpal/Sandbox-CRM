// server/data.js - Seed data and state manager for Sandbox CRM

export const initialCustomers = [
  {
    id: 'cust-101',
    name: 'Aarav Sharma',
    phone: '+91 98201 44521',
    email: 'aarav.sharma@example.in',
    city: 'Pune',
    state: 'Maharashtra',
    pincode: '411014',
    language: 'Hindi', // supports Hindi, Marathi, English
    segment: 'At-Risk', // VIP, Regular, New, At-Risk, Lapsed
    rfm: {
      recency: 1, // 1-5 (1 = longest ago)
      frequency: 4,
      monetary: 4,
      score: '144'
    },
    ltv: 18450, // in INR
    orderCount: 4,
    avgOrderValue: 4612,
    lastOrderDate: '62 days ago',
    lastOrderDateIso: '2026-08-12T10:30:00Z',
    healthScore: 34, // 0-100 (Declining)
    codRiskScore: 72, // 0-100 (High COD/RTO risk)
    codRiskFactors: [
      'Failed delivery attempt recorded in past order history',
      'High order value (> ₹3,000) requested as COD',
      'Inactive for > 60 days'
    ],
    tags: ['High AOV', 'Skincare Enthusiast', 'COD User', 'Festive Buyer'],
    digitalTwin: {
      priceSensitivity: 'Moderate-High',
      discountAffinity: 0.85, // 85% likely to convert if given 10%+ discount
      urgencyResponse: 0.78, // High response to stock restock warnings
      valueLoyalty: 0.55,
      preferredSendTime: '19:30 IST (Evening after commute)',
      preferredLanguage: 'Hindi',
      personaSummary: 'Aarav is a 29-year-old tech professional in Pune. He buys premium grooming supplies every 45-50 days. He has not ordered in 62 days because he ran out and began browsing competing D2C brands. He is value-conscious: an exclusive 10% coupon combined with localized Hindi WhatsApp tone creates high conversion intent.',
    },
    communicationHistory: [
      {
        id: 'comm-1',
        type: 'WhatsApp',
        direction: 'outbound',
        timestamp: '62 days ago',
        content: 'Order #WC-8421 confirmed! Your Grooming Kit is being packed.',
        status: 'delivered'
      }
    ],
    guardrailsStatus: {
      canMessageToday: true,
      lastMessagedDate: '62 days ago',
      weeklyMessageCount: 0,
      dndActive: false,
    },
    recoveryStatus: 'Pending Action' // Pending Action, Debating, Simulated, Sent, Recovered
  },
  {
    id: 'cust-102',
    name: 'Priya Patel',
    phone: '+91 98334 11290',
    email: 'priya.patel@example.in',
    city: 'Mumbai',
    state: 'Maharashtra',
    pincode: '400050',
    language: 'Marathi',
    segment: 'VIP',
    rfm: {
      recency: 5,
      frequency: 5,
      monetary: 5,
      score: '555'
    },
    ltv: 32800,
    orderCount: 8,
    avgOrderValue: 4100,
    lastOrderDate: '12 days ago',
    lastOrderDateIso: '2026-10-01T15:20:00Z',
    healthScore: 94,
    codRiskScore: 12, // Very low
    codRiskFactors: ['Prepaid credit card user', '100% delivery success rate'],
    tags: ['VIP Elite', 'Prepaid Loyalist', 'Serum Addict', 'Bandra West'],
    digitalTwin: {
      priceSensitivity: 'Low',
      discountAffinity: 0.40,
      urgencyResponse: 0.65,
      valueLoyalty: 0.95,
      preferredSendTime: '14:00 IST',
      preferredLanguage: 'Marathi',
      personaSummary: 'Priya loves premium formulations and early VIP access over aggressive price cuts. Responds best to respectful Marathi VIP tone.',
    },
    communicationHistory: [
      {
        id: 'comm-2',
        type: 'WhatsApp',
        direction: 'outbound',
        timestamp: '12 days ago',
        content: 'Hi Priya! Your VIP order #WC-9102 has been delivered. Enjoy your glow ✨',
        status: 'read'
      }
    ],
    guardrailsStatus: {
      canMessageToday: true,
      lastMessagedDate: '12 days ago',
      weeklyMessageCount: 0,
      dndActive: false,
    },
    recoveryStatus: 'Healthy'
  },
  {
    id: 'cust-103',
    name: 'Vikramaditya Rao',
    phone: '+91 97410 88231',
    email: 'vikram.rao@example.in',
    city: 'Bengaluru',
    state: 'Karnataka',
    pincode: '560038',
    language: 'English',
    segment: 'Regular',
    rfm: {
      recency: 4,
      frequency: 3,
      monetary: 3,
      score: '433'
    },
    ltv: 8200,
    orderCount: 2,
    avgOrderValue: 4100,
    lastOrderDate: '25 days ago',
    lastOrderDateIso: '2026-09-18T18:00:00Z',
    healthScore: 78,
    codRiskScore: 28,
    codRiskFactors: ['Prepaid UPI buyer', 'Urban tech hub pincode'],
    tags: ['UPI User', 'Indiranagar', 'Moisturizer Reorder'],
    digitalTwin: {
      priceSensitivity: 'Moderate',
      discountAffinity: 0.60,
      urgencyResponse: 0.50,
      valueLoyalty: 0.70,
      preferredSendTime: '20:00 IST',
      preferredLanguage: 'English',
      personaSummary: 'Vikram appreciates straightforward English updates and frictionless one-tap reorders via UPI.',
    },
    communicationHistory: [],
    guardrailsStatus: {
      canMessageToday: true,
      lastMessagedDate: '25 days ago',
      weeklyMessageCount: 0,
      dndActive: false,
    },
    recoveryStatus: 'Healthy'
  },
  {
    id: 'cust-104',
    name: 'Neha Deshmukh',
    phone: '+91 94220 55719',
    email: 'neha.deshmukh@example.in',
    city: 'Nagpur',
    state: 'Maharashtra',
    pincode: '440010',
    language: 'Marathi',
    segment: 'Lapsed',
    rfm: {
      recency: 1,
      frequency: 2,
      monetary: 2,
      score: '122'
    },
    ltv: 12600,
    orderCount: 3,
    avgOrderValue: 4200,
    lastOrderDate: '140 days ago',
    lastOrderDateIso: '2026-05-26T11:45:00Z',
    healthScore: 21,
    codRiskScore: 68,
    codRiskFactors: ['Inactive for > 120 days', 'Previous COD cancellation'],
    tags: ['Haircare Set', 'Tier-2 Shopper', 'Dormant'],
    digitalTwin: {
      priceSensitivity: 'High',
      discountAffinity: 0.90,
      urgencyResponse: 0.70,
      valueLoyalty: 0.35,
      preferredSendTime: '16:00 IST',
      preferredLanguage: 'Marathi',
      personaSummary: 'Neha is dormant. High price sensitivity requires a strong hook and free shipping guarantee to win back.',
    },
    communicationHistory: [],
    guardrailsStatus: {
      canMessageToday: true,
      lastMessagedDate: '140 days ago',
      weeklyMessageCount: 0,
      dndActive: false,
    },
    recoveryStatus: 'Pending Action'
  },
  {
    id: 'cust-105',
    name: 'Rohan Verma',
    phone: '+91 98110 33492',
    email: 'rohan.verma@example.in',
    city: 'New Delhi',
    state: 'Delhi',
    pincode: '110016',
    language: 'Hindi',
    segment: 'New',
    rfm: {
      recency: 5,
      frequency: 1,
      monetary: 2,
      score: '512'
    },
    ltv: 2499,
    orderCount: 1,
    avgOrderValue: 2499,
    lastOrderDate: '4 days ago',
    lastOrderDateIso: '2026-10-09T14:10:00Z',
    healthScore: 85,
    codRiskScore: 45,
    codRiskFactors: ['First time customer', 'COD requested'],
    tags: ['First Time Buyer', 'South Delhi', 'Beard Care'],
    digitalTwin: {
      priceSensitivity: 'Moderate',
      discountAffinity: 0.65,
      urgencyResponse: 0.60,
      valueLoyalty: 0.50,
      preferredSendTime: '18:00 IST',
      preferredLanguage: 'Hindi',
      personaSummary: 'New customer evaluating brand trust. Responds well to onboarding order status and tracking transparency.',
    },
    communicationHistory: [],
    guardrailsStatus: {
      canMessageToday: true,
      lastMessagedDate: '4 days ago',
      weeklyMessageCount: 0,
      dndActive: false,
    },
    recoveryStatus: 'Healthy'
  }
];

export const initialOrders = [
  {
    id: 'WC-9430',
    customerId: 'cust-103',
    customerName: 'Vikramaditya Rao',
    city: 'Bengaluru',
    total: 3150,
    status: 'processing', // processing, shipped, delivered, delayed
    paymentMethod: 'UPI (Prepaid)',
    date: '3 days ago',
    dateIso: '2026-10-10T11:20:00Z',
    items: [
      { name: 'Ultra-Hydrating Night Serum (50ml)', qty: 1, price: 1850, marginPercent: 32 },
      { name: 'Daily Barrier Defense Cream', qty: 1, price: 1300, marginPercent: 30 }
    ],
    isDelayed: false,
    notes: ['[WooCommerce] Order created via Storefront', '[Payment] Razorpay UPI Txn #RZP_991823 confirmed']
  },
  {
    id: 'WC-9431',
    customerId: 'cust-105',
    customerName: 'Rohan Verma',
    city: 'New Delhi',
    total: 2499,
    status: 'shipped',
    paymentMethod: 'Cash on Delivery (COD)',
    trackingNumber: 'BD892019409IN',
    carrier: 'BlueDart Express',
    date: '4 days ago',
    dateIso: '2026-10-09T14:10:00Z',
    items: [
      { name: 'Organic Cedarwood Beard Growth Oil', qty: 1, price: 1499, marginPercent: 35 },
      { name: 'Sandalwood Charcoal Cleanser', qty: 1, price: 1000, marginPercent: 28 }
    ],
    isDelayed: false,
    notes: ['[WooCommerce] Dispatched via BlueDart AWB BD892019409IN']
  },
  {
    id: 'WC-9432',
    customerId: 'cust-101',
    customerName: 'Aarav Sharma',
    city: 'Pune',
    total: 3850,
    status: 'shipped',
    paymentMethod: 'Cash on Delivery (COD)',
    trackingNumber: 'DTDC7738192',
    carrier: 'DTDC Logistics',
    date: '5 days ago',
    dateIso: '2026-10-08T09:15:00Z',
    items: [
      { name: 'Complete Anti-Pollution Men\'s Kit', qty: 1, price: 3850, marginPercent: 28 }
    ],
    isDelayed: true,
    delayHours: 54,
    delayReason: 'Bhiwandi Hub sorting bottleneck (> 48h in transit)',
    notes: [
      '[Courier Alert] Package held at DTDC Bhiwandi Hub due to regional congestion',
      '[Sandbox CRM AI] Delayed-order flag raised automatically (+54h threshold exceeded)'
    ]
  },
  {
    id: 'WC-9102',
    customerId: 'cust-102',
    customerName: 'Priya Patel',
    city: 'Mumbai',
    total: 4400,
    status: 'delivered',
    paymentMethod: 'HDFC Credit Card (Prepaid)',
    date: '12 days ago',
    dateIso: '2026-10-01T15:20:00Z',
    items: [
      { name: '24K Gold Peptide Radiance Elixir', qty: 2, price: 2200, marginPercent: 38 }
    ],
    isDelayed: false,
    notes: ['[WooCommerce] Successfully delivered at Bandra West']
  },
  {
    id: 'WC-8421',
    customerId: 'cust-101',
    customerName: 'Aarav Sharma',
    city: 'Pune',
    total: 4612,
    status: 'delivered',
    paymentMethod: 'Cash on Delivery (COD)',
    date: '62 days ago',
    dateIso: '2026-08-12T10:30:00Z',
    items: [
      { name: 'Vitamin C 20% Booster & Brightening Cleanser', qty: 1, price: 2800, marginPercent: 30 },
      { name: 'Ceramide Daily Moisturizer', qty: 1, price: 1812, marginPercent: 28 }
    ],
    isDelayed: false,
    notes: ['[WooCommerce] Delivered. Customer accepted COD.']
  }
];

export const initialDebateHistory = [
  {
    id: 'debate-101',
    customerId: 'cust-101',
    customerName: 'Aarav Sharma',
    timestamp: 'Just now',
    status: 'Consensus Reached',
    proposedOffer: '10% OFF + Free Express Delivery',
    couponCode: 'WINBACK10-AARAV',
    steps: [
      {
        agent: 'Retention Agent',
        avatar: '🎯',
        role: 'Customer Lifetime Value Maximizer',
        argument: 'Aarav has been dormant for 62 days. His average reorder interval is 46 days. Skincare replenishment cycle is broken. He has ₹18,450 past spend. I propose an aggressive 25% discount code (WINBACK25) to trigger immediate reorder before we lose him forever to Nykaa Man.',
        sentiment: 'Aggressive Win-Back',
        offerProposal: '25% Flat Discount'
      },
      {
        agent: 'Margin Guard Agent',
        avatar: '🛡️',
        role: 'Gross Margin & Profitability Sentry',
        argument: 'VETO! 🛑 25% discount is unacceptable. The Men\'s Skincare Kit has a gross margin of 28.5%. A 25% discount leaves only 3.5% margin (₹134). Factoring Pune courier shipping (₹85), our net contribution drops to negative -₹28! I veto 25%. My counter-offer is a maximum of 10% discount, coupled with Free Express Shipping (which costs us only ₹45 corporate rate). This protects an 18.2% healthy margin (₹700 net profit).',
        sentiment: 'Veto & Counter-Offer',
        offerProposal: '10% OFF + Free Express Shipping',
        veto: true
      },
      {
        agent: 'Retention Agent',
        avatar: '🎯',
        role: 'Customer Lifetime Value Maximizer',
        argument: 'Counter-offer accepted. 10% off + Free Shipping delivers ₹430 perceived savings to Aarav while keeping us profitable. Proceeding with 10% + Free Shipping.',
        sentiment: 'Consensus Accepted',
        consensus: true
      },
      {
        agent: 'Messenger Agent',
        avatar: '✍️',
        role: 'Multilingual Persuasion Specialist',
        argument: 'Synthesizing agreement for Aarav. Preferred language is Hindi. Tone: Friendly, respectful, urgent replenishment hook. Crafting 3 variants for Digital Twin testing.',
        sentiment: 'Drafting Copy',
        readyForTwin: true
      }
    ]
  }
];

export const initialSimulations = [
  {
    id: 'sim-101',
    customerId: 'cust-101',
    customerName: 'Aarav Sharma',
    twinPersona: 'Price-Sensitive Grooming Enthusiast (Pune)',
    evaluatedRuns: 100,
    winnerVariantId: 'variant-B',
    variants: [
      {
        id: 'variant-A',
        name: 'Variant A: Direct Discount',
        language: 'Hindi',
        copy: 'नमस्ते आरव जी! 🙏 आपकी पसंदीदा स्किनकेयर किट ख़त्म हो गई है? आपके लिए विशेष 10% छूट + मुफ़्त शिपिंग कूपन: WINBACK10-AARAV. अभी ऑर्डर करें: https://store.in/c/8421',
        metrics: {
          predictedOpenRate: 88,
          predictedClickRate: 42,
          predictedConversion: 58,
          expectedRevenue: 2233
        },
        twinCritique: 'Good direct value, but lacks urgency. Twin Aarav tends to postpone action when no urgency is stated.'
      },
      {
        id: 'variant-B',
        name: 'Variant B: Urgency & Restock Alert (WINNER)',
        language: 'Hindi',
        copy: 'नमस्ते आरव जी! 🙏 आपके पिछले ऑर्डर की स्किनकेयर किट के पुणे वेयरहाउस में केवल 4 पैक बचे हैं! विशेष 10% छूट + मुफ़्त एक्सप्रेस डिलीवरी पाने के लिए कूपन WINBACK10 उपयोग करें। आज रात 9 बजे तक वैध: https://store.in/c/8421',
        metrics: {
          predictedOpenRate: 94,
          predictedClickRate: 68,
          predictedConversion: 76,
          expectedRevenue: 2926
        },
        twinCritique: 'Highest conversion score! Twin Aarav responds strongly to localized Pune warehouse restock scarcity and same-day cut-off.',
        isWinner: true
      },
      {
        id: 'variant-C',
        name: 'Variant C: VIP Relationship / Emotional Hook',
        language: 'Hindi',
        copy: 'नमस्ते आरव भाई! ✨ हमें आपकी याद आ रही है। आपकी त्वचा का ख़ास ख़्याल रखने के लिए हम लाए हैं एक ख़ास तोहफ़ा — 10% छूट और मुफ़्त डिलीवरी। कूपन: WINBACK10. https://store.in/c/8421',
        metrics: {
          predictedOpenRate: 84,
          predictedClickRate: 36,
          predictedConversion: 44,
          expectedRevenue: 1694
        },
        twinCritique: 'Too informal. Twin Aarav is a busy professional who values transactional clarity and speed over emotional branding.'
      }
    ]
  }
];

export const initialStats = {
  totalRevenue: 248650, // in INR
  repeatPurchaseRate: 38.4, // percentage
  activeCustomers: 142,
  avgOrderValue: 3680,
  atRiskRevenueAtStake: 64200,
  recoveredRevenue: 34850, // AI attribution
  recoveredCustomersCount: 9,
  roiMultiplier: 14.8, // 14.8x ROI
  costOfDiscountsGiven: 2350,
  twinPredictionAccuracy: 89.2,
  segmentBreakdown: [
    { name: 'VIP', count: 28, share: 19.7, color: '#10B981' },
    { name: 'Regular', count: 54, share: 38.0, color: '#6366F1' },
    { name: 'New', count: 32, share: 22.5, color: '#38BDF8' },
    { name: 'At-Risk', count: 18, share: 12.7, color: '#F59E0B' },
    { name: 'Lapsed', count: 10, share: 7.1, color: '#EF4444' }
  ],
  codRiskDistribution: [
    { level: 'Low (0-30)', count: 82, share: 57.7 },
    { level: 'Medium (31-60)', count: 41, share: 28.9 },
    { level: 'High (61-85)', count: 15, share: 10.6 },
    { level: 'Critical (>85)', count: 4, share: 2.8 }
  ]
};

export const initialGuardrails = {
  maxDiscountCapPercent: 15, // Caps discounts at 15%
  maxMessagesPerWeekPerCustomer: 1, // 1 message/week
  dndStartHourIst: 21, // 9:00 PM IST
  dndEndHourIst: 9, // 9:00 AM IST
  humanApprovalRequired: true, // Human-in-the-loop toggle
  autoApproveLowRisk: false,
};
