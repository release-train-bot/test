import createNextIntlPlugin from 'next-intl/plugin';

const nextConfig = {
  experimental: {
    reactCompiler: true,
    inlineCss: true,
  },
  devIndicators: {
    position: 'top-right'
  },
  output: 'export',
  basePath: process.env.GITHUB_PAGES_BASE_PATH,
};

const withNextIntl = createNextIntlPlugin();

export default withNextIntl(nextConfig);
