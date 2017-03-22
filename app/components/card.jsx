import React, { Component, PropTypes } from 'react';
import classSet from 'react-classset';
import ReactDOM from 'react-dom';
import interact from 'interactjs';

export default class Card extends Component {
   constructor(props) {
      super(props);
      this.state = this.makeInitialState();
   }

   makeInitialState() {
      return {
         dragging: false,
         dragX: 0,
         dragY: 0
      };
   }

   render() {
      const {dragging, dragX, dragY} = this.state;
      const {suit, value, roundPlaced, showHint} = this.props.card.toJS();

      const image = 'deck/' + suit + value + '.png';
      const style = {transform: 'translate(' + dragX + 'px, ' + dragY + 'px)'};
      const className = classSet({
         'card': true,
         'dragging': dragging,
         'placed': roundPlaced,
         'animated tada': showHint
      });

      return (
         <div className={className} style={style}>
            <img src={image} />
         </div>
      );
   }

   componentDidMount() {
      const element = ReactDOM.findDOMNode(this);
      this.interact = interact(element)
         .draggable({
            onstart: this.dragStart,
            onmove: this.dragMove,
            onend: this.dragEnd
         })
         .on('doubletap', this.doubleTap)
         .styleCursor(false);
   }

   componentWillUnmount() {
      if(this.interact){
         this.interact.unset();
      }
   }

   dragStart = ev => {
      this.setState({ dragging: true });
   };

   dragMove = ev => {
      this.setState({
         dragX: this.state.dragX + ev.dx,
         dragY: this.state.dragY + ev.dy
      });
   };

   dragEnd = ev => {
      if(ev.dropzone === undefined) {
         this.setState({ dragging: false });
      }
      this.setState(this.makeInitialState());
   };

   doubleTap = ev => {
      ev.preventDefault();
      this.props.onClick(this.props.index);
   };
}

Card.propTypes = {
   card: PropTypes.object.isRequired,
   index: PropTypes.number.isRequired,
   onClick: PropTypes.func.isRequired
};