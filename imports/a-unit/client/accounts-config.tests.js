/* eslint-env chai */

import { Meteor } from 'meteor/meteor';
import { Accounts} from 'meteor/accounts-base';
import { assert } from 'chai';

describe('Accounts Unit Tests', () => {
  describe('Config', () => {
    it('can correctly set the required signup fields', () => {
      // set signup fields
      Accounts.ui.config({ passwordSignupFields: 'USERNAME_ONLY', });
      // Verify that the method does what we expected
      assert.equal(Accounts.ui._options.passwordSignupFields, 'USERNAME_ONLY');
    });
  });
});

