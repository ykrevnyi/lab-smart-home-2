'use strict';

let mongoose = require('mongoose');
let _ = require('lodash');

class Device  {

  constructor(OutputStream, pin, room, title) {
    this._id = mongoose.Types.ObjectId();
    this._stream = OutputStream;

    this._pin = pin;
    this._room = room;
    this._title = title;
  }

  get id() { return this._id }
  get pin() { return this._pin }

  send(data) {
    this._stream.pin = this._pin;
    
    this._stream.write(data);
  }

}

module.exports = Device;
