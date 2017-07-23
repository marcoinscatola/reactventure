import reducer from './reducer';
import * as actions from './actions';

describe('the log reducer', () => {
    let {log} = actions;
    it('returns the initial state', () => {
        let state = reducer(undefined, '@@INIT');
        expect(state).toEqual({
            logs: [],
            panes: [],
            limit: 50
        })
    })
    it('handles the logMessage action correctly', () => {
        let state = reducer(undefined, '@@INIT');
        state = reducer(state, log('TEST_01', 'TEST'))
        expect(state.logs).toEqual([{
            messageId: 'TEST_01',
            logType: 'TEST',
            args: {}
        }])
        state = reducer(state, log('TEST_02', 'TEST', {testArg: true}));
        expect(state.logs).toEqual([{
            messageId: 'TEST_01',
            logType: 'TEST',
            args: {}
        }, {
            messageId: 'TEST_02',
            logType: 'TEST',
            args: {
                testArg: true
            }
        }])
    })
    it('limits the total messages of any type', () => {
        let state = reducer(undefined, '@@INIT');
        for (var i = 0; i < state.limit + 20; i++) {
            state = reducer(state, log(Math.random(), 'TEST_TYPE'))
            state = reducer(state, log(Math.random(), 'TEST_TYPE2'))
        }
        state = reducer(state, log('last', 'TEST_TYPE'))
        let actionsType1 = state.logs.filter(log => log.logType === 'TEST_TYPE')
        let actionsType2 = state.logs.filter(log => log.logType === 'TEST_TYPE2')
        expect(actionsType1.length).toEqual(state.limit);
        expect(actionsType2.length).toEqual(state.limit);
        expect(actionsType1).toContainEqual({
            messageId: 'last',
            logType: 'TEST_TYPE',
            args: {}
        })
    })
})

