import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.zendt.app',
  appName: 'Zendt',
  webDir: 'dist',

  plugins: {
    Keyboard: {
      resize: "none" 
    }
  }
};

export default config;