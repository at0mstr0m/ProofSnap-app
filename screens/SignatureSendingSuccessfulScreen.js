import { StyleSheet, View, Text, ScrollView } from "react-native";
import COLORS from "../constants/colors";
import ImagePreview from "../components/ImagePreview";
import SignatureData from "../components/SignatureData";

export default function SignatureSendingSuccessfulScreen({ route }) {
  const result = route.params.result;
  const image = route.params.image;
  const title = route.params.title;

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false} // disable scrolling effects on all platforms
        bounces={false} // https://reactnative.dev/docs/scrollview#bounces-ios
        overScrollMode={"never"} // https://reactnative.dev/docs/scrollview.html#overscrollmode-android
        contentContainerStyle={{
          alignItems: "center",
        }}
      >
        <Text>SendingSuccessfulScreen</Text>
        <Text>Title: {title}</Text>
        <ImagePreview image={image} />
        <SignatureData
          publicKey={result.public_key}
          signature={result.signature}
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.backgroundGreen,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
