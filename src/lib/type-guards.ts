/**
 * @fileoverview Type Guards - Runtime Type Safety Utilities
 * 
 * This module provides comprehensive type guard functions for runtime type checking
 * and validation. These utilities ensure type safety at runtime and provide better
 * error handling and validation throughout the application.
 * 
 * @module type-guards
 * @author Alvi Global Enterprises
 * @version 1.0.0
 * 
 * @features
 * - 🔍 Runtime type checking and validation
 * - 🛡️ Type-safe data parsing and validation
 * - 📊 Comprehensive type guards for all data types
 * - 🎯 API response validation
 * - 📝 Form data validation
 * - ⚡ Performance optimized
 */

/**
 * Basic type guards
 */

/**
 * Checks if a value is a string.
 * @param {unknown} value - The value to check.
 * @returns {boolean} `true` if the value is a string, `false` otherwise.
 */
export const isString = (value: unknown): value is string => {
  return typeof value === 'string';
};

/**
 * Checks if a value is a finite number.
 * @param {unknown} value - The value to check.
 * @returns {boolean} `true` if the value is a finite number, `false` otherwise.
 */
export const isNumber = (value: unknown): value is number => {
  return typeof value === 'number' && !isNaN(value) && isFinite(value);
};

/**
 * Checks if a value is a boolean.
 * @param {unknown} value - The value to check.
 * @returns {boolean} `true` if the value is a boolean, `false` otherwise.
 */
export const isBoolean = (value: unknown): value is boolean => {
  return typeof value === 'boolean';
};

/**
 * Checks if a value is a non-null object (and not an array).
 * @param {unknown} value - The value to check.
 * @returns {boolean} `true` if the value is an object, `false` otherwise.
 */
export const isObject = (value: unknown): value is Record<string, unknown> => {
  return value !== null && typeof value === 'object' && !Array.isArray(value);
};

/**
 * Checks if a value is an array.
 * @param {unknown} value - The value to check.
 * @returns {boolean} `true` if the value is an array, `false` otherwise.
 */
export const isArray = (value: unknown): value is unknown[] => {
  return Array.isArray(value);
};

/**
 * Checks if a value is a function.
 * @param {unknown} value - The value to check.
 * @returns {boolean} `true` if the value is a function, `false` otherwise.
 */
export const isFunction = (value: unknown): value is (...args: unknown[]) => unknown => {
  return typeof value === 'function';
};

/**
 * Checks if a value is null.
 * @param {unknown} value - The value to check.
 * @returns {boolean} `true` if the value is null, `false` otherwise.
 */
export const isNull = (value: unknown): value is null => {
  return value === null;
};

/**
 * Checks if a value is undefined.
 * @param {unknown} value - The value to check.
 * @returns {boolean} `true` if the value is undefined, `false` otherwise.
 */
export const isUndefined = (value: unknown): value is undefined => {
  return value === undefined;
};

/**
 * Checks if a value is null or undefined.
 * @param {unknown} value - The value to check.
 * @returns {boolean} `true` if the value is null or undefined, `false` otherwise.
 */
export const isNullish = (value: unknown): value is null | undefined => {
  return value === null || value === undefined;
};

/**
 * String validation type guards
 */

/**
 * Checks if a value is a non-empty string (after trimming).
 * @param {unknown} value - The value to check.
 * @returns {boolean} `true` if the value is a non-empty string, `false` otherwise.
 */
export const isNonEmptyString = (value: unknown): value is string => {
  return isString(value) && value.trim().length > 0;
};

/**
 * Checks if a value is a valid email address string.
 * @param {unknown} value - The value to check.
 * @returns {boolean} `true` if the value is a valid email, `false` otherwise.
 */
export const isValidEmail = (value: unknown): value is string => {
  if (!isString(value)) return false;
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(value) && value.length <= 254;
};

/**
 * Checks if a value is a valid URL string with http or https protocol.
 * @param {unknown} value - The value to check.
 * @returns {boolean} `true` if the value is a valid URL, `false` otherwise.
 */
export const isValidUrl = (value: unknown): value is string => {
  if (!isString(value)) return false;
  try {
    const url = new URL(value);
    return ['http:', 'https:'].includes(url.protocol);
  } catch {
    return false;
  }
};

/**
 * Checks if a value is an alphanumeric string.
 * @param {unknown} value - The value to check.
 * @returns {boolean} `true` if the value is alphanumeric, `false` otherwise.
 */
