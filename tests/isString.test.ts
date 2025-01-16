import { isString } from '../dist/index'
import { describe, expect, it } from 'vitest'

describe("#isString", () => {
    it( "identifies string", () => {
        // valid
        expect( isString('') ).toBe(true)
        expect( isString('test') ).toBe(true)

        // invalid
        expect( isString(0) ).toBe(false)
        expect( isString(1.1) ).toBe(false)
        expect( isString(null) ).toBe(false)
        expect( isString(undefined) ).toBe(false)
        expect( isString(true) ).toBe(false)
        expect( isString([]) ).toBe(false)
        expect( isString({}) ).toBe(false)
    })

    it( "can apply 'non empty' restriction", () => {
        // valid
        expect( isString('test', {nonEmpty:true}) ).toBe(true)

        // invalid
        expect( isString('', {nonEmpty:true}) ).toBe(false)
    })

    it( "can apply 'pattern' restriction", () => {
        // valid
        expect( isString('1.2.5', {regexPattern: /^\d(?:\.\d)*$/}) ).toBe(true)

        // invalid
        expect( isString('A.B.G', {regexPattern: /^\d(?:\.\d)*$/}) ).toBe(false)
    })

    it( "can apply multiple restrictions", () => {
        // valid
        expect( isString('1.2.5', {nonEmpty:true, regexPattern: /^\d(?:\.\d)*$/}) ).toBe(true)

        // invalid
        expect( isString('', {nonEmpty:true, regexPattern: /^$/}) ).toBe(false)
        expect( isString('test', {nonEmpty:true, regexPattern: /^$/}) ).toBe(false)
    })
})