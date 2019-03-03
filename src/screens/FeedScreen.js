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

import { ScrollingListComponent } from "../components/FeedComponents";
import { DataService } from "../services/DataService";

export default class FeedScreen extends React.Component {
  state = {
    isListRefreshingTop: false,
    isListRefreshingBottom: true,
    numItems: 25,
    photos: [],
    contacts: [],
    facts: []
  };

  componentDidMount = async () => {
    const catFacts = await DataService.fetchCatFacts(25);
    const contacts = await DataService.getContacts(25);
    const { photos, photosEndCursor } = await DataService.getPhotos(25);
    this.setState({
      isListRefreshingBottom: false,
      catFacts,
      contacts,
      photos,
      photosEndCursor
    });
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
      <ScrollingListComponent
        photos={this.state.photos}
        contacts={this.state.contacts}
        catFacts={this.state.catFacts}
      />
    );
  }
}
