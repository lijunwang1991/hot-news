export interface NewsItem {
  id: string;
  title: string;
  summary: string;
  content: string;
  imageUrl: string;
  category: string;
  source: string;
  author: string;
  publishedAt: string;
  views: number;
  likes: number;
  isHot: boolean;
  isDaily: boolean;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  count: number;
}

export interface UserSettings {
  notifications: boolean;
  dailyDigest: boolean;
  hotNewsAlert: boolean;
  preferredCategories: string[];
  language: string;
}

export interface NewsFilter {
  category?: string;
  timeRange?: 'today' | 'week' | 'month';
  sortBy?: 'latest' | 'popular' | 'hot';
}
