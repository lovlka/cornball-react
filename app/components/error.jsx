import React, { Component, PropTypes } from 'react';

export default class Error extends Component {

   render() {
      return (
         <div className="container">
            <div className="content">
               <a href="#" className="close" onClick={this.close}>&times;</a>
            </div>
         </div>
      );
   }

   close = ev => {
      ev.preventDefault();
      this.props.onClose();
   };
}

Error.propTypes = {
   onClose: PropTypes.func.isRequired
};