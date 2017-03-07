import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

export default class Modal extends Component {

   componentDidMount() {
      const router = this.context.router;
      document.onkeydown = function(ev) {
         ev = ev || window.event;
         if (ev.keyCode == 27) {
            router.push('/');
         }
      };
   }

   componentWillUnmount() {
      document.onkeydown = null;
   }

   render() {
      return (
         <div className="dialog-container">
            <div className="dialog-content">
               <div className="right">
                  <Link to="/"><i className="fa fa-close"></i></Link>
               </div>
               <h2>{this.props.title}</h2>
               {this.props.children}
            </div>
         </div>
      );
   }

}

Modal.contextTypes = {
   router: PropTypes.func.isRequired
};

Modal.propTypes = {
   title: PropTypes.string.isRequired,
   children: PropTypes.element.isRequired
};