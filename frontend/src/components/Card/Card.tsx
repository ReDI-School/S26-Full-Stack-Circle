import { CardProps } from './Card.types';
import { cardStyles } from './Card.styles';

const Card = ({ ref, interactive, children, className, loading = false, ...props }: CardProps) => {
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
};

export default Card;
