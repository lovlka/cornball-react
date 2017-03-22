import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import interact from 'interactjs';

export default class Gap extends Component {
   constructor(props) {
      super(props);

      this.state = this.makeInitialState(props);
   }

   makeInitialState(props) {
      return {
         highlight: false
      };
   }

   render() {
      let className = 'gap';
      if(this.state.highlight) { className += ' highlight'; }

      return (
         <div className={className} />
      );
   }

   componentDidMount() {
      const element = ReactDOM.findDOMNode(this);
      this.interact = interact(element).dropzone({
         overlap: 0.1,
         ondragenter: this.highlightGap,
         ondragleave: this.unhighlightGap,
         ondrop: this.cardDrop
      }).on('tap', this.tap);
   }

   componentWillUnmount() {
      if(this.interact){
         this.interact.unset();
      }
   }

   highlightGap = ev => {
      this.setState({ highlight: true });
   };

   unhighlightGap = ev => {
      this.setState({ highlight: false });
   };

   cardDrop = ev => {
      //this.publishEvent('card:dropped', this.model);
      this.unhighlightGap(ev);
   };

   tap = ev => {
      ev.preventDefault();
      this.props.onClick(this.props.index);
   }
}

Gap.propTypes = {
   index: PropTypes.number.isRequired,
   onClick: PropTypes.func.isRequired
};