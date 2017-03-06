import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import {getDate} from '../utils/date';
import {newGame, undoMove} from '../actions/game';

class Nav extends Component {

   render() {
      const {round, rounds, score, moves, highScoreName, highScore} = this.props;
      const month = getDate().month();

      return (
         <nav className="navbar navbar-inverse navbar-static-top">
            <ul className="nav navbar-nav">
               <li><a href="#" onClick={this.props.newGame} title="Starta nytt spel"><i className="fa fa-2x fa-refresh" /></a></li>
               <li><a href="#" onClick={this.props.undoMove} title="Ångra senaste drag"><i className="fa fa-2x fa-reply" /></a></li>
               <li><Link to="/highscore" title="Visa topplista"><i className="fa fa-2x fa-star" /></Link></li>
               <li><Link to="/statistics" title="Visa statistik"><i className="fa fa-2x fa-pie-chart" /></Link></li>
               <li><Link to="/about" title="Om Lantisen"><i className="fa fa-2x fa-question" /></Link></li>
            </ul>
            <p className="navbar-right navbar-text">
               <span>Runda: {round}/{rounds}</span>
               <span>Poäng: {score}</span>
               <span>Drag: {moves}</span>
            </p>
            <p className="text-center hidden-xs hidden-sm">Högst poäng i {month}: {highScoreName} ({highScore})</p>
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