// set the NODE_ENV to test
process.env.NODE_ENV = 'test';

// require `babel-register` to convert ES6 -> ES5
require('babel-register')();

function nullFunc() {
  return null;
}

// ignore non-javascript imports when converting
require.extensions['.css'] = nullFunc;
require.extensions['.png'] = nullFunc;
require.extensions['.jpg'] = nullFunc;

// require and configure 'enzyme'
const { configure } = require('enzyme');
const Adapter = require('enzyme-adapter-react-16');

configure({ adapter: new Adapter() });

// require 'jsdom' our mock broswer and create a fake `window` object
const { JSDOM } = require('jsdom');

const jsdom = new JSDOM('<!doctype html><html><body></body></html>');
const { window } = jsdom;

// create a fake localStorage on our fake window
window.localStorage = (function(){
  var storage = {};

  return {
    getItem: function(key) {
      return storage[key] || null;
    },
    removeItem: function(key) {
      delete storage[key];
    },
    setItem: function(key, item) {
      storage[key] = item;
    }
  };
})();

// make certain properties global (eg window, document etc)
function copyProps(src, target) {
  const props = Object.getOwnPropertyNames(src)
    .filter(prop => typeof target[prop] === 'undefined')
    .map(prop => Object.getOwnPropertyDescriptor(src, prop));
  Object.defineProperties(target, props);
}

global.window = window;
global.document = window.document;
// atob is used inside our Auth class, so we need to create our own version of it here
global.atob = window.atob = require('atob');
global.localStorage = window.localStorage;
global.navigator = {
  userAgent: 'node.js'
};
copyProps(window, global);

const documentRef = document; //eslint-disable-line no-unused-vars
