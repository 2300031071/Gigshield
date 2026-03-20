# ⚡ GigShield — AI-Powered Parametric Income Insurance for Grocery Delivery Partners

> **Hackathon Phase 1 Submission** | Team: [Your Team Name] | Date: March 20, 2025

---

## 🎯 The Problem We're Solving

India's **Zepto and Blinkit delivery partners** are the backbone of the quick-commerce revolution — yet they are entirely exposed to income loss when external disruptions strike. A sudden rainstorm, an AQI spike, or a local curfew can wipe out 20–30% of their weekly earnings in hours.

**No health insurance. No accident cover. No income safety net.**

GigShield changes that.

---

## 💡 Our Solution

**GigShield** is an AI-enabled **parametric income insurance platform** built exclusively for Q-Commerce (Zepto/Blinkit) delivery partners. It automatically detects external disruptions via real-time APIs, triggers claims without manual intervention, and sends UPI payouts — all within minutes of a qualifying event.

> **Coverage scope**: INCOME LOSS ONLY. We do not cover vehicle repairs, health, life, or accident costs.

---

## 👤 Persona: Grocery/Q-Commerce Delivery Partner

**Name**: Ravi Kumar | **Platform**: Zepto / Blinkit | **City**: Bengaluru

### Why Q-Commerce specifically?
- Zepto/Blinkit promise 10-minute deliveries — meaning workers **cannot stop** even in bad weather
- Q-commerce riders operate in **dense urban micro-zones** with high flood/heat/pollution risk
- Average earnings: ₹3,000–5,000/week — a 25% income loss is catastrophic
- Riders have **no union protections** and no employer insurance

### Persona Scenarios

| Scenario | Disruption | Income Loss | GigShield Response |
|----------|-----------|-------------|-------------------|
| Ravi can't ride in Bengaluru's monsoon | Heavy rain >50mm/hr | ₹450–700 | Auto-trigger → ₹150/hr × hours offline |
| Delhi partner suffers AQI 350 | Pollution spike | ₹360–600 | AQI API detects → ₹120/hr payout |
| Hyderabad zone curfew after protests | Zone closure | ₹720–1440 | Govt alert API → ₹180/hr for blocked hours |
| Zepto app crashes during peak hours | Platform outage >30min | ₹260–390 | Status API monitors → ₹130/hr triggered |
| Pune heatwave 46°C | Extreme heat | ₹400–600 | Weather API → ₹100/hr for 4-6 hrs |

---

## 🔁 Application Workflow

```
[Partner Signup] → [AI Risk Profiling] → [Weekly Plan Activation]
       ↓
[Live Monitoring: Weather / AQI / Traffic / Platform APIs]
       ↓
[Disruption Detected] → [Parametric Trigger Fires]
       ↓
[Fraud Check: GPS + Activity + Anomaly Detection]
       ↓
[Auto Claim Approved] → [UPI Payout Sent] → [Dashboard Updated]
```

### User Flow (Step-by-Step)

1. **Onboarding** (3 min): Name, Partner ID, city, zone, platform, avg weekly earning
2. **AI Risk Assessment**: Score generated (0–100) based on zone flood history, city pollution levels, experience
3. **Plan Selection**: Choose Basic / Pro / Max weekly plan
4. **Coverage Activation**: Instant, aligns to Monday–Sunday work week
5. **Passive Monitoring**: APIs watch for disruptions 24/7 in the partner's zone
6. **Auto-Trigger or Manual Claim**: Partner gets notified; can accept or self-file
7. **Instant Payout**: UPI transfer in < 2 minutes

---

## 💰 Weekly Premium Model

### Why Weekly?
Gig workers are paid weekly by Zepto/Blinkit. Aligning insurance premiums to the same cycle removes friction — they pay from what they just earned, not from savings.

### Premium Tiers

| Plan | Weekly Premium | Max Weekly Payout | Best For |
|------|---------------|-------------------|----------|
| **Basic Shield** | ₹49/week | ₹800/week | New partners, low-risk zones |
| **Pro Shield** | ₹99/week | ₹1,500/week | Most partners (recommended) |
| **Max Shield** | ₹149/week | ₹2,500/week | High-risk cities (Mumbai, Delhi) |

### Dynamic Pricing Logic (AI-Driven)

The weekly premium is **not static**. Our ML model adjusts it based on:

```
Base Premium
  - Zone flood/waterlogging history score       → ±₹10-20
  - City-level AQI 30-day rolling average       → ±₹5-15
  - Partner's experience level (years active)   → ±₹5-10
  - Historical disruption frequency (zone)      → ±₹5-20
  - Season/month factor (monsoon = higher)      → ±₹10-25
  - Platform reliability score                  → ±₹5
```

**Example**: A Ravi in Andheri (Mumbai) during July monsoon pays ₹119/week on Pro Shield, while a partner in Whitefield (Bengaluru) in February pays ₹89/week for the same plan.

---

## ⚡ Parametric Triggers

Parametric insurance means **no subjective claims review** — triggers fire automatically when measurable thresholds are crossed.

| # | Trigger | Threshold | Payout Rate | Data Source |
|---|---------|-----------|-------------|-------------|
| 1 | Heavy Rain | Rainfall > 50mm/hr | ₹150/hr | OpenWeatherMap API |
| 2 | Flooding | IMD Red Alert issued for zone | ₹200/hr | IMD Flood API |
| 3 | Severe Pollution | AQI > 300 | ₹120/hr | CPCB AQI API |
| 4 | Extreme Heat | Temperature > 45°C | ₹100/hr | OpenWeatherMap API |
| 5 | Zone Curfew/Closure | Official curfew notice | ₹180/hr | Government Alert API |
| 6 | Platform Outage | App down > 30 minutes | ₹130/hr | Zepto/Blinkit Status API |

