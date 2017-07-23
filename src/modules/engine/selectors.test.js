import * as engineSelectors from './selectors';

const testState1 = {
    engine: {
        tickInterval: 123,
        paused: true,
        currentTick: 10,
        schedule: []
    }
}
let scheduledAction1 = {
    id: 'abc',
    action: {type: 'TEST'},
    tick: 20
}
let scheduledAction2 = {
    id: 'def',
    action: {type: 'TEST2'},
    tick: 55
}
let scheduledAction3 = {
    id: 'ghi',
    action: {type: 'TEST3'},
    tick: 1
}
const testState2 = {
    engine: {
        tickInterval: 987,
        paused: false,
        currentTick: 304440,
        schedule: [scheduledAction1, scheduledAction2, scheduledAction3]
    }
}

test('engineSelectors.getEngineState() returns the correct state slice', () => {
    expect(engineSelectors.getEngineState(testState1))
    .toEqual({
        tickInterval: 123,
        paused: true,
        currentTick: 10,
        schedule: []
    })
    expect(engineSelectors.getEngineState(testState2))
    .toEqual({
        tickInterval: 987,
        paused: false,
        currentTick: 304440,
        schedule: [scheduledAction1, scheduledAction2, scheduledAction3]
    })
})

test('engineSelectors.isPaused() returns the correct state slice', () => {
    expect(engineSelectors.isPaused(testState1)).toBe(true)
    expect(engineSelectors.isPaused(testState2)).toBe(false)
})

test('engineSelectors.getTickInterval() returns the correct state slice', () => {
    expect(engineSelectors.getTickInterval(testState1)).toBe(123)
    expect(engineSelectors.getTickInterval(testState2)).toBe(987)
})

test('engineSelectors.getCurrentTick() returns the correct state slice', () => {
    expect(engineSelectors.getCurrentTick(testState1)).toBe(10)
    expect(engineSelectors.getCurrentTick(testState2)).toBe(304440)
})

test('engineSelectors.getScheduledActions() returns the correct actions', () => {
    let actions;

    actions = engineSelectors.getScheduledActions(testState1, 200)
    expect(actions).toEqual([])

    actions = engineSelectors.getScheduledActions(testState2, 1)
    expect(actions).toContainEqual(scheduledAction3)
    expect(actions.length).toBe(1)

    actions = engineSelectors.getScheduledActions(testState2, 0)
    expect(actions).toEqual([])

    actions = engineSelectors.getScheduledActions(testState2, 15)
    expect(actions).toContainEqual(scheduledAction3)
    expect(actions.length).toBe(1)

    actions = engineSelectors.getScheduledActions(testState2, 20)
    expect(actions).toContainEqual(scheduledAction3)
    expect(actions).toContainEqual(scheduledAction1)
    expect(actions.length).toBe(2)

    actions = engineSelectors.getScheduledActions(testState2, 9001)
    expect(actions).toContainEqual(scheduledAction1)
    expect(actions).toContainEqual(scheduledAction2)
    expect(actions).toContainEqual(scheduledAction3)
    expect(actions.length).toBe(3)
})

test('engineSelectors.getFirstScheduledAction() returns the correct action', () => {
    let action;

    action = engineSelectors.getFirstScheduledAction(testState1, 200)
    expect(action).toBe(null)

    action = engineSelectors.getFirstScheduledAction(testState2, 1)
    expect(action).toEqual(scheduledAction3)

    action = engineSelectors.getFirstScheduledAction(testState2, 0)
    expect(action).toEqual(null)

    action = engineSelectors.getFirstScheduledAction(testState2, 20)
    expect(action).toEqual(scheduledAction3)

    action = engineSelectors.getFirstScheduledAction(testState2, 9001)
    expect(action).toEqual(scheduledAction3)
})
