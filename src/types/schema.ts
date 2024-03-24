export type Json = string | number | boolean | null | Array<Json> | { [key: string]: Json };
export type JsonType = 'object' | 'array' | 'string' | 'number' | 'boolean' | 'null';
export type JsonSchemaType = JsonType | 'integer';

export interface JsonSchema {
  $schema?: string;
  $id?: string;
  $anchor?: string;
  $ref?: string;
  $dynamicRef?: string;
  $dynamicAnchor?: string;
  $recursiveRef?: '#';
  $vocabulary?: Record<string, boolean>;
  $comment?: string;
  $defs?: Record<string, JsonSchema>;

  /** A Vocabulary for Structural Validation */
  type?: JsonSchemaType | JsonSchemaType[];
  enum?: Json[];
  const?: Json;
  multipleOf?: number;
  maximum?: number;
  exclusiveMaximum?: number;
  minimum?: number;
  exclusiveMinimum?: number;
  maxLength?: number;
  minLength?: number;
  pattern?: string;
  maxItems?: number;
  additionalItems?: JsonSchema;
  minItems?: number;
  uniqueItems?: boolean;
  maxContains?: number;
  minContains?: number;
  maxProperties?: number;
  minProperties?: number;
  required?: string[];
  dependentRequired?: Record<string, string[]>;

  /** Vocabularies for Semantic Content With "format" */
  format?:
    | 'date-time'
    | 'date'
    | 'time'
    | 'duration'
    | 'email'
    | 'idn-email'
    | 'hostname'
    | 'idn-hostname'
    | 'ipv4'
    | 'ipv6'
    | 'uri'
    | 'uri-reference'
    | 'iri'
    | 'iri-reference'
    | 'uuid'
    | 'uri-template'
    | 'json-pointer'
    | 'relative-json-pointer'
    | 'regex';

  /** A Vocabulary for the Contents of String-Encoded Data */
  contentEncoding?: string;
  contentMediaType?: string;
  contentSchema?: JsonSchema;

  /** A Vocabulary for Basic Meta-Data Annotations */
  title?: string;
  default?: Json;
  description?: string;
  deprecated?: boolean;
  readOnly?: boolean;
  writeOnly?: boolean;
  examples?: Json[];

  /** A Vocabulary for Applying Subschemas */
  unevaluatedItems?: JsonSchema;
  prefixItems?: JsonSchema[];
  items?: JsonSchema;
  contains?: JsonSchema;
  additionalProperties?: JsonSchema;
  unevaluatedProperties?: JsonSchema;
  properties?: Record<string, JsonSchema>;
  patternProperties?: Record<string, JsonSchema>;
  dependentSchemas?: Record<string, JsonSchema>;
  propertyNames?: JsonSchema;
  if?: JsonSchema;
  then?: JsonSchema;
  else?: JsonSchema;
  allOf?: JsonSchema[];
  anyOf?: JsonSchema[];
  oneOf?: JsonSchema[];
  not?: JsonSchema;
}
