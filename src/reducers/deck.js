import Immutable from 'immutable';
import { getDeck, reShuffle, shuffle, swapImmutable, updateCard } from '../helpers/deck';
import { NEW_GAME, NEW_ROUND, MOVE_CARD, UNDO_MOVE, SET_ROUND_PLACED, SHOW_HINT } from '../actions/game';

export function deck(state = Immutable.List(), action = null) {
  switch (action.type) {
    case NEW_GAME:
      return Immutable.fromJS(shuffle(getDeck()));

    case NEW_ROUND:
      return Immutable.fromJS(reShuffle(state.toJS()));

    case MOVE_CARD:
    case UNDO_MOVE:
      return swapImmutable(state, action.move.from, action.move.to);

    case SET_ROUND_PLACED:
      return updateCard(state, action.index, { roundPlaced: action.roundPlaced });

    case SHOW_HINT:
      return updateCard(state, action.index, { showHint: action.showHint });

    default:
      return state;
  }
}
