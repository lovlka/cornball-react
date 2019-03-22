import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';

const Summary = ({ moves, score }) => (
  <Fragment>
    <p className="score">
      <FormattedMessage id="game.score" defaultMessage="Score: {score, number}" values={{ score }} />
    </p>
    <p className="moves">
      <FormattedMessage id="game.moves" defaultMessage="Moves: {moves, number}" values={{ moves }} />
    </p>
  </Fragment>
);

const mapStateToProps = (state) => {
  const { game } = state;

  return {
    moves: game.get('moves'),
    score: game.get('score')
  };
};

export default connect(mapStateToProps)(Summary);
