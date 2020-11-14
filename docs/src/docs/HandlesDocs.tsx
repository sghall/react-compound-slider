import React from 'react';
import ReactMarkdown from 'react-markdown';
import './md.css';

const input = `
| Name | Type | Default | Description |
|:-----|:-----|:-----|:-----|
| children*| function |  |  A function to render the handles. The function receives an object with an array of handles and functions to get handle props. Function signature: **({ handles, getHandleProps }) => ReactNode** |
`;

// https://github.com/remarkjs/react-markdown/issues/339#issuecomment-653396337
// @ts-ignore
window.process = { cwd: () => '' };

export const HandlesDocs: React.FC = () => {
  return <ReactMarkdown className="markdown-body" source={input} />;
};
