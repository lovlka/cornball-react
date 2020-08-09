import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useIntl, FormattedMessage } from 'react-intl';
import { getGameState, canUndo, getHighScore } from '../helpers/selectors';
import { toggleHighScore, toggleStatistics, toggleAbout } from '../actions/app';
import { newGame, undoMove } from '../actions/game';
import Icon, { paths } from './icon';

const NavItem = ({ id, defaultMessage, action, disabled }) => {
  const intl = useIntl();
  const title = intl.formatMessage({ id: `nav.${id}`, defaultMessage });

  return (
    <li>
      <button type="button" className={disabled ? 'disabled' : ''} title={title} onClick={action}>
        <Icon path={paths[id]} />
      </button>
    </li>
  );
};

const NavItems = () => {
  const dispatch = useDispatch();
  const undoDisabled = !useSelector(canUndo);

  return (
    <ul>
      <NavItem id="newgame" defaultMessage="Start new game" action={() => dispatch(newGame())} />
      <NavItem id="undomove" defaultMessage="Undo last move" action={() => dispatch(undoMove())} disabled={undoDisabled} />
      <NavItem id="highscore" defaultMessage="High score" action={() => dispatch(toggleHighScore(true))} />
      <NavItem id="statistics" defaultMessage="Statistics" action={() => dispatch(toggleStatistics(true))} />
      <NavItem id="about" defaultMessage="About" action={() => dispatch(toggleAbout(true))} />
    </ul>
  );
};

const GameState = () => {
  const { moves, round, rounds, score } = useSelector(getGameState);

  return (
    <section className="score">
      <span><FormattedMessage id="game.round" defaultMessage="Round: {round, number}/{rounds, number}" values={{ round, rounds }} /></span>
      <span><FormattedMessage id="game.score" defaultMessage="Score: {score, number}" values={{ score }} /></span>
      <span><FormattedMessage id="game.moves" defaultMessage="Moves: {moves, number}" values={{ moves }} /></span>
    </section>
  );
};

const HighScore = () => {
  const intl = useIntl();
  const highScore = useSelector(getHighScore);

  if (!highScore) {
    return null;
  }

  const { name, score, date } = highScore;
  const month = intl.formatDate(new Date(date), { month: 'long' });

  return (
    <section className="highscore">
      <FormattedMessage
        id="game.highscore"
        defaultMessage="High score in {month}: {name} ({score, number})"
        values={{ month, name, score }}
      />
    </section>
  );
};

const Nav = () => (
  <nav>
    <NavItems />
    <GameState />
    <HighScore />
  </nav>
);

export default Nav;
