# Tracks

The `Tracks` component is used as a child of `Slider` to render an array of tracks.
Your children function receives an array of track objects and functions for emitting events.

Track Object:

- id (string)
- source (object)
	- id (string)
	- value (number)
	- percent (number 0 to 100)
- target (object)
	- id (string)
	- value (number)
	- percent (number 0 to 100)

## Typical Usage:
```jsx
import Slider, { Tracks } from 'react-compound-slider'

<Slider
  ...
>
  <Tracks left={false} right={false}>
    {({ tracks, emitMouse, emitTouch }) => (
      <div className="slider-tracks">
        {tracks.map(({ id, source, target }) => {
          ... render your track here 
        })}
      </div>
    )}
  </Tracks>
</Slider>
```