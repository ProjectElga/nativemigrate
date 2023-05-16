import React, {
  Component,
  useRef,
  useState,
  useCallback,
  useMemo,
} from "react";
import { BottomSheet } from "react-native-elements";
import {
  Image,
  StyleSheet,
  Platform,
  View,
  TouchableOpacity,
  Text,
  Animated,
  TouchableWithoutFeedback,
} from "react-native";

import COLORS from "../../../../themes/colors";
import { RFValue } from "react-native-responsive-fontsize";
import SCREENSIZE from "../../../../constants/ScreenSize";
import SvgUri from "expo-svg-uri";
import SVGS from "../../../../constants/SvgUri";
import ActionButton from "../../profile/button/actionButton";
import NextButton from "../nextButton";
import { navigationRef } from "../../../../../App";
const InternetBottomSheet = (props) => {
  const [activeTab, setActiveTab] = useState("");
  const [showModal, setShowModal] = useState(false);

  // const { route, navigation } = props;
  // const { onPress } = route.params;
  const tabs = [
    {
      key: "Projects",
      activeIcon: SVGS.GREEN_MAIL,
      inactiveIcon: SVGS.MAIL,
      label: "",
      barColor: COLORS.monoWhite900,
      pressColor: COLORS.monoWhite900,
      PageUrl: "Projects",
    },

    {
      key: "Discover",
      activeIcon: SVGS.GREEN_SEARCH,
      inactiveIcon: SVGS.SEARCH,
      label: "",
      barColor: COLORS.monoWhite900,
      pressColor: COLORS.monoWhite900,
      PageUrl: "Discover",
    },
    {
      key: "ActionButton",
    },
    {
      key: "Opportunities",
      activeIcon: SVGS.GREEN_BRIEFCASE,
      inactiveIcon: SVGS.BRIEFCASE,
      label: "",
      barColor: COLORS.monoWhite900,
      pressColor: COLORS.monoWhite900,
      PageUrl: "Opportunity",
    },
    {
      key: "Saved",
      activeIcon: SVGS.GREEN_SAVED,
      inactiveIcon: SVGS.SAVED,
      label: "",
      barColor: COLORS.monoWhite900,
      pressColor: COLORS.monoWhite900,
      PageUrl: "Saved",
    },
  ];

  // const handlePresentModalPress = useCallback(() => {
  //   bottomSheetModalRef.current?.present();
  // }, []);
  // const handleDismissModalPress = useCallback(() => {
  //   bottomSheetModalRef.current?.dismiss();
  // }, []);

  // const handleSheetChanges = useCallback((index) => {
  //   console.log("handleSheetChanges", index);
  // }, []);
  // const snap = Platform.OS == "ios" ? "34%" : "36%";
  // const snapPoints = useMemo(() => [snap, snap], []);
  const renderBottomSheet = () => {
    return (
      <BottomSheet isVisible={true} safe>
        <View style={Styles.sheetWrapper}>
          <Text style={Styles.title}>Whoops!</Text>
          <Text style={Styles.description}>No Internet connection found</Text>
          <Text style={Styles.description}>
            Check your connection or try again
          </Text>
          <View style={Styles.actionBtnContainer}>
            <NextButton
              disabled={false}
              opacity={1}
              title="Try Again"
            //   onPress={() => {
            //     navigationRef.navigate("Discover");
            //   }}
            />
          </View>
        </View>
      </BottomSheet>
    );
  };

  return <View style={Styles.wrapper}>{renderBottomSheet()}</View>;
};
const Styles = StyleSheet.create({
  wrapper: {
    height: SCREENSIZE.BottomNavBarViewPort,
    width: "100%",
    backgroundColor: COLORS.monoWhite900,
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    paddingTop: RFValue(12, 844),
  },
  sheetWrapper: {
    backgroundColor: COLORS.monoWhite900,
    padding: RFValue(24, 844),
    alignItems: "flex-start",
    height: RFValue(230, 844),
    borderTopEndRadius: RFValue(20, 844),
    borderTopStartRadius: RFValue(20, 844),
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: RFValue(20, 844),
    color: COLORS.monoBlack700,
    marginBottom: RFValue(20, 844),
  },
  description: {
    fontFamily: "Poppins_400Regular",
    fontSize: RFValue(14, 844),
    color: COLORS.monoBlack700,
  },
  actionBtnContainer: {
    marginTop: RFValue(20, 844),
  },
});
export default InternetBottomSheet;
