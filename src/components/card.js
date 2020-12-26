import React, { useState, useEffect, useMemo } from 'react';
import classNames from 'classnames';
import interact from 'interactjs';
import { getCardImagePath } from '../helpers/deck';

const Card = ({ card, index, onLoad, onClick, onDrop }) => {
  let imageEl = null;
  let element = null;
  let draggable = null;

  const [dragging, setDragging] = useState(false);
  const [dragX, setDragX] = useState(0);
  const [dragY, setDragY] = useState(0);

  const onDragMove = ({ dx, dy }) => {
    setDragX(prevX => prevX + dx);
    setDragY(prevY => prevY + dy);
  };

  const onDragEnd = (ev) => {
    setDragging(false);
    setDragX(0);
    setDragY(0);

    if (ev.dropzone) {
      onDrop(index, ev.dropzone.index);
    }
  };

  useEffect(() => {
    draggable = interact(element);
    draggable.draggable({
      onstart: () => setDragging(true),
      onmove: onDragMove,
      onend: onDragEnd
    })
      .on('doubletap', () => onClick(index))
      .styleCursor(false);

    return () => {
      if (draggable) {
        draggable.unset();
      }
      if (imageEl) {
        imageEl.onload = null;
      }
    };
  }, []);

  const imageRef = (ref) => {
    if (!ref) {
      return;
    }
    imageEl = ref;
    imageEl.onload = onLoad;

    if (imageEl.complete) {
      onLoad();
    }
  };

  const { suit, value, roundPlaced, showHint, showError } = card.toJS();

  const image = useMemo(() => getCardImagePath(suit, value), []);
  const style = { transform: `translate(${dragX}px, ${dragY}px)` };
  const className = classNames({
    card: true,
    dragging,
    placed: roundPlaced,
    hint: showHint,
    error: showError
  });

  return (
    <div className={className} style={style} ref={(ref) => { element = ref; }}>
      <img src={image} alt="" ref={imageRef} />
    </div>
  );
};

export default Card;
