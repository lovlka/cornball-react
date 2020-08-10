import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import GridLoader from 'halogenium/lib/GridLoader';
import { CARDS } from '../helpers/deck';
import { autoMoveCard, tryMoveCard, tryShowHint } from '../actions/game';
import Card from './card';
import Gap from './gap';

const Game = () => {
  const dispatch = useDispatch();

  let loaded = 0;
  const [loading, setLoading] = useState(true);
  const deck = useSelector(state => state.deck);

  const onCardLoaded = () => {
    loaded += 1;
    if (loaded === CARDS) {
      setLoading(false);
    }
  };

  const onGapClick = (index) => {
    dispatch(tryShowHint(index));
  };

  const onCardClick = (index) => {
    dispatch(autoMoveCard(index));
  };

  const onCardDrop = (from, to) => {
    dispatch(tryMoveCard(from, to));
  };

  return (
    <div id="game">
      {loading && <GridLoader id="loader" color="#fff" size={12} margin={6} />}
      <section id="deck" className={loading ? 'loading' : ''}>
        {deck.map((card, index) => (
          card.get('value') > 1
            ? <Card key={index} index={index} card={card} onLoad={onCardLoaded} onClick={onCardClick} onDrop={onCardDrop} />
            : <Gap key={index} index={index} card={card} onClick={onGapClick} />
        ))}
      </section>
    </div>
  );
};

export default Game;
