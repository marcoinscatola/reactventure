import {combineReducers} from 'redux';
import {authReducer as auth} from 'modules/auth';
import {engineReducer as engine} from 'modules/engine';
export default combineReducers({
    auth,
    engine,
});
