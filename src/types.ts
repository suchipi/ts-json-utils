export type JSONValue =
  | boolean
  | string
  | number
  | null
  | Array<JSONValue>
  | ReadonlyArray<JSONValue>
  | { [key: string | number]: JSONValue };

export type JSONObject = { [key: string | number]: JSONValue };

export type JSONArray = Array<JSONValue> | ReadonlyArray<JSONValue>;

export type JSONPrimitive = boolean | string | number | null;
