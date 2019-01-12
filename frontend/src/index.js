//import 'bootstrap/dist/css/bootstrap.min.css';
import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import thunk from "redux-thunk";
import jobpostReducer from "./store/reducers/jobpost";
import reducer_profile from "./store/reducers/reducer_profile";
import reducer from "./store/reducers/reducer";
import { reducer as formReducer } from "redux-form";
import userReducer from "./store/reducers/userReducer";
import reducer_mingraph from "./store/reducers/reducer_mingraph";
import jobstatsReducer from "./store/reducers/jobstats";
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
  user: userReducer,
  jobpost: jobpostReducer,
  reducer_profile: reducer_profile,
  reducer_mingraph: reducer_mingraph,
  form: formReducer,
  jobstats: jobstatsReducer,
  reducer: reducer
});

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
registerServiceWorker();
