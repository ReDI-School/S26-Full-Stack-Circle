import { Card } from '../Card';
import { Skeleton } from '../Skeleton';
import { EventCardStyles } from './EventCard.styles';

export default function EventCardSkeleton() {
  const { wrapper, container, bottomContainer, skeletonContainer } = EventCardStyles();

  return (
    <Card>
      <div className={wrapper()}>
        <div className={container()}>
          <Skeleton height={16} width={16} />
          <Skeleton height={16} width={177} />
        </div>
        <div className={wrapper()}>
          <div className={skeletonContainer()}>
            <Skeleton height={26} width={193} />
            <Skeleton height={22} width={124} />
          </div>
          <div className="flex flex-col gap-2.5">
            <Skeleton height={16} width="100%" />
            <Skeleton height={16} width="75%" />
          </div>
        </div>
        <div className={bottomContainer()}>
          <div className={container()}>
            <Skeleton height={16} width={16} />
            <Skeleton height={16} width={60} />
          </div>
          <Skeleton height={32} width={100} />
        </div>
      </div>
    </Card>
  );
}
