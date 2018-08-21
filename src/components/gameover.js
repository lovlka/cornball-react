import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { newGame } from '../actions/game';
import { gameLost } from '../actions/statistics';
import Modal from './modal';

class GameOver extends Component {
  static propTypes = {
    moves: PropTypes.number.isRequired,
    round: PropTypes.number.isRequired,
    rounds: PropTypes.number.isRequired,
    score: PropTypes.number.isRequired
  };

  componentDidMount() {
    this.props.gameLost();
  }

  render() {
    const { moves, round, rounds, score } = this.props;
    const title = this.context.intl.formatMessage({ id: 'gameover.title', defaultMessage: 'Game over' });

    return (
      <Modal title={title} onClose={this.props.newGame}>
        <article>
          <p>
            <FormattedMessage id="gameover.description" defaultMessage="You failed to complete The Cornball!" />
          </p>
          <p>
            <FormattedMessage id="game.round" defaultMessage="Round: {round, number}/{rounds, number}" values={{ round, rounds }} />
            <br />
            <FormattedMessage id="game.score" defaultMessage="Score: {score, number}" values={{ score }} />
            <br />
            <FormattedMessage id="game.moves" defaultMessage="Moves: {moves, number}" values={{ moves }} />
          </p>
        </article>
      </Modal>
    );
  }
}

GameOver.contextTypes = {
  intl: PropTypes.object.isRequired
};

const mapStateToProps = (state) => {
  const { game } = state;

  return {
    moves: game.get('moves'),
    round: game.get('round'),
    rounds: game.get('rounds'),
    score: game.get('score')
  };
};

const mapDispatchToProps = dispatch => ({
  gameLost: () => {
    dispatch(gameLost());
  },
  newGame: () => {
    dispatch(newGame());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(GameOver);
