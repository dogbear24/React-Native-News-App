import { NEWS_API_KEY } from '@env'
// Import your private News API key from the .env file

export async function getNews() {
  const url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${NEWS_API_KEY}`;
  // Construct the URL to get top news from the US using your key

  const res = await fetch(url);
  // Call the URL and wait for a response

  const json = await res.json();
  // Convert the response from JSON string into a usable JavaScript object

  return json.articles;
  // Return only the list of articles to the app
}