export const isAlphanumeric = (value: unknown): value is string => {
  if (!isString(value)) return false;
  return /^[a-zA-Z0-9]+$/.test(value);
};

/**
 * Checks if a value is a string containing only digits.
 * @param {unknown} value - The value to check.
 * @returns {boolean} `true` if the value is a numeric string, `false` otherwise.
 */
export const isNumericString = (value: unknown): value is string => {
  if (!isString(value)) return false;
  return /^\d+$/.test(value);
};

/**
 * Number validation type guards
 */

/**
 * Checks if a value is a positive number (greater than 0).
 * @param {unknown} value - The value to check.
 * @returns {boolean} `true` if the value is a positive number, `false` otherwise.
 */
export const isPositiveNumber = (value: unknown): value is number => {
  return isNumber(value) && value > 0;
};

/**
 * Checks if a value is a non-negative number (greater than or equal to 0).
 * @param {unknown} value - The value to check.
 * @returns {boolean} `true` if the value is a non-negative number, `false` otherwise.
 */
export const isNonNegativeNumber = (value: unknown): value is number => {
  return isNumber(value) && value >= 0;
};

/**
 * Checks if a value is an integer.
 * @param {unknown} value - The value to check.
 * @returns {boolean} `true` if the value is an integer, `false` otherwise.
 */
export const isInteger = (value: unknown): value is number => {
  return isNumber(value) && Number.isInteger(value);
};

/**
 * Checks if a value is a positive integer.
 * @param {unknown} value - The value to check.
 * @returns {boolean} `true` if the value is a positive integer, `false` otherwise.
 */
export const isPositiveInteger = (value: unknown): value is number => {
  return isInteger(value) && value > 0;
};

/**
 * Checks if a value is a non-negative integer.
 * @param {unknown} value - The value to check.
 * @returns {boolean} `true` if the value is a non-negative integer, `false` otherwise.
 */
export const isNonNegativeInteger = (value: unknown): value is number => {
  return isInteger(value) && value >= 0;
};

/**
 * Checks if a number is within a given range (inclusive).
 * @param {unknown} value - The value to check.
 * @param {number} min - The minimum value of the range.
 * @param {number} max - The maximum value of the range.
 * @returns {boolean} `true` if the number is within the range, `false` otherwise.
 */
export const isInRange = (value: unknown, min: number, max: number): value is number => {
  return isNumber(value) && value >= min && value <= max;
};

/**
 * Array validation type guards
 */

/**
 * Checks if a value is a non-empty array.
 * @template T - The type of elements in the array.
 * @param {unknown} value - The value to check.
 * @returns {boolean} `true` if the value is a non-empty array, `false` otherwise.
 */
export const isNonEmptyArray = <T>(value: unknown): value is T[] => {
  return isArray(value) && value.length > 0;
};

/**
 * Checks if a value is an array of strings.
 * @param {unknown} value - The value to check.
 * @returns {boolean} `true` if the value is an array of strings, `false` otherwise.
 */
export const isArrayOfStrings = (value: unknown): value is string[] => {
  return isArray(value) && value.every(isString);
};

/**
 * Checks if a value is an array of numbers.
 * @param {unknown} value - The value to check.
 * @returns {boolean} `true` if the value is an array of numbers, `false` otherwise.
 */
export const isArrayOfNumbers = (value: unknown): value is number[] => {
  return isArray(value) && value.every(isNumber);
};

/**
 * Checks if a value is an array of objects.
 * @param {unknown} value - The value to check.
 * @returns {boolean} `true` if the value is an array of objects, `false` otherwise.
 */
export const isArrayOfObjects = (value: unknown): value is Record<string, unknown>[] => {
  return isArray(value) && value.every(isObject);
};

/**
 * Object validation type guards
 */

/**
 * Checks if an object has a specific property.
 * @template K - The type of the key.
 * @param {unknown} value - The value to check.
 * @param {K} key - The property key to check for.
 * @returns {boolean} `true` if the object has the property, `false` otherwise.
 */
export const hasProperty = <K extends string>(
  value: unknown,
  key: K
): value is Record<K, unknown> => {
  return isObject(value) && key in value;
};

/**
 * Checks if an object has all of the specified properties.
 * @template K - The type of the keys.
 * @param {unknown} value - The value to check.
 * @param {K[]} keys - An array of property keys to check for.
 * @returns {boolean} `true` if the object has all the properties, `false` otherwise.
 */
