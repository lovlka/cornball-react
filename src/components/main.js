import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Helmet } from 'react-helmet';
import { useIntl } from 'react-intl';

import { ROWS, CARDS } from '../helpers/deck';
import { newGame } from '../actions/game';
import { fetchHighScore } from '../actions/highscore';
import { toggleAbout, toggleHighScore, toggleStatistics } from '../actions/app';
import { getGameState } from '../helpers/selectors';

import Nav from './nav';
import Game from './game';
import GameWin from './gamewin';
import GameOver from './gameover';
import RoundOver from './roundover';
import HighScore from './highscore';
import Statistics from './statistics';
import About from './about';

const Main = () => {
  const intl = useIntl();
  const dispatch = useDispatch();

  const { round, rounds, locked, placed } = useSelector(getGameState);
  const showHighScore = useSelector(({ app }) => app.get('showHighScore'));
  const showStatistics = useSelector(({ app }) => app.get('showStatistics'));
  const showAbout = useSelector(({ app }) => app.get('showAbout'));

  useEffect(() => {
    dispatch(fetchHighScore());
    dispatch(newGame());
  }, []);

  const onHideHighScore = () => dispatch(toggleHighScore(false));
  const onHideStatistics = () => dispatch(toggleStatistics(false));
  const onHideAbout = () => dispatch(toggleAbout(false));

  const isLocked = locked === ROWS;
  const isGameWin = isLocked && placed === CARDS;
  const isGameOver = isLocked && !isGameWin && round === rounds;
  const isRoundOver = isLocked && !isGameWin && round < rounds;

  const title = intl.formatMessage({ id: 'main.title', defaultMessage: 'The Cornball' });
  const description = intl.formatMessage({ id: 'main.description', defaultMessage: 'The Cornball is an addictive card game where the goal is to place the cards in order from 2 to king in 4 rows.' });

  return (
    <main>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
      </Helmet>
      <Nav />
      <Game />
      {isGameWin && <GameWin />}
      {isGameOver && <GameOver />}
      {isRoundOver && <RoundOver />}
      {showHighScore && <HighScore onClose={onHideHighScore} />}
      {showStatistics && <Statistics onClose={onHideStatistics} />}
      {showAbout && <About onClose={onHideAbout} />}
    </main>
  );
};

export default Main;
