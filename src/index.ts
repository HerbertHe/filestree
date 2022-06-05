import { existsSync, readdirSync, lstatSync } from "fs"
import { join } from "path"

import { IOptions, OutputFunctionType, OutputType } from "./types"

export class FilesTree {
    private _options: IOptions = {
        entry: "",
        path: "absolute",
        flat: false,
        output: "path",
        depth: Infinity
    }

    private _d: number = 0

    constructor(options: IOptions) {
        this._options = {
            ...this._options,
            ...options,
        }
    }

    private _generateTree = (dir: string): OutputType[] => {
        const { depth, filter, output, custom } = this._options
        let tmp: OutputType[] = []

        if (this._d <= depth) {
            this._d++

            const files = readdirSync(dir)

            for (let i = 0; i < files.length; i++) {
                const file = files[i]

                if (!!filter && filter instanceof RegExp) {
                    if (filter.test(file)) {
                        const p = join(dir, file)
                        const stat = lstatSync(p)

                        if (!!custom) {
                            tmp.push(custom(file, p, stat))
                        } else {
                            tmp.push({
                                name: file,
                                dir: stat.isDirectory(),
                                target: output === "path" ? p : stat,
                                files: stat.isDirectory() ? this._generateTree(p) : [],
                            })
                        }
                    }
                    continue
                }

                if (!!filter && typeof filter === "function") {
                    if (filter(file)) {
                        const p = join(dir, file)
                        const stat = lstatSync(p)

                        if (!!custom) {
                            tmp.push(custom(file, p, stat))
                        } else {
                            tmp.push({
                                name: file,
                                dir: stat.isDirectory(),
                                target: output === "path" ? p : stat,
                                files: stat.isDirectory() ? this._generateTree(p) : [],
                            })
                        }
                    }
                    continue
                }

                const p = join(dir, file)
                const stat = lstatSync(p)
                if (!!custom) {
                    tmp.push(custom(file, p, stat))
                } else {
                    tmp.push({
                        name: file,
                        dir: stat.isDirectory(),
                        target: output === "path" ? p : stat,
                        files: stat.isDirectory() ? this._generateTree(p) : [],
                    })
                }
                continue
            }
        }

        return tmp
    }

    output: OutputFunctionType = () => {
        const { entry, flat, path } = this._options

        // entry
        if (!entry) {
            throw new Error("Entry is required!")
        }

        if (!existsSync(entry)) {
            throw new Error("Entry is not existed!")
        }

        const tmp = this._generateTree(path === "absolute" ? join(process.cwd(), entry) : entry)

        return flat ? tmp.flat(Infinity) : tmp
    }
}