# FilesTree

[![version](https://img.shields.io/npm/v/filestree.svg)](https://www.npmjs.com/package/filestree)
[![download](https://img.shields.io/npm/dm/filestree.svg)](https://www.npmjs.com/package/filestree)
[![GitHub license](https://img.shields.io/github/license/HerbertHe/filestree)](https://github.com/HerbertHe/filestree/blob/main/LICENSE)
[![GitHub stars](https://img.shields.io/github/stars/HerbertHe/filestree)](https://github.com/HerbertHe/filestree/stargazers)
[![GitHub forks](https://img.shields.io/github/forks/HerbertHe/filestree)](https://github.com/HerbertHe/filestree/network)
[![GitHub issues](https://img.shields.io/github/issues/HerbertHe/filestree)](https://github.com/HerbertHe/filestree/issues)

A library for generating file trees.

## Install

```shell
npm i filestree

# Or
yarn add filestree

# Or

pnpm add filestree
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

| Option | Type                          | Required | Default      | Description              |
| ------ | ----------------------------- | -------- | ------------ | ------------------------ |
| entry  | `string`                      | √        | -            | The entry path           |
| depth  | `number`                      | ×        | `Infinity`   | The depth of tree        |
| filter | `RegExp` `FilterFunctionType` | ×        | -            | The filter for filename  |
| path   | `"relative"` `"absolute"`     | ×        | `"absolute"` | The path type for output |
| flat   | `boolean`                     | ×        | `false`      | Flat the tree            |
| output | `"path"` `"stats"`            | ×        | `"path"`     | The output type          |

> For more details, see [Types Defination](src/types.ts)

## LICENSE

MIT
