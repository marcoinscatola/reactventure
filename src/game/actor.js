import flow from 'lodash/flow';
import isString from 'lodash/isString';
export function defineActor(id, ...definitions) {
    if (!isString(id)) throw new Error('Actor id must be a string');
    let actor = flow(...definitions)({id});
    return actor;
}

export const withName = name => {
    if (!isString(name)) throw new Error('Actor name must be a string');
    return actor => ({
        ...actor,
        name
    })
}

export const withType = type => {
    if (!isString(type)) throw new Error('Actor type must be a string');
    return actor => ({
        ...actor,
        type
    })
}