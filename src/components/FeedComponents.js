import React from "react";
import {
  View,
  Text,
  CameraRoll,
  ScrollView,
  Image,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  Dimensions
} from "react-native";
import {
  Avatar,
  Button,
  Card,
  Title,
  Paragraph,
  IconButton,
  Colors
} from "react-native-paper";
import { getClampedListItem } from "../services/DataService";

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
    uri: "asdasd"
  },
  photo: {
    liked: false,
    uri: "asdasd"
  },
  onCardPress: () => {
    console.log("Card pressed");
  },
  onLike: () => {
    console.log("Like button pressed");
  }
};

export const SimpleListComponent = props => {
  return (
    <View>
      {props.photos.map((item, index) => {
        const photo = getClampedListItem(props.photos, index);
        const catFact = getClampedListItem(props.catFacts, index);
        const contact = getClampedListItem(props.contacts, index);
        return (
          <FeedListItem
            key={photo.uri}
            contact={contact}
            catFact={catFact}
            photo={photo}
          />
        );
      })}
    </View>
  );
};

export const ScrollingListComponent = props => {
  return (
    <ScrollView>
      {props.photos.map((item, index) => {
        const photo = getClampedListItem(props.photos, index);
        const catFact = getClampedListItem(props.catFacts, index);
        const contact = getClampedListItem(props.contacts, index);
        return (
          <FeedListItem
            key={photo.uri}
            catFact={catFact}
            contact={contact}
            photo={photo}
          />
        );
      })}
    </ScrollView>
  );
};

export const FlatListComponent = props => {
  return (
    <FlatList
      refreshing={props.isListRefreshingTop}
      data={props.photos}
      onRefresh={props.onRefreshTop}
      keyExtractor={(item, index) => item.uri + index}
      onEndReached={props.onRefreshBottom}
      onEndReachedThreshold={0.5}
      renderItem={listItem => {
        const index = listItem.index;
        const photo = listItem.item;
        const catFact = getClampedListItem(props.catFacts, index);
        const contact = getClampedListItem(props.contacts, index);
        return (
          <FeedListItem catFact={catFact} contact={contact} photo={photo} />
        );
      }}
      ListFooterComponent={
        props.isListRefreshingBottom && (
          <View style={{ flex: 1, padding: 10 }}>
            <ActivityIndicator size="large" />
          </View>
        )
      }
    />
  );
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
