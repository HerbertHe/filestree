# FilesTree

[![version](https://img.shields.io/npm/v/@herberthe/filestree.svg)](https://www.npmjs.com/package/@herberthe/filestree)
[![download](https://img.shields.io/npm/dm/@herberthe/filestree.svg)](https://www.npmjs.com/package/@herberthe/filestree)
[![GitHub license](https://img.shields.io/github/license/HerbertHe/filestree)](https://github.com/HerbertHe/filestree/blob/main/LICENSE)
[![GitHub stars](https://img.shields.io/github/stars/HerbertHe/filestree)](https://github.com/HerbertHe/filestree/stargazers)
[![GitHub forks](https://img.shields.io/github/forks/HerbertHe/filestree)](https://github.com/HerbertHe/filestree/network)
[![GitHub issues](https://img.shields.io/github/issues/HerbertHe/filestree)](https://github.com/HerbertHe/filestree/issues)

A library for generating files tree.

## Install

```shell
npm i @herberthe/filestree

# Or
yarn add @herberthe/filestree

# Or

pnpm add @herberthe/filestree
```

## Usage

```typescript
import { FilesTree } from "filestree"

const tree = new FilesTree({
    entry: "<Your Entry Path Here>",
    ...otherOptions
}).output()

console.log(tree)
```

### Options

| Option | Type                                                                       | Required  | Default      | Description                                                                                                           |
| ------ | -------------------------------------------------------------------------- | --------- | ------------ | --------------------------------------------------------------------------------------------------------------------- |
| entry  | `string                                                                    | string[]` | √            | -                                                                                                                     | The entry path |
| depth  | `number`                                                                   | ×         | `Infinity`   | The depth of tree                                                                                                     |
| filter | `RegExp` `FilterFunctionType`                                              | ×         | -            | The filter for filename                                                                                               |
| path   | `"relative"` `"absolute"`                                                  | ×         | `"absolute"` | The path type for output                                                                                              |
| flat   | `boolean`                                                                  | ×         | `false`      | Flat the tree                                                                                                         |
| output | `"path"` `"stats"`                                                         | ×         | `"path"`     | The output type                                                                                                       |
| custom | `<T extends any = any>(filename: string, path: string, stats: Stats) => T` | ×         | -            | The custom output result function, **If the optional function `custom` existed, the `output` option would not work!** |

> For more details, see [Types Defination](src/types.ts)

## LICENSE

MIT
