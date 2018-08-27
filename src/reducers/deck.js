import Immutable from 'immutable';
import { getDeck, reShuffle, shuffle, updateCard } from '../helpers/deck';
import { NEW_GAME, NEW_ROUND, MOVE_CARD, UNDO_MOVE, SET_ROUND_PLACED, SHOW_HINT, SHOW_ERROR } from '../actions/game';

export function deck(state = Immutable.List(), action = null) {
  switch (action.type) {
    case NEW_GAME:
      return Immutable.fromJS(shuffle(getDeck()));

    case NEW_ROUND:
      return Immutable.fromJS(reShuffle(state.toJS()));

    case MOVE_CARD:
    case UNDO_MOVE: {
      const { to, from } = action.move;
      const gap = state.get(action.move.to);
      const card = state.get(action.move.from).set('showHint', false);
      return state.set(to, card).set(from, gap);
    }

    case SET_ROUND_PLACED:
      return updateCard(state, action.index, { roundPlaced: action.roundPlaced });

    case SHOW_HINT:
      return updateCard(state, action.index, { showHint: action.showHint });

    case SHOW_ERROR:
      return updateCard(state, action.index, { showError: action.showError });

    default:
      return state;
  }
}
