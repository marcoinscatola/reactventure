import {combineReducers} from 'redux';
import {authReducer as auth} from 'modules/auth';
import {engineReducer as engine} from 'modules/engine';
import {logReducer as log} from 'modules/log';
import {playerReducer as player} from 'modules/player';
export default combineReducers({
    auth,
    engine,
    log,
    player,
});
