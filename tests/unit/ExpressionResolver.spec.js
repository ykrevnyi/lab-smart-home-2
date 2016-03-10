'use strict';

require('should');

describe('Expression Resolver Spec', function () {
  
  it('is green', function () {
    let res = true;
    res.should.be.ok();
  });

  it('is initializable', function () {
    let logic = app().make('ExpressionResolver');
  });

  it('loads expressions', function () {
    let logic = app().make('ExpressionResolver');
    let expressions = ['some', 'expressions'];
    
    logic._expressions.should.be.empty();
    logic.load(expressions);
    logic._expressions.should.be.equal(expressions);
  });

  it('executes simple AND logic', function () {
    let logic = app().make('ExpressionResolver');
    let expressions = [{
      condition: 'AND',
      rules: [
        {
          pin: 1,
          operator: 'equal',
          value: 1
        },
        {
          pin: 2,
          operator: 'equal',
          value: 1
        }
      ]
    }];

    logic
      .load(expressions)
      .once('all', (expression, result) => result.should.not.be.ok())
      .exec({pin: 1, value: 1})
      .once('all', (expression, result) => result.should.be.ok())
      .exec({pin: 2, value: 1});

    logic
      .load(expressions)
      .once('all', (expression, result) => result.should.not.be.ok())
      .exec({pin: 1, value: 0})
      .once('all', (expression, result) => result.should.be.ok())
      .exec({pin: 1, value: 1});

    logic
      .load(expressions)
      .once('all', (expression, result) => result.should.not.be.ok())
      .exec({pin: 1, value: 0})
      .once('all', (expression, result) => result.should.not.be.ok())
      .exec({pin: 2, value: 0})
      .once('all', (expression, result) => result.should.not.be.ok())
      .exec({pin: 1, value: 1})
      .once('all', (expression, result) => result.should.be.ok())
      .exec({pin: 2, value: 1});
  });

  it('executes simple OR logic', function () {
    let logic = app().make('ExpressionResolver');
    let expressions = [{
      condition: 'OR',
      rules: [
        {
          pin: 1,
          operator: 'equal',
          value: 1
        },
        {
          pin: 2,
          operator: 'equal',
          value: 1
        }
      ]
    }];

    logic
      .load(expressions)
      .once('all', (expression, result) => result.should.be.ok())
      .exec({pin: 1, value: 1})
      .once('all', (expression, result) => result.should.be.ok())
      .exec({pin: 2, value: 1})
      .once('all', (expression, result) => result.should.be.ok())
      .exec({pin: 1, value: 0})
      .once('all', (expression, result) => result.should.not.be.ok())
      .exec({pin: 2, value: 0})
      .once('all', (expression, result) => result.should.be.ok())
      .exec({pin: 2, value: 1});
  });

});