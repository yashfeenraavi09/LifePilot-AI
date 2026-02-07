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
    allow_origins=["*"],   # For development only
    allow_credentials=True,
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
- option_wise_analysis
- yearly_income_projection (10 years)
- savings_projection
- lifestyle_score
- risk_score
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

Choose the best life decision using weighted scoring.

Return strictly valid JSON in this format:
{{
  "best_choice": "...",
  "reasoning": "...",
  "decision_scores": {{
      "option_1": 87.5,
      "option_2": 72.3
  }},
  "step_by_step_roadmap": [
      "Step 1 ...",
      "Step 2 ...",
      "Step 3 ..."
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
