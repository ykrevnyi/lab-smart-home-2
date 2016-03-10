'use strict';

require('should');

describe('Logic Spec', function () {
  
  it('is green', function () {
    let res = true;
    res.should.be.ok();
  });

  it('is initializable', function () {
    let resolver = app().make('Logic');
  });

  it('resolves statement if PINs are the same', function () {
    let resolver = app().make('Logic');
    let rule = {
      pin: 1,
      value: 1,
      operator: 'equal',
    };
    let input = {
      pin: 1,
      value: 1
    };

    (typeof resolver.make(rule, input).active).should.not.be.equal('undefined');
  });

  it('doesn\'t resolve statement if PINs are NOT the same', function () {
    let resolver = app().make('Logic');
    let rule = {
      pin: 1,
      value: 1,
      operator: 'equal',
    };
    let input = {
      pin: 999,
      value: 1
    };

    (typeof resolver.make(rule, input).active).should.be.equal('undefined');
  });

  it('resolves EQUAL statements', function () {
    let resolver = app().make('Logic');
    let rule = {
      pin: 1,
      value: 1,
      operator: 'equal',
    };
    let input = {
      pin: 1,
      value: 1
    };

    // values are the same (active -> true)
    resolver.make(rule, input).active.should.be.ok();

    // values are different (1 !== 999) (active -> false)
    input.value = 999;
    resolver.make(rule, input).active.should.not.be.ok();
  });

  it('resolves NOT_EQUAL statements', function () {
    let resolver = app().make('Logic');
    let rule = {
      pin: 1,
      value: 1,
      operator: 'not_equal',
    };
    let input = {
      pin: 1,
      value: 1
    };

    // values are the same (active -> false)
    resolver.make(rule, input).active.should.not.be.ok();

    // values are different (1 !== 999) (active -> true)
    input.value = 999;
    resolver.make(rule, input).active.should.be.ok();
  });

  it('resolves GREATER_THEN statements', function () {
    let resolver = app().make('Logic');
    let rule = {
      pin: 1,
      value: 1,
      operator: 'gt',
    };
    let input = {
      pin: 1,
      value: 1
    };

    // values are the same, so 1 is not greater then 1 (active -> false)
    resolver.make(rule, input).active.should.not.be.ok();

    // 999 is greater then 1 (active -> true)
    rule.value = 999;
    resolver.make(rule, input).active.should.be.ok();

    // 0 is not greater then 1 (active -> false)
    rule.value = 0;
    resolver.make(rule, input).active.should.not.be.ok();
  });

  it('resolves GREATER_THEN_EQUALS statements', function () {
    let resolver = app().make('Logic');
    let rule = {
      pin: 1,
      value: 1,
      operator: 'gte',
    };
    let input = {
      pin: 1,
      value: 1
    };

    // values are the same, so 1 === 1 (active -> true)
    resolver.make(rule, input).active.should.be.ok();

    // 999 is greater then 1 (active -> true)
    rule.value = 999;
    resolver.make(rule, input).active.should.be.ok();

    // 0 is not greater or equal then 1 (active -> false)
    rule.value = 0;
    resolver.make(rule, input).active.should.not.be.ok();
  });

  it('resolves LESS_THEN statements', function () {
    let resolver = app().make('Logic');
    let rule = {
      pin: 1,
      value: 1,
      operator: 'lt',
    };
    let input = {
      pin: 1,
      value: 1
    };

    // values are the same, so 1 is not less then 1 (active -> false)
    resolver.make(rule, input).active.should.not.be.ok();

    // 999 is greater then 1 (active -> false)
    rule.value = 999;
    resolver.make(rule, input).active.should.not.be.ok();

    // 0 is less then 1 (active -> true)
    rule.value = 0;
    resolver.make(rule, input).active.should.be.ok();
  });

  it('resolves LESS_THEN_EQUALS statements', function () {
    let resolver = app().make('Logic');
    let rule = {
      pin: 1,
      value: 1,
      operator: 'lte',
    };
    let input = {
      pin: 1,
      value: 1
    };

    // values are the same, so 1 === 1 (active -> true)
    resolver.make(rule, input).active.should.be.ok();

    // 999 is greater then 1 (active -> false)
    rule.value = 999;
    resolver.make(rule, input).active.should.not.be.ok();

    // 0 is less then 1 (active -> true)
    rule.value = 0;
    resolver.make(rule, input).active.should.be.ok();
  });



});
