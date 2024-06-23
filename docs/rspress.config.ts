import * as path from 'path';
import { defineConfig } from 'rspress/config';

export default defineConfig({
  root: path.join(__dirname, 'docs'),
  title: 'JSON Cargo',
  description: 'JSON Utils Cargo',
  logo: false,
  themeConfig: {
    socialLinks: [{ icon: 'github', mode: 'link', content: 'https://github.com/foreverzmy/jsoncargo' }],
  },
});
