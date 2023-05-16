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
  TouchableOpacity,
  ImageBackground,
} from "react-native";
const cheerio = require("cheerio");
const getUrls = require("get-urls");
const fetch = require("node-fetch");
import NetInfo from "@react-native-community/netinfo";
import * as Location from "expo-location";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Icon } from "react-native-elements";
import { connect } from "react-redux";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import SnackBar from "../../../components/unicellular/snackbar";
import AsyncStorage from "@react-native-async-storage/async-storage";
import STORAGE_KEY from "../../../constants/StorageKeys";
import COLORS from "../../../themes/colors";
import IMAGES from "../../../themes/Images";
import ProfileHeader from "../../../components/multicellular/profile/header/header";
import Styles from "./Style";
import profile from "../../../assets/jsons/profile/profiledetails";
import folios from "../../../assets/jsons/profile/folio";
import BottomNavBar from "../../../components/multicellular/general/bottomNavBar/bottomNavBar";
import moment from "moment-timezone";
import CategoryBox from "../../../components/multicellular/profile/catergoryBox/categoryBox";
import ProfileButton from "../../../components/multicellular/profile/button/profileButton";
import CitationCard from "../../../components/multicellular/profile/citationCard/citationCard";
import FolioCard from "../../../components/multicellular/profile/folioCard/folioCard";
import { RFValue } from "react-native-responsive-fontsize";

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
import { locationTypes } from "../../../reducers/location/location";
import { assignAgency } from "../../../reducers/onboard/more";
import { linksTypes } from "../../../reducers/profile/addLinks";
import NothingHere from "../../../components/multicellular/general/nothingHere/nothingHere";
import InputBox from "../../../components/multicellular/profile/actionButtonInput";
import { validate } from "./Validation";
import LinkCard from "../../../components/multicellular/profile/linkCard";
import ComingSoonCard from "../../../components/multicellular/general/comingSoon";
import { updateUser } from "../../../reducers/profile/edit";
import ProfileLinksInfoCard from "../../../components/multicellular/profile/profileLinksInfoCard";
import { citationInfo, linkInfo } from "../../../assets/jsons/profile/general";
import LocationModal from "../../../components/multicellular/general/locationModal";
import * as Analytics from "expo-firebase-analytics";
import ProfileProgressBar from "../../../components/multicellular/profile/profileProgressBar";
import { profilePercentageTypes } from "../../../reducers/profile/profilePercentage";
import { convertToPercentage } from "../../../utils/ConvertPercentage";

const height = Dimensions.get("window").height;
const width = Dimensions.get("screen").width;

