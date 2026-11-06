import { defineConfig, devices } from '@playwright/test';

// Its own port, so a running dev preview on 4321 never collides with a test run.
const PORT = 4322;
const origin = `http://127.0.0.1:${PORT}`;

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  reporter: process.env.CI ? 'github' : 'list',
  use: { baseURL: origin },

  // Phone first: every regression this suite exists for was a phone regression.
  projects: [
    { name: 'phone', use: { ...devices['Pixel 7'] } },
    { name: 'small-phone', use: { ...devices['Pixel 7'], viewport: { width: 360, height: 640 } } },
  ],

  // Build against the test origin so the 404's <base> resolves locally.
  webServer: {
    command: 'node build.mjs && node serve.mjs',
    env: { SITE_ORIGIN: origin, PORT: String(PORT) },
    url: `${origin}/index.html`,
    reuseExistingServer: false,
    timeout: 60_000,
  },
});
