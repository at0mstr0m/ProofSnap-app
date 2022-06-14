import { useEffect, useState } from "react";
import { StyleSheet, View, Text, Alert } from "react-native";
import COLORS from "../constants/colors";
import { createAssetAsync } from "expo-media-library";
import { generateHashes } from "../helpers/HashHelper";
import { signHashes, verifyHashes } from "../helpers/HttpHelper";

export default function SendingScreen({ navigation, route }) {
  const image = route.params.image;
  const method = route.params.method;
  const [sendingIsDone, setSendingIsDone] = useState(false);

  async function sendData() {
    const asset = await createAssetAsync(image.uri);
    console.log(image.base64.length);
    const { sha256Hash, sha512Hash } = await generateHashes(image.base64);
    let httpResponse;
    if (method === "sign")
      httpResponse = await signHashes(sha256Hash, sha512Hash);
    else if (method === "verify")
      httpResponse = await verifyHashes(sha256Hash, sha512Hash);
    console.log(httpResponse);
    setSendingIsDone(true);
  }

  function setNavigationTitle() {
    let title;
    if (method === "sign") title = "Erstelle Signatur...";
    else if (method === "verify") title = "Überprüfe Signatur...";
    // https://reactnavigation.org/docs/5.x/navigation-prop/#setoptions
    navigation.setOptions({
      title: title,
    });
  }

  // leave this screen when done sending data to backend
  useEffect(() => {
    if (sendingIsDone) {
      navigation.reset({
        index: 1,
        routes: [{ name: "HomeScreen" }, { name: "SendingSuccessfulScreen" }],
      });
    }
  }, [sendingIsDone]);

  // disable going anywhere until sending is done
  // https://reactnavigation.org/docs/preventing-going-back/
  useEffect(
    () =>
      navigation.addListener("beforeRemove", (e) => {
        // Prevent default behavior of leaving the screen before sending is done
        if (!sendingIsDone) e.preventDefault();
      }),
    [navigation, sendingIsDone]
  );

  useEffect(() => {
    setNavigationTitle();
    sendData();
  }, []);

  return (
    <View style={styles.container}>
      <Text>SendingScreen</Text>
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
});
