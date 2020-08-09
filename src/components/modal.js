import React, { useEffect } from 'react';
import Icon, { paths } from './icon';

const Modal = ({ title, children, onClose }) => {
  const onKeyDown = (ev) => {
    if (ev.keyCode === 27) {
      onClose();
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', onKeyDown);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
    };
  }, []);

  return (
    <section className="modal-container">
      <aside className="modal-content">
        <button type="button" className="close" onClick={onClose}>
          <Icon path={paths.close} />
        </button>
        <h1>{title}</h1>
        <hr />
        {children}
      </aside>
    </section>
  );
};

export default Modal;
