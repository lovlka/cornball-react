import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';

import { newGame } from '../actions/game';
import { getHighScore } from '../actions/highscore';

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
    const { round, rounds, locked, placed } = this.props;

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
        <Route path="/highscore" component={HighScore} />
        <Route path="/statistics" component={Statistics} />
        <Route path="/about" component={About} />
      </main>
    );
  }
}

const mapStateToProps = (state) => {
  const { game } = state;

  return {
    round: game.get('round'),
    rounds: game.get('rounds'),
    locked: game.get('locked'),
    placed: game.get('placed')
  };
};

const mapDispatchToProps = dispatch => ({
  getHighScore: () => {
    dispatch(getHighScore());
  },
  newGame: () => {
    dispatch(newGame());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Main);
