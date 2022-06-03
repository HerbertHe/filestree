import type { Stats } from "fs"

/**
 * Filter Function
 */
export type FilterFunctionType = (filename: string) => boolean

/**
 * IOptions
 *
 * @type {string} entry - The entry path
 * @type {number} depth - The depth of the search
 * @type {RegExp | FilterFunction} filter - The filter to filter the files
 * @type {"relative" | "absolute"} path - The path type
 * @type {boolean} flat - Whether to flatten the output
 *
 */
export interface IOptions {
    entry: string
    depth?: number
    filter?: RegExp | FilterFunctionType
    path?: "relative" | "absolute"
    flat?: boolean
    output?: "path" | "stats"
}

export interface IFileTree<T> {
    name: string
    dir: boolean
    target: string | Stats
    files: IFileTree<T>[]
}

export type OutputType = IFileTree<string | Stats>

export type OutputFunctionType = () => OutputType[]