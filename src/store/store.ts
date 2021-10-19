import { createStore } from 'redux';
import rootReducer from 'store/rootReducer';

const store = createStore(rootReducer);

export default store;
