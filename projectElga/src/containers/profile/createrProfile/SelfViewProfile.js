import React, { Component, useState } from "react";
import { LinkPreview } from "@flyerhq/react-native-link-preview";
import {
  View,
  Image,
  Text,
  Animated,
  Dimensions,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  MaskedViewBase,
  Platform,
  Modal,
  ImageBackground,
  Share,
} from "react-native";
import { Snackbar } from "react-native-paper";
// import fetch from "node-fetch";
const cheerio = require("cheerio");
const getUrls = require("get-urls");
const fetch = require("node-fetch");
import NetInfo from "@react-native-community/netinfo";
import * as Location from "expo-location";
import { connect } from "react-redux";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { Icon } from "react-native-elements";
import AsyncStorage from "@react-native-async-storage/async-storage";
import STORAGE_KEY from "../../../constants/StorageKeys";
import COLORS from "../../../themes/colors";
import IMAGES from "../../../themes/Images";
import ProfileHeader from "../../../components/multicellular/profile/header/header";
import Styles from "./Style";
import profile from "../../../assets/jsons/profile/profiledetails";
import folios from "../../../assets/jsons/profile/folio";
import BottomNavBar from "../../../components/multicellular/general/bottomNavBar/bottomNavBar";
import SocialCard from "../../../components/multicellular/profile/socialCard/socialCard";
import FollowerInfoBar from "../../../components/multicellular/profile/followerInfoBar/followerInfoBar";
import CategoryBox from "../../../components/multicellular/profile/catergoryBox/categoryBox";
import ProfileButton from "../../../components/multicellular/profile/button/profileButton";
import CitationCard from "../../../components/multicellular/profile/citationCard/citationCard";
import FolioCard from "../../../components/multicellular/profile/folioCard/folioCard";
import { RFValue } from "react-native-responsive-fontsize";
import { SignupTypes } from "../../../reducers/auth/signup";
import { citationTypes } from "../../../reducers/profile/citations";
import SaveIcon from "../../../components/multicellular/general/saveIcon";
import TextInputWithText from "../../../components/multicellular/profile/textInput/textInput";
import SvgUri from "expo-svg-uri";
import STRINGS from "../../../constants/Strings";
import SVGS from "../../../constants/SvgUri";
import { profileTypes } from "../../../reducers/profile/profile";
// import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import shadow from "../../../constants/shadow";
import convertInstaMediaData from "../../../utils/convertInstaMediaData";
import ComingSoonCard from "../../../components/multicellular/general/comingSoon";
import { savedTypes } from "../../../reducers/saved/saved";
import Skeleton from "../../../components/multicellular/general/skeleton/skeleton";
import CreatorLoader from "./loader";
import Input from "../../../components/multicellular/social/Input";
import SocialButton from "../../../components/multicellular/social/SocialButton";
import { LinearGradient } from "expo-linear-gradient";
import NoInternet from "../../noInternet";
import {
  makeDeleteApiCall,
  makeDeleteApiV2Call,
  makePostApiCall,
} from "../../../api";
import URLS from "../../../constants/Urls";
import NothingHere from "../../../components/multicellular/general/nothingHere/nothingHere";
import LinkCard from "../../../components/multicellular/profile/linkCard";
import InputBox from "../../../components/multicellular/profile/actionButtonInput";
import { circleTypes } from "../../../reducers/projects/circle";
import { locationTypes } from "../../../reducers/location/location";
import { updateUser } from "../../../reducers/profile/edit";
import convertYotubeMediaData from "../../../utils/convertYotubeMediaData";
import { updateMedia } from "../../../reducers/media/media";
import * as Analytics from "expo-firebase-analytics";
import { linksTypes } from "../../../reducers/profile/addLinks";
import { validate } from "./Validation";
import { createCollab } from "../../../reducers/actionButton/collab";
import { nFormatter, secondsToHms } from "../../../utils/SocialNumberFormat";
import InternetBottomSheet from "../../../components/multicellular/general/bottomNavBar/InternetBottomSheet";
import ProfileLinksInfoCard from "../../../components/multicellular/profile/profileLinksInfoCard";
import {
  citationInfo,
  linkInfo,
  socialInfo,
} from "../../../assets/jsons/profile/general";
import LocationModal from "../../../components/multicellular/general/locationModal";
import * as WebBrowser from "expo-web-browser";
import ProfileProgressBar from "../../../components/multicellular/profile/profileProgressBar";
import { convertToPercentage } from "../../../utils/ConvertPercentage";
import { profilePercentageTypes } from "../../../reducers/profile/profilePercentage";
const width = Dimensions.get("window").width;
class SelfViewProfile extends Component {
  // Audience=this.props.navigation.getParam("audience")
  constructor(props) {
    super(props);
    this.state = {
      activeCategory: "Social",
      actionMenuVisible: false,
      view: true,
      show: false,
      comingSoonVisible: true,
      scrollY: new Animated.Value(0),
      youtubePress: false,
      instagramPress: false,
      sendActive: true,
      isNetworkConnect: false,
      categoryModal: false,
      postLinkExpand: false,
      url: "",
      linkDescription: "",
      urls: ["https://www.behance.net/gallery/147326683/Landscapes"],
      descriptions: ["Check my landscape pictures"],
      instaConnected: false,
      youtubeConnected: false,
      errors: "",
      isExtractedLink: false,
      linkingLoader: false,
      showModal: false,
      showMediaKitModal: false,
      unlink: "INSTAGRAM",
    };
  }

  category = ["Social", "Links", "Citations", "Folio"];
  categoryIcon = [
    IMAGES.instaTabInactive,
    IMAGES.linkInactive,
    IMAGES.citationInactive,
    IMAGES.openFolderInactive,
  ];
  categoryActiveIcon = [
    IMAGES.instaTabActive,
    IMAGES.linkActive,
    IMAGES.citationActive,
    IMAGES.openFolderActive,
  ];
  readInternetConnection() {
    NetInfo.addEventListener((state) => {
      this.setState({ isNetworkConnect: state.isConnected });
    });
  }

