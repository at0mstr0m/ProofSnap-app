// https://sirv.com/help/articles/rotate-photos-to-be-upright/
export function getOrientation(orientation) {
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

export function calculateImageDimensions(screenWidth, image) {
  const width = (screenWidth * 3) / 4;
  const imageRatio = getRatio(
    image.width,
    image.height,
    getOrientation(image.exif.Orientation)
  );
  const height = width * imageRatio;
  return { imageWidth: width, imageHeight: height };
}
