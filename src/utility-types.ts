
/** Utility type representing key/value pair dictionnary with string keys */
type Dict_T<EntriesType> = { [key:string]: EntriesType }

/** Utility type allowing to unpack nested types */
type Prettify_T<T> = {
    [K in keyof T]: T[K]
} & {}

/** Utility type allowing to create branded types */
declare const brand: unique symbol
type Brand_T<
    T, Brand_T extends string
> = T & { [brand]: Brand_T }

export type {
    Dict_T,
    Prettify_T,
    Brand_T
}