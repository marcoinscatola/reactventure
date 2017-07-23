import head from 'lodash/head';
import sortBy from 'lodash/sortBy';

export const getEngineState = state => state.engine;
export const isPaused = state => getEngineState(state).paused;
export const getCurrentTick = state => getEngineState(state).currentTick;
export const getTickInterval = state => getEngineState(state).tickInterval;
export const getScheduledActions = (state, tick) => {
    let schedule = getEngineState(state).schedule;
    return schedule.filter(scheduledAction => scheduledAction.tick <= tick)
}
export const getFirstScheduledAction = (state, tick) => {
    let actions = getScheduledActions(state, tick);
    return head(sortBy(actions, 'tick')) || null;
}
