import { isArray } from '../dist/index'
import { describe, expect, it } from 'vitest'

describe("#isArray", () => {

    it( "return true if restrictions are respected", () => {

        // array
        expect( isArray([]) ).toBe(true)
        expect( isArray([1,2,3]) ).toBe(true)

        // non empty
        expect( isArray([1], {nonEmpty:true}) ).toBe(true)

        // restricted item type
        expect( isArray([1, 2, 3], {itemType: "unknown"}) ).toBe(true)
        expect( isArray([1, 2, 3], {itemType: "any"}) ).toBe(true)
        expect( isArray([true, false, false], {itemType: "boolean"}) ).toBe(true)
        expect( isArray(['a','b','c'], {itemType: "string"}) ).toBe(true)
        expect( isArray([1, 2, 3], {itemType: "number"}) ).toBe(true)
        expect( isArray([[],['b','c']], {itemType: "array"}) ).toBe(true)
        expect( isArray([{},{a:1}], {itemType: "dict"}) ).toBe(true)

        expect( isArray([], {itemType: "unknown"}) ).toBe(true)
        expect( isArray([], {itemType: "any"}) ).toBe(true)
        expect( isArray([], {itemType: "boolean"}) ).toBe(true)
        expect( isArray([], {itemType: "string"}) ).toBe(true)
        expect( isArray([], {itemType: "number"}) ).toBe(true)
        expect( isArray([], {itemType: "array"}) ).toBe(true)
        expect( isArray([], {itemType: "dict"}) ).toBe(true)
    
        // multiple restrictions
        expect( isArray(['a','b','c'], {nonEmpty:true, itemType: "string"}) ).toBe(true)
    })

    it( "return false if restrictions are not respected", () => {
        // not an array
        expect( isArray('') ).toBe(false)
        expect( isArray(0) ).toBe(false)
        expect( isArray(1.1) ).toBe(false)
        expect( isArray(null) ).toBe(false)
        expect( isArray(undefined) ).toBe(false)
        expect( isArray(true) ).toBe(false)
        expect( isArray({}) ).toBe(false)   

        // doesn't respect restriction
        expect( isArray([], {nonEmpty:true}) ).toBe(false)

        expect( isArray(['a', 'b', 'c'], {itemType: "number"}) ).toBe(false)
    
        // respect half the restrictions
        expect( isArray([], {nonEmpty:true, itemType: "number"}) ).toBe(false)
        expect( isArray(['a', 'b', 'c'], {nonEmpty:true, itemType: "number"}) ).toBe(false)
    })
})