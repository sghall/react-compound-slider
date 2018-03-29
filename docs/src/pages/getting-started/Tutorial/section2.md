
Not too exciting.  Let's add a handle...

## Handles

Note that I am putting all the styles inline to make the tutorial easier to follow.
That's not a great idea for code organization or for performance.
In your own project you can use whatever style library you want.
Take a look at the Material-UI examples in this site to see how you might handle styles for your slider components.

```jsx
import Slider from 'react-compound-slider'

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
        backgroundColor: '#2C4870',
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
    values={[30]}
  >
    <div style={railStyle} />
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
  </Slider>
...
```

The result of the code above looks like this:
