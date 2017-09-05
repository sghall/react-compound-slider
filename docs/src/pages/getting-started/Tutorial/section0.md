# Slider Tutorial

Here we'll gradually build up a fully functional slider.

The main idea of this library starts from an observation that slider components are really just a relatively positioned outer div with elements absolutely positioned inside by a percentage.
In this library the `Handles`, `Tracks`, and `Ticks` components are used as children to the `Slider` component and they let you tap into a stream of values and percentages that you can then render using your own components.

This is a [compound component](https://www.youtube.com/watch?v=hEGg-3pIHlE) approach to creating sliders that separates the logic from the actual presentation.
In practical terms this means you can create just about any kind of slider you can imagine and use whatever style approach you want.
The library also has nothing to do with markup.  You can render whatever markup you want.
The `Slider` just streams you the data and really only cares about the dimensions of the outer div where it takes its measurements from.

### Basic Idea

To give you a sense of how it works.
You render your slider analogous to how you might render some tabs in react.

```jsx
import Slider, { Rail, Handles, Tracks, Ticks } from 'react-compound-slider'
import { Handle, Track, Tick } from './your-local-slider-components'

 <Slider
    rootStyle={sliderStyle}
    domain={[0, 100]}
    step={1}
    mode={2}
    defaultValues={[10, 20, 30]}
  >
    <Rail>
      {({ emitMouse, emitTouch }) => (
      	...render your rail content
      )}
    </Rail>
    <Handles>
      {({ handles, emitMouse, emitTouch }) => (
        <div className="slider-handles">
          {handles.map(handle => (
          	...render your handles
          ))}
        </div>
      )}
    </Handles>
    <Tracks left={false} right={false}>
      {({ tracks, emitMouse, emitTouch }) => (
        <div className="slider-tracks">
          {tracks.map(track => (
          	...render your tracks
          ))}
        </div>
      )}
    </Tracks>
    <Ticks count={15}>
      {({ ticks }) => (
        <div className="slider-ticks">
          {ticks.map(tick => (
          	...render your ticks
          ))}
        </div>
      )}
    </Ticks>
  </Slider>
```

Below is a walthrough of building an example slider. The final result of the tutorial is a slider like this: