import clsx from 'clsx';
import { forwardRef, useId } from 'react';
import { FieldError } from './Typography';

interface InputProps extends React.ComponentPropsWithRef<'input'> {
  'aria-label': string;
  errorMessage?: string | undefined;
}

export const Input = forwardRef<HTMLInputElement, Omit<InputProps, 'id'>>(function Input(props, ref) {
  let id = useId();

  const { className, errorMessage, ...rest } = props;

  return (
    <div>
      <div className='relative'>
        <label htmlFor={id} className='sr-only'>
          {props['aria-label']}
        </label>
        <input
          id={id}
          className={clsx(
            'peer w-full bg-transparent px-4 py-2.5 text-base text-white placeholder:text-gray-500 focus:outline-none',
            className,
          )}
          ref={ref}
          {...rest}
        />
        <div className='absolute inset-0 -z-10 rounded-lg transition peer-focus:ring-4 peer-focus:ring-sky-300/10' />
        <div className='absolute inset-0 -z-10 rounded-lg bg-white/10 ring-1 ring-white/10 transition peer-focus:ring-blue-300' />
      </div>
      {errorMessage && <FieldError>{errorMessage}</FieldError>}
    </div>
  );
});
