declare module 'react' {
  export type ReactNode = any;
  export type ReactElement = any;
  export type ComponentType<P = {}> = (props: P) => ReactNode;
  export const Fragment: unique symbol;
  export function createContext<T>(defaultValue: T): any;
  export function useContext<T>(context: any): T;
  export function useState<T>(initialValue: T): [T, (value: T) => void];
  export function useMemo<T>(factory: () => T, deps?: unknown[]): T;
  export function useCallback<T extends (...args: any[]) => any>(callback: T, deps?: unknown[]): T;
  export function useEffect(effect: () => void, deps?: unknown[]): void;
  export function useRef<T>(initialValue: T): { current: T };
  const React: any;
  export default React;
}

declare module 'react/jsx-runtime' {
  export const Fragment: unique symbol;
  export function jsx(type: any, props: any, key?: any): any;
  export const jsxs: typeof jsx;
  export const jsxDEV: typeof jsx;
}
