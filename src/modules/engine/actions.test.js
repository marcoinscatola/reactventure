import * as engineActions from './actions';

describe('tick()', () => {
    it('creates a TICK action', () => {
        expect(engineActions.tick().type)
        .toBe(engineActions.TICK)
    })
    it('has a default increment of 1', () => {
        expect(engineActions.tick())
        .toEqual({
            type: engineActions.TICK,
            payload: {
                increment: 1
            }
        })
    })
    it('takes the increment as the only parameter', () => {
        expect(engineActions.tick(3, 'notused'))
        .toEqual({
            type: engineActions.TICK,
            payload: {
                increment: 3
            }
        })
    })
})

describe('pause()', () => {
    it('creates a PAUSE action', () => {
        expect(engineActions.pause().type)
        .toBe(engineActions.PAUSE)
    })
})

describe('unpause()', () => {
    it('creates a UNPAUSE action', () => {
        expect(engineActions.unpause().type)
        .toBe(engineActions.UNPAUSE)
    })
})

describe('setTickInterval()', () => {
    it('creates a SET_TICK_INTERVAL action', () => {
        expect(engineActions.setTickInterval().type)
        .toBe(engineActions.SET_TICK_INTERVAL)
    })
    it('takes the interval as the only parameter', () => {
        expect(engineActions.setTickInterval(200, 'notused'))
        .toEqual({
            type: engineActions.SET_TICK_INTERVAL,
            payload: {
                interval: 200
            }
        })
    })
})

describe('actionScheduled()', () => {
    it('creates a ACTION_SCHEDULED action', () => {
        expect(engineActions.actionScheduled().type)
        .toBe(engineActions.ACTION_SCHEDULED)
    })
    it('takes an action, a tick number and an id as parameters', () => {
        let action = {type:'TEST'}
        expect(engineActions.actionScheduled(action, 500, 'xyz'))
        .toEqual({
            type: engineActions.ACTION_SCHEDULED,
            payload: {
                action: {
                    ...action,
                    meta: {
                        tick: 500
                    }
                },
                tick: 500,
                id: 'xyz'
            }
        })
    })
})

describe('actionResolved()', () => {
    it('creates a ACTION_RESOLVED action', () => {
        expect(engineActions.actionResolved().type)
        .toBe(engineActions.ACTION_RESOLVED)
    })
    it('takes an id as the only parameter', () => {
        expect(engineActions.actionResolved('xyz'))
        .toEqual({
            type: engineActions.ACTION_RESOLVED,
            payload: {
                id: 'xyz'
            }
        })
    })
})

describe('actionUnscheduled()', () => {
    it('creates a ACTION_UNSCHEDULED action', () => {
        expect(engineActions.actionUnscheduled().type)
        .toBe(engineActions.ACTION_UNSCHEDULED)
    })
    it('takes an id as the only parameter', () => {
        expect(engineActions.actionUnscheduled('xyz'))
        .toEqual({
            type: engineActions.ACTION_UNSCHEDULED,
            payload: {
                id: 'xyz'
            }
        })
    })
})
