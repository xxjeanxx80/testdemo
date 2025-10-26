export type NextRouter = {
  replace: (href: string) => void;
  push: (href: string) => void;
};

const noop = () => {};

export function useRouter(): NextRouter {
  return {
    replace: noop,
    push: noop,
  };
}
