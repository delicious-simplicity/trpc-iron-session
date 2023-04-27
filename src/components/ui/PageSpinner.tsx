import { Rocket } from '@phosphor-icons/react';
import { AnimationEventHandler } from 'react';

export function PageSpinner(props: { onAnimationIteration?: AnimationEventHandler<SVGElement> }) {
  return (
    <div className='grid h-screen place-items-center'>
      <Rocket
        onAnimationIteration={props.onAnimationIteration}
        weight='fill'
        className='h-28 w-28 animate-bounce text-blue-500'
      />
    </div>
  );
}
