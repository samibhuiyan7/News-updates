export interface Article {
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
  source: {
    name: string;
  };
  country?: string;
  category?: string;
  aiSummary?: string;
}

export interface PrayerTimes {
  Fajr: string;
  Sunrise: string;
  Dhuhr: string;
  Asr: string;
  Sunset: string;
  Maghrib: string;
  Isha: string;
  Imsak: string;
  Midnight: string;
  Firstthird: string;
  Lastthird: string;
}

export interface UserPreferences {
  favoriteCountries: string[];
  favoriteCategories: string[];
  notificationsEnabled: boolean;
  language: string;
}

export type Language = 'en' | 'bn' | 'ar' | 'zh';
