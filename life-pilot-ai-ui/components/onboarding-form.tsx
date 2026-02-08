'use client'

import React, { useState } from "react"
import { Button } from './ui/button'
import { ChevronRight, ChevronLeft, Loader2 } from 'lucide-react'

interface FormData {
  age: string
  country: string
  education: string
  fieldOfStudy: string
  jobTitle: string
  salary: string
  experience: string
  skills: string
  targetCountries: string[]
  careerGoal: string
  salaryGoal: string
  riskTolerance: number
  lifestylePreference: number
  budget: string
  savings: string
  familyDependency: boolean
}

const initialFormData: FormData = {
  age: '',
  country: '',
  education: '',
  fieldOfStudy: '',
  jobTitle: '',
  salary: '',
  experience: '',
  skills: '',
  targetCountries: [],
  careerGoal: '',
  salaryGoal: '',
  riskTolerance: 50,
  lifestylePreference: 50,
  budget: '',
  savings: '',
  familyDependency: false,
}

const steps = ['Personal Info', 'Career Info', 'Goals & Preferences', 'Financial Info']

interface OnboardingFormProps {
  onComplete: (result: any) => void
}

export function OnboardingForm({ onComplete }: OnboardingFormProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const [formData, setFormData] = useState<FormData>(initialFormData)
  const [loading, setLoading] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.currentTarget
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.currentTarget as HTMLInputElement).checked : value,
    }))
  }

  const handleSliderChange = (name: string, value: number) => {
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleCountryToggle = (country: string) => {
    setFormData(prev => ({
      ...prev,
      targetCountries: prev.targetCountries.includes(country)
        ? prev.targetCountries.filter(c => c !== country)
        : [...prev.targetCountries, country],
    }))
  }

  const submitToBackend = async () => {
    try {
      setLoading(true)

      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"
      const res = await fetch(`${apiUrl}/analyze-life`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      if (!res.ok) throw new Error("Backend error")

      const data = await res.json()
      onComplete(data)

    } catch (err: any) {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"
      alert(`Backend connection failed at ${apiUrl}. Check console for details.`)
      console.error("Connection Error Information:", {
        url: apiUrl,
        endpoint: "/analyze-life",
        error: err.message || err,
        stack: err.stack
      })
    } finally {
      setLoading(false)
    }
  }

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      submitToBackend()
    }
  }

  const handlePrevious = () => {
    if (currentStep > 0) setCurrentStep(currentStep - 1)
  }

  const getStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2">Age</label>
              <input
                type="number"
                name="age"
                value={formData.age}
                onChange={handleInputChange}
                placeholder="e.g., 28"
                className="w-full px-4 py-3 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Country</label>
              <input
                type="text"
                name="country"
                value={formData.country}
                onChange={handleInputChange}
                placeholder="e.g., India"
                className="w-full px-4 py-3 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Current Education Level</label>
              <select
                name="education"
                value={formData.education}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
              >
                <option value="">Select education level</option>
                <option value="high-school">High School</option>
                <option value="bachelors">Bachelor's Degree</option>
                <option value="masters">Master's Degree</option>
                <option value="phd">PhD</option>
                <option value="diploma">Diploma</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Field of Study</label>
              <input
                type="text"
                name="fieldOfStudy"
                value={formData.fieldOfStudy}
                onChange={handleInputChange}
                placeholder="e.g., Computer Science"
                className="w-full px-4 py-3 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
            </div>
          </div>
        )

      case 1:
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2">Current Job Title</label>
              <input
                type="text"
                name="jobTitle"
                value={formData.jobTitle}
                onChange={handleInputChange}
                placeholder="e.g., Software Engineer"
                className="w-full px-4 py-3 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Current Salary (USD)</label>
              <input
                type="number"
                name="salary"
                value={formData.salary}
                onChange={handleInputChange}
                placeholder="e.g., 80000"
                className="w-full px-4 py-3 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Years of Experience</label>
              <input
                type="number"
                name="experience"
                value={formData.experience}
                onChange={handleInputChange}
                placeholder="e.g., 5"
                className="w-full px-4 py-3 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Key Skills</label>
              <textarea
                name="skills"
                value={formData.skills}
                onChange={handleInputChange}
                placeholder="e.g., Python, React, Leadership"
                rows={3}
                className="w-full px-4 py-3 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
            </div>
          </div>
        )

      case 2:
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-4">Target Countries</label>
              <div className="grid grid-cols-2 gap-3">
                {['USA', 'Canada', 'Germany', 'India', 'UAE', 'Singapore', 'UK', 'Australia'].map(country => (
                  <button
                    key={country}
                    onClick={() => handleCountryToggle(country)}
                    className={`p-3 rounded-lg border transition-all ${formData.targetCountries.includes(country)
                      ? 'bg-primary text-primary-foreground border-primary'
                      : 'border-border bg-card hover:border-primary/50'
                      }`}
                  >
                    {country}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Career Goal</label>
              <input
                type="text"
                name="careerGoal"
                value={formData.careerGoal}
                onChange={handleInputChange}
                placeholder="e.g., Become a Tech Lead"
                className="w-full px-4 py-3 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Target Salary (USD)</label>
              <input
                type="number"
                name="salaryGoal"
                value={formData.salaryGoal}
                onChange={handleInputChange}
                placeholder="e.g., 150000"
                className="w-full px-4 py-3 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-3">Risk Tolerance</label>
              <div className="flex items-center gap-4">
                <span className="text-sm text-muted-foreground">Conservative</span>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={formData.riskTolerance}
                  onChange={e => handleSliderChange('riskTolerance', Number(e.target.value))}
                  className="flex-1 h-2 bg-border rounded-lg appearance-none cursor-pointer"
                />
                <span className="text-sm text-muted-foreground">Aggressive</span>
              </div>
              <p className="text-center text-sm text-primary font-medium mt-2">{formData.riskTolerance}%</p>
            </div>

            <div>
              <label className="block text-sm font-medium mb-3">Lifestyle Preference</label>
              <div className="flex items-center gap-4">
                <span className="text-sm text-muted-foreground">Work-Life Balance</span>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={formData.lifestylePreference}
                  onChange={e => handleSliderChange('lifestylePreference', Number(e.target.value))}
                  className="flex-1 h-2 bg-border rounded-lg appearance-none cursor-pointer"
                />
                <span className="text-sm text-muted-foreground">Career Growth</span>
              </div>
              <p className="text-center text-sm text-primary font-medium mt-2">{formData.lifestylePreference}%</p>
            </div>
          </div>
        )

      case 3:
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2">Available Budget (USD)</label>
              <input
                type="number"
                name="budget"
                value={formData.budget}
                onChange={handleInputChange}
                placeholder="e.g., 50000"
                className="w-full px-4 py-3 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Current Savings (USD)</label>
              <input
                type="number"
                name="savings"
                value={formData.savings}
                onChange={handleInputChange}
                placeholder="e.g., 100000"
                className="w-full px-4 py-3 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
            </div>

            <div className="flex items-center gap-3 p-4 bg-card/50 border border-border rounded-lg">
              <input
                type="checkbox"
                name="familyDependency"
                checked={formData.familyDependency}
                onChange={handleInputChange}
                className="w-5 h-5 rounded border-border cursor-pointer"
              />
              <label htmlFor="familyDependency" className="text-sm font-medium cursor-pointer">
                I have family members depending on me financially
              </label>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="w-full max-w-3xl mx-auto">
      <div className="mb-8">
        <div className="flex justify-between mb-3">
          <h2 className="text-xl font-bold">Step {currentStep + 1} / {steps.length}</h2>
          <p className="text-muted-foreground">{steps[currentStep]}</p>
        </div>
        <div className="h-2 bg-border rounded">
          <div
            className="h-full bg-primary transition-all"
            style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Step indicator dots */}
      <div className="flex gap-2 mb-8 justify-center">
        {steps.map((_, idx) => (
          <div
            key={idx}
            className={`h-3 w-3 rounded-full transition-all ${idx <= currentStep ? 'bg-primary' : 'bg-border'
              }`}
          />
        ))}
      </div>

      {/* Form content */}
      <div className="mb-8">
        {getStepContent()}
      </div>


      <div className="flex justify-between mt-10">
        <Button
          variant="outline"
          disabled={currentStep === 0}
          onClick={handlePrevious}
        >
          <ChevronLeft className="w-4 h-4 mr-1" />
          Back
        </Button>

        <Button onClick={handleNext} disabled={loading}>
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Analyzing...
            </>
          ) : (
            <>
              {currentStep === steps.length - 1 ? 'Analyze My Life' : 'Next'}
              <ChevronRight className="w-4 h-4 ml-1" />
            </>
          )}
        </Button>
      </div>
    </div>
  )
}
