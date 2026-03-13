import React, { useState } from 'react';
import { Article } from '../types';
import { summarizeArticle } from '../services/newsService';
import { useTranslation } from 'react-i18next';
import { ExternalLink, Bookmark, Share2, Sparkles, Clock } from 'lucide-react';
import { motion } from 'motion/react';
import { formatDistanceToNow } from 'date-fns';
import { auth, db } from '../firebase';
import { collection, addDoc, query, where, getDocs, deleteDoc } from 'firebase/firestore';

export default function NewsCard({ article }: { article: Article }) {
  const { t } = useTranslation();
  const [summary, setSummary] = useState(article.aiSummary || '');
  const [loadingSummary, setLoadingSummary] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);

  const handleSummarize = async () => {
    if (summary) return;
    setLoadingSummary(true);
    const result = await summarizeArticle(article);
    setSummary(result);
    setLoadingSummary(false);
  };

  const toggleBookmark = async () => {
    if (!auth.currentUser) return;
    
    try {
      const q = query(
        collection(db, 'bookmarks'), 
        where('userId', '==', auth.currentUser.uid),
        where('articleId', '==', article.url)
      );
      const snap = await getDocs(q);
      
      if (snap.empty) {
        await addDoc(collection(db, 'bookmarks'), {
          userId: auth.currentUser.uid,
          articleId: article.url,
          title: article.title,
          description: article.description,
          url: article.url,
          urlToImage: article.urlToImage,
          publishedAt: article.publishedAt,
          source: article.source.name,
          createdAt: new Date().toISOString()
        });
        setIsBookmarked(true);
      } else {
        await deleteDoc(snap.docs[0].ref);
        setIsBookmarked(false);
      }
    } catch (error) {
      console.error("Bookmark error:", error);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group bg-white dark:bg-zinc-900 rounded-2xl overflow-hidden border border-zinc-200 dark:border-zinc-800 shadow-sm hover:shadow-xl transition-all duration-300"
    >
      <div className="relative aspect-video overflow-hidden">
        <img
          src={article.urlToImage || 'https://picsum.photos/seed/news/800/450'}
          alt={article.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          referrerPolicy="no-referrer"
        />
        <div className="absolute top-3 left-3">
          <span className="px-2 py-1 bg-emerald-600 text-white text-[10px] font-bold uppercase tracking-wider rounded-md">
            {article.source.name}
          </span>
        </div>
      </div>

      <div className="p-5">
        <div className="flex items-center gap-2 text-xs text-zinc-500 mb-3">
          <Clock className="w-3 h-3" />
          {formatDistanceToNow(new Date(article.publishedAt), { addSuffix: true })}
        </div>

        <h3 className="text-lg font-bold text-zinc-900 dark:text-white leading-tight mb-2 group-hover:text-emerald-600 transition-colors">
          {article.title}
        </h3>

        <p className="text-sm text-zinc-600 dark:text-zinc-400 line-clamp-2 mb-4">
          {article.description}
        </p>

        {summary && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            className="mb-4 p-3 bg-emerald-50 dark:bg-emerald-900/20 rounded-xl border border-emerald-100 dark:border-emerald-800/30"
          >
            <div className="flex items-center gap-2 text-xs font-bold text-emerald-700 dark:text-emerald-400 mb-1">
              <Sparkles className="w-3 h-3" />
              {t('ai_summary')}
            </div>
            <p className="text-xs text-emerald-900/80 dark:text-emerald-300/80 italic">
              {summary}
            </p>
          </motion.div>
        )}

        <div className="flex items-center justify-between pt-4 border-t border-zinc-100 dark:border-zinc-800">
          <div className="flex gap-2">
            <button
              onClick={handleSummarize}
              disabled={loadingSummary || !!summary}
              className="p-2 text-zinc-500 hover:text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 rounded-full transition-all"
              title={t('ai_summary')}
            >
              <Sparkles className={`w-4 h-4 ${loadingSummary ? 'animate-spin' : ''}`} />
            </button>
            <button
              onClick={toggleBookmark}
              className={`p-2 rounded-full transition-all ${
                isBookmarked 
                  ? 'text-emerald-600 bg-emerald-50 dark:bg-emerald-900/20' 
                  : 'text-zinc-500 hover:text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-900/20'
              }`}
            >
              <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-current' : ''}`} />
            </button>
            <button className="p-2 text-zinc-500 hover:text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 rounded-full transition-all">
              <Share2 className="w-4 h-4" />
            </button>
          </div>

          <a
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-xs font-bold text-emerald-600 hover:text-emerald-700 transition-colors"
          >
            {t('read_more')}
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>
    </motion.div>
  );
}
