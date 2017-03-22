import React, { Component, PropTypes } from 'react';
import { Link, withRouter } from 'react-router-dom';

class Modal extends Component {
   componentDidMount() {
      document.onkeydown = (ev) => {
         ev = ev || window.event;
         if (ev.keyCode === 27) {
            this.close(ev);
         }
      };
   }

   componentWillUnmount() {
      document.onkeydown = null;
   }

   close = ev => {
      ev.preventDefault();

      if(this.props.onClose) {
         this.props.onClose();
      }
      else if(this.props.history) {
         this.props.history.replace('/');
      }
   };

   render() {
      return (
         <section className="modal-container" onClick={this.close}>
            <aside className="modal-content" onClick={ev => ev.stopPropagation()}>
               <Link to="/" replace={true} className="close" onClick={this.close}>&times;</Link>
               <h1>{this.props.title}</h1>
               <hr />
               {this.props.children}
            </aside>
         </section>
      );
   }
}

Modal.propTypes = {
   title: PropTypes.string.isRequired,
   children: PropTypes.element.isRequired,
   onClose: PropTypes.func
};

export default withRouter(Modal);