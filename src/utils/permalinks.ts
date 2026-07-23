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
  business: '產業投資與商業經驗',
  life: '生活心得體驗分享',
};

export const TOPIC_DESCRIPTIONS: Record<Topic, string> = {
  software: '架構、前後端、資料庫、DevOps 與學習筆記。',
  business: '產業投資、房地產操作與商業實務經驗。',
  life: '生活紀錄、講座心得與個人體驗分享。',
};

export function isTopic(value: string): value is Topic {
  return (TOPICS as readonly string[]).includes(value);
}
