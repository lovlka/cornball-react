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
               const {suit, value} = card.toJS();

               return value > 1 ?
                  <Card key={index} index={index} suit={suit} value={value} onMove={this.onMove} /> :
                  <Gap key={index} index={index} />
            })}
         </section>
      );
   }

   onMove = (from, to) => {
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