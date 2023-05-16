import SvgUri from "expo-svg-uri";
import React, { useEffect, useState } from "react";
import * as WebBrowser from "expo-web-browser";
import moment from "moment";
import { LinearGradient } from "expo-linear-gradient";
import {
  Image,
  Text,
  View,
  StyleSheet,
  ImageBackground,
  TouchableWithoutFeedback,
  Modal,
  TouchableOpacity,
  Platform,
} from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import AsyncStorage from "@react-native-async-storage/async-storage";
import STORAGE_KEY from "../../../../constants/StorageKeys";
import SVGS from "../../../../constants/SvgUri";
import COLORS from "../../../../themes/colors";
import { linksTypes } from "../../../../reducers/profile/addLinks";
import { connect, useSelector } from "react-redux";
import decodeToken from "../../../../utils/decodeToken";
import PushNotification from "../../notification";

//const fetch = require("node-fetch");
function LinkCard(props) {
  const [showModal, setShowModal] = useState(false);
  const [activeId, setActiveId] = useState("");
  const [result, setResult] = useState(null);
  const { data, isSelfView, isHideTopBar, isPreviewLink } = props;
  const addLinks = useSelector((state) => state.addLinks);
  const thirdPartyProfile = useSelector((state) => state.thirdPartyProfile);
  const profile = useSelector((state) => state.profile);
  const { gtcData = {}, gtcSuccessFull } = addLinks;
  const { tppProfileData: { expoToken = [] } = {} } = thirdPartyProfile;
  const { profileData = {} } = profile;
  const { userMeta = {} } = data;
  const {
    displayName = "",
    subCategoryNames = [],
    profileImageUrl = "",
    distance,
  } = userMeta;
  const handleSplitText = (text) => {
    if (text?.length > 40) {
      return text.substring(0, 40) + "...";
    } else {
      return text;
    }
  };
  const handleSplitTextTitle = (text) => {
    if (text?.length > 60) {
      return text.substring(0, 60) + "...";
    } else {
      return text;
    }
  };
  const handleDeleteLinks = () => {
    setShowModal(false);
    props.unlinkPress();
  };
  useEffect(() => {
    if (gtcSuccessFull && activeId === data?.id) {
      if (!gtcData?.isVisited) {
        expoToken?.map((item) => {
          const token = decodeToken(item);
          PushNotification(
            token,
            "Link View",
            `${profileData?.displayName} has visited ${data?.title}`
          );
        });
      }
      props.getLinksCounterResetReducer();
    }
  }, [gtcSuccessFull]);

  const handleLinksPress = async () => {
    if (props.isCreator) {
      setActiveId(data?.id);
      const userId = await AsyncStorage.getItem(STORAGE_KEY.USER_ID);
      const tokenDetail = await AsyncStorage.getItem(STORAGE_KEY.ACCESS_TOKEN);
      props.getLinksCounterApi(userId, tokenDetail, data?.id);
    }
    let result = await WebBrowser.openBrowserAsync(data?.contentUrl);
    setResult(result);
  };
  const renderModal = () => {
    return (
      <Modal visible={showModal} transparent={true} animationType="fade">
        <TouchableWithoutFeedback
          onPress={() => {
            setShowModal(false);
          }}
        >
          <View
            style={{
              width: "100%",
              height: "100%",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "rgba(0, 0, 0, 0.5)",
            }}
          >
            <TouchableWithoutFeedback onPress={handleDeleteLinks}>
              <View
                style={{
                  width: RFValue(248, 844),
                  height: RFValue(64, 844),
                  backgroundColor: COLORS.monoWhite900,
                  borderRadius: RFValue(16, 844),
                  alignItems: "center",
                  flexDirection: "row",
                  paddingHorizontal: RFValue(20, 844),
                }}
              >
                <SvgUri
                  svgXmlData={SVGS.RED_DUSTBIN}
                  width={RFValue(24, 844)}
                  height={RFValue(24, 844)}
                />
                <Text
                  style={{
                    marginLeft: RFValue(12, 844),
                    color: COLORS.teritiaryWarning,
                    fontSize: RFValue(14, 844),
                    fontFamily: "Poppins_500Medium",
                  }}
                >
                  Delete Link
                </Text>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    );
  };
  const handleLongPress = () => {
    setShowModal(true);
  };
  const returnDate = (date) => {
    var dt = '';
    if (!moment().tz("Asia/kolkata").isSame(date, "year")) {
      dt = moment(date)
        .tz("Asia/kolkata")
        .format("Do MMMM, YYYY");
    } else {
      dt = moment(date).tz("Asia/kolkata").format("Do MMMM");
    }
    return dt;
  }
  return (
    <TouchableOpacity
      onPress={handleLinksPress}
      onLongPress={isSelfView ? handleLongPress : null}
    >
      <View
        style={
          isHideTopBar
            ? [
                Styles.wrapper,
                {
                  marginTop: 0,
                  shadowColor: "#555555",
                  shadowOpacity: Platform.OS == "ios" ? 0.5 : 0.5,
                  elevation: Platform.OS == "ios" ? 3 : 1,
                  shadowOffset: {
                    width: 0,
                    height: 2,
                  },
                },
              ]
            : Styles.wrapper
        }
      >
        {showModal && renderModal()}
        {isHideTopBar ? null : (
          <View style={Styles.viewedWrapper}>
            <SvgUri
              svgXmlData={SVGS.EYE}
              width={RFValue(20, 844)}
              height={RFValue(15, 844)}
            />
            <Text style={Styles.viewedText}>
              {data?.views} People viewed this
            </Text>
          </View>
        )}
        {isHideTopBar ? null : <View style={Styles.divider}></View>}
        <View style={Styles.picDetailWrapper}>
          {isPreviewLink ? (
            <Image
              source={{ uri: profileData?.profileImageUrl }}
              style={Styles.profileImage}
            />
          ) : (
            <Image
              source={{ uri: profileImageUrl }}
              style={Styles.profileImage}
            />
          )}
          {isPreviewLink ? (
            <View style={Styles.detailWrapper}>
              <Text style={Styles.title}>
                {data?.author}
              </Text>
            </View>
          ) : (
            <View style={Styles.detailWrapper}>
              <Text style={Styles.title}>
                {data?.author}
              </Text>
              <View style={Styles.metaDataContainer}>
                <Text style={Styles.displayName}>{returnDate(data?.addedOn)}</Text>
                <Image
                  source={{ uri: data?.favIcon }}
                  style={Styles.smFavIcon}
                />
              </View>
            </View>
          )}
        </View>
        <Text style={Styles.description}>
          {handleSplitText(data?.customDescription || data?.description)}
        </Text>

        <ImageBackground
          imageStyle={{
            //resizeMode: "contain",
            borderBottomRightRadius: RFValue(16, 844),
            borderBottomLeftRadius: RFValue(16, 844),
          }}
          source={{ uri: data?.imageUrl }}
          style={{
            width: "100%",
            height: undefined,
            aspectRatio: 16 / 9,
            marginTop: RFValue(12, 844),
            justifyContent: "flex-end",
          }}
        >
          <LinearGradient
            style={{
              borderBottomLeftRadius: RFValue(16, 844),
              borderBottomRightRadius: RFValue(16, 844),
            }}
            colors={[
              "rgba(0,0,0,0.6)",
              "rgba(0,0,0,0.5)",
              "rgba(0,0,0,0.4)",
              "rgba(0,0,0,0.3)",
              "rgba(0,0,0,0.1)",

              "rgba(0,0,0,0.01)",
            ]}
            start={{ x: 0, y: 1 }}
            end={{ x: 0, y: 0 }}
          >
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <Text
                style={{
                  color: COLORS.monoWhite900,
                  fontSize: RFValue(16, 844),
                  fontFamily: "Poppins_500Medium",
                  marginHorizontal: RFValue(16, 844),
                  width: "70%",
                }}
              >
                {handleSplitTextTitle(data?.title)}
              </Text>
              <View style={{ paddingRight: RFValue(12, 844) }}>
                <SvgUri
                  svgXmlData={SVGS.SHARE_LINK_WHITE}
                  width={RFValue(20, 844)}
                  height={RFValue(20, 844)}
                />
              </View>
            </View>
            <Text
              style={{
                color: COLORS.monoWhite900,
                fontSize: RFValue(14, 844),
                fontFamily: "Poppins_400Regular",
                marginHorizontal: RFValue(16, 844),
                marginBottom: RFValue(16, 844),
              }}
            >
              {handleSplitText(data?.description)}
            </Text>
          </LinearGradient>
        </ImageBackground>

        {/* //   <View
      //     style={{
      //       width: "100%",
      //       marginTop: RFValue(12, 844),
      //       flexDirection: "row",
      //       paddingHorizontal: RFValue(12, 844),
      //       paddingVertical: RFValue(14, 844),
      //       backgroundColor: 'rgba(0,0,0,0.8)',
      //       borderBottomRightRadius: RFValue(16, 844),
      //       borderBottomLeftRadius: RFValue(16, 844),
      //     }}
      //   >
      //     <View
      //       style={{
      //         backgroundColor: COLORS.teritiaryPurple,
      //         borderRadius: RFValue(12, 844),
      //         width: RFValue(80, 844),
      //         height: RFValue(80, 844),
      //         alignItems: "center",
      //         justifyContent: "center",
      //       }}
      //     >
      //       <SvgUri
      //         svgXmlData={SVGS.WHITE_LINK}
      //         width={RFValue(20, 844)}
      //         height={RFValue(20, 844)}
      //       />
      //     </View>
      //     <View
      //       style={{
      //         width: "75%",
      //         marginLeft: RFValue(16, 844),
      //         justifyContent: "space-between",
      //       }}
      //     >
      //       <Text
      //         style={{
      //           color: COLORS.monoWhite900,
      //           fontSize: RFValue(14, 844),
      //           fontFamily: "Poppins_500Medium",

      //           flexShrink: 1,
      //         }}
      //       >
      //         Lorem ipsum dolor sit amet, consectetur adipiscing.
      //       </Text>
      //       <Text
      //         style={{
      //           color: COLORS.monoWhite900,
      //           fontSize: RFValue(12, 844),
      //           fontFamily: "Poppins_400Regular",
      //         }}
      //       >
      //         Lorem ipsum dolor sit amet, consectetur adipiscing.
      //       </Text>
      //     </View>
      //   </View>
      // )}*/}
      </View>
    </TouchableOpacity>
  );
}

