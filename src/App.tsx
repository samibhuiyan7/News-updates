import React, { useState, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import './i18n';
import Navbar from './components/Navbar';
import NewsCard from './components/NewsCard';
import PrayerWidget from './components/PrayerWidget';
import WorldMap from './components/WorldMap';
import LiveTV from './components/LiveTV';
import Footer from './components/Footer';
import ErrorBoundary from './components/ErrorBoundary';
import { fetchNews } from './services/newsService';
import { Article } from './types';
import { motion, AnimatePresence } from 'motion/react';
import { Filter, RefreshCw, TrendingUp, AlertTriangle } from 'lucide-react';

export default function App() {
  const { t, i18n } = useTranslation();
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(() => 
    window.matchMedia('(prefers-color-scheme: dark)').matches
  );
  
  const [filters, setFilters] = useState({
    country: '',
    category: '',
    query: ''
  });

  const loadNews = useCallback(async () => {
    setLoading(true);
    const data = await fetchNews(filters.country, filters.category, filters.query);
    setArticles(data);
    setLoading(false);
  }, [filters]);

  useEffect(() => {
    loadNews();
    // Hourly refresh
    const interval = setInterval(loadNews, 3600000);
    return () => clearInterval(interval);
  }, [loadNews]);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const categories = ['business', 'technology', 'politics', 'sports', 'general'];

  return (
    <ErrorBoundary>
      <div className={`min-h-screen transition-colors duration-300 ${isDarkMode ? 'bg-zinc-950 text-white' : 'bg-zinc-50 text-zinc-900'}`}>
        <Navbar 
          onSearch={(q) => setFilters(f => ({ ...f, query: q }))}
          onLanguageChange={(l) => i18n.changeLanguage(l)}
          isDarkMode={isDarkMode}
          toggleDarkMode={() => setIsDarkMode(!isDarkMode)}
        />

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Hero Section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
            <div className="lg:col-span-2">
              <div className="relative h-[400px] rounded-3xl overflow-hidden group shadow-2xl">
                <img 
                  src="https://picsum.photos/seed/worldnews/1200/800" 
                  alt="Hero" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex flex-col justify-end p-8">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="px-3 py-1 bg-red-600 text-white text-xs font-bold uppercase tracking-widest rounded-full animate-pulse">
                      {t('breaking_news')}
                    </span>
                  </div>
                  <h1 className="text-3xl md:text-5xl font-black text-white leading-tight mb-4 max-w-2xl">
                    Global Hourly Update: Your Window to the World
                  </h1>
                  <p className="text-zinc-300 text-lg max-w-xl hidden md:block">
                    Stay ahead with real-time news from every corner of the globe, summarized by AI for your convenience.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="space-y-6">
              <PrayerWidget />
              <div className="bg-white dark:bg-zinc-900 p-6 rounded-3xl border border-zinc-200 dark:border-zinc-800 shadow-sm">
                <div className="flex items-center gap-2 mb-4 text-emerald-600">
                  <TrendingUp className="w-5 h-5" />
                  <h3 className="font-bold uppercase tracking-wider text-sm">Trending Topics</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {['#AI', '#GlobalEconomy', '#Tech2026', '#ClimateAction', '#SpaceX'].map(tag => (
                    <span key={tag} className="px-3 py-1 bg-zinc-100 dark:bg-zinc-800 rounded-full text-xs font-medium hover:bg-emerald-100 dark:hover:bg-emerald-900/30 cursor-pointer transition-colors">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Map Section */}
          <section className="mb-16">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold tracking-tight">{t('all_countries')}</h2>
              <div className="flex items-center gap-2 text-sm text-zinc-500">
                <Filter className="w-4 h-4" />
                Interactive Map
              </div>
            </div>
            <WorldMap onCountrySelect={(code) => setFilters(f => ({ ...f, country: code }))} />
          </section>

          {/* News Section */}
          <section className="mb-16">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
              <div className="flex items-center gap-4 overflow-x-auto pb-2 no-scrollbar">
                <button
                  onClick={() => setFilters(f => ({ ...f, category: '' }))}
                  className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                    filters.category === '' 
                      ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/20' 
                      : 'bg-white dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-800'
                  }`}
                >
                  {t('all_categories')}
                </button>
                {categories.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setFilters(f => ({ ...f, category: cat }))}
                    className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                      filters.category === cat 
                        ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/20' 
                        : 'bg-white dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-800'
                    }`}
                  >
                    {t(`categories.${cat}`)}
                  </button>
                ))}
              </div>
              
              <button 
                onClick={loadNews}
                className="flex items-center gap-2 text-sm font-bold text-emerald-600 hover:text-emerald-700 transition-colors"
              >
                <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                Refresh
              </button>
            </div>

            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[1, 2, 3, 4, 5, 6].map(i => (
                  <div key={i} className="h-[400px] bg-zinc-200 dark:bg-zinc-800 rounded-2xl animate-pulse" />
                ))}
              </div>
            ) : articles.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <AnimatePresence mode="popLayout">
                  {articles.map((article, idx) => (
                    <NewsCard key={`${article.url}-${idx}`} article={article} />
                  ))}
                </AnimatePresence>
              </div>
            ) : (
              <div className="text-center py-20 bg-white dark:bg-zinc-900 rounded-3xl border border-dashed border-zinc-300 dark:border-zinc-700">
                <AlertTriangle className="w-12 h-12 text-zinc-300 mx-auto mb-4" />
                <p className="text-zinc-500 font-medium">{t('no_news')}</p>
                <p className="text-xs text-zinc-400 mt-2">Try changing your filters or check your API key.</p>
              </div>
            )}
          </section>

          <LiveTV />
        </main>

        <Footer />
      </div>
    </ErrorBoundary>
  );
}
