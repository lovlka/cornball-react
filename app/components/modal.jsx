import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

export default class Modal extends Component {

   componentDidMount() {
      const close = this.close;
      document.onkeydown = function(ev) {
         ev = ev || window.event;
         if (ev.keyCode == 27) {
            close(ev);
         }
      };
   }

   componentWillUnmount() {
      document.onkeydown = null;
   }

   close = ev => {
      ev.preventDefault();
      this.context.router.push('/');
   };

   render() {
      return (
         <section className="dialog-container" onClick={this.close}>
            <aside className="dialog-content" onClick={ev => ev.stopPropagation()}>
               <Link to="/" className="close">&times;</Link>
               <h1>{this.props.title}</h1>
               <hr />
               {this.props.children}
               <hr />
            </aside>
         </section>
      );
   }

}

Modal.contextTypes = {
   router: PropTypes.object.isRequired,
   intl: PropTypes.object.isRequired
};

Modal.propTypes = {
   title: PropTypes.string.isRequired,
   children: PropTypes.element.isRequired
};