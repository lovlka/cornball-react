import React, { Component, PropTypes } from 'react';
import {getPosition} from '../utils/card';

export default class Card extends Component {

   render() {
      const image = 'url("deck/' + this.props.suit + this.props.value + '.png")';
      const position = getPosition(this.props.index);
      const style = {backgroundImage: image, ...position};

      return (
         <div className="card" onClick={this.move} style={style}></div>
      );
   }

   move = ev => {
      ev.preventDefault();
      this.props.onMove(this.props.index, 0);
   };

}

Card.propTypes = {
   suit: PropTypes.string.isRequired,
   value: PropTypes.number.isRequired,
   index: PropTypes.number.isRequired,
   onMove: PropTypes.func.isRequired
};