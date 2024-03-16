import toPath from 'lodash/toPath';
import type { JsonSchema } from './types';
import { isNumericString } from './utils';

export const getSchemaByPath = (schema: JsonSchema, path: string | string[]): JsonSchema | undefined => {
  if (typeof schema !== 'object') {
    return;
  }

  if (!Array.isArray(path) && typeof path !== 'string') {
    return;
  }

  const paths = toPath(path);
  if (paths.length === 0) {
    return schema;
  }

  if (!schema.type) {
    return;
  }

  const [firstPath, ...restPath] = paths;

  if (schema.type === 'object' || (Array.isArray(schema.type) && schema.type.includes('object'))) {
    if (schema.properties?.[firstPath]) {
      return getSchemaByPath(schema.properties[firstPath], restPath);
    }

    if (schema.patternProperties) {
      const matchedPattern = Object.keys(schema.patternProperties).find((re) => new RegExp(re).test(firstPath));
      if (matchedPattern) {
        return getSchemaByPath(schema.patternProperties[matchedPattern], restPath);
      }
    }

    if (typeof schema.additionalProperties === 'object') {
      return getSchemaByPath(schema.additionalProperties, restPath);
    }

    if (schema.unevaluatedProperties) {
      return getSchemaByPath(schema.unevaluatedProperties, restPath);
    }
  }

  if (schema.type === 'array' || (Array.isArray(schema.type) && schema.type.includes('array'))) {
    if (typeof firstPath !== 'number' && !isNumericString(firstPath)) {
      return;
    }

    if (typeof schema.items === 'object' && !Array.isArray(schema.items)) {
      return getSchemaByPath(schema.items, restPath);
    }

    if (Array.isArray(schema.items)) {
      const index = Number(firstPath);
      if (schema.items[index]) {
        return getSchemaByPath(schema.items[index], restPath);
      }
    }

    if (schema.additionalItems) {
      return getSchemaByPath(schema.additionalItems, restPath);
    }
  }

  return;
};
