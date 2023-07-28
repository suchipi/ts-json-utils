# `@suchipi/ts-json-utils`

Utility types for describing JSON values in TypeScript

## Exports

### Types

- `JSONValue` (type for any value which is valid in JSON)
- `JSONObject` (type for object with string/number keys and `JSONValue` values)
- `JSONArray` (type for array of `JSONValue`)
- `JSONPrimitive` (type for all non-composite values which are valid in JSON)

### Functions

- `parse` (re-export of `JSON.parse`, but typed as returning `JSONValue` instead of `any`)
- `stringify` (re-export of `JSON.stringify`, but typed as accepting `JSONValue` instead of `any`)

## Installation

```sh
npm install --save-dev @suchipi/ts-json-utils
```

## License

MIT
