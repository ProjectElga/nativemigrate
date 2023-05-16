import React, { Component, useState } from "react";
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
} from "react-native";
import NetInfo from "@react-native-community/netinfo";
import { connect } from "react-redux";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
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
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
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
import { makeDeleteApiCall, makePostApiCall } from "../../../api";
import URLS from "../../../constants/Urls";
import NothingHere from "../../../components/multicellular/general/nothingHere/nothingHere";
import LinkCard from "../../../components/multicellular/profile/linkCard";
import InputBox from "../../../components/multicellular/profile/actionButtonInput";
import { circleTypes } from "../../../reducers/projects/circle";
import { locationTypes } from "../../../reducers/location/location";
import { updateMedia } from "../../../reducers/media/media";
import PushNotification from "../../../components/multicellular/notification";
import decodeToken from "../../../utils/decodeToken";
import { thirdPartyProfileTypes } from "../../../reducers/profile/thirdPartyProfile";
import { linksTypes } from "../../../reducers/profile/addLinks";
import { createCollab } from "../../../reducers/actionButton/collab";
import { projectTypes } from "../../../reducers/projects/projects";
import ENUM from "../../../constants/Enum";
import { nFormatter, secondsToHms } from "../../../utils/SocialNumberFormat";
import InternetBottomSheet from "../../../components/multicellular/general/bottomNavBar/InternetBottomSheet";
import ConvertDistance from "../../../utils/ConvertDistance";
import ProfileLinksInfoCard from "../../../components/multicellular/profile/profileLinksInfoCard";
import {
  citationInfo,
  linkInfo,
  socialInfo,
} from "../../../assets/jsons/profile/general";
const width = Dimensions.get("window").width;
import * as Analytics from "expo-firebase-analytics";
import LocationModal from "../../../components/multicellular/general/locationModal";
class CreatorProfile extends Component {
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
      isNetworkConnect: true,
      categoryModal: false,
      postLinkExpand: false,
      url: "",
      linkDescription: "",
      addtoCircleClick: false,
      title: "",
      descriptions: [
        "https://medium.com/@sylviok/the-art-of-not-caring-cce25b3afa66",
        "https://www.behance.net/gallery/147326683/Landscapes",
      ],
      edit: false,
      editName: "",
      editId: "",
      citation: "",
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
    Analytics.logEvent(`tpp_${item}`, {
      contentType: item,
      userId: profileData?.id,
      displayName: profileData?.displayName,
      isCreator: profileData?.isCreator,
    });
    if (item === "Links") {
      const { route } = this.props;
      const { userId, displayName } = route.params;
      const entityId = userId;
      const tokenDetail = await AsyncStorage.getItem(STORAGE_KEY.ACCESS_TOKEN);
      this.props.getLinksApi(entityId, tokenDetail);
    }
    this.setState({
      activeCategory: item,
    });
  };
  handleSaved = async () => {
    const { isSaved } = this.props.thirdPartyProfile;
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
    this.props?.navigation?.navigate("Setting");
  };

  componentDidMount = async () => {
    // this.readInternetConnection();
    const { route } = this.props;
    const { userId } = route.params;
    const localUserId = await AsyncStorage.getItem(STORAGE_KEY.USER_ID);
    this.props.resetProfileReducer();
    const entityUserId = userId;
    const tokenDetail = await AsyncStorage.getItem(STORAGE_KEY.ACCESS_TOKEN);
    const requestParams = {
      id: userId,
      platforms: "YOUTUBE",
    };
    // this.props.getColabCount(userId, tokenDetail);
    this.props.callProfileApi(userId, tokenDetail, entityUserId);
    this.props.callprojectApi(localUserId, tokenDetail, ENUM.ONGOING);
    this.props.getLinksApi(entityUserId, tokenDetail);
    await this.props.callMediaApi(userId, tokenDetail, requestParams);
    const lowerRange = Platform.OS == "ios" ? 120 : 100;
    const opacity = this.state.scrollY.interpolate({
      inputRange: [0, 210 - lowerRange],
      outputRange: [1, 0],
    });
  };

  async componentWillReceiveProps(nextProps, nextState) {
    const { route } = this.props;
    const { userId } = route.params;
    const { sendResponse = [], sendResponseSuccess } = nextProps.circle;
    const { tppProfileData: { expoToken = [] } = {}, isVisted } =
      nextProps.thirdPartyProfile;
    const { profileData = {} } = nextProps.profile;
    const { isAdddedSuccess, edSuccess } = nextProps.citation;
    if (edSuccess) {
      const entityUserId = userId;
      const tokenDetail = await AsyncStorage.getItem(STORAGE_KEY.ACCESS_TOKEN);
      const requestParams = {
        id: userId,
        platforms: "YOUTUBE",
      };
      // this.props.getColabCount(userId, tokenDetail);
      this.props.callProfileApi(userId, tokenDetail, entityUserId);
      this.props.resetEditCitation();
    }
    if (isAdddedSuccess) {
      this.setState({ citation: "" });
      expoToken?.map((item) => {
        const token = decodeToken(item);
        PushNotification(
          token,
          `${profileData?.displayName} added a citation on your profile`,
          `Click to view`
        );
      });
      this.props.resetAddCitation();
    }
    if (!isVisted) {
      expoToken?.map((item) => {
        const token = decodeToken(item);
        PushNotification(
          token,
          "Profile View",
          `${profileData?.displayName} viewed your profile.`
        );
      });
      this.props.resetSuccess();
      this.props.resetProfileVisitReducer();
    }
    if (sendResponseSuccess) {
      sendResponse?.map((item) => {
        const expoToken = decodeToken(item);
        PushNotification(
          expoToken,
          "Circle Request",
          `${profileData?.displayName} wants to add you to their circle`
        );
      });

      this.props.resetSuccess();
    }
  }

  handleSplitText = (text) => {
    if (text?.length > 12) {
      return `${text.substring(0, 12)}...`;
    } else {
      return text;
    }
  };
  renderPicDetail = (tppProfileData) => {
    const {
      displayName = "",
      subCategoryNames = [],
      profileImageUrl = "",
      distance = "",
    } = tppProfileData;

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
          <View
            style={{
              height: RFValue(30, 844),
              paddingHorizontal: RFValue(16, 844),
              borderRadius: RFValue(16, 844),
              backgroundColor: COLORS.monoGhost500,
              alignItems: "center",
              justifyContent: "center",
              marginTop: RFValue(12, 844),
              marginLeft: RFValue(12, 844),
            }}
          >
            <Text style={Styles.categoryText}>{ConvertDistance(distance)}</Text>
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
  renderBio = (tppProfileData) => {
    const { bio = "", tag = [] } = tppProfileData;
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
        ) : null}

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
          bg={COLORS.primaryTeal500}
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
                svgXmlData={SVGS.WALLET}
                widt={RFValue(18, 844)}
                height={RFValue(18, 844)}
              />
            );
          }}
          height={RFValue(50, 844)}
          bg={COLORS.monoWhite900}
          text="Wallet"
          textColor={COLORS.monoBlack700}
          borderWidth={1}
          width="48%"
          onPress={() => {
            this.props.navigation.navigate("ComingSoonPage");
          }}
        />
      </View>
    );
  };
  handleCircleRequest = async () => {
    const {
      profile: { profileData = {} },
    } = this.props;
    Analytics.logEvent("tpp_AddToCircle", {
      contentType: "Add To Circle",
      userId: profileData?.id,
      displayName: profileData?.displayName,
      isCreator: profileData?.isCreator,
    });

    const { route } = this.props;
    const { userId } = route.params;
    const localUserId = await AsyncStorage.getItem(STORAGE_KEY.USER_ID);
    const tokenDetail = await AsyncStorage.getItem(STORAGE_KEY.ACCESS_TOKEN);
    const requestParam = {
      senderUserId: localUserId,
      receiverUserId: userId,
    };
    this.setState({ addtoCircleClick: true });
    this.props.sendCircleRequest(requestParam, tokenDetail);
  };
  handleOnPressMessage = async (id) => {
    const {
      profile: { profileData = {} },
    } = this.props;
    Analytics.logEvent("tpp_Message", {
      contentType: "Message",
      userId: profileData?.id,
      displayName: profileData?.displayName,
      isCreator: profileData?.isCreator,
    });

    const { loading, projectsData = [], error } = this.props.projects;
    projectsData?.projectList &&
      projectsData?.projectList.length > 0 &&
      projectsData?.projectList?.map((value, index) => {
        if (value.type == "CIRCLE" && value.participants[0].id == id) {
          this.props.navigation.navigate("Chat", {
            ChatRoomData: value,
            //membersName: data.participants,
            // memberProfile: data,
            // memberIds: data,
            //conversationImage: data[0].profileImageUrl,
          });
        }
      });
  };
  handleCollab = async (tppProfileData) => {
    const {
      profile: { profileData = {} },
    } = this.props;
    Analytics.logEvent("tpp_Collaborate", {
      contentType: "colab",
      userId: profileData?.id,
      displayName: profileData?.displayName,
      isCreator: profileData?.isCreator,
    });
    

    var arr = [
      {
        id: tppProfileData?.id,
        inCircle: tppProfileData?.circleStatus == "ACCEPTED",
        profileImageUrl: tppProfileData.profileImageUrl,
        displayName: tppProfileData?.displayName,
        expoToken: tppProfileData?.expoToken,
      },
    ];
    this.props.addParticipants(arr);
    this.props.navigation.navigate("CollabPage");
  };
  renderAudienceButtons = (tppProfileData) => {
    const { sendResponseSuccess, sendResponse = [] } = this.props.circle;
    const { addtoCircleClick } = this.state;
    return (
      <View style={Styles.buttonWrapper}>
        <ProfileButton
          bg={COLORS.monoBlack900}
          text="Collaborate"
          textColor={COLORS.monoWhite900}
          width="48%"
          height={RFValue(50, 844)}
          onPress={() => {
            this.props.resetCollab();
            this.handleCollab(tppProfileData);
          }}
        />
        <ProfileButton
          text={
            addtoCircleClick
              ? "Request Sent"
              : sendResponseSuccess
              ? "Request Sent"
              : typeof tppProfileData?.circleStatus === "undefined"
              ? "Add to Circle"
              : tppProfileData?.circleStatus === "ACCEPTED"
              ? "Message"
              : tppProfileData?.circleStatus === "SENT"
              ? "Request Sent"
              : "Accept Req."
          }
          textColor={COLORS.monoBlack700}
          borderWidth={1}
          bg={COLORS.monoWhite900}
          width="48%"
          height={RFValue(50, 844)}
          onPress={
            tppProfileData?.circleStatus === "ACCEPTED"
              ? () => this.handleOnPressMessage(tppProfileData.id)
              : addtoCircleClick
              ? null
              : typeof tppProfileData?.circleStatus === "undefined"
              ? this.handleCircleRequest
              : tppProfileData?.circleStatus === "PENDING"
              ? () => {
                  this.props.navigation.navigate("Projects", {
                    activeTab: 3,
                    activeSection: "Pending",
                  });
                }
              : null
          }
        />
      </View>
    );
  };

  renderProfileCard = () => {
    const {
      thirdPartyProfile: {
        tppProfileData = {},
        tppProfileData: {
          socialInsights: { instagramInsight = {}, youtubeInsight = {} } = {},
        } = {},
      },
    } = this.props;

    const { userSocialMeta = {} } = tppProfileData;
    const {
      collab: { countData = 0 },
    } = this.props;
    // const follower = userSocialMeta.followers;
    // const average_like = userSocialMeta.averageLikes;
    // const engagementRate = userSocialMeta.engagementRate;
    return (
      <View style={Styles.detailCard}>
        {this.renderPicDetail(tppProfileData)}
        {this.renderBio(tppProfileData)}
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
            this.props.navigation.navigate("Collaborates", {
              userId: tppProfileData.id,
            });
          }}
          activeToggle={instagramInsight?.id ? "insta" : "youtube"}
        />
        {this.renderAudienceButtons(tppProfileData)}
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
  renderInsta = () => {
    const {
      thirdPartyProfile: { tppProfileData = {}, gtProfileloading },
      instagram: { instagramData = {}, instaloading = {} },
      //youtube: { youtubeData = {}, youtubeloading = {} },
    } = this.props;
    const {
      thirdPartyProfile: {
        tppProfileData: { socialInsights: { instagramInsight = {} } = {} } = {},
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
        ) : null}
      </View>
    );
  };

  renderYoutube = () => {
    const {
      thirdPartyProfile: { tppProfileData = {}, gtProfileloading },
      youtube: { youtubeData = {}, youtubeloading = {} },
    } = this.props;
    const {
      thirdPartyProfile: {
        tppProfileData: { socialInsights: { youtubeInsight = {} } = {} } = {},
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
        ) : youtubeInsight.id ? (
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
        ) : null}
      </View>
    );
  };
  renderSocial = () => {
    const {
      thirdPartyProfile: { tppProfileData = {}, gtProfileloading },
      //instagram: { instagramData = {}, instaloading = {} },
      //youtube: { youtubeData = {}, youtubeloading = {} },
    } = this.props;

    const {
      thirdPartyProfile: {
        tppProfileData: {
          socialInsights: { instagramInsight = {}, youtubeInsight = {} } = {},
        } = {},
      },
    } = this.props;

    return (
      <View style={{ marginBottom: RFValue(24, 844) }}>
        {this.renderInsta()}
        {this.renderYoutube()}
        {instagramInsight?.id || youtubeInsight?.id ? null : (
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
    if (this.state.comingSoonVisible) {
      return (
        <View style={{ marginBottom: RFValue(28, 844) }}>
          <ComingSoonCard
            image="https://images.unsplash.com/photo-1597658917821-e3e00bd9eab0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=436&q=80"
            title="Folio"
            line1="Build Your personal media portfolio"
            line2="Showcase your creativity"
          />
        </View>
        // <View style={{ marginTop: RFValue(16, 844) }}>
        //   {true ? (
        //     <View style={Styles.folioWrapper}>
        //       {this.state.view ? (
        //         <FolioCard
        //           cardType="Add"
        //           title="Create Folio"
        //           // date={value.date}
        //           onPress={() => {
        //             null;
        //           }}
        //         />
        //       ) : null}
        //       {folios.map((value, index) => {
        //         return (
        //           <FolioCard
        //             key={index}
        //             thumbnail={value.thumbnail}
        //             title={value.title}
        //             date={value.date}
        //             onPress={() => {
        //               this.props.navigation.navigate("FolioDetail", {
        //                 data: value,
        //                 profile: profile,
        //                 image: profileImageUrl,
        //               });
        //             }}
        //           />
        //         );
        //       })}
        //     </View>
        //   ) : (
        //     <View style={{ alignItems: "center", justifyContent: "center" }}>
        //       <Image source={IMAGES.Error} style={Styles.nothingHereImage} />
        //       <Text style={Styles.nothingHereText}>
        //         Lonely! Nothing Posted Here
        //       </Text>
        //     </View>
        //   )}
        // </View>
      );
    } else {
      return (
        <View style={{ marginVertical: RFValue(16, 844) }}>
          <ComingSoonCard
            image={IMAGES.circle}
            title="Portfolios"
            line1="Add people to your Circles"
            line2="Directly chat with people in your circle."
          />
        </View>
      );
    }
  };
  handleEditCitation = async () => {
    const userId = await AsyncStorage.getItem(STORAGE_KEY.USER_ID);
    const tokenDetail = await AsyncStorage.getItem(STORAGE_KEY.ACCESS_TOKEN);
    const comment = this.state.citation;
    const requestParam = {
      id: userId,
      commentId: this.state.editId,
      revisedComment: this.state.citation,
    };

    this.props.editCitationApi(requestParam, tokenDetail);
    this.setState({
      citation: "",
      edit: false,
      editId: "",
      editName: "",
    });
  };

  renderAddCommentCard = () => {
    const {
      citation: { loading },
    } = this.props;
    return (
      <TextInputWithText
        text={this.state.edit ? this.state.editName : "Add Citation"}
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
                    this.state.edit
                      ? this.handleEditCitation()
                      : this.handleAddCitation();
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
      <View style={Styles.citationWrapper}>
        {citationData.map((value, index) => (
          <CitationCard
            onPress={() => {
              this.setState({
                edit: true,
                citation: value?.comment,
                editName: value?.profile?.displayName,
                editId: value?.id,
              });
            }}
            key={index}
            disabled={false}
            data={value}
          />
        ))}
        {this.renderAddCommentCard()}
      </View>
    ) : (
      <View style={Styles.citationWrapper}>
        <View style={Styles.socialInfoCard}>
          <ProfileLinksInfoCard data={citationInfo} />
        </View>

        {this.renderAddCommentCard()}
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
    const localUserId = await AsyncStorage.getItem(STORAGE_KEY.USER_ID);
    const tokenDetail = await AsyncStorage.getItem(STORAGE_KEY.ACCESS_TOKEN);
    const comment = this.state.citation;
    const requestParam = {
      id: localUserId,
      commentType: "USER",
    };
    const requestBody = {
      comment: comment,
      entityId: userId,
    };

    this.props.addCitationApi(requestParam, requestBody, tokenDetail);
  };
  renderHeader = () => {
    const { tppProfileData = {}, isSaved } = this.props.thirdPartyProfile;
    const { userName = "" } = tppProfileData;
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
              onPress={this.handleSaved}
            >
              <SaveIcon isSaved={isSaved} />
            </TouchableOpacity>
          );
        }}
      />
    );
  };
  // scrapeUrl=()=>{

  //       const res = await fetch(url);

  //       const html = await res.text();
  //       const $ = cheerio.load(html);

  //       const getMetatag = (name) =>
  //           $(`meta[name=${name}]`).attr('content') ||
  //           $(`meta[name="og:${name}"]`).attr('content') ||
  //           $(`meta[name="twitter:${name}"]`).attr('content');

  //       return {
  //           url,
  //           title: $('title').first().text(),
  //           favicon: $('link[rel="shortcut icon"]').attr('href'),
  //           // description: $('meta[name=description]').attr('content'),
  //           description: getMetatag('description'),
  //           image: getMetatag('image'),
  //           author: getMetatag('author'),
  //       }

  // }

  renderCategoryModal = (tppProfileData) => {
    const { subCategoryNames = [] } = tppProfileData;
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

  renderLinks = () => {
    const { linksData, gtLinksloading } = this.props.addLinks;
    return (
      <View style={{ marginBottom: RFValue(20, 844) }}>
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
            return <LinkCard key={index} data={item} isCreator={true} />;
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
      thirdPartyProfile: { tppProfileData = {}, gtProfileloading },
    } = this.props;
    const { userName = "", coverImageUrl = "" } = tppProfileData;
    const lowerRange = Platform.OS == "ios" ? 120 : 100;
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
      // <BottomSheetModalProvider>
      <>
        <View
          style={{
            justifyContent: "flex-end",
          }}
        >
          {tppProfileData &&
          Object.keys(tppProfileData).length === 0 &&
          Object.getPrototypeOf(tppProfileData) === Object.prototype ? (
            gtProfileloading ? (
              <CreatorLoader
                category={this.category}
                userName={this.handleSplitText(userName)}
              />
            ) : (
              <CreatorLoader
                category={this.category}
                userName={this.handleSplitText(userName)}
              />
            )
          ) : (
            <>
              {gtProfileloading ? (
                <CreatorLoader
                  category={this.category}
                  userName={this.handleSplitText(userName)}
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
                      onScroll={Animated.event([
                        {
                          nativeEvent: {
                            contentOffset: { y: this.state.scrollY },
                          },
                        },
                      ])}
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
                          {this.renderProfileCard()}
                          {this.renderCategoryTab()}
                          {this.state.activeCategory == "Social"
                            ? this.renderSocial()
                            : this.state.activeCategory == "Citations"
                            ? this.renderCitations(gtProfileloading)
                            : this.state.activeCategory == "Links"
                            ? this.renderLinks(tppProfileData)
                            : this.renderFolio(tppProfileData)}
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
        {this.renderCategoryModal(tppProfileData)}
        {/* // </BottomSheetModalProvider> */}
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
    thirdPartyProfile,
    citation,
    saved,
    instagram,
    circle,
    media,
    youtube,
    addLinks,
    collab,
    projects,
  } = state;
  return {
    signup,
    profile,
    thirdPartyProfile,
    citation,
    saved,
    instagram,
    circle,
    media,
    youtube,
    addLinks,
    collab,
    projects,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    resetUserLoginToken: () => {
      dispatch({ type: SignupTypes.RESET_LOGIN_TOKEN });
    },
    callProfileApi: (userId, tokenDetail, entityId) => {
      dispatch({
        type: thirdPartyProfileTypes.GET_TPP_PROFILE_DATA,
        userId,
        tokenDetail,
        entityId,
      });
    },
    resetProfileAPI: () => {
      dispatch({ type: thirdPartyProfileTypes.RESET_PROFILE_API });
    },
    resetProfileReducer: () => {
      dispatch({ type: thirdPartyProfileTypes.GET_TPP_PROFILE_DATA_RESET });
    },
    resetProfileVisitReducer: () => {
      dispatch({ type: thirdPartyProfileTypes.RESET_VISITED_PROFILE });
    },
    addCitationApi: (requestParam, requestBody, tokenDetail) => {
      dispatch({
        type: citationTypes.ADD_CITATION,
        requestParam,
        requestBody,
        tokenDetail,
      });
    },
    editCitationApi: (requestParam, tokenDetail) => {
      dispatch({
        type: citationTypes.EDIT_CITATION,
        requestParam,
        tokenDetail,
      });
    },
    resetAddCitation: () => {
      dispatch({ type: citationTypes.RESET_ADD_CITATION });
    },
    resetEditCitation: () => {
      dispatch({ type: citationTypes.RESET_EDIT_CITATION });
    },

    getColabCount: (userId, tokenDetail) => {
      dispatch({
        type: createCollab.COUNT_COLLAB,
        userId,
        tokenDetail,
      });
    },
    unSaveUser: () => {
      dispatch({ type: thirdPartyProfileTypes.UNSAVED_PROFILE });
    },
    saveUser: () => {
      dispatch({ type: thirdPartyProfileTypes.SAVED_PROFILE });
    },
    sendCircleRequest: (requestParam, tokenDetail) => {
      dispatch({
        type: circleTypes.SEND_CIRCLE_REQ,
        requestParam,
        tokenDetail,
      });
    },
    resetSuccess: () => {
      dispatch({
        type: circleTypes.RESET_SUCCESS,
      });
    },
    getLinksApi: (userId, tokenDetail) => {
      dispatch({ type: linksTypes.GET_LINKS, userId, tokenDetail });
    },
    callMediaApi: (userId, tokenDetail, requestParams) => {
      dispatch({
        type: updateMedia.GET_MEDIA,
        userId,
        tokenDetail,
        requestParams,
      });
    },
    sendLocation: (requestParam, tokenDetail) => {
      dispatch({
        type: locationTypes.SEND_CIRCLE_DATA,
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
    addParticipants: (participants) => {
      dispatch({ type: createCollab.ADD_PARTICIPANT, participants });
    },
    resetCollab: () => {
      dispatch({
        type: createCollab.RESET_COLLAB,
      });
    },
    // addSavedUser: (userId, entityId, tokenDetail, saveEntity, isSaved) => {
    //   dispatch({ type: savedTypes.ADD_SAVED, userId, entityId, tokenDetail, saveEntity, isSaved });
    // },
  };
};
// export default connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(withNavigationFocus(CreatorProfile));
export default connect(mapStateToProps, mapDispatchToProps)(CreatorProfile);
