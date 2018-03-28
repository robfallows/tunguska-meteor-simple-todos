import { Meteor } from 'meteor/meteor';
import { ReactiveDict } from 'meteor/reactive-dict';
import { assert } from 'chai';

describe('Body Unit Tests', () => {
  describe('ReactiveDict', () => {
    it('ReactiveDict should be defined', () => {
      assert.isDefined(ReactiveDict);
    });

    it('Can set numeric value in ReactiveDict', () => {
      const RD = new ReactiveDict();
      RD.set('number', 1);
      assert.strictEqual(RD.get('number'), 1);
    });

    it('Can set string value in ReactiveDict', () => {
      const RD = new ReactiveDict();
      RD.set('string', 'abc');
      assert.strictEqual(RD.get('string'), 'abc');
    });

    it('Can set multiple independent values in ReactiveDict', () => {
      const RD = new ReactiveDict();
      RD.set('number', 1);
      RD.set('string', 'abc');
      assert.isTrue(RD.get('string') === 'abc' && RD.get('number') === 1);
    });
  });

});

