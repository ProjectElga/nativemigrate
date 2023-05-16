import React, { useEffect } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  SafeAreaView,
  ScrollView,
  ImageBackground,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Icon from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { RFValue } from "react-native-responsive-fontsize";
import SvgUri from "expo-svg-uri";
import { LinearGradient } from "expo-linear-gradient";
import SVGS from "../../../constants/SvgUri";
import STORAGE_KEY from "../../../constants/StorageKeys";
import COLORS from "../../../themes/colors";
import { connect } from "react-redux";
import { profilePercentageTypes } from "../../../reducers/profile/profilePercentage";
import { convertToPercentage } from "../../../utils/ConvertPercentage";
import { exploreData } from "../../../config/ExploreConfig";

function ProfileProgress(props) {
  const navigate = useNavigation();
  const profile = useSelector((state) => state.profile);
  const { profileData } = profile;
  const { isCreator } = profileData;
  const profilePercentageReducer = useSelector(
    (state) => state.profilePercentage
  );
  const {
    profilePercentageData: {
      profilePercentage = 0,
      socialInsights,
      coverImageUrl,
      genres,
      bio,
      links,
      profileImageUrl,
    } = {},
  } = profilePercentageReducer;
  const handleNavigationToEdit = () => {
    navigate.navigate("EditPage");
  };
  const handleNavigationToSocials = () => {
    navigate.navigate(isCreator ? "Profile" : "BrandSelfView", {
      activeTab: "Socials",
    });
  };
  const handleNavigationToLinks = () => {
    navigate.navigate("LinkPreview");
  };
  callApi = async () => {
    const userId = await AsyncStorage.getItem(STORAGE_KEY.USER_ID);
    const tokenDetail = await AsyncStorage.getItem(STORAGE_KEY.USER_ID);
    props.callUserPercentageApi(userId, tokenDetail);
  };
  useEffect(() => {
    callApi();
  }, []);
 
  const renderList = () => {
    return (
      <ScrollView style={Styles.listWrapper}>
        <View style={Styles.listinnerWrapper}>
          <View>
            <Text style={Styles.listTitle}>Get the basics in</Text>
          </View>
          <View style={Styles.listBoxWrapper}>
            <TouchableOpacity
              onPress={profileImageUrl ? null : handleNavigationToEdit}
            >
              <View style={Styles.listBox}>
                <View>
                  <Text style={Styles.listText}>Update Profile Image</Text>
                </View>
                <SvgUri
                  width={profileImageUrl ? 20 : 10}
                  height={profileImageUrl ? 20 : 10}
                  svgXmlData={
                    profileImageUrl ? SVGS.SUCCESS_TICK : SVGS.CHEVRON_RIGHT
                  }
                  zindex
                />
              </View>
            </TouchableOpacity>

            <View style={Styles.separatorContainer}>
              <View style={Styles.borderList} />
            </View>
            <TouchableOpacity
              onPress={coverImageUrl ? null : handleNavigationToEdit}
            >
              <View style={[Styles.listBox]}>
                <View>
                  <Text style={Styles.listText}>Update Cover Image</Text>
                </View>
                <SvgUri
                  width={coverImageUrl ? 20 : 10}
                  height={coverImageUrl ? 20 : 10}
                  svgXmlData={
                    coverImageUrl ? SVGS.SUCCESS_TICK : SVGS.CHEVRON_RIGHT
                  }
                  zindex
                />
              </View>
            </TouchableOpacity>

            <View style={Styles.separatorContainer}>
              <View style={Styles.borderList} />
            </View>
            <TouchableOpacity onPress={bio ? null : handleNavigationToEdit}>
              <View style={Styles.listBox}>
                <View>
                  <Text style={Styles.listText}>Add a personalised Bio</Text>
                </View>
                <SvgUri
                  width={bio ? 20 : 10}
                  height={bio ? 20 : 10}
                  svgXmlData={bio ? SVGS.SUCCESS_TICK : SVGS.CHEVRON_RIGHT}
                  zindex
                />
              </View>
            </TouchableOpacity>

            <View style={Styles.separatorContainer}>
              <View style={Styles.borderList} />
            </View>
            <TouchableOpacity onPress={genres ? null : handleNavigationToEdit}>
              <View style={[Styles.listBox]}>
                <View>
                  <Text style={Styles.listText}>Add Tags</Text>
                </View>
                <SvgUri
                  width={genres ? 20 : 10}
                  height={genres ? 20 : 10}
                  svgXmlData={genres ? SVGS.SUCCESS_TICK : SVGS.CHEVRON_RIGHT}
                  zindex
                />
              </View>
            </TouchableOpacity>
          </View>
        </View>
        <View style={[Styles.listinnerWrapper, { marginBottom: 50 }]}>
          <View>
            <Text style={Styles.listTitle}>Enhance Your Profile</Text>
          </View>
          <View style={Styles.listBoxWrapper}>
            {isCreator && (
              <TouchableOpacity
                onPress={socialInsights ? null : handleNavigationToSocials}
              >
                <View style={[Styles.listBox]}>
                  <View>
                    <Text style={Styles.listText}>Link your Socials</Text>
                  </View>
                  <SvgUri
                    width={socialInsights ? 20 : 10}
                    height={socialInsights ? 20 : 10}
                    svgXmlData={
                      socialInsights ? SVGS.SUCCESS_TICK : SVGS.CHEVRON_RIGHT
                    }
                    zindex
                  />
                </View>
              </TouchableOpacity>
            )}
            <View style={Styles.separatorContainer}>
              <View style={Styles.borderList} />
            </View>
            <TouchableOpacity onPress={links ? null : handleNavigationToLinks}>
              <View style={Styles.listBox}>
                <View>
                  <Text style={Styles.listText}>Post Links</Text>
                </View>
                <SvgUri
                  width={links ? 20 : 10}
                  height={links ? 20 : 10}
                  svgXmlData={links ? SVGS.SUCCESS_TICK : SVGS.CHEVRON_RIGHT}
                  zindex
                />
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    );
  };
  const renderHeader = () => {
    return (
      <View style={Styles.progressbarContainer}>
        <ImageBackground
          style={[Styles.mediaKitInner]}
          source={{ uri: exploreData?.mediaKit?.bannerImage }}
          resizeMode="cover"
        >
          <View style={Styles.backbuttonContainer}>
            <TouchableOpacity
              onPress={() => {
                navigate.goBack();
              }}
              style={Styles.pageTitleContainer}
            >
              <Icon
                name="chevron-back-outline"
                size={20}
                color={COLORS.monoWhite900}
              />
              <View>
                <Text style={Styles.pageTitle}>Complete Your Profile</Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={Styles.smallCardMediaKitInner}>
            <Text style={Styles.smallCardMediaKitNumber}>
              {convertToPercentage(profilePercentage)}%
            </Text>
            <Text style={Styles.smallCardMediaKitsmallText}>there</Text>
            <Text style={Styles.smallCardMediaKitSubTitle}>
              {exploreData?.mediaKit?.subTitle}
            </Text>
            <View style={Styles.previewButtonContainer}>
              <TouchableOpacity
                style={Styles.previewButton}
                onPress={() => navigate.navigate("Profile")}
              >
                <Text style={Styles.previewButtonText}>Preview</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ImageBackground>
      </View>
    );
  };
  return (
    <SafeAreaView style={Styles.viewPort}>
      <View>
        <>{renderHeader()}</>
        <>{renderList()}</>
      </View>
    </SafeAreaView>
  );
}
const mapStateToProps = (state) => {
  const { profilePercentage } = state;
  return { profilePercentage };
};

