'use client';
import type { SkeletonProps } from './Skeleton.types';
import { skeletonStyles } from './Skeleton.styles';
import { forwardRef } from 'react';

const Skeleton = forwardRef<HTMLSpanElement, SkeletonProps>(
  ({ animation = 'wave', width = '100%', height = 16, radius = 'base', ...rest }, ref) => {
    return (
      <span
        ref={ref}
        {...rest}
        className={skeletonStyles({ animation, radius })}
        style={{ width, height }}
        aria-hidden="true"
      />
    );
  }
);

Skeleton.displayName = 'Skeleton';

export default Skeleton;
