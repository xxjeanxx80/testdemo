import { ReactNode } from './react';

type HeadProps = {
  children?: ReactNode;
};

export default function Head({ children }: HeadProps) {
  return children as any;
}
