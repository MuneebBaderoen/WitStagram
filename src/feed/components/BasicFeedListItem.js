import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
export const FeedListItem = props => {
  return (
    <View style={styles.listItemContainer}>
      <Text>{props.contact.name}</Text>
      <Text>{props.catFact}</Text>
      <Image style={styles.image} source={{ uri: props.photo.uri }} />
    </View>
  );
};

const styles = StyleSheet.create({
  listItemContainer: {
    borderWidth: 2,
    borderColor: "#f00",
    padding: 25,
    margin: 10
  },
  image: {
    height: 100,
    width: 100
  }
});
