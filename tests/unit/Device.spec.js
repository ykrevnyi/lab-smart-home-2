'use strict';

require('should');

describe('Device spec', function () {
  
  it('is green', function () {
    let res = true;
    res.should.be.ok();
  });

  it('is initializable', function () {
    let device = app().make('Device', {
      pin: 'pin id',
      room: 'room id',
      title: 'title'
    })
  });

  it('sends data to the writable stream', function (done) {
    let result = '';
    let Writable = require('stream').Writable;
    let OutputStream = new Writable({
      write: function(chunk, enc, next) {
        result += chunk.toString();

        next();
      }
    });

    let device = app().make('Device', {
      OutputStream: OutputStream,
      pin: 'pin id',
      room: 'room id',
      title: 'title'
    });

    device.send('hello test device');
    device.send('second one');

    process.nextTick(function() {
      result.should.be.equal('hello test devicesecond one');
      done();
    });
  });

});