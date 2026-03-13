import { GoogleGenAI } from "@google/genai";
import { Article } from "../types";

const NEWS_API_KEY = (import.meta as any).env.VITE_NEWS_API_KEY;
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

const genAI = GEMINI_API_KEY ? new GoogleGenAI({ apiKey: GEMINI_API_KEY }) : null;

export async function fetchNews(country = '', category = '', query = ''): Promise<Article[]> {
  const url = new URL('/api/news', window.location.origin);
  if (country) url.searchParams.append('country', country);
  if (category) url.searchParams.append('category', category);
  if (query) url.searchParams.append('q', query);

  try {
    const response = await fetch(url.toString());
    const data = await response.json();
    if (data.status === 'ok') {
      return data.articles;
    }
    throw new Error(data.message || 'Failed to fetch news');
  } catch (error) {
    console.error("Error fetching news:", error);
    return [];
  }
}

export async function summarizeArticle(article: Article): Promise<string> {
  if (!genAI) return article.description || '';

  try {
    const model = "gemini-3-flash-preview";
    const prompt = `Summarize the following news article in 2-3 concise sentences:
    Title: ${article.title}
    Description: ${article.description}
    Content: ${article.url}`;

    const response = await genAI.models.generateContent({
      model,
      contents: prompt,
    });

    return response.text || article.description || '';
  } catch (error) {
    console.error("Error summarizing article:", error);
    return article.description || '';
  }
}
