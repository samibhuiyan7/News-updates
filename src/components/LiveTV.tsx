import React from 'react';
import { useTranslation } from 'react-i18next';
import { Tv, Play } from 'lucide-react';

const channels = [
  { name: 'Al Jazeera English', id: 'jL8uASllp_s' },
  { name: 'BBC News', id: 'f0lYfG9ps6A' },
  { name: 'Sky News', id: '9Auq9mYxFEE' },
  { name: 'ABC News', id: 'w_Ma8oQLmSM' }
];

export default function LiveTV() {
  const { t } = useTranslation();

  return (
    <section className="py-12">
      <div className="flex items-center gap-3 mb-8">
        <div className="p-2 bg-red-100 dark:bg-red-900/30 rounded-lg">
          <Tv className="w-6 h-6 text-red-600" />
        </div>
        <h2 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-white">
          {t('live_tv')}
        </h2>
        <div className="ml-2 flex items-center gap-2">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
          </span>
          <span className="text-xs font-bold text-red-500 uppercase tracking-widest">Live</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {channels.map((channel) => (
          <div key={channel.id} className="group relative aspect-video bg-zinc-900 rounded-2xl overflow-hidden shadow-lg">
            <iframe
              width="100%"
              height="100%"
              src={`https://www.youtube.com/embed/${channel.id}?autoplay=0&mute=1`}
              title={channel.name}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="opacity-80 group-hover:opacity-100 transition-opacity"
            ></iframe>
            <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/80 to-transparent pointer-events-none">
              <p className="text-white text-sm font-bold truncate">{channel.name}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
