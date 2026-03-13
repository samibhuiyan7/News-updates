import { PrayerTimes } from "../types";

export async function fetchPrayerTimes(lat: number, lng: number): Promise<PrayerTimes | null> {
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  const url = `https://api.aladhan.com/v1/timings/${day}-${month}-${year}?latitude=${lat}&longitude=${lng}&method=2`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    if (data.code === 200) {
      return data.data.timings;
    }
    return null;
  } catch (error) {
    console.error("Error fetching prayer times:", error);
    return null;
  }
}
