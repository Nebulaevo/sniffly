import { dictHasEntries } from '../dist/index'
import { describe, expect, it } from 'vitest'

describe("#dictHasEntries", () => {
    it( "return true for non empty", () => {
        expect( dictHasEntries({'a': 1}) ).toBe(true)
    })
    
    it( "return false for empty", () => {
        expect( dictHasEntries({}) ).toBe(false)
    })
})