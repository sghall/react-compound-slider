
I'd like to label the slider with some tick marks, but I don't know what they are in advance.
Can you generate some good values and let me render them the way I want?

Sure here you go:
```jsx
import Slider, { Rail, Handles, Tracks, Ticks } from 'react-compound-slider'

function Track({ source, target, emitMouse, emitTouch }) {
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
    defaultValues={[10, 20, 30]}
  >
    <Rail>
      {({ emitMouse, emitTouch }) => (
        <div
          style={railStyle}
          onMouseDown={e => emitMouse(e)}
          onTouchStart={e => emitTouch(e)}
        />
      )}
    </Rail>
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
    <Tracks left={false} right={false}>
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
...
```

The result of the code above looks like this:
