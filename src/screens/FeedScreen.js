import React from "react";
import {
  SimpleListComponent,
  ScrollingListComponent,
  FlatListComponent
} from "../components/FeedComponents";
import { DataService } from "../services/DataService";

export default class FeedScreen extends React.Component {
  state = {
    isListRefreshingTop: false,
    isListRefreshingBottom: true,
    numItems: 3,
    photos: [],
    contacts: [],
    facts: []
  };

  componentDidMount = async () => {
    const catFacts = await DataService.fetchCatFacts(this.state.numItems);
    const contacts = await DataService.getContacts(this.state.numItems);
    const { photos, photosEndCursor } = await DataService.getPhotos(
      this.state.numItems
    );
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

  onRefreshTop = async () => {
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

  onRefreshBottom = async () => {
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

  render() {
    // return this.renderSimpleList();
    // return this.renderScrollingList();
    return this.renderFlatList();
  }

  renderSimpleList() {
    return (
      <SimpleListComponent
        photos={this.state.photos}
        contacts={this.state.contacts}
        catFacts={this.state.catFacts}
      />
    );
  }

  renderScrollingList() {
    return (
      <ScrollingListComponent
        photos={this.state.photos}
        contacts={this.state.contacts}
        catFacts={this.state.catFacts}
      />
    );
  }

  renderFlatList = () => {
    return (
      <FlatListComponent
        photos={this.state.photos}
        contacts={this.state.contacts}
        catFacts={this.state.catFacts}
        isListRefreshingTop={this.state.isListRefreshingTop}
        isListRefreshingBottom={this.state.isListRefreshingBottom}
        onRefreshTop={this.onRefreshTop}
        onRefreshBottom={this.onRefreshBottom}
        onLike={this.onLike}
      />
    );
  };
}
