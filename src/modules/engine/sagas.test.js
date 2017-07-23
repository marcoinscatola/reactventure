import {call, put, fork, select} from 'redux-saga/effects';
import {delay} from 'redux-saga';
import {cloneableGenerator} from 'redux-saga/utils';

import engineRootSaga, * as engineSagas from './sagas';
import {tick, actionScheduled, actionUnscheduled} from './actions';
import {isPaused, getTickInterval, getFirstScheduledAction, getCurrentTick} from './selectors';
import {uuid} from 'utils/random';


describe('Engine root saga', () => {
    let gen;
    beforeAll(() => {
        gen = engineRootSaga();
    })
    it('is a generator function', () => {
        expect(gen.next).toBeDefined();
    })
    it('runs the tickDaemon', () => {
        expect(gen.next().value)
        .toEqual(fork(engineSagas.tickDaemon))
    })
})

describe('engineSagas.tickDaemon', () => {
    let gen;
    beforeAll(() => {
        gen = cloneableGenerator(engineSagas.tickDaemon)();
    })
    it('is a generator function', () => {
        expect(gen.next).toBeDefined();
    })
    it('selects the tick interval from the state', () => {
        expect(gen.next().value)
        .toEqual(select(getTickInterval))
    })
    it('waits for (interval)ms ', () => {
        expect(gen.next(300).value)
        .toEqual(call(delay, 300))
    })
    it('selects paused from the state', () => {
        expect(gen.next().value)
        .toEqual(select(isPaused))
    })
    it('emits a TICK action if not paused, calls resolveScheduledActions and starts again', () => {
        let clone = gen.clone();
        // paused = false
        expect(clone.next(false).value)
        .toEqual(put(tick()));

        expect(clone.next().value)
        .toEqual(call(engineSagas.resolveScheduledActions))

        // starts again from step 1
        expect(clone.next().value)
        .toEqual(select(getTickInterval))
    })
    it('if paused doesn\'t emit anything and starts again', () => {
        let clone = gen.clone();
        // paused = true
        expect(clone.next(true).value)
        .toEqual(select(getTickInterval))
    })
})

describe('engineSagas.scheduleAction', () => {
    let {scheduleAction} = engineSagas;
    let gen;
    let action = {type:'TEST'}
    let tickNumber = 100;
    beforeAll(() => {
        gen = scheduleAction(action, tickNumber)
    })
    it('is a generator function', () => {
        expect(gen.next).toBeDefined()
    })
    it('calls uuid to get a random id', () => {
        expect(gen.next().value)
        .toEqual(call(uuid))
    })
    it('emits a ACTION_SCHEDULED action', () => {
        expect(gen.next('random-uuid').value)
        .toEqual(put(actionScheduled(action, tickNumber, 'random-uuid')))
    })
    it('returns the action to unschedule the scheduled action', () => {
        let next = gen.next(); expect(next.value).toEqual(actionUnscheduled('random-uuid'));
        expect(next.done).toBe(true);
    })
})

describe('engineSagas.resolveScheduledActions', () => {
    let {resolveScheduledActions} = engineSagas;
    let gen, cloneNoActions, cloneOneAction, cloneSomeActions;
    let scheduledAction1 = {id:1, action:{type:'TEST1'}, tick: 10}
    let scheduledAction2 = {id:2, action:{type:'TEST2'}, tick: 20}
    let testTick = 10;
    beforeAll(() => {
        gen = cloneableGenerator(resolveScheduledActions)();
    })
    it('is a generator function()', () => {
        expect(gen.next).toBeDefined();
    })
    it('selects the next scheduled action and the current tick', () => {
        expect(gen.next().value).toEqual(select(getCurrentTick))
        expect(gen.next(testTick).value)
        .toEqual(select(getFirstScheduledAction, testTick))
    })
    it('terminates if no action is found', () => {
        cloneNoActions = gen.clone();
        expect(cloneNoActions.next(null).done)
        .toEqual(true);
    })
    it('dispatches and unschedules the next scheduled action if one is found', () => {
       cloneOneAction = gen.clone();
       expect(cloneOneAction.next(scheduledAction1).value)
       .toEqual(put(scheduledAction1.action))
       expect(cloneOneAction.next().value)
       .toEqual(put(actionUnscheduled(scheduledAction1.id)))
    })
    it('selects an action again', () => {
        expect(cloneOneAction.next().value)
        .toEqual(select(getFirstScheduledAction, testTick))
    })
    it('dispatches the action again if another one is found', () => {
        cloneSomeActions = cloneOneAction.clone();
        expect(cloneSomeActions.next(scheduledAction2).value)
        .toEqual(put(scheduledAction2.action))
        expect(cloneSomeActions.next().value)
        .toEqual(put(actionUnscheduled(scheduledAction2.id)))
    })
    it('terminates if no more actions are found', () => {
        expect(cloneOneAction.next(null).done)
        .toBe(true)
    })
})
