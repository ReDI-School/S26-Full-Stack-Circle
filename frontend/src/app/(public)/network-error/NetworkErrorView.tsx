'use client';

import { Button } from '../../../components';
import { networkErrorStyles } from './NetworkError.styles';

const NetworkErrorView = () => {
  const styles = networkErrorStyles();

  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <div className={styles.container()}>
      <div className={styles.textWrapper()}>
        <h1 className={styles.title()}>Something went wrong</h1>
        <p className={styles.description()}>
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
