import React, { Component, PropTypes } from 'react';
import { resetNetwork }  from '../actions';
import { connect } from 'react-redux';
import Loading from './loading';
import Error from './error';
import Nav from './nav';
import Game from './game';

class Root extends Component {
   render() {
      const { networkProgress, networkFailed } = this.props;

      return (
         <div>
            {networkProgress ? <Loading /> : null }
            {networkFailed ? <Error onClose={this.props.resetNetwork} /> : null }
            <Nav />
            <Game />
         </div>
      );
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
      }
   };
};

export default connect(mapStateToProps, mapDispatchToProps)(Root);