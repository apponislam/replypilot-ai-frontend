# ReplyPilot AI 🚀
### AI-Powered Customer Email Reply & Autonomous Auto-Pilot Platform

[![Next.js](https://img.shields.io/badge/Next.js-16.4.2-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.3.0-61DAFB?style=for-the-badge&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![Redux Toolkit](https://img.shields.io/badge/Redux_Toolkit-RTK_Query-764ABC?style=for-the-badge&logo=redux)](https://redux-toolkit.js.org/)
[![Ollama](https://img.shields.io/badge/Ollama-Open--Source_LLM-black?style=for-the-badge&logo=ollama)](https://ollama.com/)
[![Cloudflare Tunnel](https://img.shields.io/badge/Cloudflare_Tunnel-cloudflared-F38020?style=for-the-badge&logo=cloudflare)](https://developers.cloudflare.com/cloudflare-one/connections/connect-networks/)

ReplyPilot AI is a state-of-the-art customer support and email automation platform designed to turn incoming support inquiries into intelligent, context-aware email response drafts. With role-based workflows for both administrators and regular support staff, ReplyPilot enables teams to either manually inspect and refine AI drafts or enable autonomous auto-pilot mode for hands-free email dispatch.

---

## 🌐 Live URLs & Endpoints

| Service | Environment | URL |
| :--- | :--- | :--- |
| **Frontend Web App** | Production | [https://replypilot.apponislam.top](https://replypilot.apponislam.top) |
| **Backend REST API** | Production | [https://replypilotapi.apponislam.top](https://replypilotapi.apponislam.top) |
| **AI Inference Engine** | Self-Hosted Tunnel | **Ollama Open-Source LLM** connected via **Cloudflare Tunnel (`cloudflared`)** |

---

## 🧠 Open-Source Ollama & Cloudflare Tunnel Architecture

Unlike typical AI wrappers that rely on expensive proprietary third-party APIs (such as OpenAI or Anthropic), **ReplyPilot AI runs on an open-source Ollama model self-hosted locally and bridged via Cloudflare Tunnel**:

```
 ┌──────────────────────┐        REST API         ┌──────────────────────┐
 │   Next.js Frontend   │ ──────────────────────> │  Node/Express API    │
 │ (replypilot.appon...)│                         │(replypilotapi.appon) │
 └──────────────────────┘                         └──────────┬───────────┘
                                                             │
                                          Secure Cloudflare  │
                                            Tunnel Stream    ▼
                                                  ┌──────────────────────┐
                                                  │  Cloudflare Tunnel   │
                                                  │     (cloudflared)    │
                                                  └──────────┬───────────┘
                                                             │
                                                  Local Port │
                                                  Forwarding ▼
                                                  ┌──────────────────────┐
                                                  │     Ollama LLM       │
                                                  │ (Self-Hosted Model)  │
                                                  └──────────────────────┘
```

### Why this architecture?
1. **Complete Data Privacy**: Customer emails and draft replies remain strictly on your infrastructure and never train external corporate models.
2. **Zero Per-Token Cloud Costs**: Run high-performance open-source models with no usage quotas or surprise monthly API billing.
3. **No Open Ports or Static Public IP Needed**: `cloudflared` establishes outbound-only tunnels directly to Cloudflare's global edge network, eliminating the risk of exposing local server ports to the public internet.

---

## ✨ Key Features

### 👥 Role-Based Workflows
- **Admin Workspace (`ADMIN`)**:
  - Global overview dashboard with inquiry volume, auto-reply rate, and average response latency stats.
  - Full inbound email inbox with customer message histories and raw email headers.
  - System-wide **Autonomous Auto-Pilot Mode** switch: automatically drafts and dispatches replies without human review.
- **Support Team Workspace (`USER`)**:
  - Dedicated **AI Queue (`/dashboard/replies`)** for reviewing, regenerating, and manually dispatching AI drafts.
  - On-demand AI draft generator for ad-hoc customer emails with real-time tone adjustment.
  - Personal tone, custom guideline rules, and sender identity management.

### 🎯 Dynamic Tone & Personality Engine
Customize generated email drafts with 5 distinct communication styles:
- **Professional**: Formal, structured, and authoritative (ideal for B2B).
- **Friendly & Warm**: Approachable, polite, and empathetic (great for consumer SaaS).
- **Concise & Direct**: Brief, laser-focused solutions without filler.
- **Executive Formal**: Diplomatic phrasing tailored for VIP and enterprise accounts.
- **Casual**: Modern, conversational, and relaxed style.

### 🛡️ Authentication & Verification Security
- Complete JWT authentication with automatic token refresh (`baseQueryWithReauth`).
- 6-digit OTP verification for account activation and password resets.
- One-click email verification via secure cryptographic magic links.
- Smart navbar alert banner with resend cooldown counters.

---

## 🛠️ Technology Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router & Server Components)
- **Library**: [React 19](https://react.dev/)
- **State Management & Caching**: [Redux Toolkit](https://redux-toolkit.js.org/) & **RTK Query**
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Validation**: [Zod](https://zod.dev/) & [React Hook Form](https://react-hook-form.com/)
- **UI Components**: Accessible primitives built on Shadcn / Base UI
- **Typography**: Google Montserrat font family
- **AI Backend**: Self-hosted **Ollama** exposed via **Cloudflare Tunnel (`cloudflared`)**

---

## 💻 Local Development Setup

Follow these steps to run the frontend application locally:

### 1. Prerequisites
- **Node.js**: v18.18+ or v20+ recommended
- **npm** or **pnpm** / **yarn**
- **Git**
- Optional: Local [Ollama](https://ollama.com/) instance and [Cloudflare Tunnel](https://developers.cloudflare.com/cloudflare-one/connections/connect-networks/) if self-hosting the backend AI pipeline locally.

### 2. Clone the Repository
```bash
git clone https://github.com/apponislam/replypilot-ai-frontend.git
cd replypilot-ai-frontend
```

### 3. Install Dependencies
```bash
npm install
```

### 4. Configure Environment Variables
Create a `.env.local` file in the root directory:
```bash
cp .env.example .env.local
```

Populate `.env.local` with your backend and client URLs:
```env
# Point to your local or deployed backend API
NEXT_PUBLIC_BASE_API=https://replypilotapi.apponislam.top
# For local backend testing, use:
# NEXT_PUBLIC_BASE_API=http://localhost:5057

# Frontend Client URL
NEXT_PUBLIC_CLIENT_URL=http://localhost:3000
```

### 5. Start the Development Server
```bash
npm run dev
```

Open your browser and navigate to:
```
http://localhost:3000
```

---

## 📂 Project Structure

```
replypilot-ai-frontend/
├── app/
│   ├── (auth)/                  # Auth route group (login, register, verify-otp, forgot-password)
│   ├── (dashboard)/             # Role-protected dashboard routes
│   │   └── dashboard/
│   │       ├── emails/          # Inbound email explorer (Admin)
│   │       ├── replies/         # AI draft reply approval queue (User & Admin)
│   │       ├── settings/        # Tone, instructions & sender identity settings
│   │       ├── layout.tsx       # Persistent sidebar, sticky navbar & verification banner
│   │       └── page.tsx         # Admin analytics dashboard
│   ├── (root)/                  # Marketing landing pages, terms & privacy
│   ├── layout.tsx               # Root HTML shell & Redux Provider wrapper
│   └── globals.css              # Global styles & design tokens
├── components/
│   ├── dashboard/               # Header, breadcrumbs, stat cards, alerts
│   ├── forms/                   # Login, register, OTP verification forms
│   └── ui/                      # Button, input, badge, dialog, sidebar primitives
├── hooks/                       # Custom hooks (useMounted, useSidebar, etc.)
├── providers/                   # Redux Provider & ProtectedRouteProvider guards
├── public/                      # Multi-resolution SVG/PNG icons, favicon & manifest
├── redux/
│   ├── api/baseApi.ts           # RTK Query base configuration & auto token re-auth
│   ├── features/                # Auth, dashboard, emails, replies & settings slices
│   └── store.ts                 # Redux store configuration
└── README.md                    # Project documentation
```

---

## 📜 Available NPM Scripts

| Command | Description |
| :--- | :--- |
| `npm run dev` | Starts the Next.js development server with hot-reloading |
| `npm run build` | Compiles the production build |
| `npm run start` | Starts the production server |
| `npm run lint` | Runs ESLint to check for code quality and formatting issues |

---

## 📄 License & Author

Developed with ❤️ by **[Appon Islam](https://github.com/apponislam)**.  
For questions or inquiries, contact [apponislamdev@gmail.com](mailto:apponislamdev@gmail.com).
