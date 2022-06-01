import { cwd } from "process"

import { IOptions, OutputFunctionType, OutputType } from "./types"

export class FilesTree {
    private _options: IOptions = {
        entry: "",
        path: "absolute",
        flat: false,
        output: "path",
    }

    constructor(options: IOptions) {
        this._options = {
            ...options,
            ...this._options,
        }
    }

    private _generateTree = (file: string, dir: string): OutputType<typeof this._options["output"]>[] => {
        // TODO 递归生成树
        return
    }

    output: OutputFunctionType<typeof this._options["output"]> = () => {
        const { entry, flat, path } = this._options

        // entry
        if (!entry) {
            return null
        }

        const tmp = this._generateTree(entry, path === "relative" ? "." : cwd())

        return flat ? tmp.flat(Infinity) : tmp
    }
}