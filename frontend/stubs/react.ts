export type ReactNode = any;
export type ReactElement = any;
export type ComponentType<P = {}> = (props: P) => ReactNode;

export const Fragment = Symbol('Fragment');

type Context<T> = {
  value: T;
  Provider: (props: { value: T; children: ReactNode }) => ReactNode;
};

export function createContext<T>(defaultValue: T): Context<T> {
  const context: Context<T> = {
    value: defaultValue,
    Provider: ({ value, children }) => {
      context.value = value;
      return children;
    },
  };
  return context;
}

export function useContext<T>(context: Context<T>): T {
  return context.value;
}

export function useState<T>(initialValue: T): [T, (value: T) => void] {
  let state = initialValue;
  const setState = (value: T) => {
    state = value;
  };
  return [state, setState];
}

export function useMemo<T>(factory: () => T, _deps?: unknown[]): T {
  return factory();
}

export function useCallback<T extends (...args: any[]) => any>(callback: T): T {
  return callback;
}

export function useEffect(effect: () => void, _deps?: unknown[]) {
  effect();
}

export function useRef<T>(initialValue: T) {
  return { current: initialValue };
}

const React = {
  Fragment,
  createContext,
  useContext,
  useState,
  useMemo,
  useCallback,
  useEffect,
  useRef,
};

export default React;
