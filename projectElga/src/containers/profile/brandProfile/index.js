import React, { Component, useState } from "react";
import {
  View,
  Image,
  Text,
  Animated,
  ScrollView,
  Dimensions,
  Modal,
  Platform,
  TextInput,
  KeyboardAvoidingView,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import NetInfo from "@react-native-community/netinfo";
import moment from "moment-timezone";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Icon } from "react-native-elements";
import { connect } from "react-redux";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import ActionButtonModal from "../../../components/multicellular/profile/modal/actionButtonModal";
import COLORS from "../../../themes/colors";
import IMAGES from "../../../themes/Images";
import ProfileHeader from "../../../components/multicellular/profile/header/header";
import Styles from "./Style";
import profile from "../../../assets/jsons/profile/profiledetails";
import folios from "../../../assets/jsons/profile/folio";
import LinkCard from "../../../components/multicellular/profile/linkCard";
import citations from "../../../assets/jsons/profile/citations";
import AsyncStorage from "@react-native-async-storage/async-storage";
import STORAGE_KEY from "../../../constants/StorageKeys";
import BottomNavBar from "../../../components/multicellular/general/bottomNavBar/bottomNavBar";
import SocialCard from "../../../components/multicellular/profile/socialCard/socialCard";
import FollowerInfoBar from "../../../components/multicellular/profile/followerInfoBar/followerInfoBar";
import CategoryBox from "../../../components/multicellular/profile/catergoryBox/categoryBox";
import ProfileButton from "../../../components/multicellular/profile/button/profileButton";
import CitationCard from "../../../components/multicellular/profile/citationCard/citationCard";
import FolioCard from "../../../components/multicellular/profile/folioCard/folioCard";
import { RFValue } from "react-native-responsive-fontsize";
import { locationTypes } from "../../../reducers/location/location";
import { assignAgency } from "../../../reducers/onboard/more";
import { SignupTypes } from "../../../reducers/auth/signup";
import CompanyDetails from "../../../components/multicellular/profile/companyDetails/companyDetail.js";
import SaveIcon from "../../../components/multicellular/general/saveIcon";
import ProjectCard from "../../../components/multicellular/profile/projectCard/projectCard";
import TextInputWithText from "../../../components/multicellular/profile/textInput/textInput";
import SvgUri from "expo-svg-uri";
import { citationTypes } from "../../../reducers/profile/citations";
import SVGS from "../../../constants/SvgUri";
import { profileTypes } from "../../../reducers/profile/profile";
import STRINGS from "../../../constants/Strings";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import shadow from "../../../constants/shadow";
import Skeleton from "../../../components/multicellular/general/skeleton/skeleton";
import CreatorLoader from "../createrProfile/loader";
import { thirdPartyProfileTypes } from "../../../reducers/profile/thirdPartyProfile";
import NothingHere from "../../../components/multicellular/general/nothingHere/nothingHere";
import decodeToken from "../../../utils/decodeToken";
import PushNotification from "../../../components/multicellular/notification";
import { circleTypes } from "../../../reducers/projects/circle";
import { linksTypes } from "../../../reducers/profile/addLinks";
import ComingSoonCard from "../../../components/multicellular/general/comingSoon";
import { projectTypes } from "../../../reducers/projects/projects";
import ConvertDistance from "../../../utils/ConvertDistance";
import { citationInfo, linkInfo } from "../../../assets/jsons/profile/general";
import ProfileLinksInfoCard from "../../../components/multicellular/profile/profileLinksInfoCard";
import { createCollab } from "../../../reducers/actionButton/collab";
import { makePostApiCall } from "../../../api";
import URLS from "../../../constants/Urls";
import * as Analytics from "expo-firebase-analytics";

const height = Dimensions.get("window").height;
const width = Dimensions.get("screen").width;

class BrandProfile extends Component {
  constructor() {
    super();
    this.state = {
      activeCategory: "Company",
      actionMenuVisible: false,
      expand: false,
      skills: ["Graphic Design", "Artist Management"],
      citation: "",
      view: true,
      sendActive: true,
      edit: false,
      editName: "",
      editId: "",
      citation: "",
      isNetworkConnect: true,
      scrollY: new Animated.Value(0),
      addtoCircleClick: false,
    };
  }

