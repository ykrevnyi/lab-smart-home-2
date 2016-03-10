'use strict';

let mongoose = require('mongoose');

class Sensor  {

  constructor(InputStream, pin, room, title) {
    this._id = mongoose.Types.ObjectId();
    this._stream = InputStream;

    this._pin = pin;
    this._room = room;
    this._title = title;
  }

  get id() { return this._id }
  get pin() { return this._pin }

  listen(callback) {
    this._stream.on('data', callback);
  }

}

module.exports = Sensor;
