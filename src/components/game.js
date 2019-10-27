import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import GridLoader from 'halogenium/lib/GridLoader';
import { COLUMNS, CARDS, ROWS } from '../helpers/deck';
import { autoMoveCard, tryMoveCard, tryShowHint } from '../actions/game';
import Card from './card';
import Gap from './gap';

class Game extends PureComponent {
  static propTypes = {
    deck: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);
    this.loaded = 0;
    this.state = {
      loading: true
    };
  }

  onCardLoaded = () => {
    this.loaded += 1;
    if (this.loaded === CARDS) {
      this.setState({ loading: false });
    }
  };

  onGapClick = (index) => {
    this.props.tryShowHint(index);
  };

  onCardClick = (index) => {
    this.props.autoMoveCard(index);
  };

  onCardDrop = (from, to) => {
    this.props.tryMoveCard(from, to);
  };

  getRows = () => {
    const { deck } = this.props;
    const rows = [];
    for (let row = 0; row < ROWS; row += 1) {
      rows.push(deck.skip(COLUMNS * row).take(COLUMNS));
    }
    return rows;
  };

  renderRow = (row, cards) => (
    <section key={row} className="row">
      {cards.map((card, index) => this.renderItem(card, (row * COLUMNS) + index))}
    </section>
  );

  renderItem = (card, index) => (
    card.get('value') > 1
      ? <Card key={index} index={index} card={card} onLoad={this.onCardLoaded} onClick={this.onCardClick} onDrop={this.onCardDrop} />
      : <Gap key={index} index={index} card={card} onClick={this.onGapClick} />
  );

  render() {
    const { loading } = this.state;

    return (
      <Fragment>
        {loading && <GridLoader id="loader" color="#fff" size={12} margin={6} />}
        <section id="deck" className={loading ? 'loading' : ''}>
          {this.getRows().map((row, index) => this.renderRow(index, row))}
        </section>
      </Fragment>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  autoMoveCard: index => dispatch(autoMoveCard(index)),
  tryMoveCard: (from, to) => dispatch(tryMoveCard(from, to)),
  tryShowHint: index => dispatch(tryShowHint(index))
});

const mapStateToProps = (state) => {
  const { deck } = state;

  return {
    deck
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Game);
