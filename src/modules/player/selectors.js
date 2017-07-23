export const playerState = state => state.player;

export const getPlayerName = state => playerState(state).name;

export const getPlayerTitleId = state => playerState(state).titleId;

export const isPlayerAlive = state => playerState(state).alive;
