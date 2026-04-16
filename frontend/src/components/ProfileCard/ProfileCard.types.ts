/**
 * Props for the Profile Card component.
 */
interface ProfileCardProps {
  /**
   * user's name from which we deduce the initials to be displayed on the avatar
   */
  name: string;
  /**
   * The number of events created by the user is displayed in the short activity summary.
   */
  authoredEvents: number;
  /**
   * The number of upcoming events the user will participate in. This number is displayed in the short activity summary.
   */
  goingToEvents: number;
  /**
   * The number of events the user has participated in. This number is displayed in the brief activity summary.
   */
  participatedEvents: number;
}

export type { ProfileCardProps };
