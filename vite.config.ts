import legacy from '@vitejs/plugin-legacy';
import { defineConfig, loadEnv } from 'vite';

const loadEnvConfig = (mode: string) => {
  const env = loadEnv(mode, `${process.cwd()}/env`, '');

  const processEnvValues = {
    'process.env': Object.entries(env).reduce((prev, [key, val]) => {
      return {
        ...prev,
        [key]: val,
      };
    }, {}),
  };

  return {
    plugins: [
      legacy({
        targets: ['defaults', 'not IE 11'],
      }),
    ],
    define: processEnvValues,
  };
};

export default defineConfig(({ mode }) => {
  return loadEnvConfig(mode);
});
