import React from "react";
import {
  View,
  Text,
  CameraRoll,
  ScrollView,
  Image,
  StyleSheet,
  FlatList,
  ActivityIndicator
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

import { Contacts } from "expo";

export default class FeedScreen extends React.Component {
  state = {
    isListRefreshingTop: false,
    isListRefreshingBottom: false,
    numItems: 25,
    photos: [],
    contacts: [],
    jokes: []
  };

  formatName = name => {
    return name
      .split(" ")
      .join("")
      .toLowerCase();
  };

  fetchJokes = async () => {
    const jokes = await fetch(`https://cat-fact.herokuapp.com/facts`)
      .then(response => response.json())
      .then(response =>
        response.all.slice(0, this.state.numItems).map(item => item.text)
      );

    this.setState({
      jokes
    });
  };

  getContacts = async () => {
    const response = await Contacts.getContactsAsync();
    const contacts = response.data
      .filter(item => item.imageAvailable)
      .map(item => ({
        name: this.formatName(item.name),
        uri: item.image.uri,
        rawImage: item.rawImage
      }));
    this.setState({
      contacts
    });
  };

  getRandomListItem = (list, index) => {
    const numItems = list.length;
    const clampedIndex = Math.floor(index % numItems);
    return list[clampedIndex];
  };

  getPhotos = async () => {
    const response = await CameraRoll.getPhotos({ first: this.state.numItems });
    this.setState({
      photos: response.edges,
      isListRefreshingTop: false,
      photosEndCursor: response.page_info.end_cursor
    });
  };

  getMorePhotos = async () => {
    this.setState({
      isListRefreshingBottom: true
    });
    const response = await CameraRoll.getPhotos({
      first: this.state.numItems,
      after: this.state.photosEndCursor
    });
    this.setState({
      isListRefreshingBottom: false,
      photos: this.state.photos.concat(response.edges),
      photosEndCursor: response.page_info.end_cursor
    });
  };

  toggleLike = index => {
    console.log("Photo toggled!", index);
    this.setState({
      photos: this.state.photos.map((item, i) => {
        if (i === index) {
          item.active = !item.active;
        }
        return item;
      })
    });
  };

  componentDidMount = async () => {
    Promise.all([this.fetchJokes(), this.getContacts(), this.getPhotos()]);
  };

  handleDoubleTap = index => {
    const now = Date.now();
    const DOUBLE_PRESS_DELAY = 300;
    console.log(now);
    if (this.lastTap && now - this.lastTap < DOUBLE_PRESS_DELAY) {
      this.toggleLike(index);
    } else {
      this.lastTap = now;
    }
  };

  onRefresh = async () => {
    this.setState({
      isListRefreshingTop: true
    });
    this.getPhotos();
  };

  onBottomRefresh = async () => {
    await this.getMorePhotos();
  };

  render() {
    return (
      <View>
        <FlatList
          refreshing={this.state.isListRefreshingTop}
          data={this.state.photos}
          onRefresh={this.onRefresh}
          keyExtractor={(item, index) => item.node.image.uri + index}
          onEndReached={this.onBottomRefresh}
          onEndReachedThreshold={0.5}
          renderItem={listItem => {
            const p = listItem.item;
            const i = listItem.index;
            const joke = this.getRandomListItem(this.state.jokes, i);
            const contact = this.getRandomListItem(this.state.contacts, i);
            return (
              <Card
                key={i}
                style={styles.card}
                elevation={8}
                onPress={this.handleDoubleTap.bind(this, i)}
              >
                <Card.Content style={styles.cardTitle}>
                  <Avatar.Image
                    style={styles.cardAvatar}
                    size={40}
                    source={contact.rawImage}
                  />
                  <Title>{contact.name}</Title>
                </Card.Content>

                <Card.Cover source={{ uri: p.node.image.uri }} />
                <Card.Actions>
                  <IconButton
                    icon={p.active ? "favorite" : "favorite-border"}
                    color={"#46acb2"}
                    size={20}
                    onPress={this.toggleLike.bind(this, i)}
                  />
                </Card.Actions>
                <Card.Content style={styles.cardTitle}>
                  <Paragraph>{joke}</Paragraph>
                </Card.Content>
              </Card>
            );
          }}
          ListFooterComponent={
            this.state.isListRefreshingBottom && (
              <View style={{ flex: 1, padding: 10 }}>
                <ActivityIndicator size="large" />
              </View>
            )
          }
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  card: {
    margin: 10
  },
  cardTitle: {
    flex: 1,
    flexDirection: "row"
  },
  cardAvatar: {
    marginRight: 10,
    marginBottom: 10
  }
});
