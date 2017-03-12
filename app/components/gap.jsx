import React, { Component, PropTypes } from 'react';
import {getPosition} from '../utils/card';

export default class Gap extends Component {

   render() {
      const position = getPosition(this.props.index);

      return (
         <div className="gap" onClick={this.onClick} style={position}></div>
      );
   }

   onClick = ev => {
      ev.preventDefault();
      this.props.onClick(this.props.index);
   };

}

Gap.propTypes = {
   index: PropTypes.number.isRequired,
   onClick: PropTypes.func.isRequired
};