const Styles = StyleSheet.create({
  wrapper: {
    paddingTop: RFValue(16, 844),
    backgroundColor: COLORS.monoWhite900,
    borderRadius: RFValue(16, 844),
    marginTop: RFValue(16, 844),
  },
  viewedWrapper: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: RFValue(16, 844),
  },
  viewedText: {
    fontSize: RFValue(14, 844),
    fontFamily: "Poppins_400Regular",
    color: COLORS.monoBlack700,
    marginLeft: 8,
  },
  divider: {
    marginTop: RFValue(16, 944),
    borderWidth: 1,
    borderColor: COLORS.monoGhost500,
    width: "100%",
    paddingHorizontal: RFValue(16, 844),
  },
  picDetailWrapper: {
    marginTop: RFValue(16, 844),
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: RFValue(16, 844),
  },
  profileImage: {
    width: RFValue(48, 844),
    height: RFValue(48, 844),
    borderRadius: 200,
    resizeMode: "contain",
  },
  smFavIcon: {
    width: RFValue(16, 844),
    height: RFValue(16, 844),
    resizeMode: "contain",
    marginLeft: RFValue(2, 844),
    marginTop: RFValue(-2, 844),
  },
  metaDataContainer: {
    flexDirection: "row",
    alignItems: "center",
    display:"flex",
    justifyContent:"flex-start"
  },
  detailWrapper: {
    marginLeft: RFValue(12, 844),
    justifyContent: "space-around",
  },
  title: {
    fontSize: RFValue(16, 844),
    fontFamily: "Poppins_500Medium",
    color: COLORS.monoBlack900,
    width: "100%",
  },
  displayName: {
    fontSize: RFValue(14, 844),
    fontFamily: "Poppins_400Regular",
    color: COLORS.monoBlack500,
  },
  description: {
    paddingHorizontal: RFValue(16, 844),
    fontSize: RFValue(14, 844),
    fontFamily: "Poppins_400Regular",
    color: COLORS.monoBlack700,
    marginTop: RFValue(12, 844),
  },
  imageDetailWrapper: {
    width: "100%",
    padding: 8,
    backgroundColor: COLORS.monoGhost500,
    marginTop: 8,
    borderRadius: RFValue(12, 844),
  },

  detailText: {
    fontSize: RFValue(14, 844),
    fontFamily: "Poppins_500Medium",
    color: COLORS.monoBlack900,
  },
});

const mapStateToProps = (state) => {
  const { addLinks } = state;
  return { addLinks };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getLinksCounterApi: (userId, tokenDetail, id) => {
      dispatch({ type: linksTypes.GET_LINKS_COUNT, userId, tokenDetail, id });
    },

    getLinksCounterResetReducer: () => {
      dispatch({ type: linksTypes.GET_LINKS_COUNT_RESET });
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(LinkCard);
