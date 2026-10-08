import React from 'react'
import { Composition } from 'remotion'
import { ExplainerVideo } from './ExplainerVideo'
import { HeroDesignerLoop } from './HeroDesignerLoop'

export const Root = () => (
  <>
    <Composition
      id="SuritargetsExplainer"
      component={ExplainerVideo}
      durationInFrames={2700}
      fps={30}
      width={1920}
      height={1080}
    />
    <Composition
      id="HeroDesignerLoop"
      component={HeroDesignerLoop}
      durationInFrames={240}
      fps={30}
      width={1000}
      height={750}
    />
  </>
)
