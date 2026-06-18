interface UserAreaProps {
  userName: string;
  avatarInitials: string;
  onProfile: () => void;
  onSettings: () => void;
  onSignOut: () => void;
}

export type { UserAreaProps };
