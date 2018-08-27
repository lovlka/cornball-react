import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import interact from 'interactjs';

export default class Gap extends PureComponent {
  static propTypes = {
    card: PropTypes.object.isRequired,
    index: PropTypes.number.isRequired,
    onClick: PropTypes.func.isRequired
  };

  state = {
    highlight: false
  };

  componentDidMount() {
    this.interact = interact(this.element);
    this.interact.index = this.props.index;
    this.interact.dropzone({
      overlap: 0.1,
      ondragenter: this.highlightGap,
      ondragleave: this.unHighlightGap,
      ondrop: this.unHighlightGap
    })
      .on('tap', this.tap)
      .styleCursor(false);
  }

  componentWillUnmount() {
    if (this.interact) {
      this.interact.unset();
    }
  }

  highlightGap = () => {
    this.setState({ highlight: true });
  };

  unHighlightGap = () => {
    this.setState({ highlight: false });
  };

  tap = () => {
    this.props.onClick(this.props.index);
  };

  render() {
    const { showError } = this.props.card.toJS();
    const className = classNames({
      gap: true,
      highlight: this.state.highlight,
      error: showError
    });
    return (
      <div className={className} ref={(ref) => { this.element = ref; }} />
    );
  }
}
