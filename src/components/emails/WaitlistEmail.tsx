import { Text } from '@react-email/components';
import { EmailLayout } from './EmailLayout';

export function WaitlistEmail(props: { name: string }) {
  const { name } = props;

  return (
    <EmailLayout previewText="You're on the list.">
      <Text className='text-white'>Hi {name},</Text>
      <Text className='text-white'>
        Thank you for joining our waitlist. We will send you a note when we have something exciting to share.
      </Text>
    </EmailLayout>
  );
}
