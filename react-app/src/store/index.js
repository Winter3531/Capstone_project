import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import sessionReducer from './session'
import recipesReducer from './recipe'
import ingredientsReducer from './ingredient';
import commentsReducer from './comment';
import instructionsReducer from './instruction';
import likesReducer from './like';
import followsReducer from './follow';

const rootReducer = combineReducers({
  session: sessionReducer,
  recipes: recipesReducer,
  ingredients: ingredientsReducer,
  instructions: instructionsReducer,
  comments: commentsReducer,
  likes: likesReducer,
  follows: followsReducer,
});


let enhancer;

if (process.env.NODE_ENV === 'production') {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = require('redux-logger').default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
