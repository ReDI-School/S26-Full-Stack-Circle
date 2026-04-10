interface SkeletonProps extends React.HTMLAttributes<HTMLSpanElement> {
  animation?: string | boolean; // 'pulse' | 'wave' | false. 'wave' is default.
  width?: number | string; // '100%'	If number, treat as pixels. 100% is default.
  height?: number | string; // '100%'	If number, treat as pixels. 16 is default.
  radius?: string; // 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'full'. 'md' is default.
}

export type { SkeletonProps };
