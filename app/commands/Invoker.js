'use strict';

class Invoker {
  
  constructor() {
    this._history = [];
  }

  run(command) {
    command.execute();

    this._history.push(command);

    log(`Command executed: ${command.serialize()}`);
  }

  undo() {
    let command = this._history.pop();
    command.revert();

    log(`Command reverted: ${command.serialize()}`);
  }

  runRemotely() {
    // send command via tcp
  }

}