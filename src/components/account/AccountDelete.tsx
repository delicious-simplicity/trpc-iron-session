import { useRouter } from 'next/router';
import { trpc } from '~/utils/trpc';
import { Button } from '~/components/ui';

export function AccountDelete() {
  const router = useRouter();
  const utils = trpc.useContext();

  const { mutate, isLoading } = trpc.user.delete.useMutation({
    onSuccess: () => {
      router.replace('/').then(() => utils.user.current.invalidate());
    },
  });

  return (
    <Button type='button' isLoading={isLoading} onClick={() => mutate()}>
      Delete Account
    </Button>
  );
}
