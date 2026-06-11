import { DEFAULT_API_URL, isLocalFallbackApiUrl, resolveApiUrl } from './resolveApiUrl';
import { getEnvironment } from './environment';

export interface ConfigData {
  environment: string;
  apiUrl: string;
}

let clientConfigPromise: Promise<ConfigData> | null = null;

async function loadClientConfig(): Promise<ConfigData> {
  try {
    const response = await fetch('/api/config', { cache: 'no-store' });

    if (!response.ok) {
      throw new Error(`Config request failed with status ${response.status}`);
    }

    return (await response.json()) as ConfigData;
  } catch (error) {
    console.error('Failed to load client config, using fallback API URL:', error);

    return {
      environment: getEnvironment(),
      apiUrl: DEFAULT_API_URL,
    };
  }
}

async function resolveRuntimeConfig(environment: string): Promise<ConfigData> {
  const bakedApiUrl = process.env.NEXT_PUBLIC_API_URL || DEFAULT_API_URL;

  if (environment !== 'preview' || !isLocalFallbackApiUrl(bakedApiUrl)) {
    return { environment, apiUrl: bakedApiUrl };
  }

  return {
    environment,
    apiUrl: await resolveApiUrl(environment),
  };
}

export const config = async (): Promise<ConfigData> => {
  const environment = getEnvironment();

  if (typeof window === 'undefined') {
    return resolveRuntimeConfig(environment);
  }

  const bakedApiUrl = process.env.NEXT_PUBLIC_API_URL || DEFAULT_API_URL;

  if (environment !== 'preview' || !isLocalFallbackApiUrl(bakedApiUrl)) {
    return { environment, apiUrl: bakedApiUrl };
  }

  clientConfigPromise ??= loadClientConfig();

  return clientConfigPromise;
};
