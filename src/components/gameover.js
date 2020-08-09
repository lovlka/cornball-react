import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useIntl, FormattedMessage } from 'react-intl';
import { newGame } from '../actions/game';
import { gameLost } from '../actions/statistics';
import Modal from './modal';
import Summary from './summary';

const GameOver = () => {
  const dispatch = useDispatch();
  const onNewGame = () => dispatch(newGame());

  useEffect(() => dispatch(gameLost()), []);

  const intl = useIntl();
  const title = intl.formatMessage({ id: 'gameover.title', defaultMessage: 'Game over' });

  return (
    <Modal title={title} onClose={onNewGame}>
      <article className="center">
        <p>
          <FormattedMessage id="gameover.description" defaultMessage="You failed to complete The Cornball!" />
        </p>
        <Summary />
        <div className="cta">
          <button type="button" onClick={onNewGame}>
            <FormattedMessage id="game.playagain" defaultMessage="Play again" />
          </button>
        </div>
      </article>
    </Modal>
  );
};

export default GameOver;
