import React from "react";
import { ScrollView, View, Text } from "react-native";
import {
  SimpleListComponent,
  ScrollingListComponent,
  FlatListComponent
} from "./components/FeedList";
import { DataService } from "../services/DataService";

export default class FeedScreen extends React.Component {
  state = {
    isListRefreshingTop: false,
    isListRefreshingBottom: true,
    numItems: 5,
    photos: [],
    contacts: [],
    facts: []
  };

  componentDidMount = async () => {
    const contacts = await DataService.getContacts(this.state.numItems);
    const facts = await DataService.fetchFacts(this.state.numItems);
    const { photos, photosEndCursor } = await DataService.getPhotos(
      this.state.numItems
    );
    this.setState({
      isListRefreshingBottom: false,
      facts,
      contacts,
      photos,
      photosEndCursor
    });
  };

  toggleLike = index => {
    this.setState({
      photos: this.state.photos.map((item, i) => {
        if (i === index) {
          item.liked = !item.liked;
        }
        return item;
      })
    });
  };

  handleDoubleTap = index => {
    const now = Date.now();
    const DOUBLE_PRESS_THRESHOLD = 300;

    if (this.lastTap) {
      // This is not the first tap
      const isWithinThreshold = now - this.lastTap < DOUBLE_PRESS_THRESHOLD;
      const isSameIndex = this.lastTapIndex === index;

      if (isWithinThreshold && isSameIndex) {
        // This is a valid double tap
        return this.toggleLike(index);
      }
    }

    this.lastTap = now;
    this.lastTapIndex = index;
  };

  handleRefreshTop = async () => {
    if (!this.state.isListRefreshingTop) {
      this.setState({
        isListRefreshingTop: true
      });
      const { photos, photosEndCursor } = await DataService.getPhotos(
        this.state.numItems
      );
      this.setState({
        photos,
        photosEndCursor,
        isListRefreshingTop: false
      });
    }
  };

  handleRefreshBottom = async () => {
    if (!this.state.isListRefreshingBottom) {
      this.setState({
        isListRefreshingBottom: true
      });
      const { photos, photosEndCursor } = await DataService.getPhotos(
        this.state.numItems,
        this.state.photosEndCursor
      );
      this.setState({
        photos: this.state.photos.concat(photos),
        photosEndCursor,
        isListRefreshingBottom: false
      });
    }
  };

  renderSimpleList() {
    return (
      <SimpleListComponent
        photos={this.state.photos}
        contacts={this.state.contacts}
        facts={this.state.facts}
        onDoubleTap={this.handleDoubleTap}
        onLike={this.toggleLike}
      />
    );
  }

  renderScrollingList() {
    return (
      <ScrollingListComponent
        photos={this.state.photos}
        contacts={this.state.contacts}
        facts={this.state.facts}
        onDoubleTap={this.handleDoubleTap}
        onLike={this.toggleLike}
      />
    );
  }

  renderFlatList = () => {
    return (
      <FlatListComponent
        photos={this.state.photos}
        contacts={this.state.contacts}
        facts={this.state.facts}
        isListRefreshingTop={this.state.isListRefreshingTop}
        isListRefreshingBottom={this.state.isListRefreshingBottom}
        onRefreshTop={this.handleRefreshTop}
        onRefreshBottom={this.handleRefreshBottom}
        onDoubleTap={this.handleDoubleTap}
        onLike={this.toggleLike}
      />
    );
  };

  renderDebugState = () => {
    return (
      <ScrollView>
        <Text>New and improved Feed Screen</Text>
        <Text>{JSON.stringify(this.state, null, 2)}</Text>
      </ScrollView>
    );
  };

  render() {
    return this.renderDebugState();
    // return this.renderSimpleList();
    // return this.renderScrollingList();
    // return this.renderFlatList();
  }
}
