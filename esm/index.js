import {isArray} from 'uarray';
import {
  html as $html,
  svg as $svg,
  render as $render
} from 'uhtml-ssr';

const html =  /*async*/ (template, ...values) => {
  /*await*/ unrollValues(values);
  return $html(template, ...values);
};
html.for = createFor($html);

const svg =  /*async*/ (template, ...values) => {
  /*await*/ unrollValues(values);
  return $svg(template, ...values);
};
svg.for = createFor($svg);

const render = /*async*/ (where, what) => {
  const value = /*await*/ (typeof what === 'function' ? what() : what);
  return $render(
    where,
    /*await*/ (value instanceof Hook ? unroll(value) : value)
  );
};

export {Component, render, html, svg};

export {
  createContext, useContext,
  useCallback, useMemo,
  useEffect, useLayoutEffect,
  useReducer, useState, useRef
} from 'uhooks-nofx';

const unroll = ({f, c, a}) => f.apply(c, a);

const unrollValues = /*async*/ (values) => {
  const {length} = values;
  for (let i = 0; i < length; i++) {
    const hook = /*await*/ values[i];
    if (hook instanceof Hook)
      values[i] = /*await*/ unroll(hook);
    else if (isArray(hook))
      /*await*/ unrollValues(hook);
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
    return /*async*/ (template, ...values) => {
      /*await*/ unrollValues(values);
      return uhtml.for(e, id)(template, ...values);
    };
  };
}
