'use strict';

require('should');

describe('Sensor spec', function () {
  
  it('is green', function () {
    let res = true;
    res.should.be.ok();
  });

  it('is initializable', function () {
    let sensor = app().make('Sensor', {
      pin: 'pin id',
      room: 'room id',
      title: 'title 1'
    });
  });

  it('listens data from the readable stream', function (done) {
    let Readable = require('stream').Readable;
    let InputStream = new Readable({
      read: function() {}
    });

    InputStream.push('1');
    InputStream.push('2');
    InputStream.push('3');

    let sensor = app().make('Sensor', {
      InputStream: InputStream,
      pin: 'pin id',
      room: 'room id',
      title: 'title 1'
    });

    let result = '';
    sensor.listen(msg => {
      result += msg.toString().replace('\n', '');
    });

    process.nextTick(function() {
      result.should.be.equal('123');
      done();
    });
  });

});