import reducer from './reducer';
import * as actions from './actions';

describe('The log reducer', () => {
    it('returns the initial state', () => {
        let state = reducer(undefined, "@@INIT");
        expect(state).toEqual({
            name: '',
            titleId: null,
            alive: true,
        })
    })

    it('handles the setPlayerName action correctly', () => {
        let state = reducer(undefined, "@@INIT");
        state = reducer(state, actions.setPlayerName('testName'));
        expect(state.name).toBe('testName')
    })

    it('handles the setPlayerTitle action correctly', () => {
        let state = reducer(undefined, "@@INIT");
        state = reducer(state, actions.setPlayerTitle('TITLE_ID'));
        expect(state.titleId).toBe('TITLE_ID');
    })
})

