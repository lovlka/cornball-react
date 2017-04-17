import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import {newGame, undoMove} from '../actions/game';

class Nav extends Component {

   render() {
      return (
         <nav>
            {this.renderMenu()}
            {this.renderScore()}
            {this.renderHighScore()}
         </nav>
      );
   }

   renderMenu() {
      const {newGame, undoMove, canUndo} = this.props;

      return (
         <ul>
            <li>{this.renderLink('newgame', 'refresh', 'Start new game', newGame)}</li>
            <li>{this.renderLink('undomove', 'reply', 'Undo last move', undoMove, !canUndo)}</li>
            <li>{this.renderLink('highscore', 'star', 'High score')}</li>
            <li>{this.renderLink('statistics', 'pie-chart', 'Statistics')}</li>
            <li>{this.renderLink('about', 'question', 'About')}</li>
         </ul>
      );
   }

   renderLink(id, icon, defaultMessage, action, disabled) {
      const iconClass = 'fa fa-' + icon;
      const title = this.context.intl.formatMessage({id: 'nav.' + id, defaultMessage: defaultMessage});
      const className = disabled ? 'disabled' : '';

      return <Link to={'/' + id} className={className} title={title} replace={true} onClick={action}><i className={iconClass} /></Link>;
   }

   renderScore() {
      const {round, rounds, score, moves} = this.props;

      return (
         <section className="score">
            <FormattedMessage id="game.round" defaultMessage="Round: {round, number}/{rounds, number}" values={{ round, rounds }} />
            <FormattedMessage id="game.score" defaultMessage="Score: {score, number}" values={{ score }} />
            <FormattedMessage id="game.moves" defaultMessage="Moves: {moves, number}" values={{ moves }} />
         </section>
      );
   }

   renderHighScore() {
      if(!this.props.highScore) {
         return null;
      }

      const {name, value, date} = this.props.highScore.toJS();
      const month = this.context.intl.formatDate(new Date(date), { month: 'long' });

      return (
         <section className="highscore">
            <FormattedMessage
               id="game.highscore"
               defaultMessage="High score in {month}: {name} ({value, number})"
               values={{ month, name, value }} />
         </section>
      );
   }
}

Nav.contextTypes = {
   intl: PropTypes.object.isRequired
};

Nav.propTypes = {
   round: PropTypes.number.isRequired,
   rounds: PropTypes.number.isRequired,
   score: PropTypes.number.isRequired,
   moves: PropTypes.number.isRequired,
   highScore: PropTypes.object,
   canUndo: PropTypes.bool.isRequired
};

const mapStateToProps = (state) => {
   const {app, game, undo} = state;

   return {
      round: game.get('round'),
      rounds: game.get('rounds'),
      score: game.get('score'),
      moves: game.get('moves'),
      highScore: app.get('highScore'),
      canUndo: undo.get('move') !== null
   };
};

const mapDispatchToProps = (dispatch) => {
   return {
      newGame: (ev) => {
         ev.preventDefault();
         dispatch(newGame());
      },
      undoMove: (ev) => {
         ev.preventDefault();
         dispatch(undoMove());
      }
   };
};

export default connect(mapStateToProps, mapDispatchToProps)(Nav);