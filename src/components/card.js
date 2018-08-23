import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import interact from 'interactjs';
import { getCardImagePath } from '../helpers/deck';

export default class Card extends PureComponent {
  static propTypes = {
    card: PropTypes.object.isRequired,
    index: PropTypes.number.isRequired,
    onLoad: PropTypes.func.isRequired,
    onClick: PropTypes.func.isRequired,
    onDrop: PropTypes.func.isRequired
  };

  state = {
    dragging: false,
    dragX: 0,
    dragY: 0
  };

  componentDidMount() {
    this.interact = interact(this.element);
    this.interact.draggable({
      onstart: this.dragStart,
      onmove: this.dragMove,
      onend: this.dragEnd
    })
      .on('doubletap', this.doubleTap)
      .styleCursor(false);
  }

  componentWillUnmount() {
    if (this.interact) {
      this.interact.unset();
    }
    if (this.image) {
      this.image.onload = null;
    }
  }

  imageRef = (ref) => {
    if (!ref) {
      return;
    }
    this.image = ref;
    this.image.onload = this.props.onLoad;

    if (this.image.complete) {
      this.props.onLoad();
    }
  };

  dragStart = () => {
    this.setState({ dragging: true });
  };

  dragMove = (ev) => {
    const { dragX, dragY } = this.state;
    this.setState({
      dragX: dragX + ev.dx,
      dragY: dragY + ev.dy
    });
  };

  dragEnd = (ev) => {
    this.setState({ dragging: false, dragX: 0, dragY: 0 });
    if (ev.dropzone) {
      this.props.onDrop(this.props.index, ev.dropzone.index);
    }
  };

  doubleTap = (ev) => {
    ev.preventDefault();
    this.props.onClick(this.props.index);
  };

  render() {
    const { dragging, dragX, dragY } = this.state;
    const { suit, value, roundPlaced, showHint } = this.props.card.toJS();

    const image = getCardImagePath(suit, value);
    const style = { transform: `translate(${dragX}px, ${dragY}px)` };
    const className = classNames({
      card: true,
      dragging,
      placed: roundPlaced,
      'animated tada': showHint
    });

    return (
      <div className={className} style={style} ref={(ref) => { this.element = ref; }}>
        <img src={image} alt="" ref={this.imageRef} />
      </div>
    );
  }
}
