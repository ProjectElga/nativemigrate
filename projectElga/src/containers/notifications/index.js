import React, { Component } from "react";
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import ProfileHeader from "../../components/multicellular/profile/header/header";
import NOTIFICATIONS from "../../assets/jsons/projects/notifications";
import IMAGES from "../../themes/Images";
import { RFValue } from "react-native-responsive-fontsize";
import COLORS from "../../themes/colors";
import SCREENSIZE from "../../constants/ScreenSize";
import BottomNavBar from "../../components/multicellular/general/bottomNavBar/bottomNavBar";
import SVGS from "../../constants/SvgUri";
import Header from "../../components/multicellular/discover/header";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { connect } from "react-redux";

import AsyncStorage from "@react-native-async-storage/async-storage";
import STORAGE_KEY from "../../constants/StorageKeys";
import { notificationTypes } from "../../reducers/notifications/notification";
import moment from "moment";
import STRINGS from "../../constants/Strings";
import ENUM from "../../constants/Enum";
import { projectTypes } from "../../reducers/projects/projects";
import NothingHere from "../../components/multicellular/general/nothingHere/nothingHere";
class Notifications extends Component {
  constructor() {
    super();
    this.state = {
      colors: ["#52CCB3", "#EA4335", "#1877F2", "#1F9980", "#7B61FF"],
    };
  }
  //  componentWillReceiveProps=async(nextProps, nextState)=> {
  //   const { notificationData = [] } = nextProps.notification;
  //   const userId = await AsyncStorage.getItem(STORAGE_KEY.USER_ID);
  //   const tokenDetail = await AsyncStorage.getItem(STORAGE_KEY.ACCESS_TOKEN);
  //   const requestParam = {
  //     id: userId,
  //     //ommentType:"USER",
  //   };
  //   this.props.callNotificationApi(requestParam, tokenDetail);

