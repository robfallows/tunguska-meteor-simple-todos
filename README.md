# Simple Todo List

A fork with tests of the Meteor Tutorial app.

Use it to share a single todo list with your friends. The list updates on everyone's screen in real time, and you can make tasks private if you don't want others to see them.

Learn how to build this app by following the [Meteor Tutorial](https://www.meteor.com/tutorials/blaze/creating-an-app). This version of the Simple Todos app uses Blaze, but you can also follow tutorials for [React](https://www.meteor.com/tutorials/react/creating-an-app) and [Angular](https://www.meteor.com/tutorials/angular/creating-an-app).

Read more about building apps with Meteor in the [Meteor Guide](http://guide.meteor.com).

![screenshot](screenshot.png)

<!-- TOC -->

- [Simple Todo List](#simple-todo-list)
  - [TLDR](#tldr)
  - [Not TLDR](#not-tldr)
    - [Caveats](#caveats)
    - [Meteor packages](#meteor-packages)
    - [npm packages](#npm-packages)
  - [Structure](#structure)
  - [All Tests](#all-tests)
  - [Unit Tests](#unit-tests)
  - [Integration Tests](#integration-tests)
  - [Installation](#installation)
    - [Install Firefox v58](#install-firefox-v58)
    - [Clone this repo.](#clone-this-repo)
    - [Run the tests](#run-the-tests)
  - [Next steps](#next-steps)

<!-- /TOC -->

## TLDR

- Install Firefox v58 into `/opt/firefox58`.
- Clone this repo.
- `cd` into repo folder.
- `meteor npm i`
- `AUTO_EXIT=1 SLIMERJSLAUNCHER=/opt/firefox58/firefox meteor test --once --driver-package tunguska:meteor-testing`

## Not TLDR

Read the [Meteor Guide on testing](https://guide.meteor.com/testing.html) first! Even if you don't quite follow everything, it does explain some core concepts regarding where test files should live and when they're loaded.

As a minimum, you should understand that in test mode, Meteor eagerly loads all `*.tests.*` and `*.test.*` files, even if they're under `imports/`. Other files are not loaded at all, unless explicitly `import`ed inside the test files themselves.

### Caveats

- This fork demonstrates one way of running unit and integration tests. There are several test runners around which run with the `meteor test` command, as well as others which run outside of that.
- This README does not cover the use of `meteor test --full-app`.
- I have not changed any of the code in the app itself, just added some tests and altered one: you should note that the original app already has a test (in `imports/api/tasks.tests.js`). I have made three changes to this:

   1. Moved it into `imports/a-unit/server/tasks.tests.js`. The    use of `a-unit` is explained later in [*Structure*](#structure).
   1. The `import { Tasks } from './tasks.js'` has been changed to `import { Tasks } from '/imports/api/tasks.js'` reflecting its move into a different folder.
   1. The `import { assert } from 'meteor/practicalmeteor:chai'` has been changed to `import { assert } from 'chai'`, as I am using the native npm `chai` package.

### Meteor packages

The following Meteor package has been explicitly added to enable testing:

- `tunguska:meteor-testing 1.0.0`
  - A fork of `centiq:testing` updated to the latest version (at the time of publishing) of `slimer.js`. This package itself uses:
  - `tunguska:mocha-core 1.0.1`
    - A fork of `practicalmeteor:mocha-core` updated to the 5.0.5 version of `mocha` (the latest at the time of publishing).

### npm packages

- `chai 4.1.2`
- `mocha 5.0.5`

The native npm package works great out of the box. There's no need for a Meteor wrapper package.

## Structure

```text
.
├── client
│   ├── main.css
│   ├── main.html
│   └── main.js
├── imports
│   ├── api
│   │   └── tasks.js
│   ├── a-unit
│   │   ├── both
│   │   ├── client
│   │   │   ├── accounts-config.tests.js
│   │   │   └── body.tests.js
│   │   └── server
│   │       ├── fixtures.test.js
│   │       └── tasks.tests.js
│   ├── b-integration
│   │   └── client
│   │       └── body.tests.js
│   ├── startup
│   │   └── accounts-config.js
│   └── ui
│       ├── body.html
│       ├── body.js
│       ├── task.html
│       └── task.js
├── LICENSE
├── node_modules (too many files to list!)
├── package.json
├── package-lock.json
├── README.md
├── screenshot.png
└── server
    └── main.js
```

All test code lives under `imports`. Unit tests live in `imports/a-unit` and integration tests in `imports/b-integration`. Tests are further categorised by `client`, `server` or (potentially) `both`.

Server tests always run first - which is good, because it allows us to provision *fixtures* which may be needed later (like creating a test user). Note that, in test mode, Meteor gives us a brand new (empty) database to work with. Anything we need in there, we must add at test runtime.

In this repo, I haven't provisioned fixtures "correctly", but hopefully it's clear!

I like my unit tests to run before my integration tests. To enforce this I adopt a long-time feature of Meteor's eager loading policy: files are loaded alphabetically. So, tests in `a-unit` load (and run) before tests in `b-integration`.

## All Tests

All tests are written using [mocha](https://mochajs.org/) (provides the `describe` and `it` methods) and [chai#assert](http://www.chaijs.com/api/assert/) (provides the TDD* `assert` style). It is a simple matter to switch to [chai#expect or chai#should](http://www.chaijs.com/api/bdd/), if you prefer BDD* style.

> \* **TDD**: Test Driven Development. **BDD**: Behaviour/Business Driven Development. TDD is more "programmer" syntax, BDD is more "human" ;)
>
> - `assert.equal(a, b)` vs
> - `expect(a).to.equal(b)`

## Unit Tests

Simple Todos is not really written to make use of good unit testing patterns (for example, functions which can be tested independently). As I did not want to rewrite the code, I've "borrowed" some of Meteor's library functions to act like unit-testable code. A similar strategy was adopted by Tom Coleman when he wrote the original unit test in this package.

## Integration Tests

By which I mean tests that exercise more complex structures in the app. Specifically, I cover things like login on the client and `call`s to Meteor Methods: fairly typical Meteor client/server interactions.

## Installation

### Install Firefox v58

These instructions assume a linux OS.

- Browse to the [Firefox 58.0](https://ftp.mozilla.org/pub/firefox/releases/58.0/) release list.
- Select a distribution (for example `linux-x86_64`).
- Select your language (for example `en_US`).
- Download the release file (for example `firefox-58.0.tar.bz2`.
- Copy the dowloaded file into `/tmp`.
- `cd /tmp`
- `tar -xjf firefox-58.0.tar.bz2`
- You should now have a `firefox` folder in `/tmp` as well as `firefox-58.0.tar.bz2`.
- `rm firefox-58.0.tar.bz2`
- `sudo mv firefox /opt/firefox58`

### Clone this repo'

- `git clone tunguska/meteor-simple-todos todos`
- `cd todos`
- `meteor npm i`

### Run the tests

`AUTO_EXIT=1 SLIMERJSLAUNCHER=/opt/firefox58/firefox meteor test --once --driver-package tunguska:meteor-testing`

```text
I20180328-10:03:11.312(1)? --------------------
I20180328-10:03:11.356(1)? ----Server---------
I20180328-10:03:11.357(1)? --------------------
I20180328-10:03:11.357(1)?
I20180328-10:03:11.358(1)?
I20180328-10:03:11.358(1)?   Database Fixtures
I20180328-10:03:11.410(1)?     ✓ Can create a new user (90ms)
I20180328-10:03:11.410(1)?
I20180328-10:03:11.411(1)?   Tasks
I20180328-10:03:11.411(1)?     methods
I20180328-10:03:11.433(1)?       ✓ can delete owned task
I20180328-10:03:11.434(1)?
I20180328-10:03:11.434(1)?
I20180328-10:03:11.434(1)?   2 passing (121ms)
I20180328-10:03:11.435(1)?
I20180328-10:03:11.435(1)? --------------------
I20180328-10:03:11.435(1)? ----Client---------
I20180328-10:03:11.436(1)? --------------------
I20180328-10:03:13.018(1)?
I20180328-10:03:13.019(1)?
I20180328-10:03:13.038(1)?   Accounts Unit Tests
I20180328-10:03:13.038(1)?     Config
I20180328-10:03:13.041(1)?       ✓ can correctly set the required signup fields
I20180328-10:03:13.043(1)?
I20180328-10:03:13.044(1)?   Body Unit Tests
I20180328-10:03:13.045(1)?     ReactiveDict
I20180328-10:03:13.050(1)?       ✓ ReactiveDict should be defined
I20180328-10:03:13.053(1)?       ✓ Can set numeric value in ReactiveDict
I20180328-10:03:13.057(1)?       ✓ Can set string value in ReactiveDict
I20180328-10:03:13.060(1)?       ✓ Can set multiple independent values in ReactiveDict
I20180328-10:03:13.062(1)?
I20180328-10:03:13.066(1)?   Body Integration Tests
I20180328-10:03:13.068(1)?     Client/Server Functions
I20180328-10:03:13.089(1)?       ✓ Cannot login with the wrong username
I20180328-10:03:13.179(1)?       ✓ Cannot login with the wrong password (88ms)
I20180328-10:03:13.183(1)?       ✓ Cannot insert a new "todo" when not logged in
I20180328-10:03:13.284(1)?       ✓ Can login with the correct username and password (102ms)
I20180328-10:03:13.291(1)?       ✓ Can insert a new "todo" when logged in
I20180328-10:03:13.291(1)?
I20180328-10:03:13.292(1)?
I20180328-10:03:13.293(1)?   10 passing (276ms)
I20180328-10:03:13.293(1)?
I20180328-10:03:13.896(1)? All tests have finished
I20180328-10:03:13.896(1)? ------------------
I20180328-10:03:13.897(1)? SERVER FAILURES: 0
I20180328-10:03:13.897(1)? CLIENT FAILURES: 0
I20180328-10:03:13.897(1)? ------------------
```

Notes:

- `AUTO_EXIT=1`: Stops the `meteor` process when the tests finish and sets the return code if there are errors.
- `SLIMERJSLAUNCHER=/opt/firefox58/firefox`: where to find the firefox 58 binary.
- `meteor test`: run the `meteor` process in test mode.
- `--once`: run once - don't watch for file changes.
- `--driver-package tunguska:meteor-testing`: use the `tunguska:meteor-testing` test runner.

There is an interaction between `AUTO_EXIT=1` and `--once`:

- `AUTO_EXIT=1` and `--once`: Use both as part of a CI (continuous integration) toolchain. The runtime is built and tested and then exits. The exit code is set to the number of test failures. A new test database is created at the start of the tests.
- `AUTO_EXIT=1`: The runtime is built and tested and then is rebuilt and retested "forever". A new test database is created at the start of the first test and persists throughout re-runs. Content in the database is retained between tests unless explicitly deleted. Any errors over multiple runs will probably end up with:

   ```
   => Exited with code: 1
   => Your application is crashing. Waiting for file change.
   ```
- `--once`: The runtime is built and tested once, but the test process does not exit. The meteor filewatcher does not re-run tests, even if files are changed.
- [neither is used]: The runtime is built and tested, but the test process does not exit. The meteor filewatcher continues to run, so changes to files will re-run the tests. A new test database is created at the start of the first test and persists throughout re-runs. Content in the database is retained between tests unless explicitly deleted.

## Next steps

- Try breaking an existing test. For example, in `imports/a-unit/server/fixure.tests.js`, change `assert.isString(newUID)` to `assert.isNumber(newUID)`.
- Add your own tests.
- Add tests to your own app!

