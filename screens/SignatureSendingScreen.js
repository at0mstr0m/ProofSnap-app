import { useEffect, useState } from "react";
import { StyleSheet, View, Text, ActivityIndicator } from "react-native";
import COLORS from "../constants/colors";
import { createAssetAsync } from "expo-media-library";
import { generateHashes } from "../helpers/HashHelper";
import { signHashes } from "../helpers/HttpHelper";
import ImagePreview from "../components/ImagePreview";
import Title from "../components/Text/Title";

// is displayed while signature is running on the backend
export default function SignatureSendingScreen({ navigation, route }) {
  const image = route.params.image;
  const title = route.params.title;
  const [result, setResult] = useState(null);

  //handles hashing and sending data to the backend for signing
  async function sendData() {
    const asset = await createAssetAsync(image.uri);
    const { sha256Hash, sha512Hash } = await generateHashes(image.base64);
    const httpResponse = await signHashes(sha256Hash, sha512Hash);
    if (
      httpResponse?.status === 201 &&
      httpResponse.data?.message === "successfully signed"
    ) {
      setResult({
        response: httpResponse.data,
        assetUri: asset.uri,
      });
    } else setResult("failed");
  }

  // leave this screen when done sending data to backend
  useEffect(() => {
    if (result) {
      if (result === "failed") {
        navigation.reset({
          index: 1,
          routes: [
            { name: "HomeScreen" },
            {
              name: "SignatureSendingFailedScreen",
              params: {
                image: image,
                title: title,
              },
            },
          ],
        });
      } else {
        navigation.reset({
          index: 1,
          routes: [
            { name: "HomeScreen" },
            {
              name: "SignatureSendingSuccessfulScreen",
              params: {
                image: image,
                result: result,
                title: title,
              },
            },
          ],
        });
      }
    }
  }, [result]);

  // disable going anywhere until sending is done
  // https://reactnavigation.org/docs/preventing-going-back/
  useEffect(
    navigation.addListener("beforeRemove", (e) => {
      // Prevent default behavior of leaving the screen before sending is done
      if (!result) e.preventDefault();
    }),
    [navigation, result]
  );

  useEffect(() => {
    sendData();
  }, []);

  return (
    <View style={styles.container}>
      <Title text={title} />
      <ActivityIndicator
        style={styles.activityIndicator}
        size="large"
        color={COLORS.buttonText}
      />
      <ImagePreview image={image} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.backgroundYellow,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  activityIndicator: {
    marginVertical: 40,
  },
});
