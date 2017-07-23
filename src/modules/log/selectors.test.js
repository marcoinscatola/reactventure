import * as selectors from './selectors';

test('logsSelectors.getLogs selects the correct state slice', () => {
    let logMessage1 = {messageId:1, logType: 'TEST', args:{}}
    let logMessage2 = {messageId:2, logType: 'TEST', args:{}}
    let state = {
        log: {
            logs: [logMessage1, logMessage2]
        }   
    }
    expect(selectors.getLogs(state)).toEqual([logMessage1, logMessage2])
})

test('logsSelectors.filteredLogs select the correct state slice', () => {
    let battleMessage1 = {messageId:1, logType: 'BATTLE', args:{}}
    let battleMessage2 = {messageId:2, logType: 'BATTLE', args:{}}
    let battleMessage3 = {messageId:3, logType: 'BATTLE', args:{}}
    let systemMessage1 = {messageId:1, logType: 'SYSTEM', args:{}}
    let systemMessage2 = {messageId:2, logType: 'SYSTEM', args:{}}
    let systemMessage3 = {messageId:3, logType: 'SYSTEM', args:{}}
    let chatMessage1 = {messageId:1, logType: 'CHAT', args:{}}
    let chatMessage2 = {messageId:2, logType: 'CHAT', args:{}}
    let chatMessage3 = {messageId:3, logType: 'CHAT', args:{}}

    let state = {
        log: {
            logs: [
                battleMessage1,
                battleMessage2,
                systemMessage1,
                chatMessage1,
                battleMessage3,
                chatMessage2,
                systemMessage2,
                chatMessage3,
                systemMessage3
            ]
        }
    }
    
    expect(selectors.getFilteredLogs(state, []))
    .toEqual(state.log.logs)

    expect(selectors.getFilteredLogs(state, ['BATTLE']))
    .toEqual([battleMessage1, battleMessage2, battleMessage3])

    expect(selectors.getFilteredLogs(state, ['SYSTEM', 'CHAT']))
    .toEqual([
        systemMessage1, 
        chatMessage1, 
        chatMessage2, 
        systemMessage2, 
        chatMessage3, 
        systemMessage3
    ])
})
