# Tutorial

Slider components are effectively just a relatively positioned div with handles and tracks absolutely positioned inside.
Handles and tracks are positioned using percentages.

Here, we'll gradually build up a fully functional slider.

```jsx
import Slider, { Handles, Tracks, Ticks } from 'react-compound-slider'

const sliderStyle = {  // Give the slider some width and height
  position: 'relative',
  width: '100%',
  height: 80,
  border: '1px solid gainsboro',
}

const railStyle = { // Add a rail as a child.  Later we'll make it interactive.
  position: 'absolute',
  width: '100%',
  height: 10,
  marginTop: 35,
  borderRadius: 5,
  backgroundColor: 'peru',
}

...
<Slider
	rootStyle={sliderStyleWithBorder}
	domain={[0, 100]}
	defaultValues={[10]}
 >
	<div style={railStyle} />
</Slider>
...
```

The result of the code above looks like this:
