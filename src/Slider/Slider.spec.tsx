import React from 'react';
import sinon from 'sinon';
import { assert } from 'chai';
import { shallow, mount } from 'enzyme';
import { Rail } from '../Rail';
import { GetRailProps } from '../Rail/types';
import { Handles } from '../Handles';
import { GetHandleProps } from '../Handles/types';
import { Slider } from './Slider';
import * as utils from './utils';

const getTestProps = () => ({
  step: 1,
  domain: [100, 200],
  values: [110, 150],
  reversed: false,
});

const fakeTouch = {
  altitudeAngle: 0,
  azimuthAngle: 0,
  touchType: 'touchmove' as TouchType,
  identifier: 1,
  target: window,
  screenX: 0,
  screenY: 0,
  clientX: 0,
  clientY: 0,
  pageX: 0,
  pageY: 0,
  radiusX: 0,
  radiusY: 0,
  rotationAngle: 0,
  force: 0,
};

const RailComponent: React.FC<{ getRailProps: GetRailProps }> = ({
  getRailProps,
}) => <div {...getRailProps()} />;

const HandleComponent: React.FC<{
  id: string;
  getHandleProps: GetHandleProps;
}> = ({ id, getHandleProps }) => <button {...getHandleProps(id)} />;

describe('<Slider />', () => {
  it('renders DOM elements children when passed', () => {
    const wrapper = shallow(
      <Slider {...getTestProps()}>
        <div className="foo" />
      </Slider>
    );

    assert.strictEqual(wrapper.find('.foo').length, 1);
  });

  it('renders Component children when passed', () => {
    const Custom = () => <div className="foo" />;

    const wrapper = shallow(
      <Slider {...getTestProps()}>
        <Custom />
      </Slider>
    );

    assert.strictEqual(wrapper.find('Custom').length, 1);
  });

  it("calls getHandles when reversed changes and values prop doesn't", () => {
    const getHandlesSpy = sinon.spy(utils, 'getHandles');
    const wrapper = shallow(<Slider {...getTestProps()} />);

    assert.strictEqual(getHandlesSpy.callCount, 1);
    wrapper.setProps({ ...getTestProps(), reversed: true });
    assert.strictEqual(getHandlesSpy.callCount, 2);
    getHandlesSpy.restore();
  });

  it('calls getHandles when values change', () => {
    const getHandlesSpy = sinon.spy(utils, 'getHandles');
    const wrapper = shallow(<Slider {...getTestProps()} />);

    assert.strictEqual(getHandlesSpy.callCount, 1);
    wrapper.setProps({ ...getTestProps(), values: [130, 140] });
    assert.strictEqual(getHandlesSpy.callCount, 2);
    getHandlesSpy.restore();
  });

  it('does NOT call gethandles when values change to a different array with the same values', () => {
    const getHandlesSpy = sinon.spy(utils, 'getHandles');
    const wrapper = shallow(<Slider {...getTestProps()} />);

    const props = {
      ...getTestProps(),
    };

    assert.strictEqual(getHandlesSpy.callCount, 1);
    wrapper.setProps({ ...props, values: [...props.values] });
    assert.strictEqual(getHandlesSpy.callCount, 1);
    getHandlesSpy.restore();
  });

  it('does call onChange/onUpdate when it should', () => {
    const onUpdate = sinon.spy();
    const onChange = sinon.spy();

    const props = {
      ...getTestProps(),
      onChange,
      onUpdate,
    };

    const wrapper = shallow(<Slider {...props} />);

    assert.strictEqual(onUpdate.callCount, 0);
    assert.strictEqual(onChange.callCount, 0);
    wrapper.setProps({ ...props, domain: [50, 200] });
    assert.strictEqual(onUpdate.callCount, 1);
    assert.strictEqual(onChange.callCount, 1);
  });

  it("does NOT call onChange/onUpdate when it shouldn't", () => {
    const onUpdate = sinon.spy();
    const onChange = sinon.spy();

    const props = {
      ...getTestProps(),
      onChange,
      onUpdate,
    };

    const wrapper = shallow(<Slider {...props} />);

    assert.strictEqual(onUpdate.callCount, 0);
    assert.strictEqual(onChange.callCount, 0);
    wrapper.setProps({ ...props, domain: [50, 200], values: [50, 200] });
    assert.strictEqual(onUpdate.callCount, 0);
    assert.strictEqual(onChange.callCount, 0);
  });

  it('uses valid value props when domain changes', () => {
    const getHandlesSpy = sinon.spy(utils, 'getHandles');

    const onUpdate = sinon.spy();
    const onChange = sinon.spy();
    const wrapper = shallow(
      <Slider onUpdate={onUpdate} onChange={onChange} {...getTestProps()} />
    );

    assert.strictEqual(getHandlesSpy.callCount, 1);
    wrapper.setProps({ ...getTestProps(), values: [1, 1], domain: [0, 2] });
    assert.strictEqual(getHandlesSpy.callCount, 2);
    assert.strictEqual(onUpdate.callCount, 0);
    assert.strictEqual(onChange.callCount, 0);

    getHandlesSpy.restore();
  });

  it('recalculates invalid value when domain changes', () => {
    const getHandlesSpy = sinon.spy(utils, 'getHandles');

    const onUpdate = sinon.spy();
    const onChange = sinon.spy();
    const wrapper = shallow(
      <Slider onUpdate={onUpdate} onChange={onChange} {...getTestProps()} />
    );

    wrapper.setProps({ ...getTestProps(), domain: [1, 2] });
    assert.strictEqual(getHandlesSpy.callCount, 2);
    assert.strictEqual(onUpdate.callCount, 1);
    assert.strictEqual(onChange.callCount, 1);

    getHandlesSpy.restore();
  });

  it('should ALWAYS call submitUpdate when onMouseMove is called', () => {
    const submitUpdateSpy = sinon.spy(Slider.prototype, 'submitUpdate');
    const wrapper = shallow<Slider>(<Slider {...getTestProps()} />);

    assert.strictEqual(submitUpdateSpy.callCount, 0);
    wrapper.instance().onMouseMove(new MouseEvent('mousemove'));
    assert.strictEqual(submitUpdateSpy.callCount, 1);

    submitUpdateSpy.restore();
  });

  it('should call submitUpdate when onTouchMove is called', () => {
    const submitUpdateSpy = sinon.spy(Slider.prototype, 'submitUpdate');
    const wrapper = shallow<Slider>(<Slider {...getTestProps()} />);

    assert.strictEqual(submitUpdateSpy.callCount, 0);
    wrapper
      .instance()
      .onTouchMove(new TouchEvent('touchmove', { touches: [fakeTouch] }));
    assert.strictEqual(submitUpdateSpy.callCount, 1);

    submitUpdateSpy.restore();
  });

  it('calls handleRailAndTrackClicks when descendent emits event', () => {
    const handleRailAndTrackClicksSpy = sinon.spy(
      Slider.prototype,
      'handleRailAndTrackClicks'
    );
    const wrapper = mount(
      <Slider {...getTestProps()}>
        <Rail>
          {({ getRailProps }) => {
            return <RailComponent getRailProps={getRailProps} />;
          }}
        </Rail>
      </Slider>
    );

    wrapper.find('RailComponent').simulate('mousedown');
    assert.strictEqual(handleRailAndTrackClicksSpy.callCount, 1);

    handleRailAndTrackClicksSpy.restore();
  });

  it('should not call keyboard events when disabled', () => {
    const sliderProps = {
      ...getTestProps(),
      disabled: true,
      values: [110],
    };

    const wrapper = mount<Slider>(
      <Slider {...sliderProps}>
        <Handles>
          {({ handles, getHandleProps }) => {
            return (
              <HandleComponent
                id={handles[0].id}
                getHandleProps={getHandleProps}
              />
            );
          }}
        </Handles>
        <Rail>
          {({ getRailProps }) => {
            return <RailComponent getRailProps={getRailProps} />;
          }}
        </Rail>
      </Slider>
    );

    wrapper
      .find('HandleComponent')
      .simulate('keydown')
      .simulate('keydown');

    const handles = wrapper.state().handles;
    assert.strictEqual(handles[0].val, 110);
  });

  it('should not call mouse events when descendent emits mouse event', () => {
    const sliderProps = {
      ...getTestProps(),
      disabled: true,
      values: [110],
    };

    const wrapper = mount<Slider>(
      <Slider {...sliderProps}>
        <Handles>
          {({ handles, getHandleProps }) => {
            return (
              <HandleComponent
                id={handles[0].id}
                getHandleProps={getHandleProps}
              />
            );
          }}
        </Handles>
        <Rail>
          {({ getRailProps }) => {
            return <RailComponent getRailProps={getRailProps} />;
          }}
        </Rail>
      </Slider>
    );

    const handleRailAndTrackClicksSpy = sinon.spy(
      Slider.prototype,
      'handleRailAndTrackClicks'
    );

    wrapper.find('RailComponent').simulate('mousedown');
    assert.strictEqual(handleRailAndTrackClicksSpy.called, false);

    wrapper.find('HandleComponent').simulate('mousedown');
    assert.strictEqual(handleRailAndTrackClicksSpy.called, false);

    handleRailAndTrackClicksSpy.restore();
  });

  it('calls handleRailAndTrackClicks when descendent emits touch event', () => {
    const handleRailAndTrackClicksSpy = sinon.spy(
      Slider.prototype,
      'handleRailAndTrackClicks'
    );

    const wrapper = mount(
      <Slider {...getTestProps()}>
        <Rail>
          {({ getRailProps }) => {
            return <RailComponent getRailProps={getRailProps} />;
          }}
        </Rail>
      </Slider>
    );

    wrapper
      .find('RailComponent')
      .simulate('touchstart', { touches: [fakeTouch] });

    assert.strictEqual(handleRailAndTrackClicksSpy.called, true);
    handleRailAndTrackClicksSpy.restore();
  });

  it('calls addTouchEvents when descendent emits touch event with an id', () => {
    const addTouchEventsSpy = sinon.spy(Slider.prototype, 'addTouchEvents');
    const wrapper = mount(
      <Slider {...getTestProps()}>
        <Handles>
          {({ handles, getHandleProps }) => {
            return (
              <HandleComponent
                id={handles[0].id}
                getHandleProps={getHandleProps}
              />
            );
          }}
        </Handles>
      </Slider>
    );

    wrapper
      .find('HandleComponent')
      .simulate('touchstart', { touches: [fakeTouch] });

    assert.strictEqual(addTouchEventsSpy.called, true);
    addTouchEventsSpy.restore();
  });

  it('should call submitUpdate ONLY when a valid key is pressed', () => {
    const submitUpdateSpy = sinon.spy(Slider.prototype, 'submitUpdate');

    const wrapper = mount(
      <Slider {...getTestProps()}>
        <Handles>
          {({ handles, getHandleProps }) => {
            return (
              <HandleComponent
                id={handles[0].id}
                getHandleProps={getHandleProps}
              />
            );
          }}
        </Handles>
      </Slider>
    );

    assert.strictEqual(submitUpdateSpy.callCount, 0);
    wrapper.find('HandleComponent').simulate('keydown', { key: 'ArrowUp' });
    assert.strictEqual(submitUpdateSpy.callCount, 1);
    wrapper.find('HandleComponent').simulate('keydown', { key: 'Escape' });
    assert.strictEqual(submitUpdateSpy.callCount, 1);
    wrapper.find('HandleComponent').simulate('keydown', { key: 'ArrowLeft' });
    assert.strictEqual(submitUpdateSpy.callCount, 2);

    submitUpdateSpy.restore();
  });

  it('should not go over the domain when using the keyboard', () => {
    const onChange = sinon.spy();

    const props = {
      ...getTestProps(),
      step: 5,
      values: [105],
      onChange,
    };

    const wrapper = mount(
      <Slider {...props}>
        <Handles>
          {({ handles, getHandleProps }) => {
            return (
              <HandleComponent
                id={handles[0].id}
                getHandleProps={getHandleProps}
              />
            );
          }}
        </Handles>
      </Slider>
    );

    wrapper.find('HandleComponent').simulate('keydown', { key: 'ArrowDown' });
    assert.deepEqual(onChange.getCall(0).args[0], [100]);
    wrapper.find('HandleComponent').simulate('keydown', { key: 'ArrowDown' });
    assert.deepEqual(onChange.getCall(0).args[0], [100]);
  });

  it('does call setState when submitUpdate called', () => {
    const setStateSpy = sinon.spy(Slider.prototype, 'setState');
    const wrapper = mount<Slider>(<Slider {...getTestProps()} />);

    const values = wrapper.state().values;
    wrapper.instance().submitUpdate([...values], true);

    assert.strictEqual(setStateSpy.callCount, 1);
    setStateSpy.restore();
  });

  it('calls removeListeners when it unmounts', () => {
    const removeListenersSpy = sinon.spy(Slider.prototype, 'removeListeners');
    const wrapper = shallow(<Slider {...getTestProps()} />);
    wrapper.unmount();

    assert.strictEqual(removeListenersSpy.callCount, 1);
    removeListenersSpy.restore();
  });

  it('calls onChange when onMouseUp or onTouchEnd are called', () => {
    const onChange = sinon.spy();

    const props = {
      ...getTestProps(),
      onChange,
    };

    const wrapper = shallow<Slider>(<Slider {...props} />);

    wrapper.instance().onMouseUp();
    assert.strictEqual(onChange.callCount, 1);

    wrapper.instance().onTouchEnd();
    assert.strictEqual(onChange.callCount, 2);
  });

  it('calls onUpdate/onChange on initial render when values are NOT valid steps', () => {
    const onUpdate = sinon.spy();
    const onChange = sinon.spy();

    const props = {
      ...getTestProps(),
      values: [110.5, 150],
      onUpdate,
      onChange,
    };

    shallow(<Slider {...props} />);

    assert.strictEqual(onUpdate.callCount, 1);
    assert.strictEqual(onChange.callCount, 1);
  });

  it('calls onUpdate/onChange on props update when values are NOT valid steps', () => {
    const onUpdate = sinon.spy();
    const onChange = sinon.spy();

    const props = {
      ...getTestProps(),
      values: [110, 150],
      onUpdate,
      onChange,
    };

    const wrapper = shallow(<Slider {...props} />);
    wrapper.setProps({ values: [110.5, 150] }); // update with invalid 110.5

    assert.strictEqual(onUpdate.callCount, 1);
    assert.strictEqual(onChange.callCount, 1);

    wrapper.setProps({ values: [120, 150] }); // update with valid values

    assert.strictEqual(onUpdate.callCount, 1);
    assert.strictEqual(onChange.callCount, 1);

    wrapper.setProps({ values: [120, 150.5] }); // update with invalid 150.5

    assert.strictEqual(onUpdate.callCount, 2);
    assert.strictEqual(onChange.callCount, 2);
  });

  it('should allow conditional rendering', () => {
    assert.doesNotThrow(() => {
      mount(<Slider {...getTestProps()}>{null}{null}</Slider>);
    });
  });
});
