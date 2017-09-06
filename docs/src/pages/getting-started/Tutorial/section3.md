
Better, but still not too impressive.  I want a blue track on the left hand side.
I also want to be able to click on it.

Let's add a track...

## Tracks

A slider always has handles + 1 possible tracks.
The `Tracks` component sends you an array of source/target values for each possible track.
The first source will always be value equal to the min and the percentage zero.
The last target will always be value equal to the max and the percentage 100.
You can use the `left` and `right` props to eliminate the outer tracks as a convenience, but the tracks are just an array that you can manipulate however you want.

```jsx
import Slider, { Handles, Tracks, Ticks } from 'react-compound-slider'

function Track({ source, target, emitMouse, emitTouch }) { // your own track component
  return (
    <div
      style={{
        position: 'absolute',
        height: 10,
        zIndex: 1,
        marginTop: 35,
        backgroundColor: 'cornflowerblue',
        borderRadius: 5,
        cursor: 'pointer',
        left: `${source.percent}%`,
        width: `${target.percent - source.percent}%`,
      }}
      onMouseDown={e => emitMouse(e)}
      onTouchStart={e => emitTouch(e)}
    />
  )
}

function Handle({
  handle: { id, value, percent },
  emitMouse,
  emitTouch,
}) {
  return (
    <div
      style={{
        left: `${percent}%`,
        position: 'absolute',
        marginLeft: -15,
        marginTop: 25,
        zIndex: 2,
        width: 30,
        height: 30,
        textAlign: 'center',
        cursor: 'pointer',
        borderRadius: '50%',
        border: 'solid 2px wheat',
        backgroundColor: 'burlywood',
      }}
      onMouseDown={e => emitMouse(e, id)}
      onTouchStart={e => emitTouch(e, id)}
    >
      <div style={{ fontSize: 10, marginTop: -20 }}>{value}</div>
    </div>
  )
}

...
  <Slider
    rootStyle={sliderStyle}
    domain={[0, 100]}
    step={1}
    mode={2}
    defaultValues={[30]}
  >
    <div style={railStyle} />
    <Handles>
      {({ handles, emitMouse, emitTouch }) => (
        <div className="slider-handles">
          {handles.map(handle => (
            <Handle
              key={handle.id}
              handle={handle}
              emitMouse={emitMouse}
              emitTouch={emitTouch}
            />
          ))}
        </div>
      )}
    </Handles>
    <Tracks right={false}>
      {({ tracks, emitMouse, emitTouch }) => (
        <div className="slider-tracks">
          {tracks.map(({ id, source, target }) => (
            <Track
              key={id}
              source={source}
              target={target}
              emitMouse={emitMouse}
              emitTouch={emitTouch}
            />
          ))}
        </div>
      )}
    </Tracks>
  </Slider>
...
```

The result of the code above looks like this:
