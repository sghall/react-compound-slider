import React from "react";
import PropTypes from "prop-types";

export default class Track extends React.Component {
  static get propTypes() {
    return {
      children: PropTypes.node.isRequired,
      classNames: PropTypes.objectOf(PropTypes.string).isRequired,
      draggableTrack: PropTypes.bool,
      onTrackDrag: PropTypes.func,
      onTrackMouseDown: PropTypes.func.isRequired,
      percentages: PropTypes.objectOf(PropTypes.number).isRequired
    };
  }

  constructor(props) {
    super(props);

    this.node = null;
    this.trackDragEvent = null;

    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.handleMouseUp = this.handleMouseUp.bind(this);
    this.handleMouseDown = this.handleMouseDown.bind(this);
    this.handleTouchStart = this.handleTouchStart.bind(this);
  }

  getClientRect() {
    return this.node.getBoundingClientRect();
  }

  getActiveTrackStyle() {
    const width = `${(this.props.percentages.max - this.props.percentages.min) *
      100}%`;
    const left = `${this.props.percentages.min * 100}%`;

    return { left, width };
  }

  addDocumentMouseMoveListener() {
    this.removeDocumentMouseMoveListener();
    this.node.ownerDocument.addEventListener("mousemove", this.handleMouseMove);
  }

  addDocumentMouseUpListener() {
    this.removeDocumentMouseUpListener();
    this.node.ownerDocument.addEventListener("mouseup", this.handleMouseUp);
  }

  removeDocumentMouseMoveListener() {
    this.node.ownerDocument.removeEventListener(
      "mousemove",
      this.handleMouseMove
    );
  }

  removeDocumentMouseUpListener() {
    this.node.ownerDocument.removeEventListener("mouseup", this.handleMouseUp);
  }

  handleMouseMove(event) {
    if (!this.props.draggableTrack) {
      return;
    }

    if (this.trackDragEvent !== null) {
      this.props.onTrackDrag(event, this.trackDragEvent);
    }

    this.trackDragEvent = event;
  }

  handleMouseUp() {
    if (!this.props.draggableTrack) {
      return;
    }

    this.removeDocumentMouseMoveListener();
    this.removeDocumentMouseUpListener();
    this.trackDragEvent = null;
  }

  handleMouseDown(event) {
    const clientX = event.touches ? event.touches[0].clientX : event.clientX;
    const trackClientRect = this.getClientRect();
    const position = {
      x: clientX - trackClientRect.left,
      y: 0
    };

    this.props.onTrackMouseDown(event, position);

    if (this.props.draggableTrack) {
      this.addDocumentMouseMoveListener();
      this.addDocumentMouseUpListener();
    }
  }

  handleTouchStart(event) {
    event.preventDefault();

    this.handleMouseDown(event);
  }

  render() {
    const activeTrackStyle = this.getActiveTrackStyle();

    return (
      <div
        className={this.props.classNames.track}
        onMouseDown={this.handleMouseDown}
        onTouchStart={this.handleTouchStart}
        ref={node => {
          this.node = node;
        }}
      >
        <div
          style={activeTrackStyle}
          className={this.props.classNames.activeTrack}
        />
        {this.props.children}
      </div>
    );
  }
}
