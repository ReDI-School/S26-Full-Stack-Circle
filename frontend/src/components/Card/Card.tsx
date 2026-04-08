import type { CardProps } from './Card.types';
import { cardStyles } from './Card.styles';

/**
 * Base container component that provides shared visual styling for all
 * card-based layouts — `EventCard`, `FormCard`, `DangerCard`, `ProfileCard`, etc.
 *
 * Handles background, border, shadow, border-radius, and padding so composed
 * components only need to focus on their content.
 *
 * @example
 * ```tsx
 * // Default
 * <Card variant="default">
 *   <p>Content</p>
 * </Card>
 *
 * // Interactive — shows border and elevated shadow on hover
 * <Card variant="default" interactive onClick={() => {}}>
 *   <p>Clickable card</p>
 * </Card>
 *
 * // Danger — red-tinted background and border, no hover effect
 * <Card variant="danger">
 *   <p>Something went wrong</p>
 * </Card>
 * ```
 */
const Card = ({
  interactive = false,
  variant = 'default',
  children,
  className,
  ...props
}: CardProps) => (
  <div className={cardStyles({ interactive, variant, className })} {...props}>
    {children}
  </div>
);

export default Card;
