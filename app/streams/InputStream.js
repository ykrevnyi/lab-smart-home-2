'use strict';

let stream = require('stream');

class InputStream extends stream.Readable {
  
  constructor() {
    super({objectMode: true});
  }

  _read(size) {}

}

module.exports = InputStream;