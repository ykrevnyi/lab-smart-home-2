'use strict';

var Exception = require('lumenode-foundation').Exception;

class NotImplementedException extends Exception {

  constructor(code, message) {
    super(code, message);

    this.name = 'NotImplementedException';
  }

}

module.exports = NotImplementedException;
