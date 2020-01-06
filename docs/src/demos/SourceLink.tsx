import React from 'react';
import Button from '@material-ui/core/Button';

const repo = 'https://github.com/sghall/react-compound-slider';
const base = `${repo}/blob/master/docs/src/demos`;

export const SourceLink: React.FC<{ path: string }> = ({ path }) => (
  <a href={`${base}/${path}`}>
    <Button variant="outlined" size="small">
      Demo Source
    </Button>
  </a>
);
