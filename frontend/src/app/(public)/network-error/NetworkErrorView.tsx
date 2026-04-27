'use client';

import { Button } from '../../../components';
import { useRouter } from 'next/navigation';

const NetworkErrorView = () => {
  const router = useRouter();

  const handleRefresh = () => {
    router.refresh();
  };

  return (
    <div className="flex flex-col items-center justify-center gap-8 max-w-md text-center lg:items-start lg:text-left">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-normal text-text-primary">Something went wrong</h1>
        <p className="text-lg font-normal text-text-secondary">
          Seems like we are having trouble in our servers, please try to refresh the page.
        </p>
      </div>
      <Button variant="secondary" onClick={handleRefresh}>
        REFRESH
      </Button>
    </div>
  );
};

export default NetworkErrorView;
