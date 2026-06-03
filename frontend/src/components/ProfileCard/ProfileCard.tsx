import { ProfileCardProps } from './ProfileCard.types';
import { profileCardStyles } from './ProfileCard.styles';
import Card from '../Card/Card';
import Avatar from '../Avatar/Avatar';
import { getInitials } from '../../utils/utils';
import { TrashIcon } from '@phosphor-icons/react';

const ProfileCard = ({
  name,
  authoredEvents,
  goingToEvents,
  participatedEvents,
  onDeleteProfile,
}: ProfileCardProps) => {
  const nameInitials = getInitials(name);
  return (
    <Card>
      <span className={profileCardStyles()}>
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
        <button>
          <TrashIcon size={32} onClick={() => console.log('Clicked')} />
        </button>
      </span>
    </Card>
  );
};

export default ProfileCard;
