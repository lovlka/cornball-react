import React, { Component } from 'react';
import { connect } from 'react-redux';
import { injectIntl, FormattedMessage } from 'react-intl';
import { newGame } from '../actions/game';
import { gameLost } from '../actions/statistics';
import Modal from './modal';
import Summary from './summary';

class GameOver extends Component {
  componentDidMount() {
    this.props.gameLost();
  }

  render() {
    const { intl } = this.props;
    const title = intl.formatMessage({ id: 'gameover.title', defaultMessage: 'Game over' });

    return (
      <Modal title={title} onClose={this.props.newGame}>
        <article className="center">
          <p>
            <FormattedMessage id="gameover.description" defaultMessage="You failed to complete The Cornball!" />
          </p>
          <Summary />
          <div className="cta">
            <button type="button" onClick={this.props.newGame}>
              <FormattedMessage id="game.playagain" defaultMessage="Play again" />
            </button>
          </div>
        </article>
      </Modal>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  gameLost: () => dispatch(gameLost()),
  newGame: () => dispatch(newGame())
});

export default injectIntl(connect(null, mapDispatchToProps)(GameOver));
