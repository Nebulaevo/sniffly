# 👀 Sniffly
**Value Checking Utilities for JavaScript**

Provides a few functions (with type narrowing) performing common simple checks on JS values.


## Functions


### `iterHasItems( value )`

checks that an iterable is not empty

**value** - object having a length attribute


### `dictHasEntries( value )`

checks that a dictionary is not empty

**value** - key/value object (dict)


### `isBool( value )`

checks that the value is a boolean

**value** - unknown value to check


### `isNumber( value, options? )`

checks that the value is a number satisfying optionnal specifications\
(`NaN` is not considered as a valid number)

**value** - unknown value to check\
**options** *(dict)* - optionnal additionnal specifications\
**options.positive** *(boolean)* - checks number is > 0\
**options.min** *(number)* - checks number is >= min\
**options.max** *(number)* - checks number is <= max


### `isString( value, options? )`

checks that the value is a string satisfying optionnal specifications

**value** - unknown value to check\
**options** *(dict)* - optionnal additionnal specifications\
**options.nonEmpty** *(boolean)* - checks that string is not empty\
**options.regexPattern** *(RegExp)* - checks that string matches pattern


### `isArray( value, options? )`

checks that the value is an array satisfying optionnal specifications

**value** - unknown value to check\
**options** *(dict)* - optionnal additionnal specifications\
**options.nonEmpty** *(boolean)* - checks that the array has items\
**options.itemType** *(string literal)* - check type of array's items, following values are accepted:
- "unknown" *(default)* - items aren't checked
- "any" - items aren't checked
- "string" - `string` items only
- "number" - `number` items only
- "boolean" - `boolean` itemps only
- "array" - `Array<unknown>` items only
- "dict" - `Record<string, unknown>` items only


### `isDict( value, options? )`

checks that the value is a key/value pair dictionnary satisfying optionnal specifications

**value** - unknown value to check\
**options** *(dict)* - optionnal additionnal specifications\
**options.nonEmpty** *(boolean)* - checks that the dictionnary has entries\
**options.keys** *(string array)* expected keys that should be present in the dict\
**options.itemType** *(string literal)* - check type of entries, following values are accepted:
- "unknown" *(default)* - entries aren't checked
- "any" - entries aren't checked
- "string" - `string` entries only
- "number" - `number` entries only
- "boolean" - `boolean` entries only
- "array" - `Array<unknown>` entries only
- "dict" - `Record<string, unknown>` entries only


## Types

### `Dict_T<T>`

type of key/value pair dictionnary, with a `string` key.
`T` is the type of the entries of the dictionnary.

#### Example

```typescript
const data: Dict_T<number> = { 'a': 1, 'b': 2 }
```