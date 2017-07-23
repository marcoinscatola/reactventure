export const SET_PLAYER_NAME = 'SET_PLAYER_NAME';
export const SET_PLAYER_TITLE = 'SET_PLAYER_TITLE';

export const setPlayerName = name => ({
    type: SET_PLAYER_NAME,
    payload: {name}
})

export const setPlayerTitle = titleId => ({
    type: SET_PLAYER_TITLE,
    payload: {titleId}
})
