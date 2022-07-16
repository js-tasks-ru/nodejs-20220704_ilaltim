const Validator = require("./Validator.js");

const validator = new Validator({
  // name: {
  //   type: "string",
  //   min: 10,
  //   max: 20
  // },
  age: { type: "number", min: 44, max: 5 }
});

const errors = validator.validate({ age: 10 });
console.log(errors);
