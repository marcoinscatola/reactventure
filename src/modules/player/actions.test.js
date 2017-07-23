import * as actions from './actions';

describe('playerActions.setPlayerName', () => {
    test('creates a SET_PLAYER_NAME action', () => {
        expect(actions.setPlayerName().type)
        .toBe(actions.SET_PLAYER_NAME)
    })
    test('accepts the name as the only parameter', () => {
        expect(actions.setPlayerName('Gigio'))
        .toEqual({
            type: actions.SET_PLAYER_NAME,
            payload: {
                name: 'Gigio'
            }
        })
    })
})

describe('playerActions.setTitle', () => {
    test('creates a SET_PLAYER_TITLE action', () => {
        expect(actions.setPlayerTitle().type)
        .toBe(actions.SET_PLAYER_TITLE)
    })
    test('accepts the titleId as the only parameter', () => {
        expect(actions.setPlayerTitle('TITLE_01'))
        .toEqual({
            type: actions.SET_PLAYER_TITLE,
            payload: {
                titleId: 'TITLE_01'
            }
        })
    })
})

