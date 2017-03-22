import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import {autoMoveCard, showHint} from "../actions/game";
import Card from './card';
import Gap from './gap';

class Game extends Component {
   render() {
      return (
         <section id="deck">
            {this.props.deck.map((card, index) => {
               return card.get('value') > 1 ?
                  <Card key={index} index={index} card={card} onClick={this.onCardClick} /> :
                  <Gap key={index} index={index} onClick={this.onGapClick} />
            })}
         </section>
      );
   }

   onGapClick = (index) => {
      this.props.showHint(index);
   };

   onCardClick = (index) => {
      this.props.autoMoveCard(index);
   };
}

Game.propTypes = {
   deck: PropTypes.object.isRequired
};

const mapDispatchToProps = (dispatch) => {
   return {
      autoMoveCard: function(index) {
         dispatch(autoMoveCard(index));
      },
      showHint: function(index) {
         dispatch(showHint(index));
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