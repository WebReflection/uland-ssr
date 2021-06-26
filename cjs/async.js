'use strict';
const {isArray} = require('uarray');
const {
  html: $html,
  svg: $svg,
  render: $render
} = require('uhtml-ssr/async');

const html =  async (template, ...values) => {
  await unrollValues(values);
  return $html(template, ...values);
};
html.for = createFor($html);

const svg =  async (template, ...values) => {
  await unrollValues(values);
  return $svg(template, ...values);
};
svg.for = createFor($svg);

const render = async (where, what) => {
  const value = await (typeof what === 'function' ? what() : what);
  return $render(
    where,
    await (value instanceof Hook ? unroll(value) : value)
  );
};

exports.Component = Component;
exports.render = render;
exports.html = html;
exports.svg = svg;

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

const unroll = ({f, c, a}) => f.apply(c, a);

const unrollValues = async (values) => {
  const {length} = values;
  for (let i = 0; i < length; i++) {
    const hook = await values[i];
    if (hook instanceof Hook)
      values[i] = await unroll(hook);
    else if (isArray(hook))
      await unrollValues(hook);
  }
};

function Component(f) {
  return function () {
    return new Hook(f, this, arguments);
  };
}

function Hook(f, c, a) {
  this.f = f;
  this.c = c;
  this.a = a;
}

function createFor(uhtml) {
  return (e, id) => {
    return async (template, ...values) => {
      await unrollValues(values);
      return uhtml.for(e, id)(template, ...values);
    };
  };
}
