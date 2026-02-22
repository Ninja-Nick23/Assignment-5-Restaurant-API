const { body, validationResult } = require('express-validator');

const menuValidationRules = [
  body('name').isString().isLength({ min: 3 }),
  body('description').isString().isLength({ min: 10 }),
  body('price').isFloat({ gt: 0 }),
  body('category').isIn(['appetizer', 'entree', 'dessert', 'beverage']),
  body('ingredients').isArray({ min: 1 }),
  body('available').optional().isBoolean()
];

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

module.exports = { menuValidationRules, validate };
