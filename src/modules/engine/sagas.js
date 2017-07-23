import {fork, select, put, call} from 'redux-saga/effects';
import {delay} from 'redux-saga';
import {isPaused, getTickInterval, getFirstScheduledAction, getCurrentTick} from './selectors';
import {tick, actionScheduled, actionUnscheduled} from './actions';
import {uuid} from 'utils/random';

export function* scheduleAction(action, tick) {
    let id = yield call(uuid);
    yield put(actionScheduled(action, tick, id));
    return actionUnscheduled(id);
}

export function* resolveScheduledActions() {
    let currentTick = yield select(getCurrentTick);
    let nextScheduled = yield select(getFirstScheduledAction, currentTick)
    while (nextScheduled !== null) {
        yield put(nextScheduled.action)
        yield put(actionUnscheduled(nextScheduled.id))
        nextScheduled = yield select(getFirstScheduledAction, currentTick)
    }
}

export function* tickDaemon() {
    while(true) {
        let interval = yield select(getTickInterval);
        yield call(delay, interval);
        let paused = yield select(isPaused);
        if (!paused) {
            yield put(tick())
            yield call(resolveScheduledActions)
        }
    }
}

export default function* () {
    yield fork(tickDaemon)
}
