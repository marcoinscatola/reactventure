import {handleActions} from 'redux-actions';
import * as actions from './actions';
import {statsReducer} from './stats';
import {combineReducers} from 'react-redux';

const initialState = {
    name: '',
    titleId: null,
    alive: true
}

const baseReducer =  handleActions({
    [actions.SET_PLAYER_NAME]: (state, {payload:{name}}) => {
        return ({
            ...state,
            name
        })
    },
    [actions.SET_PLAYER_TITLE]: (state, {payload:{titleId}}) => {
        return ({
            ...state,
            titleId
        })
    }

}, initialState)

export default function reducer(state, action) {
    return {
    ...baseReducer(state, action),
    stats: statsReducer(state, action)
    }
}
