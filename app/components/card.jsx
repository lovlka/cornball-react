import React, { Component, PropTypes } from 'react';

export default class Card extends Component {
   render() {
      const {suit, value, roundPlaced, showHint} = this.props.card.toJS();
      const image = 'deck/' + suit + value + '.png';
      const className = (roundPlaced ? 'card placed' : (showHint ? 'card animated tada' : 'card'));

      return (
         <div className={className} onClick={this.onClick}>
            <img src={image} />
         </div>
      );
   }

   onClick = ev => {
      ev.preventDefault();
      this.props.onClick(this.props.index);
   };
}

Card.propTypes = {
   card: PropTypes.object.isRequired,
   index: PropTypes.number.isRequired,
   onClick: PropTypes.func.isRequired
};