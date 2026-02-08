from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from app.schemas import LifeRequest, LifeResponse
from app.agents import run_agent
import json
import re

app = FastAPI(
    title="LifePilot AI Backend",
    description="AI Decision Engine for Global Career & Education Planning",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)

def extract_json(text: str):
    """
    Safely extracts JSON from Gemini output.
    Handles cases where model adds explanations.
    """
    try:
        match = re.search(r"\{.*\}", text, re.DOTALL)
        if not match:
            raise ValueError("No JSON object found")
        return json.loads(match.group())
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"JSON parse error: {e}")


@app.post("/analyze-life", response_model=LifeResponse)
def analyze_life(req: LifeRequest):

    # ========== PLANNER AGENT ==========
    planner_prompt = f"""
You are LifePilot Planner Agent.

User Profile:
{req.dict()}

Break down this life decision into structured analysis tasks.

Return strictly valid JSON only in this format:
{{
  "financial_analysis": true,
  "career_analysis": true,
  "education_analysis": true,
  "country_comparison": true,
  "lifestyle_assessment": true,
  "risk_assessment": true,
  "ten_year_simulation": true
}}
"""

    plan_raw = run_agent(planner_prompt)
    plan = extract_json(plan_raw)

    # ========== ANALYSIS AGENT ==========
    analysis_prompt = f"""
You are LifePilot Analysis Agent.

User Profile:
{req.dict()}

Task Plan:
{plan}

Perform deep multi-step reasoning and a realistic 10-year simulation.

Return strictly valid JSON containing:
- option_wise_comparison (detailed metrics for target countries vs current)
- yearly_income_projection (10 years, list of {{ "year": int, "value": int }})
- savings_projection (10 years, list of {{ "year": int, "value": int }})
- metrics (financial_roi, career_growth, lifestyle, stability, risk_management, overall_score) - all 0-100
- career_trajectory (list of {{ "month": string, "value": int }})
"""

    analysis_raw = run_agent(analysis_prompt)
    analysis = extract_json(analysis_raw)

    # ========== DECISION AGENT ==========
    decision_prompt = f"""
You are LifePilot Decision Agent.

User Profile:
{req.dict()}

Analysis Results:
{analysis}

Choose the best life decision using weighted scoring and provide a visual roadmap.

Return strictly valid JSON in this format:
{{
  "main_path": {{
    "title": "Path Name",
    "description": "Short summary",
    "confidence": 95,
    "potential": "High Potential | Medium Potential",
    "key_reasons": ["Reason 1", "Reason 2"]
  }},
  "alternative_paths": [
    {{
      "title": "Path Name",
      "recommended": false,
      "cost": "$Amount",
      "avg_salary": "$Amount/yr",
      "lifestyle_score": 85,
      "risk_level": "Low | Medium | High",
      "growth_potential": 90
    }}
  ],
  "roadmap": [
    {{
      "period": "Months X-Y",
      "phase": "Phase Name",
      "tasks": ["Task 1", "Task 2"]
    }}
  ]
}}
"""

    decision_raw = run_agent(decision_prompt)
    decision = extract_json(decision_raw)

    return {
        "plan": plan,
        "analysis": analysis,
        "decision": decision
    }
