'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { ResultsDashboard } from '@/components/results-dashboard'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Play, Sparkles, ArrowRight, MousePointer2 } from 'lucide-react'

const sampleData = {
    analysis: {
        yearly_income_projection: [
            { year: 1, value: 85000 },
            { year: 2, value: 110000 },
            { year: 3, value: 145000 },
            { year: 4, value: 180000 },
            { year: 5, value: 220000 },
            { year: 6, value: 260000 },
            { year: 7, value: 310000 },
            { year: 8, value: 370000 },
            { year: 9, value: 440000 },
            { year: 10, value: 520000 }
        ],
        savings_projection: [
            { year: 1, value: 15000 },
            { year: 3, value: 85000 },
            { year: 5, value: 210000 },
            { year: 7, value: 450000 },
            { year: 10, value: 1200000 }
        ],
        metrics: {
            financial_roi: 94,
            career_growth: 91,
            lifestyle: 82,
            stability: 88,
            risk_management: 75,
            overall_score: 89
        },
        career_trajectory: [
            { month: "Jan", value: 40 },
            { month: "Apr", value: 55 },
            { month: "Jul", value: 70 },
            { month: "Oct", value: 85 }
        ]
    },
    decision: {
        main_path: {
            title: "Cloud Architect in Switzerland",
            description: "Transition from Software Engineer to Cloud Architecture within the Zurich tech ecosystem.",
            confidence: 98,
            potential: "Elite Potential",
            key_reasons: [
                "Highest global salary-to-tax ratio",
                "Neutral economic stability",
                "Aggressive growth in digital infrastructure"
            ]
        },
        alternative_paths: [
            {
                title: "Quant Dev in NYC",
                recommended: false,
                cost: "$15,000",
                avg_salary: "$250,000/yr",
                lifestyle_score: 55,
                risk_level: "High",
                growth_potential: 95
            },
            {
                title: "CTO of Singapore AI Startup",
                recommended: false,
                cost: "$5,000",
                avg_salary: "$180,000/yr",
                lifestyle_score: 78,
                risk_level: "Medium",
                growth_potential: 88
            }
        ],
        roadmap: [
            {
                period: "Months 1-3",
                phase: "Certification & Networking",
                tasks: ["AWS Certified Solutions Architect", "Build Zurich tech network", "German intensive A1"]
            },
            {
                period: "Months 4-6",
                phase: "Interview & Relocation",
                tasks: ["Target top-tier firms", "Secure visa sponsorship", "Apartment scouting"]
            },
            {
                period: "Months 7-12",
                phase: "Assimilation & Growth",
                tasks: ["Start role", "Financial setup", "Promotional track setup"]
            }
        ]
    }
}

export default function DemoPage() {
    return (
        <div className="dark min-h-screen bg-[#050505] text-foreground selection:bg-primary/30 overflow-x-hidden">
            <Navbar />

            {/* Dynamic Background */}
            <div className="fixed inset-0 pointer-events-none -z-10">
                <div className="absolute top-[20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-primary/10 blur-[150px] animate-pulse" />
                <div className="absolute bottom-[10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-accent/5 blur-[120px]" />
            </div>

            <main className="pt-32 pb-32">
                {/* Header Section */}
                <section className="px-4 mb-24">
                    <div className="max-w-4xl mx-auto text-center">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.7, cubicBezier: [0.16, 1, 0.3, 1] }}
                        >
                            <div className="inline-flex items-center gap-2 px-3 py-1 mb-6 rounded-full border border-primary/20 bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest">
                                <Sparkles className="w-3.5 h-3.5" />
                                Live Preview
                            </div>

                            <h1 className="text-5xl md:text-7xl font-extrabold mb-8 tracking-tighter text-white">
                                The Future, <span className="text-primary italic">Visualized.</span>
                            </h1>

                            <p className="text-xl text-muted-foreground/80 mb-12 max-w-2xl mx-auto font-light leading-relaxed">
                                Explore an AI-generated career transition for a <span className="text-white font-medium">Senior Software Engineer</span>.
                                Full metrics, 10-year projections, and tactical roadmaps included.
                            </p>

                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-white rounded-full px-10 h-16 text-lg font-bold shadow-lg shadow-primary/20 transition-all hover:scale-105 active:scale-95">
                                    <Link href="/onboarding" className="flex items-center gap-2">
                                        Create Your Own Plan <ArrowRight className="w-5 h-5" />
                                    </Link>
                                </Button>
                                <div className="flex items-center gap-2 text-muted-foreground text-sm font-medium px-6">
                                    <MousePointer2 className="w-4 h-4" />
                                    Scroll to explore results
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </section>

                {/* Premium Dashboard Container */}
                <section className="px-4 max-w-7xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className="relative p-1 md:p-2 rounded-[3rem] bg-gradient-to-br from-border/50 via-border/10 to-transparent border border-white/10 shadow-[0_0_100px_rgba(0,0,0,0.5)] group"
                    >
                        {/* Top Bar Decoration */}
                        <div className="absolute top-8 left-1/2 -translate-x-1/2 flex gap-1.5 opacity-20 group-hover:opacity-40 transition-opacity">
                            <div className="w-2 h-2 rounded-full bg-white" />
                            <div className="w-2 h-2 rounded-full bg-white" />
                            <div className="w-2 h-2 rounded-full bg-white" />
                        </div>

                        <div className="bg-[#0a0a0a] rounded-[2.5rem] p-6 lg:p-16 overflow-hidden relative">
                            {/* Inner Decorative Glows */}
                            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 blur-[120px] -z-10" />
                            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-accent/5 blur-[120px] -z-10" />

                            <ResultsDashboard data={sampleData} />
                        </div>
                    </motion.div>
                </section>

                {/* Floating Action Button for Mobile / Scroll */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 lg:hidden"
                >
                    <Button asChild size="lg" className="rounded-full shadow-2xl bg-primary text-white scale-110">
                        <Link href="/onboarding">Start Free Analysis</Link>
                    </Button>
                </motion.div>

                {/* Bottom Banner */}
                <section className="mt-40 px-4">
                    <div className="max-w-4xl mx-auto p-12 rounded-3xl bg-secondary/30 border border-border/50 text-center">
                        <h2 className="text-2xl font-bold mb-4">Precision planning for your most important asset: Your Life.</h2>
                        <p className="text-muted-foreground mb-8">Join thousands of professionals using AI to optimize their global move.</p>
                        <Button asChild variant="outline" size="lg" className="rounded-full px-12 border-primary/20 hover:bg-primary/10">
                            <Link href="/how-it-works">See How It Works</Link>
                        </Button>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    )
}
