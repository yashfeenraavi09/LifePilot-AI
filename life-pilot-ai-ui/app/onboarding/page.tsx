'use client'

import { useState } from 'react'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { OnboardingForm } from '@/components/onboarding-form'
import { AIProcessing } from '@/components/ai-processing'
import { ResultsDashboard } from '@/components/results-dashboard'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { ChevronLeft, Download, Share2, Loader2 } from 'lucide-react'
import { toast } from 'sonner'
import html2canvas from 'html2canvas'
import { jsPDF } from 'jspdf'

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

export default function OnboardingPage() {
  const [currentStep, setCurrentStep] = useState<'form' | 'processing' | 'results'>('form')
  const [formData, setFormData] = useState<FormData | null>(null)
  const [aiResult, setAiResult] = useState<any>(null)
  const [isDownloading, setIsDownloading] = useState(false)

  const handleFormSubmit = (data: any) => {
    setAiResult(data)
    setCurrentStep('processing')
  }

  const handleProcessingComplete = () => {
    setCurrentStep('results')
  }

  const handleReset = () => {
    setCurrentStep('form')
    setFormData(null)
    setAiResult(null)
  }

  const handleDownloadPDF = async () => {
    const dashboard = document.getElementById('results-dashboard-root')
    if (!dashboard) {
      toast.error('Dashboard content not found')
      return
    }

    try {
      setIsDownloading(true)
      toast.info('Preparing your PDF...')

      const canvas = await html2canvas(dashboard, {
        scale: 2,
        useCORS: true,
        backgroundColor: '#0a0a0a', // Match theme
      })

      const imgData = canvas.toDataURL('image/png')
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'px',
        format: [canvas.width, canvas.height]
      })

      pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height)
      pdf.save(`LifePilot-AI-Plan.pdf`)

      toast.success('PDF downloaded successfully!')
    } catch (error) {
      console.error('PDF Error:', error)
      toast.error('Failed to generate PDF')
    } finally {
      setIsDownloading(false)
    }
  }

  const handleShare = async () => {
    const shareData = {
      title: 'My LifePilot AI Plan',
      text: 'Check out my personalized AI-powered life plan on LifePilot AI!',
      url: window.location.href,
    }

    try {
      if (navigator.share) {
        await navigator.share(shareData)
        toast.success('Shared successfully!')
      } else {
        await navigator.clipboard.writeText(window.location.href)
        toast.success('Link copied to clipboard!')
      }
    } catch (error) {
      if ((error as Error).name !== 'AbortError') {
        toast.error('Failed to share')
      }
    }
  }

  return (
    <div className="min-h-screen dark bg-background text-foreground">
      <Navbar />

      {currentStep === 'form' && (
        <>
          <section className="pt-32 pb-20 px-4">
            <div className="max-w-2xl mx-auto">
              <Link href="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary mb-8 transition-colors">
                <ChevronLeft className="w-4 h-4" />
                Back to Home
              </Link>

              <div className="mb-12">
                <h1 className="text-4xl md:text-5xl font-bold mb-4">Let's Plan Your Future</h1>
                <p className="text-xl text-muted-foreground">
                  Answer a few questions about yourself and let our AI analyze the best path forward.
                </p>
              </div>

              <div className="bg-card border border-border rounded-2xl p-8 md:p-12">
                <OnboardingForm onComplete={handleFormSubmit} />
              </div>
            </div>
          </section>
          <Footer />
        </>
      )}

      {currentStep === 'processing' && (
        <AIProcessing onComplete={handleProcessingComplete} />
      )}

      {currentStep === 'results' && (
        <>
          <section className="pt-32 pb-20 px-4">
            <div className="max-w-7xl mx-auto">
              <div className="flex flex-col md:flex-row items-start justify-between gap-8 mb-12">
                <div>
                  <h1 className="text-4xl md:text-5xl font-bold mb-4">Your AI-Powered Life Plan</h1>
                  <p className="text-lg text-muted-foreground max-w-2xl">
                    Based on your profile and goals, here's your personalized roadmap to success. Follow these recommendations to optimize your career and financial future.
                  </p>
                </div>

                <div className="flex gap-4 w-full md:w-auto">
                  <Button
                    variant="outline"
                    size="lg"
                    className="border-primary/30 hover:bg-primary/10 bg-transparent"
                    onClick={handleDownloadPDF}
                    disabled={isDownloading}
                  >
                    {isDownloading ? (
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    ) : (
                      <Download className="w-4 h-4 mr-2" />
                    )}
                    {isDownloading ? 'Generating...' : 'Download PDF'}
                  </Button>
                  <Button
                    size="lg"
                    className="bg-primary hover:bg-primary/90"
                    onClick={handleShare}
                  >
                    <Share2 className="w-4 h-4 mr-2" />
                    Share
                  </Button>
                </div>
              </div>

              {/* Results Dashboard */}
              <div id="results-dashboard-root">
                <ResultsDashboard data={aiResult} />
              </div>

              {/* CTA Section */}
              <div className="mt-20 rounded-2xl bg-gradient-to-br from-primary/10 to-accent/10 border border-primary/20 p-8 md:p-12 text-center">
                <h2 className="text-3xl font-bold mb-4">Ready to Start Your Journey?</h2>
                <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                  Save this roadmap, track your progress, and get AI-powered guidance every step of the way.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button
                    size="lg"
                    className="bg-primary hover:bg-primary/90"
                  >
                    Create My Account
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    className="border-primary/30 bg-transparent"
                    onClick={handleReset}
                  >
                    Try Another Analysis
                  </Button>
                </div>
              </div>
            </div>
          </section>
          <Footer />
        </>
      )}
    </div>
  )
}
