export const TICK = 'TICK';
export const PAUSE = 'PAUSE';
export const UNPAUSE = 'UNPAUSE';
export const SET_TICK_INTERVAL = 'SET_TICK_INTERVAL';
export const ACTION_SCHEDULED = 'ACTION_SCHEDULED';
export const ACTION_UNSCHEDULED = 'ACTION_UNSCHEDULED';
export const ACTION_RESOLVED = 'ACTION_RESOLVED';

export const tick = (increment=1) => ({
    type: TICK,
    payload: {increment}
})

export const pause = () => ({
    type: PAUSE,
    payload: {}
})

export const unpause = () => ({
    type: UNPAUSE,
    payload: {}
})

export const setTickInterval = interval => ({
    type: SET_TICK_INTERVAL,
    payload: {interval}
})

export const actionScheduled = (action, tick, id) => ({
    type: ACTION_SCHEDULED,
    payload: {
        action: {
            ...action,
            meta: {
                tick
            }
        },
        tick,
        id
    }
})

export const actionUnscheduled = (id) => ({
    type: ACTION_UNSCHEDULED,
    payload: {id}
})

export const actionResolved = (id) => ({
    type: ACTION_RESOLVED,
    payload: {id}
})
