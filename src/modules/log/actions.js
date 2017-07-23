import * as logConstants from './constants';
export const LOG_MESSAGE = 'LOG_MESSAGE';

export const log = (messageId, logType=logConstants.SYSTEM, args={}) => ({
    type: LOG_MESSAGE,
    payload: {
        messageId,
        logType,
        args
    }
})
