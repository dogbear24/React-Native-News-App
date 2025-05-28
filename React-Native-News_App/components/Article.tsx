import React from 'react';
// Import React to use components

import { View, Text, Linking, StyleSheet, TouchableOpacity } from 'react-native';
// Import basic layout tools
// Linking: lets us open URLs in the browser
// TouchableOpacity: makes something tappable like a button

import { Card, Divider } from 'react-native-elements';
// Import UI components that look good out of the box

import moment from 'moment';
// Import a library to show "how long ago" the article was published

interface ArticleProps {
  article: {
    title: string;
    description: string;
    publishedAt: string;
    url: string;
    urlToImage?: string;
    source: { name: string };
  };
}
// This tells TypeScript what data we expect: an article with title, description, etc.

export default function Article({ article }: ArticleProps) {
  const { title, description, url, urlToImage, publishedAt, source } = article;
  const time = moment(publishedAt).fromNow(); // "2 hours ago"
  const defaultImg = 'https://via.placeholder.com/150'; // fallback image

  const TypedCard = Card as React.ComponentType<any>;

  return (
    <TouchableOpacity onPress={() => Linking.openURL(url)}>
        {/* Make the card clickable and open the article in a browser */}
        <TypedCard containerStyle={{ padding: 0}}>

            <Card.Image source={{ uri: urlToImage  || defaultImg}} />
            <Card.Title>{title}</Card.Title>


            <Text style={{ marginBottom: 10 }}>{description}</Text>
            <Divider style={{ backgroundColor: '#dfe6e9' }} />
            <View style={styles.meta}>
                <Text style={styles.note}>{source.name.toUpperCase()}</Text>
                <Text style={styles.note}>{time}</Text>
            </View>
        </TypedCard>

    </TouchableOpacity>
    
  );
}

const styles = StyleSheet.create({
  meta: {
    flexDirection: 'row', // horizontal row
    justifyContent: 'space-between', // space out text left and right
    margin: 10,
  },
  note: {
    fontSize: 12,
    color: 'gray',
  },
});