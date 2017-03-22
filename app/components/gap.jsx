import React, { Component, PropTypes } from 'react';

export default class Gap extends Component {
   render() {
      return (
         <div className="gap" onClick={this.onClick} />
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