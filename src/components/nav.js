import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { toggleHighScore, toggleStatistics, toggleAbout } from '../actions/app';
import { newGame, undoMove } from '../actions/game';


class Nav extends Component {
  static propTypes = {
    round: PropTypes.number.isRequired,
    rounds: PropTypes.number.isRequired,
    score: PropTypes.number.isRequired,
    moves: PropTypes.number.isRequired,
    highScore: PropTypes.object,
    canUndo: PropTypes.bool.isRequired
  };

  renderMenu() {
    const { newGame, undoMove, canUndo, showHighScore, showStatistics, showAbout } = this.props;

    return (
      <ul>
        <li>{this.renderButton('newgame', 'refresh', 'Start new game', newGame)}</li>
        <li>{this.renderButton('undomove', 'reply', 'Undo last move', undoMove, !canUndo)}</li>
        <li>{this.renderButton('highscore', 'star', 'High score', showHighScore)}</li>
        <li>{this.renderButton('statistics', 'pie-chart', 'Statistics', showStatistics)}</li>
        <li>{this.renderButton('about', 'question', 'About', showAbout)}</li>
      </ul>
    );
  }

  renderButton(id, icon, defaultMessage, action, disabled) {
    const iconClass = `fa fa-${icon}`;
    const title = this.context.intl.formatMessage({ id: `nav.${id}`, defaultMessage });
    const className = disabled ? 'disabled' : '';

    return <button type="button" className={className} title={title} onClick={action}><i className={iconClass} /></button>;
  }

  renderScore() {
    const { round, rounds, score, moves } = this.props;

    return (
      <section className="score">
        <FormattedMessage id="game.round" defaultMessage="Round: {round, number}/{rounds, number}" values={{ round, rounds }} />
        <FormattedMessage id="game.score" defaultMessage="Score: {score, number}" values={{ score }} />
        <FormattedMessage id="game.moves" defaultMessage="Moves: {moves, number}" values={{ moves }} />
      </section>
    );
  }

  renderHighScore() {
    if (!this.props.highScore) {
      return null;
    }

    const { name, value, date } = this.props.highScore.toJS();
    const month = this.context.intl.formatDate(new Date(date), { month: 'long' });

    return (
      <section className="highscore">
        <FormattedMessage
          id="game.highscore"
          defaultMessage="High score in {month}: {name} ({value, number})"
          values={{ month, name, value }}
        />
      </section>
    );
  }

  render() {
    return (
      <nav>
        {this.renderMenu()}
        {this.renderScore()}
        {this.renderHighScore()}
      </nav>
    );
  }
}

Nav.contextTypes = {
  intl: PropTypes.object.isRequired
};

const mapStateToProps = (state) => {
  const { app, game, undo } = state;

  return {
    round: game.get('round'),
    rounds: game.get('rounds'),
    score: game.get('score'),
    moves: game.get('moves'),
    highScore: app.get('highScore'),
    canUndo: undo.get('move') !== null
  };
};

const mapDispatchToProps = dispatch => ({
  newGame: (ev) => {
    ev.preventDefault();
    dispatch(newGame());
  },
  undoMove: (ev) => {
    ev.preventDefault();
    dispatch(undoMove());
  },
  showHighScore: (ev) => {
    ev.preventDefault();
    dispatch(toggleHighScore(true));
  },
  showStatistics: (ev) => {
    ev.preventDefault();
    dispatch(toggleStatistics(true));
  },
  showAbout: (ev) => {
    ev.preventDefault();
    dispatch(toggleAbout(true));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Nav);
