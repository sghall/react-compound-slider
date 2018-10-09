## react-compound-slider

Welcome to the future. React Compound Slider is a tiny (5kb) slider component with no opinion about markup or styles.

[![Build Status](https://travis-ci.org/sghall/react-compound-slider.svg?branch=master)](https://travis-ci.org/sghall/react-compound-slider)
[![Coverage Status](https://coveralls.io/repos/github/sghall/react-compound-slider/badge.svg?branch=master)](https://coveralls.io/github/sghall/react-compound-slider?branch=master)
[![license](https://img.shields.io/github/license/mashape/apistatus.svg?maxAge=2592000)](https://github.com/sghall/react-compound-slider/blob/master/LICENSE)
[![npm downloads](https://img.shields.io/npm/dm/react-compound-slider.svg)](https://www.npmjs.com/package/react-compound-slider)
[![npm version](https://img.shields.io/npm/v/react-compound-slider.svg)](https://www.npmjs.com/package/react-compound-slider)

<div style="text-align:center;">
  <a href="https://sghall.github.io/react-compound-slider/#/slider-demos/horizontal" target="\_parent"><img src="https://user-images.githubusercontent.com/4615775/46690444-2aa96b80-cbb7-11e8-8cdd-d1af59df59fe.png" alt="React Compound Slider" style="width:450px;"/></a>
</div>

# Installation

React Compound Slider is available as an [npm package](https://www.npmjs.org/package/react-compound-slider).

To install and save in your `package.json` dependencies, run:

```
npm install react-compound-slider
```

## Documentation
 
The documentation is divided into several sections:

* [Live Demos](https://sghall.github.io/react-compound-slider/#/slider-demos/horizontal)
* [Tutorial](https://sghall.github.io/react-compound-slider/#/getting-started/tutorial)
* [Documentation](https://sghall.github.io/react-compound-slider/#/component-api/slider)
* [CodeSandbox](https://codesandbox.io/s/plzyr7lmj)
* [Value Slider (Typescript) CodeSandbox](https://codesandbox.io/s/6zpjmw1x3w)
* [Range Slider (Typescript) CodeSandbox](https://codesandbox.io/s/zl8nrlp9x)
* [Custom Feet-Inches Ticks (Typescript) CodeSandbox](https://codesandbox.io/s/5262w7r9yx)
* [Custom Feet-Inches Ticks - Vertical (Typescript) CodeSandbox](https://codesandbox.io/s/18lkz04y8j)

### Slider Features

- Small size (5kb)
- Makes no assumptions about your markup
- Supports typescript
- Precise control over user interactions and styling
- Horizontal/vertical display
- The display of values can be reversed
- Supports mouse and touch events (tested in IE9+, Chrome, Firefox & Safari)
- Supports keyboard events so handles can be moved using arrow keys
- Create any type of slider (value, range, n-handled sliders)
- Generates uniformly spaced, human-readable tick values to label your slider
- Integrates seemlessly with any app styling approach (CSS, CSS-in-JS, Inline-styles)
- Interaction modes (Allow crossing, Prevent crossing, Pushable mode, Create your own mode)
- Works as a controlled component

### Example Usage

You have full control of everything that is rendered. Just create your own local handle, track and tick components.  You can use whatever style library / approach you prefer. You can use these components from the demos to jumpstart your slider:

[Starter Components - Horizontal](https://github.com/sghall/react-compound-slider/blob/master/docs/src/pages/slider-demos/horizontal/components.js)

[Starter Components - Vertical](https://github.com/sghall/react-compound-slider/blob/master/docs/src/pages/slider-demos/vertical/components.js)

[Starter Components - Material UI](https://github.com/sghall/react-compound-slider/blob/master/docs/src/pages/slider-demos/material-ui/components.js)

```jsx
import { Slider, Handles, Tracks } from 'react-compound-slider'
import { Handle, Track, Tick } from './your-local-slider-components'

  <Slider
    rootStyle={sliderStyle}
    domain={[0, 100]} // [min, max]
    values={[20, 60, 80]} // slider values
  >
    <Rail>
      {({ getRailProps }) => (
        <div style={railStyle} {...getRailProps()} /> // render your clickable rail!
      )}
    </Rail>
    <Handles>
      {({ handles, getHandleProps }) => (
        // render your handles!
      )}
    </Handles>
    <Tracks left={false} right={false}>
      {({ tracks, getTrackProps }) => (
        // render your (optional) tracks!
      )}
    </Tracks>
    <Ticks count={10}> 
      {({ ticks }) => (
        // render your (optional) ticks!
        // count prop = auto generate approximately 10 uniformly spaced, human-readable ticks
      )}
    </Ticks>
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