> All hours claimed are capped at the plan's weekly maximum payout.

---

## 🤖 AI/ML Integration Plan

### 1. Dynamic Premium Calculation
- **Model**: Gradient Boosted Tree (XGBoost/LightGBM)
- **Features**: Zone coordinates, historical weather, flood maps, partner profile, seasonality
- **Output**: Personalized weekly premium per partner
- **Training Data**: IMD historical data, CPCB AQI records, zone-level delivery density

### 2. AI Risk Profiling (Onboarding)
- Risk score (0–100) generated at signup
- Inputs: City, zone, platform, experience, avg earnings
- Determines recommended plan and special coverage inclusions

### 3. Fraud Detection (Phase 3)
- **GPS Spoofing Detection**: Compare claimed zone vs live GPS trace
- **Activity Anomaly**: Cross-check claimed hours offline vs platform order logs
- **Historical Pattern Analysis**: Flag partners with abnormal claim frequency
- **Duplicate Claim Prevention**: Hash-based deduplication per disruption event
- **Approach**: Isolation Forest + rule-based flagging

### 4. Predictive Disruption Alerts
- 72-hour forecast integration (IMD, OpenWeatherMap)
- Partners notified 24hrs before likely disruptions
- AI recommends optimal coverage hours for the week

---

## 🛠️ Tech Stack

### Frontend
- **React 18** + **Vite** — Fast, modern UI
- **Custom CSS** with Syne + DM Sans typography
- No external UI library — fully custom design system

### Backend (Planned — Phase 2)
- **Node.js + Express** REST API
- **PostgreSQL** — Partner profiles, policies, claims
- **Redis** — Real-time trigger state management
- **Python ML service** — Premium calculation, fraud scoring

### AI/ML
- **Scikit-learn / XGBoost** — Risk scoring and premium model
- **Isolation Forest** — Fraud anomaly detection
- **Prophet / LSTM** — Disruption forecasting

### Integrations
- **OpenWeatherMap API** — Temperature, rainfall (free tier)
- **CPCB AQI API** — Real-time pollution data (free)
- **IMD API / Mock** — Flood and extreme weather alerts
- **Razorpay Test Mode** — UPI payout simulation (Phase 3)
- **Zepto/Blinkit API Mock** — Partner activity validation

### Infrastructure
- **Vercel** — Frontend hosting
- **Railway / Render** — Backend hosting
- **GitHub Actions** — CI/CD pipeline

---

## 📁 Project Structure

```
gigshield/
├── src/
│   ├── components/
│   │   └── Nav.jsx              # Navigation bar
│   ├── pages/
│   │   ├── Landing.jsx          # Hero / marketing page
│   │   ├── Onboarding.jsx       # 4-step signup with AI risk score
│   │   ├── Dashboard.jsx        # Worker dashboard + live alerts
│   │   ├── Policy.jsx           # Plan management + triggers
│   │   └── Claims.jsx           # File / track claims
│   ├── App.jsx                  # Root component + routing
│   ├── main.jsx                 # Entry point
│   └── index.css                # Global design system
├── index.html
├── vite.config.js
├── package.json
└── README.md
```

---

## 🚀 How to Run

### Prerequisites
- Node.js 18+
- npm or yarn

### Setup

```bash
# Clone the repository
git clone https://github.com/[your-username]/gigshield.git
cd gigshield

# Install dependencies
npm install

# Start development server
npm run dev
```

Visit **http://localhost:5173** in your browser.

### Build for Production

```bash
npm run build
npm run preview
```

---

## 📺 Phase 1 Demo Video

🎥 **[Watch 2-minute walkthrough →](#)** *(Link to be added)*

The video demonstrates:
- Landing page and value proposition
- 4-step onboarding with AI risk scoring
- Worker dashboard with live disruption alerts
- Policy management and parametric triggers
- Claim filing and simulated UPI payout flow

---

## 🗓️ 6-Week Development Plan

| Phase | Weeks | Focus | Deliverables |
|-------|-------|-------|-------------|
| **Phase 1** | 1–2 | Ideation & Foundation | README, prototype frontend, workflow design |
| **Phase 2** | 3–4 | Automation & Protection | Registration, policy management, dynamic pricing, claim management |
| **Phase 3** | 5–6 | Scale & Optimise | Fraud detection, instant payouts, admin dashboard, final pitch |

### Phase 2 Priorities
- [ ] Backend API (Node.js + PostgreSQL)
- [ ] Real OpenWeatherMap + CPCB AQI integration
- [ ] ML premium pricing model (Python service)
- [ ] Claim auto-trigger logic
- [ ] Razorpay sandbox payout integration

### Phase 3 Priorities
- [ ] GPS spoofing fraud detection
- [ ] Admin dashboard (loss ratios, predictive analytics)
- [ ] Production-ready UPI payout flow
- [ ] Final pitch deck + 5-minute demo video

---

## 🔒 Exclusions (By Design)

GigShield explicitly **does NOT** cover:
- ❌ Vehicle repairs or damage
- ❌ Medical or health expenses
- ❌ Life or personal accident insurance
- ❌ Pre-existing liabilities
- ❌ Personal financial decisions

---

## 👥 Team

| Name | Role |
|------|------|
| [Member 1] | Product & Frontend |
| [Member 2] | Backend & APIs |
| [Member 3] | ML & Data |
| [Member 4] | Business & Design |

---

## 📜 License

MIT License — Open source for educational/hackathon purposes.

---

*Built with ❤️ for India's gig workers. Phase 1 submission — GigShield, March 2025.*
