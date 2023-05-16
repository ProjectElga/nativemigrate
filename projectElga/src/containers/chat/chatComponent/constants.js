import { Dimensions, Platform } from "react-native";
const fonts = {
    circularProBold: "circularProBold",
    circularProBook: "circularProBook",
    larsseitBold: "larsseitBold",
    larsseitItalic: "larsseitItalic",
    larsseitThin: "larsseitThin",
  };
const colors = {
  black: "#000",
  black20: "rgba(0, 0, 0, 0.2)",
  black30: "rgba(0, 0, 0, 0.3)",
  black40: "rgba(0, 0, 0, 0.4)",
  black50: "rgba(0, 0, 0, 0.5)",
  black70: "rgba(0, 0, 0, 0.7)",
  white: "#fff",
  white0: "rgba(255, 255, 255, 0)",
  white10: "rgba(255, 255, 255, 0.1)",

  // slack colors
  blue: "#36c5f0",
  green: "#2eb67d",
  red: "#e01e5a",
  yellow: "#ecb22e",

  blueSend: "#2e629e",
  grey: "#333233",
  greyIcon: "#616061",
  greyLine: "#c6c6c6",
  greyTime: "#868686",
  purple: "#3f0e40",
  slackBlack: "#1d1c1d",
};
const gStyle = {
  activeOpacity: 0.7,
  container: {
    backgroundColor: colors.white,
    flex: 1,
  },
  flexCenter: {
    alignItems: "center",
    justifyContent: "center",
  },
  flexRow: {
    flexDirection: "row",
  },
  flexRowCenterAlign: {
    alignItems: "center",
    flexDirection: "row",
  },
  flexRowCenter: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
  },
  flexRowSpace: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  navHeaderStyle: {
    backgroundColor: colors.black,
    borderBottomWidth: 0,
    elevation: 0,
  },

  containerNavBlocks: {
    height: 44,
    justifyContent: "center",
    overflow: "hidden",
  },

  flex1: { flex: 1 },
  flex2: { flex: 2 },
  flex3: { flex: 3 },
  flex4: { flex: 4 },
  flex5: { flex: 5 },

  textCiruBold14: { fontFamily: fonts.circularProBold, fontSize: 14 },
  textCiruBold16: { fontFamily: fonts.circularProBold, fontSize: 16 },
  textCiruBold18: { fontFamily: fonts.circularProBold, fontSize: 18 },
  textCiruBook12: { fontFamily: fonts.circularProBook, fontSize: 12 },
  textCiruBook14: { fontFamily: fonts.circularProBook, fontSize: 14 },
  textCiruBook16: { fontFamily: fonts.circularProBook, fontSize: 16 },
  textCiruBook18: { fontFamily: fonts.circularProBook, fontSize: 18 },
  textLarsBold14: { fontFamily: fonts.larsseitBold, fontSize: 14 },
  textLarsBold16: { fontFamily: fonts.larsseitBold, fontSize: 16 },
  textLarsBold18: { fontFamily: fonts.larsseitBold, fontSize: 18 },
  textLarsItalic14: { fontFamily: fonts.larsseitItalic, fontSize: 14 },
  textLarsItalic16: { fontFamily: fonts.larsseitItalic, fontSize: 16 },
  textLarsItalic18: { fontFamily: fonts.larsseitItalic, fontSize: 18 },
  textLarsThin14: { fontFamily: fonts.larsseitThin, fontSize: 14 },
  textLarsThin16: { fontFamily: fonts.larsseitThin, fontSize: 16 },
  textLarsThin18: { fontFamily: fonts.larsseitThin, fontSize: 18 },

  spacer24: { height: 24 },
  spacer48: { height: 48 },
  spacer64: { height: 64 },
  spacer88: { height: 88 },
  spacer128: { height: 128 },

  mB8: { marginBottom: 8 },
  mL8: { marginLeft: 8 },
  mL16: { marginLeft: 16 },
  mR8: { marginRight: 8 },
  mR16: { marginRight: 16 },
  mR24: { marginRight: 24 },
  mR48: { marginRight: 48 },
  mR64: { marginRight: 64 },
  mT4: { marginTop: 4 },
  mT8: { marginTop: 8 },
  mT16: { marginTop: 16 },

  mH24: { marginHorizontal: 24 },

  mV16: { marginVertical: 16 },
  mV24: { marginVertical: 24 },
  mV32: { marginVertical: 32 },

  p4: { padding: 4 },
  p8: { padding: 8 },
  p16: { padding: 16 },
  p24: { padding: 24 },

  pH4: { paddingHorizontal: 4 },
  pH8: { paddingHorizontal: 8 },
  pH16: { paddingHorizontal: 16 },
  pH24: { paddingHorizontal: 24 },
};

// android
const android = Platform.OS === "android";

const iOS = Platform.OS === "ios";
const web = Platform.OS === "web";
const windowInfo = Dimensions.get("window");
const { height, width } = windowInfo;
const aspectRatio = height / width;

// is iPad
const { isPad } = Platform;

// is iPhone with Notch?
// iPhoneX, iPhoneXs, iPhoneXr, iPhoneXs Max, iPhone 11 & 12
let iPhoneNotch = false;
if (iOS) {
  // iphone screen breakdown
  // https://blog.calebnance.com/development/iphone-ipad-pixel-sizes-guide-complete-list.html
  if (height === 812 || height === 844 || height === 896 || height === 926) {
    iPhoneNotch = true;
  }
}

const device = {
  android,
  aspectRatio,
  height,
  iOS,
  iPhoneNotch,
  isPad,
  web,
  width,
};

export { colors, device, fonts, gStyle };
