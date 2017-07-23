import {engineActions, engineSelectors} from './index.js';
import reducer from 'store/reducers';
test('selectors work in integration with the reducer and the actions', () => {
    let {actionScheduled, tick} = engineActions;
    let {getCurrentTick, getFirstScheduledAction} = engineSelectors;
    let state = reducer(undefined, '@@INIT');
    let action = engineActions.actionScheduled({type:'TEST'}, 10, 'testId');
    state = reducer(state, action);
    while (getCurrentTick(state) < 9) 
        state = reducer(state, tick());
    let currentTick = getCurrentTick(state);
    expect(getFirstScheduledAction(state, currentTick)).toBe(null);

    state = reducer(state, tick());
    currentTick = getCurrentTick(state);
    expect(getFirstScheduledAction(state, currentTick)).toEqual({
        id: 'testId',
        tick: 10,
        action: {type:'TEST', meta: {tick: 10}}
    })
})
