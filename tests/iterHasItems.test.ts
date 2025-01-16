import { iterHasItems } from '../dist/index'
import { describe, expect, it } from 'vitest'

describe("#iterHasItems", () => {
    it( "identifies a non empty iterable object", () => {
        // valid
        expect( iterHasItems([1]) ).toBe(true)
        expect( iterHasItems('1') ).toBe(true)

        // invalid
        expect( iterHasItems([]) ).toBe(false)
        expect( iterHasItems('') ).toBe(false)
    })
})