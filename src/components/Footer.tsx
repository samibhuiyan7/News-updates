import React from 'react';
import { useTranslation } from 'react-i18next';
import { Globe, Twitter, Facebook, Instagram, Github, Mail } from 'lucide-react';

export default function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="bg-white dark:bg-zinc-950 border-t border-zinc-200 dark:border-zinc-900 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <Globe className="w-8 h-8 text-emerald-600" />
              <span className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-white">
                {t('app_name')}
              </span>
            </div>
            <p className="text-zinc-600 dark:text-zinc-400 max-w-md mb-8 leading-relaxed">
              Providing accurate, hourly global news updates powered by Sami. Stay informed with real-time world events, personalized summaries, and essential Ramadan timings.
            </p>
            <div className="flex gap-4">
              
              <a href="https://www.facebook.com/SamiBhuiyan087" className="p-2 bg-zinc-100 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 rounded-full hover:bg-emerald-600 hover:text-white transition-all">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="https://www.instagram.com/b_posetive_0/" className="p-2 bg-zinc-100 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 rounded-full hover:bg-emerald-600 hover:text-white transition-all">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="https://github.com/samibhuiyan7" className="p-2 bg-zinc-100 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 rounded-full hover:bg-emerald-600 hover:text-white transition-all">
                <Github className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-bold uppercase tracking-widest text-zinc-900 dark:text-white mb-6">Categories</h4>
            <ul className="space-y-4">
              <li><a href="#" className="text-zinc-600 dark:text-zinc-400 hover:text-emerald-600 transition-colors">Technology</a></li>
              <li><a href="#" className="text-zinc-600 dark:text-zinc-400 hover:text-emerald-600 transition-colors">Politics</a></li>
              <li><a href="#" className="text-zinc-600 dark:text-zinc-400 hover:text-emerald-600 transition-colors">Business</a></li>
              <li><a href="#" className="text-zinc-600 dark:text-zinc-400 hover:text-emerald-600 transition-colors">Sports</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-bold uppercase tracking-widest text-zinc-900 dark:text-white mb-6">Contact</h4>
            <ul className="space-y-4">
              <li className="flex items-center gap-3 text-zinc-600 dark:text-zinc-400">
              <a href="https://mail.samibhuiyan087@gmail.com" className="p-2 bg-zinc-100 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 rounded-full hover:bg-emerald-600 hover:text-white transition-all">
                 <Mail className="w-4 h-4" />
              </a>
                samibhuiyan087@gmail.com

               
                
              </li>
              <li className="flex items-center gap-3 text-zinc-600 dark:text-zinc-400">
              <a href="https://sami-bhuiyan.vercel.app/" className="p-2 bg-zinc-100 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 rounded-full hover:bg-emerald-600 hover:text-white transition-all">
                 <Globe className="w-4 h-4" />  
              </a>
                 https://sami-bhuiyan.vercel.app
               
            
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-zinc-200 dark:border-zinc-900 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-zinc-500">
            © {new Date().getFullYear()} Global Hourly Update. All rights reserved.
          </p>
          <div className="flex gap-8 text-sm text-zinc-500">
            <a href="#" className="hover:text-emerald-600 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-emerald-600 transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
