export const DEFAULT_API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

type DeploymentsResponse = {
  deployments?: Array<{ url?: string | null }>;
};

function getPreviewConfig() {
  return {
    projectId: process.env.API_PROJECT_ID ?? process.env.NEXT_PUBLIC_API_PROJECT_ID,
    commitSha:
      process.env.VERCEL_GIT_COMMIT_SHA ?? process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA,
    branch: process.env.VERCEL_GIT_COMMIT_REF ?? process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_REF,
    token: process.env.VERCEL_TOKEN,
    teamId: process.env.VERCEL_TEAM_ID ?? process.env.VERCEL_ORG_ID,
  };
}

async function fetchBackendPreviewUrl(
  projectId: string,
  token: string,
  teamId: string | undefined,
  filters: Record<string, string>
): Promise<string | null> {
  const params = new URLSearchParams({
    projectId,
    target: 'preview',
    state: 'READY',
    limit: '5',
    ...filters,
  });

  if (teamId) {
    params.set('teamId', teamId);
  }

  const response = await fetch(`https://api.vercel.com/v6/deployments?${params.toString()}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    cache: 'no-store',
  });

  if (!response.ok) {
    const body = await response.text();
    console.error('Vercel deployments API failed:', response.status, body);
    return null;
  }

  const data = (await response.json()) as DeploymentsResponse;
  const deploymentUrl = data.deployments?.find((deployment) => deployment.url)?.url;

  return deploymentUrl ? `https://${deploymentUrl}` : null;
}

/**
 * Resolves the matching backend preview deployment URL for this frontend preview.
 * Frontend and API live on different *.vercel.app URLs, but share the same git
 * commit (or branch) when deployed from the same PR — that is what we match on.
 */
export async function resolveApiUrl(environment: string): Promise<string> {
  if (environment !== 'preview') {
    return DEFAULT_API_URL;
  }

  const { projectId, commitSha, branch, token, teamId } = getPreviewConfig();

  if (!projectId || !token) {
    console.warn(
      'Preview API URL resolution skipped. Set API_PROJECT_ID and VERCEL_TOKEN on the frontend Vercel project.'
    );
    return DEFAULT_API_URL;
  }

  try {
    if (commitSha) {
      const bySha = await fetchBackendPreviewUrl(projectId, token, teamId, { sha: commitSha });
      if (bySha) return bySha;
    }

    if (branch) {
      const byBranch = await fetchBackendPreviewUrl(projectId, token, teamId, { branch });
      if (byBranch) return byBranch;
    }

    console.warn(
      `No READY backend preview found for project ${projectId}` +
        (commitSha ? ` at commit ${commitSha}` : '') +
        (branch ? ` on branch ${branch}` : '') +
        '.'
    );
  } catch (error) {
    console.error('Failed to resolve preview API URL:', error);
  }

  return DEFAULT_API_URL;
}

export function isLocalFallbackApiUrl(apiUrl: string): boolean {
  return apiUrl.includes('localhost') || apiUrl.includes('127.0.0.1');
}
