import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { injectIntl, FormattedMessage } from 'react-intl';
import { newGame } from '../actions/game';
import { gameWon } from '../actions/statistics';
import { getHighScores, saveHighScore } from '../actions/highscore';
import Modal from './modal';
import Summary from './summary';

class GameWin extends Component {
  constructor(props) {
    super(props);

    const period = new Date();
    period.setDate(1);

    this.state = {
      name: '',
      period
    };
  }

  componentDidMount() {
    this.props.gameWon(this.props.round);
    this.props.getHighScores(this.state.period);
  }

  isHighScore = () => {
    const { score, highScores } = this.props;

    if (highScores.size < 10) {
      return true;
    }
    let highScore = false;
    highScores.forEach((item) => {
      if (score > item.get('value')) {
        highScore = true;
      }
    });
    return highScore;
  };

  nameChanged = (ev) => {
    this.setState({ name: ev.target.value });
  };

  submitHighScore = (ev) => {
    ev.preventDefault();
    this.props.saveHighScore(this.state.name, this.props.score);
    this.props.newGame();
  };

  render() {
    const { intl } = this.props;
    const title = intl.formatMessage({ id: 'gamewin.title', defaultMessage: 'Congratulations!' });
    const placeholder = intl.formatMessage({ id: 'gamewin.placeholder', defaultMessage: 'Enter your name' });

    return (
      <Modal title={title} onClose={this.props.newGame}>
        <article className="center">
          <p>
            <FormattedMessage id="gamewin.description" defaultMessage="You put all cards in the right place and finished The Cornball!" />
          </p>
          <Summary />
          {this.isHighScore() ? (
            <Fragment>
              <FormattedMessage id="gamewin.highscore" defaultMessage="You made it to the high score list! Enter your name to send your score." />
              <form onSubmit={this.submitHighScore}>
                <input type="text" placeholder={placeholder} onChange={this.nameChanged} value={this.state.name} />
                <button type="submit"><FormattedMessage id="gamewin.submit" defaultMessage="Submit" /></button>
              </form>
            </Fragment>
          ) : (
            <div className="cta">
              <button type="button" onClick={this.props.newGame}>
                <FormattedMessage id="game.playagain" defaultMessage="Play again" />
              </button>
            </div>
          )}
        </article>
      </Modal>
    );
  }
}

const mapStateToProps = (state) => {
  const { app, game } = state;

  return {
    highScores: app.get('highScores'),
    score: game.get('score'),
    round: game.get('round')
  };
};

const mapDispatchToProps = dispatch => ({
  getHighScores: period => dispatch(getHighScores(period)),
  gameWon: round => dispatch(gameWon(round)),
  saveHighScore: (name, score) => dispatch(saveHighScore(name, score)),
  newGame: () => dispatch(newGame())
});

export default injectIntl(connect(mapStateToProps, mapDispatchToProps)(GameWin));
