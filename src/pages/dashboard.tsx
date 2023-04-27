import { AccountDelete, AccountLogout } from '~/components/account';
import { PageSpinner } from '~/components/ui';
import { SiteHeader } from '~/components/global';
import { trpc } from '~/utils/trpc';
import { useState } from 'react';
import { Transition } from '@headlessui/react';

export default function AccountPage() {
  const { data: user, isInitialLoading } = trpc.user.current.useQuery();
  const [animationIteration, setAnimationIteration] = useState(0);

  if ((isInitialLoading && !user) || animationIteration < 1) {
    return <PageSpinner onAnimationIteration={() => setAnimationIteration((prev) => prev + 1)} />;
  }

  return (
    <>
      <SiteHeader />
      <Transition
        as='main'
        show={true}
        appear={true}
        enter='delay-100 transition ease-in-out duration-300'
        enterTo='opacity-1'
        enterFrom='opacity-0'
        className='mx-auto flex max-w-7xl flex-col items-start'
      >
        {user && (
          <div className='my-8 rounded-lg bg-white/10 p-8'>
            <pre>{JSON.stringify(user, null, 2)}</pre>
          </div>
        )}
        <div className='flex gap-x-2'>
          <AccountLogout />
          <AccountDelete />
        </div>
      </Transition>
    </>
  );
}
