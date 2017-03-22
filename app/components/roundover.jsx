import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { newRound } from '../actions/game';
import Modal from './modal';

class RoundOver extends Component {
   render() {
      const {moves, round, rounds, score} = this.props;
      const title = this.context.intl.formatMessage({id: 'roundover.title', defaultMessage: 'Round over'});

      return (
         <Modal title={title} onClose={this.props.newRound}>
            <article>
               <p>
                  <FormattedMessage id="roundover.description" defaultMessage="No more moves can be done, the cards are being reshuffled..." />
               </p>
               <p>
                  <FormattedMessage id="game.round" defaultMessage="Round: {round, number}/{rounds, number}" values={{ round, rounds }} /><br />
                  <FormattedMessage id="game.score" defaultMessage="Score: {score, number}" values={{ score }} /><br />
                  <FormattedMessage id="game.moves" defaultMessage="Moves: {moves, number}" values={{ moves }} />
               </p>
            </article>
         </Modal>
      );
   }
}

RoundOver.contextTypes = {
   intl: PropTypes.object.isRequired
};

RoundOver.propTypes = {
   moves: PropTypes.number.isRequired,
   round: PropTypes.number.isRequired,
   rounds: PropTypes.number.isRequired,
   score: PropTypes.number.isRequired
};

const mapStateToProps = (state) => {
   const {game} = state;

   return {
      moves: game.get('moves'),
      round: game.get('round'),
      rounds: game.get('rounds'),
      score: game.get('score')
   };
};

const mapDispatchToProps = (dispatch) => {
   return {
      newRound: () => {
         dispatch(newRound());
      }
   };
};

export default connect(mapStateToProps, mapDispatchToProps)(RoundOver);