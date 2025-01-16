import { isDict } from '../dist/index'
import { describe, expect, it } from 'vitest'

describe("#isDict", () => {

    it( "identifies key/value pair objects", () => {
        // valid
        expect( isDict({}) ).toBe(true)
        expect( isDict(Object.create(Object.prototype)) ).toBe(true)
        expect( isDict({a:1, b:2}) ).toBe(true)

        // invalid
        expect( isDict('') ).toBe(false)
        expect( isDict(0) ).toBe(false)
        expect( isDict(1.1) ).toBe(false)
        expect( isDict(null) ).toBe(false)
        expect( isDict(undefined) ).toBe(false)
        expect( isDict(true) ).toBe(false)
        expect( isDict([]) ).toBe(false)   

        // objects created with no prototypes are a special case
        // for sanity reasons we will just consider they are invalid
        expect( isDict(Object.create(null)) ).toBe(false)

        // objects built with classes should be invalid
        expect( isDict( new Map() ) ).toBe(false)
        expect( isDict( new Set() ) ).toBe(false)
        expect( isDict( new (class Foo{}) ) ).toBe(false)
    })

    it("can apply 'non empty' restriction", () => {
        // valid
        expect( isDict({a:1}, {nonEmpty:true}) ).toBe(true)

        // invalid
        expect( isDict({}, {nonEmpty:true}) ).toBe(false)
    })

    it("can apply 'item type' restriction", () => {
        // valid
        expect( isDict({a:1, b:2}, {itemType: "unknown"}) ).toBe(true)
        expect( isDict({a:1, b:2}, {itemType: "any"}) ).toBe(true)
        expect( isDict({a:true, b:false}, {itemType: "boolean"}) ).toBe(true)
        expect( isDict({a:'a', b:'b'}, {itemType: "string"}) ).toBe(true)
        expect( isDict({a:1, b:2}, {itemType: "number"}) ).toBe(true)
        expect( isDict({a:[], b:[1,2]}, {itemType: "array"}) ).toBe(true)
        expect( isDict({a:{}, b:{z:1}}, {itemType: "dict"}) ).toBe(true)

        expect( isDict({}, {itemType: "unknown"}) ).toBe(true)
        expect( isDict({}, {itemType: "any"}) ).toBe(true)
        expect( isDict({}, {itemType: "boolean"}) ).toBe(true)
        expect( isDict({}, {itemType: "string"}) ).toBe(true)
        expect( isDict({}, {itemType: "number"}) ).toBe(true)
        expect( isDict({}, {itemType: "array"}) ).toBe(true)
        expect( isDict({}, {itemType: "dict"}) ).toBe(true)

        // invalid
        expect( isDict({a:1, b:2}, {itemType: "string"}) ).toBe(false)
    })

    it("can apply 'expected keys' restriction", () => {
        // valid
        expect( isDict({a:1, b:2}, {keys: ['a', 'b']}) ).toBe(true)
        expect( isDict({a:1, b:2, c:3}, {keys: ['b', 'c']}) ).toBe(true)

        // invalid
        expect( isDict({a:1, b:2}, {keys: ['y', 'z']}) ).toBe(false)
    })

    it( "can apply multiple restrictions", () => {
        // valid
        expect( isDict({a:'a', b:'b'}, {nonEmpty:true, itemType: "string", keys: ['a', 'b']}) ).toBe(true)
    
        // invalid
        expect( isDict({}, {nonEmpty:true, itemType: "string", keys: []}) ).toBe(false)
        expect( isDict({a:1, b:2}, {nonEmpty:true, itemType: "string", keys: ['a', 'b']}) ).toBe(false)
        expect( isDict({a:'a'}, {nonEmpty:true, itemType: "string", keys: ['a', 'b']}) ).toBe(false)
    })
})