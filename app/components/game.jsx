import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import {moveCard} from "../actions/game";
import Card from './card';
import Gap from './gap';

class Game extends Component {

   render() {
      return (
         <section id="deck">
            {this.props.deck.map((card, index) => {
               return card.get('value') > 1 ?
                  <Card key={index} index={index} card={card} onMove={this.onCardMove} /> :
                  <Gap key={index} index={index} onClick={this.onGapClick} />
            })}
         </section>
      );
   }

   onGapClick = (index) => {
      console.log('hint card', index);
   };

   onCardMove = (from, to) => {
      console.log('move card', from, to);
      this.props.onMove(from, to);
   };

}

Game.propTypes = {
   deck: PropTypes.object.isRequired
};

const mapDispatchToProps = (dispatch) => {
   return {
      onMove: function(from, to) {
         dispatch(moveCard(from, to));
      }
   };
};

const mapStateToProps = (state) => {
   const {deck} = state;

   return {
      deck: deck
   };
};

export default connect(mapStateToProps, mapDispatchToProps)(Game);