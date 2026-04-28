'use client'

import React from 'react'

interface MarqueeProps {
  className?: string
  pauseOnHover?: boolean
  reverse?: boolean
  children: React.ReactNode
}

export function Marquee({
  className = '',
  pauseOnHover = false,
  reverse = false,
  children,
}: MarqueeProps) {
  const animClass = reverse ? 'animate-marquee-reverse' : 'animate-marquee'
  const pauseClass = pauseOnHover ? 'group-hover:[animation-play-state:paused]' : ''

  return (
    <div className={`group flex overflow-hidden ${className}`}>
      {[0, 1].map((i) => (
        <div
          key={i}
          className={`flex shrink-0 items-stretch gap-6 ${animClass} ${pauseClass}`}
        >
          {children}
        </div>
      ))}
    </div>
  )
}
