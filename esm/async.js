import {hooked} from 'uhooks-nofx/async';

export function Component(f) {
  return hooked(f);
};

export {render, html, svg} from 'uhtml-ssr/async';

export {
  createContext, useContext,
  useCallback, useMemo,
  useEffect, useLayoutEffect,
  useReducer, useState, useRef
} from 'uhooks-nofx/async';
