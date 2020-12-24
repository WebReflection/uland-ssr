'use strict';
function Component(f) {
  return f;
}
exports.Component = Component;

(m => {
  exports.render = m.render;
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
})(require('uhooks-nofx'));
