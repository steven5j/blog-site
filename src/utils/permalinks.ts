/** Zero-pad to 2 digits (month/day). */
function pad2(n: number): string {
  return String(n).padStart(2, '0');
}

/**
 * Parts of a date permalink path from a publication date.
 * Uses UTC so YAML date-only values (`2024-06-01`) stay stable across timezones.
 */
export function datePathParts(pubDate: Date): {
  year: string;
  month: string;
  day: string;
} {
  return {
    year: String(pubDate.getUTCFullYear()),
    month: pad2(pubDate.getUTCMonth() + 1),
    day: pad2(pubDate.getUTCDate()),
  };
}

/**
 * WordPress-style date permalink: `/YYYY/MM/DD/slug`
 * `id` is the content collection entry id (file slug).
 */
export function postPermalink(pubDate: Date, id: string): string {
  const { year, month, day } = datePathParts(pubDate);
  return `/${year}/${month}/${day}/${id}`;
}

export const TOPICS = ['software', 'business', 'life'] as const;
export type Topic = (typeof TOPICS)[number];

export const TOPIC_LABELS: Record<Topic, string> = {
  software: '軟體工程筆記',
  business: '商業經驗',
  life: '生活心得體驗分享',
};

export const TOPIC_DESCRIPTIONS: Record<Topic, string> = {
  software:
    '我從 2019 年正式踏入程式語言與軟體科技產業的發展，並列為本人長期發展領域之一。此記錄我的筆記和發展技術與成果作品。',
  business:
    '各產業經銷、代理、顧問與現場經營的經驗筆記；亦含投資理財、職涯成長與房地產操作。',
  life: '從高中起參與聚會與社團，認識朋友、學習成長，分享筆記與生活體驗。',
};

export function isTopic(value: string): value is Topic {
  return (TOPICS as readonly string[]).includes(value);
}
