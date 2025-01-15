import { isDict } from '../dist/index'
import { describe, expect, it } from 'vitest'

describe("#isDict", () => {

    it( "return true if restrictions are respected", () => {

        // array
        expect( isDict({}) ).toBe(true)
        expect( isDict({a:1, b:2}) ).toBe(true)

        // non empty
        expect( isDict({a:1}, {nonEmpty:true}) ).toBe(true)

        // restricted item type
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
        
        // expected keys
        expect( isDict({a:1, b:2}, {keys: ['a', 'b']}) ).toBe(true)
        expect( isDict({a:1, b:2, c:3}, {keys: ['a', 'b']}) ).toBe(true)

        // multiple restrictions
        expect( isDict({a:'a', b:'b'}, {nonEmpty:true, itemType: "string", keys: ['a', 'b']}) ).toBe(true)
    })

    it( "return false if restrictions are not respected", () => {
        // not an array
        expect( isDict('') ).toBe(false)
        expect( isDict(0) ).toBe(false)
        expect( isDict(1.1) ).toBe(false)
        expect( isDict(null) ).toBe(false)
        expect( isDict(undefined) ).toBe(false)
        expect( isDict(true) ).toBe(false)
        expect( isDict([]) ).toBe(false)   

        // doesn't respect restriction
        expect( isDict({}, {nonEmpty:true}) ).toBe(false)

        expect( isDict({a:1, b:2}, {itemType: "string"}) ).toBe(false)

        expect( isDict({a:1, b:2}, {keys: ['y', 'z']}) ).toBe(false)
    
        // respect half the restrictions
        expect( isDict({}, {nonEmpty:true, itemType: "string", keys: ['a', 'b']}) ).toBe(false)
        expect( isDict({a:1}, {nonEmpty:true, itemType: "string", keys: ['a', 'b']}) ).toBe(false)
        expect( isDict({a:'a'}, {nonEmpty:true, itemType: "string", keys: ['y', 'z']}) ).toBe(false)
    })
})