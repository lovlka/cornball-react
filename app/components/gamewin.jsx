import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { newGame } from '../actions/game';
import { gameWon } from '../actions/statistics';
import Modal from './modal';

class GameWin extends Component {

   componentDidMount() {
      this.props.gameWon(this.props.round);
   }

   render() {
      const {moves, round, score} = this.props;

      return (
         <Modal title="Congratulations!" dismiss="Close" onClose={this.props.newGame}>
            <article>
               <p><FormattedMessage id="gamewin.description" defaultMessage="You put all cards on the right place and finished The Cornball!" /></p>
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

GameWin.propTypes = {
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
      gameWon: (round) => {
         dispatch(gameWon(round));
      },
      newGame: () => {
         dispatch(newGame());
      }
   };
};

export default connect(mapStateToProps, mapDispatchToProps)(GameWin);