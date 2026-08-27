export const SITE = {
  name: 'Steven J. Hu',
  title: 'Steven J. Hu — 個人部落格',
  description:
    '軟體工程、產品思維與個人筆記。Steven J. Hu 的繁中部落格。',
  url: 'https://stevenjhu.com',
  author: 'Steven J. Hu',
  locale: 'zh-Hant',
  twitter: '@stevenjhu',
} as const;

export type JsonLd = Record<string, unknown>;

export function websiteJsonLd(): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE.name,
    url: SITE.url,
    description: SITE.description,
    inLanguage: SITE.locale,
    author: {
      '@type': 'Person',
      name: SITE.author,
      url: SITE.url,
    },
  };
}

export function personJsonLd(): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: SITE.author,
    url: SITE.url,
    jobTitle: 'Software Engineer',
  };
}

export function blogPostingJsonLd(input: {
  title: string;
  description: string;
  url: string;
  pubDate: Date;
  updatedDate?: Date;
  tags?: string[];
  image?: string;
}): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: input.title,
    description: input.description,
    url: input.url,
    datePublished: input.pubDate.toISOString(),
    dateModified: (input.updatedDate ?? input.pubDate).toISOString(),
    inLanguage: SITE.locale,
    author: {
      '@type': 'Person',
      name: SITE.author,
      url: SITE.url,
    },
    keywords: input.tags?.join(', '),
    ...(input.image ? { image: input.image } : {}),
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': input.url,
    },
  };
}
