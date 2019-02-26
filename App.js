import React from "react";
import { StyleSheet, View, StatusBar } from "react-native";
import { DefaultTheme, Provider as PaperProvider } from "react-native-paper";
import { Appbar, BottomNavigation, Text } from "react-native-paper";
import FeedScreen from "./src/screens/FeedScreen";
import CameraScreen from "./src/screens/CameraScreen";

const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: "#46acb2",
    accent: "#f1c40f"
  }
};
const MusicRoute = () => <Text>Music</Text>;

export default class App extends React.Component {
  state = {
    index: 0,
    routes: [
      { key: "music", title: "Camera", icon: "queue-music" },
      { key: "albums", title: "Feed", icon: "album" }
    ]
  };

  _handleIndexChange = index => this.setState({ index });

  _renderScene = BottomNavigation.SceneMap({
    music: CameraScreen,
    albums: FeedScreen
  });

  render() {
    return (
      <PaperProvider theme={theme}>
        <StatusBar style={styles.statusBar} barStyle="light-content" />
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

const styles = StyleSheet.create({
  statusBar: {
    paddingTop: 200
  },
  bottom: {
    // backgroundColor: "red"
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});
