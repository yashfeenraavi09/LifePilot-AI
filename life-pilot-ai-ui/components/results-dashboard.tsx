'use client'

import React from "react"
import { MetricsCards } from "./results/metrics-cards"
import { FinancialCharts } from "./results/financial-charts"
import { PathComparison } from "./results/path-comparison"
import { LifeRoadmap } from "./results/life-roadmap"

interface ResultsDashboardProps {
  data: any
  id?: string
}

export function ResultsDashboard({ data, id }: ResultsDashboardProps) {
  if (!data) {
    return (
      <div className="text-center text-muted-foreground py-10">
        Waiting for AI analysis...
      </div>
    )
  }

  const { analysis = {}, decision = {} } = data

  const financialData = {
    income: analysis.yearly_income_projection || [],
    savings: analysis.savings_projection || []
  }

  return (
    <div className="space-y-16">

      {/* Path Comparison Section */}
      <section className="animate-in fade-in slide-in-from-bottom-4 duration-700">
        <PathComparison
          mainPath={decision.main_path}
          alternativePaths={decision.alternative_paths}
        />
      </section>

      {/* Financial Projections Section */}
      <section className="animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200">
        <h2 className="text-3xl font-bold mb-8">Financial Projections</h2>
        <FinancialCharts
          data={financialData}
          trajectory={analysis.career_trajectory || []}
        />
      </section>

      {/* Career Growth & Performance Metrics Section */}
      <section className="animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300">
        <h2 className="text-3xl font-bold mb-8">Career Growth & Performance Metrics</h2>
        <MetricsCards metrics={analysis.metrics} />
      </section>

      {/* Life Roadmap Section */}
      <section className="animate-in fade-in slide-in-from-bottom-4 duration-700 delay-400">
        <LifeRoadmap steps={decision.roadmap || []} />
      </section>

    </div>
  )
}
