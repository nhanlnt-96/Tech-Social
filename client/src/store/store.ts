import { applyMiddleware, createStore } from 'redux';
import createSagaMiddleWare from 'redux-saga';
import rootReducer from 'store/rootReducer';
import rootSaga from 'store/saga/rootSaga';

const sagaMiddleWare = createSagaMiddleWare();
const store = createStore(rootReducer, applyMiddleware(sagaMiddleWare));
sagaMiddleWare.run(rootSaga);

export default store;
