import React from "react";
import { View, StyleSheet, CameraRoll } from "react-native";
import { IconButton } from "react-native-paper";

import { Camera, Permissions } from "expo";

export default class CameraScreen extends React.Component {
  state = {
    hasCameraPermission: null,
    type: Camera.Constants.Type.back
  };

  async componentDidMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === "granted" });
  }

  handleFlip = () => {
    this.setState({
      type:
        this.state.type === Camera.Constants.Type.back
          ? Camera.Constants.Type.front
          : Camera.Constants.Type.back
    });
  };

  handleTakePhoto = async () => {
    const tempPhoto = await this.camera.takePictureAsync();
    const finalUri = await CameraRoll.saveToCameraRoll(tempPhoto.uri);
  };

  render() {
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
