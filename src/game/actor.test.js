import {defineActor, withName, withType} from './actor';
import flow from 'lodash/flow'
describe('defineActor', () => {
    it('should take an ID as the first parameter', () => {
        let actor = defineActor('ID')
        expect(actor).toBeDefined()
    })
    it('should throw if an ID is not specified', () => {
        expect(() => defineActor()).toThrow()
    })
    it('should throw if the ID is not a string', () => {
        expect(() => defineActor(true).toThrow())
    })
    it('can take definition functions as subsequent parameters', () => {
        let identity1 = jest.fn(actor => actor);
        let testFn1 = config => identity1;
        let identity2 = jest.fn(actor => actor);
        let testFn2 = config => identity2;
        let actor = defineActor('ID', testFn1('test'), testFn2('test'))
        expect(actor).toBeDefined();
        expect(identity1).toBeCalled();
        expect(identity2).toBeCalled();
    })
})

function commonTests(definitionFn, ...testArgs) {
    it('takes a config as parameters and returns a function', () => {
        expect(definitionFn(...testArgs)).toEqual(expect.any(Function))
    })
    test('the returned actor is not the same object', () => {
        let obj = {};
        let actor = definitionFn(...testArgs)(obj)
        expect(actor).not.toBe(obj);
    })
}

describe('withName', () => {
    commonTests(withName, 'test')
    it('returns a function that takes an object and returns an object with the name added', () => {
        let namedObj = withName('test')({});
        expect(namedObj).toEqual(expect.any(Object))
        expect(namedObj.name).toBe('test');
    })
    
    it('throws if name is not a string', () => {
        expect(() => withName({})).toThrow()
    })
    test('in case of multiple withName, the last one overwrites the others', () => {
        let namedTwice = flow(
            withName('test1'),
            withName('test2')
        )({})
        expect(namedTwice.name).toBe('test2')
    })
})

describe('withType', () => {
    commonTests(withType, 'test')
    it('returns a function that takes an object and returns an object with the type added', () => {
        let typedObj = withType('test')({});
        expect(typedObj).toEqual(expect.any(Object))
        expect(typedObj.type).toBe('test');
    })
    
    it('throws if type is not a string', () => {
        expect(() => withType({})).toThrow()
    })
    test('in case of multiple withType, the last one overwrites the others', () => {
        let typedTwice = flow(
            withType('test1'),
            withType('test2')
        )({})
        expect(typedTwice.type).toBe('test2')
    })
})