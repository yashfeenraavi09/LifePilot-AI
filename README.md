# 🪐 LifePilot AI
### *An AI that plans your life — before life plans you.*

**Live Backend:** [https://lifepilot-ai-lpcy.onrender.com/](https://lifepilot-ai-lpcy.onrender.com/)

---

**LifePilot AI** is the ultimate decision-intelligence engine for long-term life planning. In an era of global uncertainty, traditional career advice is no longer enough. LifePilot leverages **Gemini** to conduct deep, multi-agent analysis of your education, career trajectory, and financial goals, engineering a precise, actionable roadmap for your future.

Whether you're an engineer looking to relocate to Switzerland or a student deciding between local and international study, LifePilot doesn't just suggest paths—it optimizes your life with data-science-driven precision.

---

## ✨ Key Features

### 📊 Precision Dashboard
A high-fidelity, interactive results hub that visualizes your future with:
- **10-Year Income Projections**: Line charts showing your wealth accumulation over time.
- **Career Trajectory Heatmaps**: Bar charts visualizing periods of high growth and stability.
- **Automated Risk Scoring**: AI-calculated metrics for Financial ROI, Stability, and Lifestyle scores.

### 🗺️ Multi-Agent Life Architect
Powered by a sophisticated multi-agent system on the backend:
1. **The Planner**: Breaks down your complex goals into a 4-step actionable methodology.
2. **The Analyst**: Conducts deep market research based on real-world trends and your specific profile.
3. **The Decision Agent**: Evaluates competing paths and recommends the optimal "High-Potential" route.

### 📄 Professional Export & Share
- **Instant PDF Roadmap**: Export your entire AI-generated plan as a high-quality PDF for offline tracking.
- **Web Share Integration**: Share your recommended path with mentors or peers via a single tap.

### 💎 Premium Experience
- **Dark Theme Excellence**: A sleek, futuristic interface featuring mesh gradients and glassmorphism.
- **Interactive Methodology**: A visual deep-dive (How It Works) that demystifies the AI’s reasoning.

---

## 🛠️ Tech Stack

### AI Pipeline
- **Core LLM**: [Google Gemini 2.5 Pro](https://deepmind.google/technologies/gemini/) (via Google AI SDK)
- **Architecture**: Multi-agent prompting for specialized reasoning (Planning, Analysis, Decision).

### Backend
- **Framework**: FastAPI (Python 3.10+)
- **Schema**: Pydantic for robust data validation.
- **Reliability**: Structured JSON parsing from model outputs.

### Frontend
- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS & Framer Motion for premium animations.
- **Charts**: Recharts for high-performance data visualizations.
- **UI Components**: Shadcn UI & Lucide Icons.

---

## 🚀 Production Deployment

### 1. Backend (Render)
1. **GitHub Blueprint**: Connect this repository to Render using the "Blueprint" feature. It will detect `lifepilot-backend/render.yaml` automatically.
2. **Environment**: Add your `GEMINI_API_KEY` in the Render dashboard's environment settings.
3. **Live URL**: Once deployed, copy your backend URL (e.g., `https://lifepilot-ai-lpcy.onrender.com`).

### 2. Frontend (Vercel)
1. **New Project**: Create a new project on Vercel and import this repository.
2. **Configuration**:
   - **Root Directory**: `life-pilot-ai-ui`
   - **Environment Variables**: Add `NEXT_PUBLIC_API_URL` with your Render backend URL as the value.
3. **Deploy**: Build and visit your live LifePilot AI!

---

## 🏗️ Project Structure
```text
LifePilotAI/
├── lifepilot-backend/          # FastAPI Agent System
│   ├── app/
│   │   ├── main.py             # API Endpoints & Multi-Agent Logic
│   │   ├── agents.py           # Gemini API Integration
│   │   └── schemas.py          # Pydantic Data Models
├── life-pilot-ai-ui/           # Next.js Premium Frontend
│   ├── components/             # Reusable Dashboard & UI Elements
│   ├── app/                    # App Router Pages (Home, Onboarding, Demo, etc.)
│   └── public/                 # Static Assets
```


