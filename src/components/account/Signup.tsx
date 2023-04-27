import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowArcLeft, ArrowLeft, Rocket, Warning } from '@phosphor-icons/react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Badge, Button, FieldError, FinePrint, Input } from '~/components/ui';
import { trpc } from '~/utils/trpc';
import { env } from '~/env.mjs';

const formSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().email('Invalid email address').min(1, 'Email address is required'),
});

type FormSchemaType = z.infer<typeof formSchema>;

export function Signup() {
  const { data, mutateAsync } = trpc.auth.signup.useMutation();

  const {
    handleSubmit,
    register,
    getValues,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
  });

  if (data?.success && data.waitlist) {
    return (
      <div className='flex flex-col items-center gap-y-4 text-center'>
        <Link href='/'>
          <Rocket weight='fill' className='h-14 w-14 text-blue-500' />
        </Link>
        <h2>You&apos;re all set.</h2>
        <p>Thank you for joining our waitlist.</p>
      </div>
    );
  }

  if (data?.success && !data.waitlist) {
    return (
      <div className='flex flex-col items-center gap-y-4 text-center'>
        <Rocket weight='fill' className='h-14 w-14 text-blue-500' />
        <h2>Check your email.</h2>
        <p>
          We&apos;ve sent a magic login link to you at <br />
          <span className='font-semibold underline underline-offset-8'>{getValues('email')}</span>.
        </p>
      </div>
    );
  }

  return (
    <form
      className='flex w-full flex-col gap-y-5'
      onSubmit={handleSubmit((values) =>
        mutateAsync({ firstName: values.firstName, lastName: values.lastName, email: values.email }).catch((err) => {
          setError('root', { message: err.message });
        }),
      )}
    >
      <header>
        <Link href='/' className='inline-block'>
          <Rocket className='mb-4 h-14 w-14 text-blue-500' weight='fill' />
        </Link>
        <div className='flex items-center gap-x-2'>
          <h1>Rocket</h1>
          <Badge>Beta</Badge>
        </div>
        <p>
          {env.NEXT_PUBLIC_WAITLIST_ENABLED
            ? 'Join our growing waitlist and our team will reach out to you as soon as possible.'
            : 'Sign up for early access.'}
        </p>
      </header>
      {errors.root && <FieldError icon={true}>{errors.root.message}</FieldError>}
      <Input
        aria-label='First Name'
        placeholder='First Name'
        type='text'
        inputMode='text'
        errorMessage={errors.firstName?.message}
        {...register('firstName')}
      />
      <Input
        aria-label='Last Name'
        placeholder='Last Name'
        type='text'
        inputMode='text'
        errorMessage={errors.lastName?.message}
        {...register('lastName')}
      />
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
        {env.NEXT_PUBLIC_WAITLIST_ENABLED ? 'Request Access' : 'Sign up'}
      </Button>
      <FinePrint>
        By continuing, you agree to the <Link href='/'>Terms of Service</Link> and acknowledge our{' '}
        <Link href='/'>Privacy Policy</Link>.
      </FinePrint>
      <Link
        href='/'
        className='mt-10 inline-flex items-center gap-x-1.5 self-start rounded-md bg-white/10 px-2.5 py-1 text-xs transition-colors hover:text-white'
      >
        <ArrowLeft /> Back to Login
      </Link>
    </form>
  );
}
