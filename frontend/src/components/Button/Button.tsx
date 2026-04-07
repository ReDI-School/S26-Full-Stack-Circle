import type { ButtonProps } from './Button.types';
import { buttonStyles } from './Button.styles';

// export default function Button({ variant, size, state, children }: ButtonProps) {
//   return <button className={buttonStyles({ variant, size, state })}>{children}</button>;
// }
import { Children } from 'react';

export default function Button({ variant, size, state, children }: ButtonProps) {
  const isLoading = state === 'loading';

  return (
    <button
      className={buttonStyles({ variant, size, state })}
      disabled={state === 'disabled' || isLoading}
    >
      {isLoading ? (
        <span className="flex items-center justify-center gap-2">
          <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
          Loading
        </span>
      ) : (
        children
      )}
    </button>
  );
}
