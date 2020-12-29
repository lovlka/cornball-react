import React, { Fragment, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useIntl, FormattedMessage } from 'react-intl';
import { newGame } from '../actions/game';
import { gameWon } from '../actions/statistics';
import { fetchHighScores, saveHighScore } from '../actions/highscore';
import { getGameState, getHighScores } from '../helpers/selectors';
import Modal from './modal';
import Summary from './summary';
import Loader from './loader';

const GameWin = () => {
  const intl = useIntl();
  const dispatch = useDispatch();

  const { score, round } = useSelector(getGameState);
  const highScores = useSelector(getHighScores);
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const period = new Date();
    period.setDate(1);

    dispatch(gameWon(round));
    dispatch(fetchHighScores(period))
      .then(() => setLoading(false));
  }, []);

  const onNewGame = () => dispatch(newGame());
  const onNameChange = ev => setName(ev.target.value);

  const submitHighScore = (ev) => {
    ev.preventDefault();
    dispatch(saveHighScore(name, score));
    dispatch(newGame());
  };

  let highScore = false;
  if (highScores.length < 10) {
    highScore = true;
  } else {
    highScores.forEach((item) => {
      if (score > item.score) {
        highScore = true;
      }
    });
  }

  const title = intl.formatMessage({ id: 'gamewin.title', defaultMessage: 'Congratulations!' });
  const placeholder = intl.formatMessage({ id: 'gamewin.placeholder', defaultMessage: 'Enter your name' });

  return (
    <Modal title={title} onClose={onNewGame}>
      <article className="center">
        <p>
          <FormattedMessage id="gamewin.description" defaultMessage="You put all cards in the right place and finished The Cornball!" />
        </p>
        <Summary />
        {loading && <Loader />}
        {!loading && highScore && (
          <Fragment>
            <FormattedMessage id="gamewin.highscore" defaultMessage="You made it to the high score list! Enter your name to send your score." />
            <form onSubmit={submitHighScore}>
              <input type="text" placeholder={placeholder} onChange={onNameChange} value={name} />
              <button type="submit"><FormattedMessage id="gamewin.submit" defaultMessage="Submit" /></button>
            </form>
          </Fragment>
        )}
        {!loading && !highScore && (
          <div className="cta">
            <p>
              <FormattedMessage id="gamewin.nohighscore" defaultMessage="Unfortunately you did not get a high score this time." />
            </p>
            <button type="button" onClick={onNewGame}>
              <FormattedMessage id="game.playagain" defaultMessage="Play again" />
            </button>
          </div>
        )}
      </article>
    </Modal>
  );
};

export default GameWin;
