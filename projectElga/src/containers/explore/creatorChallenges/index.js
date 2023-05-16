import React, { useEffect } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  SafeAreaView,
  ScrollView,
  ImageBackground,
  Image,
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
import IMAGES from "../../../themes/Images";

function CreatorChallenges(props) {
  const navigate = useNavigation();
  const profile = useSelector((state) => state.profile);
  const { profileData } = profile;
  const { isCreator } = profileData;
  
  const handleNavigationToLinks = () => {
    navigate.navigate("LinkPreview");
  };
  useEffect(() => {
    callApi();

    return () => null;
  }, []);
  callApi = async () => {
    const userId = await AsyncStorage.getItem(STORAGE_KEY.USER_ID);
    const tokenDetail = await AsyncStorage.getItem(STORAGE_KEY.USER_ID);
    props.callUserPercentageApi(userId, tokenDetail);
  };
  const renderList = () => {
    return (
      <ScrollView style={Styles.listWrapper}>
        <View style={{ paddingBottom: RFValue(150, 844) }}>
          <View>
            <Text
              style={Styles.listTitle}
            >{`Welcome to Shaer's Monthly Creator Challenges!!`}</Text>

            <Text style={Styles.text}>
              {`Each month, we invite creators to showcase their talent and Work to compete for the title of "Creator of the Month". Our competition is open to  creators of all skill levels and backgrounds, so whether you're a seasoned professional or just starting out, you're welcome to join.\n`}
            </Text>
            <Text style={Styles.listTitle}>{`How it works!!`}</Text>
            <Text style={Styles.text}>
              {`Step 1: You Post your work on our App \nStep 2: Post with the Most engagement will be rewarded with cash prizes\n`}
            </Text>
            <Text style={Styles.listTitle}>
              {`Cash Reward: `} <Text style={Styles.text}>{`₹ 2000/-\n`}</Text>
            </Text>
            <Text
              style={Styles.text}
            >{`We host other Challenges/competitions as well.\n \nTo learn about them, Stay tuned & Get all the updates on:`}</Text>
            <Text style={Styles.text}>
              <Text
                style={Styles.subtitle}
              >{`'Shaer Broadcast: Get Updates'`}</Text>
              {`\nunder the Message tab.`}
            </Text>
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
          source={{
            uri: "https://firebasestorage.googleapis.com/v0/b/elga-roma-717ed.appspot.com/o/Assets%2FCreator%20Challenge%20baner%20(1).png?alt=media&token=99382cd5-7d88-42e7-956c-165662f3c74f",
          }}
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
                <Text style={Styles.pageTitle}>Challenges</Text>
              </View>
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </View>
    );
  };
  return (
    <SafeAreaView style={Styles.viewPort}>
      <View style={Styles.viewPortInnerWrapper}>
        <>{renderHeader()}</>
        <>{renderList()}</>
        <View style={[Styles.listinnerWrapper]}>
          <View>
            <Text style={Styles.listTitle}>{`To Participate:`}</Text>
          </View>
          <View style={Styles.listBoxWrapper}>
            <TouchableOpacity onPress={handleNavigationToLinks}>
              <View style={Styles.listBox}>
                <View>
                  <Text style={Styles.subtitle}>Post your work on Feed</Text>
                </View>
                <SvgUri
                  width={10}
                  height={10}
                  svgXmlData={SVGS.CHEVRON_RIGHT}
                  zindex
                />
              </View>
            </TouchableOpacity>
          </View>
        </View>
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

export default connect(mapStateToProps, mapDispatchToProps)(CreatorChallenges);
const Styles = StyleSheet.create({
  container: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    marginTop: RFValue(20, 844),
    width: "100%",
  },
  viewPortInnerWrapper: {
    position: "relative",
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
    position: "absolute",
    bottom: 0,
    width: "90%",
    marginHorizontal: RFValue(20, 844),
    backgroundColor: COLORS.monoWhite900,
    paddingTop: RFValue(8,844)
  },
  listBox: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    width: "100%",
    flex: 1,
  },
  listText: {
    fontFamily: "Poppins_500Medium",
    color: COLORS.monoBlack700,
    fontSize: RFValue(14, 844),
  },
  text: {
    fontFamily: "Poppins_400Regular",
    color: COLORS.monoBlack700,
    fontSize: RFValue(14, 844),
  },
  subtitle: {
    fontFamily: "Poppins_500Medium",
    color: COLORS.monoBlack700,
    fontSize: RFValue(16, 844),
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
    color: COLORS.monoBlack700,
    fontSize: RFValue(16, 844),
  },
  listBoxWrapper: {
    paddingVertical: RFValue(21, 844),
    paddingHorizontal: RFValue(24, 844),

    backgroundColor: COLORS.monoGhost500,
    borderRadius: RFValue(16, 844),
    marginTop: RFValue(8, 844),
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
    marginTop: RFValue(5, 844),
    textAlign: "center",
  },
  smallCardMediaKitInnerWrapper: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: RFValue(40, 844),
  },
  smallIcon: {
    width: RFValue(32, 844),
    height: RFValue(32, 844),
  },
  smallCardMediaKitInner: {
    width: "50%",
    paddingHorizontal: RFValue(20, 844),
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
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
