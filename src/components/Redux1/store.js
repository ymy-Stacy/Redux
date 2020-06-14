import {createStore} from 'redux';
import reducer from './reducer';

const initValue = {
    'first':0,
    'second':10,
    'third':20,
}

const store = createStore(reducer, initValue);

export default store;