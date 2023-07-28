import type { JSONValue, JSONArray, JSONObject, JSONPrimitive } from "./types";
import { assert, IsAssignable, Not } from "typescript-assert-utils";

// JSONValue
{
  // Primitive types
  {
    assert<IsAssignable<5, JSONValue>>();
    assert<IsAssignable<number, JSONValue>>();
    assert<IsAssignable<null, JSONValue>>();
    assert<IsAssignable<"yeah", JSONValue>>();
    assert<IsAssignable<string, JSONValue>>();
    assert<IsAssignable<true, JSONValue>>();
    assert<IsAssignable<false, JSONValue>>();
    assert<IsAssignable<boolean, JSONValue>>();

    assert<Not<IsAssignable<undefined, JSONValue>>>();
  }

  // Object types
  {
    type SomeObjectType = {
      something: string;
      somethingElse: number;
    };

    assert<IsAssignable<SomeObjectType, JSONValue>>();

    assert<
      IsAssignable<
        {
          something: boolean;
          potato: string | null;
        },
        JSONValue
      >
    >();

    assert<
      Not<
        IsAssignable<
          {
            something: boolean;
            potato: string | null;
            // undefined is disallowed
            seven: string | undefined;
          },
          JSONValue
        >
      >
    >();

    assert<
      IsAssignable<
        {
          // optional property is allowed, though
          something?: boolean;
          potato: string | null;
        },
        JSONValue
      >
    >();

    assert<
      Not<
        IsAssignable<
          {
            something: boolean;
            potato: string | null;
            // methods are disallowed
            yeah(): boolean;
          },
          JSONValue
        >
      >
    >();

    assert<
      IsAssignable<
        {
          something: boolean;
          potato: string | null;

          // getters are okay though
          get yeah(): boolean;
        },
        JSONValue
      >
    >();
  }

  // Interfaces (not supported yet)
  {
    interface SomeInterface {
      something: string;
      somethingElse: number;
    }

    // @ts-expect-error TODO: would be nice to support interfaces, but it currently
    // wants an index signature
    assert<IsAssignable<SomeInterface, JSONValue>>();
  }

  // Array types
  {
    // normal ones
    assert<IsAssignable<Array<number>, JSONValue>>();
    assert<IsAssignable<Array<string>, JSONValue>>();
    assert<IsAssignable<Array<number | string>, JSONValue>>();

    // readonly arrays
    assert<IsAssignable<ReadonlyArray<number>, JSONValue>>();
    assert<IsAssignable<ReadonlyArray<string>, JSONValue>>();
    assert<IsAssignable<ReadonlyArray<number | string>, JSONValue>>();

    // nested stuff
    assert<IsAssignable<Array<number | Array<string>>, JSONValue>>();

    // tuples
    assert<IsAssignable<[number], JSONValue>>();
    assert<IsAssignable<[string], JSONValue>>();
    assert<IsAssignable<[number | string], JSONValue>>();

    // tuples with named members
    assert<IsAssignable<[a: number], JSONValue>>();
    assert<IsAssignable<[b: string], JSONValue>>();
    assert<IsAssignable<[c: number | string], JSONValue>>();

    // type aliases (shouldn't be any different, but, eh)
    type SomeAliasedArrayType = Array<number>;
    assert<IsAssignable<SomeAliasedArrayType, JSONValue>>();

    // params (tuples again, basically)
    type MyFunc = (a: number, b: string) => boolean;
    type MyFuncParams = Parameters<MyFunc>;
    assert<IsAssignable<MyFuncParams, JSONValue>>();
  }

  // Functions are not assignable to JSONValue
  {
    type SomeFunc = (a: number, b: string) => boolean;

    assert<Not<IsAssignable<SomeFunc, JSONValue>>>();
  }

  // Classes are not assignable to JSONValue
  {
    class MyClass {}

    assert<Not<IsAssignable<MyClass, JSONValue>>>();
    assert<Not<IsAssignable<typeof MyClass, JSONValue>>>();
  }

  // Class instances are not assignable to JSONValue
  {
    class MyClass {}

    const c = new MyClass();

    assert<Not<IsAssignable<typeof c, JSONValue>>>();
  }
}

// JSONArray
{
  assert<IsAssignable<Array<number>, JSONArray>>();
  assert<IsAssignable<ReadonlyArray<number>, JSONArray>>();
  assert<IsAssignable<[1, 2, 3], JSONArray>>();
  assert<IsAssignable<[string, number, boolean], JSONArray>>();
  assert<IsAssignable<[string, number, Array<Array<number>>], JSONArray>>();
  assert<IsAssignable<[a: string, b: number, c: boolean], JSONArray>>();

  assert<Not<IsAssignable<string, JSONArray>>>();
  assert<Not<IsAssignable<{}, JSONArray>>>();
  assert<Not<IsAssignable<[string, undefined, boolean], JSONArray>>>();
  assert<Not<IsAssignable<Array<undefined>, JSONArray>>>();
}

// JSONObject
{
  assert<IsAssignable<{ hi: string }, JSONObject>>();

  interface MyInterface {
    hi: 42;
  }

  // @ts-expect-error TODO: would be nice to support interfaces, but it currently
  // wants an index signature
  assert<IsAssignable<MyInterface, JSONObject>>();

  // You can do it this way, though:
  interface MyInterface2 extends JSONObject {
    yeah: 56;

    [57]: true;

    // @ts-expect-error
    no: undefined;
  }

  // and it works if you extended it
  assert<IsAssignable<MyInterface2, JSONObject>>();

  assert<Not<IsAssignable<[], JSONObject>>>();
  assert<Not<IsAssignable<Array<string>, JSONObject>>>();
  assert<Not<IsAssignable<ReadonlyArray<string>, JSONObject>>>();
  assert<Not<IsAssignable<string, JSONObject>>>();
  assert<Not<IsAssignable<undefined, JSONObject>>>();
}

// JSONPrimitive
{
  assert<IsAssignable<5, JSONPrimitive>>();
  assert<IsAssignable<number, JSONPrimitive>>();
  assert<IsAssignable<null, JSONPrimitive>>();
  assert<IsAssignable<"yeah", JSONPrimitive>>();
  assert<IsAssignable<string, JSONPrimitive>>();
  assert<IsAssignable<true, JSONPrimitive>>();
  assert<IsAssignable<false, JSONPrimitive>>();
  assert<IsAssignable<boolean, JSONPrimitive>>();

  assert<Not<IsAssignable<undefined, JSONPrimitive>>>();
  assert<Not<IsAssignable<{}, JSONPrimitive>>>();
  assert<Not<IsAssignable<Array<string>, JSONPrimitive>>>();
  assert<Not<IsAssignable<() => void, JSONPrimitive>>>();
}
