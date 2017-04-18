import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { newGame } from '../actions/game';
import { gameWon } from '../actions/statistics';
import { getHighScores, saveHighScore } from '../actions/highscore';
import Modal from './modal';

class GameWin extends Component {
   constructor(props) {
      super(props);

      this.state = this.getDateState(new Date());
   }

   getDateState(date) {
      const year = date.getFullYear(),
         month = date.getMonth();

      return {
         name: '',
         startDate: new Date(year, month, 1),
         endDate: new Date(year, month + 1, 0)
      };
   }

   componentDidMount() {
      this.props.gameWon(this.props.round);
      this.props.getHighScores(this.state.startDate, this.state.endDate);
   }

   render() {
      const {moves, round, rounds, score} = this.props;
      const title = this.context.intl.formatMessage({id: 'gamewin.title', defaultMessage: 'Congratulations!'});
      const placeholder = this.context.intl.formatMessage({id: 'gamewin.placeholder', defaultMessage: 'Enter your name'});

      return (
         <Modal title={title} onClose={this.props.newGame}>
            <article>
               <p>
                  <FormattedMessage id="gamewin.description" defaultMessage="You put all cards on the right place and finished The Cornball!" />
               </p>
               <p>
                  <FormattedMessage id="game.round" defaultMessage="Round: {round, number}/{rounds, number}" values={{ round, rounds }} /><br />
                  <FormattedMessage id="game.score" defaultMessage="Score: {score, number}" values={{ score }} /><br />
                  <FormattedMessage id="game.moves" defaultMessage="Moves: {moves, number}" values={{ moves }} />
               </p>
               {this.isHighScore() ?
                  <div>
                     <FormattedMessage id="gamewin.highscore" defaultMessage="You made it to the high score list! Enter your name to send your score." />
                     <form onSubmit={this.submitHighScore}>
                        <input type="text" placeholder={placeholder} onChange={this.nameChanged} value={this.state.name} />
                        <button type="submit"><FormattedMessage id="gamewin.submit" defaultMessage="Submit" /></button>
                     </form>
                  </div> :
                  <div>
                     <FormattedMessage id="gamewin.nohighscore" defaultMessage="Unfortunately you did not set a high score this time." />
                  </div>
               }
            </article>
         </Modal>
      );
   }

   isHighScore() {
      const {score, highScores} = this.props;

      if(highScores.size < 10) {
         return true;
      }
      let highScore = false;
      highScores.map(item => {
         if(score > item.get('value')) {
            highScore = true;
         }
      });
      return highScore;
   }

   nameChanged = ev => {
      this.setState({ name: ev.target.value });
   };

   submitHighScore = ev => {
      ev.preventDefault();
      this.props.saveHighScore(this.state.name, this.props.score);
      this.props.newGame();
   };
}

GameWin.contextTypes = {
   intl: PropTypes.object.isRequired
};

GameWin.propTypes = {
   moves: PropTypes.number.isRequired,
   round: PropTypes.number.isRequired,
   rounds: PropTypes.number.isRequired,
   score: PropTypes.number.isRequired
};

const mapStateToProps = (state) => {
   const {app, game} = state;

   return {
      moves: game.get('moves'),
      round: game.get('round'),
      rounds: game.get('rounds'),
      score: game.get('score'),
      highScores: app.get('highScores')
   };
};

const mapDispatchToProps = (dispatch) => {
   return {
      getHighScores: (start, end) => {
         dispatch(getHighScores(start.toISOString().substring(0, 10), end.toISOString().substring(0, 10)));
      },
      gameWon: (round) => {
         dispatch(gameWon(round));
      },
      saveHighScore: (name, value) => {
         dispatch(saveHighScore(name, value));
      },
      newGame: () => {
         dispatch(newGame());
      }
   };
};

export default connect(mapStateToProps, mapDispatchToProps)(GameWin);