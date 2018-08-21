import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { autoMoveCard, tryMoveCard, showHint } from '../actions/game';
import Card from './card';
import Gap from './gap';

class Game extends Component {
  propTypes = {
    deck: PropTypes.object.isRequired
  };

  onGapClick = (index) => {
    this.props.showHint(index);
  };

  onCardClick = (index) => {
    this.props.autoMoveCard(index);
  };

  onCardDrop = (from, to) => {
    this.props.tryMoveCard(from, to);
  };

  renderRow(row, cards) {
    return (
      <section className="row">
        {cards.map((card, index) => this.renderItem(card, (row * 13) + index))}
      </section>
    );
  }

  renderItem(card, index) {
    return card.get('value') > 1
      ? <Card key={index} index={index} card={card} onClick={this.onCardClick} onDrop={this.onCardDrop} />
      : <Gap key={index} index={index} onClick={this.onGapClick} />;
  }

  render() {
    return (
      <section id="deck">
        {this.renderRow(0, this.props.deck.take(13))}
        {this.renderRow(1, this.props.deck.skip(13).take(13))}
        {this.renderRow(2, this.props.deck.skip(26).take(13))}
        {this.renderRow(3, this.props.deck.skip(39).take(13))}
      </section>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  autoMoveCard(index) {
    dispatch(autoMoveCard(index));
  },
  tryMoveCard(from, to) {
    dispatch(tryMoveCard(from, to));
  },
  showHint(index) {
    dispatch(showHint(index));
  }
});

const mapStateToProps = (state) => {
  const { deck } = state;

  return {
    deck
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Game);
