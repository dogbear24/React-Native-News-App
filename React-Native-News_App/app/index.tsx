import React, { useEffect, useState } from 'react';
// Import React and two hooks: useEffect (runs code when the app loads) and useState (holds data like articles)

import { FlatList, SafeAreaView, RefreshControl } from 'react-native';
// Import components to build the screen layout
// FlatList: shows a scrollable list
// SafeAreaView: avoids notches/bars on iPhone
// RefreshControl: adds "pull to refresh" behavior

import Article from '../components/Article';
// Import our custom component to display each news article

import { getNews } from '../components/news';
// Import the function that fetches articles from the internet

export default function App() {
  const [articles, setArticles] = useState([]); 
  // This creates a state variable called articles. It starts empty [].

  const [refreshing, setRefreshing] = useState(true);
  // This holds a true/false value to show or hide the refresh spinner.

  const fetchNews = async () => {
    try {
      const news = await getNews(); // Call the function to get the news from the API
      setArticles(news); // Store the fetched articles in our state
    } catch (err) {
      console.error(err); // Show an error if the fetch fails
    } finally {
      setRefreshing(false); // Stop the refresh spinner
    }
  };

  useEffect(() => {
    fetchNews(); // This runs once when the app starts, and loads the news
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {/* This creates a safe screen area with full height */}
      <FlatList
        data={articles} // Tell FlatList what to show: our news articles
        keyExtractor={(_, index) => index.toString()} // Give each item a unique key
        renderItem={({ item }) => <Article article={item} />} // Render each item using our custom Article component
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={fetchNews} />
        }
      />
    </SafeAreaView>
  );
}
