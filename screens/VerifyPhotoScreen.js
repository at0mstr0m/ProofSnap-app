import { useEffect, useState } from "react";
import { StyleSheet, View, Text, Button, Image, Platform } from "react-native";
import COLORS from "../constants/colors";
import { launchImageLibraryAsync, MediaTypeOptions } from "expo-image-picker";
import * as RNHash from "react-native-hash";

export default function VerifyPhotoScreen({ params }) {
  const [image, setImage] = useState(null);

  async function selectImage() {
    const newImage = await launchImageLibraryAsync({
      mediaTypes: MediaTypeOptions.Images,
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

  async function checkSignature() {
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
  }

  if (image === null || image.cancelled === true) {
    return (
      <View style={styles.container}>
        <Text>VerifyPhotoScreen</Text>
        <Button title="Pick" onPress={selectImage} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={{
          uri: image.uri,
          width: image.height * 0.1,
          height: image.width * 0.1,
        }}
      />
      <Button title="Check" onPress={checkSignature} />
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
    // marginBottom: 50,
  },
});
