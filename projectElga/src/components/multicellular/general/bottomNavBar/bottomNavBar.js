import React, {
  Component,
  useRef,
  useState,
  useCallback,
  useMemo,
  useEffect,
} from "react";
import { BottomSheet } from "react-native-elements";
import Icon from "react-native-vector-icons/Ionicons";
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
import { projectTypes } from "../../../../reducers/projects/projects";
import ENUM from "../../../../constants/Enum";
import IMAGES from "../../../../themes/Images";
const BottomNavBar = (props) => {
  const [activeTab, setActiveTab] = useState("");
  const [showModal, setShowModal] = useState(false);
  const navigation = useNavigation();
  const route = useRoute();
  // const { route, navigation } = props;
  // const { onPress } = route.params;
  const circle = useSelector((state) => state.circle);
  const { circleDataPending = [] } = circle;
  useEffect(() => {
    callApis();
  }, [route]);
  const callApis = async () => {
    const userId = await AsyncStorage.getItem(STORAGE_KEY.USER_ID);
    const tokenDetail = await AsyncStorage.getItem(STORAGE_KEY.ACCESS_TOKEN);
    let requestParam = {
      id: userId,
      listType: "PENDING",
    };

    if (route?.name !== "Circle") {
      props.getCircleApi(requestParam, tokenDetail);
    }
    if (route?.name == "Circle") {
      props.callprojectApi(userId, tokenDetail, ENUM.ONGOING, undefined);
    }
  };
  const tabs = [
    {
      key: "Messages",
      activeIcon: IMAGES.Envelope,
      inactiveIcon: IMAGES.EnvelopeOutline,
      label: "",
      barColor: COLORS.monoWhite900,
      pressColor: COLORS.monoWhite900,
      PageUrl: "Projects",
    },
    {
      key: "Explore",
      activeIcon: IMAGES.Explore,
      inactiveIcon: IMAGES.ExploreOutline,
      label: "",
      barColor: COLORS.monoWhite900,
      pressColor: COLORS.monoWhite900,
      PageUrl: "Explore",
    },
    {
      key: "ActionButton",
    },
    {
      key: "Circle",
      activeIcon: IMAGES.CircleIcon,
      inactiveIcon: IMAGES.CircleOutline,
      label: "",
      barColor: COLORS.monoWhite900,
      pressColor: COLORS.monoWhite900,
      PageUrl: "Circle",
    },
    {
      key: "Network",
      activeIcon: IMAGES.NetworkNav,
      inactiveIcon: IMAGES.NetworkOutline,
      label: "",
      barColor: COLORS.monoWhite900,
      pressColor: COLORS.monoWhite900,
      PageUrl: "Discover",
    },
  ];

  const profile = useSelector((state) => state.profile);
  const { profileData } = profile;
  const { isCreator } = profileData;

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
  const handleActionButtonNavigation = (page, param) => {
    props.resetRecordOffset();
    setShowModal(false);

    navigation.navigate(page, param);
  };
  const handleNavBar = async (page, param) => {
    const userId = await AsyncStorage.getItem(STORAGE_KEY.USER_ID);
    //props.resetRecordOffset();
    setActiveTab(page);
    setShowModal(false);
    const eventName = `navigation_${page}`;

    Analytics.logEvent(eventName, {
      contentType: page,
      userId: userId,
      displayName: profileData?.displayName,
      isCreator: profileData?.isCreator,
    });

    navigation.navigate(page, param);
  };
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
              onPress={() => {
                props.resetCollab();
                // handleActionButtonNavigation("CollabPage");
                handleActionButtonNavigation("AddParticipants");
              }}
            >
              <View style={Styles.sheetTab}>
                <View
                  style={[
                    Styles.iconContainer,
                    { backgroundColor: COLORS.primaryTeal400 },
                  ]}
                >
                  <SvgUri
                    svgXmlData={SVGS.CHEVRON_UP_DOWN}
                    width={RFValue(24, 844)}
                    height={RFValue(24, 844)}
                  />
                </View>
                <Text
                  style={[Styles.sheetText, { color: COLORS.monoBlack700 }]}
                >
                  Start Group Chat
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                handleActionButtonNavigation("LinkPreview");
              }}
            >
              <View>
                <View style={[Styles.sheetTab]}>
                  <View
                    style={[
                      Styles.iconContainer,
                      { backgroundColor: COLORS.primaryPeach400 },
                    ]}
                  >
                    <SvgUri
                      svgXmlData={SVGS.WHITE_LINK}
                      width={RFValue(24, 844)}
                      height={RFValue(24, 844)}
                    />
                  </View>
                  <Text style={Styles.sheetText}>Post on Feed</Text>
                </View>
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
                      { backgroundColor: COLORS.teritiaryPurple },
                    ]}
                  >
                    <SvgUri
                      svgXmlData={SVGS.WHITE_OPEN_FOLDER}
                      width={RFValue(24, 844)}
                      height={RFValue(24, 844)}
                    />
                  </View>
                  <Text style={Styles.sheetText}>Create Folio</Text>
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
      {tabs.map((index, key) => {
        return (
          <View>
            {index.key == "ActionButton" ? (
              <View style={{ marginBottom: RFValue(32, 844) }}>
                <ActionButton
                  onPress={() => {
                    setShowModal(true);
                  }}
                />
              </View>
            ) : (
              <TouchableOpacity
                onPress={() => {
                  handleNavBar(index.PageUrl);
                }}
              >
                <View>
                  {index.key == "Projects" && props.activeTab != index.key ? (
                    <View
                      style={{
                        width: RFValue(8, 844),
                        height: RFValue(8, 844),
                        borderRadius: 12,
                        backgroundColor: COLORS.primaryTeal400,
                        position: "absolute",
                        top: 0,
                        right: 10,
                        zIndex: 5,
                      }}
                    ></View>
                  ) : null}
                  {index.key == "Circle" &&
                  circleDataPending &&
                  circleDataPending?.length > 0 ? (
                    <View
                      style={{
                        width: RFValue(8, 844),
                        height: RFValue(8, 844),
                        borderRadius: 12,
                        backgroundColor: COLORS.primaryTeal400,
                        position: "absolute",
                        top: 0,
                        right: 10,
                        zIndex: 5,
                      }}
                    ></View>
                  ) : null}

                  <View
                    style={{
                      width: 50,
                      alignItems: "center",
                      height: RFValue(42, 844),
                      justifyContent: "center",
                      marginBottom:
                        props.activeTab == index.key
                          ? RFValue(20, 844)
                          : RFValue(16, 844),
                    }}
                  >
                    <Image
                      source={
                        props.activeTab == index.key
                          ? index?.activeIcon
                          : index?.inactiveIcon
                      }
                      style={Styles.navIconBar}
                      resizeMode="contain"
                    />
                    <Text
                      style={
                        props.activeTab == index.key
                          ? Styles.activeText
                          : Styles.inactiveText
                      }
                    >
                      {index.key}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            )}
          </View>
        );
      })}
      {renderBottomSheet()}
    </View>
  );
};
const Styles = StyleSheet.create({
  wrapper: {
    height: SCREENSIZE.BottomNavBarViewPort,
    width: "100%",
    backgroundColor: COLORS.monoWhite900,
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    paddingTop: RFValue(16, 844),
  },
  navIcon: {
    width: RFValue(24, 844),
    height: RFValue(24, 844),
  },
  navIconBar: {
    width: RFValue(28, 844),
    height: RFValue(28, 844),
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
    color: COLORS.monoBlack900,
    fontSize: RFValue(10, 844),
    fontFamily: "Poppins_500Medium",
    marginTop: RFValue(2, 844),
  },
  inactiveTextNet: {
    color: COLORS.monoBlack700,
    fontSize: RFValue(10, 844),
    fontFamily: "Poppins_500Medium",
    marginTop: RFValue(-4, 844),
  },
  activeTextNet: {
    color: COLORS.primaryTeal500,
    fontSize: RFValue(10, 844),
    fontFamily: "Poppins_500Medium",
    marginTop: RFValue(-4, 844),
  },
  iconContainer: {
    width: RFValue(48, 844),
    height: RFValue(48, 844),
    borderRadius: RFValue(30, 844),

    alignItems: "center",
    justifyContent: "center",
  },
});
const mapStateToProps = (state) => {
  const { circle, profile } = state;
  return { circle, profile };
};

const mapDispatchToProps = (dispatch) => {
  return {
    resetRecordOffset: () => {
      dispatch({
        type: getUserDiscoverTypes.RESET_OFF_SET_VALUE,
      });
    },
    resetCollab: () => {
      dispatch({
        type: createCollab.RESET_COLLAB,
      });
    },
    getCircleApi: (requestParam, tokenDetail) => {
      dispatch({
        type: circleTypes.GET_CIRCLE_DATA,
        requestParam,
        tokenDetail,
      });
    },
    callprojectApi: (userId, tokenDetail, listType, name) => {
      dispatch({
        type: projectTypes.GET_PROJECT_LIST,
        userId,
        tokenDetail,
        listType,
        name,
      });
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(BottomNavBar);
