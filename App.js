import React from "react";
import { StyleSheet, View, StatusBar, YellowBox } from "react-native";
import { DefaultTheme, Provider as PaperProvider } from "react-native-paper";
import { Appbar, BottomNavigation, Text } from "react-native-paper";

YellowBox.ignoreWarnings(["Remote debugger"]);

// import FeedScreen from "./src/screens/FeedScreen";
const FeedScreen = () => <Text>I am a feed screen</Text>;
// import CameraScreen from "./src/screens/CameraScreen";
const CameraScreen = () => <Text>A camera screen, am I</Text>;

const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: "#46acb2",
    accent: "#f1c40f"
  }
};

export default class App extends React.Component {
  // -----------------NAVIGATION STATE AND COMPONENTS -------------------
  state = {
    index: 0,
    routes: [
      { key: "feed", title: "Feed", icon: "rss-feed" },
      { key: "camera", title: "Camera", icon: "camera-alt" }
    ]
  };

  _handleIndexChange = index => this.setState({ index });

  _renderScene = BottomNavigation.SceneMap({
    feed: FeedScreen,
    camera: CameraScreen
  });

  renderNavigation() {
    // return null;
    return (
      <BottomNavigation
        activeColor="#fff"
        inactiveColor="#ccc"
        navigationState={this.state}
        onIndexChange={this._handleIndexChange}
        renderScene={this._renderScene}
      />
    );
  }
  // -----------------NAVIGATION STATE AND COMPONENTS --------------------

  // ----------------------APP HEADER COMPONENTS -------------------------
  renderHeader() {
    // return null;
    return (
      <Appbar.Header dark={true}>
        <Appbar.Content
          dark={true}
          title="Witstagram"
          subtitle="A react native tech demo"
        />
      </Appbar.Header>
    );
  }
  // ----------------------APP HEADER COMPONENTS -------------------------

  render() {
    return (
      <View style={styles.container}>
        <Text>Lets build an app!</Text>
      </View>
    );
    return (
      <PaperProvider theme={theme}>
        <StatusBar barStyle="light-content" />
        {this.renderHeader()}
        {this.renderNavigation()}
      </PaperProvider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center"
  }
});
