'use client'

import React from 'react'
import { Card, CardContent } from '../ui/card'
import { Button } from '../ui/button'
import { Badge } from '../ui/badge'
import { Star, ChevronRight, Check } from 'lucide-react'

interface PathCardProps {
    path: any
    isMain?: boolean
}

function PathCard({ path, isMain }: PathCardProps) {
    if (isMain) {
        return (
            <Card className="bg-card/50 border-primary/20 overflow-hidden relative group hover:border-primary/40 transition-all duration-300">
                <div className="absolute top-0 left-0 w-1 h-full bg-primary" />
                <CardContent className="p-8">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
                        <div className="flex items-start gap-4">
                            <div className="mt-1 p-2 rounded-lg bg-primary/10 text-primary">
                                <Star className="w-6 h-6 fill-primary/20" />
                            </div>
                            <div>
                                <h2 className="text-3xl font-bold mb-2">{path.title}</h2>
                                <p className="text-lg text-muted-foreground">{path.description}</p>
                            </div>
                        </div>
                        <div className="flex gap-3">
                            <Badge variant="secondary" className="px-4 py-2 bg-primary/20 text-primary border-primary/20 text-sm font-semibold rounded-full">
                                {path.confidence}% Confidence
                            </Badge>
                            <Badge variant="outline" className="px-4 py-2 border-primary/30 text-primary text-sm font-semibold rounded-full">
                                {path.potential}
                            </Badge>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <p className="font-semibold text-lg">Key Reasons:</p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            {path.key_reasons?.map((reason: string, idx: number) => (
                                <div key={idx} className="flex items-center gap-3 text-muted-foreground">
                                    <Check className="w-5 h-5 text-primary shrink-0" />
                                    <span>{reason}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </CardContent>
            </Card>
        )
    }

    return (
        <Card className="bg-card/40 border-border/50 hover:border-primary/30 transition-all duration-300 flex flex-col">
            <CardContent className="p-6 flex-1 flex flex-col">
                <div className="flex justify-between items-start mb-6">
                    <h3 className="text-xl font-bold">{path.title}</h3>
                    {path.recommended && (
                        <Badge className="bg-primary/20 text-primary hover:bg-primary/30 border-none">
                            Recommended
                        </Badge>
                    )}
                </div>

                <div className="space-y-4 flex-1">
                    <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Cost</span>
                        <span className="font-bold">{path.cost}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Avg Salary</span>
                        <span className="font-bold">{path.avg_salary}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Lifestyle Score</span>
                        <span className="font-bold text-primary">{path.lifestyle_score}%</span>
                    </div>
                    <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Risk Level</span>
                        <span className="font-bold">{path.risk_level}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Growth Potential</span>
                        <span className="font-bold text-primary">{path.growth_potential}%</span>
                    </div>
                </div>

                <Button variant="outline" className="w-full mt-8 group">
                    Learn More
                    <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
            </CardContent>
        </Card>
    )
}

export function PathComparison({ mainPath, alternativePaths }: { mainPath: any, alternativePaths: any[] }) {
    return (
        <div className="space-y-12">
            {mainPath && <PathCard path={mainPath} isMain />}

            <div>
                <h3 className="text-2xl font-bold mb-8">Alternative Paths Analysis</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {alternativePaths?.map((path, idx) => (
                        <PathCard key={idx} path={path} />
                    ))}
                </div>
            </div>
        </div>
    )
}
