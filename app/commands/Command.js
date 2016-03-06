'use strict';

let EventEmitter = require('events').EventEmitter;

class Command extends EventEmitter {
  
  constructor() {
    super();
  }

  execute() {
    return exception(
      'NotImplementedException', 
      null, 
      'You should implement execute() method'
    );
  }

  revert() {
    return exception(
      'NotImplementedException', 
      null, 
      'You should implement revert() method'
    );
  }

}

module.exports = Command;
