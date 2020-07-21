import React, { Fragment } from 'react';
import { useSelector } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { getGameState } from '../helpers/selectors';

const Summary = () => {
  const { score, moves } = useSelector(getGameState);

  return (
    <Fragment>
      <p className="score">
        <FormattedMessage id="game.score" defaultMessage="Score: {score, number}" values={{ score }} />
      </p>
      <p className="moves">
        <FormattedMessage id="game.moves" defaultMessage="Moves: {moves, number}" values={{ moves }} />
      </p>
    </Fragment>
  );
};

export default Summary;