class BrandSelfView extends Component {
  constructor() {
    super();
    this.state = {
      activeCategory: "Company",
      actionMenuVisible: false,
      expand: false,
      skills: ["Graphic Design", "Artist Management"],
      citation: "",
      view: true,
      isNetworkConnect: true,
      scrollY: new Animated.Value(0),
      url: "",
      linkDescription: "",
      title: "",
      errors: "",
      linkingLoader: false,
      postLinkExpand: false,
      showModal: false,
      activeAgencyId: "",
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
  async readLocation() {
    const location = await AsyncStorage.getItem(STORAGE_KEY.USER_LOCATION);
    if (location) {
      return true;
    }
    return false;
  }
  componentDidMount = async () => {
    const {
      more: { agencyData = {} },
    } = this.props;
    this.props.resetEditReducer();
    this.readInternetConnection();
    let isLocation = await this.readLocation();
    const userId = await AsyncStorage.getItem(STORAGE_KEY.USER_ID);
    const tokenDetail = await AsyncStorage.getItem(STORAGE_KEY.ACCESS_TOKEN);
    this.props.callAgencyApi(userId, tokenDetail);
    this.props.callProfileApi(userId, tokenDetail, userId);
    this.props.getLinksApi(userId, tokenDetail);
    this.props.callUserPercentageApi(userId, tokenDetail);
    const { route } = this.props;
    const { activeTab } = route.params;
    this.setState({ activeCategory: activeTab ? activeTab : "Company" });
    // if (!isLocation) {
    //   (async () => {
    //     let { status } = await Location.requestForegroundPermissionsAsync();
    //     if (status !== "granted") {
    //       console.log("Permission to access location was denied");
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
  handleDeleteLink = async (id) => {
    const requestParam = {
      id: await AsyncStorage.getItem(STORAGE_KEY.USER_ID),
      linkId: id,
    };
    const tokenDetail = await AsyncStorage.getItem(STORAGE_KEY.ACCESS_TOKEN);
    this.props.deleteLinksApi(requestParam, tokenDetail);
  };
  handleDeleteExperience = async (id) => {
    const userId = await AsyncStorage.getItem(STORAGE_KEY.USER_ID);
    const agencyId = id;
    const tokenDetail = await AsyncStorage.getItem(STORAGE_KEY.ACCESS_TOKEN);
    this.props.deleteExperience(userId, agencyId, tokenDetail);
    this.setState({ showModal: false, activeAgencyId: "" });
  };
  handleAddCitation = async () => {
    const userId = await AsyncStorage.getItem(STORAGE_KEY.USER_ID);
    const tokenDetail = await AsyncStorage.getItem(STORAGE_KEY.ACCESS_TOKEN);
    const requestBody = {
      comment: this.state.citation,
    };
    this.props.addCitationApi(userId, requestBody, tokenDetail);
  };
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
  handleSplitText = (text) => {
    if (text?.length > 12) {
      return `${text.substring(0, 12)}...`;
    } else {
      return text;
    }
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
      console.log("errors>>", errors);
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
    };
    return extract;
  };
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
  renderPostLinkCard = () => {
    const { isExtractedLink } = this.state;
    return (
      <View
        style={{
          backgroundColor: COLORS.monoWhite900,
          borderRadius: RFValue(16, 844),
          //marginBottom: RFValue(, 844),
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
                width="33%"
                onPress={() => {
                  this.setState({ postLinkExpand: false });
                }}
              />

              <ProfileButton
                height={RFValue(50, 844)}
                bg={COLORS.monoBlack900}
                text={this.state?.linkingLoader ? "..." : "Post"}
                textColor={COLORS.monoWhite900}
                width="63%"
                onPress={this.handleAddLinks}
              />
            </View>
          </View>
        ) : null}
      </View>
    );
  };

  renderPicDetail = (profileData) => {
    const {
      displayName = "",
      subCategoryNames = [],
      profileImageUrl = "",
      distance = "",
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
            {distance && distance !== "" ? (
              <Text style={Styles.categoryText}>Within {distance} kms</Text>
            ) : null}
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
            this.props.navigation.navigate("EditPage");
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
              add #Tags
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
                width={RFValue(18, 844)}
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

  renderAudienceButtons = (profileData) => {
    const picUrl =
      "https://images.unsplash.com/photo-1620816707403-aee2b7227131?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=464&q=80";
    return (
      <View style={Styles.buttonWrapper}>
        <ProfileButton
          bg={COLORS.primaryTeal500}
          text="Collaborate"
          textColor={COLORS.monoWhite900}
          height={RFValue(50, 844)}
          width="48%"
          onPress={() => {
            this.props.navigation.navigate("CollabPage", {
              Name: profileData.displayName,
              picUrl: picUrl,
            });
          }}
        />
        <ProfileButton
          text="Add to Circle"
          textColor={COLORS.monoBlack700}
          height={RFValue(50, 844)}
          borderWidth={1}
          bg={COLORS.monoWhite900}
          width="48%"
          onPress={() => {
            null;
            // this.props.navigation.navigate("CollabPage", {
            //   Name: profileData.displayName,
            //   picUrl: picUrl,
            // });
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
        {convertToPercentage(profilePercentage) > 0 &&
          convertToPercentage(profilePercentage) !== 100 && (
            <ProfileProgressBar
              percentage={convertToPercentage(profilePercentage)}
            />
          )}
      </>
    );
  };
  renderProfileCard = () => {
    const {
      profile: { profileData = {} },
    } = this.props;
    return (
      <View style={Styles.detailCard}>
        {this.renderPicDetail(profileData)}
        {this.renderBio(profileData)}
        {/* {this.renderProfileProgress()} */}
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
                  onLongPress={() => {
                    this.setState({
                      showModal: true,
                      activeAgencyId: item?.id,
                    });
                  }}
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
              <TouchableOpacity
                onPress={() => {
                  this.props.resetAgencyDetail();
                  this.props.navigation.navigate("EditCompany");
                }}
              >
                <View style={Styles.editContainer}>
                  <Icon
                    name="plus"
                    type="feather"
                    size={15}
                    color={COLORS.primaryTeal500}
                    style={{ marginBottom: RFValue(4, 844) }}
                  />
                  <Text style={Styles.editText}>Add Experience</Text>
                </View>
              </TouchableOpacity>
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
                this.handleDeleteExperience(this.state.activeAgencyId);
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
                  Delete Experience
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
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

  renderAddCommentCard = () => {
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
              <TouchableOpacity
                onPress={() => {
                  this.handleAddCitation();
                  this.setState({
                    sendActive: false,
                  });
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
          <ProfileLinksInfoCard data={citationInfo} />
        </View>
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
              onPress={this.settingRedirection}
              style={[shadow, Styles.profileHeaderBtn]}
            >
              {this.state.view ? (
                <Icon name="settings" type="feather" size={20} />
              ) : (
                <SaveIcon isSaved={isSaved} />
              )}
            </TouchableOpacity>
          );
        }}
      />
    );
  };
  //needed for Folio-Project-Citations section
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
  handleActionButtonNavigation = (page) => {
    this.setState({
      actionMenuVisible: false,
    });
    this.props.navigation.navigate(page);
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

  render() {
    const {
      profile: { gtProfileloading, profileData = {} },
      citation: { citationData },
    } = this.props;
    const { userName = "", coverImageUrl = "" } = profileData;
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
      <View
        style={{
          justifyContent: "flex-end",
        }}
      >
        {/* <NavigationEvents onWillFocus={this.handleFocusOnPage} /> */}
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
        ) : gtProfileloading ? (
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
                style={{
                  zIndex: 2,
                  paddingTop: RFValue(48, 844),
                }}
                showsVerticalScrollIndicator={false}
                overScrollMode={"never"}
                onScroll={Animated.event([
                  {
                    nativeEvent: { contentOffset: { y: this.state.scrollY } },
                  },
                ])}
              >
                <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
                  {gtProfileloading ? (
                    <View>
                      <Text>...</Text>
                    </View>
                  ) : (
                    <View style={{ marginBottom: RFValue(44, 844) }}>
                      <LocationModal />
                      {this.renderProfileCard()}
                      {this.renderCategoryTab()}
                      {this.state.activeCategory == "Company"
                        ? this.renderCompany()
                        : this.state.activeCategory == "Citations"
                        ? this.renderCitations()
                        : this.renderLinks(profileData)}
                    </View>
                  )}
                </KeyboardAwareScrollView>
              </Animated.ScrollView>
            </View>
            <BottomNavBar />
          </>
        )}
        {this.state.errors !== "" && (
          <SnackBar
            visible={this.state.errors !== ""}
            text={this.state.errors}
            onDismiss={() => {
              this.setState({
                errors: "",
              });
            }}
          />
        )}
      </View>
      //   {/* {this.renderCategoryModal(profileData)} */}
      // {/* </BottomSheetModalProvider> */}
    );
  }
}

const mapStateToProps = (state) => {
  const { signup, profile, citation, more, addLinks, profilePercentage } =
    state;
  return { signup, profile, citation, more, addLinks, profilePercentage };
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
    addCitationApi: (userId, requestBody, tokenDetail) => {
      dispatch({
        type: citationTypes.ADD_CITATION,
        userId,
        requestBody,
        tokenDetail,
      });
    },
    addLinksApi: (requestParam, requestBody, tokenDetail) => {
      dispatch({
        type: linksTypes.ADD_LINKS,
        requestParam,
        requestBody,
        tokenDetail,
      });
    },
    deleteExperience: (userId, agencyId, tokenDetail) => {
      dispatch({
        type: assignAgency.DELETE_AGENCY,
        userId,
        agencyId,
        tokenDetail,
      });
    },
    resetAgencyDetail: () => {
      dispatch({ type: assignAgency.RESET_ASSIGN_AGENCY });
    },
    getLinksApi: (userId, tokenDetail) => {
      dispatch({ type: linksTypes.GET_LINKS, userId, tokenDetail });
    },
    resetaddLinksReducer: () => {
      dispatch({ type: linksTypes.RESET_ADD_LINKS });
    },
    resetdeleteLinksReducer: () => {
      dispatch({ type: linksTypes.RESET_DELETE_LINKS });
    },
    resetEditReducer: () => {
      dispatch({
        type: updateUser.RESET_EDIT_REDUCER,
      });
    },
    callAgencyApi: (userId, tokenDetail) => {
      dispatch({
        type: assignAgency.GET_AGENCY,
        userId,
        tokenDetail,
      });
    },
    callUserPercentageApi: (id, tokenDetail) => {
      dispatch({
        type: profilePercentageTypes.FETCH_PROFILE_PERCENTAGE,
        id,
        tokenDetail,
      });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BrandSelfView);
