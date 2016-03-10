'use strict';

require('should');

describe('Condition spec', function () {
  
  it('is green', function () {
    let res = true;
    res.should.be.ok();
  });

  it('is initializable', function () {
    let condition = app().make('Condition', {
      expressions: []
    });
  });

  it('adds devices and sensors', function () {
    let condition = app().make('Condition', {expressions: []});

    let options = {pin: 'pin', room: 'room', title: 'title'};
    let device = app().make('Device', options);
    let sensor = app().make('Sensor', options);

    condition.addDevice(device);
    condition.addDevice(sensor);

    condition._devices.should.be.lengthOf(2);
    condition._devices[0].should.be.equal(device);
    condition._devices[1].should.be.equal(sensor);
  });

  it('throws exception if device already added', function () {
    let condition = app().make('Condition', {expressions: []});

    let options = {pin: 'pin', room: 'room', title: 'title'};
    let device = app().make('Device', options);

    (function() {
      condition.addDevice(device);
      condition.addDevice(device);
    }).should.throw(`Device ${device.id} already exist.`);
  });

  it('throws exception if sensor already added', function () {
    let condition = app().make('Condition', {expressions: []});

    let options = {pin: 'pin', room: 'room', title: 'title'};
    let sensor = app().make('Sensor', options);

    (function() {
      condition.addSensor(sensor);
      condition.addSensor(sensor);
    }).should.throw(`Sensor ${sensor.id} already exist.`);
  });

  it('listens input from all sesnors', function () {
    // Setup fake ExpressionResolver
    class FakeExpressionResolver extends require('events').EventEmitter {
      load() {return this}
      exec() {
        this.emit('match', expression);
        this.emit('end');
        return this
      }
    };

    // Setup expressions.
    // Here we add 2 scenarios.
    // Also we have 2 sensors.
    // So 2(sensors) * 2(scenarios) = 4(counter)
    let counter = 0;
    let expression = {
      scenarios: [
        {run: () => counter++},
        {run: () => counter++}
      ]
    };
    
    // Setup sensors
    let options = {pin: 'pin', room: 'room', title: 'title'};
    let sensor1 = app().make('Sensor', options);
    let sensor2 = app().make('Sensor', options);
    
    // Mock sensor's listener to just return single message
    // Stream 'data' event is by default and as a result 'callback'
    // will be triggered multiple times.
    sensor1.listen = callback => callback('from sensor 1');
    sensor2.listen = callback => callback('from sensor 2');

    // Set up condition
    let condition = app().make('Condition', {
      ExpressionResolver: new FakeExpressionResolver,
      expressions: [expression]
    });

    condition.addSensor(sensor1);
    condition.addSensor(sensor2);

    condition.listen();

    process.nextTick(() => {
      counter.should.be.equal(4);
    });
  });

});