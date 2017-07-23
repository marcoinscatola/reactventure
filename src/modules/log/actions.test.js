import * as logActions from './actions';
import * as logConstants from './constants';

describe('log()', () => {
    it('creates a LOG_MESSAGE action', () => {
        expect(logActions.log().type)
        .toBe(logActions.LOG_MESSAGE)
    })
    it('takes a messageId, logType and an object of args as parameters', () => {
        expect(logActions.log('id', 'type', {arg1:'arg1', arg2:'arg2'}))
        .toEqual({
            type: logActions.LOG_MESSAGE,
            payload: {
                messageId: 'id',
                logType: 'type',
                args: {arg1:'arg1', arg2:'arg2'}
            }
        })
    })
    it('has a default logType of SYSTEM and default args to empty object', () => {
        expect(logActions.log('id'))
        .toEqual({
            type: logActions.LOG_MESSAGE,
            payload: {
                messageId: 'id',
                logType: logConstants.SYSTEM,
                args: {}
            }
        })
    })
    
})


