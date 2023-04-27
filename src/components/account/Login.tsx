import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { ArrowRight, Rocket, Warning } from '@phosphor-icons/react';
import { Badge, Button, FieldError, FinePrint, Input } from '~/components/ui';
import { trpc } from '~/utils/trpc';

const formSchema = z.object({
  email: z.string().email('Invalid email address').min(1, 'Email address is required'),
});

type FormSchemaType = z.infer<typeof formSchema>;

export function Login() {
  const { data, mutateAsync } = trpc.auth.login.useMutation();

  const {
    handleSubmit,
    register,
    getValues,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
  });

  if (data?.success) {
    return (
      <div className='flex flex-col items-center gap-y-4 text-center'>
        <Rocket weight='fill' className='h-14 w-14 text-blue-500' />
        <h2>Check your email for a magic link.</h2>
        <p>
          We&apos;ve sent an email to <br />
          <span className='font-semibold underline underline-offset-8'>{getValues('email')}</span>.
        </p>
      </div>
    );
  }

  return (
    <form
      className='flex flex-col gap-y-5'
      onSubmit={handleSubmit((values) =>
        mutateAsync({ email: values.email }).catch((err) => {
          setError('root', { message: err.message });
        }),
      )}
    >
      <header>
        <Rocket className='mb-4 h-14 w-14 text-blue-500' weight='fill' />
        <div className='flex items-center gap-x-2'>
          <h1>Rocket</h1>
          <Badge>Beta</Badge>
        </div>
        <p>
          Log in or <Link href='/signup'>sign up</Link> to continue.
        </p>
        {errors.root && <FieldError icon={true}>{errors.root.message}</FieldError>}
      </header>
      <Input
        aria-label='Email'
        placeholder='you@email.com'
        type='email'
        autoCapitalize='off'
        autoCorrect='off'
        spellCheck='false'
        inputMode='email'
        errorMessage={errors.email?.message}
        {...register('email')}
      />
      <Button isLoading={isSubmitting} type='submit'>
        Continue
        <ArrowRight />
      </Button>
      <FinePrint>
        By continuing, you agree to the <Link href='/'>Terms of Service</Link> and acknowledge our{' '}
        <Link href='/'>Privacy Policy</Link>.
      </FinePrint>
    </form>
  );
}
