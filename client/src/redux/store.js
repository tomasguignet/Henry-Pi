import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import data from "./reducers/dataReducer";
import loader from "./reducers/loaderReducer"
import thunkMiddleware from "redux-thunk";

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const reducers = combineReducers({
  data: data,
  loader: loader
})

//Definimos cual era el estado global con su middleware para usar peticiones a la api
const store = createStore(
  reducers,
  composeEnhancer(applyMiddleware(thunkMiddleware))
);

export default store
