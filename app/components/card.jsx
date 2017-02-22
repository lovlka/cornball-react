import React, { Component, PropTypes } from 'react';

export default class Card extends Component {

   render() {
      const image = 'url("deck/' + this.props.suit + this.props.value + '.png")';
      return (
         <div className="card" style={{backgroundImage: image}}></div>
      );
   }

}

Card.propTypes = {
   suit: PropTypes.string.isRequired,
   value: PropTypes.number.isRequired
};