import React from "react";
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  CameraRoll
} from "react-native";
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
      <View style={{ flex: 1 }}>
        <Camera
          style={{ flex: 1 }}
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
  cameraView: {
    flex: 1,
    backgroundColor: "transparent",
    flexDirection: "row",
    justifyContent: "center"
  },
  // flipButton: {
  //   flex: 0.1,
  //   alignSelf: "flex-end",
  //   alignItems: "center",
  //   padding: 10
  // },
  photoButton: {
    alignSelf: "flex-end",
    height: 100,
    width: 100
  },
  flipButton: {
    alignSelf: "flex-end",
    height: 100,
    width: 100
  },
  flipText: {
    fontSize: 18,
    marginBottom: 10,
    color: "white"
  },
  cardTitle: {
    flex: 1,
    flexDirection: "row"
  },
  cardAvatar: {
    marginRight: 10,
    marginBottom: 10
  }
});
