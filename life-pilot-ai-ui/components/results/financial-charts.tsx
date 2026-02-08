'use client'

import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import {
    LineChart, Line, AreaChart, Area, BarChart, Bar,
    XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts'
import { TrendingUp, DollarSign, BarChart3 } from 'lucide-react'

const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-background border border-border p-3 rounded-lg shadow-xl">
                <p className="text-sm font-medium">{label}</p>
                <p className="text-primary font-bold">
                    {payload[0].name}: {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(payload[0].value)}
                </p>
            </div>
        )
    }
    return null
}

const TrajectoryTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-background border border-border p-3 rounded-lg shadow-xl">
                <p className="text-sm font-medium">{label}</p>
                <p className="text-primary font-bold">Growth: {payload[0].value}%</p>
            </div>
        )
    }
    return null
}

export function FinancialCharts({ data, trajectory }: { data: any, trajectory: any[] }) {
    if (!data && !trajectory) return null

    return (
        <div className="space-y-8">
            {/* Financial Projections Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="bg-card/50 border-border/50">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-lg font-medium">
                            <TrendingUp className="w-5 h-5 text-primary" />
                            10-Year Income Projection
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="h-[300px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={data.income}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
                                    <XAxis
                                        dataKey="year"
                                        stroke="#888"
                                        fontSize={12}
                                        tickFormatter={(val) => `Year ${val}`}
                                    />
                                    <YAxis
                                        stroke="#888"
                                        fontSize={12}
                                        tickFormatter={(val) => `$${val / 1000}k`}
                                    />
                                    <Tooltip content={<CustomTooltip />} />
                                    <Line
                                        type="monotone"
                                        dataKey="value"
                                        name="Income"
                                        stroke="hsl(var(--primary))"
                                        strokeWidth={3}
                                        dot={{ fill: 'hsl(var(--primary))', r: 4 }}
                                        activeDot={{ r: 6, strokeWidth: 0 }}
                                    />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </CardContent>
                </Card>

                <Card className="bg-card/50 border-border/50">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-lg font-medium">
                            <DollarSign className="w-5 h-5 text-primary" />
                            Cumulative Savings
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="h-[300px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={data.savings}>
                                    <defs>
                                        <linearGradient id="colorSavings" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                                            <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
                                    <XAxis
                                        dataKey="year"
                                        stroke="#888"
                                        fontSize={12}
                                        tickFormatter={(val) => `Year ${val}`}
                                    />
                                    <YAxis
                                        stroke="#888"
                                        fontSize={12}
                                        tickFormatter={(val) => `$${val / 1000}k`}
                                    />
                                    <Tooltip content={<CustomTooltip />} />
                                    <Area
                                        type="monotone"
                                        dataKey="value"
                                        name="Savings"
                                        stroke="hsl(var(--primary))"
                                        strokeWidth={2}
                                        fillOpacity={1}
                                        fill="url(#colorSavings)"
                                    />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Career Trajectory Row */}
            <Card className="bg-card/50 border-border/50">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg font-medium">
                        <BarChart3 className="w-5 h-5 text-primary" />
                        Career Growth Trajectory
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="h-[350px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={trajectory}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} opacity={0.2} />
                                <XAxis
                                    dataKey="month"
                                    stroke="#888"
                                    fontSize={12}
                                />
                                <YAxis
                                    stroke="#888"
                                    fontSize={12}
                                    domain={[0, 100]}
                                    tickFormatter={(val) => `${val}%`}
                                />
                                <Tooltip content={<TrajectoryTooltip />} cursor={{ fill: 'rgba(255,255,255,0.05)' }} />
                                <Bar
                                    dataKey="value"
                                    name="Growth"
                                    fill="hsl(var(--primary))"
                                    radius={[4, 4, 0, 0]}
                                    barSize={60}
                                />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
