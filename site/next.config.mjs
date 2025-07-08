import createNextIntlPlugin from 'next-intl/plugin';

const nextConfig = {
  experimental: {
    reactCompiler: true,
    inlineCss: true,
  },
  devIndicators: {
    position: 'top-right'
  },
  output: 'standalone'
};

const withNextIntl = createNextIntlPlugin();

export default withNextIntl(nextConfig);
