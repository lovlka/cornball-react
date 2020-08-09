import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import interact from 'interactjs';

const Gap = ({ card, index, onClick }) => {
  let element = null;
  let dropzone = null;

  const [highlight, setHighlight] = useState(false);

  useEffect(() => {
    dropzone = interact(element);
    dropzone.index = index;
    dropzone.dropzone({
      overlap: 0.1,
      ondragenter: () => setHighlight(true),
      ondragleave: () => setHighlight(false),
      ondrop: () => setHighlight(false)
    })
      .on('tap', () => onClick(index))
      .styleCursor(false);

    return () => {
      if (dropzone) {
        dropzone.unset();
      }
    };
  }, []);

  const className = classNames({
    gap: true,
    highlight,
    error: card.get('showError')
  });

  return (
    <div className={className} ref={(ref) => { element = ref; }} />
  );
};

export default Gap;
