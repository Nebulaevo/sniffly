import type { Dict_T } from './utility-types'

type objWithLength_T = {
    length: number
}

type numberCheckerOptions_T = {
    positive?: boolean,
    max?: number,
    min?: number,
}

type stringCheckingOptions_T = {
    nonEmpty?: boolean,
    regexPattern?: RegExp,
}

type ItemTypeMap_T = {
    any: any
    unknown: unknown

    string: string
    number: number
    boolean: boolean

    array: unknown[]
    dict: Dict_T<unknown>
}

type arrayCheckingOptions_T<T extends keyof ItemTypeMap_T> = {
    nonEmpty?: boolean,
    itemType?: T
}

type dictCheckingOptions_T<K extends string, T extends keyof ItemTypeMap_T> = {
    nonEmpty?: boolean,
    itemType?: T,
    keys?: K[]
}

/**
 * checks that an iterable is not empty
 * 
 * @param value an object having a length attribute
 * @returns true if the object's length is more than zero
 */
function iterHasItems( value: objWithLength_T ) {
    return value.length > 0
}

/**
 * checks that a dictionary is not empty
 * 
 * @param value a key/value object (dict)
 * @returns true if the object's length is more than zero
 */
function dictHasEntries( value: Dict_T<any> ) {
    return iterHasItems( Object.keys(value) )
}

/**
 * checks that the value is a boolean
 * 
 * @returns true if the value is of type boolean
 */
function isBool( value:unknown ): value is boolean {
    return typeof value === 'boolean'
}

/**
 * checks that the value is a number satisfying optionnal specifications
 * (NaN is not considered as a number)
 * 
 * @param value unknown value to check
 * @param options (dict) optionnal additionnal specifications
 * @param options.positive (boolean) checks number is > 0
 * @param options.min (number) checks number is >= min
 * @param options.max (number) checks number is <= max
 * 
 * @returns boolean indicating if value satisfies requirements
 */
function isNumber( value:unknown, options?:numberCheckerOptions_T ): value is number {
    
    if ( typeof value !== 'number' || isNaN(value) ) return false

    if (options) {
        const { positive, max, min } = options

        if ( positive && value <= 0 ) return false
        if ( typeof max === 'number' && value > max ) return false
        if ( typeof min === 'number' && value < min ) return false
    }
    
    return true
}

/**
 * checks that the value is a string satisfying optionnal specifications
 * 
 * @param value unknown value to check
 * @param options (dict) optionnal additionnal specifications
 * @param options.nonEmpty (boolean) checks that string is not empty
 * @param options.regexPattern (RegExp) checks that string matches pattern
 * 
 * @returns boolean indicating if value satisfies requirements
 */
function isString( value:unknown, options?:stringCheckingOptions_T ): value is string {

    if (typeof value !== 'string' ) return false

    if ( options ) {
        const { nonEmpty, regexPattern } = options 
        if (nonEmpty && !iterHasItems(value)) return false
        if (regexPattern && !value.match(regexPattern)) return false
    }
    return true
}

/**
 * checks that the value is an array satisfying optionnal specifications
 * 
 * @param value unknown value to check
 * @param options (dict) optionnal additionnal specifications
 * @param options.nonEmpty (boolean) checks that the array has items
 * @param options.itemType (literal string: "any", "unknown", "string", "number", "boolean", "array", "dict") check type of array's items
 * 
 * @returns boolean indicating if value satisfies requirements
 */
function isArray<T extends keyof ItemTypeMap_T = "unknown">(
    value: unknown,
    options?: arrayCheckingOptions_T<T>
): value is Array<ItemTypeMap_T[T]> {

    if (!Array.isArray(value)) return false
    
    if ( options ) {
        const { nonEmpty, itemType } = options

        if (nonEmpty && !iterHasItems(value)) return false

        if (itemType) {
            let itemsAreValid = false
            const nonCheckedTypes = ["any", "unknown"]
            const primitiveTypes = [ "string", "number", "boolean" ]

            if ( nonCheckedTypes.includes(itemType) ) {
                itemsAreValid = true
            } else if ( primitiveTypes.includes(itemType) ) {
                itemsAreValid = value.every((item) => typeof item === itemType)
            } else if ( itemType === 'array' ) {
                itemsAreValid = value.every((item) => Array.isArray(item))
            } else if ( itemType === 'dict' ) {
                itemsAreValid = value.every((item) => isDict(item))
            }

            if (!itemsAreValid) return false
        }
    }

    return true
}

/**
 * checks that the value is a key/value pair dictionnary satisfying optionnal specifications
 * 
 * @param value unknown value to check
 * @param options (dict) optionnal additionnal specifications
 * @param options.nonEmpty (boolean) checks that the dictionnary has entries
 * @param options.keys (string array) expected keys that should be present in the dict
 * @param options.itemType (literal string: "any", "unknown", "string", "number", "boolean", "array", "dict") check type of entries
 * 
 * @returns boolean indicating if value satisfies requirements
 */
function isDict<K extends string, T extends keyof ItemTypeMap_T = "unknown">(
    value: unknown,
    options?: dictCheckingOptions_T<K, T>
): value is Record<K, ItemTypeMap_T[T]> {

    if (typeof value !== "object" || value === null || Array.isArray(value)) {
        return false
    }
    
    if (options) {
        const {nonEmpty, keys, itemType } = options
    
        if ( nonEmpty && !dictHasEntries(value) ) return false
        if ( keys && !keys.every((key) => key in value)) return false
    
        if (itemType) {
            let itemsAreValid = false
            const dictEntries = Object.values(value)
            const nonCheckedTypes = ["any", "unknown"]
            const primitiveTypes = [ "string", "number", "boolean" ]

            if ( nonCheckedTypes.includes(itemType) ) {
                itemsAreValid = true
            } else if ( primitiveTypes.includes(itemType) ) {
                itemsAreValid = dictEntries.every((entry) => typeof entry === itemType)
            } else if ( itemType === 'array' ) {
                itemsAreValid = dictEntries.every((entry) => Array.isArray(entry))
            } else if ( itemType === 'dict' ) {
                itemsAreValid = dictEntries.every((entry) => isDict(entry))
            }

            if (!itemsAreValid) return false
        }
    }

    return true
}

export {
    iterHasItems,
    dictHasEntries,

    isBool,
    isNumber,
    isString,

    isArray,
    isDict
}

export type {
    Dict_T
}
