import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { FormattedMessage } from 'react-intl';
import {getDate} from '../utils/date';
import {newGame, undoMove} from '../actions/game';

class Nav extends Component {

   render() {
      const {round, rounds, score, moves, highScoreName, highScore} = this.props;
      const month = getDate().month();

      return (
         <nav>
            <ul className="left">
               <li>{this.getLink('newgame', 'refresh', 'Start new game', this.props.newGame)}</li>
               <li>{this.getLink('undomove', 'reply', 'Undo last move', this.props.undoMove)}</li>
               <li>{this.getLink('highscore', 'star', 'High score')}</li>
               <li>{this.getLink('statistics', 'pie-chart', 'Statistics')}</li>
               <li>{this.getLink('about', 'question', 'About')}</li>
            </ul>
            <section className="right">
               <FormattedMessage id="nav.round" defaultMessage="Round: {round, number}/{rounds, number}" values={{ round, rounds }} />
               <FormattedMessage id="nav.score" defaultMessage="Score: {score, number}" values={{ score }} />
               <FormattedMessage id="nav.moves" defaultMessage="Moves: {moves, number}" values={{ moves }} />
            </section>
            <section className="center">
               <FormattedMessage
                  id="nav.highscore"
                  defaultMessage="High score in {month}: {highScoreName} ({highScore})"
                  values={{ month, highScoreName, highScore }} />
            </section>
         </nav>
      );
   }

   getLink(id, icon, defaultMessage, action) {
      const iconClass = 'fa fa-2x fa-' + icon;
      const title = this.context.intl.formatMessage({id: 'nav.' + id, defaultMessage: defaultMessage});
      
      return <Link to={'/' + id} title={title} onClick={action}><i className={iconClass} /></Link>;
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
   highScoreName: PropTypes.string.isRequired,
   highScore: PropTypes.number.isRequired
};

const mapStateToProps = (state) => {
   const {app, game} = state;

   return {
      round: game.get('round'),
      rounds: game.get('rounds'),
      score: game.get('score'),
      moves: game.get('moves'),
      highScoreName: app.get('highScoreName'),
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