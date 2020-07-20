import React from 'react';
import { connect } from 'react-redux';
import { useIntl, FormattedMessage } from 'react-intl';
import { newRound } from '../actions/game';
import Modal from './modal';
import Summary from './summary';

const RoundOver = ({ round, newRound }) => {
  const intl = useIntl();
  const title = intl.formatMessage({ id: 'roundover.title', defaultMessage: 'End of round {round}' }, { round });

  return (
    <Modal title={title} onClose={newRound}>
      <article className="center">
        <p>
          <FormattedMessage id="roundover.description" defaultMessage="No more moves can be done, the cards are being reshuffled..." />
        </p>
        <Summary />
        <div className="cta">
          <button type="button" onClick={newRound}>
            <FormattedMessage id="game.nextround" defaultMessage="Next round" />
          </button>
        </div>
      </article>
    </Modal>
  );
};

const mapStateToProps = (state) => {
  const { game } = state;

  return {
    round: game.get('round')
  };
};

const mapDispatchToProps = dispatch => ({
  newRound: () => dispatch(newRound())
});

export default connect(mapStateToProps, mapDispatchToProps)(RoundOver);
