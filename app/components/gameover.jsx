import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { newGame } from '../actions/game';
import { gameLost } from '../actions/statistics';
import Modal from './modal';

class GameOver extends Component {

   componentDidMount() {
      this.props.gameLost();
   }

   render() {
      const {moves, score} = this.props;

      return (
         <Modal title="Game over" dismiss="Close" onClose={this.props.newGame}>
            <article>
               <p>You failed to complete The Cornball!</p>
               <p>
                  <FormattedMessage id="nav.score" defaultMessage="Score: {score, number}" values={{ score }} /><br />
                  <FormattedMessage id="nav.moves" defaultMessage="Moves: {moves, number}" values={{ moves }} />
               </p>
            </article>
         </Modal>
      );
   }

}

GameOver.propTypes = {
   moves: PropTypes.number.isRequired,
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
      gameLost: () => {
         dispatch(gameLost());
      },
      newGame: () => {
         dispatch(newGame());
      }
   };
};

export default connect(mapStateToProps, mapDispatchToProps)(GameOver);