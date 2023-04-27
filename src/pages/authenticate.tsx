import { SmileySad } from '@phosphor-icons/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { trpc } from '~/utils/trpc';

export default function AuthenticatePage() {
  const router = useRouter();
  const utils = trpc.useContext();

  const { mutate, error } = trpc.auth.authenticate.useMutation({
    onSuccess: () => {
      utils.user.current.invalidate();
      router.replace('/dashboard');
    },
  });

  useEffect(() => {
    if (router.query.token) {
      mutate({ token: router.query.token as string });
    }
  }, [mutate, router.query.token]);

  if (error) {
    return (
      <div className='container mx-auto grid h-screen max-w-md place-items-center'>
        <div className='flex flex-col items-center gap-y-4 text-center'>
          <SmileySad weight='fill' className='h-24 w-24 text-blue-500' />
          <p>{error.message}</p>
          <Link href='/'>Login</Link>
        </div>
      </div>
    );
  }

  return null;
}
