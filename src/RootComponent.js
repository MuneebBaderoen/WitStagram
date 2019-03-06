import React from "react";
import { StyleSheet, View, Text, StatusBar } from "react-native";
import { DefaultTheme, Provider as PaperProvider } from "react-native-paper";
import { Appbar, BottomNavigation } from "react-native-paper";

// import FeedScreen from "./feed/FeedScreen";
const FeedScreen = () => <Text>I am a feed screen</Text>;
// import CameraScreen from "./camera/CameraScreen";
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

export class RootComponent extends React.Component {
  // -----------------NAVIGATION STATE AND COMPONENTS -------------------
  state = {
    // ------------- EDIT BEGIN ------------------

    index: 0,

    // ------------- EDIT END------------------
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
    return null;
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
    return null;
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

  // -------------------------- MAIN CONTENT -----------------------------
  renderHelloWorld() {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="dark-content" />
        <Text>Lets build an app!</Text>
      </View>
    );
  }

  renderPaperComponents() {
    return (
      <PaperProvider theme={theme}>
        <StatusBar barStyle="light-content" />
        {this.renderHeader()}
        {this.renderNavigation()}
      </PaperProvider>
    );
  }
  // -------------------------- MAIN CONTENT -----------------------------

  render() {
    return this.renderHelloWorld();
    // return this.renderPaperComponents();
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
});
