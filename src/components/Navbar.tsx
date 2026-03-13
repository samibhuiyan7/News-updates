import React, { useState, useEffect } from 'react';
import { auth, db } from '../firebase';
import { GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged, User } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { useTranslation } from 'react-i18next';
import { Globe, Moon, Sun, User as UserIcon, Bookmark, LogOut, Search, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function Navbar({ onSearch, onLanguageChange, isDarkMode, toggleDarkMode }: { 
  onSearch: (q: string) => void, 
  onLanguageChange: (l: string) => void,
  isDarkMode: boolean,
  toggleDarkMode: () => void
}) {
  const { t, i18n } = useTranslation();
  const [user, setUser] = useState<User | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (u) => {
      setUser(u);
    });
    return unsubscribe;
  }, []);

  const handleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const userDoc = doc(db, 'preferences', result.user.uid);
      const snap = await getDoc(userDoc);
      if (!snap.exists()) {
        await setDoc(userDoc, {
          userId: result.user.uid,
          favoriteCountries: [],
          favoriteCategories: [],
          notificationsEnabled: true,
          language: i18n.language
        });
      }
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  const handleLogout = () => signOut(auth);

  const languages = [
    { code: 'en', name: 'English' },
    { code: 'bn', name: 'বাংলা' },
    { code: 'ar', name: 'العربية' },
    { code: 'zh', name: '中文' }
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md border-b border-zinc-200 dark:border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center gap-2">
            <Globe className="w-8 h-8 text-emerald-600" />
            <span className="text-xl font-bold tracking-tight text-zinc-900 dark:text-white hidden sm:block">
              {t('app_name')}
            </span>
          </div>

          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
              <input
                type="text"
                placeholder={t('search_placeholder')}
                className="w-full pl-10 pr-4 py-2 bg-zinc-100 dark:bg-zinc-800 border-none rounded-full text-sm focus:ring-2 focus:ring-emerald-500 transition-all"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  onSearch(e.target.value);
                }}
              />
            </div>
          </div>

          <div className="hidden md:flex items-center gap-4">
            <div className="relative group">
              <button className="p-2 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-full transition-colors">
                <Globe className="w-5 h-5" />
              </button>
              <div className="absolute right-0 mt-2 w-40 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => onLanguageChange(lang.code)}
                    className="w-full text-left px-4 py-2 text-sm hover:bg-zinc-100 dark:hover:bg-zinc-700 first:rounded-t-xl last:rounded-b-xl"
                  >
                    {lang.name}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={toggleDarkMode}
              className="p-2 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-full transition-colors"
            >
              {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>

            {user ? (
              <div className="relative group">
                <button className="flex items-center gap-2 p-1 pl-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-full transition-colors">
                  <img src={user.photoURL || ''} alt="" className="w-8 h-8 rounded-full" />
                </button>
                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                  <div className="px-4 py-2 border-bottom border-zinc-200 dark:border-zinc-700">
                    <p className="text-sm font-medium truncate">{user.displayName}</p>
                    <p className="text-xs text-zinc-500 truncate">{user.email}</p>
                  </div>
                  <button className="w-full text-left px-4 py-2 text-sm hover:bg-zinc-100 dark:hover:bg-zinc-700 flex items-center gap-2">
                    <Bookmark className="w-4 h-4" /> {t('bookmarks')}
                  </button>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-sm hover:bg-zinc-100 dark:hover:bg-zinc-700 flex items-center gap-2 text-red-500"
                  >
                    <LogOut className="w-4 h-4" /> {t('logout')}
                  </button>
                </div>
              </div>
            ) : (
              <button
                onClick={handleLogin}
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-medium rounded-full transition-colors flex items-center gap-2"
              >
                <UserIcon className="w-4 h-4" /> {t('login')}
              </button>
            )}
          </div>

          <div className="md:hidden flex items-center gap-2">
            <button
              onClick={toggleDarkMode}
              className="p-2 text-zinc-600 dark:text-zinc-400"
            >
              {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 text-zinc-600 dark:text-zinc-400"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden bg-white dark:bg-zinc-900 border-t border-zinc-200 dark:border-zinc-800 overflow-hidden"
          >
            <div className="px-4 py-4 space-y-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                <input
                  type="text"
                  placeholder={t('search_placeholder')}
                  className="w-full pl-10 pr-4 py-2 bg-zinc-100 dark:bg-zinc-800 border-none rounded-full text-sm"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    onSearch(e.target.value);
                  }}
                />
              </div>
              <div className="flex flex-wrap gap-2">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => onLanguageChange(lang.code)}
                    className={`px-3 py-1 rounded-full text-xs ${
                      i18n.language === lang.code
                        ? 'bg-emerald-600 text-white'
                        : 'bg-zinc-100 dark:bg-zinc-800'
                    }`}
                  >
                    {lang.name}
                  </button>
                ))}
              </div>
              {user ? (
                <button
                  onClick={handleLogout}
                  className="w-full py-2 text-red-500 font-medium flex items-center justify-center gap-2"
                >
                  <LogOut className="w-4 h-4" /> {t('logout')}
                </button>
              ) : (
                <button
                  onClick={handleLogin}
                  className="w-full py-2 bg-emerald-600 text-white font-medium rounded-xl flex items-center justify-center gap-2"
                >
                  <UserIcon className="w-4 h-4" /> {t('login')}
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
