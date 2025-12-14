import React from 'react';
import { DocsThemeConfig } from 'nextra-theme-docs';

const config: DocsThemeConfig = {
  logo: (
    <span className="inline-flex items-center gap-2 font-semibold">
      <img
        src="/aionixone-img.png"
        alt="AionixOne"
        width={28}
        height={28}
        style={{ borderRadius: '0.5rem', border: '1px solid rgba(255,255,255,0.15)' }}
      />
      AionixOne Docs
    </span>
  ),
  project: {
    link: 'https://github.com/aionix-labs'
  },
  docsRepositoryBase: 'https://github.com/aionix-labs/aionixone-site/tree/main/apps/docs/pages',
  footer: {
    text: 'AionixOne — Portable Cloud Runtime'
  },
  head: (
    <>
      <link rel="icon" type="image/png" href="/favicon.png" />
    </>
  )
};

export default config;
