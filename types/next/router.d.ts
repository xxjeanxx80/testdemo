declare module 'next/router' {
  export type NextRouter = {
    replace: (href: string) => void;
    push: (href: string) => void;
  };
  export function useRouter(): NextRouter;
}
