import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

class Modal extends Component {
  componentDidMount () {
    document.addEventListener('keydown', this.onKeyDown);
  }

  componentWillUnmount () {
    document.removeEventListener('keydown', this.onKeyDown);
  }

  onKeyDown = (ev) => {
    if (ev.keyCode === 27) {
      this.onClose(ev);
    }
  };

  onClose = ev => {
    ev.preventDefault();

    if (this.props.onClose) {
      this.props.onClose();
    }
    else if (this.props.history) {
      this.props.history.replace('/');
    }
  };

  render () {
    return (
      <TransitionGroup>
        <CSSTransition classNames="modal" appear={true} timeout={500}>
          <section className="modal-container" onClick={this.close}>
            <aside className="modal-content" onClick={ev => ev.stopPropagation()}>
              <Link to="/" replace={true} className="close" onClick={this.onClose}>&times;</Link>
              <h1>{this.props.title}</h1>
              <hr/>
              {this.props.children}
            </aside>
          </section>
        </CSSTransition>
      </TransitionGroup>
    );
  }
}

Modal.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.element.isRequired,
  onClose: PropTypes.func,
};

export default withRouter(Modal);
