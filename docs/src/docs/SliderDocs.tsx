import React from 'react';
import ReactMarkdown from 'react-markdown';
import './md.css';

const input = `
| Name | Type | Default | Description |
|:-----|:-----|:-----|:-----|
| component | string | 'div' |  String component used for slider root. Defaults to 'div'. |
| rootStyle | object | {} |  An object with any inline styles you want applied to the root element. |
| rootProps | object | {} |  An object with any props you want applied to the root element. |
| className | string |  |  CSS class name applied to the root element of the slider. |
| domain | array | \\[0, 100\\] |  Two element array of numbers providing the min and max values for the slider \\[min, max\\] e.g. \\[0, 100\\]. It does not matter if the slider is reversed on the screen, domain is always \\[min, max\\] with min < max. |
| values* | array |  |  An array of numbers. You can supply one for a value slider, two for a range slider or more to create n-handled sliders. The values should correspond to valid step values in the domain. The numbers will be forced into the domain if they are two small or large. |
| step | number | 0.1 |  The step value for the slider. |
| mode | number or func | 1 |  The interaction mode. Value of 1 will allow handles to cross each other. Value of 2 will keep the sliders from crossing and separated by a step. Value of 3 will make the handles pushable and keep them a step apart. ADVANCED: You can also supply a function that will be passed the current values and the incoming update. Your function should return what the state should be set as. |
| vertical | bool | false |  Set to true if the slider is displayed vertically to tell the slider to use the height to calculate positions. |
| reversed | bool | false |  Reverse the display of slider values. |
| onChange | function | () => {} |  Function triggered when the value of the slider has changed. This will recieve changes at the end of a slide as well as changes from clicks on rails and tracks. Receives values. |
| onUpdate | function | () => {} |  Function called with the values at each update (caution: high-volume updates when dragging). Receives values. |
| onSlideStart | function | () => {} |  Function triggered with ontouchstart or onmousedown on a handle. Receives values. |
| onSlideEnd | function | () => {} |  Function triggered on ontouchend or onmouseup on a handle. Receives values. |
| disabled | bool | false |  Ignore all mouse, touch and keyboard events. |
| flatten | bool | false |  Render slider children as siblings. This is primarily for SVG sliders. See the SVG example. |
| warnOnChanges | bool | false |  When true, the slider will warn if values are changed to fit domain and step values.  Defaults to false. |
| children | any |  |  Component children to render. |
`;

export const SliderDocs: React.FC = () => {
  return <ReactMarkdown className="markdown-body" source={input} />;
};
