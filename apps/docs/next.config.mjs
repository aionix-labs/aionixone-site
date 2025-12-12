import nextra from 'nextra';

const withNextra = nextra({
  theme: 'nextra-theme-docs',
  themeConfig: './theme.config.tsx',
  flexsearch: {
    codeblocks: false
  }
});

const trnSections = [
  'format',
  'principles',
  'classification',
  'operations',
  'services',
  'implementation',
  'versioning',
  'appendix'
];

const trnSectionAliases = [
  { source: '/specs/trn', destination: '/concepts/trn' },
  ...trnSections.map((slug) => ({
    source: `/specs/${slug}`,
    destination: `/concepts/trn/${slug}`
  })),
  ...trnSections.map((slug) => ({
    source: `/specs/trn/${slug}`,
    destination: `/concepts/trn/${slug}`
  }))
];

const nextConfig = {
  reactStrictMode: true,
  pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
  async redirects() {
    return trnSectionAliases.map((entry) => ({
      ...entry,
      permanent: false
    }));
  }
};

export default withNextra(nextConfig);
