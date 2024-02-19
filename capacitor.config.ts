import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.pet.app',
  appName: 'pet-life-care',
  webDir: 'www',
  server: {
    androidScheme: 'https'
  }
};

export default config;
