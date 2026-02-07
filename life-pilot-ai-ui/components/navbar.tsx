'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Button } from './ui/button'

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-bold text-xl text-primary">
          <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center text-white text-sm font-bold">
            LP
          </div>
          LifePilot AI
        </Link>

        <div className="hidden md:flex items-center gap-8">
          <Link href="/" className="text-foreground hover:text-primary transition-colors">
            Home
          </Link>
          <Link href="#how-it-works" className="text-foreground hover:text-primary transition-colors">
            How It Works
          </Link>
          <a href="#demo" className="text-foreground hover:text-primary transition-colors">
            Demo
          </a>
          <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-foreground hover:text-primary transition-colors">
            GitHub
          </a>
          <Button asChild className="bg-primary hover:bg-primary/90">
            <Link href="/onboarding">Try Now</Link>
          </Button>
        </div>

        <button
          className="md:hidden"
          onClick={() => setIsOpen(!isOpen)}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'} />
          </svg>
        </button>
      </div>

      {isOpen && (
        <div className="md:hidden border-t border-border">
          <div className="px-4 py-4 space-y-4">
            <Link href="/" className="block text-foreground hover:text-primary">
              Home
            </Link>
            <Link href="#how-it-works" className="block text-foreground hover:text-primary">
              How It Works
            </Link>
            <a href="#demo" className="block text-foreground hover:text-primary">
              Demo
            </a>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="block text-foreground hover:text-primary">
              GitHub
            </a>
            <Button asChild className="w-full bg-primary hover:bg-primary/90">
              <Link href="/onboarding">Try Now</Link>
            </Button>
          </div>
        </div>
      )}
    </nav>
  )
}
