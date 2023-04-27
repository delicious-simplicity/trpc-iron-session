import { Button, Text } from '@react-email/components';
import { EmailLayout } from './EmailLayout';

export function WelcomeEmail(props: { name: string; magicLink: string }) {
  const { name, magicLink } = props;

  return (
    <EmailLayout previewText='Welcome to Rocket!'>
      <Text className='text-white'>Hi {name},</Text>
      <Text className='text-white'>
        Welcome to Rocket! Your magic link to login is below. It will expire in 2 minutes.
      </Text>
      <Button pX={12} pY={12} className='rounded-md bg-blue-500 font-bold text-white' href={magicLink}>
        Get Started
      </Button>
    </EmailLayout>
  );
}
