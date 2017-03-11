import React, { Component, PropTypes } from 'react';

export default class Card extends Component {

   render() {
      const image = 'url("deck/' + this.props.suit + this.props.value + '.png")';
      const position = this.getPosition();
      const style = {backgroundImage: image, ...position};

      return (
         <div className="card" onClick={this.move} style={style}></div>
      );
   }

   move = ev => {
      ev.preventDefault();
      this.props.onMove(this.props.index, 0);
   };

   getPosition() {
      const index = this.props.index;
      const width = 100 / 13;
      const height = 100 / 4;
      const row = Math.floor(index / 13);
      const column = index - (row * 13);
      const positionY = row * height;
      const positionX = column * width;
      return { top: positionY + '%', left: positionX + '%' };
   }

}

Card.propTypes = {
   suit: PropTypes.string.isRequired,
   value: PropTypes.number.isRequired,
   onMove: PropTypes.func.isRequired
};