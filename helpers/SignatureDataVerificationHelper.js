const QR_DATA_LENGTH = 591;
export const KEY_LENGTH = 264;
export const MIN_TIMESTAMP_LENGTH = 10;
export const MAX_TIMESTAMP_LENGTH = 18;
// every key must be a hexadecimal number of certain length
const KEY_MATCHER = new RegExp(`[0-9a-f]{${KEY_LENGTH}}`);
const TIMESTAMP_MATCHER = new RegExp(`[0-9\.]{${MIN_TIMESTAMP_LENGTH},${MAX_TIMESTAMP_LENGTH}}`);

export function isPossibleKey(key) {
  return KEY_MATCHER.test(key);
}

export function isPossibleTimestamp(timestamp) {
  return (
    TIMESTAMP_MATCHER.test("" + timestamp) && // converted to string using  '"" +'
    new Date(timestamp).getTime() > 0 // timestamp must at least be somehow valid https://stackoverflow.com/a/12423012/13128152
  );
}

export function verifySignatureData(data) {
  if (data.length !== QR_DATA_LENGTH) return { result: false };
  let unpackedData;
  try {
    unpackedData = JSON.parse(data);
  } catch (error) {
    console.error(error);
    return { result: false };
  }
  const publicKey = unpackedData?.public_key;
  const signature = unpackedData?.signature;
  const timestamp = unpackedData?.timestamp;
  if (!publicKey || !signature || !timestamp) return { result: false };
  if (
    isPossibleKey(publicKey) &&
    isPossibleKey(signature) &&
    isPossibleTimestamp(timestamp)
  )
    return {
      result: true,
      scannedPublicKey: publicKey,
      scannedSignature: signature,
      scannedTimestamp: timestamp,
    };
  else return { result: false };
}
