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
import { Contacts, Permissions } from "expo";

export default class FeedScreen extends React.Component {
  state = {
    isListRefreshingTop: false,
    isListRefreshingBottom: true,
    numItems: 25,
    photos: [],
    contacts: [],
    facts: []
  };

  formatName = name => {
    return name
      .split(" ")
      .join("")
      .toLowerCase();
  };

  fetchCatFacts = async () => {
    const facts = await fetch(`https://cat-fact.herokuapp.com/facts`)
      .then(response => response.json())
      .then(response =>
        response.all.slice(50, 50 + this.state.numItems).map(item => item.text)
      );

    this.setState({
      facts
    });
  };

  getContacts = async () => {
    if (this.state.hasContactsPermission) {
      const response = await Contacts.getContactsAsync();
      const contacts = response.data
        .filter(item => item.imageAvailable)
        .map(item => ({
          name: this.formatName(item.name),
          uri: item.image.uri
        }));
      this.setState({
        contacts
      });
    }
  };

  getRandomListItem = (list, index) => {
    const numItems = list.length;
    const clampedIndex = Math.floor(index % numItems);
    return list[clampedIndex];
  };

  getPhotos = async () => {
    if (this.state.hasCameraRollPermission) {
      const response = await CameraRoll.getPhotos({
        first: this.state.numItems
      });
      this.setState({
        photos: response.edges,
        isListRefreshingTop: false,
        photosEndCursor: response.page_info.end_cursor
      });
    }
  };

  getMorePhotos = async () => {
    if (this.state.hasCameraRollPermission) {
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
    }
  };

  toggleLike = index => {
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
    const { status: contactsStatus } = await Permissions.askAsync(
      Permissions.CAMERA
    );
    const { status: cameraRollStatus } = await Permissions.askAsync(
      Permissions.CAMERA_ROLL
    );
    this.setState({
      hasContactsPermission: contactsStatus === "granted",
      hasCameraRollPermission: cameraRollStatus === "granted"
    });
    await this.fetchCatFacts();
    await this.getContacts();
    await this.getPhotos();
    this.setState({
      isListRefreshingBottom: false
    });
  };

  handleDoubleTap = index => {
    const now = Date.now();
    const DOUBLE_PRESS_DELAY = 300;
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
            const catFact = this.getRandomListItem(this.state.facts, i);
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
                    source={{ uri: contact.uri }}
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
                  <Paragraph>{catFact}</Paragraph>
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
