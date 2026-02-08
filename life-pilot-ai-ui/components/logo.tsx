import React from 'react'

export function Logo({ className = "w-8 h-8", iconOnly = false }: { className?: string, iconOnly?: boolean }) {
    return (
        <div className={`flex items-center gap-2 ${iconOnly ? '' : 'group'}`}>
            <div className={`relative ${className}`}>
                {/* Glow Effect */}
                <div className="absolute inset-0 bg-primary/40 blur-lg rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Logo SVG */}
                <svg
                    viewBox="0 0 100 100"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="relative z-10 w-full h-full drop-shadow-2xl"
                >
                    <defs>
                        <linearGradient id="logo-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="hsl(var(--primary))" />
                            <stop offset="100%" stopColor="hsl(var(--accent))" />
                        </linearGradient>
                        <filter id="logo-glow" x="-20%" y="-20%" width="140%" height="140%">
                            <feGaussianBlur stdDeviation="2" result="blur" />
                            <feComposite in="SourceGraphic" in2="blur" operator="over" />
                        </filter>
                    </defs>

                    {/* Outer Ring Segment */}
                    <path
                        d="M50 10C72.0914 10 90 27.9086 90 50C90 72.0914 74.5 90 50 90"
                        stroke="url(#logo-gradient)"
                        strokeWidth="8"
                        strokeLinecap="round"
                        className="opacity-20"
                    />

                    {/* The "P" / "Arrow" Hybrid Shape */}
                    <path
                        d="M35 85V25L70 45L35 65"
                        stroke="url(#logo-gradient)"
                        strokeWidth="10"
                        strokeLinejoin="round"
                        strokeLinecap="round"
                        className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-500"
                    />

                    {/* Secondary Accent Element */}
                    <path
                        d="M50 15L85 50L50 85"
                        stroke="url(#logo-gradient)"
                        strokeWidth="4"
                        strokeLinecap="round"
                        className="opacity-40 group-hover:translate-x-2 transition-transform duration-700"
                    />
                </svg>
            </div>
            {!iconOnly && (
                <span className="font-bold text-xl tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-white to-white/70 group-hover:to-white transition-all duration-300">
                    LifePilot<span className="text-primary italic">AI</span>
                </span>
            )}
        </div>
    )
}
