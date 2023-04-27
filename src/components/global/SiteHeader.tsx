import { Rocket } from '@phosphor-icons/react';
import Link from 'next/link';
import { Badge } from '../ui';

export function SiteHeader() {
  return (
    <header>
      <div className='container mx-auto flex max-w-7xl justify-between pt-8'>
        <Link href='/' className='flex items-center gap-x-2 font-bold text-white'>
          <Rocket className='h-8 w-8 text-blue-500' weight='fill' />
          Rocket
          <Badge>Beta</Badge>
        </Link>
      </div>
    </header>
  );
}
