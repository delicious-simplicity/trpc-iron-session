import { Warning } from '@phosphor-icons/react';
import clsx from 'clsx';
import { ComponentPropsWithoutRef, PropsWithChildren } from 'react';

export function FinePrint(props: ComponentPropsWithoutRef<'p'>) {
  const { className, children, ...rest } = props;

  return (
    <p className={clsx('text-neutral-4 text-xs leading-relaxed text-neutral-400', className)} {...rest}>
      {children}
    </p>
  );
}

export function FieldError(props: PropsWithChildren<{ className?: string; icon?: boolean }>) {
  const { className, icon, children } = props;

  return (
    <div className={clsx('mt-2 inline-flex items-center gap-x-1.5 text-xs text-blue-500', className)}>
      {icon && <Warning className='h-4 w-4' />}
      {children}
    </div>
  );
}
