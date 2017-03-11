import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import Modal from './modal';

class GameWin extends Component {

   render() {
      const {moves, round, score} = this.props;

      return (
         <Modal title="Congratulations!" dismiss="Close">
            <article>
               <p><FormattedMessage id="gamewin.description" defaultMessage="You put all cards on the right place and finished The Cornball!" /></p>
               <p>
                  <FormattedMessage id="nav.score" defaultMessage="Score: {score, number}" values={{ score }} /><br />
                  <FormattedMessage id="nav.round" defaultMessage="Round: {round, number}" values={{ round }} /><br />
                  <FormattedMessage id="nav.moves" defaultMessage="Moves: {moves, number}" values={{ moves }} />
               </p>
            </article>
         </Modal>
      );
   }

}

GameWin.propTypes = {
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

export default connect(mapStateToProps)(GameWin);