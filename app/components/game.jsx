import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import {autoMoveCard, showHint} from "../actions/game";
import Card from './card';
import Gap from './gap';

class Game extends Component {
   render() {
      return (
         <section id="deck">
            {this.renderRow(0, this.props.deck.take(13))}
            {this.renderRow(1, this.props.deck.skip(13).take(13))}
            {this.renderRow(2, this.props.deck.skip(26).take(13))}
            {this.renderRow(3, this.props.deck.skip(39).take(13))}
         </section>
      );
   }

   renderRow(row, cards) {
      return (
         <section className="row">
            {cards.map((card, index) => {
               return this.renderItem(card, (row * 13) + index);
            })}
         </section>
      );
   }

   renderItem(card, index) {
      return card.get('value') > 1 ?
         <Card key={index} index={index} card={card} onClick={this.onCardClick} /> :
         <Gap key={index} index={index} onClick={this.onGapClick} />
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