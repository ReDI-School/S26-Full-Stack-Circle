import { Card } from '../Card';
import { Skeleton } from '../Skeleton';

export default function EventCardSkeleton() {
  return (
    <Card>
      <div className="flex flex-col gap-7.5 font-sans">
        <div className="flex gap-2.5 items-center text-[14px] h-6 text-input-primary">
          <Skeleton height={16} width={16} />
          <Skeleton height={16} width={177} />
        </div>
        <div className="flex flex-col gap-7.5">
          <div className="flex flex-col gap-2.5">
            <Skeleton height={26} width={193} />
            <Skeleton height={22} width={124} />
          </div>
          <div className="flex flex-col gap-2.5">
            <Skeleton height={16} width="100%" />
            <Skeleton height={16} width="75%" />
          </div>
        </div>
        <div className="flex justify-between">
          <div className="flex gap-2.5 items-center text-input-secondary">
            <Skeleton height={16} width={16} />
            <Skeleton height={16} width={60} />
          </div>

          <Skeleton height={32} width={100} />
        </div>
      </div>
    </Card>
  );
}
