export function Component(f) {
  return f;
};

export {render, html, svg} from 'uhtml-ssr';

export {
  createContext, useContext,
  useCallback, useMemo,
  useEffect, useLayoutEffect,
  useReducer, useState, useRef
} from 'uhooks-nofx';
