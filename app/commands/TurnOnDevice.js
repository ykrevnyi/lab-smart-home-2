'use strict';

let Command = require(basePath('app/commands/Command'));

class TurnOnDevice extends Command {
  
  constructor(device) {
    super();

    this._device = device;
  }

  execute() {
    this._device.send('hello')
  }

  revert() {
    log('reverting command');
  }

  serialize() {
    return JSON.stringify({command: 'TurnOnDevice'});
  }

}

module.exports = TurnOnDevice;
