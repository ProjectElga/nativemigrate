import SvgUri from "expo-svg-uri";
import React, { useEffect, useRef, useState } from "react";
import * as WebBrowser from "expo-web-browser";
import moment from "moment";
import { LinearGradient } from "expo-linear-gradient";
import {
  ScrollView,
  State,
  TapGestureHandler,
} from "react-native-gesture-handler";
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
  Dimensions,
  TextInput,
  KeyboardAvoidingView,
  Linking,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { RFValue } from "react-native-responsive-fontsize";
import AsyncStorage from "@react-native-async-storage/async-storage";
import STORAGE_KEY from "../../../constants/StorageKeys";
import SVGS from "../../../constants/SvgUri";
import COLORS from "../../../themes/colors";
import { linksTypes } from "../../../reducers/profile/addLinks";
import { connect, useSelector } from "react-redux";
import decodeToken from "../../../utils/decodeToken";
import PushNotification from "../../../components/multicellular/notification";
import shadow from "../../../constants/shadow";
import ProfileLinksInfoCard from "../../../components/multicellular/profile/profileLinksInfoCard";
import CitationCard from "../../../components/multicellular/profile/citationCard/citationCard";
import TextInputWithText from "../../../components/multicellular/profile/textInput/textInput";
import { citationTypes } from "../../../reducers/profile/citations";
import CommonStyle from "../../../themes/commonStyles";
import Skeleton from "../../../components/multicellular/general/skeleton/skeleton";
import { feedActionTypes } from "../../../reducers/explore/feedAction";
import { getFeedDetailTypes } from "../../../reducers/explore/feedDetail";

//const fetch = require("node-fetch");
const { width, height } = Dimensions.get("window");
const useInitialURL = () => {
  const [url, setUrl] = useState(null);
  const [processing, setProcessing] = useState(true);

  useEffect(() => {
    const getUrlAsync = async () => {
      // Get the deep link used to open the app
      const initialUrl = await Linking.getInitialURL();

      // The setTimeout is just for testing purpose
      setTimeout(() => {
        setUrl(initialUrl);
        setProcessing(false);
      }, 1000);
    };

    getUrlAsync();
  }, []);

  return { url, processing };
};

