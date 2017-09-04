# Ticks Component

The `Ticks` component is used as a child of `Slider` to render an array of ticks.

Typical Usage:
```jsx
import React, { Component } from 'react'
import Slider, { Rail, Handles, Tracks, Ticks } from 'react-compound-slider'
import { Handle, Track, Tick } from './components'

<Slider
  domain={domain}
  onUpdate={this.onUpdate}
  onChange={this.onChange}
  defaultValues={values}
>
  <Rail>
    {({ emitMouse, emitTouch }) => (
      ...
    )}
  </Rail>
  <Handles>
    {({ handles, emitMouse, emitTouch }) => (
      ...
    )}
  </Handles>
  <Tracks left={false} right={false}>
    {({ tracks, emitMouse, emitTouch }) => (
      ...
    )}
  </Tracks>
  <Ticks count={15}>
    {({ ticks }) => (
      <div className="slider-ticks">
        {ticks.map(tick => (
          <Tick key={tick.id} tick={tick} count={ticks.length} />
        ))}
      </div>
    )}
  </Ticks>
</Slider>
```
