'use client'

import React from 'react'
import { Card, CardContent } from '../ui/card'
import { Clock } from 'lucide-react'

interface RoadmapStep {
    period: string
    phase: string
    tasks: string[]
}

export function LifeRoadmap({ steps }: { steps: RoadmapStep[] }) {
    if (!steps || steps.length === 0) return null

    return (
        <div className="space-y-12">
            <h2 className="text-3xl font-bold">Your Life Roadmap</h2>

            <div className="relative space-y-12 before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-border before:to-transparent">
                {steps.map((step, idx) => (
                    <div key={idx} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                        {/* Dot */}
                        <div className="flex items-center justify-center w-10 h-10 rounded-full border border-border bg-card text-primary shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
                            <Clock className="w-5 h-5 transition-transform group-hover:scale-110" />
                        </div>

                        {/* Content */}
                        <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded border border-border bg-card/40 backdrop-blur-sm shadow hover:border-primary/30 transition-all duration-300">
                            <div className="flex items-center justify-between space-x-2 mb-2">
                                <div className="font-bold text-primary">{step.period}</div>
                            </div>
                            <div className="text-xl font-bold mb-2">{step.phase}</div>
                            <ul className="space-y-2">
                                {step.tasks.map((task, taskIdx) => (
                                    <li key={taskIdx} className="text-muted-foreground flex items-start gap-2 text-sm">
                                        <span className="mt-1.5 w-1 h-1 rounded-full bg-primary shrink-0" />
                                        {task}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
