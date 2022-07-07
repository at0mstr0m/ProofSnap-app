import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

export default function PreconfiguredKeyboardAwareScrollView({
  children,
  style,
}) {
  // https://github.com/APSL/react-native-keyboard-aware-scroll-view
  return (
    <KeyboardAwareScrollView
      showsVerticalScrollIndicator={false} // https://reactnative.dev/docs/scrollview#showsverticalscrollindicator
      // disable scrolling effects on all platforms
      bounces={false} // https://reactnative.dev/docs/scrollview#bounces-ios
      overScrollMode={"never"} // https://reactnative.dev/docs/scrollview.html#overscrollmode-android
      contentContainerStyle={style}
    >
      {children}
    </KeyboardAwareScrollView>
  );
}
