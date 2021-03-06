import React from "react";
import { Text, StyleSheet } from "react-native";
import PropTypes from "prop-types";

import {
  Avatar,
  Card,
  Title,
  Paragraph,
  IconButton,
  withTheme
} from "react-native-paper";

class FeedListItemComponent extends React.Component {
  static defaultProps = {
    fact: "Default fact",
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

  static propTypes = {
    fact: PropTypes.string,
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

  renderHeader = () => {
    const props = this.props;
    return null;
    return (
      <Card.Content style={styles.cardTitle}>
        <Avatar.Image
          style={styles.cardAvatar}
          size={40}
          source={{ uri: props.contact.uri }}
        />
        <Title>{props.contact.name}</Title>
      </Card.Content>
    );
  };

  renderImage = () => {
    const props = this.props;
    return null;
    return <Card.Cover source={{ uri: props.photo.uri }} />;
  };

  renderActions = () => {
    const props = this.props;
    return null;
    return (
      <Card.Actions>
        <IconButton
          icon={props.photo.liked ? "favorite" : "favorite-border"}
          color={this.props.theme.colors.primary}
          size={20}
          onPress={props.onLike}
        />
      </Card.Actions>
    );
  };

  renderCaption = () => {
    const props = this.props;
    return null;
    return (
      <Card.Content style={styles.cardTitle}>
        <Paragraph>{props.fact}</Paragraph>
      </Card.Content>
    );
  };

  renderDummyContent = () => {
    return <Text>I'm the content of a card!</Text>;
  };

  render() {
    const props = this.props;
    return (
      <Card style={styles.card} elevation={8} onPress={props.onCardPress}>
        {this.renderDummyContent()}
        {this.renderHeader()}
        {this.renderImage()}
        {this.renderActions()}
        {this.renderCaption()}
      </Card>
    );
  }
}

// ------------- EDIT BEGIN ------------------
const styles = StyleSheet.create({
  card: {
    // margin: 10
  },
  cardTitle: {
    // flexDirection: "row"
  },
  cardAvatar: {
    // marginRight: 10,
    // marginBottom: 10
  }
});
// ------------- EDIT END ------------------

export const FeedListItem = withTheme(FeedListItemComponent);
