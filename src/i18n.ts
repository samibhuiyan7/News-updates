import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  en: {
    translation: {
      "app_name": "Global Hourly Update",
      "sehri": "Sehri (Suhoor)",
      "iftar": "Iftar",
      "breaking_news": "Breaking News",
      "search_placeholder": "Search news...",
      "all_countries": "All Countries",
      "all_categories": "All Categories",
      "ai_summary": "AI Summary",
      "read_more": "Read More",
      "live_tv": "Live TV News",
      "bookmarks": "Bookmarks",
      "settings": "Settings",
      "login": "Login",
      "logout": "Logout",
      "prayer_times": "Ramadan Prayer Times",
      "location_required": "Location access required for prayer times",
      "no_news": "No news found",
      "categories": {
        "business": "Business",
        "technology": "Technology",
        "politics": "Politics",
        "sports": "Sports",
        "general": "General"
      }
    }
  },
  bn: {
    translation: {
      "app_name": "গ্লোবাল আওয়ারলি আপডেট",
      "sehri": "সেহরি",
      "iftar": "ইফতার",
      "breaking_news": "ব্রেকিং নিউজ",
      "search_placeholder": "সংবাদ খুঁজুন...",
      "all_countries": "সব দেশ",
      "all_categories": "সব বিভাগ",
      "ai_summary": "এআই সারাংশ",
      "read_more": "আরও পড়ুন",
      "live_tv": "লাইভ টিভি নিউজ",
      "bookmarks": "বুকমার্ক",
      "settings": "সেটিংস",
      "login": "লগইন",
      "logout": "লগআউট",
      "prayer_times": "রমজানের নামাজের সময়সূচী",
      "location_required": "নামাজের সময়ের জন্য লোকেশন অ্যাক্সেস প্রয়োজন",
      "no_news": "কোন সংবাদ পাওয়া যায়নি",
      "categories": {
        "business": "ব্যবসা",
        "technology": "প্রযুক্তি",
        "politics": "রাজনীতি",
        "sports": "খেলাধুলা",
        "general": "সাধারণ"
      }
    }
  },
  ar: {
    translation: {
      "app_name": "تحديث عالمي كل ساعة",
      "sehri": "السحور",
      "iftar": "الإفطار",
      "breaking_news": "أخبار عاجلة",
      "search_placeholder": "ابحث عن الأخبار...",
      "all_countries": "جميع البلدان",
      "all_categories": "جميع الفئات",
      "ai_summary": "ملخص الذكاء الاصطناعي",
      "read_more": "اقرأ المزيد",
      "live_tv": "أخبار التلفزيون المباشر",
      "bookmarks": "الإشارات المرجعية",
      "settings": "الإعدادات",
      "login": "تسجيل الدخول",
      "logout": "تسجيل الخروج",
      "prayer_times": "أوقات صلاة رمضان",
      "location_required": "مطلوب الوصول إلى الموقع لأوقات الصلاة",
      "no_news": "لم يتم العثور على أخبار",
      "categories": {
        "business": "أعمال",
        "technology": "تكنولوجيا",
        "politics": "سياسة",
        "sports": "رياضة",
        "general": "عام"
      }
    }
  },
  zh: {
    translation: {
      "app_name": "全球每小时更新",
      "sehri": "封斋饭 (Suhoor)",
      "iftar": "开斋饭 (Iftar)",
      "breaking_news": "突发新闻",
      "search_placeholder": "搜索新闻...",
      "all_countries": "所有国家",
      "all_categories": "所有类别",
      "ai_summary": "AI 摘要",
      "read_more": "阅读更多",
      "live_tv": "直播电视新闻",
      "bookmarks": "书签",
      "settings": "设置",
      "login": "登录",
      "logout": "登出",
      "prayer_times": "斋月祷告时间",
      "location_required": "获取祷告时间需要位置权限",
      "no_news": "未找到新闻",
      "categories": {
        "business": "商业",
        "technology": "技术",
        "politics": "政治",
        "sports": "体育",
        "general": "常规"
      }
    }
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
