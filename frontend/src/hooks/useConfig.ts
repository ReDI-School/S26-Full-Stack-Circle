import { useState, useEffect } from 'react';
import { config, type ConfigData } from '../config';

interface UseConfigReturn {
  config: ConfigData | null;
  loadingConfig: boolean;
  configError: string | null;
}

const useConfig = (): UseConfigReturn => {
  const [configData, setConfigData] = useState<ConfigData | null>(null);
  const [loadingConfig, setLoadingConfig] = useState<boolean>(true);
  const [configError, setConfigError] = useState<string | null>(null);

  useEffect(() => {
    const fetchConfig = async () => {
      try {
        setLoadingConfig(true);
        setConfigError(null);
        const configResult = await config();
        setConfigData(configResult);
      } catch (err) {
        setConfigError(err instanceof Error ? err.message : 'Failed to load configuration');
      } finally {
        setLoadingConfig(false);
      }
    };

    fetchConfig();
  }, []);

  return {
    config: configData,
    loadingConfig,
    configError,
  };
};

export default useConfig;
