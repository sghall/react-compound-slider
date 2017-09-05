# Handles

The `Handles` component is used as a child of `Slider` to render the slider handles.
Your child function receives an array of handle objects and functions for emitting events.

Handle Object:

- id (string)
- value (number)
- percent (number 0 to 100)

## Typical Usage:
```jsx
import Slider, { Handles } from 'react-compound-slider'

<Slider
  ...
>
  <Handles>
    {({ handles, emitMouse, emitTouch }) => (
      <div className="slider-handles">
        {handles.map(handle => {
          const { id, value, percent } = handle         
          ... render your handle here  
        })}
      </div>
    )}
  </Handles>
</Slider>
```