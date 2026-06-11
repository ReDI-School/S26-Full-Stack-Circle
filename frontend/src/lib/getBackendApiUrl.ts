import { getEnvironment } from '@/config/environment';
import { resolveApiUrl } from '@/config/resolveApiUrl';

export async function getBackendApiUrl(): Promise<string> {
  return resolveApiUrl(getEnvironment());
}
