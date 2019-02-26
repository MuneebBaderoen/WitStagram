import React from "react";
import {
  View,
  StyleSheet,
  CameraRoll,
  ActivityIndicator,
  Animated
} from "react-native";
import { IconButton, Snackbar, withTheme } from "react-native-paper";

import { Camera, Permissions } from "expo";

class CameraScreen extends React.Component {
  state = {
    isSavingPhoto: false,
    hasCameraPermission: null,
    type: Camera.Constants.Type.back
  };

  constructor(props) {
    super(props);
    this.feedbackOpacity = new Animated.Value(0);
  }

  componentDidMount = async () => {
    const { status: cameraStatus } = await Permissions.askAsync(
      Permissions.CAMERA
    );
    this.setState({
      hasCameraPermission: cameraStatus === "granted"
    });
  };

  handleFlip = () => {
    console.log("flip camera front/back");
    return;
    this.setState({
      type:
        this.state.type === Camera.Constants.Type.back
          ? Camera.Constants.Type.front
          : Camera.Constants.Type.back
    });
  };

  handleTakePhoto = () => {
    console.log("Taking a photo");
    return;
    // Create flash animation on screen for image feedback
    const ANIMATION_TOTAL_DURATION = 100;
    const animation = Animated.sequence([
      Animated.timing(this.feedbackOpacity, {
        toValue: 1,
        duration: ANIMATION_TOTAL_DURATION / 2,
        useNativeDriver: true
      }),
      Animated.timing(this.feedbackOpacity, {
        toValue: 0,
        duration: ANIMATION_TOTAL_DURATION / 2,
        useNativeDriver: true
      })
    ]).start(() => {
      // Take photo only after the animation is complete
      // Makes the UI feel snappy, even though it's all an illusion
      const photoPromise = this.camera.takePictureAsync();
      // Show snackbar only after we've got the temporary file
      // with the photo contents
      this.setState({
        snackbarVisible: true
      });
      // Copy photo out of app sandbox after feedback is provided
      photoPromise.then(tempPhoto =>
        CameraRoll.saveToCameraRoll(tempPhoto.uri)
      );
    });
  };

  renderFlipButton = () => {
    return null;
    return (
      <IconButton
        style={styles.floatingButton}
        icon="switch-camera"
        color={"#fff"}
        size={50}
        onPress={this.handleFlip}
      />
    );
  };

  renderCameraButton = () => {
    return null;
    return (
      <IconButton
        style={styles.floatingButton}
        icon="camera"
        color={"#fff"}
        size={50}
        onPress={this.handleTakePhoto}
      />
    );
  };

  renderFeedbackSnackbar = () => {
    return null;
    const { colors } = this.props.theme;
    return (
      <Snackbar
        style={{
          backgroundColor: colors.primary,
          borderRadius: 4
        }}
        duration={3000}
        visible={this.state.snackbarVisible}
        onDismiss={() => this.setState({ snackbarVisible: false })}
      >
        Nice photo! Refresh your feed to see it :)
      </Snackbar>
    );
  };

  render() {
    const feedbackOpacity = this.feedbackOpacity.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 0.8]
    });
    return (
      <View style={styles.flexContainer}>
        <Camera
          key={this.state.hasCameraPermission}
          style={styles.flexContainer}
          type={this.state.type}
          ref={ref => {
            this.camera = ref;
          }}
        >
          <View style={styles.cameraView}>
            <Animated.View
              style={{
                ...styles.flashFeedback,
                opacity: feedbackOpacity
              }}
            />
            {this.renderFlipButton()}
            {this.renderCameraButton()}
          </View>
        </Camera>
        {this.renderFeedbackSnackbar()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  flexContainer: {
    flex: 1
  },
  flashFeedback: {
    backgroundColor: "#fff",
    opacity: 0,
    height: "100%",
    width: "100%",
    position: "absolute",
    padding: "50%"
  },
  cameraView: {
    flex: 1,
    backgroundColor: "transparent",
    flexDirection: "row",
    justifyContent: "center"
  },
  floatingButton: {
    // ------------- EDIT BEGIN ------------------
    // alignSelf: "flex-end",
    // height: 100,
    // width: 100,
    // ------------- EDIT END ------------------
  }
});

export default withTheme(CameraScreen);
