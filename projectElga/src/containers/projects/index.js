import React, { Component } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Header from "../../components/multicellular/discover/header";
import {
  View,
  ScrollView,
  Text,
  TouchableWithoutFeedback,
  Modal,
  TouchableOpacity,
  RefreshControl,
} from "react-native";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { connect, useSelector } from "react-redux";
import NothingHere from "../../components/multicellular/general/nothingHere/nothingHere";

import BottomNavBar from "../../components/multicellular/general/bottomNavBar/bottomNavBar";
import { Icon } from "react-native-elements";
import styles from "./Style";
import { RFValue } from "react-native-responsive-fontsize";
import COLORS from "../../themes/colors";
import PendingCard from "../../components/multicellular/project/pendingCard";

import SearchBarWithFilter from "../../components/multicellular/general/searchBar";
import * as Analytics from "expo-firebase-analytics";
import IMAGES from "../../themes/Images";

import { projectTypes } from "../../reducers/projects/projects";
import Skeleton from "../../components/multicellular/general/skeleton/skeleton";
import { projectActionTypes } from "../../reducers/projects/projectAction";
import SnackBar from "../../components/unicellular/snackbar";
import SvgUri from "expo-svg-uri";
import SVGS from "../../constants/SvgUri";

import STORAGE_KEY from "../../constants/StorageKeys";
import ChatRoom from "../chat/ChatRoom";
import { circleTypes } from "../../reducers/projects/circle";

