import SvgUri from "expo-svg-uri";
import React, { useEffect, useRef, useState } from "react";
import * as WebBrowser from "expo-web-browser";
import moment from "moment";
import { LinearGradient } from "expo-linear-gradient";
import { State, TapGestureHandler } from "react-native-gesture-handler";
import {
  Image,
  Text,
  View,
  StyleSheet,
  ImageBackground,
  TouchableWithoutFeedback,
  Modal,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { RFValue } from "react-native-responsive-fontsize";
import AsyncStorage from "@react-native-async-storage/async-storage";
import STORAGE_KEY from "../../../../constants/StorageKeys";
import SVGS from "../../../../constants/SvgUri";
import COLORS from "../../../../themes/colors";
import { nFormatter } from "../../../../utils/SocialNumberFormat";
import { linksTypes } from "../../../../reducers/profile/addLinks";
import { connect, useSelector } from "react-redux";
import decodeToken from "../../../../utils/decodeToken";
import PushNotification from "../../notification";
import shadow from "../../../../constants/shadow";
import { feedActionTypes } from "../../../../reducers/explore/feedAction";
const { width, height } = Dimensions.get("window");

//const fetch = require("node-fetch");
function FeedCard(props) {
  const [lastPress, setLastPress] = useState(0);
  const [activeId, setActiveId] = useState("");
  const [result, setResult] = useState(null);
  const { data } = props;
  const navigation = useNavigation();
  const [isLiked, setIsliked] = useState(data?.liked);
  const [noOfLikes, setNoOfLikes] = useState(data?.likes);
  const addLinks = useSelector((state) => state.addLinks);
  const thirdPartyProfile = useSelector((state) => state.thirdPartyProfile);
  const profile = useSelector((state) => state.profile);
  const { gtcData = {}, gtcSuccessFull } = addLinks;
  const { tppProfileData: { expoToken = [] } = {} } = thirdPartyProfile;
  const { userMeta = {} } = data;
  const { isCreator = true, profileImageUrl = "" } = userMeta;
  // profile reducer
  const { profileData } = profile;
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
  const handleNavigateToProfile = (e) => {
    e.preventDefault();
    navigation.navigate(
      profileData?.id === userMeta?.id
        ? !isCreator
          ? "BrandSelfView"
          : "Profile"
        : !isCreator
        ? "BrandProfile"
        : "CreatorProfile",
      {
        userId: userMeta?.id,
      }
    );
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
  const handleLikeAndUnlike = async () => {
    const userId = await AsyncStorage.getItem(STORAGE_KEY.USER_ID);
    const tokenDetail = await AsyncStorage.getItem(STORAGE_KEY.ACCESS_TOKEN);
    props.callLinkActivityAPI(userId, data?.id, tokenDetail, !isLiked);
    setIsliked(!isLiked);
    setNoOfLikes(
      isLiked ? (noOfLikes === 0 ? 0 : noOfLikes - 1) : noOfLikes + 1
    );
  };
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
  const handleRedirectToDetail = () => {
    navigation.navigate("FeedDetails", {
      feedData: data,
    });
  };
  const returnDate = (date) => {
    var dt = "";
    if (!moment().tz("Asia/kolkata").isSame(date, "year")) {
      dt = moment(date).tz("Asia/kolkata").format("Do MMMM, YYYY");
    } else {
      dt = moment(date).tz("Asia/kolkata").format("Do MMMM");
    }
    return dt;
  };
  return (
    <View style={[Styles.wrapper, shadow]}>
      <TouchableOpacity onPress={handleRedirectToDetail}>
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
        <View style={Styles.divider}></View>
        <View style={Styles.picDetailWrapper}>
          <TouchableOpacity onPress={handleNavigateToProfile}>
            <Image
              source={{ uri: profileImageUrl }}
              style={Styles.profileImage}
            />
          </TouchableOpacity>
          <View style={Styles.detailWrapper}>
            <Text style={Styles.title} numberOfLines={1}>
              {data?.author}
            </Text>
            <View style={Styles.metaDataContainer}>
              <Text style={Styles.displayName}>
                {returnDate(data?.addedOn)}
              </Text>
              <Image source={{ uri: data?.favIcon }} style={Styles.smFavIcon} />
            </View>
          </View>
        </View>
        <Text style={Styles.description}>
          {handleSplitText(data?.customDescription || data?.description)}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleLinksPress}>
        <ImageBackground
          source={{ uri: data?.imageUrl }}
          style={{
            width: "100%",
            height: undefined,
            aspectRatio: 18 / 9,
            marginTop: RFValue(12, 844),
            justifyContent: "flex-end",
          }}
        >
          <LinearGradient
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
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
              }}
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
      </TouchableOpacity>
      <View style={Styles.actionNav}>
        <TouchableOpacity
          onPress={handleLikeAndUnlike}
          style={[Styles.actionNavBox]}
        >
          <SvgUri
            svgXmlData={isLiked ? SVGS.RED_HEART : SVGS.OUTLINE_HEART}
            width={RFValue(28, 844)}
            height={RFValue(28, 844)}
          />
          <Text style={Styles.actionNavText}>{`${nFormatter(noOfLikes)} ${
            noOfLikes > 1 ? "Likes" : "Like"
          }`}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleRedirectToDetail}
          style={Styles.actionNavBox}
        >
          <SvgUri
            svgXmlData={SVGS.COMMENT}
            width={RFValue(22, 844)}
            height={RFValue(22, 844)}
          />
          <Text style={Styles.actionNavText}>{`${nFormatter(
            data?.noOfComments
          )} ${data?.noOfComments > 1 ? "Comments" : "Comment"}`}</Text>
        </TouchableOpacity>
        {/* <View style={Styles.actionNavBox}>
          <SvgUri
            svgXmlData={SVGS.SHARE_FEED}
            width={RFValue(24, 844)}
            height={RFValue(24, 844)}
          />
        </View> */}
      </View>
    </View>
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
    backgroundColor: "#E8A0BF",
  },
  smFavIcon: {
    width: RFValue(16, 844),
    height: RFValue(16, 844),
    resizeMode: "contain",
    marginLeft: RFValue(6, 844),
    marginTop: RFValue(-2, 844),
  },
  metaDataContainer: {
    flexDirection: "row",
    alignItems: "center",
    display: "flex",
    justifyContent: "flex-start",
  },
  detailWrapper: {
    marginLeft: RFValue(12, 844),
    justifyContent: "space-around",
  },
  title: {
    fontSize: RFValue(16, 844),
    fontFamily: "Poppins_500Medium",
    color: COLORS.monoBlack900,
    maxWidth: RFValue(300, 844),
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
  actionNav: {
    padding: RFValue(12, 844),
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  actionNavBox: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: (width - RFValue(28, 844)) / 2,
  },
  actionNavText: {
    fontSize: RFValue(14, 844),
    fontFamily: "Poppins_500Medium",
    color: COLORS.monoBlack900,
    marginLeft: RFValue(8, 844),
    marginTop: RFValue(4, 844),
    width: RFValue(120, 844),
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
    callLinkActivityAPI: (userId, entityId, tokenDetail, isLiked) => {
      dispatch({
        type: feedActionTypes.DO_FEED_LIKE,
        userId,
        entityId,
        tokenDetail,
        isLiked,
      });
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(FeedCard);
