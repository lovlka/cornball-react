import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useIntl, FormattedMessage } from 'react-intl';
import { getGameState } from '../helpers/selectors';
import { newRound } from '../actions/game';
import Modal from './modal';
import Summary from './summary';

const RoundOver = () => {
  const { round } = useSelector(getGameState);

  const dispatch = useDispatch();
  const onNewRound = () => dispatch(newRound());

  const intl = useIntl();
  const title = intl.formatMessage({ id: 'roundover.title', defaultMessage: 'End of round {round}' }, { round });

  return (
    <Modal title={title} onClose={onNewRound}>
      <article className="center">
        <p>
          <FormattedMessage id="roundover.description" defaultMessage="No more moves can be done, the cards are being reshuffled..." />
        </p>
        <Summary />
        <div className="cta">
          <button type="button" onClick={onNewRound}>
            <FormattedMessage id="game.nextround" defaultMessage="Next round" />
          </button>
        </div>
      </article>
    </Modal>
  );
};

export default RoundOver;
