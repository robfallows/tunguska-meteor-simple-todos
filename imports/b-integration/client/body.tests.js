import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { Promise } from 'meteor/promise';
import { assert } from 'chai';

describe('Body Integration Tests', () => {
  describe('Client/Server Functions', () => {
    it('Cannot login with the wrong username', done => {
      try {
        Meteor.loginWithPassword('carol', 'password', err => {
          if (err) done(false);
          else done();
        });
      } catch (err) {
        done(err);
      }
    });

    it('Cannot login with the wrong password', done => {
      try {
        Meteor.loginWithPassword('bob', 'passw0rd', err => {
          if (err) done(false);
          else done();
        });
      } catch (err) {
        done(err);
      }
    });

    it('Cannot insert a new "todo" when not logged in', done => {
      try {
        Meteor.call('tasks.insert', 'todo text', (err, res) => {
          if (err) done(false);
          else done();
        });
      } catch (err) {
        done(err);
      }
    });

    it('Can login with the correct username and password', done => {
      try {
        Meteor.loginWithPassword('bob', 'password', err => {
          if (err) done(false);
          else done();
        });
      } catch (err) {
        done(err);
      }
    });

    it('Can insert a new "todo" when logged in', function(done) {
      Meteor.call('tasks.insert', 'todo text', (err, res) => {
        if (err) done(false);
        else done();
      });
    });
  });
});
