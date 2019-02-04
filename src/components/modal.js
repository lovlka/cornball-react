import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Modal extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    children: PropTypes.element.isRequired,
    onClose: PropTypes.func.isRequired
  };

  componentDidMount() {
    document.addEventListener('keydown', this.onKeyDown);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.onKeyDown);
  }

  onKeyDown = (ev) => {
    if (ev.keyCode === 27) {
      this.onClose(ev);
    }
  };

  onClose = (ev) => {
    ev.preventDefault();
    this.props.onClose();
  };

  render() {
    return (
      <section className="modal-container">
        <aside className="modal-content">
          <button type="button" className="close" onClick={this.onClose}>&times;</button>
          <h1>{this.props.title}</h1>
          <hr />
          {this.props.children}
        </aside>
      </section>
    );
  }
}

export default Modal;
