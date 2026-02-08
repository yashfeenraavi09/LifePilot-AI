'use client'

import React from 'react'
import { Card, CardContent } from '../ui/card'
import { DollarSign, TrendingUp, Heart, Shield, AlertTriangle, Target } from 'lucide-react'

interface CircularProgressProps {
    value: number
    label: string
    icon: React.ReactNode
    color?: string
}

function CircularProgress({ value, label, icon, color = "text-primary" }: CircularProgressProps) {
    const safeValue = Number(value) || 0
    const radius = 35
    const circumference = 2 * Math.PI * radius
    const offset = circumference - (safeValue / 100) * circumference

    return (
        <Card className="bg-card/50 border-border/50 overflow-hidden group">
            <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-6">
                    <div className={`p-2 rounded-lg bg-background/50 ${color}`}>
                        {icon}
                    </div>
                    <span className="font-semibold">{label}</span>
                </div>

                <div className="flex flex-col items-center">
                    <div className="relative w-32 h-32 flex items-center justify-center">
                        <svg className="w-full h-full -rotate-90">
                            <circle
                                cx="64"
                                cy="64"
                                r={radius}
                                className="stroke-muted fill-none"
                                strokeWidth="8"
                            />
                            <circle
                                cx="64"
                                cy="64"
                                r={radius}
                                className={`${color} fill-none transition-all duration-1000 ease-out`}
                                strokeWidth="8"
                                strokeDasharray={circumference}
                                strokeDashoffset={offset}
                                strokeLinecap="round"
                            />
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center">
                            <span className="text-2xl font-bold">{safeValue}%</span>
                        </div>
                    </div>
                    <p className="text-sm text-muted-foreground mt-4">Strong performance</p>
                </div>
            </CardContent>
        </Card>
    )
}

export function MetricsCards({ metrics }: { metrics: any }) {
    if (!metrics) return null

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <CircularProgress
                value={metrics.financial_roi || 0}
                label="Financial ROI"
                icon={<DollarSign className="w-5 h-5" />}
                color="text-emerald-400"
            />
            <CircularProgress
                value={metrics.career_growth || 0}
                label="Career Growth"
                icon={<TrendingUp className="w-5 h-5" />}
                color="text-blue-400"
            />
            <CircularProgress
                value={metrics.lifestyle || 0}
                label="Lifestyle"
                icon={<Heart className="w-5 h-5" />}
                color="text-pink-400"
            />
            <CircularProgress
                value={metrics.stability || 0}
                label="Stability"
                icon={<Shield className="w-5 h-5" />}
                color="text-indigo-400"
            />
            <CircularProgress
                value={metrics.risk_management || 0}
                label="Risk Management"
                icon={<AlertTriangle className="w-5 h-5" />}
                color="text-orange-400"
            />
            <CircularProgress
                value={metrics.overall_score || 0}
                label="Overall Score"
                icon={<Target className="w-5 h-5" />}
                color="text-primary"
            />
        </div>
    )
}
