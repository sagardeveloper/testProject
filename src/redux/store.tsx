// import { configureStore } from "@reduxjs/toolkit";
// import reducer from "./reducer";

// export const store = configureStore({
//   reducer: { 
//     users:reducer
//   },
// });

import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'

import reducer from './reducer'
import saga from './saga/saga'

const sagaMiddleware = createSagaMiddleware()
export const store = createStore(
  reducer,
  applyMiddleware(sagaMiddleware)
)
sagaMiddleware.run(saga)
