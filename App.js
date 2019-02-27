import React from "react";
import { StyleSheet, View, StatusBar } from "react-native";
import { DefaultTheme, Provider as PaperProvider } from "react-native-paper";
import { Appbar, BottomNavigation, Text } from "react-native-paper";
import FeedScreen from "./src/screens/FeedScreen";
import CameraScreen from "./src/screens/CameraScreen";

export default class App extends React.Component {
  state = {
    index: 0,
    routes: [
      { key: "feed", title: "Feed", icon: "rss-feed" },
      { key: "camera", title: "Camera", icon: "camera-alt" }
    ],
    theme: {
      ...DefaultTheme,
      roundness: 2,
      colors: {
        ...DefaultTheme.colors,
        primary: "#46acb2",
        accent: "#f1c40f"
      }
    }
  };

  _handleIndexChange = index => this.setState({ index });

  _renderScene = BottomNavigation.SceneMap({
    feed: FeedScreen,
    camera: CameraScreen
  });

  render() {
    return (
      <PaperProvider theme={this.state.theme}>
        <StatusBar barStyle="light-content" />
        <Appbar.Header dark={true}>
          <Appbar.Content
            dark={true}
            title="Witstagram"
            subtitle="A react native tech demo"
          />
        </Appbar.Header>
        <BottomNavigation
          activeColor="#fff"
          inactiveColor="#ccc"
          navigationState={this.state}
          onIndexChange={this._handleIndexChange}
          renderScene={this._renderScene}
        />
      </PaperProvider>
    );
  }
}
