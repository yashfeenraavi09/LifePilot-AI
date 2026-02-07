'use client'

import { useEffect, useState } from 'react'
import { Zap } from 'lucide-react'

interface AIProcessingProps {
  onComplete: () => void
}

const messages = [
  'Analyzing global opportunities...',
  'Simulating 10-year career paths...',
  'Computing financial ROI...',
  'Evaluating lifestyle factors...',
  'Calculating risk profiles...',
  'Designing your life roadmap...',
]

export function AIProcessing({ onComplete }: AIProcessingProps) {
  const [currentMessageIdx, setCurrentMessageIdx] = useState(0)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const messageInterval = setInterval(() => {
      setCurrentMessageIdx(idx => (idx + 1) % messages.length)
    }, 2000)

    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval)
          setTimeout(onComplete, 500)
          return 100
        }
        return prev + Math.random() * 30
      })
    }, 800)

    return () => {
      clearInterval(messageInterval)
      clearInterval(progressInterval)
    }
  }, [onComplete])

  return (
    <div className="fixed inset-0 bg-background z-50 flex items-center justify-center">
      <div className="text-center max-w-2xl mx-auto px-4">
        {/* Animated gradient circles */}
        <div className="relative w-32 h-32 mx-auto mb-12">
          <div className="absolute inset-0 bg-gradient-to-br from-primary to-accent rounded-full opacity-20 animate-pulse" />
          <div className="absolute inset-4 bg-gradient-to-br from-accent to-primary rounded-full opacity-30 animate-pulse" style={{ animationDelay: '0.5s' }} />
          <div className="absolute inset-8 bg-gradient-to-br from-primary to-accent rounded-full animate-spin" style={{ animationDuration: '3s' }} />
          <div className="absolute inset-0 flex items-center justify-center">
            <Zap className="w-12 h-12 text-accent animate-pulse" />
          </div>
        </div>

        <h2 className="text-4xl font-bold mb-6 text-balance">
          LifePilot AI is thinking...
        </h2>

        <div className="mb-12 h-20 flex items-center justify-center">
          <p className="text-xl text-primary font-medium">
            {messages[currentMessageIdx]}
          </p>
        </div>

        {/* Progress bar */}
        <div className="w-full max-w-md mx-auto">
          <div className="w-full h-2 bg-border rounded-full overflow-hidden mb-4">
            <div
              className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-700"
              style={{ width: `${Math.min(progress, 100)}%` }}
            />
          </div>
          <p className="text-sm text-muted-foreground">
            {Math.min(Math.round(progress), 100)}%
          </p>
        </div>

        <div className="mt-8 text-sm text-muted-foreground">
          Analyzing your profile and generating personalized recommendations...
        </div>
      </div>
    </div>
  )
}
