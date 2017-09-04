# Ticks

The `Ticks` component is used as a child of `Slider` to render an array of ticks.
Your children function receives an array of tick objects and functions for emitting events.

Tick Object:

- id (string)
- value (number)
- percent (number 0 to 100)

## Typical Usage:
```jsx
import Slider, { Ticks } from 'react-compound-slider'

<Slider
  ...
>
  <Ticks count={15}>
    {({ ticks, emitMouse, emitTouch }) => (
      <div className="slider-ticks">
        {ticks.map(tick => {
          const { id, value, percent } = tick         
          ... render your tick here     
        })}
      </div>
    )}
  </Ticks>
</Slider>
```

You can also pass an array of your own tick values:
```jsx
import Slider, { Ticks } from 'react-compound-slider'

<Slider
  ...
>
  <Ticks values={[10, 20, 30, 40, 50]}>
    {({ ticks, emitMouse, emitTouch }) => (
      <div className="slider-ticks">
        {ticks.map(tick => {
          const { id, value, percent } = tick         
          ... render your tick here     
        })}
      </div>
    )}
  </Ticks>
</Slider>
```
