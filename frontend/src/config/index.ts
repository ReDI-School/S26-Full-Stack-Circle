const ENVIRONMENT = process.env.NEXT_PUBLIC_VERCEL_ENV || 'development';
const API_PROJECT_ID = process.env.NEXT_PUBLIC_API_PROJECT_ID;
const COMMIT_SHA = process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA;
const VERCEL_TOKEN = process.env.NEXT_PUBLIC_VERCEL_TOKEN;
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

// Build API URL dynamically based on Vercel environment
// If the environment is preview (PR scoped), we need to get the API URL from the Vercel API otherwise use the local .env file
const getApiUrl = async (): Promise<string> => {
  if (ENVIRONMENT === 'preview') {
    try {
      const response = await fetch(
        `https://api.vercel.com/v6/deployments?projectId=${API_PROJECT_ID}&target=preview&sha=${COMMIT_SHA}`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${VERCEL_TOKEN}`,
          },
        }
      );

      const data = await response.json();

      return `https://${data.deployments[0].url}`;
    } catch (error) {
      console.error(error);

      return API_URL;
    }
  }

  return API_URL;
};

export interface ConfigData {
  environment: string;
  apiUrl: string;
}

export const config = async (): Promise<ConfigData> => {
  return {
    environment: ENVIRONMENT,
    apiUrl: await getApiUrl(),
  };
};