export const hasProperties = <K extends string>(
  value: unknown,
  keys: K[]
): value is Record<K, unknown> => {
  return isObject(value) && keys.every(key => key in value);
};

/**
 * Checks if an object has a specific property and its value is a string.
 * @template K - The type of the key.
 * @param {unknown} value - The value to check.
 * @param {K} key - The property key.
 * @returns {boolean} `true` if the property exists and is a string, `false` otherwise.
 */
export const hasStringProperty = <K extends string>(
  value: unknown,
  key: K
): value is Record<K, string> => {
  return hasProperty(value, key) && isString(value[key]);
};

/**
 * Checks if an object has a specific property and its value is a number.
 * @template K - The type of the key.
 * @param {unknown} value - The value to check.
 * @param {K} key - The property key.
 * @returns {boolean} `true` if the property exists and is a number, `false` otherwise.
 */
export const hasNumberProperty = <K extends string>(
  value: unknown,
  key: K
): value is Record<K, number> => {
  return hasProperty(value, key) && isNumber(value[key]);
};

/**
 * Checks if an object has a specific property and its value is a boolean.
 * @template K - The type of the key.
 * @param {unknown} value - The value to check.
 * @param {K} key - The property key.
 * @returns {boolean} `true` if the property exists and is a boolean, `false` otherwise.
 */
export const hasBooleanProperty = <K extends string>(
  value: unknown,
  key: K
): value is Record<K, boolean> => {
  return hasProperty(value, key) && isBoolean(value[key]);
};

/**
 * Application-specific type guards
 */

/**
 * Checks if a value is a valid score (a number between 0 and 100).
 * @param {unknown} value - The value to check.
 * @returns {boolean} `true` if the value is a valid score, `false` otherwise.
 */
export const isValidScore = (value: unknown): value is number => {
  return isInRange(value, 0, 100);
};

/**
 * Checks if a value is a valid maturity band string.
 * @param {unknown} value - The value to check.
 * @returns {boolean} `true` if the value is a valid band, `false` otherwise.
 */
export const isValidBand = (value: unknown): value is 'Explorer' | 'Experimenter' | 'Accelerator' => {
  return isString(value) && ['Explorer', 'Experimenter', 'Accelerator'].includes(value);
};

/**
 * Checks if an object represents valid dimension scores.
 * @param {unknown} value - The value to check.
 * @returns {boolean} `true` if the object is a valid dimension scores object, `false` otherwise.
 */
export const isValidDimensionScores = (value: unknown): value is {
  strategy: number;
  implementation: number;
  data: number;
  culture: number;
} => {
  if (!isObject(value)) return false;
  
  return (
    hasNumberProperty(value, 'strategy') &&
    hasNumberProperty(value, 'implementation') &&
    hasNumberProperty(value, 'data') &&
    hasNumberProperty(value, 'culture') &&
    isValidScore(value.strategy) &&
    isValidScore(value.implementation) &&
    isValidScore(value.data) &&
    isValidScore(value.culture)
  );
};

/**
 * Checks if an object represents valid quiz answers.
 * @param {unknown} value - The value to check.
 * @returns {boolean} `true` if the object is a valid quiz answers object, `false` otherwise.
 */
export const isValidQuizAnswers = (value: unknown): value is Record<string, number> => {
  if (!isObject(value)) return false;
  
  // Check if object has at least one property
  const keys = Object.keys(value);
  if (keys.length === 0) return false;
  
  return Object.values(value).every(score => 
    isNumber(score) && isInRange(score, 0, 3)
  );
};

/**
 * Checks if an object represents valid UTM parameters.
 * @param {unknown} value - The value to check.
 * @returns {boolean} `true` if the object is a valid UTM parameters object, `false` otherwise.
 */
export const isValidUTMParams = (value: unknown): value is Record<string, string> => {
  if (!isObject(value)) return false;
  
  const validUTMKeys = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'];
  
  return Object.entries(value).every(([key, val]) => 
    validUTMKeys.includes(key) && isString(val)
  );
};

/**
 * API response type guards
 */

/**
 * Checks if a value is a valid API response object.
 * @template T - The type of the data in the response.
 * @param {unknown} value - The value to check.
 * @param {(data: unknown) => data is T} dataValidator - A type guard function to validate the `data` property.
 * @returns {boolean} `true` if the value is a valid API response, `false` otherwise.
 */
