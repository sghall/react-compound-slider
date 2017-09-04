# Slider

The `Slider` component allows you to compose togther elements to make customized sliders.

## Typical Usage:
```jsx
import Slider, { Rail, Handles, Tracks, Ticks } from 'react-compound-slider'

<Slider
  step={5}
  domain={[0, 100]}
  defaultValues={[25, 75]}
>
  <Rail>
    {({ emitMouse, emitTouch }) => (
      ...
    )}
  </Rail>
  <Handles>
    {({ handles, emitMouse, emitTouch }) => (
      <div className="slider-handles">
        {handles.map(handle => (
          ...
        ))}
      </div>
    )}
  </Handles>
  <Tracks>
    {({ tracks, emitMouse, emitTouch }) => (
      <div className="slider-tracks">
        {tracks.map(track => (
          ...
        ))}
      </div>
    )}
  </Tracks>
  <Ticks>
    {({ ticks }) => (
      <div className="slider-ticks">
        {ticks.map(tick => (
          ...
        ))}
      </div>
    )}
  </Ticks>
</Slider>
```