function Details(props) {
  const [lastPress, setLastPress] = useState(0);
  const [activeId, setActiveId] = useState("");
  const [comment, setComment] = useState("");
  const [result, setResult] = useState(null);
  const { route, addCitationApi } = props;
  const { id } = route.params;
  const navigation = useNavigation();
  const [isLiked, setIsliked] = useState(false);
  const [noOfLikes, setNoOfLikes] = useState(0);
  const { url: initialUrl, processing } = useInitialURL();
  const addLinks = useSelector((state) => state.addLinks);
  const citation = useSelector((state) => state.citation);
  const feedDetail = useSelector((state) => state.feedDetail);
  const { citationData = [], loading } = citation;
  const thirdPartyProfile = useSelector((state) => state.thirdPartyProfile);
  const profile = useSelector((state) => state.profile);
  const { gtcData = {}, gtcSuccessFull } = addLinks;
  const { tppProfileData: { expoToken = [] } = {} } = thirdPartyProfile;
  const { feedData = {}, isSuccessFull } = feedDetail;
  const { userMeta = {} } = feedData;
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
  const handleSubmitComment = async () => {
    const userId = await AsyncStorage.getItem(STORAGE_KEY.USER_ID);
    const tokenDetail = await AsyncStorage.getItem(STORAGE_KEY.ACCESS_TOKEN);
    const requestParam = {
      id: userId,
      commentType: "LINK",
    };
    const requestBody = {
      comment: comment,
      entityId: feedData?.id,
    };
    props.addCitationApi(requestParam, requestBody, tokenDetail);
  };
  const callApi = async () => {
    const userId = await AsyncStorage.getItem(STORAGE_KEY.USER_ID);
    const tokenDetail = await AsyncStorage.getItem(STORAGE_KEY.ACCESS_TOKEN);
    console.log("userId>>", userId);
    console.log("tokenDetail>>", tokenDetail);
    props.getCitation(userId, tokenDetail, id, "LINK");
    console.log("route", JSON.stringify(route));
    // props.callLinksDetailsAPI(id, tokenDetail);
  };
  useEffect(() => {
    if (gtcSuccessFull && activeId === id) {
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
    callApi();
  }, [gtcSuccessFull]);
  useEffect(() => {
    if (isSuccessFull) {
      setIsliked(feedData?.liked);
      setNoOfLikes(feedData?.likes);
    }

    return () => {
      setIsliked(false);
      setNoOfLikes(0);
    };
  }, [isSuccessFull]);

  const handleLikeAndUnlike = async () => {
    const userId = await AsyncStorage.getItem(STORAGE_KEY.USER_ID);
    const tokenDetail = await AsyncStorage.getItem(STORAGE_KEY.ACCESS_TOKEN);
    props.callLinkActivityAPI(userId, id, tokenDetail, !isLiked);
    setIsliked(!isLiked);
    setNoOfLikes(
      isLiked ? (noOfLikes === 0 ? 0 : noOfLikes - 1) : noOfLikes + 1
    );
  };

  const handleLinksPress = async () => {
    if (props.isCreator) {
      setActiveId(id);
      const userId = await AsyncStorage.getItem(STORAGE_KEY.USER_ID);
      const tokenDetail = await AsyncStorage.getItem(STORAGE_KEY.ACCESS_TOKEN);
      props.getLinksCounterApi(userId, tokenDetail, id);
    }
    let result = await WebBrowser.openBrowserAsync(feedData?.contentUrl);
    setResult(result);
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
  const renderAddCommentCard = () => {
    return (
      <View style={CommonStyle.BottomView}>
        <View style={CommonStyle.bottomSubView}>
          <View style={CommonStyle.bottomotherSubView}>
            <TextInput
              textAlignVertical="center"
              value={comment}
              onChangeText={(val) => setComment(val)}
              placeholder="Type your message here"
              style={CommonStyle.msgInput}
              multiline={true}
            />
          </View>
          <TouchableOpacity
            disabled={comment == "" ? true : false}
            onPress={handleSubmitComment}
            style={CommonStyle.sendBtn}
          >
            <View style={CommonStyle.sendBtnImg}>
              <SvgUri svgXmlData={SVGS.WHITE_SEND} />
            </View>
            {/* <Image
                  source={require("../../assets/images/images/send.png")}
                  style={CommonStyle.sendBtnImg}
                /> */}
          </TouchableOpacity>
        </View>
      </View>
    );
  };
  const renderCitations = () => {
    return loading ? (
      <View style={Styles.citationWrapper}>
        <View style={Styles.skeletonCitationWrapper}>
          <View>
            <Skeleton styles={Styles.skeletonCitationImage} />
          </View>
          <View style={Styles.skeletonWrapper}>
            <Skeleton styles={[Styles.skeletonPicCard, { width: "50%" }]} />
            <Skeleton styles={[Styles.skeletonPicCard, { width: "90%" }]} />
          </View>
        </View>
      </View>
    ) : citationData && citationData.length > 0 ? (
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={Styles.citationWrapper}>
          <View>
            <Text style={Styles.commentTitle}>
              Comments({`${feedData?.noOfComments}`})
            </Text>
          </View>
          {citationData.map((value, index) => (
            <View
              key={index}
              style={
                citationData.length - 1 === index ? {} : Styles.citationBorder
              }
            >
              <CitationCard
                onPress={() => {
                  this.setState({
                    edit: true,
                    citation: value?.comment,
                    editName: value?.profile?.displayName,
                    editId: value?.id,
                  });
                }}
                disabled={false}
                data={value}
              />
            </View>
          ))}
        </View>
      </ScrollView>
    ) : null;
  };
  return (
    <View style={[Styles.wrapper, shadow]}>
      <View>
        <View style={Styles.picDetailWrapper}>
          <TouchableOpacity onPress={handleNavigateToProfile}>
            <Image
              source={{ uri: profileImageUrl }}
              style={Styles.profileImage}
            />
          </TouchableOpacity>
          <View style={Styles.detailWrapper}>
            <Text style={Styles.title} numberOfLines={1}>
              {feedData?.author}
            </Text>
            <View style={Styles.metaDataContainer}>
              <Text style={Styles.displayName}>
                {returnDate(feedData?.addedOn)}
              </Text>
              <Image
                source={{ uri: feedData?.favIcon }}
                style={Styles.smFavIcon}
              />
            </View>
          </View>
        </View>
        <Text style={Styles.description}>
          {feedData?.customDescription || feedData?.description}
        </Text>
        <TouchableOpacity onPress={handleLinksPress}>
          <ImageBackground
            source={{ uri: feedData?.imageUrl }}
            style={{
              width: "100%",
              height: undefined,
              aspectRatio: 4 / 3,
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
                  {handleSplitTextTitle(feedData?.title)}
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
                {handleSplitText(feedData?.description)}
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
            <Text style={Styles.actionNavText}>{noOfLikes}</Text>
          </TouchableOpacity>
          <View style={Styles.actionNavBox}>
            <SvgUri
              svgXmlData={SVGS.SHARE_FEED}
              width={RFValue(24, 844)}
              height={RFValue(24, 844)}
            />
          </View>
        </View>
      </View>
      <KeyboardAvoidingView
        behavior={Platform.OS == "ios" ? "padding" : ""}
        keyboardVerticalOffset={0}
        style={{ flex: 1 }}
      >
        <View style={Styles.citationWrapperTop}>{renderCitations()}</View>
        <View>{renderAddCommentCard()}</View>
      </KeyboardAvoidingView>
    </View>
  );
}

const Styles = StyleSheet.create({
  wrapper: {
    paddingTop: RFValue(48, 844),
    backgroundColor: COLORS.monoWhite900,
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "space-between",
    flex: 1,
    // height:"100%"
  },
  citationBorder: {
    borderBottomColor: COLORS.monoChromeBlack,
    borderBottomWidth: 1,
    paddingBottom: RFValue(2, 844),
  },
  viewedWrapper: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: RFValue(16, 844),
  },
  bottomCommentInputWrapper: {
    // position: "absolute",
    // bottom: 0,
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
  commentTitle: {
    fontSize: RFValue(14, 844),
    fontFamily: "Poppins_500Medium",
    color: COLORS.monoBlack700,
    marginBottom: RFValue(8, 844),
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
    paddingVertical: RFValue(12, 844),
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
    width: width / 2,
  },
  actionNavText: {
    fontSize: RFValue(14, 844),
    fontFamily: "Poppins_500Medium",
    color: COLORS.monoBlack900,
    marginLeft: RFValue(8, 844),
    marginTop: RFValue(4, 844),
  },
  citationWrapper: {
    width: "100%",
    borderRadius: RFValue(16, 844),
    backgroundColor: COLORS.monoWhite900,
    paddingHorizontal: RFValue(32, 844),
    paddingBottom: RFValue(40, 844),
    alignItems: "flex-start",
    marginBottom: RFValue(24, 844),
    paddingTop: RFValue(12, 844),
    flex: 1,
  },
  citationWrapperSelfView: {
    width: "100%",
    paddingVertical: RFValue(12, 844),
    borderRadius: RFValue(16, 844),
    marginTop: RFValue(0, 844),
    backgroundColor: COLORS.monoWhite900,
    paddingHorizontal: RFValue(32, 844),
    alignItems: "center",
    marginBottom: RFValue(24, 844),
  },
  citationWrapperLinks: {
    width: "100%",
    marginBottom: RFValue(24, 844),
  },
  citationWrapperTop: {
    width: "100%",
    flex: 1,
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
    getCitation: (userId, tokenDetail, entityId, commentType) => {
      dispatch({
        type: citationTypes.GET_CITATION,
        userId,
        entityId,
        tokenDetail,
        commentType,
      });
    },
    addCitationApi: (requestParam, requestBody, tokenDetail) => {
      dispatch({
        type: citationTypes.ADD_CITATION,
        requestParam,
        requestBody,
        tokenDetail,
      });
    },
    getLinksCounterResetReducer: () => {
      dispatch({ type: linksTypes.GET_LINKS_COUNT_RESET });
    },
    callLinksDetailsAPI: (linkId, tokenDetail) => {
      dispatch({
        type: getFeedDetailTypes.GET_FEED_DETAILS_LIST,
        linkId,
        tokenDetail,
      });
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
export default connect(mapStateToProps, mapDispatchToProps)(Details);