  //   console.log("notificationData", notificationData);
  // };
  componentDidMount = async () => {
    const userId = await AsyncStorage.getItem(STORAGE_KEY.USER_ID);
    const tokenDetail = await AsyncStorage.getItem(STORAGE_KEY.ACCESS_TOKEN);
    const requestParam = {
      id: userId,
      isRead: true,
      recordOffset: 0,
      recordPerPage: 100,
    };
    this.props.callNotificationApi(requestParam, tokenDetail);
    this.props.callprojectApi(userId, tokenDetail, ENUM.ONGOING);
    this.props.callPendingprojectApi(userId, tokenDetail, ENUM.PENDING);
  };
  getDate = (date) => {
    let dt;
    if (moment().tz("Asia/kolkata").isSame(date, "day")) {
      dt = moment(date).tz("Asia/kolkata").format("hh:mm a");
    } else {
      if (moment().tz("Asia/kolkata").diff(date, "days") === -1) {
        dt = STRINGS.YESTERDAY;
      } else {
        if (!moment().tz("Asia/kolkata").isSame(date, "year")) {
          dt = moment(date)
            .tz("Asia/kolkata")
            .format(STRINGS.DATE_FORMAT_WITH_YEAR);
        } else {
          dt = moment(date).tz("Asia/kolkata").format("DD MMM");
        }
      }
    }
    return dt;
  };
  getMessage = (item) => {
    let msg = "";
    if (item?.entityType == "CIRCLE" && item?.entityStatus == "ACCEPTED") {
      msg = `${item.profile.displayName} has accepted your Circle Request`;
    }
    if (item?.entityType == "CIRCLE" && item?.entityStatus == "PENDING") {
      msg = `${item.profile.displayName} wants to add you to their Circle`;
    }
    if (
      item?.entityType == "COLLABORATION" &&
      item?.entityStatus == "ACCEPTED"
    ) {
      msg = `${item.profile.displayName} has accepted your Project Request`;
    }
    if (
      item?.entityType == "COLLABORATION" &&
      item?.entityStatus == "PENDING"
    ) {
      msg = `${item.profile.displayName} has sent a Project Request`;
    }
    if (
      item?.entityType == "COLLABORATION" &&
      item?.entityStatus == "CITATION"
    ) {
      msg = `${item.profile.displayName} is following up on their Project Request`;
    }
    if (item?.entityType == "USER" && item?.entityStatus == "CITATION") {
      msg = `${item.profile.displayName} has left a Citation on your profile`;
    }
    if (
      item?.entityStatus === "CIRCLE" &&
      item?.entityType === "COLLABORATION"
    ) {
      msg = `${item.profile.displayName} has initiated a Project with you.`;
    }
    return msg;
  };
  handleOnPress = (item) => {
    let msg = "";
    if (item?.entityType == "CIRCLE" && item?.entityStatus == "ACCEPTED") {
      this.handleOnPressMessage(item?.profile?.id);
    }
    if (item?.entityType == "CIRCLE" && item?.entityStatus == "PENDING") {
      this.props.navigation.navigate(
        !item?.profile?.isCreator ? "BrandProfile" : "CreatorProfile",
        {
          selfView: false,
          userId: item?.profile?.id,
        }
      );
    }
    if (
      item?.entityType == "COLLABORATION" &&
      item?.entityStatus == "ACCEPTED"
    ) {
      this.handleOnPressProject(item?.entityId);
    }
    if (
      item?.entityType == "COLLABORATION" &&
      item?.entityStatus == "PENDING"
    ) {
      this.handleOnPressPending(item?.entityId);
    }
    if (
      item?.entityType == "COLLABORATION" &&
      item?.entityStatus == "CITATION"
    ) {
      msg = `${item.profile.displayName} has left a comment `;
    }
    if (item?.entityType == "USER" && item?.entityStatus == "CITATION") {
      this.props.navigation.navigate("Profile");
    }

    return msg;
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

  handleOnPressPending = (id) => {
    const { loading, pendingProjectsData = [], error } = this.props.projects;
    console.log("pendingProjectsData", pendingProjectsData);
    console.log("id", id);

    pendingProjectsData?.projectList &&
      pendingProjectsData?.projectList.length > 0 &&
      pendingProjectsData?.projectList?.map((value, index) => {
        if (value.id == id) {
          console.log("projectId", value.id);
          this.props.navigation.navigate("PendingPage", {
            data: value,
            id: value?.id,
            identity: 1,
            isPending: true,
            sentSection: ENUM.PENDING,
            recieverId: this.fetchParticipantsSingleId(value.participants),
          });
        }
      });
  };
  handleOnPressMessage = (id) => {
    const { loading, projectsData = [], error } = this.props.projects;
    projectsData?.projectList &&
      projectsData?.projectList.length > 0 &&
      projectsData?.projectList?.map((value, index) => {
        if (value?.type == "CIRCLE" && value?.participants[0]?.id == id) {
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
  handleOnPressProject = (id) => {
    const { loading, projectsData = [], error } = this.props.projects;

    projectsData?.projectList &&
      projectsData?.projectList.length > 0 &&
      projectsData?.projectList?.map((value, index) => {
        if (value?.type == "COLLABORATION" && value?.id == id) {
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
  handleThumbnail = (item) => {
    try {
      return (
        <Image
          source={item}
          style={{
            width: RFValue(56, 844),
            height: RFValue(56, 844),
            resizeMode: "contain",
          }}
        />
      );
    } catch (e) {
      return <SvgUri width={20} height={20} svgXmlData={item} zindex />;
    }
  };
  render() {
    const { notificationData = [] } = this.props.notification;
    const colors = this.state.colors;
    return (
      <BottomSheetModalProvider>
        <View>
          <View style={styles.wrapper}>
            <Header
              dontShow={true}
              isDetail={true}
              pageTitle="Notifications"
              onPressBack={() => {
                this.props.navigation.goBack(null);
              }}
              noBell={true}
            />
            <ScrollView
              showsVerticalScrollIndicator={false}
              overScrollMode="never"
            >
              <View
                style={{
                  //marginTop: RFValue(8, 844),
                  paddingBottom: RFValue(24, 844),
                }}
              >
                {notificationData && notificationData?.length > 0 ? (
                  notificationData.map((item, index) => {
                    return (
                      <View
                        key={index}
                        style={{
                          paddingVertical: RFValue(16, 844),
                          borderBottomWidth: 1,
                          borderBottomColor: COLORS.monoGhost500,
                          flexDirection: "row",
                          alignItems: "center",
                        }}
                      >
                        <TouchableOpacity
                          onPress={() => {
                            this.props.navigation.navigate(
                              !item?.profile?.isCreator
                                ? "BrandProfile"
                                : "CreatorProfile",
                              {
                                selfView: false,
                                userId: item?.profile?.id,
                              }
                            );
                          }}
                          style={{
                            //marginTop: RFValue(8, 844),
                            width: "15%",
                          }}
                        >
                          <View
                            style={{
                              width: RFValue(56, 844),
                              height: RFValue(56, 844),
                              borderRadius: RFValue(28, 844),

                              justifyContent: "center",
                              alignItems: "center",
                            }}
                          >
                            <Image
                              source={{ uri: item?.profile?.profileImageUrl }}
                              style={{
                                width: RFValue(56, 844),
                                height: RFValue(56, 844),
                                borderRadius: RFValue(28, 844),
                                resizeMode: "contain",
                              }}
                            />
                          </View>
                        </TouchableOpacity>
                        <TouchableOpacity
                          onPress={() => {
                            this.handleOnPress(item);
                          }}
                          style={{
                            //marginTop: RFValue(8, 844),
                            width: "85%",
                          }}
                        >
                          <View
                            style={{
                              paddingLeft: RFValue(16, 844),
                            }}
                          >
                            {/* <Text
                          style={{
                            fontFamily: "Poppins_500Medium",
                            fontSize: RFValue(12, 844),
                            color: COLORS.monoBlack700,
                          }}
                        >
                          {item.entityType=="COLLABORATION"}
                        </Text> */}
                            <Text
                              numberOfLines={2}
                              style={{
                                fontFamily: "Poppins_500Medium",
                                fontSize: RFValue(14, 844),
                                color: COLORS.monoBlack700,
                              }}
                            >
                              {this.getMessage(item)}
                            </Text>
                            <Text
                              style={{
                                fontFamily: "Poppins_400Regular",
                                fontSize: RFValue(14, 844),
                                color: COLORS.monoBlack500,
                                marginTop: 8,
                              }}
                            >
                              {this.getDate(item.createdOn)}
                            </Text>
                          </View>
                        </TouchableOpacity>
                      </View>
                    );
                  })
                ) : (
                  <NothingHere
                    text="Yet to hear from Someone, Come back later!!"
                    image={IMAGES.airport}
                  />
                )}
              </View>
            </ScrollView>
          </View>
          <BottomNavBar />
        </View>
      </BottomSheetModalProvider>
    );
  }
}
const styles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: RFValue(16, 844),
    paddingTop: RFValue(40, 844),
    backgroundColor: COLORS.monoWhite900,
    height: SCREENSIZE.ScreenHeightViewPort,
    width: "100%",
  },
});

const mapStateToProps = (state) => {
  const { notification, projects } = state;
  return { notification, projects };
};

const mapDispatchToProps = (dispatch) => {
  return {
    callNotificationApi: (requestParam, tokenDetail) => {
      dispatch({
        type: notificationTypes.GET_NOTIFCATION,
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
    callPendingprojectApi: (userId, tokenDetail, listType, name) => {
      dispatch({
        type: projectTypes.GET_PENDING_PROJECT_LIST,
        userId,
        tokenDetail,
        listType,
        name,
      });
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Notifications);