import ProfileButton from "../../components/multicellular/profile/button/profileButton";
import { Image } from "react-native";
import { savedTypes } from "../../reducers/saved/saved";
import PushNotification from "../../components/multicellular/notification";
import decodeToken from "../../utils/decodeToken";
import ENUM from "../../constants/Enum";
import CircleCard from "../../components/multicellular/project/CircleCard";
import { useIsFocused } from "@react-navigation/native";
class Projects extends Component {
  constructor() {
    super();
    this.state = {
      actionMenuVisible: false,
      activeTab: 0,
      nearMe: 0,
      circleRequestVisible: false,
      comingSoonVisible: true,
      isChatActive: true,
      showWithdrawModal: false,
      withdrawValue: null,
      showUncircleModal: false,
      deleteId: "",
      notification: "",
      searchText: undefined,
      toggleValues: ["Conversations", "Opportunities"],
      isOngoing: true,
      ongoingCounter: 0,
      sentCounter: 0,
      pendingCounter: 0,
      circleCounter: 0,
      categories: [
        { title: "Ongoing", value: 0 },
        { title: "Pending", value: 1 },
        { title: "Sent", value: 2 },
        // { title: "Circle", value: 3 },
      ],
      activeSection: "",
      withdrawId: "",
      withdrawReciverId: "",
      userId: "",
      circleRequest: false,
      refreshing: false

    };
  }
  projectSchedule = async () => {
    const userId = await AsyncStorage.getItem(STORAGE_KEY.USER_ID);
    const tokenDetail = await AsyncStorage.getItem(STORAGE_KEY.ACCESS_TOKEN);
    this.props.callprojectSchedularApi(
      userId,
      tokenDetail,
      ENUM.ONGOING,
      this.state.searchText
    );
  };
  async callApiForProject(tab) {
    const {
      sentProjectsData = [],
      pendingProjectsData = [],
      projectsData = [],
    } = this.props.projects;
    const userId = await AsyncStorage.getItem(STORAGE_KEY.USER_ID);
    const tokenDetail = await AsyncStorage.getItem(STORAGE_KEY.ACCESS_TOKEN);
    this.setState({
      ongoingCounter: projectsData?.totalCount,
      sentCounter: sentProjectsData?.totalCount,
      pendingCounter: pendingProjectsData?.totalCount,
    });
    if (tab === 0) {
      this.setState({ isChatActive: true });
      this.setState({
        activeSection: "Conversations",
      });
      this.props.callprojectApi(
        userId,
        tokenDetail,
        ENUM.ONGOING,
        this.state.searchText
      );
      this.timerId = setInterval(() => this.projectSchedule(), 5000);
    }
    if (tab === 1) {
      clearInterval(this.timerId);
      this.props.callPendingprojectApi(
        userId,
        tokenDetail,
        ENUM.PENDING,
        this.state.searchText
      );
    }
    if (tab === 2) {
      clearInterval(this.timerId);
      this.props.callSentprojectApi(
        userId,
        tokenDetail,
        ENUM.SENT,
        this.state.searchText
      );
    }
    if (tab === 3) {
      clearInterval(this.timerId);
      let requestParam = {};
      if (this.state.activeSection === "Pending") {
        this.setState({
          activeSection: "Pending",
        });
        this.setState({ isChatActive: false });
        requestParam = {
          id: userId,
          listType: "PENDING",
        };
      } else {
        if (this.state.activeSection === "Sent") {
          this.setState({
            activeSection: "Sent",
          });
          this.setState({ isChatActive: false });
          requestParam = {
            id: userId,
            listType: "SENT",
          };
        } else {
          this.setState({
            activeSection: "My Circle",
          });
          this.setState({ isChatActive: false });
          requestParam = {
            id: userId,
            listType: "ACCEPTED",
          };
        }
      }

      // this.props.getCircleApi(requestParam, tokenDetail);
    }
  }
   onRefresh = () => {
    this.setState({refreshing: true});
    this.callApiForProject(this.state.activeTab);
    setTimeout(() => {
      this.setState({refreshing: false});
    }, 500);
  };
  async handleDeleteCircleRequest(requestUserId, isSent) {
    const { deleteResponse = [] } = this.props.circle;
    const userId = await AsyncStorage.getItem(STORAGE_KEY.USER_ID);
    const tokenDetail = await AsyncStorage.getItem(STORAGE_KEY.ACCESS_TOKEN);
    const {
      profile: { profileData = {} },
    } = this.props;
    Analytics.logEvent(`Projects_circleCard_Reject`, {
      contentType: "circle",
      userId: profileData?.id,
      displayName: profileData?.displayName,
      isCreator: profileData?.isCreator,
    });
    const requestParam = {
      senderUserId: requestUserId,
      receiverUserId: userId,
      // userId: requestUserId,
    };
    this.props.deleteCircleApi(requestParam, tokenDetail, isSent);
    if (deleteResponse.status) {
      this.setState({
        showUncircleModal: false,
      });
    }
    //this.callApiForProject(3);
  }
  componentWillUnmount() {
    clearInterval(this.timerId);
    this.handleInnerToggleSwitch();
  }
  handleAcceptCircle = async (requestUserId) => {
    const {
      profile: { profileData = {} },
    } = this.props;
    Analytics.logEvent(`Projects_circleCard_Accept`, {
      contentType: "circle",
      userId: profileData?.id,
      displayName: profileData?.displayName,
      isCreator: profileData?.isCreator,
    });

    const userId = await AsyncStorage.getItem(STORAGE_KEY.USER_ID);
    const tokenDetail = await AsyncStorage.getItem(STORAGE_KEY.ACCESS_TOKEN);
    const requestParam = {
      senderUserId: requestUserId.id,
      receiverUserId: userId,
      // userId: requestUserId.id,
    };
    this.setState({
      circleRequest: true,
    });
    this.props.acceptCircleApi(requestParam, tokenDetail);
  };
  handleChangeToggle(value) {
    const {
      profile: { profileData = {} },
    } = this.props;
    Analytics.logEvent("screen_view", {
      firebase_screen: value.title,
      userId: profileData?.id,
      displayName: profileData?.displayName,
      isCreator: profileData?.isCreator,
    });

    this.setState({
      activeTab: value.value,
      comingSoonVisible: !this.state.comingSoonVisible,
    });
    this.callApiForProject(value.value);
    this.setState({
      showUncircleModal: false,
      circleCounter:
        value.value == "PENDING" ? circleData.length : this.state.circleCounter,
    });
  }
  handleInnerToggleSwitch = async () => {
    const {
      profile: { profileData = {} },
    } = this.props;
    const userId = await AsyncStorage.getItem(STORAGE_KEY.USER_ID);
    const tokenDetail = await AsyncStorage.getItem(STORAGE_KEY.ACCESS_TOKEN);
    Analytics.logEvent("screen_view", {
      firebase_screen: this.state.activeSection,
      userId: profileData?.id,
      displayName: profileData?.displayName,
      isCreator: profileData?.isCreator,
    });
    this.props.callprojectApi(userId, tokenDetail, "ONGOING");
    this.state.activeSection == "Conversations"
      ? this.setState({ isChatActive: true })
      : this.setState({ isChatActive: false });
  };
  handleInnerToggleSwitchArchived = async (item) => {
    const userId = await AsyncStorage.getItem(STORAGE_KEY.USER_ID);
    const tokenDetail = await AsyncStorage.getItem(STORAGE_KEY.ACCESS_TOKEN);
    const {
      profile: { profileData = {} },
    } = this.props;
    Analytics.logEvent("screen_view", {
      firebase_screen: item,
      userId: profileData?.id,
      displayName: profileData?.displayName,
      isCreator: profileData?.isCreator,
    });
    // if (this.state.searchText !== "") {
    //   const requestParam = {
    //     id: userId,
    //     key: this.state.searchText,
    //   };
    //   this.props.getCircleSearchApi(requestParam, tokenDetail);
    // } else {
    this.setState({ isChatActive: item === "My Circle" });
    const requestParam = {
      id: userId,
      listType:
        item === "Pending" ? "PENDING" : item === "Sent" ? "SENT" : "ACCEPTED",
    };
    // this.props.getCircleApi(requestParam, tokenDetail);
    // }

    this.setState({ isChatActive: !this.state.isChatActive });
  };
  setId = async () => {
    const { profileData = {} } = this.props.profile;
    const userId = await AsyncStorage.getItem(STORAGE_KEY.USER_ID);
    const displayName = profileData?.displayName;
    const tokenDetail = await AsyncStorage.getItem(STORAGE_KEY.USER_ID);
    await AsyncStorage.setItem("UserId", userId);
    await AsyncStorage.setItem("UserName", displayName);

    const requestParam = {
      id: userId,
      listType: "PENDING",
    };
    this.props.callPendingprojectApi(
      userId,
      tokenDetail,
      "PENDING",
      this.state.searchText
    );
    this.props.callSentprojectApi(
      userId,
      tokenDetail,
      "SENT",
      this.state.searchText
    );

    // this.props.getCircleApi(requestParam, tokenDetail);
  };
  async componentDidMount() {
    const {
      sentProjectsData = [],
      pendingProjectsData = [],
      projectsData = [],
    } = this.props.projects;

    const { route, navigation } = this.props;
    const { params = {} } = route;
    const { activeSection, activeTab } = params;
    const userId = await AsyncStorage.getItem(STORAGE_KEY.USER_ID);
    this.setState({
      userId: userId,
    });

    if (activeTab) {
      this.setState({
        activeTab: activeTab,
      });
      if (activeTab == 3 && activeSection) {
        this.setState({
          activeSection: activeSection,
        });
      }
      this.callApiForProject(activeTab);
    } else {
      this.setState({
        activeTab: 0,
        activeSection: "Conversations",
      });
      this.callApiForProject(0);
    }

    this.setId();
  }

