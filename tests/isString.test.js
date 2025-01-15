import { isString } from '../dist/index'
import { describe, expect, it } from 'vitest'

describe("#isString", () => {

    it( "return true if restrictions are respected", () => {
        // strings
        expect( isString('') ).toBe(true)
        expect( isString('test') ).toBe(true)

        // non empty
        expect( isString('test', {nonEmpty:true}) ).toBe(true)

        // expected pattern
        expect( isString('1.2.5', {regexPattern: /^\d(?:\.\d)*$/}) ).toBe(true)
    
        // multiple restrictions
        expect( isString('1.2.5', {nonEmpty:true, regexPattern: /^\d(?:\.\d)*$/}) ).toBe(true)
    
    })

    it( "return false if restrictions are not respected", () => {
        // not a string
        expect( isString(0) ).toBe(false)
        expect( isString(1.1) ).toBe(false)
        expect( isString(null) ).toBe(false)
        expect( isString(undefined) ).toBe(false)
        expect( isString(true) ).toBe(false)
        expect( isString([]) ).toBe(false)
        expect( isString({}) ).toBe(false)   

        // doesn't respect restriction
        expect( isString('', {nonEmpty:true}) ).toBe(false)

        expect( isString('A.B.G', {regexPattern: /^\d(?:\.\d)*$/}) ).toBe(false)
    
        // respect half the restrictions
        expect( isString('', {nonEmpty:true, regexPattern: /^$/}) ).toBe(false)
        expect( isString('test', {nonEmpty:true, regexPattern: /^$/}) ).toBe(false)
    })
})