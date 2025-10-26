import { ReactNode } from './react';

type LinkProps = {
  href: string;
  children: ReactNode;
  className?: string;
};

export default function Link({ children }: LinkProps) {
  return children as any;
}
