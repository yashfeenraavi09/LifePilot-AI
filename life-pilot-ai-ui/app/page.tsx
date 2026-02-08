'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { ChevronRight, Zap, TrendingUp, Shield } from 'lucide-react'

export default function Home() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    let animationId: number
    let time = 0

    const animate = () => {
      time += 0.001
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Create gradient background
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height)
      const hue1 = (time * 50) % 360
      const hue2 = (hue1 + 60) % 360

      gradient.addColorStop(0, `hsl(${hue1}, 85%, 50%)`)
      gradient.addColorStop(0.5, `hsl(${hue2}, 80%, 45%)`)
      gradient.addColorStop(1, `hsl(${(hue1 + 120) % 360}, 75%, 50%)`)

      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Add subtle noise/blur effect
      ctx.fillStyle = 'rgba(0, 0, 0, 0.3)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      animationId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener('resize', resizeCanvas)
    }
  }, [])

  return (
    <div className="min-h-screen dark bg-background text-foreground">
      <Navbar />

      {/* Hero Section with animated background */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        <canvas
          ref={canvasRef}
          className="absolute inset-0 opacity-40"
        />

        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background" />

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="mb-8 inline-block px-4 py-2 bg-primary/10 border border-primary/20 rounded-full">
            <p className="text-sm font-medium text-white flex items-center gap-2">
              <Zap className="w-4 h-4" />
              AI-Powered Life Planning
            </p>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-balance leading-tight">
            Plan Your Life with
            <span className="block bg-gradient-to-r from-accent via-primary to-blue-400 bg-clip-text text-transparent">
              AI Precision
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto text-balance">
            LifePilot AI analyzes your education, career, finances, and goals to design the best future path for you.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button
              asChild
              size="lg"
              className="bg-primary hover:bg-primary/90 text-white text-lg h-12"
            >
              <Link href="/onboarding">
                Start Life Analysis
                <ChevronRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="text-lg h-12 border-primary/30 hover:bg-primary/10 bg-transparent"
            >
              <Link href="/demo">
                Watch Demo
              </Link>
            </Button>
          </div>

          {/* Feature cards teaser */}
          <div className="grid md:grid-cols-3 gap-4 max-w-3xl mx-auto">
            <div className="p-6 rounded-xl bg-card/50 border border-border/50 backdrop-blur-sm">
              <TrendingUp className="w-8 h-8 text-accent mb-3 mx-auto" />
              <h3 className="font-semibold mb-2">10-Year Projections</h3>
              <p className="text-sm text-muted-foreground">See income and career growth forecasts</p>
            </div>
            <div className="p-6 rounded-xl bg-card/50 border border-border/50 backdrop-blur-sm">
              <Shield className="w-8 h-8 text-accent mb-3 mx-auto" />
              <h3 className="font-semibold mb-2">Risk Analysis</h3>
              <p className="text-sm text-muted-foreground">Evaluate stability and growth potential</p>
            </div>
            <div className="p-6 rounded-xl bg-card/50 border border-border/50 backdrop-blur-sm">
              <Zap className="w-8 h-8 text-accent mb-3 mx-auto" />
              <h3 className="font-semibold mb-2">Actionable Roadmap</h3>
              <p className="text-sm text-muted-foreground">Step-by-step plan to achieve your goals</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
