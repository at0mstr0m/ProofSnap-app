import { Platform } from "react-native";

// https://sirv.com/help/articles/rotate-photos-to-be-upright/
export function getOrientation(
  orientation,
  pixelXDimension,
  pixelYDimension,
  method
) {
  // console.log("orientation", orientation);
  // Of course iOS is a special snowflake that simply ignores the EXIF
  // orientation value when loading an image from the device's image library
  // by setting orientation to 1 always...
  if (Platform.OS === "ios" && method === "verify") {
    if (pixelXDimension < pixelYDimension) {
      return "vertical";
    } else {
      return "horizontal";
    }
  }
  if (
    orientation === 6 ||
    orientation === 8 ||
    orientation === 5 ||
    orientation === 7
  ) {
    return "vertical";
  } else {
    return "horizontal";
  }
}

export function getRatio(width, height, orientation) {
  // console.log("width, height, orientation", width, height, orientation);
  if (orientation === "horizontal") {
    if (width > height) return height / width;
    if (width < height) return width / height;
  }
  if (orientation === "vertical") {
    if (width < height) return height / width;
    if (width > height) return width / height;
  }
  return 1;
}

export function calculateImageDimensions(screenWidth, image, method) {
  const width = (screenWidth * 3) / 4;
  const imageRatio = getRatio(
    image.width,
    image.height,
    getOrientation(
      image.exif.Orientation,
      image.exif.PixelXDimension,
      image.exif.PixelYDimension,
      method
    )
  );
  const height = width * imageRatio;
  return { imageWidth: width, imageHeight: height };
}
