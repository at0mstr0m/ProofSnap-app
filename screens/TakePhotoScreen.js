import { useEffect, useState } from "react";
import { StyleSheet, View, Text, Image, Platform } from "react-native";
import COLORS from "../constants/colors";
import { launchCameraAsync } from "expo-image-picker";
import HomeScreenButtonWhite from "../components/HomeScreenButtonWhite";
import axios from "axios";
import { createAssetAsync, requestPermissionsAsync } from "expo-media-library";
import { generateHashes } from "../helpers/HashHelper";
import { signHashes } from "../helpers/HttpHelper";

export default function TakePhotoScreen() {
  const [image, setImage] = useState(null);

  async function takeImage() {
    const newImage = await launchCameraAsync({
      allowsEditing: false,
      base64: true,
      // quality: 0.01,
      // quality: 0.99,
    });
    // width and height are confused on iOS, so they have to be switched
    if (Platform.OS === "ios") {
      let height = newImage.height;
      newImage.height = newImage.width;
      newImage.width = height;
    }
    setImage(newImage);
  }

  async function onSendButtonPressed() {
    const permissionResponse = await requestPermissionsAsync();
    if (!permissionResponse.granted) {
      console.error("permission not granted");
      return;
    }
    const asset = await createAssetAsync(image.uri);
    console.log(image.base64.length);
    const { sha256Hash, sha512Hash } = await generateHashes(image.base64);
    const httpResponse = await signHashes(sha256Hash, sha512Hash);
    console.log(httpResponse);
  }

  // directly open camera when screen is called
  useEffect(() => {
    takeImage();
  }, []);

  if (image === null || image.cancelled === true) {
    return (
      <View style={styles.container}>
        <Text>TakePhotoScreen</Text>
      </View>
    );
  }

  return (
    <View style={[styles.container]}>
      <Image
        style={styles.image}
        source={{
          uri: image.uri,
          width: image.height * 0.1,
          height: image.width * 0.1,
        }}
      />
      <HomeScreenButtonWhite iconName="send" onPress={onSendButtonPressed}>
        Signatur erstellen
      </HomeScreenButtonWhite>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.background,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    marginBottom: 50,
  },
});
