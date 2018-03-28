import { Accounts } from 'meteor/accounts-base';
import { Mongo } from 'meteor/mongo';
import { mocha } from 'mocha';
import { assert } from 'chai';

describe('Database Fixtures', () => {
  it('Can create a new user', () => {
    const newUID = Accounts.createUser({
      username: 'bob',
      password: 'password'
    });
    assert.isString(newUID);
  });

});
