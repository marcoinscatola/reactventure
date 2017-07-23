import * as selectors from './selectors';

test('getPlayerName selects the correct state slice', () => {
    let state = {
        player: {
            name: 'testName'
        }
    }
    expect(selectors.getPlayerName(state)).toBe('testName');
})

test('getPlayerTitleId selects the correct state slice', () => {
    let state = {
        player: {
            titleId: 'testTitleId'
        }
    }
    expect(selectors.getPlayerTitleId(state)).toBe('testTitleId');
})

test('isPlayerAlive selects the correct state slice', () => {
    let state = {
        player: {
            alive: true
        }
    }
    expect(selectors.isPlayerAlive(state)).toBe(true)
})
