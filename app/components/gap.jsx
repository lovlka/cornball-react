import React, { Component, PropTypes } from 'react';
import classSet from 'react-classset';
import ReactDOM from 'react-dom';
import interact from 'interactjs';

export default class Gap extends Component {
   constructor(props) {
      super(props);
      this.state = this.makeInitialState();
   }

   makeInitialState() {
      return {
         highlight: false
      };
   }

   render() {
      let className = classSet({
         'gap': true,
         'highlight': this.state.highlight
      });
      return (
         <div className={className} />
      );
   }

   componentDidMount() {
      const element = ReactDOM.findDOMNode(this);
      this.interact = interact(element);
      this.interact.index = this.props.index;
      this.interact.dropzone({
            overlap: 0.1,
            ondragenter: this.highlightGap,
            ondragleave: this.unHighlightGap,
            ondrop: this.unHighlightGap
         })
         .on('tap', this.tap)
         .styleCursor(false);
   }

   componentWillUnmount() {
      if(this.interact){
         this.interact.unset();
      }
   }

   highlightGap = ev => {
      this.setState({ highlight: true });
   };

   unHighlightGap = ev => {
      this.setState({ highlight: false });
   };

   tap = ev => {
      this.props.onClick(this.props.index);
   };
}

Gap.propTypes = {
   index: PropTypes.number.isRequired,
   onClick: PropTypes.func.isRequired
};