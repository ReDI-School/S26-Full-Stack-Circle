/**
 * Props for the base Card component.
 *
 * Extends all standard HTML div attributes.
 */
export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Controls whether the card displays interactive hover styles.
   *
   * When `true`, the card renders a visible border and elevated shadow
   * on hover, along with a `cursor-pointer` — matching the Figma hover state.
   *
   * @default false
   */
  interactive?: boolean;

  /**
   * The visual variant of the card.
   *
   * - `default` — white background, subtle shadow, rounded corners.
   * - `danger` — red-tinted background and border for critical information.
   *   Hover effects are suppressed on this variant.
   *
   * @default 'default'
   */
  variant?: 'default' | 'danger';

  /**
   * The content rendered inside the card.
   */
  children: React.ReactNode;
}
