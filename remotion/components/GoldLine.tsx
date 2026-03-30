import React from 'react'
import { interpolate, useCurrentFrame } from 'remotion'

export const GoldLine = ({
  from = 0,
  maxWidth = 300,
}: {
  from?: number
  maxWidth?: number
}) => {
  const frame = useCurrentFrame()
  const width = interpolate(frame, [from, from + 30], [0, maxWidth], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  })
  return (
    <div
      style={{
        width,
        height: 2,
        backgroundColor: '#C9A84C',
        margin: '0 auto',
      }}
    />
  )
}
