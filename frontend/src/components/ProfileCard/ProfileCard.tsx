import { ProfileCardProps } from './ProfileCard.types';
import { profileCardStyles } from './ProfileCard.styles';
import Card from '../Card/Card';
import Avatar from '../Avatar/Avatar';
import { getInitials } from '../../utils/utils';
import { TrashIcon } from '@phosphor-icons/react';
import { deleteMe } from '@service/userService';
import { useState } from 'react';

const ProfileCard = ({
  name,
  authoredEvents,
  goingToEvents,
  participatedEvents,
}: ProfileCardProps) => {
  const nameInitials = getInitials(name);
  const [isActive, setIsActive] = useState(false);
  const deleteProfile = async () => {
    try {
      await deleteMe();
      alert('User deleted');
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
        {/* <button
          onMouseDown={() => setIsActive(true)}
          onMouseUp={() => setIsActive(false)}
          onMouseLeave={() => setIsActive(false)}
        >
          <TrashIcon
            className={`p-2 rounded-full border transition-colors duration-150 ${
              isActive
                ? 'bg-red-100 border-red-500 text-red-500'
                : 'bg-gray-100 border-gray-400 text-gray-400'
            }`}
            size={38}
            onClick={delteProfile}
          />
        </button> */}
      </span>
    </Card>
  );
};

export default ProfileCard;
