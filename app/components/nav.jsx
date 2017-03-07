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
               <li><Link to="/newgame" onClick={this.props.newGame} title="Starta nytt spel"><i className="fa fa-2x fa-refresh" /></Link></li>
               <li><Link to="/undomove" onClick={this.props.undoMove} title="Ångra senaste drag"><i className="fa fa-2x fa-reply" /></Link></li>
               <li><Link to="/highscore" title="Visa topplista"><i className="fa fa-2x fa-star" /></Link></li>
               <li><Link to="/statistics" title="Visa statistik"><i className="fa fa-2x fa-pie-chart" /></Link></li>
               <li><Link to="/about" title="Om Lantisen"><i className="fa fa-2x fa-question" /></Link></li>
            </ul>
            <div className="right">
               <FormattedMessage id="nav.round" defaultMessage="Round: {round, number}/{rounds, number}" values={{ round, rounds }} />
               <FormattedMessage id="nav.score" defaultMessage="Score: {score, number}" values={{ score }} />
               <FormattedMessage id="nav.moves" defaultMessage="Moves: {moves, number}" values={{ moves }} />
            </div>
            <div className="center">
               Högst poäng i {month}: {highScoreName} ({highScore})
            </div>
         </nav>
      );
   }

}

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