const mapDispatchToProps = (dispatch) => {
  return {
    callUserPercentageApi: (id, tokenDetail) => {
      dispatch({
        type: profilePercentageTypes.FETCH_PROFILE_PERCENTAGE,
        id,
        tokenDetail,
      });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileProgress);
const Styles = StyleSheet.create({
  container: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    marginTop: RFValue(20, 844),
    width: "100%",
  },
  borderList: {
    height: 0.5,
    width: "98%",
    backgroundColor: "#E2E2E2",
    opacity: 0.6,
    marginVertical: RFValue(24, 844),
  },
  backbuttonContainer: {
    position: "absolute",
    top: RFValue(60, 844),
    left: RFValue(18, 844),
  },
  separatorContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    width: "100%",
  },
  listinnerWrapper: {
    marginBottom: RFValue(20, 844),
  },
  listBox: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    width: "100%",
  },
  listText: {
    fontFamily: "Poppins_500Medium",
    color: COLORS.monoBlack700,
    fontSize: RFValue(14, 844),
  },
  viewPort: {
    backgroundColor: COLORS.monoWhite900,
    height: "100%",
  },
  listWrapper: {
    paddingTop: RFValue(20, 844),
    paddingHorizontal: RFValue(20, 844),
    paddingBottom: RFValue(100, 844),
    height: "60%",
  },
  listTitle: {
    fontFamily: "Poppins_700Bold",
    color: COLORS.monoBlack900,
    fontSize: RFValue(16, 844),
    paddingHorizontal: RFValue(24, 844),
  },
  listBoxWrapper: {
    paddingVertical: RFValue(24, 844),
    paddingHorizontal: RFValue(24, 844),

    backgroundColor: COLORS.monoGhost500,
    borderRadius: RFValue(24, 844),
    marginTop: RFValue(16, 844),
  },
  pageTitle: {
    fontFamily: "Poppins_700Bold",
    color: COLORS.monoWhite900,
    fontSize: RFValue(22, 844),
    textAlign: "center",
  },
  pagesubTitle: {
    fontFamily: "Poppins_500Medium",
    color: COLORS.monoWhite900,
    fontSize: RFValue(16, 844),
    textAlign: "center",
  },
  progressPercentage: {
    fontFamily: "Poppins_600SemiBold",
    color: COLORS.monoWhite900,
    fontSize: RFValue(28, 844),
    textAlign: "center",
  },
  progressPercentageContainer: {
    width: RFValue(100, 844),
    height: RFValue(100, 844),
    borderRadius: RFValue(50, 844),
    // display: "flex",
    // flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: COLORS.monoWhite900,
    marginTop: RFValue(30, 844),
  },
  progressbarContainer: {
    height: "38%",
    width: "100%",
    backgroundColor: COLORS.monoChromeBlack,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  mediaKitInner: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-end",
    alignItems: "flex-start",
    overflow: "hidden",
    width: "100%",
  },
  smallCardMediaKitTitle: {
    color: COLORS.monoWhite900,
    fontFamily: "Poppins_500Medium",
    fontSize: RFValue(16, 844),
  },
  smallCardSubTitle: {
    color: COLORS.monoWhite900,
    fontFamily: "Poppins_500Medium",
    fontSize: RFValue(12, 844),
  },
  smallCardMediaKitSubTitle: {
    color: COLORS.monoWhite900,
    fontFamily: "Poppins_500Medium",
    fontSize: RFValue(12, 844),
    marginTop: RFValue(20, 844),
  },
  smallCardMediaKitInner: {
    width: "50%",
    paddingHorizontal: RFValue(20, 844),
  },
  smallCardMediaKitsmallText: {
    color: COLORS.monoWhite900,
    fontFamily: "Poppins_400Regular",
    fontSize: RFValue(14, 844),
    lineHeight: RFValue(16, 844),
    marginTop: RFValue(-6, 844),
  },
  previewButtonContainer: {
    marginVertical: RFValue(20, 844),
  },
  previewButton: {
    borderRadius: 1000,
    width: RFValue(120, 844),
    height: RFValue(36, 844),
    borderColor: COLORS.monoWhite900,
    borderWidth: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  previewButtonText: {
    color: COLORS.monoWhite900,
    fontFamily: "Poppins_600SemiBold",
    fontSize: RFValue(14, 844),
  },
  smallCardMediaKitNumber: {
    color: COLORS.monoWhite900,
    fontFamily: "Poppins_500Medium",
    fontSize: RFValue(48, 844),
    lineHeight: RFValue(60, 844),
  },
  pageTitleContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  pageTitle: {
    color: COLORS.monoWhite900,
    fontFamily: "Poppins_700Bold",
    fontSize: RFValue(20, 844),
    lineHeight: RFValue(24, 844),
    marginLeft: RFValue(4, 844),
  },
});
