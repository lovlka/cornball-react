import { fromJS, Map } from 'immutable';

import { NEW_GAME, NEW_ROUND, MOVE_CARD, UNDO_MOVE, SET_SCORE } from '../actions/game';

const initialState = {
  round: 1,
  rounds: 5,
  score: 0,
  moves: 0,
  placed: 0,
  locked: 0
};

export function game(state = Map(initialState), action = null) {
  switch (action.type) {
    case NEW_GAME:
      return state.merge(fromJS(initialState));

    case NEW_ROUND:
      return state.merge(fromJS({ round: state.get('round') + 1 }));

    case MOVE_CARD:
    case UNDO_MOVE:
      return state.merge(fromJS({ moves: state.get('moves') + 1 }));

    case SET_SCORE:
      return state.merge(fromJS(action.state));

    default:
      return state;
  }
}
