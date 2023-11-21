import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.example.app',
  appName: 'client',
  webDir: 'build',
  server: {
    url: 'http://192.168.1.163:3000',
    cleartext: true,
    androidScheme: 'https'
  }
};

export default config;
