
/* dict with string keys 
<T> - type of values */
type Dict_T<T> = { [key:string]: T }
/* ex: const colors: Dict_T<string> */

export type {
    Dict_T
}