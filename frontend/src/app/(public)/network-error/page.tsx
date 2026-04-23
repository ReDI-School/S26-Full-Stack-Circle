import { NetworkError } from '../../../views/NetworkError';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Network Error',
};

const NetworkErrorPage = () => {
  return <NetworkError />;
};

export default NetworkErrorPage;
