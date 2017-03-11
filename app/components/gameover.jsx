import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import Modal from './modal';

class GameOver extends Component {

   render() {
      const {moves, score} = this.props;

      return (
         <Modal title="Game over" dismiss="Close">
            <article>
               <p>You failed to complete The Cornball!</p>
               <p>
                  <FormattedMessage id="nav.score" defaultMessage="Score: {score, number}" values={{ score }} /><br />
                  <FormattedMessage id="nav.moves" defaultMessage="Moves: {moves, number}" values={{ moves }} />
               </p>
            </article>
         </Modal>
      );
   }

}

GameOver.propTypes = {
   moves: PropTypes.number.isRequired,
   score: PropTypes.number.isRequired
};

const mapStateToProps = (state) => {
   const {app} = state;

   return {
      moves: app.get('moves'),
      score: app.get('score')
   };
};

export default connect(mapStateToProps)(GameOver);