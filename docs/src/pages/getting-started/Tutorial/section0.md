# Slider Tutorial

Here we'll gradually build up a fully functional slider.

### Intro

This library takes a [compound component](https://www.youtube.com/watch?v=hEGg-3pIHlE) approach to creating sliders that separates the data/logic from presentation.

If your familiar with Kent Dodd's work on Paypal's [downshift](https://github.com/paypal/downshift) or [react-toggled](https://github.com/kentcdodds/react-toggled) then the pattern should seem familiar.
The components use the [function as child components pattern](https://medium.com/merrickchristensen/function-as-child-components-5f3920a9ace9).

In practical terms this means you can create just about any kind of slider you can imagine and use whatever style approach you want.
By taking this approach it also frees you up to render whatever markup you want to customize your slider.
The `Slider` streams you the data and really only cares about the dimensions of the outer div where it takes its measurements from.

In general slider components are composed of a relatively positioned outer div with elements absolutely positioned inside by a percentage.
In this library the `Handles`, `Tracks`, and `Ticks` components are used as children to the `Slider` component and they let you tap into a stream of values and percentages that you can then use to render your own components.

### Example Usage

```jsx
import Slider, { Rail, Handles, Tracks, Ticks } from 'react-compound-slider'
import { Handle, Track, Tick } from './your-local-slider-components'

const sliderStyle = {
  position: 'relative',
  width: '100%',
  height: 80,
}

  <Slider
    rootStyle={sliderStyle}
    domain={[0, 100]}  // [min, max]
    step={1}
    mode={2} // 1 = allow-crossing of handles, 2 = no crossing
    values={[10, 20, 30]} // the initial handle positions
  >
    <Rail>
      {({ getRailProps }) => (
        <div style={railStyle} {...getRailProps()} /> // the rail props will make the rail clickeable (optional)
      )}
    </Rail>
    <Handles>
      {({ handles, getHandleProps }) => (
        <div className="slider-handles">
          {handles.map(handle => (
            ...render your handle here
          ))}
        </div>
      )}
    </Handles>
    <Tracks left={false} right={false}>  // you can toggle the left and right tracks
      {({ tracks, getTrackProps }) => (
        <div className="slider-tracks">
          {tracks.map(({ id, source, target }) => (
            ...render your track here
          ))}
        </div>
      )}
    </Tracks>
    <Ticks count={15}> // generates nice tick mark values or provide your own
      {({ ticks }) => (
        <div className="slider-ticks">
          {ticks.map(tick => (
            ...render your tick here
          ))}
        </div>
      )}
    </Ticks>
  </Slider>
```

Below is a walk through of building a slider. The final result of the tutorial is a slider like this:
