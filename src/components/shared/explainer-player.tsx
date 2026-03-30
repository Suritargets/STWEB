'use client'

import { Player } from '@remotion/player'
import { useLocale } from 'next-intl'
import { ExplainerVideo } from '../../../remotion/ExplainerVideo'

export function ExplainerPlayer() {
  const locale = useLocale()

  return (
    <Player
      component={ExplainerVideo}
      inputProps={{ locale }}
      durationInFrames={2700}
      fps={30}
      compositionWidth={1920}
      compositionHeight={1080}
      style={{ width: '100%', aspectRatio: '16/9' }}
      controls
      loop
    />
  )
}
