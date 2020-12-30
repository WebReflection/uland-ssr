'use strict';
const {hooked} = require('uhooks-nofx/async');

const {
  render: $render,
  html: $html,
  svg: $svg
} = require('uhtml-ssr');

const {isArray} = Array;

const createHelper = $tag => {
  const tag = async (template, ...values) =>
                $tag(template, ...(await unroll(values)));
  tag.for = () => tag;
  tag.node = tag;
  return tag;
};

const unroll = async values => {
  for (let {length} = values, i = 0; i < length; i++) {
    const value = await values[i];
    values[i] = isArray(value) ? await unroll(value) : value;
  }
  return values;
};

const html = createHelper($html);
exports.html = html;
const svg = createHelper($svg);
exports.svg = svg;

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