  category = ["Company", "Links", "Citations"];
  categoryIcon = [
    IMAGES.companyInactive,
    IMAGES.linkInactive,
    IMAGES.citationInactive,
  ];
  categoryActiveIcon = [
    IMAGES.companyActive,
    IMAGES.linkActive,
    IMAGES.citationActive,
  ];

  images = [IMAGES.bg1, IMAGES.bg2, IMAGES.bg3];

  readInternetConnection() {
    NetInfo.addEventListener((state) => {
      this.setState({ isNetworkConnect: state.isConnected });
    });
  }

  componentDidMount = async () => {
    const {
      more: { agencyData = {} },
    } = this.props;
    // this.readInternetConnection();
    const { route } = this.props;
    const { userId } = route.params;
    const localUserId = await AsyncStorage.getItem(STORAGE_KEY.USER_ID);
    const tokenDetail = await AsyncStorage.getItem(STORAGE_KEY.ACCESS_TOKEN);
    this.props.callAgencyApi(userId, tokenDetail);
    this.props.callProfileApi(userId, tokenDetail, userId);
    this.props.callprojectApi(localUserId, tokenDetail, ENUM.ONGOING);
    this.props.getLinksApi(userId, tokenDetail);
  };
  async componentWillReceiveProps(nextProps, nextState) {
    const { sendResponse = [], sendResponseSuccess } = nextProps.circle;
    const { tppProfileData: { expoToken = [] } = {}, isVisted } =
      nextProps.thirdPartyProfile;
    const { profileData = {} } = nextProps.profile;
    const { isAdddedSuccess } = nextProps.citation;
    if (isAdddedSuccess) {
      this.setState({ citation: "" });
      expoToken?.map((item) => {
        const token = decodeToken(item);
        PushNotification(
          token,
          `${profileData?.displayName} added a citation`,
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
          "New Circle Request",
          `${profileData?.displayName} wants to add you in their circle`
        );
      });

      this.props.resetSuccess();
    }
  }
  handleOnPressMessage = (id) => {
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
          });
        }
      });
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
    const { route } = this.props;
    const { userId } = route.params;
    if (item === "Links") {
      const entityId = userId;
      const tokenDetail = await AsyncStorage.getItem(STORAGE_KEY.ACCESS_TOKEN);
      this.props.getLinksApi(entityId, tokenDetail);
    }
    this.setState({
      activeCategory: item,
    });
  };
  handleSplitText = (text) => {
    if (text?.length > 12) {
      return `${text.substring(0, 12)}...`;
    } else {
      return text;
    }
  };
  renderPostLinkCard = () => {
    return (
      <View
        style={{
          backgroundColor: COLORS.monoWhite900,
          borderRadius: RFValue(16, 844),
          marginBottom: RFValue(16, 844),
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
                width="33%"
                onPress={() => {
                  this.setState({ postLinkExpand: false });
                }}
              />

              <ProfileButton
                height={RFValue(50, 844)}
                bg={COLORS.primaryTeal500}
                text="Post"
                textColor={COLORS.monoWhite900}
                width="63%"
                onPress={() => {
                  null;
                }}
              />
            </View>
          </View>
        ) : null}
      </View>
    );
  };

  renderPicDetail = (tppProfileData) => {
    const {
      displayName = "",
      subCategoryNames = [],
      profileImageUrl = "",
      distance = 0,
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
    const entityId = userId;
    const localUserId = await AsyncStorage.getItem(STORAGE_KEY.USER_ID);
    const tokenDetail = await AsyncStorage.getItem(STORAGE_KEY.ACCESS_TOKEN);
    const requestParam = {
      senderUserId: localUserId,
      receiverUserId: entityId,
    };
    this.setState({ addtoCircleClick: true });
    this.props.sendCircleRequest(requestParam, tokenDetail);
  };
  handleCollab = (tppProfileData) => {
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
          height={RFValue(50, 844)}
          width="48%"
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
      thirdPartyProfile: { tppProfileData = {} },
    } = this.props;
    return (
      <View style={Styles.detailCard}>
        {this.renderPicDetail(tppProfileData)}
        {this.renderBio(tppProfileData)}
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
                comingSoonVisible: !this.state.comingSoonVisible,
              });
            }}
            isActive={this.state.activeCategory == value}
          />
        ))}
      </View>
    );
  };
  convertDateFormat = (dt) => {
    return moment(dt).tz("Asia/kolkata").format("MMM YYYY");
  };
  renderExperience = () => {
    const { agencyData = [] } = this.props.more;
    return (
      <View style={Styles.companyContainer}>
        <TouchableOpacity
        // onPress={() => {
        //   this.setState({
        //     expand: !this.state.expand,
        //   });
        // }}
        >
          <View style={Styles.companyDetailTitleContainer}>
            <Text style={Styles.companyDetailTitle}>Experience</Text>
            {/* <Icon
              color={COLORS.monoBlack500}
              name={this.state.expand ? "chevron-down" : "chevron-up"}
              type="feather"
              size={20}
            /> */}
          </View>
        </TouchableOpacity>
        <View style={Styles.divider}></View>
        {agencyData && agencyData?.length > 0
          ? agencyData.map((item, index) => {
              return (
                <CompanyDetails
                  companyName={item?.name}
                  date={`${this.convertDateFormat(item?.startDate)} - ${
                    item?.endDate
                      ? this.convertDateFormat(item?.endDate)
                      : "Present"
                  }`}
                  designation={item?.designation}
                  website={item?.companyWebsite}
                />
              );
            })
          : null}

        <View>
          {this.state.view ? (
            <View>
              <View style={Styles.divider}></View>
            </View>
          ) : null}
        </View>
      </View>
    );
  };
  renderSkills = () => {
    return (
      <View
        style={[Styles.companyContainer, { marginBottom: RFValue(24, 844) }]}
      >
        <Text style={Styles.companyDetailTitle}>Skills</Text>
        {this.state.skills.map((value, index) => {
          return (
            <View>
              <View style={Styles.divider}></View>
              <Text style={Styles.skillsText}>{value}</Text>
            </View>
          );
        })}
        {this.state.view ? (
          <View>
            <View style={Styles.divider}></View>
            <TouchableOpacity
              onPress={() => {
                this.props.navigation.navigate("EditSkills");
              }}
            >
              <View style={Styles.editContainer}>
                <Icon
                  name="edit-2"
                  type="feather"
                  size={10}
                  color={COLORS.monoBlack500}
                />
                <Text style={Styles.editText}>Edit</Text>
              </View>
            </TouchableOpacity>
          </View>
        ) : null}
      </View>
    );
  };
  renderCompany = () => {
    return (
      <ScrollView showsVerticalScrollIndicator={false}>
        {this.renderExperience()}
      </ScrollView>
    );
  };
  renderProjects = () => {
    return (
      <View style={{ marginBottom: RFValue(24, 844) }}>
        <View style={Styles.folioWrapper}>
          {folios.map((value, index) => {
            return (
              <ProjectCard
                key={index}
                thumbnail={value.thumbnail}
                title={value.title}
                date={value.date}
                category1={value.category1}
                category2={value.category2}
              />
            );
          })}
        </View>
      </View>
    );
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

  renderFolio = () => {
    return (
      <View style={{ marginTop: RFValue(16, 844) }}>
        {true ? (
          <View style={Styles.folioWrapper}>
            {folios.map((value, index) => {
              return (
                <FolioCard
                  key={index}
                  thumbnail={value.thumbnail}
                  title={value.title}
                  date={value.date}
                  onPress={() => {
                    this.props.navigation.navigate("FolioDetail", {
                      data: value,
                      profile: profile,
                    });
                  }}
                />
              );
            })}
          </View>
        ) : (
          <View style={{ alignItems: "center", justifyContent: "center" }}>
            <Image
              source={IMAGES.Error}
              style={{
                width: RFValue(310, 844),
                height: RFValue(180, 844),
                resizeMode: "contain",
              }}
            />
            <Text
              style={{
                fontFamily: "Poppins_500Medium",
                fontSize: RFValue(16, 844),
                color: COLORS.monoBlack500,
                marginTop: RFValue(24, 844),
              }}
            >
              Lonely! Nothing Posted Here
            </Text>
          </View>
        )}
      </View>
    );
  };
  settingRedirection = () => {
    this.props.navigation.navigate("Setting");
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
              onPress={this.handleSaved}
              style={[shadow, Styles.profileHeaderBtn]}
            >
              <SaveIcon isSaved={isSaved} />
            </TouchableOpacity>
          );
        }}
      />
    );
  };
  //needed for Folio-Project-Citations section
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
  handleActionButtonNavigation = (page) => {
    this.setState({
      actionMenuVisible: false,
    });
    this.props.navigation.navigate(page);
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

  render() {
    const {
      thirdPartyProfile: { gtProfileloading, tppProfileData = {} },
      citation: { citationData },
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
          ) : gtProfileloading ? (
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
                <View
                  style={{
                    height: RFValue(96, 844),
                  }}
                >
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
                    <View style={{ marginBottom: RFValue(44, 844) }}>
                      {this.renderProfileCard()}
                      {this.renderCategoryTab()}
                      {this.state.activeCategory == "Company"
                        ? this.renderCompany()
                        : this.state.activeCategory == "Citations"
                        ? this.renderCitations()
                        : this.renderLinks(tppProfileData)}
                    </View>
                  )}
                </Animated.ScrollView>
              </View>
              <BottomNavBar />
            </>
          )}
        </View>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  const {
    signup,
    profile,
    thirdPartyProfile,
    citation,
    more,
    addLinks,
    circle,
    projects,
  } = state;
  return {
    signup,
    profile,
    thirdPartyProfile,
    citation,
    more,
    addLinks,
    circle,
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
    callprojectApi: (userId, tokenDetail, listType, name) => {
      dispatch({
        type: projectTypes.GET_PROJECT_LIST,
        userId,
        tokenDetail,
        listType,
        name,
      });
    },
    editCitationApi: (requestParam, tokenDetail) => {
      dispatch({
        type: citationTypes.EDIT_CITATION,
        requestParam,
        tokenDetail,
      });
    },
    callAgencyApi: (userId, tokenDetail) => {
      dispatch({
        type: assignAgency.GET_AGENCY,
        userId,
        tokenDetail,
      });
    },
    resetProfileVisitReducer: () => {
      dispatch({ type: thirdPartyProfileTypes.RESET_VISITED_PROFILE });
    },
    resetSuccess: () => {
      dispatch({
        type: circleTypes.RESET_SUCCESS,
      });
    },
    sendCircleRequest: (requestParam, tokenDetail) => {
      dispatch({
        type: circleTypes.SEND_CIRCLE_REQ,
        requestParam,
        tokenDetail,
      });
    },
    getLinksApi: (userId, tokenDetail) => {
      dispatch({ type: linksTypes.GET_LINKS, userId, tokenDetail });
    },
    resetAddCitation: () => {
      dispatch({ type: citationTypes.RESET_ADD_CITATION });
    },
    addCitationApi: (requestParam, requestBody, tokenDetail) => {
      dispatch({
        type: citationTypes.ADD_CITATION,
        requestParam,
        requestBody,
        tokenDetail,
      });
    },
    unSaveUser: () => {
      dispatch({ type: thirdPartyProfileTypes.UNSAVED_PROFILE });
    },
    saveUser: () => {
      dispatch({ type: thirdPartyProfileTypes.SAVED_PROFILE });
    },
    addParticipants: (participants) => {
      dispatch({ type: createCollab.ADD_PARTICIPANT, participants });
    },
    resetCollab: () => {
      dispatch({
        type: createCollab.RESET_COLLAB,
      });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BrandProfile);
