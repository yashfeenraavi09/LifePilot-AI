'use client'

import React from "react"
import { Card, CardContent } from "./ui/card"

interface ResultsDashboardProps {
  data: any
}

export function ResultsDashboard({ data }: ResultsDashboardProps) {
  if (!data) {
    return (
      <div className="text-center text-muted-foreground py-10">
        Waiting for AI analysis...
      </div>
    )
  }

  const { plan = {}, analysis = {}, decision = {} } = data

  return (
    <div className="max-w-5xl mx-auto space-y-6">

      {/* Main Decision */}
      <Card>
        <CardContent className="p-6">
          <h2 className="text-2xl font-bold mb-4">🧠 LifePilot AI Decision</h2>
          <p className="text-lg font-semibold text-primary">
            {decision?.best_choice || "No decision generated"}
          </p>
          <p className="mt-2 text-muted-foreground">
            {decision?.reasoning || "AI reasoning unavailable."}
          </p>
        </CardContent>
      </Card>

      {/* Roadmap */}
      {decision?.step_by_step_roadmap?.length > 0 && (
        <Card>
          <CardContent className="p-6">
            <h3 className="text-xl font-semibold mb-3">📍 Step-by-Step Roadmap</h3>
            <ul className="list-disc ml-6 space-y-2">
              {decision.step_by_step_roadmap.map((step: string, idx: number) => (
                <li key={idx}>{step}</li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}

      {/* Scores */}
      {decision?.decision_scores && (
        <Card>
          <CardContent className="p-6">
            <h3 className="text-xl font-semibold mb-3">📊 Decision Scores</h3>
            <pre className="bg-muted p-4 rounded-lg overflow-auto text-sm">
              {JSON.stringify(decision.decision_scores, null, 2)}
            </pre>
          </CardContent>
        </Card>
      )}

      {/* Analysis */}
      {analysis && (
        <Card>
          <CardContent className="p-6">
            <h3 className="text-xl font-semibold mb-3">🔍 Deep Analysis</h3>
            <pre className="bg-muted p-4 rounded-lg overflow-auto max-h-[500px] text-sm">
              {JSON.stringify(analysis, null, 2)}
            </pre>
          </CardContent>
        </Card>
      )}

    </div>
  )
}
