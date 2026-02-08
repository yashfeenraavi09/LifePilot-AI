'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import {
    ClipboardCheck,
    Cpu,
    LineChart,
    Milestone,
    ArrowRight,
    ShieldCheck,
    Zap,
    Globe
} from 'lucide-react'

const steps = [
    {
        title: "1. Data Collection",
        description: "Share your background, skills, and aspirations through our comprehensive onboarding process. Your data is encrypted and handled with the highest security standards.",
        icon: <ClipboardCheck className="w-8 h-8 text-primary" />,
        color: "from-blue-500/20 to-cyan-500/20"
    },
    {
        title: "2. AI Deep Analysis",
        description: "Our multi-agent system, powered by Gemini , conducts deep research into global job markets, education systems, and economic trends relevant to your goals.",
        icon: <Cpu className="w-8 h-8 text-primary" />,
        color: "from-purple-500/20 to-pink-500/20"
    },
    {
        title: "3. Path Optimization",
        description: "We don't just find a path; we find THE path. Our algorithms weigh risk-to-reward ratios, financial ROI, and lifestyle preferences to recommend your optimal future.",
        icon: <LineChart className="w-8 h-8 text-primary" />,
        color: "from-emerald-500/20 to-teal-500/20"
    },
    {
        title: "4. Executable Roadmap",
        description: "Receive a detailed, month-by-month roadmap with specific tasks, milestones, and projections to turn your AI-generated plan into reality.",
        icon: <Milestone className="w-8 h-8 text-primary" />,
        color: "from-orange-500/20 to-red-500/20"
    }
]

const features = [
    {
        title: "Privacy First",
        description: "Your personal data is used solely for analysis and is never shared with third parties.",
        icon: <ShieldCheck className="w-6 h-6" />
    },
    {
        title: "Real-time Data",
        description: "Our analysis is based on the most recent market trends and immigration updates.",
        icon: <Globe className="w-6 h-6" />
    },
    {
        title: "AI Precision",
        description: "Leveraging state-of-the-art LLMs for nuanced, human-like reasoning and strategic planning.",
        icon: <Zap className="w-6 h-6" />
    }
]

