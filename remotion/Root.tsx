import React from 'react'
import { Composition } from 'remotion'
import { ExplainerVideo } from './ExplainerVideo'

export const Root = () => (
  <Composition
    id="SuritargetsExplainer"
    component={ExplainerVideo}
    durationInFrames={2700}
    fps={30}
    width={1920}
    height={1080}
  />
)
