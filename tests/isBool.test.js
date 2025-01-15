import { isBool } from '../dist/index'
import { describe, expect, it } from 'vitest'

describe("#isBool", () => {
    it( "return true for boolean", () => {
        expect( isBool(true) ).toBe(true)
        expect( isBool(false) ).toBe(true)
    })

    it( "return false for not boolean", () => {
        expect( isBool(0) ).toBe(false)
        expect( isBool(1.1) ).toBe(false)
        expect( isBool(null) ).toBe(false)
        expect( isBool(undefined) ).toBe(false)
        expect( isBool('') ).toBe(false)
        expect( isBool([]) ).toBe(false)
        expect( isBool({}) ).toBe(false)
    })
})