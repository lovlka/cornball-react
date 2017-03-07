import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
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
      const {newGame, undoMove} = this.props;

      return (
         <ul className="left">
            <li>{this.renderLink('newgame', 'refresh', 'Start new game', newGame)}</li>
            <li>{this.renderLink('undomove', 'reply', 'Undo last move', undoMove)}</li>
            <li>{this.renderLink('highscore', 'star', 'High score')}</li>
            <li>{this.renderLink('statistics', 'pie-chart', 'Statistics')}</li>
            <li>{this.renderLink('about', 'question', 'About')}</li>
         </ul>
      );
   }

   renderLink(id, icon, defaultMessage, action) {
      const iconClass = 'fa fa-2x fa-' + icon;
      const title = this.context.intl.formatMessage({id: 'nav.' + id, defaultMessage: defaultMessage});

      return <Link to={'/' + id} title={title} onClick={action}><i className={iconClass} /></Link>;
   }

   renderScore() {
      const {round, rounds, score, moves} = this.props;

      return (
         <section className="right">
            <FormattedMessage id="nav.round" defaultMessage="Round: {round, number}/{rounds, number}" values={{ round, rounds }} />
            <FormattedMessage id="nav.score" defaultMessage="Score: {score, number}" values={{ score }} />
            <FormattedMessage id="nav.moves" defaultMessage="Moves: {moves, number}" values={{ moves }} />
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
         <section className="center">
            <FormattedMessage
               id="nav.highscore"
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
   highScore: PropTypes.object
};

const mapStateToProps = (state) => {
   const {app, game} = state;

   return {
      round: game.get('round'),
      rounds: game.get('rounds'),
      score: game.get('score'),
      moves: game.get('moves'),
      highScore: app.get('highScore')
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