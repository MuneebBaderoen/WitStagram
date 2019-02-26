import React from "react";
import {
  View,
  Text,
  CameraRoll,
  ScrollView,
  Image,
  StyleSheet
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
    photos: [],
    contacts: []
  };

  formatName = name => {
    return name
      .split(" ")
      .join("")
      .toLowerCase();
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

  getRandomContact = () => {
    const numContacts = this.state.contacts.length;
    const randomIndex = Math.floor(Math.random() * numContacts);
    return this.state.contacts[randomIndex];
  };

  getPhotos = async () => {
    const response = await CameraRoll.getPhotos({ first: 25 });
    this.setState({
      photos: response.edges
    });
  };

  componentDidMount = async () => {
    this.getContacts();
    this.getPhotos();
  };

  render() {
    return (
      <View>
        <ScrollView>
          {this.state.photos.map((p, i) => {
            const contact = this.getRandomContact();
            return (
              <Card style={styles.card} elevation={8} key={i}>
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
                    icon="favorite-border"
                    color={"#46acb2"}
                    size={20}
                    onPress={() => console.log("Pressed")}
                  />
                  <IconButton
                    icon="favorite"
                    color={"#46acb2"}
                    size={20}
                    onPress={() => console.log("Pressed")}
                  />
                </Card.Actions>
              </Card>
            );
          })}
        </ScrollView>
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
