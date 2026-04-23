'use client';

import { useRouter } from 'next/navigation';
import { PublicLayout, Button } from '../../components';
import { notFoundStyles } from './NotFound.styles';

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
  const { wrapper, container, textWrapper, title, description } = notFoundStyles();

  return (
    <PublicLayout>
      <div className={wrapper()}>
        <div className={container()}>
          <div className={textWrapper()}>
            <h1 className={title()}>404 - Page Not Found</h1>
            <p className={description()}>Please go back to the previous page.</p>
          </div>

          <Button variant="secondary" onClick={() => router.push('/')}>
            GO BACK
          </Button>
        </div>
      </div>
    </PublicLayout>
  );
};

export default NotFound;