  handleSetCategory = async (item) => {
    const {
      profile: { profileData = {} },
    } = this.props;
    Analytics.logEvent(`sp_${item}`, {
      contentType: item,
      userId: profileData?.id,
      displayName: profileData?.displayName,
      isCreator: profileData?.isCreator,
    });
    if (item === "Links") {
      const userId = await AsyncStorage.getItem(STORAGE_KEY.USER_ID);
      const tokenDetail = await AsyncStorage.getItem(STORAGE_KEY.ACCESS_TOKEN);
      this.props.getLinksApi(userId, tokenDetail);
    }
    this.setState({
      activeCategory: item,
    });
  };
  onShare = async () => {
    const shareOptions = {
      title: "Shaer Reward",
      message: "https://www.google.co.in/",
      url: "https://www.google.co.in/",
      subject: "Subject",
    };
    const userId = await AsyncStorage.getItem(STORAGE_KEY.USER_ID);
    const tokenDetail = await AsyncStorage.getItem(STORAGE_KEY.ACCESS_TOKEN);
    try {
      const result = await Share.share(shareOptions);
      if (result.action === Share.sharedAction) {
        // props.addRewardShare(userId, tokenDetail);
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };

  async componentWillReceiveProps(nextProps, nextState) {
    const { isAdddedSuccess, isDeleteSuccess } = nextProps.addLinks;
    const userId = await AsyncStorage.getItem(STORAGE_KEY.USER_ID);
    const tokenDetail = await AsyncStorage.getItem(STORAGE_KEY.ACCESS_TOKEN);
    if (isAdddedSuccess) {
      this.setState({ linkingLoader: false });
      this.setState({ postLinkExpand: false });
      this.props.getLinksApi(userId, tokenDetail);
      this.props.resetaddLinksReducer();
    }
    if (isDeleteSuccess) {
      this.props.getLinksApi(userId, tokenDetail);
      this.props.resetdeleteLinksReducer();
    }
  }
  handleSaved = async () => {
    const { isSaved } = this.props.profile;
    const { route } = this.props;
    const { userId } = route.params;
    const entityId = userId;
    const localUserId = await AsyncStorage.getItem(STORAGE_KEY.USER_ID);
    const tokenDetail = await AsyncStorage.getItem(STORAGE_KEY.ACCESS_TOKEN);
    const saveEntity = "USER";
    // this.props.saveUser(userId, entityId, tokenDetail, saveEntity, isSaved);
    // this.props.addSavedUser(userId, entityId, tokenDetail, saveEntity, isSaved)
    let params = {
      id: localUserId,
      entityId: entityId,
      saveEntity: saveEntity,
    };
    makePostApiCall(URLS.API_SAVE_ENTITY(entityId), {}, tokenDetail, params);
    if (isSaved) {
      this.props.unSaveUser();
    } else {
      this.props.saveUser();
    }
  };
  settingRedirection = () => {
    this.props.navigation.navigate("Setting");
  };
  async readLocation() {
    const location = await AsyncStorage.getItem(STORAGE_KEY.USER_LOCATION);
    if (location) {
      return true;
    }
    return false;
  }
  componentDidMount = async () => {
    this.props.resetEditReducer();
    this.readInternetConnection();
    let isLocation = await this.readLocation();
    const userId = await AsyncStorage.getItem(STORAGE_KEY.USER_ID);
    const tokenDetail = await AsyncStorage.getItem(STORAGE_KEY.ACCESS_TOKEN);
    this.props.callUserPercentageApi(userId, tokenDetail);
    const { route } = this.props;
    const { activeTab } = route.params;
    this.setState({ activeCategory: activeTab ? activeTab : "Social" });
    // if (!isLocation) {
    //   (async () => {
    //     let { status } = await Location.requestForegroundPermissionsAsync();
    //     if (status !== "granted") {
    //       console.warn("Permission to access location was denied");
    //       return;
    //     }
    //     let location = await Location.getCurrentPositionAsync({});
    //     const { coords: { latitude = 0, longitude = 0 } = {} } = location;
    //     this.props.callLocationApi(userId, tokenDetail, latitude, longitude);
    //     await AsyncStorage.setItem(STORAGE_KEY.USER_LOCATION, location);
    //   })();
    // }
    // if (isLocation) {
    //   const { coords: { latitude = 0, longitude = 0 } = {} } =
    //     await AsyncStorage.getItem(STORAGE_KEY.USER_LOCATION);
    //   this.props.callLocationApi(userId, tokenDetail, latitude, longitude);
    // }
    // this.props.getColabCount(userId, tokenDetail);
    this.props.callProfileApi(userId, tokenDetail, userId);
    this.props.getLinksApi(userId, tokenDetail);
  };

  handleSplitText = (text) => {
    if (text?.length > 12) {
      return `${text.substring(0, 12)}...`;
    } else {
      return text;
    }
  };
  renderPicDetail = (profileData) => {
    const {
      displayName = "",
      subCategoryNames = [],
      profileImageUrl = "",
      distance,
    } = profileData;
    return (
      <View style={Styles.picDetailWrapper}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            //alignItems: "center",
          }}
        >
          <View style={Styles.profilePicture}>
            <Image
              source={{ uri: profileImageUrl }}
              style={Styles.profileImage}
            />
          </View>
        </View>

        <View style={{ justifyContent: "flex-start" }}>
          <Text style={Styles.profileNameText}>{displayName}</Text>

          <View style={{ flexDirection: "row", alignItems: "center" }}>
            {subCategoryNames.map((key, index) => {
              return (
                <View>
                  {index < 2 ? (
                    <Text
                      style={[
                        Styles.userNameText,
                        {
                          fontFamily: "Poppins_400Regular",
                          color: COLORS.monoBlack500,
                        },
                      ]}
                    >
                      {key.name}
                      {index == subCategoryNames.length - 2 ? ", " : " "}
                    </Text>
                  ) : null}
                </View>
              );
            })}
            {subCategoryNames.length > 2 ? (
              <TouchableOpacity
                onPress={() => {
                  this.setState({
                    categoryModal: true,
                  });
                }}
              >
                <Text
                  style={[
                    Styles.categoryText,
                    { color: COLORS.primaryTeal400 },
                  ]}
                >
                  +{subCategoryNames.length - 1}
                </Text>
              </TouchableOpacity>
            ) : null}
          </View>
        </View>
      </View>
    );
  };
  renderBio = (profileData) => {
    const { bio = "", tag = [] } = profileData;
    return (
      <View
        style={{
          //paddingTop: RFValue(10, 844),
          width: "100%",
          alignSelf: "center",
        }}
      >
        <Text style={[Styles.bioText, { marginLeft: 0 }]}>{bio}</Text>
        {tag?.length > 0 ? (
          <Text numberOfLines={5}>
            {tag?.map((value, index) => {
              return <Text style={Styles.bioCategory}>#{value.tag} </Text>;
            })}
          </Text>
        ) : (
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.navigate("EditPage", {
                genres: [],
              });
            }}
          >
            <View>
              <Text style={Styles.bioCategory}>#add tag</Text>
            </View>
          </TouchableOpacity>
        )}