  async componentWillReceiveProps(nextProps, nextState) {
    const userId = await AsyncStorage.getItem(STORAGE_KEY.USER_ID);
    const tokenDetail = await AsyncStorage.getItem(STORAGE_KEY.ACCESS_TOKEN);

    const { acceptResponse = [], acceptSuccess } = nextProps.circle;
    const { profileData } = nextProps.profile;
    const { isAcceptSuccess, acceptData = [] } = nextProps.projectAction;

    if (acceptSuccess && this.state.circleRequest) {
      console.log("acceptResponse", acceptResponse);
      acceptResponse?.map((item) => {
        const expoToken = decodeToken(item);
        if (this.state.circleRequest) {
          PushNotification(
            expoToken,
            "Circle Request Accepted",
            `${profileData?.displayName} has accepted your circle request`
          );
          this.props.resetSuccess();
          this.setState({
            circleRequest: false,
          });
        }
      });
    }
    if (isAcceptSuccess) {
      const expoToken = decodeToken(acceptData);
      PushNotification(
        expoToken,
        `Welcome ${profileData?.displayName} to your circle`,
        "Your circle request was accepted. Greet them with a Hi!!"
      );
      this.props.callAcceptProjectResetReducer();
    }
  }
  Pageloader = () => {
    return (
      <View>
        {this.LoaderCard(0, RFValue(16, 844))}
        {this.LoaderCard(0, RFValue(16, 844), RFValue(16, 844))}
        {this.LoaderCard(0, RFValue(16, 844), RFValue(16, 844))}
        {this.LoaderCard(0, RFValue(16, 844), RFValue(16, 844))}
        {this.LoaderCard(0, RFValue(16, 844), RFValue(16, 844))}
        {this.LoaderCard(0, RFValue(16, 844), RFValue(16, 844))}
        {this.LoaderCard(0, RFValue(16, 844), RFValue(16, 844))}
      </View>
    );
  };
  fetchParticipantsImage = (array) => {
    const text = array
      ?.map(function (elem, index) {
        if (index === 0) {
          return elem.profileImageUrl;
        }
      })
      .join(",");
    return text;
  };
  fetchParticipantsSingle = (array) => {
    const text = array
      ?.map(function (elem, index) {
        if (index === 0) {
          return elem.displayName;
        }
      })
      .join(",");
    return text;
  };
  fetchParticipantsSingleId = (array) => {
    const text = array
      ?.map(function (elem, index) {
        if (index === 0) {
          return elem.id;
        }
      })
      .join(",");
    return text;
  };
  fetchParticipants = (array) => {
    const text = array
      ?.map(function (elem, index) {
        if (index < 2) {
          return elem.displayName;
        }
      })
      .join(",");
    return text;
  };
  fetchParticipantsAdditonal = (array) => {
    const text = array.length > 2 ? array.length - 2 : "";
    return text;
  };
  renderWithdrawModal = () => {
    return (
      <Modal
        visible={this.state.showWithdrawModal}
        transparent={true}
        animationType="fade"
      >
        <TouchableWithoutFeedback
          onPress={() => {
            this.setState({
              showWithdrawModal: false,
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
            <View
              style={{
                backgroundColor: COLORS.monoWhite900,
                borderRadius: RFValue(16, 844),
                alignItems: "center",
                paddingVertical: RFValue(20, 844),
                paddingHorizontal: RFValue(20, 844),
              }}
            >
              <Image
                source={IMAGES.warningLogo}
                style={{ width: RFValue(48, 844), height: RFValue(48, 844) }}
              />
              <Text
                style={{
                  fontFamily: "Poppins_600SemiBold",
                  fontSize: RFValue(14, 844),
                  color: COLORS.monoBlack900,
                }}
              >
                Are you sure you want to withdraw?
              </Text>
              <View
                style={{
                  paddingTop: RFValue(12, 844),
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  width: RFValue(270, 844),
                }}
              >
                <ProfileButton
                  height={RFValue(50, 844)}
                  bg={COLORS.teritiaryWarning}
                  text="Withdraw"
                  textColor={COLORS.monoWhite900}
                  width={RFValue(125, 844)}
                  fontSize={RFValue(14, 844)}
                  onPress={() => {
                    this.handleWithdraw(
                      this.state.withdrawId,
                      this.state.withdrawReciverId
                    );
                  }}
                />
                <ProfileButton
                  height={RFValue(50, 844)}
                  bg={COLORS.monoWhite900}
                  text="Cancel"
                  textColor={COLORS.monoChatGray}
                  borderWidth={1}
                  width={RFValue(125, 844)}
                  fontSize={RFValue(14, 844)}
                  onPress={() => {
                    this.setState({
                      showWithdrawModal: false,
                    });
                  }}
                />
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    );
  };
  handleWithdraw = async (projectWithdrawId, receiverUserId) => {
    const userId = await AsyncStorage.getItem(STORAGE_KEY.USER_ID);
    const tokenDetail = await AsyncStorage.getItem(STORAGE_KEY.ACCESS_TOKEN);
    this.props.callApitoWithdrawProject(
      userId,
      tokenDetail,
      projectWithdrawId,
      receiverUserId,
      "COLLABORATION"
    );
    this.setState({ showWithdrawModal: false });
  };
  SentProjectScreen = () => {
    const { loading, sentProjectsData = [], error } = this.props.projects;
    const { withdrawloading } = this.props.projectAction;
    const {
      profile: { profileData = {} },
    } = this.props;
    return loading ? (
      error ? (
        <NothingHere
          text="Nothing Here! Comeback later 👋"
          image={IMAGES.NoPending}
        />
      ) : (
        this.Pageloader()
      )
    ) : (
      <View style={{ height: "100%" }}>
        <ScrollView
          style={{ height: "100%", marginBottom: 200 }}
          showsVerticalScrollIndicator={false}
        >
          {sentProjectsData?.projectList &&
          sentProjectsData?.projectList?.length > 0 ? (
            sentProjectsData?.projectList?.map((value, index) => {
              return (
                <PendingCard
                  title={value.name}
                  profileName={this.fetchParticipantsSingle(value.participants)}
                  //key={index}
                  date={value?.sentOn}
                  onPress={() => {
                    Analytics.logEvent("screen_view", {
                      firebase_screen: "SentPage",
                      userId: profileData?.id,
                      displayName: profileData?.displayName,
                      isCreator: profileData?.isCreator,
                    });
                    this.props.navigation.navigate("PendingPage", {
                      id: value?.id,
                      isPending: false,
                      sentSection: ENUM.SENT,
                      recieverId: this.fetchParticipantsSingleId(
                        value.participants
                      ),
                    });
                  }}
                  showProfile={true}
                  image={this.fetchParticipantsImage(value.participants)}
                  mainCategory={
                    value?.type
                      ? value?.type?.toLowerCase() === "collaboration"
                        ? "Project"
                        : value?.type?.toLowerCase()
                      : value.type?.toLowerCase()
                  }
                  subCategory={value.priceDetails?.entityType?.toLowerCase()}
                  subtitleText={value?.description}
                  onClickButton1={() => {
                    this.props.navigation.navigate("PendingPage", {
                      id: value?.id,
                      isPending: false,
                      sentSection: ENUM.SENT,
                      recieverId: this.fetchParticipantsSingleId(
                        value.participants
                      ),
                    });
                  }}
                  onClickButton2={() => {
                    this.setState({
                      showWithdrawModal: true,
                      withdrawId: value.id,
                      withdrawReciverId: this.fetchParticipantsSingleId(
                        value.participants
                      ),
                    });
                    // this.handleWithdraw(value);
                  }}
                  loadingButton2={withdrawloading}
                  button1="Follow Up"
                  button2="Withdraw"
                />
              );
            })
          ) : (
            <NothingHere
              text="Nothing Here! Comeback later 👋"
              image={IMAGES.NoPending}
            />
          )}
        </ScrollView>
      </View>
    );
  };
  handleAcceptButton = async (value) => {
    const {
      profile: { profileData = {} },
    } = this.props;
    Analytics.logEvent(`Projects_pendingCard_Accept`, {
      contentType: "Pending",
      userId: profileData?.id,
      displayName: profileData?.displayName,
      isCreator: profileData?.isCreator,
    });
    const userId = await AsyncStorage.getItem(STORAGE_KEY.USER_ID);
    const tokenDetail = await AsyncStorage.getItem(STORAGE_KEY.ACCESS_TOKEN);

    this.props.callApitoAcceptProject(
      userId,
      tokenDetail,
      this.fetchParticipantsSingleId(value.participants),
      value.id
    );
  };
  handleRejectButton = async (value) => {
    const {
      profile: { profileData = {} },
    } = this.props;
    Analytics.logEvent(`Projects_pendingCard_Decline`, {
      contentType: "Pending",
      userId: profileData?.id,
      displayName: profileData?.displayName,
      isCreator: profileData?.isCreator,
    });
    const userId = await AsyncStorage.getItem(STORAGE_KEY.USER_ID);
    const tokenDetail = await AsyncStorage.getItem(STORAGE_KEY.ACCESS_TOKEN);
    this.props.callApitoRejectProject(
      userId,
      tokenDetail,
      this.fetchParticipantsSingleId(value.participants),
      value.id,
      true
    );
  };
  renderInnerToggle = (isChat, text, isOngoing) => {
    const { circleDataPending = [], loading } = this.props.circle;
    return (
      <View style={styles.innerToggleContainer}>
        {text?.map((item, index) => {
          return (
            <TouchableWithoutFeedback
              key={index}
              onPress={() => {
                this.setState({
                  activeSection: item,
                });
                !isOngoing
                  ? this.handleInnerToggleSwitchArchived(item)
                  : this.handleInnerToggleSwitch();
              }}
            >
              <View
                style={{
                  // marginLeft: RFValue(16, 844),
                  width: text?.length == 3 ? "33%" : "50%",
                  borderBottomWidth: 1.5,
                  paddingHorizontal: 12,
                  borderBottomColor:
                    this.state.activeSection == item
                      ? COLORS.monoBlack500
                      : COLORS.monoWhite900,
                  paddingVertical: RFValue(12, 844),
                  alignItems: "center",
                  justifyContent: "center",
                  flexDirection: "row",
                }}
              >
                {item == "Pending" ? (
                  <View style={styles.greenCircle}>
                    <Text style={styles.greenCircleText}>
                      {circleDataPending?.length || 0}
                    </Text>
                  </View>
                ) : null}
                {isOngoing && index == 0 ? (
                  <View
                    style={{
                      backgroundColor: COLORS.monoGhost500,
                      height: RFValue(28, 844),
                      width: RFValue(28, 844),
                      borderRadius: RFValue(20, 844),
                      alignItems: "center",
                      justifyContent: "center",
                      marginRight: 8,
                    }}
                  >
                    <SvgUri
                      svgXmlData={SVGS.MESSAGE_ICON_BLACK}
                      width={RFValue(14, 844)}
                      height={RFValue(14, 844)}
                    />
                  </View>
                ) : isOngoing && index == 1 ? (
                  <View
                    style={{
                      backgroundColor: COLORS.monoGhost500,
                      height: RFValue(28, 844),
                      width: RFValue(28, 844),
                      borderRadius: RFValue(20, 844),
                      alignItems: "center",
                      justifyContent: "center",
                      marginRight: 8,
                    }}
                  >
                    <SvgUri
                      svgXmlData={SVGS.EDIT_BLACK}
                      width={RFValue(14, 844)}
                      height={RFValue(14, 844)}
                    />
                  </View>
                ) : null}
                <Text
                  style={{
                    color:
                      this.state.activeSection == item
                        ? COLORS.monoBlack900
                        : COLORS.monoBlack500,
                    fontSize:
                      this.state.activeSection == item
                        ? RFValue(16, 844)
                        : RFValue(16, 844),
                    fontFamily: "Poppins_500Medium",
                    marginRight: isOngoing && index == 1 ? 12 : 0,
                  }}
                >
                  {item}
                </Text>
              </View>
            </TouchableWithoutFeedback>
          );
        })}
      </View>
    );
  };
  PendingProjectScreen = () => {
    const { loading, pendingProjectsData = [], error } = this.props.projects;
    const { acceptloading, rejectloading } = this.props.projectAction;
    const {
      profile: { profileData = {} },
    } = this.props;
    return loading ? (
      error ? (
        <NothingHere
          text="Nothing Here! Comeback later 👋"
          image={IMAGES.NoPending}
        />
      ) : (
        this.Pageloader()
      )
    ) : (
      <View style={{ backgroundColor: COLORS.monoWhite900, height: "100%" }}>
        <ScrollView style={{ marginBottom: 200 }}>
          {pendingProjectsData?.projectList &&
          pendingProjectsData?.projectList?.length > 0 ? (
            pendingProjectsData?.projectList?.map((value, index) => {
              return (
                <PendingCard
                  title={value.name}
                  profileName={this.fetchParticipantsSingle(value.participants)}
                  key={index}
                  date={value?.sentOn}
                  read={value?.isRead}
                  onPress={() => {
                    Analytics.logEvent("screen_view", {
                      firebase_screen: "PendingPage",
                      userId: profileData?.id,
                      displayName: profileData?.displayName,
                      isCreator: profileData?.isCreator,
                    });
                    this.props.navigation.navigate("PendingPage", {
                      data: value,
                      id: value?.id,
                      identity: 1,
                      isPending: true,
                      sentSection: ENUM.PENDING,
                      recieverId: this.fetchParticipantsSingleId(
                        value.participants
                      ),
                    });
                  }}
                  showProfile={true}
                  image={this.fetchParticipantsImage(value.participants)}
                  mainCategory={
                    value?.type
                      ? value?.type?.toLowerCase() === "collaboration"
                        ? "Project"
                        : value?.type?.toLowerCase()
                      : value.type?.toLowerCase()
                  }
                  subCategory={value.priceDetails?.entityType?.toLowerCase()}
                  subtitleText={value?.description}
                  onClickButton1={() => this.handleAcceptButton(value)}
                  onClickButton2={() => this.handleRejectButton(value)}
                  // loadingButton1={acceptloading}
                  loadingButton2={rejectloading}
                  button1="Accept"
                  button2="Decline"
                />
              );
            })
          ) : (
            <NothingHere
              text="Nothing Here! Comeback later 👋"
              image={IMAGES.NoPending}
            />
          )}
        </ScrollView>
      </View>
    );
  };
  LoaderCard = (borderWidth, borderRadius, marginTop) => {
    return (
      <View
        style={[
          styles.onGoingLoaderContainer,
          {
            borderBottomWidth: borderWidth ? borderWidth : 2,
            borderRadius: borderRadius,
            marginTop: marginTop,
          },
        ]}
      >
        <View>
          <Skeleton
            styles={{
              width: RFValue(64, 844),
              height: RFValue(64, 844),
              borderRadius: RFValue(36, 844),
            }}
          />
        </View>
        <View style={styles.loaderInnerView}>
          <Skeleton
            styles={{
              height: RFValue(16, 844),
              width: "100%",
              borderRadius: RFValue(12, 844),
            }}
          />
          <Skeleton
            styles={{
              marginTop: RFValue(16, 844),
              height: RFValue(16, 844),
              width: "50%",
              borderRadius: RFValue(12, 844),
            }}
          />
        </View>
      </View>
    );
  };
  OngoingLoader = () => {
    return (
      <View>
        {this.LoaderCard()}
        {this.LoaderCard()}
        {this.LoaderCard()}
        {this.LoaderCard()}
        {this.LoaderCard()}
        {this.LoaderCard()}
        {this.LoaderCard()}
        {this.LoaderCard()}
      </View>
    );
  };

  OngoingProjectScreen = () => {
    const { loading, projectsData = [], error } = this.props.projects;
    if (!this.state.isOngoing) {
      this.setState({
        isOngoing: true,
        toggleValues: ["Conversations", "Opportunities"],
      });
    }
    return loading ? (
      error ? (
        <NothingHere
          text="Nothing Here! Comeback later 👋"
          image={IMAGES.NoPending}
        />
      ) : (
        this.OngoingLoader()
      )
    ) : (
      <ScrollView style={{ height: "100%", marginBottom: 100, marginTop: 8 }}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{ backgroundColor: COLORS.monoWhite900 }}
        >
          <ChatRoom
            isChatActive={this.state.isChatActive}
            isSearchActive={
              typeof this.state.searchText === "undefined" ||
              this.state.searchText === ""
            }
            onPress={() => {
              this.setState({
                activeTab: 3,
                activeSection: "Pending",
              });
            }}
            isFocused={this.props.isFocused}
          />
        </ScrollView>
      </ScrollView>
    );
  };
  handleIsSavedClicked = async (item) => {
    const { savedArray = [] } = this.props.saved;

    let array = savedArray;
    const userId = await AsyncStorage.getItem(STORAGE_KEY.USER_ID);
    const tokenDetail = await AsyncStorage.getItem(STORAGE_KEY.ACCESS_TOKEN);
    const saveEntity = "USER";
    let params = {
      userId: userId,
      entityId: item.id,
      saveEntity: saveEntity,
    };
    let response = await makePostApiCall(
      URLS.API_SAVE_ENTITY(item.id),
      {},
      tokenDetail,
      params
    );
    if (typeof response.status !== "undefined" && response.status) {
      if (array.some((data) => data.id === item.id)) {
        // let index = array.indexOf(item);
        let index = array
          ?.map(function (e) {
            return e.id;
          })
          .indexOf(item?.id);
        array.splice(index, 1);
        this.props.setSavedArray([...array]);
      } else {
        array.push(item);
        this.props.setSavedArray([...array]);
      }
    } else {
      alert("error>>" + JSON.stringify(response.message));
    }
  };
  filterUser = (value) => {
    let user = value;
    if (value?.participants) {
      value?.participants?.map((participant, index) => {
        if (participant.id != this.state.userId) {
          user = participant;
        }
      });
    } else {
      user = value;
    }

    return user;
  };
  checkIsSaved = (item) => {
    const { savedArray = [] } = this.props.saved;
    return savedArray.some((data) => data.id === item.id);
  };
  uncircleModal = () => {
    return (
      <Modal
        visible={this.state.showUncircleModal}
        transparent={true}
        animationType="fade"
      >
        <TouchableWithoutFeedback
          onPress={() => {
            this.setState({
              showUncircleModal: false,
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
            <TouchableWithoutFeedback
              onPress={() => {
                this.handleDeleteCircleRequest(this.state.deleteId);
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
                  Uncircle
                </Text>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    );
  };
  CircleProjectScreen = () => {
    const {
      loading,
      circleData = [],
      circleDataPending = [],
      circleDataSent = [],
      error,
    } = this.props.circle;

    if (this.state.isOngoing) {
      this.setState({
        isOngoing: false,
        toggleValues: ["My Circle", "Pending", "Sent"],
      });
    }
    return loading ? (
      error ? (
        <NothingHere
          text="Nothing Here! Comeback later 👋"
          image={IMAGES.NoPending}
        />
      ) : (
        <View
          style={{ height: "100%", backgroundColor: COLORS.monoWhite900 }}
        ></View>
      )
    ) : (
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ backgroundColor: COLORS.monoWhite900, height: "100%" }}
      >
        {this.state.activeSection === "Pending" ? (
          circleDataPending && circleDataPending?.length > 0 ? (
            circleDataPending?.map((value, index) => {
              return (
                <CircleCard
                  onPress={() => {
                    this.props.navigation.navigate(
                      !value?.isCreator ? "BrandProfile" : "CreatorProfile",
                      {
                        selfView: false,
                        userId: value.id,
                      }
                    );
                  }}
                  showUncircle={this.state.activeSection == "My Circle"}
                  uncirclePress={() => {
                    this.handleDeleteCircleRequest(value.id);
                  }}
                  inCircle={this.state.activeSection == "My Circle"}
                  pending={this.state.activeSection == "Pending"}
                  cross={this.state.activeSection != "My Circle"}
                  onPressCross={() => {
                    this.handleDeleteCircleRequest(value.id);
                  }}
                  // bio={value.bio}
                  onPressCheck={() => this.handleAcceptCircle(value)}
                  isAdmin={!value?.isCreator}
                  // isAdmin={index % 2 === 0}
                  userData={value}
                  key={index}
                  isSaved={this.checkIsSaved(value)}
                  onPressSaved={() => this.handleIsSavedClicked(value)}
                />
              );
            })
          ) : (
            <NothingHere
              text="Nothing Here! Comeback later 👋"
              image={IMAGES.NoPending}
            />
          )
        ) : this.state.activeSection === "Sent" ? (
          circleDataSent && circleDataSent?.length > 0 ? (
            circleDataSent?.map((value, index) => {
              return (
                <CircleCard
                  onPress={() => {
                    this.props.navigation.navigate(
                      !value?.isCreator ? "BrandProfile" : "CreatorProfile",
                      {
                        selfView: false,
                        userId: value.id,
                      }
                    );
                  }}
                  showUncircle={this.state.activeSection == "My Circle"}
                  uncirclePress={() => {
                    this.handleDeleteCircleRequest(value.id, true);
                  }}
                  inCircle={this.state.activeSection == "My Circle"}
                  pending={this.state.activeSection == "Pending"}
                  cross={this.state.activeSection != "My Circle"}
                  onPressCross={() => {
                    this.handleDeleteCircleRequest(value.id, true);
                  }}
                  // bio={value.bio}
                  onPressCheck={() => this.handleAcceptCircle(value)}
                  isAdmin={!value?.isCreator}
                  // isAdmin={index % 2 === 0}
                  userData={value}
                  key={index}
                  isSaved={this.checkIsSaved(value)}
                  onPressSaved={() => this.handleIsSavedClicked(value)}
                />
              );
            })
          ) : (
            <NothingHere
              text="Nothing Here! Comeback later 👋"
              image={IMAGES.NoPending}
            />
          )
        ) : circleData && circleData?.length > 0 ? (
          circleData?.map((value, index) => {
            return (
              <CircleCard
                onPress={() => {
                  this.props.navigation.navigate(
                    !value?.isCreator ? "BrandProfile" : "CreatorProfile",
                    {
                      selfView: false,
                      userId: value.id,
                    }
                  );
                }}
                showUncircle={this.state.activeSection == "My Circle"}
                uncirclePress={() => {
                  this.handleDeleteCircleRequest(value.id);
                }}
                inCircle={this.state.activeSection == "My Circle"}
                pending={this.state.activeSection == "Pending"}
                cross={this.state.activeSection != "My Circle"}
                onPressCross={() => {
                  this.handleDeleteCircleRequest(value.id);
                }}
                // bio={value.bio}
                onPressCheck={() => this.handleAcceptCircle(value)}
                isAdmin={!value?.isCreator}
                // isAdmin={index % 2 === 0}
                userData={this.filterUser(value)}
                key={index}
                isSaved={this.checkIsSaved(value)}
                onPressSaved={() => this.handleIsSavedClicked(value)}
              />
            );
          })
        ) : (
          <NothingHere
            text="Nothing Here! Comeback later 👋"
            image={IMAGES.NoPending}
          />
        )}
      </ScrollView>
    );
  };
  handleFilter = async (event) => {
    this.setState({ searchText: event });
    const { activeTab } = this.state;
    const userId = await AsyncStorage.getItem(STORAGE_KEY.USER_ID);
    const tokenDetail = await AsyncStorage.getItem(STORAGE_KEY.ACCESS_TOKEN);
    if (activeTab === 1) {
      this.props.callPendingprojectApi(userId, tokenDetail, "PENDING", event);
    }
    if (activeTab === 2) {
      this.props.callSentprojectApi(userId, tokenDetail, "SENT", event);
    }
    if (activeTab === 0) {
      this.props.callprojectApi(
        userId,
        tokenDetail,
        ENUM.ONGOING,
        this.state.searchText
      );
    }
    if (activeTab === 3) {
      const requestParam = {
        id: userId,
        key: this.state.searchText,
      };
      this.props.getCircleSearchApi(requestParam, tokenDetail);
    }
  };
  searchProject = async () => {
    const { activeTab } = this.state;
    const userId = await AsyncStorage.getItem(STORAGE_KEY.USER_ID);
    const tokenDetail = await AsyncStorage.getItem(STORAGE_KEY.ACCESS_TOKEN);
    if (activeTab === 1) {
      this.props.callPendingprojectApi(
        userId,
        tokenDetail,
        "PENDING",
        this.state.searchText
      );
    }
    if (activeTab === 2) {
      this.props.callSentprojectApi(
        userId,
        tokenDetail,
        "SENT",
        this.state.searchText
      );
    }
  };
  renderInput = () => {
    const { activeTab } = this.state;
    const {
      profile: { profileData = {} },
    } = this.props;
    return (
      <SearchBarWithFilter
        enableInput={true}
        onChangeText={this.handleFilter}
        returnKeyType="search"
        onSubmitEditing={this.searchProject}
        onFocus={() => {
          Analytics.logEvent(`Projects_SearchBar`, {
            contentType: "search",
            userId: profileData?.id,
            displayName: profileData?.displayName,
            isCreator: profileData?.isCreator,
          });
        }}
      />
    );
    // activeTab === 0 ? (
    //   <SearchBarWithFilter
    //     onPress={() => {
    //       this.props.navigation.navigate("Search");
    //     }}
    //   />
    // ) :
  };
  renderCategoryTab = () => {
    const {
      sentProjectsData = [],
      pendingProjectsData = [],
      projectsData = [],
      loading,
    } = this.props.projects;
    const { circleDataPending = [] } = this.props.circle;
    return (
      <View style={[styles.categoryTab, { marginTop: RFValue(16, 844) }]}>
        {this.state.categories?.map((value, index) => {
          return (
            <TouchableWithoutFeedback
              onPress={() => this.handleChangeToggle(value)}
            >
              <View
                key={index}
                style={[
                  styles.categorybutton,
                  {
                    shadowOpacity:
                      this.state.activeTab == value.value ? 0.1 : 0,
                    backgroundColor:
                      this.state.activeTab == value.value
                        ? COLORS.monoBlack900
                        : COLORS.monoWhite900,
                  },
                ]}
              >
                {index === 1 &&
                pendingProjectsData?.totalCount !== 0 &&
                typeof pendingProjectsData?.totalCount !== "undefined" &&
                this.state.activeTab != value.value ? (
                  <View style={styles.greenCircle}>
                    <Text style={styles.greenCircleText}>
                      {pendingProjectsData?.totalCount}
                    </Text>
                  </View>
                ) : null}

                <Text
                  style={[
                    styles.categoryText,
                    {
                      color:
                        this.state.activeTab == value.value
                          ? COLORS.monoWhite900
                          : COLORS.monoBlack500,
                    },
                  ]}
                >
                  {value.title}
                </Text>
              </View>
            </TouchableWithoutFeedback>
          );
        })}
      </View>
    );
  };
  renderCircleRequestCard = () => {
    return (
      <TouchableWithoutFeedback
        onPress={() => {
          this.setState({
            circleRequestVisible: !this.state.circleRequestVisible,
          });
        }}
      >
        <View style={styles.requestCard}>
          <View style={styles.cardTextWrapper}>
            <Text style={styles.requestCardText}>
              {this.state.circleRequestVisible ? "Circle" : "Circle Request"}
            </Text>

            {this.state.circleRequestVisible ? null : (
              <View style={styles.chatNumber}>
                <Text
                  style={{
                    color: COLORS.monoWhite900,
                    fontSize: RFValue(12, 844),
                  }}
                >
                  4
                </Text>
              </View>
            )}
          </View>
          <Icon
            name={
              this.state.circleRequestVisible ? "chevron-left" : "chevron-right"
            }
            type="feather"
            size={20}
            color={COLORS.monoBlack900}
          />
        </View>
      </TouchableWithoutFeedback>
    );
  };
  renderTabs = () => {
    const { activeTab, activeSection } = this.state;

    return (
      <View
        style={{
          marginTop: 16,
          // paddingHorizontal: activeTab === 0 ,
          backgroundColor: COLORS.monoWhite900,
        }}
      >
        {/* {activeTab === 0 || activeTab === 3
          ? this.renderInnerToggle(
              this.state.isChatActive,
              this.state.toggleValues,
              this.state.isOngoing
            )
          : null} */}
        <View style={{ height: "100%" }}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={{ height: "100%" }}
            refreshControl={
              <RefreshControl refreshing={this.state.refreshing} onRefresh={this.onRefresh} />
            }
          >
            {activeTab === 0 && this.OngoingProjectScreen()}
            {activeTab === 1 && this.PendingProjectScreen()}
            {activeTab === 2 && this.SentProjectScreen()}
            {activeTab === 3 && this.CircleProjectScreen()}
          </ScrollView>
        </View>
      </View>
    );
  };
  render() {
    const {
      acceptResponse = [],
      acceptSuccess,
      circleData = [],
    } = this.props.circle;
    const { accepterror, accepterrorMsg, withdrawerror, withdrawerrorMsg } =
      this.props.projectAction;

    const { loading, projectsData = [], error } = this.props.projects;
    return (
      <View>
        {/* <TouchableOpacity
          onPress={() => {
            this.props?.navigation.navigate("Discover");
          }}
        >
          <View>
            <Text>BUTTON</Text>
          </View>
        </TouchableOpacity> */}
        {accepterror && (
          <SnackBar
            visible={accepterror || withdrawerror}
            onDismiss={() => {
              this.props.callAcceptProjectResetReducer();
            }}
            text={accepterrorMsg || withdrawerrorMsg}
          />
        )}
        <View style={{ justifyContent: "flex-end" }}>
          {this.renderWithdrawModal()}
          {this.uncircleModal()}
          <View style={styles.wrapper}>
            <View style={{ paddingHorizontal: RFValue(16, 844) }}>
              <Header />
              <View style={{ zIndex: 1 }}>{this.renderInput()}</View>
              {this.renderCategoryTab()}
            </View>
            <View style={{ paddingBottom: RFValue(32, 844) }}>
              {this.renderTabs()}
            </View>
          </View>
          <BottomNavBar activeTab="Messages" />
        </View>
      </View>
      // <ChatRoom/>
    );
  }
}
const mapStateToProps = (state) => {
  const { projects, projectAction, circle, saved, profile } = state;
  return { projects, projectAction, circle, saved, profile };
};

const mapDispatchToProps = (dispatch) => {
  return {
    callprojectApi: (userId, tokenDetail, listType, name) => {
      dispatch({
        type: projectTypes.GET_PROJECT_LIST,
        userId,
        tokenDetail,
        listType,
        name,
      });
    },
    callSentprojectApi: (userId, tokenDetail, listType, name) => {
      dispatch({
        type: projectTypes.GET_SENT_PROJECT_LIST,
        userId,
        tokenDetail,
        listType,
        name,
      });
    },
    callPendingprojectApi: (userId, tokenDetail, listType, name) => {
      dispatch({
        type: projectTypes.GET_PENDING_PROJECT_LIST,
        userId,
        tokenDetail,
        listType,
        name,
      });
    },
    callprojectSchedularApi: (userId, tokenDetail, listType, name) => {
      dispatch({
        type: projectTypes.GET_PROJECT_SCHEDULAR_LIST,
        userId,
        tokenDetail,
        listType,
        name,
      });
    },
    callApitoAcceptProject: (userId, tokenDetail, senderUserId, projectId) => {
      dispatch({
        type: projectActionTypes.ACCEPT_PROJECT,
        userId,
        tokenDetail,
        senderUserId,
        projectId,
      });
    },
    callApitoRejectProject: (
      userId,
      tokenDetail,
      senderUserId,
      projectId,
      isReject
    ) => {
      dispatch({
        type: projectActionTypes.ACCEPT_PROJECT,
        userId,
        tokenDetail,
        senderUserId,
        projectId,
        isReject,
      });
    },
    callApitoWithdrawProject: (
      userId,
      tokenDetail,
      projectId,
      receiverUserId,
      listType
    ) => {
      dispatch({
        type: projectActionTypes.WITHDRAW_PROJECT,
        userId,
        tokenDetail,
        projectId,
        receiverUserId,
        listType,
      });
    },
    callAcceptProjectResetReducer: () => {
      dispatch({ type: projectActionTypes.RESET_ACCEPT_PROJECT });
    },
    getCircleApi: (requestParam, tokenDetail) => {
      dispatch({
        type: circleTypes.GET_CIRCLE_DATA,
        requestParam,
        tokenDetail,
      });
    },
    getCircleSearchApi: (requestParam, tokenDetail, searchText) => {
      dispatch({
        type: circleTypes.GET_CIRCLE_SEARCH_DATA,
        requestParam,
        tokenDetail,
        searchText,
      });
    },
    deleteCircleApi: (requestParam, tokenDetail, isSent) => {
      dispatch({
        type: circleTypes.DELETE_CIRCLE_DATA,
        requestParam,
        tokenDetail,
        isSent,
      });
    },
    setSavedArray: (savedData) => {
      dispatch({ type: savedTypes.SET_USER_SAVED_REDUCER, savedData });
    },
    resetSuccess: () => {
      dispatch({
        type: circleTypes.RESET_SUCCESS,
      });
    },
    acceptCircleApi: (requestParam, tokenDetail) => {
      dispatch({
        type: circleTypes.ACCEPT_CIRCLE_DATA,
        requestParam,
        tokenDetail,
      });
    },
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(function (props) {
  const isFocused = useIsFocused();

  return <Projects {...props} isFocused={isFocused} />;
});
