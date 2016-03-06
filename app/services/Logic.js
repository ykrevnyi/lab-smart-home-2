'use strict';

class Logic {

  constructor() {}
  
  make(rule, input) {
    if (rule.pin !== input.pin) return rule;

    if (rule.operator === 'equal') {
      if (rule.value === input.value) {
        rule.active = true;
      } else {
        rule.active = false;
      }
    }

    if (rule.operator === 'not_equal') {
      if (rule.value !== input.value) {
        rule.active = true;
      } else {
        rule.active = false;
      }
    }

    if (rule.operator === 'gt') {
      if (rule.value > input.value) {
        rule.active = true;
      } else {
        rule.active = false;
      }
    }

    if (rule.operator === 'gte') {
      if (rule.value >= input.value) {
        rule.active = true;
      } else {
        rule.active = false;
      }
    }

    if (rule.operator === 'lt') {
      if (rule.value < input.value) {
        rule.active = true;
      } else {
        rule.active = false;
      }
    }

    if (rule.operator === 'lte') {
      if (rule.value <= input.value) {
        rule.active = true;
      } else {
        rule.active = false;
      }
    }

    return rule;
  }

}

module.exports = Logic;
