import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { combineReducers } from 'redux';
import { game } from './reducers/game';
import { deck } from './reducers/deck';
import { undo } from './reducers/undo';
import { app } from './reducers/app';

const createStoreWithMiddleware = compose(
   applyMiddleware(thunkMiddleware)
)(createStore);

const rootReducer = combineReducers({
   app,
   game,
   deck,
   undo
});

export default function configureStore() {
   return createStoreWithMiddleware(rootReducer);
}