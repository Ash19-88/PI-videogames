import { applyMiddleware, legacy_createStore as createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk"; //is used to delay the evaluation of an operation(asynchronous actions)
import rootReducer from '../redux/reducer';

export const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);