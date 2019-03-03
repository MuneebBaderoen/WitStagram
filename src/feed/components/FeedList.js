import React from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  FlatList,
  ActivityIndicator
} from "react-native";
import { getClampedListItem } from "../../services/DataService";
import { FeedListItem } from "./FeedListItem";

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
