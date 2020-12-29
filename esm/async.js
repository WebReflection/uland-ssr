import {hooked} from 'uhooks-nofx/async';

import {render as $render} from 'uhtml-ssr';

export const render = async (where, what) => {
  const value = await (typeof what === 'function' ? what() : what);
  return $render(where, value);
};

export function Component(f) {
  return hooked(f);
};

export {html, svg} from 'uhtml-ssr';

export {
  createContext, useContext,
  useCallback, useMemo,
  useEffect, useLayoutEffect,
  useReducer, useState, useRef
} from 'uhooks-nofx/async';
