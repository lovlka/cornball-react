import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { resetNetwork }  from '../actions/network';
import { newGame } from '../actions/game';
import { getHighScore } from '../actions/highscore';
import Nav from './nav';
import Game from './game';

class Root extends Component {
   render() {
      return (
         <main>
            <Nav />
            <Game />
            {this.props.children}
         </main>
      );
   }

   componentDidMount() {
      this.props.getHighScore();
      this.props.newGame();
   }
}

Root.propTypes = {
   networkProgress: PropTypes.bool.isRequired,
   networkFailed: PropTypes.bool.isRequired
};

const mapStateToProps = (state) => {
   const {app} = state;

   return {
      networkProgress: app.get('networkProgress'),
      networkFailed: app.get('networkFailed')
   };
};

const mapDispatchToProps = (dispatch) => {
   return {
      resetNetwork: () => {
         dispatch(resetNetwork());
      },
      getHighScore: () => {
         dispatch(getHighScore());
      },
      newGame: () => {
         dispatch(newGame());
      }
   };
};

export default connect(mapStateToProps, mapDispatchToProps)(Root);