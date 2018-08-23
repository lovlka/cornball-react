import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import Modal from './modal';

export default class About extends Component {
  render() {
    const title = this.context.intl.formatMessage({ id: 'about.title', defaultMessage: 'About The Cornball' });

    return (
      <Modal title={title} onClose={this.props.onClose}>
        <article>
          <p><FormattedMessage id="about.info" defaultMessage="The goal of The Cornball is to put all the cards in order from 2 to king with one color on each line. What color is put on each line does not matter.Twos can only be put in a gap on the far left on the board. Other cards can only be put in a gap to the right of the card in the same color that is right before in order. No card can be put in a gap after the king." /></p>
          <p><FormattedMessage id="about.help" defaultMessage="Drag a card to the right gap or double-click the card to automatically find the right place. Click on a gap and the right card for that gap will flash." /></p>
          <p><FormattedMessage id="about.contact" defaultMessage="Become a fan of The Cornball on Facebook! There you have the opportunity to make comments or get in touch with me. Thank you for playing The Cornball!" /></p>
        </article>
      </Modal>
    );
  }
}

About.contextTypes = {
  intl: PropTypes.object.isRequired
};
