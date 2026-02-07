from pydantic import BaseModel, Field
from typing import List, Dict, Any


class LifeRequest(BaseModel):
    age: int = Field(..., example=22)
    country: str = Field(..., example="India")
    education: str = Field(..., example="B.Tech Computer Science")
    fieldOfStudy: str = Field(..., example="Software Engineering")
    jobTitle: str = Field(..., example="Junior Software Engineer")
    salary: float = Field(..., example=600000)
    experience: int = Field(..., example=1)
    skills: str = Field(..., example="Python, React, Machine Learning")

    targetCountries: List[str] = Field(..., example=["Germany", "UAE", "Canada"])
    careerGoal: str = Field(..., example="High paying AI engineer role")
    salaryGoal: float = Field(..., example=150000)

    riskTolerance: int = Field(..., ge=0, le=100, example=70)
    lifestylePreference: int = Field(..., ge=0, le=100, example=60)

    budget: float = Field(..., example=1200000)
    savings: float = Field(..., example=300000)
    familyDependency: bool = Field(..., example=False)


class LifeResponse(BaseModel):
    plan: Dict[str, Any]
    analysis: Dict[str, Any]
    decision: Dict[str, Any]
