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

motionSensor._stream = process.stdin;
motionSensor2._stream.push('1');
// motionSensor2._stream.push('1');

// Controll things
let condition = app().make('Condition', {
  expressions: [{
    scenarios: [{
      name: 'auto_kitchen_light'
    }],
    condition: 'AND',
    rules: [
      {
        pin: '2',
        operator: 'equal',
        value: '1'
      },
      {
        pin: '3',
        operator: 'equal',
        value: '1'
      }
    ]
  }]
});
condition.addDevice(lamp);
condition.addSensor(motionSensor);
condition.addSensor(motionSensor2);
condition.listen();

// process.stdin.pipe(transform);
// process.stdin.pipe(motionSensor._stream)
