import { Stats } from "fs"
import { assert, expect, test } from "vitest"
import { FilesTree } from "../src/index"

test("test entry is required", () => {
    try {
        let tree = new FilesTree({
            entry: "",
        }).output()
    } catch (e) {
        assert(e.message === "Entry is required!")
    }
})

test("test entry is not existed", () => {
    try {
        let tree = new FilesTree({
            entry: "test",
        }).output()
    } catch (e) {
        assert(e.message === "Entry is not existed!")
    }
})

test("test depth", () => {
    try {
        let tree = new FilesTree({
            entry: "__test__",
            depth: 1,
        }).output()

        const expected = [{ "name": "depth0", "dir": true, "target": "F:\\Projects\\filestree\\__test__\\depth0", "files": [{ "name": "depth1", "dir": true, "target": "F:\\Projects\\filestree\\__test__\\depth0\\depth1", "files": [] }] }, { "name": "index.test.ts", "dir": false, "target": "F:\\Projects\\filestree\\__test__\\index.test.ts", "files": [] }]
        expect(tree).toEqual(expected)
    } catch (e) {
        console.error(e)
    }
})

test("test relative path", () => {
    try {
        let tree = new FilesTree({
            entry: "__test__",
            output: "path",
            path: "relative",
            depth: 0
        }).output()

        const expected = [{ "name": "depth0", "dir": true, "target": "__test__\\depth0", "files": [] }, { "name": "index.test.ts", "dir": false, "target": "__test__\\index.test.ts", "files": [] }]

        expect(tree).toEqual(expected)
    } catch (e) {
        console.error(e)
    }
})

test("test flat", () => {
    try {
        let tree = new FilesTree({
            entry: "__test__",
            output: "path",
            flat: true,
            depth: 0
        }).output()

        const expected = [{ "name": "depth0", "dir": true, "target": "F:\\Projects\\filestree\\__test__\\depth0", "files": [] }, { "name": "index.test.ts", "dir": false, "target": "F:\\Projects\\filestree\\__test__\\index.test.ts", "files": [] }]

        expect(tree).toEqual(expected)
    }
    catch (e) {
        console.error(e)
    }
})

test("test filter", () => {
    try {
        let tree = new FilesTree({
            entry: "__test__",
            output: "path",
            filter: /\.ts$/,
        }).output()

        const expected = [{ "name": "index.test.ts", "dir": false, "target": "F:\\Projects\\filestree\\__test__\\index.test.ts", "files": [] }]

        expect(tree).toEqual(expected)
    } catch (e) {
        console.error(e)
    }
})

test("test filter function", () => {
    try {
        let tree = new FilesTree({
            entry: "__test__",
            output: "path",
            filter: (filename) => {
                return filename.endsWith(".ts")
            },
        }).output()

        const expected = [{ "name": "index.test.ts", "dir": false, "target": "F:\\Projects\\filestree\\__test__\\index.test.ts", "files": [] }]

        expect(tree).toEqual(expected)
    } catch (e) {
        console.error(e)
    }
})

test("test output stats", () => {
    try {
        let tree = new FilesTree({
            entry: "__test__",
            output: "stats",
            filter: /\.ts$/,
        }).output()

        expect(tree[0].target instanceof Stats).toBe(true)
    } catch (e) {
        console.error(e)
    }
})

test("test custom output function", () => {
    try {
        interface CustomOutput {
            import: string
        }

        let tree = new FilesTree({
            entry: "__test__",
            filter: /\.ts$/,
            path: "relative",
            custom: <CustomOutput>(filename: string, path: string, stats: Stats) => {
                const fn = filename.replace(/.test.ts$/g, "")
                const tmp = {
                    import: `import ${fn[0].toUpperCase() + fn.slice(1)} from "${path.replace("__test__", ".").replace(/\\/g, "/")}"`
                } as unknown as CustomOutput
                return tmp
            },
        }).output()

        const expected = [{ "import": "import Index from \"./index.test.ts\"" }]

        expect(tree).toEqual(expected)
    } catch (e) {
        console.error(e)
    }
})

test("test custom output function with filter function", () => {
    try {
        interface CustomOutput {
            import: string
        }

        let tree = new FilesTree({
            entry: "__test__",
            filter: (filename) => {
                return filename.endsWith(".ts")
            },
            path: "relative",
            custom: <CustomOutput>(filename: string, path: string, stats: Stats) => {
                const fn = filename.replace(/.test.ts$/g, "")
                const tmp = {
                    import: `import ${fn[0].toUpperCase() + fn.slice(1)} from "${path.replace("__test__", ".").replace(/\\/g, "/")}"`
                } as unknown as CustomOutput
                return tmp
            },
        }).output()

        const expected = [{ "import": "import Index from \"./index.test.ts\"" }]

        expect(tree).toEqual(expected)
    } catch (e) {
        console.error(e)
    }
})

test("test custom output function without filter", () => {
    try {
        interface CustomOutput {
            filename: string
        }

        let tree = new FilesTree({
            entry: "__test__",
            path: "relative",
            depth: 0,
            custom: <CustomOutput>(filename: string, path: string, stats: Stats) => {
                const tmp = {
                    filename
                } as unknown as CustomOutput
                return tmp
            },
        }).output()

        const expected = [{ "filename": "depth0" }, { "filename": "index.test.ts" }]
        expect(tree).toEqual(expected)
    } catch (e) {
        console.error(e)
    }
})