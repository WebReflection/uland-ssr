import {hooked} from 'uhooks-nofx';

export function Component(f) {
  return hooked(f);
};

export {render, html, svg} from 'uhtml-ssr';

export {
  createContext, useContext,
  useCallback, useMemo,
  useEffect, useLayoutEffect,
  useReducer, useState, useRef
} from 'uhooks-nofx';
