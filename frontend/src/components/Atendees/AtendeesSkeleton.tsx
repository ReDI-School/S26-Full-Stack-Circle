import { Card } from '@components/Card';
import { Skeleton } from '@components/Skeleton';

export default function AtendeesSkeleton() {
  return (
    <Card>
      <div className="flex flex-col gap-7.5">
        <Skeleton height={32} width={120} />
        <div className="flex gap-4 flex-wrap">
          <Skeleton height={32} width={64} />
          <Skeleton height={32} width={64} />
          <Skeleton height={32} width={64} />
        </div>
      </div>
    </Card>
  );
}
