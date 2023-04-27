import { useRouter } from 'next/router';
import { trpc } from '~/utils/trpc';
import { Button } from '~/components/ui';

export function AccountLogout() {
  const router = useRouter();
  const utils = trpc.useContext();

  const { mutate } = trpc.auth.logout.useMutation({
    onSuccess: () => {
      router.replace('/').then(() => utils.user.current.invalidate());
    },
  });

  return (
    <Button type='button' onClick={() => mutate()}>
      Logout
    </Button>
  );
}
