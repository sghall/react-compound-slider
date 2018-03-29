
Looks pretty good.  Now, can we display it in reverse?

Not a problem:
```jsx
import Slider from 'react-compound-slider'

...
  <Slider
    rootStyle={sliderStyle}
    domain={[0, 100]}
    step={1}
    mode={2}
    reversed // just change the reversed prop
    values={[20, 60, 80]}
  >
    <Slider.Rail>
      {({ getRailProps }) => (
        <div style={railStyle} {...getRailProps()} />
      )}
    </Slider.Rail>
    <Slider.Handles>
      {({ handles, getHandleProps }) => (
        <div className="slider-handles">
          {handles.map(handle => (
            <Handle
              key={handle.id}
              handle={handle}
              getHandleProps={getHandleProps}
            />
          ))}
        </div>
      )}
    </Slider.Handles>
    <Slider.Tracks left={false} right={false}>
      {({ tracks, getTrackProps }) => (
        <div className="slider-tracks">
          {tracks.map(({ id, source, target }) => (
            <Track
              key={id}
              source={source}
              target={target}
              getTrackProps={getTrackProps}
            />
          ))}
        </div>
      )}
    </Slider.Tracks>
    <Slider.Ticks values={[0, 25, 50, 75, 100]}>
      {({ ticks }) => (
        <div className="slider-ticks">
          {ticks.map(tick => (
            <Tick key={tick.id} tick={tick} count={ticks.length} />
          ))}
        </div>
      )}
    </Slider.Ticks>
  </Slider>
...
```

The result of the code above looks like this.  The slider now goes from high to low:
