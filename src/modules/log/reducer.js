import {handleActions} from 'redux-actions'
import * as logActions from './actions';
import take from 'lodash/take';
import difference from 'lodash/difference';

const initialState = {
    logs: [],
    panes: [],
    limit: 50
}

export default handleActions({
    [logActions.LOG_MESSAGE]: (state, {payload:{messageId, logType, args}}) => {
        let newLog = {
            messageId,
            logType,
            args
        }
        let {limit, logs} = state;
        let updatedLogs = [...logs, newLog];
        let logsOfType = updatedLogs.filter(log => log.logType === logType);
        let overflow = logsOfType.length - limit;
        let logsToRemove = take(updatedLogs, overflow);
        updatedLogs = difference(updatedLogs, logsToRemove);

        return {
            ...state,
            logs: updatedLogs
        }
    }
}, initialState)
