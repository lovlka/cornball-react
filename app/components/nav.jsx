import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import {getDate} from '../utils/date';

class Nav extends Component {

   render() {
      const {round, rounds, score, moves, highScoreName, highScore} = this.props;
      const month = getDate().month();

      return (
         <nav className="navbar navbar-inverse navbar-static-top">
            <ul className="nav navbar-nav">
               <li><a href="#" onClick={this.props.newGame} title="Starta nytt spel"><i className="fa fa-2x fa-refresh" /></a></li>
               <li><a href="#" onClick={this.props.undoMove} title="Ångra senaste drag"><i className="fa fa-2x fa-reply" /></a></li>
               <li><a href="#" onClick={this.props.showHighScore} title="Visa topplista"><i className="fa fa-2x fa-star" /></a></li>
               <li><a href="#" onClick={this.props.showStatistics} title="Visa statistik"><i className="fa fa-2x fa-pie-chart" /></a></li>
               <li><a href="#" onClick={this.props.showAbout} title="Om Lantisen"><i className="fa fa-2x fa-question" /></a></li>
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
   const {appState, gameState} = state;

   return {
      round: gameState.get('round'),
      rounds: gameState.get('rounds'),
      score: gameState.get('score'),
      moves: gameState.get('moves'),
      highScoreName: appState.get('highScoreName'),
      highScore: appState.get('highScore')
   };
};

const mapDispatchToProps = (dispatch) => {
   return {
      newGame: (ev) => {
         ev.preventDefault();
      },
      undoMove: (ev) => {
         ev.preventDefault();
      },
      showHighScore: (ev) => {
         ev.preventDefault();
      },
      showStatistics: (ev) => {
         ev.preventDefault();
      },
      showAbout: (ev) => {
         ev.preventDefault();
      }
   };
};

export default connect(mapStateToProps, mapDispatchToProps)(Nav);