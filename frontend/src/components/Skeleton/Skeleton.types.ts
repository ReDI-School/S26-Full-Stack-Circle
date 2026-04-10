interface SkeletonProps extends React.HTMLAttributes<HTMLSpanElement> {
  /**
   * Animation style of the skeleton. Set to `false` to disable animation.
   * @default 'wave'
   * @example
   * <Skeleton animation="pulse" />
   * <Skeleton animation={false} />
   */
  animation?: 'wave' | 'pulse' | false;
  /**
   * Width of the skeleton. Numbers are treated as pixels, strings as CSS values.
   * @default '100%'
   * @example
   * <Skeleton width={200} />
   * <Skeleton width="50%" />
   */
  width?: number | string;
  /**
   * Height of the skeleton. Numbers are treated as pixels, strings as CSS values.
   * @default 16
   * @example
   * <Skeleton height={40} />
   * <Skeleton height="2rem" />
   */
  height?: number | string;
  /**
   * Border radius of the skeleton.
   * Values map to design tokens defined in `src/assets/css/global.css`.
   * - `none` — `--radius-none`
   * - `sm` — `--radius-sm`
   * - `base` — `--radius-base`
   * - `md` — `--radius-md`
   * - `lg` — `--radius-lg`
   * - `full` — `--radius-full`
   * @default 'base'
   * @example
   * <Skeleton radius="full" />  // circular avatar placeholder
   * <Skeleton radius="none" />  // sharp-edged block
   */
  radius?: 'none' | 'sm' | 'base' | 'md' | 'lg' | 'full';
}

export type { SkeletonProps };
