# Rail Component

The `Rail` component is used as a child of `Slider` to render your rail content.
The only motivation for using this component is to hook the rail into the slider events.
If you don't want to have the handles move when the user clicks on the rail then just render your rail as a direct child of `Slider`.

When you send an event using `emitMouse` or `emitTouch` the slider will intelligently update the nearest handle.

## Typical Usage:
```jsx
import Slider, { Rail } from 'react-compound-slider'

const railStyles = {
  position: 'absolute',
  width: '100%',
  height: 8,
  borderRadius: 4,
  backgroundColor: 'rgb(155,155,155)',
}

<Slider
  ...
>
  <Rail>
    {({ emitMouse, emitTouch }) => (
      <div
        style={railStyles}
        onMouseDown={e => emitMouse(e)}
        onTouchStart={e => emitTouch(e)}
      />
    )}
  </Rail>
</Slider>
```