import React from "react";
import { StyleSheet } from "react-native";
import PropTypes from "prop-types";

import { Avatar, Card, Title, Paragraph, IconButton } from "react-native-paper";

export const FeedListItem = props => {
  return (
    <Card style={styles.card} elevation={8} onPress={props.onCardPress}>
      <Card.Content style={styles.cardTitle}>
        <Avatar.Image
          style={styles.cardAvatar}
          size={40}
          source={{ uri: props.contact.uri }}
        />
        <Title>{props.contact.name}</Title>
      </Card.Content>
      <Card.Cover source={{ uri: props.photo.uri }} />
      <Card.Actions>
        <IconButton
          icon={props.photo.liked ? "favorite" : "favorite-border"}
          color={"#46acb2"}
          size={20}
          onPress={props.onLike}
        />
      </Card.Actions>
      <Card.Content style={styles.cardTitle}>
        <Paragraph>{props.catFact}</Paragraph>
      </Card.Content>
    </Card>
  );
};

FeedListItem.defaultProps = {
  catFact: "Default cat fact",
  contact: {
    name: "Default contact name",
    uri: "some_uri"
  },
  photo: {
    liked: false,
    uri: "some_uri"
  },
  onCardPress: () => {
    console.log("Card pressed");
  },
  onLike: () => {
    console.log("Like button pressed");
  }
};

FeedListItem.propTypes = {
  catFact: PropTypes.string,
  contact: PropTypes.shape({
    name: PropTypes.string,
    uri: PropTypes.string
  }),
  photo: PropTypes.shape({
    liked: PropTypes.bool,
    uri: PropTypes.string
  }),
  onCardPress: PropTypes.func,
  onLike: PropTypes.func
};

const styles = StyleSheet.create({
  card: {
    margin: 10
  },
  cardTitle: {
    flexDirection: "row"
  },
  cardAvatar: {
    marginRight: 10,
    marginBottom: 10
  }
});
