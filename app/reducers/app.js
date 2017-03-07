import Immutable from 'immutable';

import { NETWORK } from '../actions/network';

const initialState = {
   networkFailed: false,
   networkProgress: false,
   highScoreName: 'Victor',
   highScore: 6341
};

export function app(state = Immutable.Map(initialState), action = null) {
   switch (action.type) {
      case NETWORK:
         return state.merge(action.state);

      default:
         return state;
   }
}