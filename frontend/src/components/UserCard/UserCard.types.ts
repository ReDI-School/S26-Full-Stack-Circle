interface UserCardProps {
  name: string;
  email: string;
  avatarUrl?: string;
  onClick?: () => void;
  selected?: boolean;
}

export type { UserCardProps };
