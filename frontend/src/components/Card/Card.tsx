import { CardProps } from './Card.types';
import { cardStyles } from './Card.styles';
import { forwardRef } from 'react';

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ interactive, children, className, loading = false, ...props }, ref) => {
    if (loading) {
      //todo : the Skeleton Component should be separately implemented
      return (
        <div className={cardStyles({ interactive, className })}>
          default card skeleton (loading ...)
        </div>
      );
    }

    return (
      <div ref={ref} className={cardStyles({ interactive, className })} {...props}>
        {children}
      </div>
    );
  }
);

Card.displayName = 'Card';

export default Card;
