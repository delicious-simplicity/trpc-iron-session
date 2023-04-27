import { PropsWithChildren } from 'react';

export function Badge(props: PropsWithChildren) {
  const { children } = props;

  return (
    <span className='inline-flex items-center rounded-md bg-yellow-400/10 px-2 py-1 text-xs font-medium text-yellow-500 ring-1 ring-inset ring-yellow-400/20'>
      {children}
    </span>
  );
}
