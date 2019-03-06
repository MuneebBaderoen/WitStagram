import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";

export const FeedListItem = props => {
  return (
    <View style={styles.listItemContainer} onPress={props.onCardPress}>
      <Text>{props.contact.name}</Text>
      <Image style={styles.image} source={{ uri: props.photo.uri }} />
      <Text>Liked: {"" + props.photo.liked}</Text>
      <Text>{props.catFact}</Text>
    </View>
  );
};

// ------------- EDIT BEGIN ------------------
const styles = StyleSheet.create({
  listItemContainer: {
    // borderWidth: 2,
    // borderColor: "#f00",
    // padding: 25,
    // margin: 10
  },
  image: {
    // height: 100,
    // width: 100
  }
});
// ------------- EDIT END ------------------
