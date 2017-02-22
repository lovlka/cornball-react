import Immutable from 'immutable';

import { NEW_GAME, NEW_ROUND, MOVE_CARD, UNDO_MOVE } from '../actions';

const initialState = {
   round: 1,
   rounds: 5,
   score: 0,
   moves: 0
};

export function game(state = Immutable.Map(initialState), action = null) {
   switch (action.type) {
      case NEW_GAME:
         return state.merge(initialState);

      case NEW_ROUND:
         return state.merge({ round: state.get('round') + 1});

      case MOVE_CARD:
      case UNDO_MOVE:
         return state.merge({ moves: state.get('moves') + 1});

      default:
         return state;
   }
}