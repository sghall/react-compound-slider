// @flow
/* eslint react/prop-types: "off" */
import React from 'react'
import MarkdownElement from 'docs/src/components/MarkdownElement'
import Slider, { Rail, Handles, Tracks, Ticks } from 'react-compound-slider'

const sliderStyleWithBorder = {
  position: 'relative',
  width: '100%',
  height: 80,
  border: '1px solid gainsboro',
}

const sliderStyle = {
  position: 'relative',
  width: '100%',
  height: 80,
}

const railStyle = {
  position: 'absolute',
  width: '100%',
  height: 10,
  marginTop: 35,
  borderRadius: 5,
  cursor: 'pointer',
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
      <div style={{ fontSize: 10, marginTop: -20 }}>{value}</div>
    </div>
  )
}

function Track({ source, target, emitMouse, emitTouch }) {
  return (
    <div
      style={{
        position: 'absolute',
        height: 10,
        zIndex: 1,
        marginTop: 35,
        backgroundColor: 'cornflowerblue',
        borderRadius: 5,
        cursor: 'pointer',
        left: `${source.percent}%`,
        width: `${target.percent - source.percent}%`,
      }}
      onMouseDown={e => emitMouse(e)}
      onTouchStart={e => emitTouch(e)}
    />
  )
}

function Tick({ tick, count }) {
  return (
    <div>
      <div
        style={{
          position: 'absolute',
          marginTop: 55,
          marginLeft: -0.5,
          width: 1,
          height: 5,
          backgroundColor: 'gainsboro',
          left: `${tick.percent}%`,
        }}
      />
      <div
        style={{
          position: 'absolute',
          marginTop: 60,
          fontSize: 10,
          textAlign: 'center',
          marginLeft: `${-(100 / count) / 2}%`,
          width: `${100 / count}%`,
          left: `${tick.percent}%`,
        }}
      >
        {tick.value}
      </div>
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
      <Slider
        rootStyle={sliderStyleWithBorder}
        domain={[0, 100]}
        defaultValues={[10]}
      >
        <div style={railStyle} />
      </Slider>
      <MarkdownElement text={requireMarkdown('./section2.md')} />
      <Slider
        rootStyle={sliderStyle}
        domain={[0, 100]}
        step={1}
        mode={2}
        defaultValues={[30]}
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
      <MarkdownElement text={requireMarkdown('./section3.md')} />
      <Slider
        rootStyle={sliderStyle}
        domain={[0, 100]}
        step={1}
        mode={2}
        defaultValues={[30]}
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
        <Tracks right={false}>
          {({ tracks, emitMouse, emitTouch }) => (
            <div className="slider-tracks">
              {tracks.map(({ id, source, target }) => (
                <Track
                  key={id}
                  source={source}
                  target={target}
                  emitMouse={emitMouse}
                  emitTouch={emitTouch}
                />
              ))}
            </div>
          )}
        </Tracks>
      </Slider>
      <MarkdownElement text={requireMarkdown('./section4.md')} />
      <Slider
        rootStyle={sliderStyle}
        domain={[0, 100]}
        step={1}
        mode={2}
        defaultValues={[30]}
      >
        <Rail>
          {({ emitMouse, emitTouch }) => (
            <div
              style={railStyle}
              onMouseDown={e => emitMouse(e)}
              onTouchStart={e => emitTouch(e)}
            />
          )}
        </Rail>
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
        <Tracks right={false}>
          {({ tracks, emitMouse, emitTouch }) => (
            <div className="slider-tracks">
              {tracks.map(({ id, source, target }) => (
                <Track
                  key={id}
                  source={source}
                  target={target}
                  emitMouse={emitMouse}
                  emitTouch={emitTouch}
                />
              ))}
            </div>
          )}
        </Tracks>
      </Slider>
      <MarkdownElement text={requireMarkdown('./section5.md')} />
      <Slider
        rootStyle={sliderStyle}
        domain={[0, 100]}
        step={1}
        mode={2}
        defaultValues={[10, 20, 30]}
      >
        <Rail>
          {({ emitMouse, emitTouch }) => (
            <div
              style={railStyle}
              onMouseDown={e => emitMouse(e)}
              onTouchStart={e => emitTouch(e)}
            />
          )}
        </Rail>
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
        <Tracks left={false} right={false}>
          {({ tracks, emitMouse, emitTouch }) => (
            <div className="slider-tracks">
              {tracks.map(({ id, source, target }) => (
                <Track
                  key={id}
                  source={source}
                  target={target}
                  emitMouse={emitMouse}
                  emitTouch={emitTouch}
                />
              ))}
            </div>
          )}
        </Tracks>
      </Slider>
      <MarkdownElement text={requireMarkdown('./section6.md')} />
      <Slider
        rootStyle={sliderStyle}
        domain={[0, 100]}
        step={1}
        mode={2}
        defaultValues={[10, 20, 30]}
      >
        <Rail>
          {({ emitMouse, emitTouch }) => (
            <div
              style={railStyle}
              onMouseDown={e => emitMouse(e)}
              onTouchStart={e => emitTouch(e)}
            />
          )}
        </Rail>
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
        <Tracks left={false} right={false}>
          {({ tracks, emitMouse, emitTouch }) => (
            <div className="slider-tracks">
              {tracks.map(({ id, source, target }) => (
                <Track
                  key={id}
                  source={source}
                  target={target}
                  emitMouse={emitMouse}
                  emitTouch={emitTouch}
                />
              ))}
            </div>
          )}
        </Tracks>
        <Ticks count={15}>
          {({ ticks }) => (
            <div className="slider-ticks">
              {ticks.map(tick => (
                <Tick key={tick.id} tick={tick} count={ticks.length} />
              ))}
            </div>
          )}
        </Ticks>
      </Slider>
      <Slider
        rootStyle={sliderStyle}
        domain={[0, 100]}
        step={1}
        mode={2}
        defaultValues={[25, 50, 75]}
      >
        <Rail>
          {({ emitMouse, emitTouch }) => (
            <div
              style={railStyle}
              onMouseDown={e => emitMouse(e)}
              onTouchStart={e => emitTouch(e)}
            />
          )}
        </Rail>
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
        <Tracks left={false} right={false}>
          {({ tracks, emitMouse, emitTouch }) => (
            <div className="slider-tracks">
              {tracks.map(({ id, source, target }) => (
                <Track
                  key={id}
                  source={source}
                  target={target}
                  emitMouse={emitMouse}
                  emitTouch={emitTouch}
                />
              ))}
            </div>
          )}
        </Tracks>
        <Ticks values={[0, 25, 50, 75, 100]}>
          {({ ticks }) => (
            <div className="slider-ticks">
              {ticks.map(tick => (
                <Tick key={tick.id} tick={tick} count={ticks.length} />
              ))}
            </div>
          )}
        </Ticks>
      </Slider>
    </div>
  )
}

export default Tutorial
