const stream = require("stream");
const LimitExceededError = require("./LimitExceededError");

class LimitSizeStream extends stream.Transform {
  constructor(options) {
    super(options);
    this.limit = options.limit;
    console.log("limit stream created", "the limit is : ", this.limit);
  }

  _transform(chunk, encoding, callback) {
    const chunkSize = chunk.byteLength;
    console.log("current chunk: ", chunkSize);
    if (chunkSize > this.limit) {
      throw new LimitExceededError();
    }
    this.limit = this.limit - chunkSize;
    callback(null, chunk);
  }
}

module.exports = LimitSizeStream;
