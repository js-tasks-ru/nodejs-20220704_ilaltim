const stream = require("stream");
const LimitExceededError = require("./LimitExceededError");

class LimitSizeStream extends stream.Transform {
  constructor(options) {
    super(options);
    this.limit = options.limit;
  }

  _transform(chunk, encoding, callback) {
    const chunkSize = chunk.byteLength;
    if (chunkSize > this.limit) {
      // this.destroy(new LimitExceededError());
      return callback(new LimitExceededError(), null);
    }
    this.limit = this.limit - chunkSize;
    callback(null, chunk);
  }
}

module.exports = LimitSizeStream;
