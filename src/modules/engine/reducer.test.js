import reducer from './reducer';
import * as engineActions from './actions';

test('the reducer returns the initialState', () => {
    expect(reducer(undefined, "@@INIT"))
    .toEqual({
        currentTick: 0,
        paused: false,
        tickInterval: 500,
        schedule: []
    })
})

test('the reducer handles the TICK action correctly', () => {
    let state = reducer(undefined, "@@INIT");
    state = reducer(state, engineActions.tick());
    expect(state.currentTick).toBe(1);
    state = reducer(state, engineActions.tick(5));
    expect(state.currentTick).toBe(6);
})

test('the reducer handles the PAUSE action correctly', () => {
    let state = reducer({paused:false}, "@@INIT");
    state = reducer(state, engineActions.pause());
    expect(state.paused).toBe(true);
    // multiple pauses don't change the value
    state = reducer(state, engineActions.pause());
    expect(state.paused).toBe(true);
})

test('the reducer handles the UNPAUSE action correctly', () => {
    let state = reducer({paused:true}, "@@INIT");
    state = reducer(state, engineActions.unpause());
    expect(state.paused).toBe(false);
    // multiple unpauses don't change the value
    state = reducer(state, engineActions.unpause());
    expect(state.paused).toBe(false);
})

test('the reducer handles the SET_TICK_INTERVAL action correctly', () => {
    let state = reducer({tickInterval:500}, "@@INIT");
    state = reducer(state, engineActions.setTickInterval(200));
    expect(state.tickInterval).toBe(200);
    state = reducer(state, engineActions.setTickInterval(3000));
    expect(state.tickInterval).toBe(3000);
})

test('the reducer handles the ACTION_SCHEDULED action correctly', () => {
    let state = reducer(undefined, "@@INIT");
    let action = {
        type: 'TEST',
        payload: {
            value: 'test'
        }
    }
    let action2 = {
        type: 'TEST2',
        payload: {
            value: 'test2'
        }
    }

    state = reducer(state, engineActions.actionScheduled(action, 100, 'xyz'))
    expect(state.schedule).toEqual([{
        id: 'xyz',
        action: {
            ...action,
            meta: {
                tick: 100
            }
        },
        tick: 100
    }])
    state = reducer(state, engineActions.actionScheduled(action2, 50, 'abc'))
    expect(state.schedule).toEqual([{
        id: 'xyz',
        action: {
            ...action,
            meta: {
                tick: 100
            }
        },
        tick: 100
    }, {
        id: 'abc',
        action: {
            ...action2,
            meta: {
                tick: 50
            }
        },
        tick: 50
    }])
})


test('the reducer handles the ACTION_UNSCHEDULED action correctly', () => {
    let action = {
        type: 'TEST',
    }
    let action2 = {
        type: 'TEST2',
        payload: 'testPayload'
    }
    let state = {
        schedule: [{
            id: 'xyz',
            action: action,
            tick: 100
        }, {
            id: 'abc',
            action: action2,
            tick: 50
        }]
    }

    state = reducer(state, engineActions.actionUnscheduled('abc'))
    expect(state.schedule).toEqual([{
        id: 'xyz',
        action: action,
        tick: 100
    }])
    state = reducer(state, engineActions.actionUnscheduled('xyz'))
    expect(state.schedule).toEqual([])
})


test('the reducer handles the ACTION_RESOLVED action correctly', () => {
    let action = {
        type: 'TEST',
    }
    let action2 = {
        type: 'TEST2',
        payload: 'testPayload'
    }
    let state = {
        schedule: [{
            id: 'xyz',
            action: action,
            tick: 100
        }, {
            id: 'abc',
            action: action2,
            tick: 50
        }]
    }

    state = reducer(state, engineActions.actionResolved('abc'))
    expect(state.schedule).toEqual([{
        id: 'xyz',
        action: action,
        tick: 100
    }])
    state = reducer(state, engineActions.actionResolved('xyz'))
    expect(state.schedule).toEqual([])
})
