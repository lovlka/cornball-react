import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { newRound } from '../actions/game';
import Modal from './modal';

class RoundOver extends Component {

   render() {
      const {moves, round, score} = this.props;

      return (
         <Modal title="Round over" dismiss="Close" onClose={this.props.newRound}>
            <article>
               <p>No more moves can be done, the cards are being reshuffled...</p>
               <p>
                  <FormattedMessage id="nav.score" defaultMessage="Score: {score, number}" values={{ score }} /><br />
                  <FormattedMessage id="nav.round" defaultMessage="Round: {round, number}" values={{ round }} /><br />
                  <FormattedMessage id="nav.moves" defaultMessage="Moves: {moves, number}" values={{ moves }} />
               </p>
            </article>
         </Modal>
      );
   }

}

RoundOver.propTypes = {
   moves: PropTypes.number.isRequired,
   round: PropTypes.number.isRequired,
   score: PropTypes.number.isRequired
};

const mapStateToProps = (state) => {
   const {game} = state;

   return {
      moves: game.get('moves'),
      round: game.get('round'),
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