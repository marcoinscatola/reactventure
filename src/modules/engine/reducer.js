import {handleActions} from 'redux-actions'
import * as engineActions from './actions';


/**
 * Holds the initial state of the state.notes slice
 * @prop {Number} currentTick    The current tick number
 * @prop {Boolean} paused    When true, the engine is paused and won't tick
 * @prop {Number} tickInterval    The interval between each tick in ms
 * @prop {Object[]} schedule    Array containing the scheduled actions
 * @prop {String} schedule[].id    ID of the scheduled action
 * @prop {Object} schedule[].action    Object containing the scheduled action
 * @prop {Number} schedule[].tick    At which tick the action should be dispatched
 */
const initialState = {
    currentTick: 0,
    paused: false,
    tickInterval: 500,
    schedule: []
}

export default handleActions({
    [engineActions.TICK]: (state, {payload:{increment}}) => ({
        ...state,
        currentTick: state.currentTick + increment
    }),
    [engineActions.PAUSE]: state => ({
        ...state,
        paused: true
    }),
    [engineActions.UNPAUSE]: state => ({
        ...state,
        paused: false
    }),
    [engineActions.SET_TICK_INTERVAL]: (state, {payload: {interval} }) => ({
        ...state,
        tickInterval: interval
    }),
    [engineActions.ACTION_SCHEDULED]: (state, {payload: {action, tick, id} }) => {
        let scheduledAction = {id, action, tick}
        return {
            ...state,
            schedule: [...state.schedule, scheduledAction],
        }
    },
    [engineActions.ACTION_UNSCHEDULED]: (state, {payload: {id} }) => {
        return {
            ...state,
            schedule: state.schedule.filter(scheduledAction => scheduledAction.id !== id),
        }
    },
    [engineActions.ACTION_RESOLVED]: (state, {payload: {id} }) => {
        return {
            ...state,
            schedule: state.schedule.filter(scheduledAction => scheduledAction.id !== id),
        }
    }
}, initialState)
