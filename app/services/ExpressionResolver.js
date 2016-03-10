'use strict';

let _ = require('lodash');
let EventEmitter = require('events').EventEmitter;

// Chain of responsibility
class ExpressionResolver extends EventEmitter {

  constructor(Logic) {
    super();

    this._logic = Logic;
    this._expressions = [];
  }

  /**
   * Loads expressions.
   *
   * @param  {Array} expressions Expressions
   * @return {Object}            Self
   */
  load(expressions) {
    this._expressions = expressions;

    return this;
  }

  exec(input) {
    this._expressions.forEach(expression => {
      let condition = expression.condition;
      let rules = expression.rules;

      let result;
      if (condition.match(/^and$/i)) {
        result = this._executeAndLogic(rules, input);
      } else if (condition.match(/^or$/i)) {
        result = this._executeOrLogic(rules, input);
      }

      this.emit('all', expression, result);

      result && this.emit('match', expression);
      result || this.emit('fail', expression);
    });

    this.emit('end');

    return this;
  }

  _executeOrLogic(rules, input) {
    this._applyRules(rules, input);

    return _.some(rules, rule => {
      return rule.active;
    })
  }

  _executeAndLogic(rules, input) {
    this._applyRules(rules, input);

    return _.every(rules, rule => {
      return rule.active;
    })
  }

  _applyRules(rules, input) {
    return rules.map(rule => this._logic.make(rule, input));
  }

}

module.exports = ExpressionResolver;
