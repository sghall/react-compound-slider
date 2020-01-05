import React from 'react';
import ReactMarkdown from 'react-markdown';
import './md.css';

const input = `
| Name | Type | Default | Description |
|:-----|:-----|:-----|:-----|
| left | bool | true |  Boolean value to control whether the left most track is included in the tracks array. |
| right | bool | true |  Boolean value to control whether the right most track is included in the tracks array. |
| children* | function |  |  A function to render the tracks. The function receives an object with an array of tracks. Note: **getEventData** can be called with an event and get the value and percent at that location (used for tooltips etc). **activeHandleID** will be a string or null.  Function signature:  **({ getEventData, activeHandleID, tracks, getTrackProps }) => ReactNode** |
`;

export const TracksDocs: React.FC = () => {
  return <ReactMarkdown className="markdown-body" source={input} />;
};
