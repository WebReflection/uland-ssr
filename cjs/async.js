'use strict';
const {hooked} = require('uhooks-nofx/async');

const {render: $render} = require('uhtml-ssr');

const render = async (where, what) => {
  const value = await (typeof what === 'function' ? what() : what);
  return $render(where, value);
};
exports.render = render;

function Component(f) {
  return hooked(f);
}
exports.Component = Component;

(m => {
  exports.html = m.html;
  exports.svg = m.svg;
})(require('uhtml-ssr'));

(m => {
  exports.createContext = m.createContext;
  exports.useContext = m.useContext;
  exports.useCallback = m.useCallback;
  exports.useMemo = m.useMemo;
  exports.useEffect = m.useEffect;
  exports.useLayoutEffect = m.useLayoutEffect;
  exports.useReducer = m.useReducer;
  exports.useState = m.useState;
  exports.useRef = m.useRef;
})(require('uhooks-nofx/async'));
