import createNextIntlPlugin from 'next-intl/plugin';

const nextConfig = {
  experimental: {
    reactCompiler: true,
    inlineCss: true,
  },
  devIndicators: {
    position: 'top-right'
  },
  output: 'export'
};

const withNextIntl = createNextIntlPlugin();

export default withNextIntl(nextConfig);
