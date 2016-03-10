'use strict';

let stream = require('stream');

class OutputStream extends stream.Writable {
  
  constructor() {
    super({objectMode: true});

    this._pin = 0;
  }

  set pin(pin) { this._pin = pin }

  _write(data, enc, done) {
    console.log(`Writing ${data} to the ${this._pin}`);

    done();
  }

}

module.exports = OutputStream;
