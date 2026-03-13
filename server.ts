import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";

async function startServer() {
  const app = express();
  const PORT = 3000;

  // API routes
  app.get("/api/news", async (req, res) => {
    const NEWS_API_KEY = process.env.VITE_NEWS_API_KEY;
    if (!NEWS_API_KEY) {
      return res.status(500).json({ status: 'error', message: 'NEWS_API_KEY is missing on server' });
    }

    const { country, category, q, language } = req.query;
    const url = new URL('https://newsapi.org/v2/top-headlines');
    url.searchParams.append('apiKey', NEWS_API_KEY);
    if (country) url.searchParams.append('country', country as string);
    if (category) url.searchParams.append('category', category as string);
    if (q) url.searchParams.append('q', q as string);
    if (language) url.searchParams.append('language', language as string);
    if (!country && !category && !q && !language) url.searchParams.append('language', 'en');

    try {
      const response = await fetch(url.toString());
      const data = await response.json();
      res.json(data);
    } catch (error) {
      console.error("Server-side news fetch error:", error);
      res.status(500).json({ status: 'error', message: 'Failed to fetch news from server' });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
