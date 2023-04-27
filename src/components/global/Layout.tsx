import { Transition } from '@headlessui/react';
import { PropsWithChildren, useId } from 'react';

function Glow() {
  let id = useId();

  return (
    <svg className='absolute inset-0 -z-10 h-full w-full bg-gray-950' aria-hidden='true'>
      <defs>
        <radialGradient id={id} cy='100%'>
          <stop offset='0%' stopColor='rgba(56, 189, 248, 0.3)' />
          <stop offset='53.95%' stopColor='rgba(0, 71, 255, 0.09)' />
          <stop offset='100%' stopColor='rgba(10, 14, 23, 0)' />
        </radialGradient>
      </defs>
      <rect width='100%' height='100%' fill={`url(#${id})`} />
    </svg>
  );
}

export function Layout(props: PropsWithChildren) {
  const { children } = props;

  return (
    <div className='relative flex-auto'>
      <Glow />
      <Transition
        as='main'
        show={true}
        appear={true}
        enter='delay-200 transition ease-in'
        enterTo='opacity-1'
        enterFrom='opacity-0'
      >
        {children}
      </Transition>
    </div>
  );
}
