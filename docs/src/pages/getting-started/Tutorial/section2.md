
Not too exciting.  Let's add a handle...

```jsx
import Slider, { Handles, Tracks, Ticks } from 'react-compound-slider'

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
  </Slider>
...
```

The result of the code above looks like this:
