# 🌸 SAKHI (सखी) — Sisterhood, Holistic Health & SOS Safety Sanctuary

<div align="center">
  <img src="frontend/public/assets/sakhi_logo_official.png" alt="Sakhi Official Brand Logo" width="460" />
  
  <p><strong><em>"Your journey. Your strength. Your space."</em></strong></p>
</div>

Sakhi is a comprehensive, visionOS-grade women's empowerment platform designed to support women through every cycle of life. Blending **cutting-edge 3D WebGL botanical graphics**, **Apple VisionOS translucent liquid glass aesthetics**, **real-time GPS safety dispatching**, and **AI-guided empathetic mental wellness**, Sakhi is the digital sister who always has your back.

---

## 🌟 Key Features

### 1. 👭 4-Girls Sisterhood Landing Page & Animated Doodles
- **Hero Artwork (`grpupgirls.png`)**: Celebrating women of diverse backgrounds standing united in sisterhood.
- **Interactive Doodles**:
  - 🩸 `periodsdoodle.png`: Menstrual cycle & hormonal harmony tracking.
  - 🤖 `robotdoodle.png`: 24/7 Sakhi AI companion.
  - 🏃‍♀️ `fitnessdoodle.png`: Cycle-synced fitness & workout recommendations.
  - 🩺 `medicaldoodle.png`: Symptom log & tele-consultation preparation.
- **7 Core Pillars Showcase**: Direct navigation to every sanctuary pillar.
- **Slay Queen Affirmation Changer (`SlayChanger.jsx`)**: Instant daily empowerment mantras.
- **CODE WIZZ Creator Showcase**: Crafted with passion by the CODE WIZZ team (`codewizz_logo.jpeg`).

### 2. 🦋 3-Stage Mood Journey ("Flapping Window")
- **3D Interactive Onboarding Experience (`OnboardingFlip.jsx`)**:
  1. 😔 **Before Sakhi (`girl-sad.png`)**: Carrying health worries, safety fears, and unanswered questions alone.
  2. 🌿 **Meet Sakhi (`girl-curious.png`)**: Discovering holistic cycle sync, 1-tap SOS, Indian legal rights, and Dr. Maya therapy.
  3. ✨ **With Sakhi (`girl-happy.png`)**: Stepping into confidence, safety, and radiant peace of mind.

### 3. 🌸 Realistic 3D Botanical Lotus & Rings Sanctuary Portal
- **3D Botanical Lotus Model (`SakhiCanvas.tsx`)**:
  - Sculpted tiered petals, golden pistils, morning dew droplet highlights, and double orbital rings.
  - Camera choreography that gracefully preserves space on the right for translucent login interactions.
- **Multi-Mode Authentication**:
  - 🔑 **Email & Password**: Secure session validation with demo credentials.
  - 📲 **Phone OTP Verification**: Full OTP flow with Indian `+91` prefix, 60s countdown timer, resend button, and 1-click **Auto-Fill Demo OTP [7860]**.
  - ✨ **1-Click Guest Access**: Instant exploration with zero friction.
- **Web Audio API Synthesizer**: Gentle melodic chimes and soothing audio feedback with a sound mute/unmute toggle.

### 4. 🎨 5 Mood Sanctuary Themes (Full Interface Transformation)
Selecting any theme completely alters the **photographic sanctuary backdrop**, **ambient lighting**, and **liquid glass reflections**:
1. 🌸 **Soft & Sophisticated** (Rose & Mauve) — Emotional balance & gentle calm.
2. 🍑 **Warm & Earthy** (Peach & Terracotta) — Grounding energy & natural warmth.
3. 🌿 **Calm & Natural** (Sage & Forest) — Hormonal harmony & deep breath.
4. 💜 **Modern & Dreamy** (Lavender & Violet) — Deep introspection & mindfulness.
5. ☀️ **Bold & Sunlit** (Butter & Gold) — High energy, follicular radiance & optimism.

### 5. 🛡️ 8 Core Sanctuary Pillars
1. 🩸 **Period & Ovulation Tracker**: 4-phase hormonal cycle breakdown (Menstrual, Follicular, Ovulatory, Luteal), fertile window forecasts, symptom logging, and cycle-synced nutrition advice.
2. 🚨 **Emergency SOS & Live GPS**: 1-tap emergency trigger, live geolocation pin generation, auto-dialing 112/1091, and instant WhatsApp SOS alerts with coordinates to emergency contacts.
3. 📚 **Resource Hub**: Curated wellness guides, reproductive health articles, and myth busters.
4. ⚖️ **Your Law Book**: Clear, accessible breakdown of Indian constitutional protections and criminal laws for women (Domestic Violence Act, POSH Act 2013, Maternity Benefit Act, Dowry Prohibition Act, Cyber Harassment laws).
5. 🎁 **Women's Welfare Schemes**: Verified Indian central & state welfare programs (Beti Bachao Beti Padhao, Sukanya Samriddhi Yojana, Pradhan Mantri Matru Vandana Yojana) with eligibility criteria and application guides.
6. 🌿 **Dr. Maya — Counseling Therapist**: AI therapist fine-tuned for soothing somatic grounding, emotional validation, burnout recovery, and confidential emotional support.
7. 🧘 **Fitness & Mindfulness Journal**: Cycle-tailored yoga, strength routines, hydration goals, and mindful reflections.
8. 📋 **My Day Planner**: Daily prioritization, mood tracking, water intake, and habit streaks.

---

## 🏗️ Repository Architecture

The project is structured cleanly as a monorepo workspace separating **Frontend** and **Backend**:

```
sakhi/
├── frontend/                     # React 18 + Vite + Three.js / R3F Application
│   ├── public/                   # Static assets, photographic backdrops, and doodles
│   │   ├── assets/               # 4-girls artwork, mood girls, doodles, and 5 sanctuary wallpapers
│   │   └── ...
│   ├── src/
│   │   ├── components/           # UI components, modals, tabs, and layout
│   │   │   ├── 3d/               # 3D LoginCard, OTP verification & synthesizer
│   │   │   ├── tabs/             # 8 Functional tabs (Period, SOS, Law, Therapist, etc.)
│   │   │   ├── LandingPage.jsx   # 4-girls artwork landing page & SlayChanger
│   │   │   ├── OnboardingFlip.jsx# 3-Stage Mood Journey flapping window
│   │   │   ├── Navbar.jsx        # Translucent liquid glass navigation bar
│   │   │   └── ThemeSelector.jsx # Sanctuary theme switcher
│   │   ├── scene/                # Three.js Botanical Lotus & Orbital Rings
│   │   ├── context/              # ThemeContext & CSS Variable state
│   │   ├── services/             # Auth service & OTP verification logic
│   │   ├── utils/                # Auth validation, mathematical transforms & test suites
│   │   ├── App.tsx               # Root unified multi-stage application router
│   │   └── main.tsx              # Application entrypoint
│   ├── index.html                # HTML template with Google Fonts
│   ├── vite.config.ts            # Vite configuration & dev server options
│   └── package.json              # Frontend dependencies & scripts
│
├── backend/                      # Express & Google Gemini AI API Service
│   ├── server.js                 # Express server with /api/therapist & /api/companion
│   ├── server.ts                 # TypeScript alternative server implementation
│   ├── api/                      # Serverless handler functions (Vercel/Netlify ready)
│   ├── .env.example              # Environment variables template
│   ├── package.json              # Backend dependencies
│   └── README.md                 # Backend documentation
│
├── vercel.json                   # Vercel deployment configuration
├── package.json                  # Root orchestration package.json
└── README.md                     # Monorepo documentation
```

---

## 🚀 Getting Started

### Prerequisites
- **Node.js**: v18.0.0 or higher
- **npm** or **bun**

### 1. Clone the Repository
```bash
git clone https://github.com/Asimhussain786786/Sakhi.git
cd Sakhi
```

### 2. Install Dependencies
```bash
# Install frontend dependencies
npm --prefix frontend install

# Install backend dependencies
npm --prefix backend install
```

### 3. Run Development Server

To launch the frontend Vite application (port `3000`):
```bash
npm run dev
```

To run the Express AI backend (port `3001`):
```bash
npm run server
```

Open your browser at:
```
http://localhost:3000
```

---

## 🧪 Testing & Verification

Sakhi includes unit tests covering authentication logic, mathematical transforms, quality budgets, and camera transitions:

```bash
npm run test
```

To verify production bundle build:
```bash
npm run build
```

---

## 🌐 Deployment

### Vercel
The workspace is pre-configured with `vercel.json`:
1. Connect your GitHub repository to [Vercel](https://vercel.com).
2. Set Build Command to: `npm run build`
3. Set Output Directory to: `frontend/dist`
4. Set Environment Variables (`GEMINI_API_KEY` for backend AI features).
5. Deploy!

---

## 💖 Sisterhood & Credits

Crafted with dedication by **CODE WIZZ** (`codewizz_logo.jpeg`).  
Sakhi is dedicated to every woman navigating health, safety, and self-love. 🌸
