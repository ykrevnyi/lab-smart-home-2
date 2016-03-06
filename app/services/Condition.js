'use strict';

let mongoose = require('mongoose');
let _ = require('lodash');

class Condition {

  constructor(ExpressionResolver, expressions) {
    this._id = mongoose.Types.ObjectId();
    this._devices = [];
    this._sensors = [];

    this._expressionResolver = ExpressionResolver;
    this._expressions = expressions;
  }

  /**
   * Lister for input from the all devices.
   * Every device has readable stream.
   *
   * @return {void}
   */
  listen() {
    this._sensors.forEach(sensor => {
      sensor.listen(msg => this._applyExpressions(sensor, msg));
    });
  }

  /**
   * Add device to the condition.
   * Will apply conditions to the devices.
   *
   * @param {Object} device Device entity
   */
  addDevice(device) {
    if (this._hasDevice(device)) {
      throw Error(`Device ${device._id} already exist.`);
    }

    this._devices.push(device);
  }

  /**
   * Add sensor to the condition.
   * Will apply conditions to the sensors.
   *
   * @param {Object} sensor Sensor entity
   */
  addSensor(sensor) {
    if (this._hasSensor(sensor)) {
      throw Error(`Sensor ${sensor._id} already exist.`);
    }

    this._sensors.push(sensor);
  }

  /**
   * Execute all the expressions.
   *
   * @param  {Object} sensor Sensor entity
   * @param  {String} msg    Message that sensor sent us
   * @return {void}
   */
  _applyExpressions(sensor, msg) {
    let input = {
      pin: String(sensor.pin),
      value: String(msg).replace(/\n/i, '')
    };

    this._expressionResolver
      .on('match', expression => {
        log(`+ for ${JSON.stringify(expression)}`);
      })
      .on('fail', expression => {
        log(`- for ${JSON.stringify(expression)}`);
      })
      .on('all', (expression, result) => {
        log(`every ${result}`);
      })
      .on('end', this._expressionResolver.removeAllListeners)
      .load(this._expressions)
      .exec(input);
  }

  /**
   * Helper function to check if device already exists.
   *
   * @param  {Object}  device entity
   * @return {Boolean}
   */
  _hasDevice(device) {
    return _.find(this._devices, function(item) {
      return device._id === item._id;
    });
  }

  /**
   * Helper function to check if sensor already exists.
   *
   * @param  {Object}  sensor entity
   * @return {Boolean}
   */
  _hasSensor(sensor) {
    return _.find(this._sensors, function(item) {
      return sensor._id === item._id;
    });
  }

}

module.exports = Condition;
