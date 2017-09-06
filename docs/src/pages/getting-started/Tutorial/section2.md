
Not too exciting.  Let's add a handle...

## Handles

```jsx
import Slider, { Rail, Handles, Tracks, Ticks } from 'react-compound-slider'

export function Handle({ // your handle component
  handle: { id, value, percent }, // you get an id, the value and the percentage to place it.
  getHandleProps,
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
      {...getHandleProps(id)} // pass in the id
    >
      <div style={{ fontSize: 11, marginTop: -20 }}>{value}</div>
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
    </Handles>
  </Slider>
...
```

The result of the code above looks like this:
