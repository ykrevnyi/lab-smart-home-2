'use strict';

let mongoose = require('mongoose');
let _ = require('lodash');

class Room  {

  constructor(title) {
    this._id = mongoose.Types.ObjectId();
    this.title = title;
  }

}

module.exports = Room;