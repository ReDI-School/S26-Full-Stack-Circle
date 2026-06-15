'use client';
import { ProfileCardProps } from './ProfileCard.types';
import { profileCardStyles } from './ProfileCard.styles';
import Card from '../Card/Card';
import Avatar from '../Avatar/Avatar';
import { getInitials } from '../../utils/utils';
import { TrashIcon } from '@phosphor-icons/react';
import { deleteMe } from '@service/userService';
import useAuth from '@hooks/useAuth';
import { useState } from 'react';

const ProfileCard = ({
  name,
  authoredEvents,
  goingToEvents,
  participatedEvents,
}: ProfileCardProps) => {
  const { signOut } = useAuth();
  const nameInitials = getInitials(name);
  const [isActive, setIsActive] = useState(false);
  const deleteProfile = async () => {
    const okay = window.confirm('Do you want to delte your profile?');
    if (!okay) return;
    try {
      await deleteMe();
      await signOut();
    } catch (err: unknown) {
      console.error(err);
    }
  };
  const { base, TrashIconButton } = profileCardStyles();

  return (
    <Card>
      <span className={base()}>
        <span className="w-fit">
          <Avatar initials={nameInitials} size="lg" />
        </span>
        <div className="flex flex-col w-fit gap-1">
          {/* Name */}
          <span>
            <h2 className="text-text-secondary font-normal text-2xl">{name}</h2>
          </span>
          {/* Activity Summary */}
          <span>
            <p>
              Author of <b>{authoredEvents}</b> Events, going to <b>{goingToEvents}</b> and
              participated to <b>{participatedEvents}</b>
            </p>
          </span>
        </div>
        <button onClick={deleteProfile} className={TrashIconButton()}>
          <TrashIcon className="cursor-pointer" size={32} />
        </button>
      </span>
    </Card>
  );
};

export default ProfileCard;
