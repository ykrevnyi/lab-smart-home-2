'use strict';

let stream = require('stream');

class TransformStream extends stream.Transform {
  
  constructor() {
    super();
  }

  _transform(chunk, enc, done) {
    this.push(chunk);
    done();
  }

}

module.exports = TransformStream;