import React from 'react';
import ReactMarkdown from 'react-markdown';
import './md.css';

const input = `
| Name | Type | Default | Description |
|:-----|:-----|:-----|:-----|
| children* | function |  |  A function to render the rail. Note: **getEventData** can be called with an event and get the value and percent at that location (used for tooltips etc). **activeHandleID** will be a string or null.  Function signature: **({ getEventData, activeHandleID, getRailProps }) => ReactNode** |
`;

export const RailDocs: React.FC = () => {
  return <ReactMarkdown className="markdown-body" source={input} />;
};
