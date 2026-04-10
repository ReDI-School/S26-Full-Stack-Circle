'use client';

import type { SkeletonProps } from './Skeleton.types';
import { skeletonStyles } from './Skeleton.styles';

const Skeleton = ({
  animation = 'wave',
  width = '100%',
  height = 16,
  radius = 'md',
  ...rest
}: SkeletonProps) => {
  return (
    <span
      {...rest}
      className={skeletonStyles({ animation, width, height, radius })}
      aria-hidden="true"
    />
  );
};

export default Skeleton;
