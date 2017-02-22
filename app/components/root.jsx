import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { resetNetwork }  from '../actions';
import { initialize }  from '../game';
import Loading from './loading';
import Error from './error';
import Nav from './nav';
import Game from './game';
import About from './about';

class Root extends Component {
   render() {
      const { networkProgress, networkFailed } = this.props;

      return (
         <div>
            {networkProgress ? <Loading /> : null }
            {networkFailed ? <Error onClose={this.props.resetNetwork} /> : null }
            <About />
            <Nav />
            <Game />
         </div>
      );
   }

   componentDidMount() {
      this.props.initialize();
   }
}

Root.propTypes = {
   networkProgress: PropTypes.bool.isRequired,
   networkFailed: PropTypes.bool.isRequired
};

const mapStateToProps = (state) => {
   const {appState} = state;

   return {
      networkProgress: appState.get('networkProgress'),
      networkFailed: appState.get('networkFailed')
   };
};

const mapDispatchToProps = (dispatch) => {
   return {
      resetNetwork: () => {
         dispatch(resetNetwork());
      },
      initialize: () => {
         dispatch(initialize());
      }
   };
};

export default connect(mapStateToProps, mapDispatchToProps)(Root);