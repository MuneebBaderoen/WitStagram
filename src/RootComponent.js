import React from "react";
import { StyleSheet, View, Text, StatusBar } from "react-native";
import { DefaultTheme, Provider as PaperProvider } from "react-native-paper";
import { Appbar, BottomNavigation } from "react-native-paper";

// import FeedScreen from "./feed/FeedScreen";
const FeedScreen = () => <Text> I am a Feed Screen </Text>;
// import CameraScreen from "./camera/CameraScreen";
const CameraScreen = () => <Text>A Camera Screen, am I</Text>;

export const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    // primary: "#00838F",
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
      { key: "feed", icon: "view-stream" },
      { key: "camera", icon: "camera-alt" }
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
        labeled={false}
        activeColor="#FFFFFF"
        inactiveColor="rgba(255,255,255,0.54)"
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
        <Appbar.Content dark={true} title="Witty360" />
      </Appbar.Header>
    );
  }
  // ----------------------APP HEADER COMPONENTS -------------------------

  // -------------------------- MAIN CONTENT -----------------------------
  renderPaperComponents() {
    return (
      <PaperProvider theme={theme}>
        <StatusBar barStyle="light-content" />
        {this.renderHeader()}
        {this.renderNavigation()}
      </PaperProvider>
    );
  }

  renderHelloWorld() {
    return (
      <View style={styles.container}>
        <Text>Lets build an app!</Text>
      </View>
    );
  }
  // -------------------------- MAIN CONTENT -----------------------------

  render() {
    return (
      <View style={styles.container}>
        <Text>Lets build an app!</Text>
      </View>
    );
    // return this.renderHelloWorld();
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