export default function HowItWorks() {
    return (
        <div className="dark min-h-screen bg-background text-foreground selection:bg-primary/30 overflow-x-hidden">
            <Navbar />

            {/* Mesh Background Effect */}
            <div className="fixed inset-0 pointer-events-none -z-10">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-primary/10 blur-[120px]" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-accent/10 blur-[120px]" />
                <div className="absolute top-[30%] right-[10%] w-[30%] h-[30%] rounded-full bg-primary/5 blur-[100px]" />
            </div>

            <main className="pt-32 pb-20 relative">
                {/* Decorative Lines */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-full bg-gradient-to-b from-primary/20 via-border/50 to-transparent -z-10 opacity-20 hidden lg:block" />

                {/* Hero Section */}
                <section className="px-4 mb-24 relative">
                    <div className="max-w-4xl mx-auto text-center">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                        >
                            <div className="inline-block px-4 py-1.5 mb-6 rounded-full border border-primary/20 bg-primary/5 text-primary text-sm font-medium">
                                The Methodology
                            </div>
                            <h1 className="text-5xl md:text-8xl font-bold mb-8 leading-[1.1] tracking-tight text-white">
                                Engineering Your <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">Next Chapter</span>
                            </h1>
                            <p className="text-xl md:text-2xl text-muted-foreground/80 max-w-2xl mx-auto mb-10 leading-relaxed font-light">
                                Discover the data-science-driven process that turns your career aspirations into precise, actionable global paths.
                            </p>
                        </motion.div>
                    </div>
                </section>

                {/* Dynamic Process Section */}
                <section className="px-4 mb-40 relative">
                    <div className="max-w-6xl mx-auto">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                            {steps.map((step, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, margin: "-100px" }}
                                    transition={{ duration: 0.6, delay: idx * 0.15 }}
                                    className="relative group h-full"
                                >
                                    <div className="absolute -inset-0.5 bg-gradient-to-r from-primary/50 to-accent/50 rounded-[2.5rem] blur opacity-0 group-hover:opacity-20 transition duration-1000 group-hover:duration-200" />
                                    <div className="relative p-10 h-full rounded-[2.5rem] border border-border/40 bg-[#0c0c0c] hover:bg-[#0f0f0f] transition-all duration-500 overflow-hidden flex flex-col items-start">
                                        {/* Background Glow */}
                                        <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${step.color} blur-[60px] opacity-20 group-hover:opacity-40 transition-opacity duration-700`} />

                                        <div className="relative z-10 w-16 h-16 rounded-2xl bg-background/80 border border-border/50 flex items-center justify-center mb-8 shadow-2xl group-hover:scale-110 transition-transform duration-500">
                                            {step.icon}
                                        </div>

                                        <h3 className="text-3xl font-bold mb-5 tracking-tight group-hover:text-primary transition-colors duration-300">
                                            {step.title}
                                        </h3>

                                        <p className="text-muted-foreground/90 leading-[1.7] text-lg font-light flex-grow">
                                            {step.description}
                                        </p>

                                        <div className="mt-8 pt-6 border-t border-border/50 w-full flex items-center text-sm font-medium text-primary/50 group-hover:text-primary transition-colors duration-300">
                                            Phase {idx + 1} Completion
                                            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-2 transition-transform" />
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Feature Grid with Sophisticated Cards */}
                <section className="px-4 py-32 bg-secondary/20 relative">
                    {/* Section Divider */}
                    <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />

                    <div className="max-w-6xl mx-auto">
                        <div className="text-center mb-20">
                            <h2 className="text-3xl md:text-5xl font-bold mb-4">Uncompromising Precision</h2>
                            <p className="text-muted-foreground max-w-xl mx-auto">Our infrastructure is built to provide accuracy in an increasingly complex world.</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {features.map((feature, idx) => (
                                <motion.div
                                    key={idx}
                                    whileHover={{ y: -10 }}
                                    className="p-8 rounded-2xl bg-card/40 border border-border/50 hover:border-primary/30 transition-all duration-300 flex flex-col items-center text-center group"
                                >
                                    <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-6 group-hover:bg-primary group-hover:text-white transition-all duration-500">
                                        {feature.icon}
                                    </div>
                                    <h4 className="text-xl font-bold mb-3">{feature.title}</h4>
                                    <p className="text-muted-foreground leading-relaxed">
                                        {feature.description}
                                    </p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Final CTA with Mega Glow */}
                <section className="px-4 py-40">
                    <div className="max-w-5xl mx-auto text-center relative overflow-hidden rounded-[3rem] p-16 md:p-24 bg-black border border-border/50 group">
                        <div className="absolute -top-40 -left-40 w-96 h-96 bg-primary/20 blur-[150px] group-hover:bg-primary/30 transition-colors duration-1000" />
                        <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-accent/20 blur-[150px] group-hover:bg-accent/30 transition-colors duration-1000" />

                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            whileInView={{ scale: 1, opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="relative z-10"
                        >
                            <h2 className="text-4xl md:text-7xl font-bold mb-10 tracking-tighter">Your life deserves a <br />professional roadmap.</h2>
                            <div className="flex flex-col sm:flex-row gap-6 justify-center">
                                <Button asChild size="lg" className="bg-white text-black hover:bg-white/90 h-16 px-10 text-xl font-bold rounded-2xl shadow-[0_0_30px_rgba(255,255,255,0.2)]">
                                    <Link href="/onboarding" className="flex items-center gap-2">
                                        Start Your Analysis <ArrowRight className="w-6 h-6" />
                                    </Link>
                                </Button>
                                <Button asChild variant="outline" size="lg" className="h-16 px-10 text-xl rounded-2xl border-white/20 hover:bg-white/10 bg-transparent transition-all backdrop-blur-md">
                                    <Link href="/demo">View Interactive Demo</Link>
                                </Button>
                            </div>
                        </motion.div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    )
}
