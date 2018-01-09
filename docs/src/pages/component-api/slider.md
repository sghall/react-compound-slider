# Slider

The `Slider` component allows you to compose together elements to make customized sliders.

### Example Usage:
```jsx
import Slider, { Rail, Handles, Tracks, Ticks } from 'react-compound-slider'

<Slider
  step={5}
  domain={[0, 100]} // [min, max]
  values={[25, 50, 75]} // initial values, they can be updated
  onChange={(values) => console.log(values)}
>
  <Rail>
    ...
  </Rail>
  <Handles>
    ...
  </Handles>
  <Tracks>
    ...
  </Tracks>
  <Ticks>
    ...
  </Ticks>
</Slider>
```
