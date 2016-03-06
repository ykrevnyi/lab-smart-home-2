'use strict';

let Command = require(basePath('app/commands/Command'));

class TurnOnDevice extends Command {
  
  constructor(Device) {
    super();

    this._device = Device;
  }

  execute() {
    log('executing command');
  }

  revert() {
    log('reverting command');
  }

  serialize() {
    return JSON.stringify({command: 'TurnOnDevice'});
  }

}