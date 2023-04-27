import { Text, Link } from '@react-email/components';
import { siteURL } from '~/utils/vercel';
import { EmailLayout } from './EmailLayout';

export function AccountReadyEmail(props: { name: string }) {
  const { name } = props;

  return (
    <EmailLayout previewText='Your Rocket account is ready!'>
      <Text className='text-white'>Hi {name},</Text>
      <Text className='text-white'>
        The wait is over! Thank you for joing our waitlist and for your patience. We are excited to let you know that
        your Rocket account is ready.
      </Text>
      <Text className='text-white'>
        <Link className='text-blue-500' href={siteURL()}>
          Login
        </Link>{' '}
        to get started.
      </Text>
    </EmailLayout>
  );
}
