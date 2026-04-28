'use client'

import React from 'react'

interface MarqueeProps {
  className?: string
  pauseOnHover?: boolean
  reverse?: boolean
  repeat?: number
  children: React.ReactNode
}

// Outer div and inner divs both use gap-10 (2.5rem) to match the keyframe offset.
// With repeat=5 and 3 cards per set (948px content), total span ≥ 5×948 = 4740px —
// safely fills any viewport so there is never a blank gap during the loop.
export function Marquee({
  className = '',
  pauseOnHover = false,
  reverse = false,
  repeat = 5,
  children,
}: MarqueeProps) {
  const animClass = reverse ? 'animate-marquee-reverse' : 'animate-marquee'
  const pauseClass = pauseOnHover ? 'group-hover:[animation-play-state:paused]' : ''

  return (
    <div className={`group flex gap-10 overflow-hidden ${className}`}>
      {Array.from({ length: repeat }).map((_, i) => (
        <div
          key={i}
          className={`flex shrink-0 gap-10 ${animClass} ${pauseClass}`}
        >
          {children}
        </div>
      ))}
    </div>
  )
}
