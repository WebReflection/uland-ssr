import {hooked} from 'uhooks-nofx/async';

import {
  render as $render,
  html as $html,
  svg as $svg
} from 'uhtml-ssr';

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

export const html = createHelper($html);
export const svg = createHelper($svg);

export const render = async (where, what) => {
  const value = await (typeof what === 'function' ? what() : what);
  return $render(where, value);
};

export function Component(f) {
  return hooked(f);
};

export {
  createContext, useContext,
  useCallback, useMemo,
  useEffect, useLayoutEffect,
  useReducer, useState, useRef
} from 'uhooks-nofx/async';
