export const logState = state => state.log;

export const getLogs = state => logState(state).logs;

export const getFilteredLogs = (state, filter=[]) => {
    let logs = getLogs(state);
    if (filter.length === 0) return logs;
    return logs.filter(log => filter.indexOf(log.logType) !== -1)
}
