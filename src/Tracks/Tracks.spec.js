// @flow weak
/* eslint-env mocha */

import React from 'react'
import { assert } from 'chai'
import { shallow, configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import LinearScale from '../Slider/LinearScale'
import Tracks from './Tracks'

configure({ adapter: new Adapter() })

const noop = () => {}

const createHandles = count => {
  const handles = []

  for (let i = 0; i < count; i++) {
    handles.push({ id: `hid-${i}` })
  }

  return handles
}

const getTestProps = (handleCount = 1) => ({
  scale: new LinearScale(),
  handles: createHandles(handleCount),
  emitMouse: noop,
  emitTouch: noop,
  left: true,
  right: true,
})

describe('<Tracks />', () => {
  it('renders the result of child function', () => {
    const wrapper = shallow(
      <Tracks {...getTestProps(1)}>
        {() => {
          return <div className="wu-tang" />
        }}
      </Tracks>,
    )

    assert.strictEqual(wrapper.contains(<div className="wu-tang" />), true)
  })

  it('should get handles + 1 tracks when left === true and right === true', () => {
    const handleCount = 3

    const wrapper = shallow(
      <Tracks {...getTestProps(handleCount)}>
        {({ tracks }) => (
          <div>
            {tracks.map(({ id }) => <div className="track" key={id} />)}
          </div>
        )}
      </Tracks>,
    )

    assert.strictEqual(wrapper.find('.track').length, handleCount + 1)
  })

  it('should get handles + 0 tracks when left === true and right === false', () => {
    const handleCount = 3

    const props = {
      ...getTestProps(handleCount),
      right: false,
    }

    const wrapper = shallow(
      <Tracks {...props}>
        {({ tracks }) => (
          <div>
            {tracks.map(({ id }) => <div className="track" key={id} />)}
          </div>
        )}
      </Tracks>,
    )

    assert.strictEqual(wrapper.find('.track').length, handleCount + 0)
  })

  it('should get handles - 1 tracks when left === false and right === false', () => {
    const handleCount = 3

    const props = {
      ...getTestProps(handleCount),
      left: false,
      right: false,
    }

    const wrapper = shallow(
      <Tracks {...props}>
        {({ tracks }) => (
          <div>
            {tracks.map(({ id }) => <div className="track" key={id} />)}
          </div>
        )}
      </Tracks>,
    )

    assert.strictEqual(wrapper.find('.track').length, handleCount - 1)
  })
})
