import React from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  FlatList,
  ActivityIndicator
} from "react-native";
import { getClampedListItem } from "../../utilities";

// ------------- EDIT BEGIN ------------------

import { FeedListItem } from "./BasicFeedListItem";
// import { FeedListItem } from "./FeedListItem";

// ------------- EDIT END ------------------

export const SimpleListComponent = props => {
  return (
    <View>
      {props.photos.map((photo, index) => {
        const fact = getClampedListItem(props.facts, index);
        const contact = getClampedListItem(props.contacts, index);
        return (
          <FeedListItem
            key={photo.uri}
            onCardPress={props.onDoubleTap.bind(this, index)}
            onLike={props.onLike.bind(this, index)}
            contact={contact}
            fact={fact}
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
      {props.photos.map((photo, index) => {
        const fact = getClampedListItem(props.facts, index);
        const contact = getClampedListItem(props.contacts, index);
        return (
          <FeedListItem
            key={photo.uri}
            onCardPress={props.onDoubleTap.bind(this, index)}
            onLike={props.onLike.bind(this, index)}
            fact={fact}
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
      // ------------- EDIT BEGIN ------------------

      // onRefresh={props.onRefreshTop}
      // ------------- EDIT END ------------------
      keyExtractor={(item, index) => item.uri + index}
      // ------------- EDIT BEGIN ------------------

      // onEndReached={props.onRefreshBottom}
      // ------------- EDIT END ------------------
      onEndReachedThreshold={0.5}
      renderItem={listItem => {
        const index = listItem.index;
        const photo = listItem.item;
        const fact = getClampedListItem(props.facts, index);
        const contact = getClampedListItem(props.contacts, index);
        return (
          <FeedListItem
            onCardPress={props.onDoubleTap.bind(this, index)}
            onLike={props.onLike.bind(this, index)}
            fact={fact}
            contact={contact}
            photo={photo}
          />
        );
      }}
      ListFooterComponent={
        // ------------- EDIT BEGIN ------------------

        false &&
        // ------------- EDIT END ------------------
        props.isListRefreshingBottom && (
          <View style={{ flex: 1, padding: 10 }}>
            <ActivityIndicator size="large" />
          </View>
        )
      }
    />
  );
};
