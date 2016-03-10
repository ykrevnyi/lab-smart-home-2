'use strict';

let mongoose = require('mongoose');

class Scenario {
  
  constructor(expressions) {
    this._id = mongoose.Types.ObjectId();
    this._expressions = expressions || [];
  }

  run() {
    this._expressions.forEach(expression => {
      console.log(`Executing: ${expression.title}`);
      expression.commands.forEach(command => command.execute());
    });
  }

}

module.exports = Scenario;
