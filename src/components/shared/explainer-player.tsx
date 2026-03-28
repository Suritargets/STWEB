'use client'

import { Player } from '@remotion/player'
import { ExplainerVideo } from '../../../remotion/ExplainerVideo'

export function ExplainerPlayer() {
  return (
    <Player
      component={ExplainerVideo}
      inputProps={{}}
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
