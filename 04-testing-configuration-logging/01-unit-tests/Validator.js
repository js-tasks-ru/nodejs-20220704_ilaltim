module.exports = class Validator {
  constructor(rules) {
    this.rules = rules;
    console.log("validator is created", rules);
  }

  validate(obj) {
    const errors = [];

    for (const field of Object.keys(this.rules)) {
      const rules = this.rules[field];

      const value = obj[field];
      const type = typeof value;

      if (type !== rules.type) {
        errors.push({ field, error: `expect ${rules.type}, got ${type}` });
        return errors;
      }

      switch (type) {
        case "string":
          if (rules.min > rules.max) {
            errors.push({
              field,
              error: "minimum name length value should be less than maximum name length value"
            });
            break;
          }
          if (value.length < rules.min) {
            errors.push({ field, error: `too short, expect ${rules.min}, got ${value.length}` });
          }
          if (value.length > rules.max) {
            errors.push({ field, error: `too long, expect ${rules.max}, got ${value.length}` });
          }
          break;
        case "number":
          if (rules.min > rules.max) {
            errors.push({ field, error: "minimum value should be less than maximum value" });
            break;
          }
          if (rules.max < rules.min) {
            errors.push({ field, error: "maximum value should be greater than minimum value" });
            break;
          }
          if (value < rules.min) {
            errors.push({ field, error: `too little, expect ${rules.min}, got ${value}` });
          }
          if (value > rules.max) {
            errors.push({ field, error: `too big, expect ${rules.min}, got ${value}` });
          }
          break;
      }
    }

    return errors;
  }
};
