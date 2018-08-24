import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { newRound } from '../actions/game';
import Modal from './modal';

class RoundOver extends Component {
  static propTypes = {
    moves: PropTypes.number.isRequired,
    round: PropTypes.number.isRequired,
    score: PropTypes.number.isRequired
  };

  render() {
    const { moves, round, score } = this.props;
    const title = this.context.intl.formatMessage({ id: 'roundover.title', defaultMessage: 'End of round {round}' }, { round });

    return (
      <Modal title={title} onClose={this.props.newRound}>
        <article className="center">
          <p>
            <FormattedMessage id="roundover.description" defaultMessage="No more moves can be done, the cards are being reshuffled..." />
          </p>
          <p className="score">
            <FormattedMessage id="game.score" defaultMessage="Score: {score, number}" values={{ score }} />
          </p>
          <p className="moves">
            <FormattedMessage id="game.moves" defaultMessage="Moves: {moves, number}" values={{ moves }} />
          </p>
          <div className="cta">
            <button type="button" onClick={this.props.newRound}>
              <FormattedMessage id="game.nextround" defaultMessage="Next round" />
            </button>
          </div>
        </article>
      </Modal>
    );
  }
}

RoundOver.contextTypes = {
  intl: PropTypes.object.isRequired
};

const mapStateToProps = (state) => {
  const { game } = state;

  return {
    moves: game.get('moves'),
    round: game.get('round'),
    score: game.get('score')
  };
};

const mapDispatchToProps = dispatch => ({
  newRound: () => {
    dispatch(newRound());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(RoundOver);
