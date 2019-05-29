<div style="text-align:center;">
  <a href="https://sghall.github.io/react-compound-slider" target="\_parent">
  <img src="https://user-images.githubusercontent.com/4615775/51296069-8fa30780-19d7-11e9-9399-ace98ee439f0.png"/></a>
</div>

## React Compound Slider

Welcome to the future. React Compound Slider is a tiny (4.3kb) slider component with no opinion about markup or styles.

### [Documentation and Examples](https://sghall.github.io/react-compound-slider/#/slider-demos/horizontal)

[![Build Status](https://travis-ci.org/sghall/react-compound-slider.svg?branch=master)](https://travis-ci.org/sghall/react-compound-slider)
[![Coverage Status](https://coveralls.io/repos/github/sghall/react-compound-slider/badge.svg?branch=master)](https://coveralls.io/github/sghall/react-compound-slider?branch=master)
[![license](https://img.shields.io/github/license/mashape/apistatus.svg?maxAge=2592000)](https://github.com/sghall/react-compound-slider/blob/master/LICENSE)
[![npm downloads](https://img.shields.io/npm/dm/react-compound-slider.svg)](https://www.npmjs.com/package/react-compound-slider)
![gzip size](http://img.badgesize.io/https://npmcdn.com/react-compound-slider/dist/react-compound-slider.min.js?compression=gzip)
[![npm version](https://img.shields.io/npm/v/react-compound-slider.svg)](https://www.npmjs.com/package/react-compound-slider)
[![Language grade: JavaScript](https://img.shields.io/lgtm/grade/javascript/g/sghall/react-compound-slider.svg?logo=lgtm&logoWidth=18)](https://lgtm.com/projects/g/sghall/react-compound-slider/context:javascript)

<div style="text-align:center;">
  <a href="https://sghall.github.io/react-compound-slider" target="\_parent">
  <img src="https://user-images.githubusercontent.com/4615775/46690444-2aa96b80-cbb7-11e8-8cdd-d1af59df59fe.png" alt="React Compound Slider" style="width:450px;"/></a>
</div>

### Motivation

This library aims to be a stable platform for creating slider components with a very small impact on bundle size. It is primarily aimed at application developers and npm package maintainers. You can create your own set of controls matched exactly to your application style, but it takes a little more effort than other components out there. You need to be comfortable handling what gets rendered and styling your components to really get maximum value from this library. There are quite a few demos on the website but they should be used as a starting point. You can also create your own custom themed slider component for your favorite framework and release it on npm for others to use.

### Slider Features

- Small size (4.3kb)
- Makes no assumptions about your markup
- Supports SVG sliders
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

### [Documentation and Examples](https://sghall.github.io/react-compound-slider/#/slider-demos/horizontal)

### More Examples on CodeSandbox

* [Basic Multi-Slider on CodeSandbox](https://codesandbox.io/s/plzyr7lmj)
* [Date/Time Slider on CodeSandbox](https://codesandbox.io/s/rw97j317p)
* [Video Slider on CodeSandbox](https://codesandbox.io/s/1z51zn6q23)
* [Slider w/ Tooltips (Typescript)](https://codesandbox.io/s/pjwwzzj8qm)
* [SVG Slider on CodeSandbox](https://codesandbox.io/s/qk0vovqw6)
* [Value Slider on CodeSandbox (Typescript)](https://codesandbox.io/s/6zpjmw1x3w)
* [Range Slider on CodeSandbox (Typescript)](https://codesandbox.io/s/zl8nrlp9x)
* [Custom Feet-Inches Ticks on CodeSandbox (Typescript)](https://codesandbox.io/s/5262w7r9yx)
* [Custom Feet-Inches Ticks - Vertical on CodeSandbox (Typescript)](https://codesandbox.io/s/18lkz04y8j)
* [Material Design Example on CodeSandbox](https://codesandbox.io/s/k91omlr1wo) by [@RafeSacks](https://github.com/RafeSacks) 
* [Slider with Bar Chart on CodeSandbox](https://codesandbox.io/s/rangeslider-with-histogram-voos8) by [@magician11](https://github.com/magician11) See [#85](https://github.com/sghall/react-compound-slider/issues/85).

# Installation

React Compound Slider is available as an [npm package](https://www.npmjs.org/package/react-compound-slider).

To install and save in your `package.json` dependencies, run:

```
// React 16.3 or greater
npm install react-compound-slider

// React 15.0 -> 16.2
npm install react-compound-slider@0.16.3
```

## Documentation
 
The documentation is divided into several sections:

* [Live Demos](https://sghall.github.io/react-compound-slider/#/slider-demos/horizontal)
* [Tutorial](https://sghall.github.io/react-compound-slider/#/getting-started/tutorial)
* [Documentation](https://sghall.github.io/react-compound-slider/#/component-api/slider)

### Example Usage

You have full control of everything that is rendered. Just render the `Slider` children that you want. Don't need ticks? Don't use `Ticks`. Don't want a rail? Don't use `Rail`.  Just create the local rail, handle, track and tick components that you want and render those using whatever styling method you prefer. 

You can use these components from the demos to jumpstart your slider:

[Starter Components - Horizontal](https://github.com/sghall/react-compound-slider/blob/master/docs/src/pages/slider-demos/horizontal/components.js)

[Starter Components - Vertical](https://github.com/sghall/react-compound-slider/blob/master/docs/src/pages/slider-demos/vertical/components.js)

[Starter Components - Material UI](https://github.com/sghall/react-compound-slider/blob/master/docs/src/pages/slider-demos/material-ui/components.js)

[Starter Components - With Tooltips](https://github.com/sghall/react-compound-slider/blob/master/docs/src/pages/slider-demos/tooltips/components.js)

[Basic Tooltip CSS](https://github.com/sghall/react-compound-slider/blob/master/docs/src/pages/slider-demos/tooltips/tooltip.css) (CSS from [this demo](https://www.w3schools.com/w3css/w3css_tooltips.asp))

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

Slider Artwork by Guilhem from the Noun Project
