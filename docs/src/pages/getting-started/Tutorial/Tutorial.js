// @flow
/* eslint react/prop-types: "off" */
import React from 'react'
import MarkdownElement from 'docs/src/components/MarkdownElement'
import Slider, { Handles } from 'react-compound-slider'

const sliderStyle = {
  position: 'relative',
  width: '100%',
  height: 80,
  border: '1px solid gainsboro',
}

const railStyle = {
  position: 'absolute',
  width: '100%',
  height: 10,
  marginTop: 35,
  borderRadius: 5,
  backgroundColor: 'peru',
}

export function Handle({
  handle: { id, value, percent },
  emitMouse,
  emitTouch,
}) {
  return (
    <div
      style={{
        left: `${percent}%`,
        position: 'absolute',
        marginLeft: -15,
        marginTop: 25,
        zIndex: 2,
        width: 30,
        height: 30,
        textAlign: 'center',
        cursor: 'pointer',
        borderRadius: '50%',
        border: 'solid 2px wheat',
        backgroundColor: 'burlywood',
      }}
      onMouseDown={e => emitMouse(e, id)}
      onTouchStart={e => emitTouch(e, id)}
    >
      <div style={{ marginTop: 30 }}>{value}</div>
    </div>
  )
}

const requireMarkdown = require.context(
  '../../../pages/getting-started/Tutorial',
  true,
  /\.md$/,
)

function Tutorial() {
  return (
    <div>
      <MarkdownElement text={requireMarkdown('./section1.md')} />
      <Slider rootStyle={sliderStyle} domain={[0, 100]} defaultValues={[10]}>
        <div style={railStyle} />
      </Slider>
      <Slider
        rootStyle={sliderStyle}
        domain={[0, 100]}
        step={1}
        mode={2}
        defaultValues={[10, 20, 30]}
      >
        <div style={railStyle} />
        <Handles>
          {({ handles, emitMouse, emitTouch }) => (
            <div className="slider-handles">
              {handles.map(handle => (
                <Handle
                  key={handle.id}
                  handle={handle}
                  emitMouse={emitMouse}
                  emitTouch={emitTouch}
                />
              ))}
            </div>
          )}
        </Handles>
      </Slider>
    </div>
  )
}

export default Tutorial
