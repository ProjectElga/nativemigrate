import SvgUri from "expo-svg-uri";
import React, { useEffect, useState, useRef, Component } from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  TextInput,
  SafeAreaView,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  TouchableWithoutFeedback,
} from "react-native";
import { Icon, BottomSheet } from "react-native-elements";
import { RFValue } from "react-native-responsive-fontsize";
import { connect, useSelector } from "react-redux";
import SVGS from "../../constants/SvgUri";
import { projectDetailTypes } from "../../reducers/projects/projectDetail";
import { projectActionTypes } from "../../reducers/projects/projectAction";
import COLORS from "../../themes/colors";
import AsyncStorage from "@react-native-async-storage/async-storage";
import STORAGE_KEY from "../../constants/StorageKeys";
import PendingLoader from "../projects/pendingLoader";
import Carousel, { Pagination } from "react-native-snap-carousel";
import ENUM from "../../constants/Enum";
import { archiveChatTypes } from "../../reducers/projects/archiveChat";
import { projectTypes } from "../../reducers/projects/projects";
import * as Analytics from "expo-firebase-analytics";

const width = Dimensions.get("window").width;
class ProjectInfo extends Component {
  constructor() {
    super();
    this.state = {
      expand: false,
      data: {},
      description: "",
    };
  }

  async componentDidMount() {
    const { route } = this.props;
    const { data } = route.params;
    const id = await AsyncStorage.getItem(STORAGE_KEY.USER_ID);
    const tokenDetail = await AsyncStorage.getItem(STORAGE_KEY.ACCESS_TOKEN);
    const recieverId = this.fetchParticipantsSingleId(data?.participants);
    this.props.callprojectDetailApi(
      id,
      data?.id,
      tokenDetail,
      ENUM.ONGOING,
      recieverId
    );
    this.props.resetMemberReducer();
  }

