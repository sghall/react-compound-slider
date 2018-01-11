// @flow
/* eslint react/prop-types: "off", max-lines: "off" */
import React from 'react'
import { Link } from 'react-router'
import MarkdownElement from 'docs/src/components/MarkdownElement'
import Slider, { Rail, Handles, Tracks, Ticks } from 'react-compound-slider'

const sliderStyleWithBorder = {
  position: 'relative',
  width: '100%',
  height: 80,
  border: '1px solid silver',
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

export function Handle({ handle: { id, value, percent }, getHandleProps }) {
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
      {...getHandleProps(id)}
    >
      <div style={{ fontSize: 11, marginTop: -20 }}>{value}</div>
    </div>
  )
}

function Track({ source, target, getTrackProps }) {
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
      {...getTrackProps()}
    />
  )
}

function Tick({ tick, count }) {
  return (
    <div>
      <div
        style={{
          position: 'absolute',
          marginTop: 52,
          marginLeft: -0.5,
          width: 1,
          height: 8,
          backgroundColor: 'silver',
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

const linkStyle = {
  outline: 'none',
  display: 'inline-block',
  fontFamily: 'Roboto',
  color: 'rgba(127, 127, 127, 0.7)',
}

function Tutorial() {
  return (
    <div style={{ marginBottom: 50 }}>
      <MarkdownElement text={requireMarkdown('./section0.md')} />
      <Slider
        rootStyle={sliderStyle}
        domain={[0, 100]}
        step={1}
        mode={2}
        defaultValues={[10, 20, 30]}
      >
        <Rail>
          {({ getRailProps }) => <div style={railStyle} {...getRailProps()} />}
        </Rail>
        <Handles>
          {({ handles, getHandleProps }) => (
            <div className="slider-handles">
              {handles.map(handle => (
                <Handle
                  key={handle.id}
                  handle={handle}
                  getHandleProps={getHandleProps}
                />
              ))}
            </div>
          )}
        </Handles>
        <Tracks left={false} right={false}>
          {({ tracks, getTrackProps }) => (
            <div className="slider-tracks">
              {tracks.map(({ id, source, target }) => (
                <Track
                  key={id}
                  source={source}
                  target={target}
                  getTrackProps={getTrackProps}
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
      <h1 style={{ ...linkStyle, display: 'inherit', marginLeft: 10 }}>
        Component Docs:
      </h1>
      <Link style={linkStyle} to="/component-api/slider">
        <h2 style={{ marginLeft: 10 }}>Slider</h2>
      </Link>
      <Link style={linkStyle} to="/component-api/rail">
        <h2 style={{ marginLeft: 10 }}>Rail</h2>
      </Link>
      <Link style={linkStyle} to="/component-api/handles">
        <h2 style={{ marginLeft: 10 }}>Handles</h2>
      </Link>
      <Link style={linkStyle} to="/component-api/tracks">
        <h2 style={{ marginLeft: 10 }}>Tracks</h2>
      </Link>
      <Link style={linkStyle} to="/component-api/ticks">
        <h2 style={{ marginLeft: 10 }}>Ticks</h2>
      </Link>
      <MarkdownElement text={requireMarkdown('./section1.md')} />
      <Slider rootStyle={sliderStyleWithBorder} domain={[0, 100]} values={[10]}>
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
          {({ handles, getHandleProps }) => (
            <div className="slider-handles">
              {handles.map(handle => (
                <Handle
                  key={handle.id}
                  handle={handle}
                  getHandleProps={getHandleProps}
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
          {({ handles, getHandleProps }) => (
            <div className="slider-handles">
              {handles.map(handle => (
                <Handle
                  key={handle.id}
                  handle={handle}
                  getHandleProps={getHandleProps}
                />
              ))}
            </div>
          )}
        </Handles>
        <Tracks right={false}>
          {({ tracks, getTrackProps }) => (
            <div className="slider-tracks">
              {tracks.map(({ id, source, target }) => (
                <Track
                  key={id}
                  source={source}
                  target={target}
                  getTrackProps={getTrackProps}
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
          {({ getRailProps }) => <div style={railStyle} {...getRailProps()} />}
        </Rail>
        <Handles>
          {({ handles, getHandleProps }) => (
            <div className="slider-handles">
              {handles.map(handle => (
                <Handle
                  key={handle.id}
                  handle={handle}
                  getHandleProps={getHandleProps}
                />
              ))}
            </div>
          )}
        </Handles>
        <Tracks right={false}>
          {({ tracks, getTrackProps }) => (
            <div className="slider-tracks">
              {tracks.map(({ id, source, target }) => (
                <Track
                  key={id}
                  source={source}
                  target={target}
                  getTrackProps={getTrackProps}
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
          {({ getRailProps }) => <div style={railStyle} {...getRailProps()} />}
        </Rail>
        <Handles>
          {({ handles, getHandleProps }) => (
            <div className="slider-handles">
              {handles.map(handle => (
                <Handle
                  key={handle.id}
                  handle={handle}
                  getHandleProps={getHandleProps}
                />
              ))}
            </div>
          )}
        </Handles>
        <Tracks left={false} right={false}>
          {({ tracks, getTrackProps }) => (
            <div className="slider-tracks">
              {tracks.map(({ id, source, target }) => (
                <Track
                  key={id}
                  source={source}
                  target={target}
                  getTrackProps={getTrackProps}
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
          {({ getRailProps }) => <div style={railStyle} {...getRailProps()} />}
        </Rail>
        <Handles>
          {({ handles, getHandleProps }) => (
            <div className="slider-handles">
              {handles.map(handle => (
                <Handle
                  key={handle.id}
                  handle={handle}
                  getHandleProps={getHandleProps}
                />
              ))}
            </div>
          )}
        </Handles>
        <Tracks left={false} right={false}>
          {({ tracks, getTrackProps }) => (
            <div className="slider-tracks">
              {tracks.map(({ id, source, target }) => (
                <Track
                  key={id}
                  source={source}
                  target={target}
                  getTrackProps={getTrackProps}
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
      <MarkdownElement text={requireMarkdown('./section7.md')} />
      <Slider
        rootStyle={sliderStyle}
        domain={[0, 100]}
        step={1}
        mode={2}
        defaultValues={[20, 60, 80]}
      >
        <Rail>
          {({ getRailProps }) => <div style={railStyle} {...getRailProps()} />}
        </Rail>
        <Handles>
          {({ handles, getHandleProps }) => (
            <div className="slider-handles">
              {handles.map(handle => (
                <Handle
                  key={handle.id}
                  handle={handle}
                  getHandleProps={getHandleProps}
                />
              ))}
            </div>
          )}
        </Handles>
        <Tracks left={false} right={false}>
          {({ tracks, getTrackProps }) => (
            <div className="slider-tracks">
              {tracks.map(({ id, source, target }) => (
                <Track
                  key={id}
                  source={source}
                  target={target}
                  getTrackProps={getTrackProps}
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
      <MarkdownElement text={requireMarkdown('./section8.md')} />
      <Slider
        rootStyle={sliderStyle}
        domain={[0, 100]}
        step={1}
        mode={2}
        reversed
        defaultValues={[20, 60, 80]}
      >
        <Rail>
          {({ getRailProps }) => <div style={railStyle} {...getRailProps()} />}
        </Rail>
        <Handles>
          {({ handles, getHandleProps }) => (
            <div className="slider-handles">
              {handles.map(handle => (
                <Handle
                  key={handle.id}
                  handle={handle}
                  getHandleProps={getHandleProps}
                />
              ))}
            </div>
          )}
        </Handles>
        <Tracks left={false} right={false}>
          {({ tracks, getTrackProps }) => (
            <div className="slider-tracks">
              {tracks.map(({ id, source, target }) => (
                <Track
                  key={id}
                  source={source}
                  target={target}
                  getTrackProps={getTrackProps}
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
