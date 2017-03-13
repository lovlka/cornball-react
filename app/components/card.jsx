import React, { Component, PropTypes } from 'react';
import {getPosition} from '../utils/card';

export default class Card extends Component {

   render() {
      const {suit, value, roundPlaced, showHint} = this.props.card.toJS();
      const image = 'url("deck/' + suit + value + '.png")';
      const position = getPosition(this.props.index);
      const style = {backgroundImage: image, ...position};
      const className = (roundPlaced ? 'card placed' : (showHint ? 'card hint' : 'card'));

      return (
         <div className={className} onClick={this.onClick} style={style}></div>
      );
   }

   onClick = ev => {
      ev.preventDefault();
      this.props.onMove(this.props.index, 0);
   };

}

Card.propTypes = {
   card: PropTypes.object.isRequired,
   index: PropTypes.number.isRequired,
   onMove: PropTypes.func.isRequired
};