import type { Config } from 'tailwindcss';
import preset from '@aionixone/tailwind-preset';

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './content/**/*.{ts,tsx,mdx}',
    '../../packages/ui/src/**/*.{ts,tsx}'
  ],
  presets: [preset]
};

export default config;
