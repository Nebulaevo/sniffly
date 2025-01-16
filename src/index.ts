import type { Dict_T } from './utility-types'

type objWithLength_T = {
    length: number
}

type numberCheckerOptions_T = {
    positive?: boolean,
    min?: number,
    max?: number,
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

type arrayCheckingOptions_T<ItemTypeName extends keyof ItemTypeMap_T> = {
    nonEmpty?: boolean,
    itemType?: ItemTypeName
}

type dictCheckingOptions_T<ObjKeys extends string, ItemTypeName extends keyof ItemTypeMap_T> = {
    nonEmpty?: boolean,
    itemType?: ItemTypeName,
    keys?: ObjKeys[]
}

/** Checks that an iterable is not empty
 * 
 * @param value an object having a length attribute
 * @returns true if the object's length is more than zero
 */
function iterHasItems( value: objWithLength_T ) {
    return value.length > 0
}

/** Checks that a dictionary is not empty
 * 
 * @param value a key/value object (dict)
 * @returns true if the object's length is more than zero
 */
function dictHasEntries( value: Dict_T<any> ) {
    return iterHasItems( Object.keys(value) )
}

/** Checks that the value is a boolean
 * 
 * @returns true if the value is of type boolean
 */
function isBool( value:unknown ): value is boolean {
    return typeof value === 'boolean'
}

/** Checks that the value is a number satisfying optionnal specifications
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

        if ( positive && value <= 0 ) return false;
        if ( isNumber(min) && value < min ) return false;
        if ( isNumber(max) && value > max ) return false;
    }
    
    return true
}

/** Checks that the value is a string satisfying optionnal specifications
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

        if (nonEmpty && !iterHasItems(value)) return false;
        if (regexPattern && !value.match(regexPattern)) return false;
    }
    return true
}

/** Private function checking that all items of an array are of a certain type
 * 
 * @param items list of item to check
 * @param type (literal string: "any", "unknown", "string", "number", "boolean", "array", "dict") expected type of those items
 */
function _itemsAreOfType( items: unknown[], type: keyof ItemTypeMap_T ): boolean {
    const nonCheckedTypes = ["any", "unknown"]
    const primitiveTypes = [ "string", "number", "boolean" ]

    if ( nonCheckedTypes.includes(type) ) return true;
    else if ( primitiveTypes.includes(type) ) return items.every((item) => typeof item === type);
    else if ( type === 'array' ) return items.every((item) => Array.isArray(item));
    else if ( type === 'dict' ) return items.every((item) => isDict(item));
    
    return false
}


/** Checks that the value is an array satisfying optionnal specifications
 * 
 * @param value unknown value to check
 * @param options (dict) optionnal additionnal specifications
 * @param options.nonEmpty (boolean) checks that the array has items
 * @param options.itemType (literal string: "any", "unknown", "string", "number", "boolean", "array", "dict") check type of array's items
 * 
 * @returns boolean indicating if value satisfies requirements
 */
function isArray<ItemTypeName extends keyof ItemTypeMap_T = "unknown">(
    value: unknown,
    options?: arrayCheckingOptions_T<ItemTypeName>
): value is Array<ItemTypeMap_T[ItemTypeName]> {

    if (!Array.isArray(value)) return false
    
    if ( options ) {
        const { nonEmpty, itemType } = options

        if (nonEmpty && !iterHasItems(value)) return false;
        if (itemType && !_itemsAreOfType(value, itemType)) return false;
    }

    return true
}

/** Checks that the value is a key/value pair dictionnary satisfying optionnal specifications
 * 
 * @param value unknown value to check
 * @param options (dict) optionnal additionnal specifications
 * @param options.nonEmpty (boolean) checks that the dictionnary has entries
 * @param options.keys (string array) expected keys that should be present in the dict
 * @param options.itemType (literal string: "any", "unknown", "string", "number", "boolean", "array", "dict") check type of entries
 * 
 * @returns boolean indicating if value satisfies requirements
 */
function isDict<ObjKeys extends string, ItemTypeName extends keyof ItemTypeMap_T = "unknown">(
    value: unknown,
    options?: dictCheckingOptions_T<ObjKeys, ItemTypeName>
): value is Record<ObjKeys, ItemTypeMap_T[ItemTypeName]> {

    if (typeof value !== "object" || value === null || Object.getPrototypeOf(value) !== Object.prototype ) {
        return false
    }
    
    if (options) {
        const {nonEmpty, keys, itemType } = options
    
        if ( nonEmpty && !dictHasEntries(value) ) return false;
        if ( keys && !keys.every((key) => key in value)) return false;
        if (itemType && !_itemsAreOfType(Object.values(value), itemType)) return false;
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
