## react-compound-slider

Welcome to the future. React Compound Slider is a tiny (5kb) slider component with no opinion about markup or styles.

[![Build Status](https://travis-ci.org/sghall/react-compound-slider.svg?branch=master)](https://travis-ci.org/sghall/react-compound-slider)
[![Dependency Status](https://www.versioneye.com/user/projects/59b03e160fb24f004e1a5a3d/badge.svg?style=flat-square)](https://www.versioneye.com/user/projects/59b03e160fb24f004e1a5a3d)
[![Coverage Status](https://coveralls.io/repos/github/sghall/react-compound-slider/badge.svg?branch=master)](https://coveralls.io/github/sghall/react-compound-slider?branch=master)
[![license](https://img.shields.io/github/license/mashape/apistatus.svg?maxAge=2592000)](https://github.com/sghall/react-compound-slider/blob/master/LICENSE)
![](http://img.badgesize.io/sghall/react-compound-slider/gh-pages/fileSize/react-compound-slider.umd.min.js?compression=gzip)
[![npm version](https://img.shields.io/npm/v/react-compound-slider.svg)](https://www.npmjs.com/package/react-compound-slider)

<div style="text-align:center;">
  <a href="https://sghall.github.io/react-compound-slider/#/slider-demos/horizontal" target="\_parent"><img src="https://user-images.githubusercontent.com/4615775/30075819-cd06121e-922b-11e7-916c-a7c7de29f933.png" alt="React Compound Slider" style="width:450px;"/></a>
</div>
<div style="text-align:center;">
  <a href="https://sghall.github.io/react-compound-slider/#/slider-demos/horizontal" target="\_parent"><img src="https://user-images.githubusercontent.com/4615775/30075820-cd163fb8-922b-11e7-963a-168e21dbfbc3.png" alt="React Compound Slider" style="width:450px;"/></a>
</div>
<div style="text-align:center;">
  <a href="https://sghall.github.io/react-compound-slider/#/slider-demos/horizontal" target="\_parent"><img src="https://user-images.githubusercontent.com/4615775/30075818-cd02968e-922b-11e7-9d89-7b449e70367e.png" alt="React Compound Slider" style="width:450px;"/></a>
</div>

# Installation

React Compound Slider is available as an [npm package](https://www.npmjs.org/package/react-compound-slider).

To install and save in your `package.json` dependencies, run:

```
npm install react-compound-slider
```

### [Live Demos](https://sghall.github.io/react-compound-slider/#/slider-demos/horizontal)

### [Tutorial](https://sghall.github.io/react-compound-slider/#/getting-started/tutorial)

### [Documentation](https://sghall.github.io/react-compound-slider/#/component-api/slider)

### [CodeSandbox](https://codesandbox.io/s/plzyr7lmj)

### Slider Features

- Compound component design provides maximum customizability ✓
  - Makes no assumptions about your markup
  - Precise control over user interactions and styling

- Horizontal/vertical display ✓

- The display of values can be reversed ✓

- Supports mouse and touch events ✓
  - Supports IE9+, Chrome, Firefox & Safari

- Create any type of slider ✓
  - One API for all sliders types
  - Single value slider
  - Range slider (2 handles)
  - Multiple Sliders (N handles)

- Automatically generates uniformly spaced, human-readable tick values to label your slider ✓
  - Supports passing custom sets of ticks

- Integrates seemlessly with any app styling approach ✓
  - CSS
  - CSS-in-JS
  - Inline-styles

- Interaction modes ✓
  - Allow crossing (mode = 1)
  - Prevent crossing (mode = 2)
  - Pushable mode (mode = 3)
  - Create your own custom mode (function)

- Works as a controlled component ✓

### Example Usage

```jsx
import Slider from 'react-compound-slider'
import { Handle, Track, Tick } from './your-local-slider-components'

  <Slider
    rootStyle={sliderStyle}
    domain={[0, 100]}  // [min, max]
    step={1}
    mode={2} // 1 = allow-crossing, 2 = no crossing, 3 = pushable (also custom modes)
    values={[10, 20, 30]} // one value would be a value slider, two a range slider, etc
  >
    <Slider.Handles>
      {({ handles, getHandleProps }) => (
        <div className="slider-handles">
          {handles.map(handle => (
            ...render your handle here
          ))}
        </div>
      )}
    </Slider.Handles>
    <Slider.Tracks left={false} right={false}>  // you can toggle the left and right tracks
      {({ tracks, getTrackProps }) => (
        <div className="slider-tracks">
          {tracks.map(({ id, source, target }) => (
            ...render your track here
          ))}
        </div>
      )}
    </Slider.Tracks>
  </Slider>
```

### Approach

This library takes a [compound component](https://www.youtube.com/watch?v=hEGg-3pIHlE) approach to creating sliders that separates the data/logic from presentation.

If your familiar with Kent Dodd's work on Paypal's [downshift](https://github.com/paypal/downshift) or [react-toggled](https://github.com/kentcdodds/react-toggled) then the pattern should seem familiar.
The components use the [function as child components pattern](https://medium.com/merrickchristensen/function-as-child-components-5f3920a9ace9).

In practical terms this means you can create just about any kind of slider you can imagine and use whatever style approach you want.
By taking this approach it also frees you up to render whatever markup you want to customize your slider.
The `Slider` streams you the data and really only cares about the dimensions of the outer div where it takes its measurements from.

In general slider components are composed of a relatively positioned outer div with elements absolutely positioned inside by a percentage.
In this library the `Handles`, `Tracks`, and `Ticks` components are used as children to the `Slider` component and they let you tap into a stream of values and percentages that you can then use to render your own components.