import { dictHasEntries } from '../dist/index'
import { describe, expect, it } from 'vitest'

describe("#dictHasEntries", () => {
    it( "identifies a non empty key/value object", () => {
        // valid
        expect( dictHasEntries({'a': 1}) ).toBe(true)
        
        // invalid
        expect( dictHasEntries({}) ).toBe(false)
    })
})