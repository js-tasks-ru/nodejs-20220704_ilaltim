const stream = require("stream");
const os = require("os");

class LineSplitStream extends stream.Transform {
  constructor(options) {
    super(options);
    this.delimeter = options.delimeter || `${os.EOL}`;
    this._buffer = "";
  }

  _transform(chunk, _, callback) {
    this._buffer += chunk.toString("utf-8");
    let splittedStrings = this._buffer.split(this.delimeter);
    this._buffer = splittedStrings.pop();
    splittedStrings.forEach(this.push, this);
    callback();
  }
  _flush(callback) {
    callback(null, this._buffer);
  }
}

module.exports = LineSplitStream;
