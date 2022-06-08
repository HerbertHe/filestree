import type { Stats } from "fs"

/**
 * Filter Function
 */
export type FilterFunctionType = (filename: string, stats?: Stats) => boolean

/**
 * IOptions
 *
 * @type {string} entry - The entry path
 * @type {number} depth - The depth of the search
 * @type {RegExp | FilterFunction} filter - The filter to filter the files
 * @type {"relative" | "absolute"} path - The path type
 * @type {boolean} flat - Whether to flatten the output
 * @type {"path" | "stats" | "custom"} output - The output type
 * @type {function} custom - The custom output function
 *
 */
export interface IOptions {
    entry: string
    depth?: number
    filter?: RegExp | FilterFunctionType
    path?: "relative" | "absolute"
    flat?: boolean
    output?: "path" | "stats"
    custom?: (filename: string, path: string, stats: Stats) => any
}

export interface IFileTree<T> {
    name: string
    dir: boolean
    target: string | Stats
    files: IFileTree<T>[]
}

export type OutputType<T extends any = any> = IFileTree<string | Stats> | T

export type OutputFunctionType = () => OutputType[]