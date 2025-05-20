import {createStore, applyMiddleware} from 'redux';
import createSagaMiddleware from 'redux-saga';
//import tron from 'config/ReactotronConfig';

import sagas from './sagas';
import reducers from './ducks';

/* Saga */
const sagaMonitor = null;
// const sagaMonitor = __DEV__ ? tron.createSagaMonitor() : null;
const sagaMiddleware = createSagaMiddleware({sagaMonitor});

const middlewares = [sagaMiddleware];

const store = createStore(reducers, applyMiddleware(...middlewares));

/* Run Saga */
sagaMiddleware.run(sagas);

export default store;
