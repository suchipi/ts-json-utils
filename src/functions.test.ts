import { parse, stringify } from "./functions";
import { JSONValue } from "./types";
import { assert, Is } from "typescript-assert-utils";

// parse
{
  const result = parse("{}");
  assert<Is<typeof result, JSONValue>>();

  // @ts-expect-error JSONValue is not callable (normal JSON.parse would yield 'any' which is callable)
  result();
}

// stringify
{
  // @ts-expect-error FunctionConstructor is not assignable to JSONValue
  stringify(Function);

  const result2 = stringify({});
  assert<Is<typeof result2, string>>();
}
