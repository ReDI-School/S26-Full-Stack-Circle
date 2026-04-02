import { CardProps } from './Card.types';
import { cardStyles } from './Card.styles';

const Card = ({ ref, interactive, children, className, ...props }: CardProps) => {
  return (
    <div ref={ref} className={cardStyles({ interactive, className })} {...props}>
      {children}
    </div>
  );
};

export default Card;
