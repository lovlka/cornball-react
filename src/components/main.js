import React, { Component } from 'react';
import { connect } from 'react-redux';

import { newGame } from '../actions/game';
import { getHighScore } from '../actions/highscore';
import { toggleAbout, toggleHighScore, toggleStatistics } from '../actions/app';

import Nav from './nav';
import Game from './game';
import GameWin from './gamewin';
import GameOver from './gameover';
import RoundOver from './roundover';
import HighScore from './highscore';
import Statistics from './statistics';
import About from './about';

class Main extends Component {
  componentDidMount() {
    this.props.getHighScore();
    this.props.newGame();
  }

  render() {
    const {
      round, rounds, locked, placed, showHighScore, showStatistics,
      showAbout, hideHighScore, hideStatistics, hideAbout
    } = this.props;

    const isLocked = locked === 4;
    const isGameWin = isLocked && placed === 48;
    const isGameOver = isLocked && !isGameWin && round === rounds;
    const isRoundOver = isLocked && !isGameWin && round < rounds;

    return (
      <main>
        <Nav />
        <Game />
        {isGameWin && <GameWin />}
        {isGameOver && <GameOver />}
        {isRoundOver && <RoundOver />}
        {showHighScore && <HighScore onClose={hideHighScore} />}
        {showStatistics && <Statistics onClose={hideStatistics} />}
        {showAbout && <About onClose={hideAbout} />}
      </main>
    );
  }
}

const mapStateToProps = (state) => {
  const { app, game } = state;

  return {
    round: game.get('round'),
    rounds: game.get('rounds'),
    locked: game.get('locked'),
    placed: game.get('placed'),
    showHighScore: app.get('showHighScore'),
    showStatistics: app.get('showStatistics'),
    showAbout: app.get('showAbout')
  };
};

const mapDispatchToProps = dispatch => ({
  getHighScore: () => dispatch(getHighScore()),
  newGame: () => dispatch(newGame()),
  hideHighScore: () => dispatch(toggleHighScore(false)),
  hideStatistics: () => dispatch(toggleStatistics(false)),
  hideAbout: () => dispatch(toggleAbout(false))
});

export default connect(mapStateToProps, mapDispatchToProps)(Main);
