'use strict';

console.log('Sandbox started');

let room = app().make('Room', {
  title: 'Kitchen'
});

let lamp = app().make('Device', {
  title: 'LED lamp',
  room: room._id,
  pin: '1'
});

let motionSensor = app().make('Sensor', {
  title: 'Motion Sensor',
  room: room._id,
  pin: '2'
});

let motionSensor2 = app().make('Sensor', {
  title: 'Motion Sensor 2',
  room: room._id,
  pin: '3'
});
let command = app().make('TurnOnDevice', {
  device: lamp
});
let scenario = app().make('Scenario', {
  expressions: [{
    id: '123123',
    title: 'Turn LED lamp on',
    type: 'parallel',
    commands: [command]
  }]
});

motionSensor._stream = process.stdin;
motionSensor2._stream.push('1');


// Controll things
let condition = app().make('Condition', {
  expressions: [{
    scenarios: [scenario],
    condition: 'AND',
    rules: [{
      pin: '2',
      operator: 'equal',
      value: '1'
    }, {
      pin: '3',
      operator: 'equal',
      value: '1'
    }]
  }]
});
condition.addDevice(lamp);
condition.addSensor(motionSensor);
condition.addSensor(motionSensor2);
condition.listen();

// process.stdin.pipe(transform);
// process.stdin.pipe(motionSensor._stream)