export const isValidApiResponse = <T>(
  value: unknown,
  dataValidator: (data: unknown) => data is T
): value is { data: T; success: boolean; message?: string } => {
  if (!isObject(value)) return false;
  
  return (
    hasBooleanProperty(value, 'success') &&
    hasProperty(value, 'data') &&
    dataValidator(value.data)
  );
};

/**
 * Checks if a value is a valid error response object.
 * @param {unknown} value - The value to check.
 * @returns {boolean} `true` if the value is a valid error response, `false` otherwise.
 */
export const isValidErrorResponse = (value: unknown): value is {
  error: string;
  code?: string | number;
  details?: Record<string, unknown>;
} => {
  if (!isObject(value)) return false;
  
  return (
    hasStringProperty(value, 'error') &&
    (!hasProperty(value, 'code') || isNumber(value.code) || isString(value.code)) &&
    (!hasProperty(value, 'details') || isObject(value.details))
  );
};

/**
 * Form validation type guards
 */

/**
 * Checks if an object represents valid form data.
 * @param {unknown} value - The value to check.
 * @returns {boolean} `true` if the object is valid form data, `false` otherwise.
 */
export const isValidFormData = (value: unknown): value is Record<string, unknown> => {
  if (!isObject(value)) return false;
  
  // Check that all values are strings, numbers, booleans, or arrays
  return Object.values(value).every(val => 
    isString(val) || isNumber(val) || isBoolean(val) || isArray(val)
  );
};

/**
 * Checks if an object has all the specified required fields.
 * @template K - The type of the keys.
 * @param {unknown} value - The value to check.
 * @param {K[]} requiredFields - An array of required field keys.
 * @returns {boolean} `true` if the object has all required fields, `false` otherwise.
 */
export const hasRequiredFields = <K extends string>(
  value: unknown,
  requiredFields: K[]
): value is Record<K, unknown> => {
  if (!isObject(value)) return false;
  
  return requiredFields.every(field => 
    field in value && !isNullish(value[field])
  );
};

/**
 * Utility type guards
 */

/**
 * Checks if a value is a string that can be parsed into a valid date.
 * @param {unknown} value - The value to check.
 * @returns {boolean} `true` if the value is a valid date string, `false` otherwise.
 */
export const isDateString = (value: unknown): value is string => {
  if (!isString(value)) return false;
  const date = new Date(value);
  return !isNaN(date.getTime());
};

/**
 * Checks if a value is a string in ISO date format.
 * @param {unknown} value - The value to check.
 * @returns {boolean} `true` if the value is an ISO date string, `false` otherwise.
 */
export const isISODateString = (value: unknown): value is string => {
  if (!isString(value)) return false;
  return /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d{3})?Z?$/.test(value);
};

/**
 * Checks if a value is a string representing a hex color.
 * @param {unknown} value - The value to check.
 * @returns {boolean} `true` if the value is a hex color string, `false` otherwise.
 */
export const isHexColor = (value: unknown): value is string => {
  if (!isString(value)) return false;
  return /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(value);
};

/**
 * Checks if a value is a string in UUID format.
 * @param {unknown} value - The value to check.
 * @returns {boolean} `true` if the value is a UUID string, `false` otherwise.
 */
export const isUUID = (value: unknown): value is string => {
  if (!isString(value)) return false;
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(value);
};

/**
 * Combined validation type guards
 */

/**
 * Checks if an object is a valid user submission object.
 * @param {unknown} value - The value to check.
 * @returns {boolean} `true` if the value is a valid user submission, `false` otherwise.
 */
export const isValidUserSubmission = (value: unknown): value is {
  email: string;
  score: number;
  band: string;
  dimensions: {
    strategy: number;
    implementation: number;
    data: number;
    culture: number;
  };
  recommendations: string[];
} => {
  if (!isObject(value)) return false;
  
  return (
    hasStringProperty(value, 'email') &&
    hasNumberProperty(value, 'score') &&
    hasStringProperty(value, 'band') &&
    hasProperty(value, 'dimensions') &&
    hasProperty(value, 'recommendations') &&
    isValidEmail(value.email) &&
    isValidScore(value.score) &&
    isValidBand(value.band) &&
    isValidDimensionScores(value.dimensions) &&
    isArrayOfStrings(value.recommendations)
  );
};
