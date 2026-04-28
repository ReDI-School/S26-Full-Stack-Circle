import type { Metadata } from 'next';
import NetworkErrorView from './NetworkErrorView';

export const metadata: Metadata = {
  title: 'Network Error',
};

const NetworkErrorPage = () => {
  return <NetworkErrorView />;
};

export default NetworkErrorPage;
