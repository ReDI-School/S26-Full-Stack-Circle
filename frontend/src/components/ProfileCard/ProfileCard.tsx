import { ProfileCardProps } from './ProfileCard.types';
import { profileCardStyles } from './ProfileCard.styles';
import Card from '../Card/Card';
import Avatar from '../Avatar/Avatar';
import { getInitials } from '../../utils/utils';

const ProfileCard = ({
  name,
  authoredEvents,
  goingToEvents,
  participatedEvents,
  layout = 'desktop',
}: ProfileCardProps) => {
  const nameInitials = getInitials(name);
  return (
    <Card interactive={true}>
      <ul className={profileCardStyles({ layout })}>
        <span>
          <Avatar initials={nameInitials} size={'md'}></Avatar>
        </span>
        <div className="flex flex-col">
          {/* Name */}
          <span>
            <h2>{name}</h2>
          </span>
          {/* Activity Summary */}
          <span>
            <p>
              Author of <b>{authoredEvents}</b> Events, going to <b>{goingToEvents}</b> and
              participated to <b>{participatedEvents}</b>
            </p>
          </span>
        </div>
      </ul>
    </Card>
  );
};

export default ProfileCard;
