const Validator = require("../Validator");
const expect = require("chai").expect;

describe("testing-configuration-logging/unit-tests", () => {
  describe("Validator", () => {
    it("валидатор проверяет строковые поля", () => {
      const validator = new Validator({
        name: {
          type: "string",
          min: 10,
          max: 20
        }
      });

      const errors = validator.validate({ name: "Lalala" });

      expect(errors).to.have.length(1);
      expect(errors[0]).to.have.property("field").and.to.be.equal("name");
      expect(errors[0]).to.have.property("error").and.to.be.equal("too short, expect 10, got 6");
    });
    it("validator checks number fields value", () => {
      const validator = new Validator({
        age: {
          type: "number",
          min: 18,
          max: 200
        }
      });

      const errors = validator.validate({ age: 10 });
      expect(errors).to.have.length(1);
      expect(errors[0]).to.have.property("field").and.to.be.equal("age");
      expect(errors[0]).to.have.property("error").and.to.be.equal("too little, expect 18, got 10");
    });
  });

  it("validator checks age field types.", () => {
    const validator = new Validator({
      age: {
        type: "number",
        min: 18,
        max: 200
      }
    });

    const errors = validator.validate({ age: "Vasya" });
    expect(errors).to.have.length(1);
    expect(errors[0]).to.have.property("field").and.to.be.equal("age");
    expect(errors[0]).to.have.property("error").and.to.be.equal("expect number, got string");
  });
  it("validator checks age min value is less than max value.", () => {
    const validator = new Validator({
      age: {
        type: "number",
        min: 100,
        max: 99
      }
    });

    const errors = validator.validate({ age: 40 });
    expect(errors).to.have.length(1);
    expect(errors[0]).to.have.property("field").and.to.be.equal("age");
    expect(errors[0])
      .to.have.property("error")
      .and.to.be.equal("minimum value should be less than maximum value");
  });

  it("validator checks name min  length value is less than max value.", () => {
    const validator = new Validator({
      name: {
        type: "string",
        min: 100,
        max: 99
      }
    });

    const errors = validator.validate({ name: "Vasya" });
    expect(errors).to.have.length(1);
    expect(errors[0]).to.have.property("field").and.to.be.equal("name");
    expect(errors[0])
      .to.have.property("error")
      .and.to.be.equal("minimum name length value should be less than maximum name length value");
  });
});
