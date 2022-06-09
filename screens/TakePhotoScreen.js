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
  requestPermissionsAsync,
} from "expo-media-library";
import * as FileSystem from "expo-file-system";

// const convertLocalIdentifierToAssetLibrary = (localIdentifier, ext) => {
//   const hash = localIdentifier.split("/")[0];
//   return `assets-library://asset/asset.${ext}?id=${hash}&ext=${ext}`;
// };

// const getAssets = async (params = { first: 11 }) => {
//   if (Platform.OS === "android" && !(await Keyboard.hasAndroidPermission())) {
//     return;
//   }

//   let result = await CameraRoll.getPhotos({ ...params, assetType: "All" });
//   result.edges.map(async (edge) => {
//     if (Platform.OS === "ios") {
//       edge.node.image.uri = convertLocalIdentifierToAssetLibrary(
//         edge.node.image.uri.replace("ph://", ""),
//         edge.node.type === "image" ? "jpg" : "mov"
//       );
//     }
//     return;
//   });
//   return result;
// };

export default function TakePhotoScreen() {
  const [image, setImage] = useState(null);

  async function takeImage() {
    const newImage = await launchCameraAsync({
      allowsEditing: false,
      base64: true,
      // quality: 0.01,

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
    if (Platform.OS === "ios") {
      console.log([
        image.cancelled,
        image.height,
        image.type,
        image.uri,
        image.file,
        image.width,
      ]);
      // https://docs.expo.dev/versions/v45.0.0/sdk/media-library/#medialibraryrequestpermissionsasyncwriteonly
      const response = await requestPermissionsAsync();
      if (response.granted) {
        try {
          const asset = await createAssetAsync(image.uri);
          console.log("assetassetassetassetasset=", asset);
          const foo = await getAssets(asset);
          console.log(foo);
          // const base64string = FileSystem.readAsStringAsync(await fetch(asset.uri), {
          //   encoding: "base64",
          // });
        } catch (error) {
          console.log("bump");
          console.error(error);
          console.log("bump");
        }
      }
    } else if (Platform.OS === "android") {
      try {
        saveToLibraryAsync(image.uri);
      } catch (error) {
        console.error(error);
      }
      console.log(image.base64.length);
    }
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
      console.log(response);
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