  handleSplitText = (text,len) => {
    const { expand } = this.state;
    if (text?.length > len && !expand) {
      return text.substring(0, len) + "...";
    } else {
      return text;
    }
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
  handleExitChat = async () => {
    const {
      profile: { profileData = {} },
    } = this.props;
    Analytics.logEvent(`ProjectInfoChat_Exit`, {
      contentType: "chat",
      userId: profileData?.id,
      displayName: profileData?.displayName,
      isCreator: profileData?.isCreator,
    });
    const { route } = this.props;
    const { data } = route.params;
    const { removeData = [] } = this.props.projectAction;
    const userId = await AsyncStorage.getItem(STORAGE_KEY.USER_ID);
    const tokenDetail = await AsyncStorage.getItem(STORAGE_KEY.ACCESS_TOKEN);
    // const data = this.props.navigation.getParam("data");
    const action = "exit";
    this.props.callApitoExitChat(userId, tokenDetail, data?.id, action);
    this.props.navigation.navigate("Projects");
  };
  handleWithdraw = async () => {
    const {
      profile: { profileData = {} },
    } = this.props;
    Analytics.logEvent(`ProjectInfoChat_Archive`, {
      contentType: "chat",
      userId: profileData?.id,
      displayName: profileData?.displayName,
      isCreator: profileData?.isCreator,
    });
    const { route } = this.props;
    const { data } = route.params;
    const userId = await AsyncStorage.getItem(STORAGE_KEY.USER_ID);
    const tokenDetail = await AsyncStorage.getItem(STORAGE_KEY.ACCESS_TOKEN);
    // const data = this.props.navigation.getParam("data");
    const recieverId = this.fetchParticipantsSingleId(data?.participants);

    this.props.callApitoWithdrawProject(
      userId,
      tokenDetail,
      data?.id,
      recieverId,
      "COLLABORATION"
    );
    this.props.callprojectApi(userId, tokenDetail, "ONGOING");
    this.props.navigation.navigate("Projects");
  };

  userCard = (value) => {
    return (
      <View
        style={{
          flexDirection: "row",
          marginTop: RFValue(16, 844),
          justifyContent: "space-between",
        }}
      >
        <View style={{ flexDirection: "row" }}>
          <View
            style={{
              width: RFValue(48, 844),
              height: RFValue(48, 844),
              borderRadius: RFValue(24, 844),
            }}
          >
            <Image
              source={{ uri: value?.profileImageUrl }}
              style={{
                width: "100%",
                height: "100%",
                borderRadius: RFValue(24, 844),
              }}
            />
          </View>
          <View style={{ marginLeft: RFValue(24, 844) }}>
            <Text
              style={{
                color: COLORS.monoBlack900,
                fontFamily: "Poppins_600SemiBold",
                fontSize: RFValue(16, 844),
              }}
            >
              {value?.displayName}
            </Text>
            <Text
              style={{
                color: COLORS.monoBlack500,
                fontFamily: "Poppins_500Medium",
                fontSize: RFValue(14, 844),
              }}
            >
              @{this.handleSplitText(value?.userName,12)}
            </Text>
          </View>
        </View>

        {value.isAdmin ? (
          <View style={{alignItems:"center",alignSelf:"center"}}>
            <Text style={{   color: COLORS.monoBlack500,
                fontFamily: "Poppins_400Regular",
                fontSize: RFValue(14, 844),}}>Admin</Text>
          </View>
        ) : null}
      </View>
    );
  };
  handleAddParticipants = () => {
    const {
      profile: { profileData = {} },
    } = this.props;
    Analytics.logEvent("screen_view", {
      firebase_screen:"AddMemberToChat",
      userId: profileData?.id,
      displayName: profileData?.displayName,
      isCreator: profileData?.isCreator,
    });
    const { route } = this.props;
    const { data } = route.params;
    // const data = this.props.navigation.getParam("data");
    console.log("data", data);
    this.props.navigation.navigate("AddMember", {
      members: data?.participants,
      data: data,
    });
  };
  addParticipants = () => {
    return (
      <TouchableWithoutFeedback onPress={this.handleAddParticipants}>
        <View
          style={{
            flexDirection: "row",
            marginTop: RFValue(16, 844),
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <View
              style={{
                width: RFValue(48, 844),
                height: RFValue(48, 844),
                borderRadius: RFValue(24, 844),
                backgroundColor: COLORS.monoBlack500,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <SvgUri
                svgXmlData={SVGS.USER_PLUS_WHITE}
                width={RFValue(24, 844)}
                height={RFValue(24, 844)}
              />
            </View>
            <View style={{ marginLeft: RFValue(24, 844) }}>
              <Text
                style={{
                  color: COLORS.monoBlack900,
                  fontFamily: "Poppins_600SemiBold",
                  fontSize: RFValue(16, 844),
                }}
              >
                {" "}
                Add Participants
              </Text>
            </View>
          </View>
          <Icon
            type="feather"
            name="chevron-right"
            size={20}
            color={COLORS.monoBlack500}
          />
        </View>
      </TouchableWithoutFeedback>
    );
  };
  renderCarouselItems = ({ item, index }) => {
    return (
      <View style={{ width: width, height: undefined, aspectRatio: 1 / 1 }}>
        <Image
          source={{ uri: item }}
          style={{ width: "100%", height: "100%" }}
        />
      </View>
    );
  };
  renderCarousel = () => {
    const { route } = this.props;
    const { images } = route.params;
    return (
      <View style={styles.carouselContainer}>
        <Carousel
          ref={(c) => {
            this._carousel = c;
          }}
          data={images}
          renderItem={this.renderCarouselItems}
          sliderWidth={width}
          itemWidth={width}
          //enableSnap={true}
          useScrollView
          enableSnap={true}
          shouldOptimizeUpdates={true}
          loopClonesPerSide={5}
          enableMomentum={true}
          activeSlideAlignment="center"
          removeClippedSubviews={true}
          decelerationRate={0.9}
          inactiveSlideScale={1}
          inactiveSlideOpacity={1}
          lockScrollWhileSnapping={true}
          pagingEnabled={true}
        />
      </View>
    );
  };

  render() {
    const { route } = this.props;
    const { data } = route.params;
    const { expand, description } = this.state;
    const { projectDetailData = {}, loading } = this.props.projectDetail;
    const {
      profile: { profileData = {} },
    } = this.props;
    // const data = this.props.navigation.getParam("data");
    console.log("projectDetailData>>", projectDetailData);
    return (
      <View showsVerticalScrollIndicator={false}>
        {loading ? null : (
          <View
            style={{
              backgroundColor: COLORS.monoWhite900,
              height: "100%",
              //paddingBottom: RFValue(40, 844),
            }}
          >
            <View
              style={{
                width: width,
                height: undefined,
                aspectRatio: 1 / 1,
                position: "absolute",
              }}
            >
              {this.renderCarousel()}
              <View
                style={{
                  position: "absolute",
                  top: 40,
                  left: 24,
                  backgroundColor: COLORS.monoWhite900,
                  width: RFValue(40, 844),
                  height: RFValue(40, 844),
                  borderRadius: RFValue(20, 844),
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Icon
                  name="chevron-left"
                  type="feather"
                  size={20}
                  color={COLORS.monoBlack700}
                  onPress={() => {
                    this.props.navigation.goBack();
                  }}
                />
              </View>
            </View>
            {/* <ImageBackground
              source={{
                uri: "https://images.unsplash.com/photo-1477876306440-0579bdae88b8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2940&q=80",
              }}
              style={{
                width: "100%",
                height: undefined,
                aspectRatio: 1 / 1,
              }}
            ></ImageBackground>*/}
            {/* {this.renderCarousel()} */}

            <ScrollView
              showsVerticalScrollIndicator={false}
              style={{ marginTop: 108 }}
              scroll
            >
              <View
                style={{
                  backgroundColor: COLORS.monoWhite900,
                  paddingHorizontal: RFValue(20, 844),
                  marginTop: width - 108,
                  paddingTop: RFValue(24, 844),
                  borderRadius:RFValue(24,844)
                }}
              >
                <Text
                  style={{
                    color: COLORS.monoBlack900,
                    fontFamily: "Poppins_600SemiBold",
                    fontSize: RFValue(20, 844),
                  }}
                >
                  {projectDetailData?.name}
                </Text>
                <TouchableWithoutFeedback
                  onPress={() => {
                    this.setState({
                      expand: !expand,
                    });
                  }}
                >
                  <Text
                    style={{
                      color: COLORS.monoBlack500,
                      fontFamily: "Poppins_400Regular",
                      fontSize: RFValue(14, 844),
                    }}
                  >
                    {this.handleSplitText(projectDetailData?.description,195)}
                    {projectDetailData?.description?.length <
                    200 ? null : expand ? null : (
                      <Text style={{ color: COLORS.monoBlack700 }}>
                        Read More
                      </Text>
                    )}
                  </Text>
                </TouchableWithoutFeedback>
                <View
                  style={{ flexDirection: "row", marginTop: RFValue(12, 844) }}
                >
                  <View
                    style={{
                      paddingVertical: 4,
                      paddingHorizontal: RFValue(16, 844),
                      borderRadius: RFValue(32, 844),
                      borderWidth: 1,
                      borderColor: COLORS.monoChromeBlack,
                    }}
                  >
                    <Text
                      style={{
                        color: COLORS.monoBlack900,
                        fontFamily: "Poppins_400Regular",
                        fontSize: RFValue(12, 844),
                      }}
                    >
                      {projectDetailData?.priceDetails?.entityType?.toLowerCase()}
                    </Text>
                  </View>
                  <View
                    style={{
                      paddingVertical: 4,
                      paddingHorizontal: RFValue(16, 844),
                      borderRadius: RFValue(32, 844),
                      borderWidth: 1,
                      borderColor: COLORS.monoChromeBlack,
                      marginLeft: 8,
                    }}
                  >
                    <Text
                      style={{
                        color: COLORS.monoBlack900,
                        fontFamily: "Poppins_400Regular",
                        fontSize: RFValue(12, 844),
                      }}
                    >
                      {projectDetailData?.type
                        ? projectDetailData?.type?.toLowerCase() ===
                          "collaboration"
                          ? "Project"
                          : projectDetailData?.type?.toLowerCase()
                        : projectDetailData?.type?.toLowerCase()}
                    </Text>
                  </View>
                </View>
                <View style={{ marginTop: RFValue(40, 844) }}>
                  <Text
                    style={{
                      color: COLORS.monoBlack900,
                      fontFamily: "Poppins_600SemiBold",
                      fontSize: RFValue(16, 844),
                    }}
                  >
                    {projectDetailData?.participants?.length} Participants
                  </Text>
                  <View
                    style={{
                      width: "100%",
                      borderWidth: 0.5,
                      borderColor: COLORS.monoChromeBlack,
                      marginTop: RFValue(16, 844),
                    }}
                  ></View>

                  <View>
                    {/* {this.userCard(projectDetailData?.loggedUser)} */}
                    {projectDetailData?.participants?.map((value, index) => {
                      console.log("value member>>", value);
                      return this.userCard(value);
                    })}
                    {this.addParticipants()}
                  </View>
                </View>

                <View
                  style={{
                    marginTop: RFValue(40, 844),
                    marginBottom: RFValue(40, 844),
                  }}
                >
                  <Text
                    style={{
                      color: COLORS.monoBlack900,
                      fontFamily: "Poppins_600SemiBold",
                      fontSize: RFValue(16, 844),
                    }}
                  >
                    Group Controls
                  </Text>
                  <View
                    style={{
                      width: "100%",
                      borderWidth: 0.5,
                      borderColor: COLORS.monoChromeBlack,
                      marginTop: RFValue(16, 844),
                    }}
                  ></View>
                  {!projectDetailData?.loggedUser?.isAdmin ? (
                    <TouchableOpacity
                      onPress={() => {
                        this.handleExitChat();
                      }}
                    >
                      <View
                        style={{
                          height: RFValue(52, 844),
                          width: "100%",
                          //flexDirection: "row",
                          justifyContent: "center",
                          alignItems: "center",
                          backgroundColor: COLORS.monoGhost500,
                          borderColor: COLORS.monoChromeBlack,
                          borderWidth: 1,
                          borderRadius: RFValue(12, 844),
                          marginTop: RFValue(16, 844),
                        }}
                      >
                        <Text
                          style={{
                            color: COLORS.monoBlack900,
                            fontFamily: "Poppins_600SemiBold",
                            fontSize: RFValue(14, 844),
                          }}
                        >
                          Exit Group
                        </Text>
                      </View>
                    </TouchableOpacity>
                  ) : null}
                  {projectDetailData?.loggedUser?.isAdmin ? (
                    <TouchableOpacity
                      onPress={() => {
                        this.handleWithdraw();
                      }}
                    >
                      <View
                        style={{
                          height: RFValue(52, 844),
                          width: "100%",
                          //flexDirection: "row",
                          justifyContent: "center",
                          alignItems: "center",
                          backgroundColor: COLORS.teritiaryRed500,
                          borderRadius: RFValue(12, 844),
                          marginTop: RFValue(16, 844),
                        }}
                      >
                        <Text
                          style={{
                            color: COLORS.monoWhite900,
                            fontFamily: "Poppins_600SemiBold",
                            fontSize: RFValue(14, 844),
                          }}
                        >
                          Archive Chat
                        </Text>
                      </View>
                    </TouchableOpacity>
                  ) : null}
                </View>
              </View>
            </ScrollView>
          </View>
        )}
      </View>
    );
  }
}

// render() {
//   const { route } = this.props;
//   const { data } = route.params;
//   const { expand, description } = this.state;
//   const { projectDetailData = {}, loading } = this.props.projectDetail;
//   // const data = this.props.navigation.getParam("data");
//   console.log("projectDetailData>>", projectDetailData);
//   return (
//     <ScrollView showsVerticalScrollIndicator={false}>

//     </ScrollView>
//   );
// }
// }
const mapStateToProps = (state) => {
  const { projectDetail, projectAction ,profile} = state;
  return { projectDetail, projectAction,profile };
};

const mapDispatchToProps = (dispatch) => {
  return {
    callprojectDetailApi: (
      id,
      projectId,
      tokenDetail,
      sentSection,
      recieverId
    ) => {
      dispatch({
        type: projectDetailTypes.GET_PROJECT_DETAIL_LIST,
        id,
        projectId,
        tokenDetail,
        sentSection,
        recieverId,
      });
    },

    resetAddMember: () => {
      dispatch({ type: projectActionTypes.RESET_ADD_MEMBER });
    },
    callApitoWithdrawProject: (userId, tokenDetail, projectId) => {
      dispatch({
        type: archiveChatTypes.GET_ARCHIVE_CHAT,
        userId,
        tokenDetail,
        projectId,
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
    resetMemberReducer: () => {
      dispatch({ type: projectActionTypes?.RESET_ACCEPT_PROJECT });
    },
    callApitoExitChat: (userId, tokenDetail, projectId, action) => {
      dispatch({
        type: projectActionTypes.REMOVE_MEMBERS,
        userId,
        tokenDetail,
        projectId,
        action,
      });
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ProjectInfo);

const styles = StyleSheet.create({
  carouselContainer: {
    width: "100%",
    borderWidth: 2,
    height: "100%",
  },
  cross: {
    width: RFValue(40, 844),
    height: RFValue(40, 844),
    borderWidth: 1,
    borderRadius: RFValue(20, 844),
    alignItems: "center",
    justifyContent: "center",
    borderColor: COLORS.monoChromeBlack,
  },
  carouselContainer: {
    width: "100%",
    height: undefined,
    aspectRatio: 1 / 9,
  },
});
