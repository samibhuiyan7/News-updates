import React, { useState, useEffect } from 'react';
import { fetchPrayerTimes } from '../services/prayerService';
import { PrayerTimes } from '../types';
import { useTranslation } from 'react-i18next';
import { Moon, Sun, MapPin, Clock } from 'lucide-react';
import { motion } from 'motion/react';

export default function PrayerWidget() {
  const { t } = useTranslation();
  const [times, setTimes] = useState<PrayerTimes | null>(null);
  const [location, setLocation] = useState<{ lat: number, lng: number } | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude });
        },
        (err) => {
          setError(t('location_required'));
          console.error(err);
        }
      );
    }
  }, [t]);

  useEffect(() => {
    if (location) {
      fetchPrayerTimes(location.lat, location.lng).then(setTimes);
    }
  }, [location]);

  if (error) return (
    <div className="p-4 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-2xl text-sm flex items-center gap-2">
      <MapPin className="w-4 h-4" />
      {error}
    </div>
  );

  if (!times) return (
    <div className="p-6 bg-zinc-100 dark:bg-zinc-800 rounded-2xl animate-pulse h-32" />
  );

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-gradient-to-br from-emerald-600 to-teal-700 p-6 rounded-2xl text-white shadow-lg relative overflow-hidden"
    >
      <div className="absolute top-0 right-0 p-4 opacity-10">
        <Moon className="w-24 h-24" />
      </div>

      <div className="relative z-10">
        <div className="flex items-center gap-2 mb-4">
          <Clock className="w-5 h-5" />
          <h3 className="font-bold tracking-tight">{t('prayer_times')}</h3>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white/10 backdrop-blur-md p-3 rounded-xl border border-white/10">
            <div className="flex items-center gap-2 text-emerald-100 text-xs font-medium mb-1">
              <Sun className="w-3 h-3" />
              {t('sehri')}
            </div>
            <div className="text-2xl font-black">{times.Imsak}</div>
          </div>

          <div className="bg-white/10 backdrop-blur-md p-3 rounded-xl border border-white/10">
            <div className="flex items-center gap-2 text-emerald-100 text-xs font-medium mb-1">
              <Moon className="w-3 h-3" />
              {t('iftar')}
            </div>
            <div className="text-2xl font-black">{times.Maghrib}</div>
          </div>
        </div>

        <div className="mt-4 flex justify-between text-[10px] uppercase tracking-widest font-bold text-emerald-200/60">
          <span>Fajr: {times.Fajr}</span>
          <span>Dhuhr: {times.Dhuhr}</span>
          <span>Asr: {times.Asr}</span>
          <span>Isha: {times.Isha}</span>
        </div>
      </div>
    </motion.div>
  );
}
