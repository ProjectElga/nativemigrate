import React, {
  Component,
  useRef,
  useState,
  useCallback,
  useMemo,
  useEffect,
} from "react";
import { BottomSheet, Icon } from "react-native-elements";
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
import { useNavigation, useRoute } from "@react-navigation/native";
import { connect, useSelector } from "react-redux";
import { getUserDiscoverTypes } from "../../../../reducers/discover/getUser";
import { createCollab } from "../../../../reducers/actionButton/collab";
import * as Analytics from "expo-firebase-analytics";
import AsyncStorage from "@react-native-async-storage/async-storage";
import STORAGE_KEY from "../../../../constants/StorageKeys";
import { circleTypes } from "../../../../reducers/projects/circle";
import { LinearGradient } from "expo-linear-gradient";
import IMAGES from "../../../../themes/Images";
const MoodBoardBottomNavBar = (props) => {
  const [showModal, setShowModal] = useState(false);
  const navigation = useNavigation();
  const route = useRoute();

  const commingSoonText = () => {
    return (
      <View style={Styles.comingSoonLayout}>
        <Text style={Styles.comingSoonText}>Coming Soon</Text>
      </View>
    );
  };
  const renderBottomSheet = () => {
    return (
      <TouchableWithoutFeedback
        onPress={() => {
          setShowModal(false);
        }}
      >
        <BottomSheet isVisible={showModal}>
          <View style={Styles.sheetWrapper}>
            <View
              style={{
                borderWidth: 2,
                width: RFValue(40, 844),
                alignSelf: "center",
                borderColor: COLORS.monoBlack700,
                borderRadius: RFValue(24, 844),
              }}
            ></View>
            <TouchableOpacity
            // onPress={() => {
            //   handleActionButtonNavigation("OppurtunityPage");
            // }}
            >
              <View style={[Styles.disableSheet]}>
                <View style={[Styles.sheetTab]}>
                  <View
                    style={[
                      Styles.iconContainer,
                      { backgroundColor: COLORS.yellow },
                    ]}
                  >
                    <Image
                      source={IMAGES.WhiteMoodBoard}
                      style={Styles.navIcon}
                      resizeMode="contain"
                    />
                  </View>
                  <Text style={Styles.sheetText}>Create Moodboard</Text>
                </View>
                {commingSoonText()}
              </View>
            </TouchableOpacity>
            <TouchableOpacity>
              <View style={[Styles.disableSheet]}>
                <View style={[Styles.sheetTab]}>
                  <View
                    style={[
                      Styles.iconContainer,
                      { backgroundColor: COLORS.teritiaryPurple },
                    ]}
                  >
                    <SvgUri
                      svgXmlData={SVGS.WHITE_LINK}
                      width={RFValue(24, 844)}
                      height={RFValue(24, 844)}
                    />
                  </View>
                  <Text style={Styles.sheetText}>Post a Feed</Text>
                </View>
                {commingSoonText()}
              </View>
            </TouchableOpacity>
            <TouchableOpacity
            // onPress={() => {
            //   handleActionButtonNavigation("OppurtunityPage");
            // }}
            >
              <View style={[Styles.disableSheet]}>
                <View style={[Styles.sheetTab]}>
                  <View
                    style={[
                      Styles.iconContainer,
                      { backgroundColor: COLORS.teritiaryWarning },
                    ]}
                  >
                    <SvgUri
                      svgXmlData={SVGS.WHITE_BRIEFCASE}
                      width={RFValue(24, 844)}
                      height={RFValue(24, 844)}
                    />
                  </View>
                  <Text style={Styles.sheetText}>Add Media</Text>
                </View>
                {commingSoonText()}
              </View>
            </TouchableOpacity>

            <TouchableOpacity
            // onPress={() => {
            //   handleActionButtonNavigation("FolioPage");
            // }}
            >
              <View style={[Styles.disableSheet]}>
                <View style={Styles.sheetTab}>
                  <View
                    style={[
                      Styles.iconContainer,
                      { backgroundColor: COLORS.primaryTeal400 },
                    ]}
                  >
                    <SvgUri
                      svgXmlData={SVGS.WHITE_OPEN_FOLDER}
                      width={RFValue(24, 844)}
                      height={RFValue(24, 844)}
                    />
                  </View>
                  <Text style={Styles.sheetText}>Add Attachment</Text>
                </View>
                {commingSoonText()}
              </View>
            </TouchableOpacity>
          </View>
        </BottomSheet>
      </TouchableWithoutFeedback>
    );
  };

  return (
    <View style={Styles.wrapper}>
      <View style={{ marginBottom: RFValue(32, 844) }}>
        <TouchableWithoutFeedback
          onPress={() => {
            setShowModal(true);
          }}
        >
          <View style={Styles.button}>
            <Icon
              name="plus"
              type="ant-design"
              size={20}
              color={COLORS.monoWhite900}
            />
          </View>
        </TouchableWithoutFeedback>
      </View>
      {renderBottomSheet()}
    </View>
  );
};
const Styles = StyleSheet.create({
  wrapper: {
    // height: SCREENSIZE.BottomNavBarViewPort,
    width: "100%",
    backgroundColor: "transparent",
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    paddingTop: RFValue(16, 844),
    position: "absolute",
    bottom: RFValue(6, 844),
  },
  navIcon: {
    width: RFValue(24, 844),
    height: RFValue(24, 844),
  },
  button: {
    marginTop: RFValue(10, 844),
    backgroundColor: COLORS.monoBlack900,
    width: RFValue(60, 844),
    height: RFValue(60, 844),
    borderRadius: RFValue(20, 844),
    alignItems: "center",
    justifyContent: "center",
    shadowColor: COLORS.monoBlack900,
    shadowOpacity: 0,
    shadowRadius: 400,
    elevation: 10,
  },
  sheetWrapper: {
    backgroundColor: COLORS.monoWhite900,
    padding: RFValue(24, 844),
    paddingTop: RFValue(16, 844),
    alignItems: "flex-start",
    borderTopLeftRadius: RFValue(24, 844),
    borderTopRightRadius: RFValue(24, 844),
  },
  disableSheet: {
    flexDirection: "row",
    alignItems: "center",
    display: "flex",
    justifyContent: "space-between",
    opacity: 0.5,
    width: "100%",
  },
  sheetTab: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: RFValue(28, 844),
  },
  comingSoonLayout: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: RFValue(28, 844),
    borderColor: COLORS.monoBlack700,
    paddingVertical: RFValue(5, 844),
    paddingHorizontal: RFValue(15, 844),
    borderWidth: 1,
    borderRadius: 100,
  },
  comingSoonText: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: RFValue(10, 844),
    color: COLORS.monoBlack700,
  },
  sheetText: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: RFValue(16, 844),
    color: COLORS.monoBlack700,
    marginLeft: RFValue(24, 844),
  },
  icon: {
    width: RFValue(24, 844),
    height: RFValue(24, 844),
    resizeMode: "contain",
    marginBottom: RFValue(12, 844),
  },
  inactiveText: {
    color: COLORS.monoBlack700,
    fontSize: RFValue(10, 844),
    fontFamily: "Poppins_500Medium",
    marginTop: RFValue(2, 844),
  },
  activeText: {
    color: COLORS.primaryTeal500,
    fontSize: RFValue(10, 844),
    fontFamily: "Poppins_500Medium",
    marginTop: RFValue(2, 844),
  },
  iconContainer: {
    width: RFValue(48, 844),
    height: RFValue(48, 844),
    borderRadius: RFValue(30, 844),

    alignItems: "center",
    justifyContent: "center",
  },
});

export default MoodBoardBottomNavBar;
