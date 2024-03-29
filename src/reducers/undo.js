import { fromJS, Map } from 'immutable';

import { NEW_GAME, NEW_ROUND, MOVE_CARD, UNDO_MOVE } from '../actions/game';

const initialState = {
  move: null
};

export function undo(state = Map(initialState), action = null) {
  switch (action.type) {
    case NEW_GAME:
    case NEW_ROUND:
    case UNDO_MOVE:
      return state.merge(fromJS({ move: null }));

    case MOVE_CARD:
      return state.merge(fromJS({ move: action.move }));

    default:
      return state;
  }
}
