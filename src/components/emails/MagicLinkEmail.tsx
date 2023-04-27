import { Button, Text } from '@react-email/components';
import { EmailLayout } from './EmailLayout';

export function MagicLinkEmail(props: { name: string; magicLink: string }) {
  const { name, magicLink } = props;

  return (
    <EmailLayout previewText='Your Magic Link.'>
      <Text className='text-white'>Hi {name},</Text>
      <Text className='text-white'>Your magic link to login is below. It will expire in 2 minutes.</Text>
      <Button pX={12} pY={12} className='rounded-md bg-blue-500 font-bold text-white' href={magicLink}>
        Login
      </Button>
      <Text className='text-white'>If you didn&apos;t try to login, you can safely ignore this email.</Text>
    </EmailLayout>
  );
}
