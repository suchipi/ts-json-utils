import { JSONValue } from "./types";

// This file just re-exports JSON.parse and JSON.stringify with more strict types.

/**
 * Converts a JavaScript Object Notation (JSON) string into an object.
 * @param text A valid JSON string.
 * @param reviver A function that transforms the results. This function is called for each member of the object.
 * If a member contains nested objects, the nested objects are transformed before the parent object is.
 */
export const parse: (
  text: string,
  reviver?: (this: any, key: string, value: any) => any
) => JSONValue = JSON.parse;

export const stringify: {
  /**
   * Converts a JavaScript value to a JavaScript Object Notation (JSON) string.
   * @param value A JavaScript value, usually an object or array, to be converted.
   * @param replacer A function that transforms the results.
   * @param space Adds indentation, white space, and line break characters to the return-value JSON text to make it easier to read.
   */
  (
    value: JSONValue,
    replacer?: (this: any, key: string, value: any) => any,
    space?: string | number
  ): string;
  /**
   * Converts a JavaScript value to a JavaScript Object Notation (JSON) string.
   * @param value A JavaScript value, usually an object or array, to be converted.
   * @param replacer An array of strings and numbers that acts as an approved list for selecting the object properties that will be stringified.
   * @param space Adds indentation, white space, and line break characters to the return-value JSON text to make it easier to read.
   */
  (
    value: JSONValue,
    replacer?: (number | string)[] | null,
    space?: string | number
  ): string;
} = JSON.stringify;
