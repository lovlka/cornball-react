import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { newRound } from '../actions/game';
import Modal from './modal';
import Summary from './summary';

const RoundOver = ({ round, newRound }, { intl }) => {
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

RoundOver.contextTypes = {
  intl: PropTypes.object.isRequired
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
