import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Card from './card';
import Gap from './gap';

class Game extends Component {

   render() {
      return (
         <section id="deck">
            {this.props.deck.map(card => {
               const {suit, value} = card.toJS();
               const key = suit + value.toString();

               return value > 1 ?
                  <Card key={key} suit={suit} value={value} /> :
                  <Gap key={key} />
            })}
         </section>
      );
   }

}

Game.propTypes = {
   deck: PropTypes.object.isRequired
};

const mapStateToProps = (state) => {
   const {deck} = state;

   return {
      deck: deck
   };
};

export default connect(mapStateToProps)(Game);