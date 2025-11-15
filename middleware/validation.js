const mongoose = require('mongoose');

/**
 * Validation middleware for DTOs
 * Validates input data against DTO schema
 */
const validateDto = (dtoSchema) => {
  return (req, res, next) => {
    if (!dtoSchema) {
      return next();
    }

    const errors = [];
    const dtoIn = req.body;

    // Validate each field in the schema
    for (const [fieldName, fieldSchema] of Object.entries(dtoSchema)) {
      const fieldValue = dtoIn[fieldName];

      // Check required fields
      if (fieldSchema.required && (fieldValue === undefined || fieldValue === null || fieldValue === '')) {
        errors.push({
          field: fieldName,
          message: `${fieldName} is required`
        });
        continue;
      }

      // Skip validation if field is not required and not provided
      if (!fieldSchema.required && (fieldValue === undefined || fieldValue === null || fieldValue === '')) {
        continue;
      }

      // Type validation
      if (fieldSchema.type && fieldValue !== undefined && fieldValue !== null) {
        const typeCheck = validateType(fieldValue, fieldSchema.type, fieldName);
        if (typeCheck.error) {
          errors.push(typeCheck.error);
          continue;
        }
      }

      // String validations
      if (fieldSchema.type === 'string' && typeof fieldValue === 'string') {
        // Min length
        if (fieldSchema.minLength !== undefined && fieldValue.length < fieldSchema.minLength) {
          errors.push({
            field: fieldName,
            message: `${fieldName} must be at least ${fieldSchema.minLength} characters long`
          });
        }

        // Max length
        if (fieldSchema.maxLength !== undefined && fieldValue.length > fieldSchema.maxLength) {
          errors.push({
            field: fieldName,
            message: `${fieldName} must be at most ${fieldSchema.maxLength} characters long`
          });
        }

        // Email format
        if (fieldSchema.format === 'email') {
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailRegex.test(fieldValue)) {
            errors.push({
              field: fieldName,
              message: `${fieldName} must be a valid email address`
            });
          }
        }

        // ObjectId format
        if (fieldSchema.format === 'objectId') {
          if (!mongoose.Types.ObjectId.isValid(fieldValue)) {
            errors.push({
              field: fieldName,
              message: `${fieldName} must be a valid ObjectId`
            });
          }
        }

        // Enum validation
        if (fieldSchema.enum && !fieldSchema.enum.includes(fieldValue)) {
          errors.push({
            field: fieldName,
            message: `${fieldName} must be one of: ${fieldSchema.enum.join(', ')}`
          });
        }

        // Trim if specified
        if (fieldSchema.trim && typeof fieldValue === 'string') {
          req.body[fieldName] = fieldValue.trim();
        }

        // Lowercase if specified
        if (fieldSchema.lowercase && typeof fieldValue === 'string') {
          req.body[fieldName] = fieldValue.toLowerCase();
        }
      }

      // Boolean validation
      if (fieldSchema.type === 'boolean' && typeof fieldValue !== 'boolean') {
        // Allow string 'true'/'false' conversion
        if (fieldValue === 'true' || fieldValue === true) {
          req.body[fieldName] = true;
        } else if (fieldValue === 'false' || fieldValue === false) {
          req.body[fieldName] = false;
        } else {
          errors.push({
            field: fieldName,
            message: `${fieldName} must be a boolean`
          });
        }
      }

      // Enum validation for non-strings
      if (fieldSchema.enum && fieldSchema.type !== 'string' && !fieldSchema.enum.includes(fieldValue)) {
        errors.push({
          field: fieldName,
          message: `${fieldName} must be one of: ${fieldSchema.enum.join(', ')}`
        });
      }
    }

    // Check for unknown fields (optional - can be enabled if needed)
    // const allowedFields = Object.keys(dtoSchema);
    // const providedFields = Object.keys(dtoIn);
    // const unknownFields = providedFields.filter(field => !allowedFields.includes(field));
    // if (unknownFields.length > 0) {
    //   errors.push({
    //     field: 'unknown',
    //     message: `Unknown fields: ${unknownFields.join(', ')}`
    //   });
    // }

    if (errors.length > 0) {
      return res.status(400).json({
        success: false,
        dtoIn: req.body,
        uuAppErrorMap: {
          validation: {
            message: 'Validation failed',
            paramMap: {
              errors
            }
          }
        }
      });
    }

    next();
  };
};

/**
 * Validate type
 */
const validateType = (value, expectedType, fieldName) => {
  const typeMap = {
    string: 'string',
    number: 'number',
    boolean: 'boolean',
    array: 'object',
    object: 'object',
    date: 'object'
  };

  const actualType = Array.isArray(value) ? 'array' : typeof value;

  if (expectedType === 'date') {
    if (value instanceof Date || !isNaN(Date.parse(value))) {
      return { valid: true };
    }
    return {
      error: {
        field: fieldName,
        message: `${fieldName} must be a valid date`
      }
    };
  }

  if (typeMap[expectedType] && actualType !== typeMap[expectedType]) {
    return {
      error: {
        field: fieldName,
        message: `${fieldName} must be of type ${expectedType}`
      }
    };
  }

  return { valid: true };
};

/**
 * Validate query parameters
 */
const validateQuery = (dtoSchema) => {
  return (req, res, next) => {
    if (!dtoSchema) {
      return next();
    }

    const errors = [];
    const query = req.query;

    for (const [fieldName, fieldSchema] of Object.entries(dtoSchema)) {
      const fieldValue = query[fieldName];

      if (!fieldSchema.required && (fieldValue === undefined || fieldValue === null || fieldValue === '')) {
        continue;
      }

      if (fieldSchema.required && (fieldValue === undefined || fieldValue === null || fieldValue === '')) {
        errors.push({
          field: fieldName,
          message: `${fieldName} is required`
        });
        continue;
      }

      // Enum validation for query params
      if (fieldSchema.enum && !fieldSchema.enum.includes(fieldValue)) {
        errors.push({
          field: fieldName,
          message: `${fieldName} must be one of: ${fieldSchema.enum.join(', ')}`
        });
      }
    }

    if (errors.length > 0) {
      return res.status(400).json({
        success: false,
        dtoIn: query,
        uuAppErrorMap: {
          validation: {
            message: 'Query validation failed',
            paramMap: {
              errors
            }
          }
        }
      });
    }

    next();
  };
};

module.exports = {
  validateDto,
  validateQuery
};

