'use strict';

let stream = require('stream');

class OutputStream extends stream.Readable {
  
  constructor() {
    super({objectMode: true});

    this.counter = 0;
  }

  _write(data, enc, done) {
    console.log(`Writing ${data} to the ${this.pin}`);

    this.write(data);
  }

}

module.exports = OutputStream;