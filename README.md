# 👀 Sniffly
**Value Checking Utilities for JavaScript**

A lightweight TypeScript utility library for performing common type-safe value checks with type narrowing.

## Install

```
npm i sniffly
```


## Functions


### `iterHasItems( value )`

Checks that an iterable is not empty

#### ⚙️ Arguments:

**value** - object having a length attribute


### `dictHasEntries( value )`

Checks that a dictionary is not empty

#### ⚙️ Arguments:

**value** - key/value pair dictionnary


### `isBool( value )`

Checks that the value is a boolean

#### ⚙️ Arguments:

**value** - unknown value to check


### `isNumber( value, options? )`

Checks that the value is a number satisfying optionnal specifications\
**Remark:**\
`NaN` is not considered as a valid number

#### ⚙️ Arguments:

**value** - unknown value to check\
**options** *(dict)* - optionnal additionnal specifications\
**options.positive** *(boolean)* - checks number is > 0\
**options.min** *(number)* - checks number is >= min\
**options.max** *(number)* - checks number is <= max


### `isString( value, options? )`

Checks that the value is a string satisfying optionnal specifications

#### ⚙️ Arguments:

**value** - unknown value to check\
**options** *(dict)* - optionnal additionnal specifications\
**options.nonEmpty** *(boolean)* - checks that string is not empty\
**options.regexPattern** *(RegExp)* - checks that string matches pattern


### `isArray( value, options? )`

Checks that the value is an array satisfying optionnal specifications

#### ⚙️ Arguments:

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

Checks that the value is a key/value pair dictionnary satisfying optionnal specifications\
**Remark:**\
Only allows objects directly created from `{}` or `Object.create(Object.prototype)`.\
Are considered invalid:
- Objects built from classes like `const obj = new Foo()` or built-ins like `Array`, `Map`, `Set` or `Date`
- Objects with no prototype like `const obj = Object.create(null)`

#### ⚙️ Arguments:

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

### `Dict_T<EntriesType>`

Type of key/value pair dictionnary, with a `string` key.
`EntriesType` generic represents the type of the entries of the dictionnary.

#### Example

```typescript
const data: Dict_T<number> = { 'a': 1, 'b': 2 }
```