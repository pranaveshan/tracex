# TRACE-X: Real-Time Cryptocurrency Fraud Attribution & Blockchain Intelligence Platform

[![FastAPI](https://img.shields.io/badge/FastAPI-0.110+-009688?style=flat&logo=fastapi&logoColor=white)](https://fastapi.tiangolo.com)
[![React](https://img.shields.io/badge/React-18+-61DAFB?style=flat&logo=react&logoColor=black)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-3178C6?style=flat&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4+-38B2AC?style=flat&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

TRACE-X is an institutional-grade digital forensics platform designed for law enforcement agencies, cyber cells, and blockchain forensic analysts. It automates multi-hop transaction tracing, peel-chain volume dissipation math, co-spending cluster heuristics, and VASP deposit sweeper identification to generate legally admissible Section 91 CrPC and Section 65B Indian Evidence Act court reports.

---

## 🏛️ Three-Tier Separation of Duties

| Department / Role | Clearance | Responsibilities |
| :--- | :--- | :--- |
| **Field Inspector** (`/login/investigator`) | Level 1 | Documents victim FIR complaints, logs field evidence, tags crime modus operandi (*e.g., Pig Butchering, Staking Drain*) |
| **Intelligence Analyst** (`/login/analyst`) | Level 2 | Analyzes topology graphs, computes peel-chain decay formulas, builds cluster proof (`CL-1028`) |
| **Enforcement Admin** (`/login/admin`) | Level 3 | Validates forensic findings, certifies SHA-256 digital seals, issues Section 91 CrPC asset freeze orders |

---

## 🚀 Quick Start

### 1. Backend (FastAPI + Python 3.10+)

```bash
cd backend
python -m venv venv
# On Windows:
.\venv\Scripts\activate
# On Linux/macOS:
source venv/bin/activate

pip install -r requirements.txt
python -m uvicorn app.main:app --host 127.0.0.1 --port 8000 --reload
```
- API Health: `http://127.0.0.1:8000/api/health`
- Interactive Swagger Documentation: `http://127.0.0.1:8000/docs`

### 2. Frontend (React 18 + Vite + TypeScript)

```bash
cd frontend
npm install
npm run dev
```
- Application Web App: `http://localhost:3000`

---

## 🔑 Demo Clearance Accounts

```text
┌───────────────────────────────┬───────────────────────────────┬───────────────────────────┐
│ Role                          │ Email / Login                 │ Password                  │
├───────────────────────────────┼───────────────────────────────┼───────────────────────────┤
│ 1. Field Inspector            │ investigator@tracex.demo      │ Investigator@123          │
│ 2. Intelligence Analyst       │ analyst@tracex.demo           │ Analyst@123               │
│ 3. Enforcement Admin          │ admin@tracex.demo             │ Admin@123                 │
└───────────────────────────────┴───────────────────────────────┴───────────────────────────┘
```

---

## 🛠️ Key Technical Architecture
- **Multi-Hop Fund Flow**: Recursive graph traversal tracing dirty fund dissipation across up to 10 hops.
- **VASP Deposit Attribution**: Automated clustering matching deposit addresses to exchange hot wallets (`Binance`, `Coinbase`, `Kraken`, `WazirX`, `CoinDCX`).
- **0–100 Explainable Risk Engine**: Deterministic risk heuristics based on mixer interaction, rapid peel frequency, bridge hops, and blacklist proximity.
- **Section 91 CrPC Generator**: 1-click legal freeze order drafting formatted for legal service on crypto exchanges.

---

## 📜 Legal Compliance
Complies with:
- **Section 91 of the Code of Criminal Procedure (CrPC)** — Summons to produce documents or other things.
- **Section 69 of the Information Technology Act, 2000** — Interception and decryption directions.
- **Section 65B of the Indian Evidence Act, 1872** — Cryptographic chain-of-custody electronic record certification.

---

## 📄 License
MIT License. Built for Smart India Hackathon 2026.
