import { useEffect, useState } from "react";
import { StyleSheet, View, Text, Image, Platform } from "react-native";
import COLORS from "../constants/colors";
import { launchCameraAsync } from "expo-image-picker";
import HomeScreenButtonWhite from "../components/HomeScreenButtonWhite";
import * as RNHash from "react-native-hash";
import axios from "axios";
import {
  saveToLibraryAsync,
  createAssetAsync,
  getAssetInfoAsync,
  requestPermissionsAsync
} from "expo-media-library";

export default function TakePhotoScreen({ params }) {
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

  // https://stackoverflow.com/a/59290908
  async function getAssetInfo(uri) {
    const assetId = uri.slice(5);
    const assetInfo = await getAssetInfoAsync(assetId);
    return assetInfo;
  }

  async function onSendButtonPressed() {
    const response = await requestPermissionsAsync();
    if (!response.granted) {
      console.error("permission not granted");
      return;
    }
    if (Platform.OS === "ios") {
      console.log([
        image.cancelled,
        image.height,
        image.type,
        image.uri,
        image.file,
        image.width,
        // image.base64,
      ]);
      try {
        console.log("bump");
        const asset = await createAssetAsync(image.uri);
        // // console.log(asset);
        // const assetInfo = await getAssetInfo(asset.uri);
        // // console.log("assetInfo.localUri=", assetInfo.localUri);
        // const base64StringForCreatedAsset = await base64forImageUriAsync(
        //   assetInfo.localUri
        // );
        console.log("bump");
      } catch (error) {
        console.error(error);
      }
    } else {
      try {
        await createAssetAsync(image.uri);
      } catch (error) {
        console.error(error);
      }
    }
    console.log(image.base64.length);
    let sha256Hash;
    let sha512Hash;
    try {
      sha256Hash = await RNHash.JSHash(
        image.base64,
        RNHash.CONSTANTS.HashAlgorithms.sha256
      );
      sha512Hash = await RNHash.JSHash(
        image.base64,
        RNHash.CONSTANTS.HashAlgorithms.sha512
      );
      console.log(sha256Hash);
      console.log(sha512Hash);
    } catch (error) {
      console.error("error");
    }
    const payload = new FormData();
    payload.append("user_id", "yxc321yxc");
    payload.append("sha256Hash", sha256Hash);
    payload.append("sha512Hash", sha512Hash);
    /*
    ****** just the same POST request using the fetch API ******

    const response = await fetch("http://192.168.188.40:1337/sign", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "multipart/form-data",
      },
      body: payload,
    });
    console.log(JSON.stringify(response));
    */
    try {
      const response = await axios.post(
        "http://192.168.188.40:1337/sign",
        payload,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Accept: "application/json",
          },
        }
      );
      // console.log(response);
    } catch (error) {
      console.error(error);
    }
  }

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
