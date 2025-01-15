import { iterHasItems } from '../dist/index'
import { describe, expect, it } from 'vitest'

describe("#iterHasItems", () => {
    it( "return true for non empty", () => {
        expect( iterHasItems([1]) ).toBe(true)
        expect( iterHasItems('1') ).toBe(true)
    })

    it( "return false for empty", () => {
        expect( iterHasItems([]) ).toBe(false)
        expect( iterHasItems('') ).toBe(false)
    })
})