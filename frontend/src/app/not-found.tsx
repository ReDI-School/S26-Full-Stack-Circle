'use client';

import { useRouter } from 'next/navigation';
import { PublicLayout, Button } from '../components';

/**
 * 404 Not Found error page component.
 *
 * Displays a user-friendly error message when a route is not found and provides
 * navigation back to the homepage. This component is automatically rendered by
 * Next.js when a route doesn't match any defined pages or when `notFound()` is
 * explicitly called.
 *
 * @component
 * @returns {JSX.Element} The rendered 404 error page with navigation controls
 */
const NotFound = () => {
  const router = useRouter();

  return (
    <PublicLayout>
      <div className="flex w-full flex-col items-center justify-center gap-6 px-4 sm:px-6 lg:gap-10">
        <div className="flex w-full max-w-md flex-col items-center gap-8 lg:items-start">
          <div className="text-center lg:text-left">
            <h1 className="text-3xl font-normal leading-tight text-text-primary">
              404 - Page Not Found
            </h1>
            <p className="text-lg text-input-secondary">
              The page you’re looking for doesn’t exist.
            </p>
          </div>

          <Button variant="secondary" onClick={() => router.push('/')} aria-label="Go to home page">
            Go to Home Page
          </Button>
        </div>
      </div>
    </PublicLayout>
  );
};

export default NotFound;
