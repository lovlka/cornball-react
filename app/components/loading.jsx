import React, { Component, PropTypes } from 'react';
import Spinner from 'spin.js';

export default class Loading extends Component {

   render() {
      return (
         <div id="spinner"></div>
      );
   }

   componentDidMount() {
      if(!this.spinner) {
         this.spinner = new Spinner({
            lines: 10,
            length: 5,
            width: 2,
            radius: 5,
            corners: 1,
            direction: 1,
            color: '#999'
         });
         this.spinner.spin(document.getElementById('spinner')[0]);
      }
   }

   componentWillUnmount() {
      if(this.spinner) {
         this.spinner.stop();
         this.spinner = null;
      }
   }
}