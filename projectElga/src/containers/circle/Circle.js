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
import NearBy from "./NearBy";
import { useIsFocused, useNavigation } from "@react-navigation/native";
class Circle extends Component {
  constructor() {
    super();
    this.state = {
      actionMenuVisible: false,
      activeTab: 3,
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
        { title: "Circle", value: 3 },
      ],
      activeSection: "My Circle",
      withdrawId: "",
      withdrawReciverId: "",
      userId: "",
      circleRequest: false,
    };
  }
  async callApiForProject() {
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

    this.props.getCircleApi(requestParam, tokenDetail);
  }

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
    this.props.getCircleApi(requestParam, tokenDetail);
    // }

    this.setState({ isChatActive: !this.state.isChatActive });
  };

  async componentDidMount() {
    const { route, navigation } = this.props;
    const { params = {} } = route;
    const userId = await AsyncStorage.getItem(STORAGE_KEY.USER_ID);
    this.setState({
      userId: userId,
    });

    this.callApiForProject();
  }
  // Defining the componentWillUnmount method
  componentWillUnmount() {
    this.props.resetCircle();
  }
  handleOnPressMessage = (id) => {
    const { projectsData = [] } = this.props.projects;
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
  async componentWillReceiveProps(nextProps, nextState) {
    const userId = await AsyncStorage.getItem(STORAGE_KEY.USER_ID);
    const tokenDetail = await AsyncStorage.getItem(STORAGE_KEY.ACCESS_TOKEN);

    const { acceptResponse = [], acceptSuccess } = nextProps.circle;
    const { profileData } = nextProps.profile;

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
  }
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
                this.handleInnerToggleSwitchArchived(item);
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
  renderLoader = () => {
    return (
      <View>
        {this.LoaderCard()}
        {this.LoaderCard()}
        {this.LoaderCard()}
      </View>
    );
  };
  CircleProjectScreen = () => {
    const {
      loading = true,
      circleData = [],
      circleDataPending = [],
      circleDataSent = [],
      error = false,
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
          text="Add People to your Creative Circle 👋"
          image={IMAGES.CircleNotFound}
        />
      ) : (
        <View style={{ height: "100%", backgroundColor: COLORS.monoWhite900 }}>
          {this.renderLoader()}
        </View>
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
                />
              );
            })
          ) : (
            <NothingHere
              text="Add People to your Creative Circle 👋"
              image={IMAGES.CircleNotFound}
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
                />
              );
            })
          ) : (
            <NothingHere
              text="Add People to your Creative Circle 👋"
              image={IMAGES.CircleNotFound}
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
                onPressMessage={() => this.handleOnPressMessage(value.id)}
                userData={this.filterUser(value)}
                key={index}
              />
            );
          })
        ) : (
          <NearBy isFocused={this.props.isFocused} />
        )}
      </ScrollView>
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
    return (
      <View
        style={{
          marginTop: 12,
          backgroundColor: COLORS.monoWhite900,
        }}
      >
        {this.renderInnerToggle(
          this.state.isChatActive,
          this.state.toggleValues,
          this.state.isOngoing
        )}
        <View style={{ height: "100%" }}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={{ marginBottom: RFValue(200, 844) }}
          >
            {this.CircleProjectScreen()}
          </ScrollView>
        </View>
      </View>
    );
  };
  render() {
    return (
      <View>
        <View style={styles.wrapper}>
          {this.uncircleModal()}
          <View style={{ paddingHorizontal: RFValue(16, 844) }}>
            <Header />
          </View>
          <View >
            {this.renderTabs()}
          </View>
        </View>
        <BottomNavBar activeTab="Circle" />
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
    resetSuccess: () => {
      dispatch({
        type: circleTypes.RESET_SUCCESS,
      });
    },
    resetCircle: () => {
      dispatch({
        type: circleTypes.RESET_CIRCLE_DATA,
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
  const navigation = useNavigation();

  return <Circle {...props} isFocused={isFocused} navigation={navigation} />;
});
