import { isNumber } from '../dist/index'
import { describe, expect, it } from 'vitest'

describe("#isNumber", () => {

    it( "return true if restrictions are respected", () => {
        // numbers
        expect( isNumber(1.1) ).toBe(true)
        expect( isNumber(0) ).toBe(true)
        expect( isNumber(-10) ).toBe(true)

        // positive numbers
        expect( isNumber(1, {positive:true}) ).toBe(true)
        expect( isNumber(1.1, {positive:true}) ).toBe(true)
        
        // numbers in bounds
        expect( isNumber(1, {min:1, max:2}) ).toBe(true)
        expect( isNumber(-1.1, {min:-2, max:0}) ).toBe(true)

        // multiple restrictions
        expect( isNumber(2, {positive:true, min:-10, max:2}) ).toBe(true)
    })

    it( "return false if restrictions are not respected", () => {
        // not a number
        expect( isNumber(NaN) ).toBe(false)
        expect( isNumber(null) ).toBe(false)
        expect( isNumber(undefined) ).toBe(false)
        expect( isNumber(true) ).toBe(false)
        expect( isNumber('') ).toBe(false)
        expect( isNumber([]) ).toBe(false)
        expect( isNumber({}) ).toBe(false)

        // doesn't respect restriction
        expect( isNumber(-1, {positive:true}) ).toBe(false)
        expect( isNumber(0, {positive:true}) ).toBe(false)
        expect( isNumber(-1.1, {positive:true}) ).toBe(false)
        
        expect( isNumber(-5.5, {min:1, max:2}) ).toBe(false)
        expect( isNumber(10, {min:1, max:2}) ).toBe(false)
        expect( isNumber(-3, {min:-2, max:0}) ).toBe(false)
        expect( isNumber(1.1, {min:-2, max:0}) ).toBe(false)

        // respect half the restrictions
        expect( isNumber(-3, {positive:true, min:-10, max:2}) ).toBe(false)
        expect( isNumber(2.1, {positive:true, min:-10, max:2}) ).toBe(false)
        
    })
})