        {/* <Text style={Styles.bioCategory}>#ContentCreator</Text> */}
      </View>
    );
  };

  renderBioButtons = () => {
    return (
      <View style={Styles.bioContainer}>
        {/* <TouchableOpacity
          onPress={() => {
            const userIdFromUrl = this.props.navigation.getParam("userId");
            this.props.navigation.navigate("EditPage", {
              userId: userIdFromUrl ? userIdFromUrl : STRINGS.USER_ID,
            });
          }}
        >
          <View style={Styles.bioButton}>
            <SvgUri
              svgXmlData={SVGS.PLUS_CIRCLE}
              width={RFValue(16, 844)}
              height={RFValue(16, 844)}
            />
            <Text style={Styles.bioText}>Add Bio</Text>
          </View>
        </TouchableOpacity> */}

        <TouchableOpacity
          onPress={() => {
            this.props.navigation.navigate("EditPage");
          }}
        >
          <View style={Styles.bioButton}>
            {/* <SvgUri
              svgXmlData={SVGS.PLUS_CIRCLE}
              width={RFValue(16, 844)}
              height={RFValue(16, 844)}
            /> */}
            <Text
              style={[
                Styles.bioText,
                {
                  color: COLORS.primaryTeal400,
                  lineHeight: RFValue(18, 844),
                  marginLeft: 0,
                  paddingVertical: 2,
                },
              ]}
            >
              add #tags
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  };
  renderSelfButtons = () => {
    return (
      <View style={Styles.buttonWrapper}>
        <ProfileButton
          svg={() => {
            return (
              <SvgUri
                svgXmlData={SVGS.EDIT}
                widt={RFValue(18, 844)}
                height={RFValue(18, 844)}
              />
            );
          }}
          height={RFValue(50, 844)}
          bg={COLORS.monoBlack900}
          text="Edit"
          textColor={COLORS.monoWhite900}
          width="48%"
          onPress={() => {
            this.props.navigation.navigate("EditPage", { type: "Creator" });
          }}
        />
        <ProfileButton
          svg={() => {
            return (
              <SvgUri
                svgXmlData={SVGS.SAVED}
                width={RFValue(18, 844)}
                height={RFValue(18, 844)}
              />
            );
          }}
          height={RFValue(50, 844)}
          bg={COLORS.monoWhite900}
          text="Bookmark"
          textColor={COLORS.monoBlack900}
          borderWidth={1}
          width="48%"
          onPress={() => {
            this.props.navigation.navigate("Saved");
          }}
        />
      </View>
    );
  };
  handleCircleRequest = async () => {
    const {
      circle: { deleteResponse },
    } = this.props;
    const { route } = this.props;
    const { userId } = route.params;
    const entityId = userId;
    const localUserId = await AsyncStorage.getItem(STORAGE_KEY.USER_ID);
    const tokenDetail = await AsyncStorage.getItem(STORAGE_KEY.ACCESS_TOKEN);
    const requestParam = {
      senderUserId: localUserId,
      receiverUserId: entityId,
    };
    this.props.sendCircleRequest(requestParam, tokenDetail);
  };

  renderAudienceButtons = (profileData) => {
    return (
      <View style={Styles.buttonWrapper}>
        <ProfileButton
          bg={COLORS.primaryTeal500}
          text="Collaborate"
          textColor={COLORS.monoWhite900}
          width="48%"
          height={RFValue(50, 844)}
          onPress={() => {
            this.props.navigation.navigate("CollabPage", {
              Name: profileData.displayName,
              picUrl: profileData.profileImageUrl,
              userId: profileData.id,
            });
          }}
        />
        <ProfileButton
          text="Add to Circle"
          textColor={COLORS.monoBlack700}
          borderWidth={1}
          bg={COLORS.monoWhite900}
          width="48%"
          height={RFValue(50, 844)}
          onPress={() => {
            this.handleCircleRequest();
          }}
        />
      </View>
    );
  };
  renderProfileProgress = () => {
    const { profilePercentageData: { profilePercentage = 0 } = {} } =
      this.props.profilePercentage;
    return (
      <>
        {convertToPercentage(profilePercentage) !== 100 && (
          <ProfileProgressBar
            percentage={convertToPercentage(profilePercentage)}
          />
        )}
      </>
    );
  };
  renderProfileCard = () => {
    // const audience = this.props.navigation.getParam("audience");
    const {
      profile: {
        profileData = {},
        profileData: {
          socialInsights: { instagramInsight = {}, youtubeInsight = {} } = {},
        } = {},
      },
    } = this.props;
    const {
      collab: { countData },
    } = this.props;
    const { userSocialMeta = {} } = profileData;
    // const follower = userSocialMeta.followers;
    // const average_like = userSocialMeta.averageLikes;
    // const engagementRate = userSocialMeta.engagementRate;
    const instaData = profileData?.socialInsights?.instagramInsights;
    const youtubeData = profileData?.socialInsights?.youtubeInsights;

    return (
      <View style={Styles.detailCard}>
        {this.renderPicDetail(profileData)}
        {this.renderBio(profileData)}
        <FollowerInfoBar
          instaFollowers={
            instagramInsight?.followersCount
              ? nFormatter(instagramInsight?.followersCount)
              : "N.A"
          }
          instaEngRate={instagramInsight?.engagementRate?.toFixed(2) || "N.A"}
          instaAvgReach={
            instagramInsight?.avgImpressions
              ? nFormatter(instagramInsight?.avgImpressions)
              : "N.A"
          }
          instaCollabs={countData}
          youtubeFollowers={
            youtubeInsight?.subscriberCount
              ? nFormatter(youtubeInsight?.subscriberCount)
              : "N.A"
          }
          youtubeAvgReach={
            youtubeInsight?.avgImpressions
              ? nFormatter(youtubeInsight?.avgImpressions)
              : "N.A"
          }
          youtubeEngRate={
            youtubeInsight?.avgWatchTime
              ? secondsToHms(youtubeInsight?.avgWatchTime)
              : "N.A"
          }
          youtubeCollabs={countData}
          onPressColab={() => {
            this.props.navigation.navigate("Collaborates");
          }}
          activeToggle={
            instagramInsight?.id
              ? "insta"
              : youtubeInsight?.id
              ? "youtube"
              : "insta"
          }
        />
        {/* {this.renderBioButtons()} */}
        {this.renderProfileProgress()}
        {this.renderSelfButtons()}
      </View>
    );
  };
  renderCategoryTab = () => {
    return (
      <View style={Styles.categoryBar}>
        {this.category.map((value, index) => (
          <CategoryBox
            iconImage={
              this.state.activeCategory == value
                ? this.categoryActiveIcon[index]
                : this.categoryIcon[index]
            }
            key={index}
            text={value}
            onPress={() => {
              this.handleSetCategory(value);
              this.setState({
                //comingSoonVisible: !this.state.comingSoonVisible,
              });
            }}
            isActive={this.state.activeCategory == value}
          />
        ))}
      </View>
    );
  };
  // _renderYoutubeButton = () => {
  //   const {
  //     media: { mediaResponse = {} },
  //   } = this.props;
  //   if (this.state.youtubePress) {
  //     return <Input placeholder="Enter channel link" image={IMAGES.Youtube} />;
  //   } else {
  //     return (
  //       <SocialButton
  //         gradient={["#FF2221", "#E70100"]}
  //         image={IMAGES.YoutubeRed}
  //         onPress={() => {
  //           this.setState({ youtubePress: true, instagramPress: false });
  //         }}
  //         text="Link your Youtube"
  //       />
  //     );
  //   }
  // };
  renderInsta = () => {
    const {
      profile: { profileData = {}, gtProfileloading },
      instagram: { instagramData = {}, instaloading = {} },
      //youtube: { youtubeData = {}, youtubeloading = {} },
    } = this.props;
    const {
      profile: {
        profileData: { socialInsights: { instagramInsight = {} } = {} } = {},
      },
    } = this.props;
    const { socialProfiles = [] } = instagramData;

    return (
      <View>
        {instaloading ? (
          <View
            style={[
              Styles.skeletonInstaWrapper,
              { marginTop: RFValue(16, 844), width: "100%" },
            ]}
          >
            <Skeleton styles={[Styles.skeletonInstaCard, { marginLeft: 0 }]} />
            <Skeleton styles={Styles.skeletonInstaCard} />
          </View>
        ) : instagramInsight.id ? (
          <TouchableOpacity
            onLongPress={() => {
              this.setState({
                showModal: true,
                unlink: "INSTAGRAM",
              });
            }}
          >
            <SocialCard
              type="insta"
              icon={IMAGES.InstagramColored}
              text={instagramInsight?.username}
              mediaData={
                socialProfiles && socialProfiles?.length > 0
                  ? convertInstaMediaData(socialProfiles[0]?.mediaList)
                  : []
              }
              imageWidth={RFValue(160, 844)}
              aspectRatio={1 / 1}
              likesIcon={IMAGES.Heart}
              follower={instagramInsight?.followersCount}
              cardType="instagram"
            />
          </TouchableOpacity>
        ) : (
          <SocialButton
            gradient={["#FEDA77", "#F58529", "#DD2A7B", "#8134AF", "#515BD4"]}
            image={IMAGES.InstagramColored}
            onPress={this.linkSocial}
            text={"Link your Instagram"}
          />
        )}
      </View>
    );
  };
  linkSocial = async () => {
    const {
      profile: {
        profileData: {
          socialInsights: { youtubeInsight = {}, instagramInsight = {} } = {},
        } = {},
      },
    } = this.props;

    const userId = await AsyncStorage.getItem(STORAGE_KEY.USER_ID);
    const tokenDetail = await AsyncStorage.getItem(STORAGE_KEY.ACCESS_TOKEN);
    console.log("linked", instagramInsight?.id, youtubeInsight?.id);
    this.props.navigation.navigate("Social", {
      userId: userId,
      tokenDetail: tokenDetail,
      type: "link",
      insta: instagramInsight?.id != null,
      youtube: youtubeInsight?.id != null,
    });
  };
  renderModalSocial = () => {
    return (
      <Modal
        visible={this.state.showModal}
        transparent={true}
        animationType="fade"
      >
        <TouchableOpacity
          onPress={() => {
            this.setState({
              showModal: false,
            });
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
            <TouchableOpacity
              onPress={() => {
                this.apiIntegrationLink(this.state.unlink);
              }}
            >
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
                  Unlink
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
    );
  };
  apiIntegrationLink = async (platform) => {
    const userId = await AsyncStorage.getItem(STORAGE_KEY.USER_ID);
    let params = {
      id: userId,
      platform: platform,
    };
    console.log("body", params);
    const tokenDetail = await AsyncStorage.getItem(STORAGE_KEY.ACCESS_TOKEN);
    const response = await makeDeleteApiV2Call(
      "/elga-roma/social/unlink",
      params,
      tokenDetail
    );
    if (response.status) {
      this.props.callProfileApi(userId, tokenDetail, userId);
    }
    this.setState({
      showModal: false,
    });
    // if (response?.status) {
    //   if (platform === "YOUTUBE") {
    //     setYoutubeLinked(true);
    //     setYoutubeName(response?.data?.accountName);
    //     setYoutubeImage(response?.data?.accountImageUrl);
    //   } else {
    //     setInstagramLinked(true);
    //     setInstagramName(response?.data?.accountName);
    //     setInstagramImage(response?.data?.accountImageUrl);
    //   }
    // }
  };
  renderYoutube = () => {
    const {
      profile: { profileData = {}, gtProfileloading },
      youtube: { youtubeData = {}, youtubeloading = {} },
    } = this.props;
    const {
      profile: {
        profileData: { socialInsights: { youtubeInsight = {} } = {} } = {},
      },
    } = this.props;
    const { socialProfiles = [] } = youtubeData;

    return (
      <View>
        {youtubeloading ? (
          <View
            style={[
              Styles.skeletonInstaWrapper,
              { marginTop: RFValue(16, 844), width: "100%" },
            ]}
          >
            <Skeleton styles={[Styles.skeletonInstaCard, { marginLeft: 0 }]} />
            <Skeleton styles={Styles.skeletonInstaCard} />
          </View>
        ) : youtubeInsight?.id ? (
          <TouchableOpacity
            onLongPress={() => {
              this.setState({
                showModal: true,
                unlink: "YOUTUBE",
              });
            }}
          >
            <SocialCard
              icon={IMAGES.YoutubeRed}
              text={youtubeInsight?.channel}
              mediaData={
                socialProfiles && socialProfiles?.length > 0
                  ? socialProfiles[0]?.mediaList
                  : []
              }
              imageWidth={RFValue(280, 844)}
              aspectRatio={16 / 9}
              likesIcon={IMAGES.Like}
              follower={youtubeInsight?.subscriberCount}
              imageTitle="My Design Journey 2022"
              type="youtube"
            />
          </TouchableOpacity>
        ) : (
          <SocialButton
            width={RFValue(30, 844)}
            gradient={["#FF2221", "#E70100"]}
            height={RFValue(30, 844)}
            image={IMAGES.YoutubeRed}
            onPress={this.linkSocial}
            text="Link your Youtube"
          />
        )}
      </View>
    );
  };
  renderSocial = () => {
    const {
      profile: { profileData = {}, gtProfileloading },
      //instagram: { instagramData = {}, instaloading = {} },
      //youtube: { youtubeData = {}, youtubeloading = {} },
    } = this.props;

    const {
      profile: {
        profileData: {
          socialInsights: { instagramInsight = {}, youtubeInsight = {} } = {},
        } = {},
      },
    } = this.props;

    return (
      <View style={{ marginBottom: RFValue(24, 844) }}>
        {!instagramInsight.id && youtubeInsight.id ? (
          <View>
            {this.renderYoutube()}
            {this.renderInsta()}
          </View>
        ) : (
          <View>
            {this.renderInsta()}
            {this.renderYoutube()}
          </View>
        )}
        {instagramInsight.id || youtubeInsight.id ? null : (
          <View style={Styles.socialInfoCard}>
            <ProfileLinksInfoCard data={socialInfo} />
          </View>
        )}
      </View>
    );
  };
  renderFolio = (gtProfileloading) => {
    const {
      displayName = "",
      subCategoryNames = [],
      profileImageUrl = "",
    } = gtProfileloading;
    return (
      <View style={{ marginBottom: RFValue(28, 844) }}>
        <ComingSoonCard
          image="https://images.unsplash.com/photo-1597658917821-e3e00bd9eab0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=436&q=80"
          title="Folio"
          line1="Build Your personal media portfolio"
          line2="Showcase your creativity"
        />
      </View>
    );
    // if (this.state.comingSoonVisible) {
    //return (
    //     <View style={{ marginTop: RFValue(16, 844) }}>
    //       {true ? (
    //         <View style={Styles.folioWrapper}>
    //           <FolioCard
    //             cardType="Add"
    //             title="Create Folio"
    //             // date={value.date}
    //             onPress={() => {
    //               null;
    //             }}
    //           />
    //           {folios.map((value, index) => {
    //             return (
    //               <FolioCard
    //                 key={index}
    //                 thumbnail={value.thumbnail}
    //                 title={value.title}
    //                 date={value.date}
    //                 onPress={() => {
    //                   this.props.navigation.navigate("FolioDetail", {
    //                     data: value,
    //                     profile: profile,
    //                     image: profileImageUrl,
    //                   });
    //                 }}
    //               />
    //             );
    //           })}
    //         </View>
    //       ) : (
    //         <View style={{ alignItems: "center", justifyContent: "center" }}>
    //           <Image source={IMAGES.Error} style={Styles.nothingHereImage} />
    //           <Text style={Styles.nothingHereText}>
    //             Lonely! Nothing Posted Here
    //           </Text>
    //         </View>
    //       )}
    //     </View>
    //   );
    // } else {
    //   return (
    //     <View style={{ marginVertical: RFValue(16, 844) }}>
    //       <ComingSoonCard
    //         image={IMAGES.circle}
    //         title="Portfolios"
    //         line1="Add people to your Circles"
    //         line2="Directly chat with people in your circle."
    //       />
    //     </View>
    //   );
    // }
  };

  renderAddCommentCard = () => {
    const {
      citation: { loading },
    } = this.props;
    return (
      <TextInputWithText
        text="Add Citation"
        textColor={COLORS.primaryTeal500}
        value={this.state.citation}
        placeholder="Type your comment here"
        onChangeText={(text) => {
          this.setState({
            citation: text,
          });
        }}
        width="90%"
        rightInputComponent={() => {
          return (
            <View style={Styles.sendIconContainer}>
              {loading ? (
                <View>
                  <Text>...</Text>
                </View>
              ) : (
                <TouchableOpacity
                  onPress={() => {
                    this.handleAddCitation();
                  }}
                >
                  <SvgUri
                    svgXmlData={
                      this.state.sendActive ? SVGS.GREEN_SEND : SVGS.GREY_SEND
                    }
                    width={RFValue(16, 844)}
                    height={RFValue(16, 844)}
                  />
                </TouchableOpacity>
              )}
            </View>
          );
        }}
      />
    );
  };

  renderCitations = () => {
    const {
      citation: { citationData = [], loading },
    } = this.props;
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
      <View style={Styles.citationWrapperSelfView}>
        {citationData.map((value, index) => (
          <CitationCard
            showModal={false}
            key={index}
            disabled={false}
            data={value}
          />
        ))}
      </View>
    ) : (
      <View style={Styles.citationWrapper}>
        <View style={Styles.socialInfoCard}>
          <ProfileLinksInfoCard data={citationInfo} padding={0} />
        </View>
      </View>
    );
  };

  handleActionButtonNavigation = (page) => {
    this.setState({
      actionMenuVisible: false,
    });
    this.props.navigation.navigate(page);
  };

  handleAddCitation = async () => {
    const { route } = this.props;
    const { userId } = route.params;
    const entityId = userId;
    const localUserId = await AsyncStorage.getItem(STORAGE_KEY.USER_ID);
    const tokenDetail = await AsyncStorage.getItem(STORAGE_KEY.ACCESS_TOKEN);
    const comment = this.state.citation;
    const requestParam = {
      id: localUserId,
      commentType: "USER",
    };
    const requestBody = {
      comment: comment,
      entityId: entityId,
    };

    this.props.addCitationApi(requestParam, requestBody, tokenDetail);
  };
  isValidate = () => {
    let errors = "";
    errors = validate(
      this.state.title,
      this.state.linkDescription,
      this.state.url
    );
    if (errors !== "") {
      this.setState({ errors: errors });
      return false;
    }

    return true;
  };
  handleSubmit = async (url) => {
    const res = await fetch(url);
    const html = await res.text();
    const $ = cheerio.load(html);
    const extract = {
      url,
      title: $("title").first().text(),
      favicon:
        $('link[rel="shortcut icon"]').attr("href") ||
        $('link[rel="icon"]').attr("href"),
      description:
        $('meta[property="og:description"]').attr("content") ||
        $('meta[name="description"]').attr("content"),
      image: $('meta[property="og:image"]').attr("content"),
      video:
        $('meta[property="og:video"]').attr("content") ||
        $('meta[property="og:video:url"]').attr("content"),
    };
    console.log("extract", extract);
    return extract;
  };

  submitLinks = async (extractedValues) => {};

  handleAddLinks = async () => {
    const { url } = this.state;
    const isValid = this.isValidate();
    if (isValid) {
      this.setState({ linkingLoader: true });
      const extractedValues = await this.handleSubmit(url);
      if (Object.keys(extractedValues).length === 0) {
        errors = "Unable to fetch the details from link!!";
        this.setState({ errors: errors });
        this.setState({ linkingLoader: false });
      } else {
        const userId = await AsyncStorage.getItem(STORAGE_KEY.USER_ID);
        const tokenDetail = await AsyncStorage.getItem(
          STORAGE_KEY.ACCESS_TOKEN
        );
        const { title, linkDescription } = this.state;

        const requestBody = {
          author: await AsyncStorage.getItem(STORAGE_KEY.USERNAME),
          title: extractedValues?.title,
          customTitle: title,
          description: extractedValues?.description,
          customDescription: linkDescription,
          favIcon: extractedValues?.favicon,
          imageUrl: extractedValues?.image,
          contentUrl: url,
          websiteName: url,
        };
        const requestParam = {
          id: userId,
        };

        this.props.addLinksApi(requestParam, requestBody, tokenDetail);
      }
    }
  };
  renderMediaKitModal = () => {
    return (
      <Modal
        transparent={true}
        animationType="fade"
        visible={this.state.showMediaKitModal}
      >
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => {
            this.setState({
              showMediaKitModal: false,
            });
          }}
        >
          <View style={Styles.modalWrapper}>
            <View
              style={{
                width: RFValue(350, 844),
                height: RFValue(450, 844),
                paddingVertical: RFValue(32, 844),
                paddingHorizontal: RFValue(32, 844),
                alignItems: "center",
                justifyContent: "space-between",
                backgroundColor: COLORS.monoWhite900,
                borderRadius: RFValue(24, 844),
              }}
            >
              <View style={{ alignItems: "center" }}>
                <View style={Styles.imageMediaKit}>
                  <Image
                    source={IMAGES.MediaKitIcon}
                    style={Styles.iconMediaKit}
                  />
                </View>
                <Text
                  style={{
                    fontFamily: "Poppins_700Bold",
                    fontSize: RFValue(20, 844),
                    color: COLORS.monoBlack900,
                  }}
                >
                  Share Your MediaKit
                </Text>
                <Text
                  style={{
                    fontFamily: "Poppins_400Regular",
                    fontSize: RFValue(16, 844),
                    color: COLORS.monoBlack500,
                    //width: RFValue(250, 844),
                    textAlign: "center",
                  }}
                >
                  Pitch Brands and Agencies with confidence
                </Text>
                <Text
                  style={{
                    marginTop: 8,
                    fontFamily: "Poppins_400Regular",
                    fontSize: RFValue(16, 844),
                    color: COLORS.monoBlack500,
                    //width: RFValue(250, 844),
                    textAlign: "center",
                  }}
                >
                  Share your Social Insights and Portfolio with ease
                </Text>
              </View>
              <View style={{ alignItems: "center" }}>
                <View
                  style={{
                    width: RFValue(308, 844),
                    borderWidth: 1,
                    borderColor: COLORS.monoGhost500,
                  }}
                ></View>
                <TouchableOpacity
                // onPress={async () => {
                //   await WebBrowser.openBrowserAsync(
                //     "https://www.google.co.in/"
                //   );
                // }}
                >
                  <View
                    style={{
                      width: RFValue(230, 844),
                      height: RFValue(48, 844),
                      borderRadius: RFValue(115, 844),
                      alignItems: "center",
                      justifyContent: "center",
                      marginTop: RFValue(24, 844),
                      backgroundColor: COLORS.monoBlack900,
                    }}
                  >
                    <Text style={Styles.shareText}>Coming Soon</Text>
                  </View>
                </TouchableOpacity>
                {/* <TouchableOpacity onPress={this.onShare}>
                  <LinearGradient
                    start={[0, 1]}
                    end={[1, 0]}
                    style={{
                      width: RFValue(230, 844),
                      height: RFValue(48, 844),
                      borderRadius: RFValue(115, 844),
                      alignItems: "center",
                      justifyContent: "center",
                      marginTop: RFValue(12, 844),
                    }}
                    colors={["#1877F2", "#FF47ED"]}
                  >
                    <Text style={Styles.shareText}>Share Mediakit</Text>
                  </LinearGradient>
                </TouchableOpacity> */}
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </Modal>
    );
  };
  renderMediaKitButton = () => {
    return (
      <TouchableOpacity
        onPress={() => {
          this.setState({
            showMediaKitModal: true,
          });
        }}
      >
        <LinearGradient
          start={[0, 1]}
          end={[1, 0]}
          style={Styles.shareButton}
          colors={["#1877F2", "#FF47ED"]}
        >
          <Text style={Styles.shareText}>Share your Mediakit</Text>
          <SvgUri
            svgXmlData={SVGS.SHARE_DOTS_WHITE}
            width={RFValue(28, 844)}
            height={RFValue(28, 844)}
          />
        </LinearGradient>
      </TouchableOpacity>
    );
  };
  handleDeleteLink = async (id) => {
    const requestParam = {
      id: await AsyncStorage.getItem(STORAGE_KEY.USER_ID),
      linkId: id,
    };
    const tokenDetail = await AsyncStorage.getItem(STORAGE_KEY.ACCESS_TOKEN);
    this.props.deleteLinksApi(requestParam, tokenDetail);
  };

  renderHeader = () => {
    const { profileData = {}, isSaved } = this.props.profile;
    const { userName = "" } = profileData;
    return (
      <ProfileHeader
        height={RFValue(96, 844)}
        color={COLORS.monoWhite900}
        text={this.handleSplitText(userName)}
        width={width - 24}
        icon="chevron-left"
        onBackPress={() => {
          this.props.navigation.goBack(null);
        }}
        showBackIcon={true}
        marginBottom={0}
        paddingTop={24}
        rightComponent={() => {
          return (
            <TouchableOpacity
              style={[shadow, Styles.profileHeaderBtn]}
              onPress={this.settingRedirection}
            >
              {<Icon name="settings" type="feather" size={20} />}
            </TouchableOpacity>
          );
        }}
      />
    );
  };

  renderCategoryModal = (profileData) => {
    const { subCategoryNames = [] } = profileData;
    return (
      <Modal visible={this.state.categoryModal} transparent={true}>
        <TouchableOpacity
          onPress={() => {
            this.setState({
              categoryModal: false,
            });
          }}
        >
          <View style={Styles.modalWrapper}>
            <View style={Styles.modalCard}>
              <View style={Styles.modalHeader}>
                <Text style={Styles.modalPricingText}>Categories</Text>
                <TouchableOpacity
                  onPress={() => {
                    this.setState({
                      categoryModal: false,
                    });
                  }}
                >
                  <SvgUri
                    width={RFValue(20, 844)}
                    height={RFValue(20, 844)}
                    svgXmlData={SVGS.GREYCLOSE}
                  />
                </TouchableOpacity>
              </View>

              <View style={Styles.modalColumnWrapper}>
                <View style={Styles.divider}></View>
                {subCategoryNames.map((key, index) => {
                  return (
                    <View>
                      <Text key={index} style={Styles.modalColumnValues}>
                        {key.name}
                      </Text>
                    </View>
                  );
                })}
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </Modal>
    );
  };
  renderPostLinkCard = () => {
    const { isExtractedLink } = this.state;
    return (
      <View
        style={{
          backgroundColor: COLORS.monoWhite900,
          borderRadius: RFValue(16, 844),
        }}
      >
        <TouchableOpacity
          onPress={() => {
            this.setState({
              postLinkExpand: !this.state.postLinkExpand,
            });
          }}
        >
          <View
            style={{
              height: RFValue(64, 844),
              width: "100%",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              paddingHorizontal: RFValue(24, 844),
            }}
          >
            <Text
              style={{
                fontFamily: "Poppins_600SemiBold",
                fontSize: RFValue(16, 844),
                color: COLORS.peach,
              }}
            >
              Post Links
            </Text>
            {!this.state.postLinkExpand ? (
              <View
                style={{
                  width: RFValue(24, 844),
                  height: RFValue(24, 844),
                  borderRadius: RFValue(12, 844),
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: COLORS.peach,
                }}
              >
                <Icon
                  name="plus"
                  type="feather"
                  size={16}
                  color={COLORS.monoWhite900}
                />
              </View>
            ) : (
              <></>
            )}
          </View>
        </TouchableOpacity>
        {this.state.postLinkExpand ? (
          <View>
            <InputBox
              width={"100%"}
              multiline={false}
              placeholder="Enter URL"
              noDivider={true}
              onChangeText={(text) => {
                this.setState({ url: text });
              }}
            />
            <View
              style={{
                borderWidth: 0.5,
                borderColor: COLORS.monoBrightGray,
                width: "90%",
                alignSelf: "center",
              }}
            ></View>
            <InputBox
              width={"100%"}
              multiline={false}
              placeholder="Enter Title"
              noDivider={true}
              onChangeText={(text) => {
                this.setState({ title: text });
              }}
            />
            <View
              style={{
                borderWidth: 0.5,
                borderColor: COLORS.monoBrightGray,
                width: "90%",
                alignSelf: "center",
              }}
            ></View>
            <InputBox
              borderRadius={RFValue(16, 844)}
              multiline={true}
              width={"100%"}
              height={RFValue(160, 844)}
              placeholder="Description"
              noDivider={true}
              onChangeText={(text) => {
                this.setState({
                  linkDescription: text,
                });
              }}
            />

            <View
              style={{
                borderWidth: 0.5,
                borderColor: COLORS.monoBrightGray,
                width: "90%",
                alignSelf: "center",
              }}
            ></View>
            <View
              style={{
                paddingVertical:
                  Platform.OS == "ios" ? RFValue(16, 844) : RFValue(12, 844),
                paddingHorizontal: RFValue(24, 844),
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <ProfileButton
                height={RFValue(50, 844)}
                bg={COLORS.monoWhite900}
                text="Discard"
                textColor={COLORS.monoBlack700}
                borderWidth={1}
                width="35%"
                onPress={() => {
                  this.setState({ postLinkExpand: false });
                }}
              />

              <ProfileButton
                height={RFValue(50, 844)}
                bg={COLORS.monoBlack900}
                text={this.state?.linkingLoader ? "..." : "Post"}
                textColor={COLORS.monoWhite900}
                width="60%"
                onPress={this.handleAddLinks}
              />
            </View>
          </View>
        ) : null}
      </View>
    );
  };

  renderLinks = () => {
    const { linksData, gtLinksloading } = this.props.addLinks;
    return (
      <View
        style={{ marginTop: RFValue(16, 844), marginBottom: RFValue(20, 844) }}
      >
        {this.renderPostLinkCard()}
        {gtLinksloading ? (
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
        ) : linksData?.length > 0 ? (
          linksData?.map((item, index) => {
            return (
              <LinkCard
                isSelfView={true}
                key={index}
                data={item}
                unlinkPress={() => this.handleDeleteLink(item.id)}
              />
            );
          })
        ) : (
          <View style={Styles.citationWrapperLinks}>
            <View style={Styles.socialInfoCard}>
              <ProfileLinksInfoCard data={linkInfo} />
            </View>
          </View>
        )}
      </View>
    );
  };

  renderMainLayout = () => {
    const {
      profile: { profileData = {}, gtProfileloading },
    } = this.props;
    const { userName = "", coverImageUrl = "" } = profileData;

    const headerHeight = this.state.scrollY.interpolate({
      inputRange: [0, 216],
      outputRange: [RFValue(216, 844), RFValue(96, 844)],
      extrapolate: "clamp",
    });
    const opacity = this.state.scrollY.interpolate({
      inputRange: [0, 216],
      outputRange: [0, 0.4],
      extrapolate: "clamp",
    });
    return (
      <>
        {/* // <BottomSheetModalProvider> */}
        <View
          style={{
            justifyContent: "flex-end",
          }}
        >
          {this.renderModalSocial()}
          {profileData &&
          Object.keys(profileData).length === 0 &&
          Object.getPrototypeOf(profileData) === Object.prototype ? (
            gtProfileloading ? (
              <CreatorLoader
                category={this.category}
                userName={this.handleSplitText(userName)}
                onPress={this.settingRedirection}
              />
            ) : (
              <CreatorLoader
                category={this.category}
                userName={this.handleSplitText(userName)}
                onPress={this.settingRedirection}
              />
            )
          ) : (
            <>
              {gtProfileloading ? (
                <CreatorLoader
                  category={this.category}
                  userName={this.handleSplitText(userName)}
                  onPress={this.settingRedirection}
                />
              ) : (
                <>
                  <View style={Styles.wrapper}>
                    {coverImageUrl ? (
                      <Animated.View
                        style={{
                          zIndex: 0,
                          position: "absolute",
                          width: width,
                          height: headerHeight,
                        }}
                      >
                        <ImageBackground
                          source={{ uri: coverImageUrl }}
                          style={{
                            width: "100%",
                            height: "100%",
                          }}
                          imageStyle={{
                            backgroundColor: "#DAE2F8"
                          }}
                        >
                          <Animated.View
                            style={{
                              backgroundColor: "black",
                              width: "100%",
                              height: "100%",
                              opacity: opacity,
                            }}
                          ></Animated.View>
                        </ImageBackground>
                      </Animated.View>
                    ) : (
                      <Skeleton style={Styles.coverImageContainer} />
                    )}
                    <View style={{ height: RFValue(96, 844) }}>
                      {this.renderHeader()}
                    </View>
                    <Animated.ScrollView
                      scrollEventThrottle={16}
                      // fadingEdgeLength={50}
                      onScroll={Animated.event(
                        [
                          {
                            nativeEvent: {
                              contentOffset: { y: this.state.scrollY },
                            },
                          },
                        ],
                        null
                      )}
                      style={{
                        zIndex: 2,
                        paddingTop: RFValue(48, 844),
                      }}
                      showsVerticalScrollIndicator={false}
                      //  fadingEdgeLength={500}
                      overScrollMode={"never"}
                    >
                      {gtProfileloading ? (
                        <View>
                          <Text>...</Text>
                        </View>
                      ) : (
                        <View style={{ marginBottom: RFValue(32, 844) }}>
                          <LocationModal />
                          {this.renderProfileCard()}
                          {this.renderMediaKitButton()}
                          {this.renderCategoryTab()}
                          {this.state.activeCategory == "Social"
                            ? this.renderSocial()
                            : this.state.activeCategory == "Citations"
                            ? this.renderCitations(gtProfileloading)
                            : this.state.activeCategory == "Links"
                            ? this.renderLinks(profileData)
                            : this.renderFolio(profileData)}
                        </View>
                      )}
                    </Animated.ScrollView>
                  </View>
                  <BottomNavBar />
                </>
              )}
            </>
          )}
        </View>
        {this.renderMediaKitModal()}
        {this.renderCategoryModal(profileData)}
        {/* </BottomSheetModalProvider> */}
      </>
    );
  };

  render() {
    const { isNetworkConnect } = this.state;
    if (!isNetworkConnect) {
      return (
        <SafeAreaView>
          <InternetBottomSheet />
        </SafeAreaView>
      );
    } else {
      return this.renderMainLayout();
    }
  }
}

const mapStateToProps = (state) => {
  const {
    signup,
    profile,
    citation,
    saved,
    instagram,
    circle,
    youtube,
    media,
    addLinks,
    collab,
    profilePercentage,
  } = state;
  return {
    signup,
    profile,
    citation,
    saved,
    instagram,
    circle,
    youtube,
    media,
    addLinks,
    collab,
    profilePercentage,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    resetUserLoginToken: () => {
      dispatch({ type: SignupTypes.RESET_LOGIN_TOKEN });
    },
    callProfileApi: (userId, tokenDetail, entityId) => {
      dispatch({
        type: profileTypes.GET_PROFILE_DATA,
        userId,
        tokenDetail,
        entityId,
      });
    },
    callLocationApi: (userId, tokenDetail, latitude, longitude) => {
      dispatch({
        type: locationTypes.SEND_LOCATION_DATA,
        userId,
        tokenDetail,
        latitude,
        longitude,
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
    resetProfileAPI: () => {
      dispatch({ type: profileTypes.RESET_PROFILE_API });
    },
    addLinksApi: (requestParam, requestBody, tokenDetail) => {
      dispatch({
        type: linksTypes.ADD_LINKS,
        requestParam,
        requestBody,
        tokenDetail,
      });
    },
    resetaddLinksReducer: () => {
      dispatch({ type: linksTypes.RESET_ADD_LINKS });
    },
    resetdeleteLinksReducer: () => {
      dispatch({ type: linksTypes.RESET_DELETE_LINKS });
    },
    getLinksApi: (userId, tokenDetail) => {
      dispatch({ type: linksTypes.GET_LINKS, userId, tokenDetail });
    },
    deleteLinksApi: (requestParam, tokenDetail) => {
      dispatch({
        type: linksTypes.DELETE_LINKS,
        requestParam,
        tokenDetail,
      });
    },
    unSaveUser: () => {
      dispatch({ type: profileTypes.UNSAVED_PROFILE });
    },
    saveUser: () => {
      dispatch({ type: profileTypes.SAVED_PROFILE });
    },
    sendCircleRequest: (requestParam, tokenDetail) => {
      dispatch({
        type: circleTypes.SEND_CIRCLE_REQ,
        requestParam,
        tokenDetail,
      });
    },
    getColabCount: (userId, tokenDetail) => {
      dispatch({
        type: createCollab.COUNT_COLLAB,
        userId,
        tokenDetail,
      });
    },
    sendLocation: (requestParam, tokenDetail) => {
      dispatch({
        type: locationTypes.SEND_CIRCLE_DATA,
        requestParam,
        tokenDetail,
      });
    },
    resetEditReducer: () => {
      dispatch({
        type: updateUser.RESET_EDIT_REDUCER,
      });
    },
    callUserPercentageApi: (id, tokenDetail) => {
      dispatch({
        type: profilePercentageTypes.FETCH_PROFILE_PERCENTAGE,
        id,
        tokenDetail,
      });
    },
    // addSavedUser: (userId, entityId, tokenDetail, saveEntity, isSaved) => {
    //   dispatch({ type: savedTypes.ADD_SAVED, userId, entityId, tokenDetail, saveEntity, isSaved });
    // },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(SelfViewProfile);
