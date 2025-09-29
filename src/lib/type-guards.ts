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

export const isString = (value: unknown): value is string => {
  return typeof value === 'string';
};

export const isNumber = (value: unknown): value is number => {
  return typeof value === 'number' && !isNaN(value) && isFinite(value);
};

export const isBoolean = (value: unknown): value is boolean => {
  return typeof value === 'boolean';
};

export const isObject = (value: unknown): value is Record<string, unknown> => {
  return value !== null && typeof value === 'object' && !Array.isArray(value);
};

export const isArray = (value: unknown): value is unknown[] => {
  return Array.isArray(value);
};

export const isFunction = (value: unknown): value is (...args: unknown[]) => unknown => {
  return typeof value === 'function';
};

export const isNull = (value: unknown): value is null => {
  return value === null;
};

export const isUndefined = (value: unknown): value is undefined => {
  return value === undefined;
};

export const isNullish = (value: unknown): value is null | undefined => {
  return value === null || value === undefined;
};

/**
 * String validation type guards
 */

export const isNonEmptyString = (value: unknown): value is string => {
  return isString(value) && value.trim().length > 0;
};

export const isValidEmail = (value: unknown): value is string => {
  if (!isString(value)) return false;
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(value) && value.length <= 254;
};

export const isValidUrl = (value: unknown): value is string => {
  if (!isString(value)) return false;
  try {
    const url = new URL(value);
    return ['http:', 'https:'].includes(url.protocol);
  } catch {
    return false;
  }
};

export const isAlphanumeric = (value: unknown): value is string => {
  if (!isString(value)) return false;
  return /^[a-zA-Z0-9]+$/.test(value);
};

export const isNumericString = (value: unknown): value is string => {
  if (!isString(value)) return false;
  return /^\d+$/.test(value);
};

/**
 * Number validation type guards
 */

export const isPositiveNumber = (value: unknown): value is number => {
  return isNumber(value) && value > 0;
};

export const isNonNegativeNumber = (value: unknown): value is number => {
  return isNumber(value) && value >= 0;
};

export const isInteger = (value: unknown): value is number => {
  return isNumber(value) && Number.isInteger(value);
};

export const isPositiveInteger = (value: unknown): value is number => {
  return isInteger(value) && value > 0;
};

export const isNonNegativeInteger = (value: unknown): value is number => {
  return isInteger(value) && value >= 0;
};

export const isInRange = (value: unknown, min: number, max: number): value is number => {
  return isNumber(value) && value >= min && value <= max;
};

/**
 * Array validation type guards
 */

export const isNonEmptyArray = <T>(value: unknown): value is T[] => {
  return isArray(value) && value.length > 0;
};

export const isArrayOfStrings = (value: unknown): value is string[] => {
  return isArray(value) && value.every(isString);
};

export const isArrayOfNumbers = (value: unknown): value is number[] => {
  return isArray(value) && value.every(isNumber);
};

export const isArrayOfObjects = (value: unknown): value is Record<string, unknown>[] => {
  return isArray(value) && value.every(isObject);
};

/**
 * Object validation type guards
 */

export const hasProperty = <K extends string>(
  value: unknown,
  key: K
): value is Record<K, unknown> => {
  return isObject(value) && key in value;
};

export const hasProperties = <K extends string>(
  value: unknown,
  keys: K[]
): value is Record<K, unknown> => {
  return isObject(value) && keys.every(key => key in value);
};

export const hasStringProperty = <K extends string>(
  value: unknown,
  key: K
): value is Record<K, string> => {
  return hasProperty(value, key) && isString(value[key]);
};

export const hasNumberProperty = <K extends string>(
  value: unknown,
  key: K
): value is Record<K, number> => {
  return hasProperty(value, key) && isNumber(value[key]);
};

export const hasBooleanProperty = <K extends string>(
  value: unknown,
  key: K
): value is Record<K, boolean> => {
  return hasProperty(value, key) && isBoolean(value[key]);
};

/**
 * Application-specific type guards
 */

export const isValidScore = (value: unknown): value is number => {
  return isInRange(value, 0, 100);
};

export const isValidBand = (value: unknown): value is 'Explorer' | 'Experimenter' | 'Accelerator' => {
  return isString(value) && ['Explorer', 'Experimenter', 'Accelerator'].includes(value);
};

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

export const isValidQuizAnswers = (value: unknown): value is Record<string, number> => {
  if (!isObject(value)) return false;
  
  // Check if object has at least one property
  const keys = Object.keys(value);
  if (keys.length === 0) return false;
  
  return Object.values(value).every(score => 
    isNumber(score) && isInRange(score, 0, 3)
  );
};

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

export const isValidFormData = (value: unknown): value is Record<string, unknown> => {
  if (!isObject(value)) return false;
  
  // Check that all values are strings, numbers, booleans, or arrays
  return Object.values(value).every(val => 
    isString(val) || isNumber(val) || isBoolean(val) || isArray(val)
  );
};

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

export const isDateString = (value: unknown): value is string => {
  if (!isString(value)) return false;
  const date = new Date(value);
  return !isNaN(date.getTime());
};

export const isISODateString = (value: unknown): value is string => {
  if (!isString(value)) return false;
  return /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d{3})?Z?$/.test(value);
};

export const isHexColor = (value: unknown): value is string => {
  if (!isString(value)) return false;
  return /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(value);
};

export const isUUID = (value: unknown): value is string => {
  if (!isString(value)) return false;
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(value);
};

/**
 * Combined validation type guards
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
