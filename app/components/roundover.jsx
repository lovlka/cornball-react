import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import Modal from './modal';

class RoundOver extends Component {

   render() {
      const {moves, round, score} = this.props;

      return (
         <Modal title="Round over" dismiss="Close">
            <article>
               <p>No more moves can be done, the cards are being reshuffled...</p>
               <p>
                  <FormattedMessage id="nav.score" defaultMessage="Score: {score, number}" values={{ score }} /><br />
                  <FormattedMessage id="nav.moves" defaultMessage="Moves: {moves, number}" values={{ moves }} />
               </p>
            </article>
         </Modal>
      );
   }

}

RoundOver.propTypes = {
   moves: PropTypes.number.isRequired,
   round: PropTypes.number.isRequired,
   score: PropTypes.number.isRequired
};

const mapStateToProps = (state) => {
   const {app} = state;

   return {
      moves: app.get('moves'),
      round: app.get('round'),
      score: app.get('score')
   };
};

export default connect(mapStateToProps)(RoundOver);