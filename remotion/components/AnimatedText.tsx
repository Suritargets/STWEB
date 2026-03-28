import React from 'react'
import { interpolate, useCurrentFrame } from '@remotion/core'

type Props = {
  children: React.ReactNode
  from?: number
  style?: React.CSSProperties
}

export const AnimatedText = ({ children, from = 0, style }: Props) => {
  const frame = useCurrentFrame()
  const opacity = interpolate(frame, [from, from + 20], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  })
  const y = interpolate(frame, [from, from + 20], [30, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  })
  return (
    <div style={{ opacity, transform: `translateY(${y}px)`, ...style }}>
      {children}
    </div>
  )
}
