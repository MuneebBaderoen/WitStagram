import React from "react";
import {
  View,
  StyleSheet,
  CameraRoll,
  ActivityIndicator,
  Animated
} from "react-native";
import { IconButton } from "react-native-paper";

import { Camera, Permissions } from "expo";

export default class CameraScreen extends React.Component {
  state = {
    isSavingPhoto: false,
    hasCameraPermission: null,
    type: Camera.Constants.Type.back
  };

  constructor(props) {
    super(props);
    this.feedbackOpacity = new Animated.Value(0);
  }

  async componentDidMount() {
    const { status: cameraStatus } = await Permissions.askAsync(
      Permissions.CAMERA
    );
    this.setState({
      hasCameraPermission: cameraStatus === "granted"
    });
  }

  handleFlip = () => {
    this.setState({
      type:
        this.state.type === Camera.Constants.Type.back
          ? Camera.Constants.Type.front
          : Camera.Constants.Type.back
    });
  };

  handleTakePhoto = () => {
    // Create flash animation on screen for image feedback
    this.feedbackOpacity.setValue(0);
    const animation = Animated.sequence([
      Animated.timing(this.feedbackOpacity, {
        toValue: 1,
        duration: 50,
        useNativeDriver: true
      }),
      Animated.timing(this.feedbackOpacity, {
        toValue: 0,
        duration: 50,
        useNativeDriver: true
      })
    ]).start();

    // Take photo without returning the promise
    // Keep this function as non-blocking
    this.camera
      .takePictureAsync()
      .then(tempPhoto => CameraRoll.saveToCameraRoll(tempPhoto.uri));
  };

  render() {
    const feedbackOpacity = this.feedbackOpacity.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 0.8]
    });
    return (
      <View style={styles.flexContainer}>
        <Camera
          style={styles.flexContainer}
          type={this.state.type}
          ref={ref => {
            this.camera = ref;
          }}
        >
          <View style={styles.cameraView}>
            <Animated.View
              style={{
                ...styles.activity,
                opacity: feedbackOpacity
              }}
            />
            <View style={styles.activity}>
              {this.state.isSavingPhoto && <ActivityIndicator size="large" />}
            </View>
            <IconButton
              style={styles.flipButton}
              icon="flip"
              color={"#fff"}
              size={50}
              onPress={this.handleFlip}
            />
            <IconButton
              style={styles.photoButton}
              icon="camera"
              color={"#fff"}
              size={50}
              onPress={this.handleTakePhoto}
            />
          </View>
        </Camera>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  activity: {
    backgroundColor: "#fff",
    opacity: 0,
    height: "100%",
    width: "100%",
    position: "absolute",
    padding: "50%"
  },
  flexContainer: {
    flex: 1
  },
  cameraView: {
    flex: 1,
    backgroundColor: "transparent",
    flexDirection: "row",
    justifyContent: "center"
  },
  photoButton: {
    alignSelf: "flex-end",
    height: 100,
    width: 100
  },
  flipButton: {
    alignSelf: "flex-end",
    height: 100,
    width: 100
  }
});
