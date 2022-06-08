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
                    const p = join(dir, file)
                    const stat = lstatSync(p)
                    if (filter(file, stat)) {
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


    private _flat = (tree: OutputType[]) => {
        return tree.reduce((acc, item) => {
            if (!!item.files && item.files.length > 0) {
                acc = [...acc, { ...item, files: [] }, ...this._flat(item.files)]
            } else {
                acc.push(item)
            }
            return acc
        }, [])
    }

    output: OutputFunctionType = () => {
        const { entry, flat, path } = this._options

        // entry
        if (!entry) {
            throw new Error("Entry is required!")
        }

        let tmp: OutputType[] = []

        if (typeof entry === "string") {
            if (!existsSync(entry)) {
                throw new Error("Entry is not existed!")
            }

            tmp = this._generateTree(path === "absolute" ? join(process.cwd(), entry) : entry)
        }

        if (Array.isArray(entry)) {
            for (let i = 0; i < entry.length; i++) {
                if (!existsSync(entry[i])) {
                    throw new Error("Entry is not existed!")
                }

                tmp = [...tmp, ...this._generateTree(path === "absolute" ? join(process.cwd(), entry[i]) : entry[i])]
                // reset depth
                this._d = 0
            }
        }

        return flat ? this._flat(tmp) : tmp
    }
}