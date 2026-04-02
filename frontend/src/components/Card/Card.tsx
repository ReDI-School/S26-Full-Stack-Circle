import { CardProps } from './Card.types';
import { cardStyles } from './Card.styles';

const Card = ({ interactive, children }: CardProps) => {
  return <div className={cardStyles({ interactive })}>{children}</div>;
};

export default Card;
