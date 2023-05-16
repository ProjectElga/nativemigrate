import React, { Component } from "react";
import {
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import SearchBarWithFilter from "../../../../components/multicellular/general/searchBar";
import ProfileHeader from "../../../../components/multicellular/profile/header/header";
import COLORS from "../../../../themes/colors";
import Styles from "./styles";
import AsyncStorage from "@react-native-async-storage/async-storage";
import STORAGE_KEY from "../../../../constants/StorageKeys";
import { Icon } from "react-native-elements";
import SvgUri from "expo-svg-uri";
import SVGS from "../../../../constants/SvgUri";
import STRINGS from "../../../../constants/Strings";
import { circleTypes } from "../../../../reducers/projects/circle";
import { connect } from "react-redux";
import { createCollab } from "../../../../reducers/actionButton/collab";
import { getUserDiscoverTypes } from "../../../../reducers/discover/getUser";
import IMAGES from "../../../../themes/Images";
import { projectActionTypes } from "../../../../reducers/projects/projectAction";
import { userSearchTypes } from "../../../../reducers/search/userSearch";
import NothingHere from "../../../../components/multicellular/general/nothingHere/nothingHere";
import { isCloseToBottom } from "../../../../utils/LazyLoading";
import Skeleton from "../../../../components/multicellular/general/skeleton/skeleton";
import CircleNotFound from "../../../../components/multicellular/general/CircleNotFound";
import Invite from "../../../../components/unicellular/button/Invite";
class AddMember extends Component {
  constructor() {
    super();
    this.state = {
      activeSection: "myCircle",
      searchText: "",
      participants: [],
      existedUser: [],
    };
  }
  async componentDidMount() {
    this.props.resetRecordOffset();
    const { route } = this.props;
    const { members } = route.params;
    const userId = await AsyncStorage.getItem(STORAGE_KEY.USER_ID);
    const tokenDetail = await AsyncStorage.getItem(STORAGE_KEY.ACCESS_TOKEN);
    const requestParam = {
      id: userId,
      listType: "ACCEPTED",
    };
    let params = {
      id: userId,
      trending: true,
      businessProfile: false,
      recordOffset: 0,
      recordPerPage: 10,
    };
    this.props.getCircleApi(requestParam, tokenDetail);
    // this.props.callApiToGetTrendingUser(userId, tokenDetail,params);
    const {
      getDiscoverUser,
      guloading,
      savedArray,
      recordOffset,
      recordPerPage,
      isMoreData,
    } = this.props.getUser;
    this.props.callApiToGetNearByUser(
      userId,
      tokenDetail,
      recordOffset,
      recordPerPage
    );
    //const existedMember = this.props.navigation.getParam("members");

    this.setState({ existedUser: members });
  }
  retrieveMore = async () => {
    const { recordOffset, recordPerPage } = this.props.getUser;
    const userId = await AsyncStorage.getItem(STORAGE_KEY.USER_ID);
    const tokenDetail = await AsyncStorage.getItem(STORAGE_KEY.ACCESS_TOKEN);
    console.log("called");
    this.props.callApiToGetNearByUser(
      userId,
      tokenDetail,
      recordOffset,
      recordPerPage
    );
  };
  async componentWillReceiveProps(nextProps, nextState) {
    const { isAddMember } = nextProps.projectAction;
    if (isAddMember) {
      this.props.navigation.goBack(null);
    }
  }
  checkIfParticipantsExist = (id) => {
    const { participants } = this.state;
    return participants?.some((el) => el.id === id) || false;
  };
  checkIfParticipantsExistInCircle = (id) => {
    const { loading, circleData = [], error } = this.props.circle;
    return circleData?.some((el) => el.id === id) || false;
  };
  checkIfParticipantsInChat = (id) => {
    const { existedUser } = this.state;
    return existedUser?.some((el) => el.id === id);
  };

  handleFilter = async (event) => {
    this.setState({ searchText: event });
    const { activeSection } = this.state;
    const userId = await AsyncStorage.getItem(STORAGE_KEY.USER_ID);
    const tokenDetail = await AsyncStorage.getItem(STORAGE_KEY.ACCESS_TOKEN);
    if (activeSection === "myCircle") {
      if (event?.length === 0) {
        const requestParam = {
          id: userId,
          listType: "ACCEPTED",
        };
        this.props.getCircleApi(requestParam, tokenDetail);
      } else {
        const requestParam = {
          id: userId,
          key: event,
        };
        this.props.getCircleSearchApi(requestParam, tokenDetail);
      }
    } else {
      if (event?.length === 0) {
        let params = {
          id: userId,
          trending: true,
          businessProfile: false,
          recordOffset: 0,
          recordPerPage: 10,
        };
        // this.props.callApiToGetTrendingUser(userId, tokenDetail,params);
        this.props.callApiToGetNearByUser(userId, tokenDetail, 0, 10);
      } else {
        this.props.callSearchProfileApi(userId, tokenDetail, event, "profile");
      }
    }
  };
  handleSplitText = (text) => {
    if (text?.length > 12) {
      return text.substring(0, 12) + "...";
    } else {
      return text;
    }
  };
  searchUser = async () => {
    const { searchText } = this.state;
    const { activeSection } = this.state;
    const userId = await AsyncStorage.getItem(STORAGE_KEY.USER_ID);
    const tokenDetail = await AsyncStorage.getItem(STORAGE_KEY.ACCESS_TOKEN);
    if (activeSection === "myCircle") {
      if (searchText?.length === 0) {
        const requestParam = {
          id: userId,
          listType: "ACCEPTED",
        };
        this.props.getCircleApi(requestParam, tokenDetail);
      } else {
        const requestParam = {
          id: userId,
          key: searchText,
        };
        this.props.getCircleSearchApi(requestParam, tokenDetail);
      }
    } else {
      if (searchText?.length === 0) {
        let params = {
          id: userId,
          trending: true,
          businessProfile: false,
          recordOffset: 0,
          recordPerPage: 10,
        };
        // this.props.callApiToGetTrendingUser(userId, tokenDetail,params);
        this.props.callApiToGetNearByUser(userId, tokenDetail, 0, 10);
      } else {
        this.props.callSearchProfileApi(
          userId,
          tokenDetail,
          searchText,
          "profile"
        );
      }
    }
  };
  handleAddParticipantsApi = async () => {
    const {
      profile: { profileData = {} },
    } = this.props;
    Analytics.logEvent("screen_view", {
      firebase_screen: "AddMemberToChat_Save",
      userId: profileData?.id,
      displayName: profileData?.displayName,
      isCreator: profileData?.isCreator,
    });
    const { route } = this.props;
    const { data } = route.params;
    const userId = await AsyncStorage.getItem(STORAGE_KEY.USER_ID);
    const tokenDetail = await AsyncStorage.getItem(STORAGE_KEY.ACCESS_TOKEN);
    const { participants } = this.state;
    //const project = this.props.navigation.getParam("data");
    data?.id
      ? this.props.addParticipants(userId, tokenDetail, data.id, participants)
      : null;
  };
  render() {
    const { loading, circleData = [], error } = this.props.circle;
    const { getDiscoverUser, guloading, savedArray, isMoreData } =
      this.props.getUser;
    const { participants, existedUser } = this.state;
    const { userSearchData = [] } = this.props.userSearch;
    return (
      <View
        style={{
          paddingHorizontal: RFValue(16, 844),
          paddingTop: RFValue(48, 844),
          backgroundColor: COLORS.monoWhite900,
          height: "100%",
        }}
      >
        <ProfileHeader
          text="Participants"
          showBackIcon={true}
          fontSize={RFValue(24, 844)}
          onBackPress={() => {
            this.props.navigation.goBack(null);
          }}
          rightComponent={() => {
            return (
              <TouchableOpacity onPress={this.handleAddParticipantsApi}>
                <View style={Styles.saveButton}>
                  <Text style={Styles.saveText}>Add</Text>
                </View>
              </TouchableOpacity>
            );
          }}
        />
        <View style={{ marginTop: 8 }}>
          <SearchBarWithFilter
            enableInput={true}
            bgColor={COLORS.monoGhost500}
            onChangeText={this.handleFilter}
            returnKeyType="search"
            onSubmitEditing={this.searchUser}
          />
        </View>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginTop: RFValue(20, 844),
          }}
        >
          <TouchableWithoutFeedback
            style={{
              borderWidth: 2,
            }}
            onPress={() => {
              this.setState({
                activeSection: "myCircle",
              });
            }}
          >
            <View
              style={{
                borderBottomWidth: 2,
                borderBottomColor:
                  this.state.activeSection == "myCircle"
                    ? COLORS.monoBlack500
                    : COLORS.monoWhite900,
                paddingBottom: RFValue(12, 844),
              }}
            >
              <Text
                style={{
                  color:
                    this.state.activeSection == "myCircle"
                      ? COLORS.monoBlack900
                      : COLORS.monoBlack500,
                  fontSize: RFValue(20, 844),
                  fontFamily: "Poppins_600SemiBold",
                }}
              >
                My Circle
              </Text>
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback
            onPress={() => {
              this.setState({
                activeSection: "network",
              });
            }}
          >
            <View
              style={{
                borderBottomWidth: 2,
                borderBottomColor:
                  this.state.activeSection == "network"
                    ? COLORS.monoBlack500
                    : COLORS.monoWhite900,

                paddingBottom: RFValue(12, 844),
                marginLeft: RFValue(24, 844),
              }}
            >
              <Text
                style={{
                  color:
                    this.state.activeSection == "network"
                      ? COLORS.monoBlack900
                      : COLORS.monoBlack500,
                  fontSize: RFValue(20, 844),
                  fontFamily: "Poppins_600SemiBold",
                }}
              >
                Network
              </Text>
            </View>
          </TouchableWithoutFeedback>
          <View
            style={{
              marginLeft: RFValue(24, 844),
            }}
          >
            <Invite />
          </View>
        </View>
        {loading ? (
          <View>
            <Text>...</Text>
          </View>
        ) : (
          <>
            <View>
              <ScrollView
                style={{
                  flexDirection: "row",
                  marginTop: RFValue(8, 844),
                }}
                horizontal
                showsHorizontalScrollIndicator={false}
              >
                {existedUser &&
                  existedUser?.length > 0 &&
                  existedUser.map((key, index) => {
                    return (
                      <View
                        style={{
                          marginLeft: index == 0 ? 0 : RFValue(20, 844),
                          height: RFValue(90, 844),

                          paddingHorizontal: 8,
                        }}
                      >
                        <Image
                          source={{ uri: key.profileImageUrl }}
                          style={{
                            width: RFValue(60, 844),
                            height: RFValue(60, 844),
                            borderRadius: RFValue(30, 844),
                            marginTop: 4,
                          }}
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.source = IMAGES.UserProfile;
                          }}
                        />

                        <Text
                          style={{
                            alignSelf: "center",
                            fontFamily: "Poppins_500Medium",
                            fontSize: RFValue(12, 844),
                            color: COLORS.monoBlack700,
                            marginTop: RFValue(12, 844),
                          }}
                        >
                          {key.displayName?.split(" ")[0]}
                        </Text>
                      </View>
                    );
                  })}
                {participants &&
                  participants?.length > 0 &&
                  participants.map((key, index) => {
                    return (
                      <View
                        style={{
                          marginLeft: index == 0 ? 0 : RFValue(20, 844),
                          height: RFValue(90, 844),

                          paddingHorizontal: 8,
                        }}
                      >
                        <TouchableWithoutFeedback
                          onPress={() => {
                            var temp = participants;
                            temp.splice(index, 1);
                            this.setState({ participants: temp });
                          }}
                        >
                          <View
                            style={{
                              width: RFValue(20, 844),
                              height: RFValue(20, 844),
                              borderRadius: RFValue(12, 844),
                              position: "absolute",
                              zIndex: 2,
                              backgroundColor: COLORS.monoBlack500,
                              alignItems: "center",
                              justifyContent: "center",
                              alignSelf: "flex-end",
                              right: 3,
                            }}
                          >
                            <Icon
                              type="feather"
                              name="x"
                              color={COLORS.monoWhite900}
                              size={12}
                            />
                          </View>
                        </TouchableWithoutFeedback>
                        <Image
                          source={{ uri: key.profileImageUrl }}
                          style={{
                            width: RFValue(60, 844),
                            height: RFValue(60, 844),
                            borderRadius: RFValue(30, 844),
                            marginTop: 4,
                          }}
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.source = IMAGES.UserProfile;
                          }}
                        />

                        <Text
                          style={{
                            alignSelf: "center",
                            fontFamily: "Poppins_500Medium",
                            fontSize: RFValue(12, 844),
                            color: COLORS.monoBlack700,
                            marginTop: RFValue(12, 844),
                          }}
                        >
                          {key.displayName
                            ? key.displayName.split(" ")[0]
                            : null}
                        </Text>
                      </View>
                    );
                  })}
              </ScrollView>
            </View>
            {this.state.activeSection == "myCircle" ? (
              <ScrollView
                showsVerticalScrollIndicator={false}
                style={{ marginTop: 8 }}
              >
                {circleData && circleData?.length > 0 ? (
                  circleData?.map((key, index) => {
                    if (!this.checkIfParticipantsInChat(key?.id)) {
                      return (
                        <View
                          style={{
                            width: "100%",
                            justifyContent: "space-between",
                            paddingVertical: RFValue(10, 844),
                            flexDirection: "row",
                            alignItems: "center",
                            paddingRight: RFValue(16, 844),
                          }}
                          key={index}
                        >
                          <View
                            style={{
                              flexDirection: "row",
                              alignItems: "center",
                            }}
                          >
                            <Image
                              source={{ uri: key.profileImageUrl }}
                              style={{
                                width: RFValue(60, 844),
                                height: RFValue(60, 844),
                                borderRadius: RFValue(30, 844),
                                marginTop: 4,
                              }}
                            />
                            <View style={{ marginLeft: RFValue(24, 844) }}>
                              <Text
                                style={{
                                  fontFamily: "Poppins_500Medium",
                                  fontSize: RFValue(14, 844),
                                  color: this.checkIfParticipantsExist(key?.id)
                                    ? COLORS.monoBlack500
                                    : COLORS.monoBlack900,
                                }}
                              >
                                {key?.displayName}
                              </Text>
                              <Text>
                                {key?.subCategoryNames &&
                                  key?.subCategoryNames?.length > 0 &&
                                  key?.subCategoryNames.map((key, index) => {
                                    return index < 1 ? (
                                      <Text
                                        style={{
                                          fontFamily: "Poppins_400Regular",
                                          fontSize: RFValue(14, 844),
                                          color: COLORS.monoBlack500,
                                        }}
                                      >
                                        {key.name}
                                      </Text>
                                    ) : null;
                                  })}
                                {key?.subCategoryNames?.length > 1 ? (
                                  <Text
                                    style={{
                                      fontFamily: "Poppins_400Regular",
                                      fontSize: RFValue(14, 844),
                                      color: COLORS.monoBlack500,
                                    }}
                                  >
                                    {` +${key.subCategoryNames.length - 1}`}
                                  </Text>
                                ) : null}
                              </Text>
                              <Text
                                style={{
                                  fontFamily: "Poppins_400Regular",
                                  fontSize: RFValue(14, 844),
                                  color: COLORS.monoBlack500,
                                }}
                              >
                                {this.handleSplitText(key?.bio)}
                              </Text>
                            </View>
                          </View>
                          {this.checkIfParticipantsExist(key?.id) ? (
                            <SvgUri
                              svgXmlData={SVGS.GREEN_CIRCLE_CHECK}
                              width={RFValue(24, 844)}
                              height={RFValue(24, 844)}
                            />
                          ) : (
                            <TouchableWithoutFeedback
                              onPress={() => {
                                var temp = participants;
                                var arr = {
                                  id: key?.id,
                                  inCircle: true,
                                  profileImageUrl: key.profileImageUrl,
                                  displayName: key?.displayName,
                                  expoToken: key?.expoToken,
                                };
                                temp?.push(arr);
                                this.setState({ participants: temp });
                              }}
                            >
                              <Icon
                                type="feather"
                                name="plus-circle"
                                size={20}
                                color={COLORS.monoBlack500}
                              />
                            </TouchableWithoutFeedback>
                          )}
                        </View>
                      );
                    } else {
                      return null;
                    }
                  })
                ) : (
                  <CircleNotFound
                    btnText={"Go To Network"}
                    onPress={() => {
                      this.setState({
                        activeSection: "network",
                      });
                    }}
                  />
                )}
              </ScrollView>
            ) : (
              <ScrollView
                showsVerticalScrollIndicator={false}
                style={{ marginTop: 8 }}
                onScroll={({ nativeEvent }) => {
                  if (
                    isCloseToBottom(nativeEvent) &&
                    isMoreData &&
                    !guloading
                  ) {
                    this.retrieveMore();
                  }
                }}
              >
                {this.state.searchText === "" ? (
                  <>
                    {getDiscoverUser && getDiscoverUser.length > 0 ? (
                      getDiscoverUser?.map((key, index) => {
                        if (!this.checkIfParticipantsExistInCircle(key?.id)) {
                          return (
                            <View
                              style={{
                                width: "100%",
                                justifyContent: "space-between",
                                paddingVertical: RFValue(10, 844),
                                flexDirection: "row",
                                alignItems: "center",
                                paddingRight: RFValue(16, 844),
                              }}
                              key={index}
                            >
                              <View
                                style={{
                                  flexDirection: "row",
                                  alignItems: "center",
                                }}
                              >
                                <Image
                                  source={{ uri: key.profileImageUrl }}
                                  style={{
                                    width: RFValue(60, 844),
                                    height: RFValue(60, 844),
                                    borderRadius: RFValue(30, 844),
                                    marginTop: 4,
                                  }}
                                />
                                <View style={{ marginLeft: RFValue(24, 844) }}>
                                  <Text
                                    style={{
                                      fontFamily: "Poppins_500Medium",
                                      fontSize: RFValue(14, 844),
                                      color: this.checkIfParticipantsExist(
                                        key?.id
                                      )
                                        ? COLORS.monoBlack500
                                        : COLORS.monoBlack900,
                                    }}
                                  >
                                    {key?.displayName}
                                  </Text>
                                  <Text>
                                    {key?.subCategoryNames &&
                                      key?.subCategoryNames?.length > 0 &&
                                      key?.subCategoryNames.map(
                                        (key, index) => {
                                          return index < 1 ? (
                                            <Text
                                              style={{
                                                fontFamily:
                                                  "Poppins_400Regular",
                                                fontSize: RFValue(12, 844),
                                                color: COLORS.monoBlack500,
                                              }}
                                            >
                                              {key.name}
                                            </Text>
                                          ) : null;
                                        }
                                      )}
                                    {key?.subCategoryNames?.length > 1 ? (
                                      <Text
                                        style={{
                                          fontFamily: "Poppins_400Regular",
                                          fontSize: RFValue(12, 844),
                                          color: COLORS.monoBlack500,
                                        }}
                                      >
                                        {` +${key.subCategoryNames.length - 1}`}
                                      </Text>
                                    ) : null}
                                  </Text>
                                </View>
                              </View>
                              {this.checkIfParticipantsExist(key?.id) ? (
                                <SvgUri
                                  svgXmlData={SVGS.GREEN_CIRCLE_CHECK}
                                  width={RFValue(24, 844)}
                                  height={RFValue(24, 844)}
                                />
                              ) : (
                                <TouchableWithoutFeedback
                                  onPress={() => {
                                    var temp = participants;
                                    var arr = {
                                      id: key?.id,
                                      inCircle: false,
                                      profileImageUrl: key.profileImageUrl,
                                      displayName: key?.displayName,
                                      expoToken: key?.expoToken,
                                    };
                                    temp?.push(arr);
                                    this.setState({ participants: temp });
                                  }}
                                >
                                  <Icon
                                    type="feather"
                                    name="plus-circle"
                                    size={20}
                                    color={COLORS.monoBlack500}
                                  />
                                </TouchableWithoutFeedback>
                              )}
                            </View>
                          );
                        } else {
                          if (!this.checkIfParticipantsInChat(key?.id)) {
                            return (
                              <View
                                style={{
                                  width: "100%",
                                  justifyContent: "space-between",
                                  paddingVertical: RFValue(10, 844),
                                  flexDirection: "row",
                                  alignItems: "center",
                                  paddingRight: RFValue(16, 844),
                                }}
                                key={index}
                              >
                                <View
                                  style={{
                                    flexDirection: "row",
                                    alignItems: "center",
                                  }}
                                >
                                  <Image
                                    source={{ uri: key.profileImageUrl }}
                                    style={{
                                      width: RFValue(60, 844),
                                      height: RFValue(60, 844),
                                      borderRadius: RFValue(30, 844),
                                      marginTop: 4,
                                    }}
                                  />
                                  <View
                                    style={{ marginLeft: RFValue(24, 844) }}
                                  >
                                    <Text
                                      style={{
                                        fontFamily: "Poppins_500Medium",
                                        fontSize: RFValue(14, 844),
                                        color: this.checkIfParticipantsExist(
                                          key?.id
                                        )
                                          ? COLORS.monoBlack500
                                          : COLORS.monoBlack900,
                                      }}
                                    >
                                      {key?.displayName}
                                    </Text>
                                    <Text>
                                      {key?.subCategoryNames &&
                                        key?.subCategoryNames?.length > 0 &&
                                        key?.subCategoryNames.map(
                                          (key, index) => {
                                            return index < 1 ? (
                                              <Text
                                                style={{
                                                  fontFamily:
                                                    "Poppins_400Regular",
                                                  fontSize: RFValue(14, 844),
                                                  color: COLORS.monoBlack500,
                                                }}
                                              >
                                                {key.name}
                                              </Text>
                                            ) : null;
                                          }
                                        )}
                                      {key?.subCategoryNames?.length > 1 ? (
                                        <Text
                                          style={{
                                            fontFamily: "Poppins_400Regular",
                                            fontSize: RFValue(12, 844),
                                            color: COLORS.monoBlack500,
                                          }}
                                        >
                                          {` +${
                                            key.subCategoryNames.length - 1
                                          }`}
                                        </Text>
                                      ) : null}
                                    </Text>
                                    <Text
                                      style={{
                                        fontFamily: "Poppins_400Regular",
                                        fontSize: RFValue(12, 844),
                                        color: COLORS.monoBlack500,
                                      }}
                                    >
                                      {this.handleSplitText(key?.bio)}
                                    </Text>
                                  </View>
                                </View>
                                {this.checkIfParticipantsExist(key?.id) ? (
                                  <SvgUri
                                    svgXmlData={SVGS.GREEN_CIRCLE_CHECK}
                                    width={RFValue(24, 844)}
                                    height={RFValue(24, 844)}
                                  />
                                ) : (
                                  <TouchableWithoutFeedback
                                    onPress={() => {
                                      var temp = participants;
                                      var arr = {
                                        id: key?.id,
                                        inCircle: false,
                                        profileImageUrl: key.profileImageUrl,
                                        displayName: key?.displayName,
                                        expoToken: key?.expoToken,
                                      };
                                      temp?.push(arr);
                                      this.setState({ participants: temp });
                                    }}
                                  >
                                    <Icon
                                      type="feather"
                                      name="plus-circle"
                                      size={20}
                                      color={COLORS.monoBlack500}
                                    />
                                  </TouchableWithoutFeedback>
                                )}
                              </View>
                            );
                          } else {
                            return null;
                          }
                        }
                      })
                    ) : (
                      <NothingHere
                        text="Nothing Here! Comeback later 👋"
                        image={IMAGES.NoPending}
                      />
                    )}
                  </>
                ) : (
                  <>
                    {userSearchData && userSearchData?.length > 0 ? (
                      userSearchData.map((key, index) => {
                        if (!this.checkIfParticipantsExistInCircle(key?.id)) {
                          return (
                            <View
                              style={{
                                width: "100%",
                                justifyContent: "space-between",
                                paddingVertical: RFValue(10, 844),
                                flexDirection: "row",
                                alignItems: "center",
                                paddingRight: RFValue(16, 844),
                              }}
                              key={index}
                            >
                              <View
                                style={{
                                  flexDirection: "row",
                                  alignItems: "center",
                                }}
                              >
                                <Image
                                  source={{ uri: key.profileImageUrl }}
                                  style={{
                                    width: RFValue(60, 844),
                                    height: RFValue(60, 844),
                                    borderRadius: RFValue(30, 844),
                                    marginTop: 4,
                                  }}
                                />
                                <View style={{ marginLeft: RFValue(24, 844) }}>
                                  <Text
                                    style={{
                                      fontFamily: "Poppins_500Medium",
                                      fontSize: RFValue(14, 844),
                                      color: this.checkIfParticipantsExist(
                                        key?.id
                                      )
                                        ? COLORS.monoBlack500
                                        : COLORS.monoBlack900,
                                    }}
                                  >
                                    {key?.displayName}
                                  </Text>
                                  <Text>
                                    {key?.subCategoryNames &&
                                      key?.subCategoryNames?.length > 0 &&
                                      key?.subCategoryNames.map(
                                        (key, index) => {
                                          return index < 1 ? (
                                            <Text
                                              style={{
                                                fontFamily:
                                                  "Poppins_400Regular",
                                                fontSize: RFValue(12, 844),
                                                color: COLORS.monoBlack500,
                                              }}
                                            >
                                              {key.name}
                                            </Text>
                                          ) : null;
                                        }
                                      )}
                                    {key?.subCategoryNames?.length > 1 ? (
                                      <Text
                                        style={{
                                          fontFamily: "Poppins_400Regular",
                                          fontSize: RFValue(12, 844),
                                          color: COLORS.monoBlack500,
                                        }}
                                      >
                                        {` +${key.subCategoryNames.length - 1}`}
                                      </Text>
                                    ) : null}
                                  </Text>
                                  <Text
                                    style={{
                                      fontFamily: "Poppins_400Regular",
                                      fontSize: RFValue(14, 844),
                                      color: COLORS.monoBlack500,
                                    }}
                                  >
                                    {this.handleSplitText(key?.bio)}
                                  </Text>
                                </View>
                              </View>
                              {this.checkIfParticipantsExist(key?.id) ? (
                                <SvgUri
                                  svgXmlData={SVGS.GREEN_CIRCLE_CHECK}
                                  width={RFValue(24, 844)}
                                  height={RFValue(24, 844)}
                                />
                              ) : (
                                <TouchableWithoutFeedback
                                  onPress={() => {
                                    var temp = participants;
                                    var arr = {
                                      id: key?.id,
                                      inCircle: false,
                                      profileImageUrl: key.profileImageUrl,
                                      displayName: key?.displayName,
                                      expoToken: key?.expoToken,
                                    };
                                    temp?.push(arr);
                                    this.setState({ participants: temp });
                                  }}
                                >
                                  <Icon
                                    type="feather"
                                    name="plus-circle"
                                    size={20}
                                    color={COLORS.monoBlack500}
                                  />
                                </TouchableWithoutFeedback>
                              )}
                            </View>
                          );
                        } else {
                          if (!this.checkIfParticipantsInChat(key?.id)) {
                            return (
                              <View
                                style={{
                                  width: "100%",
                                  justifyContent: "space-between",
                                  paddingVertical: RFValue(10, 844),
                                  flexDirection: "row",
                                  alignItems: "center",
                                  paddingRight: RFValue(16, 844),
                                }}
                                key={index}
                              >
                                <View
                                  style={{
                                    flexDirection: "row",
                                    alignItems: "center",
                                  }}
                                >
                                  <Image
                                    source={{ uri: key.profileImageUrl }}
                                    style={{
                                      width: RFValue(60, 844),
                                      height: RFValue(60, 844),
                                      borderRadius: RFValue(30, 844),
                                      marginTop: 4,
                                    }}
                                  />
                                  <View
                                    style={{ marginLeft: RFValue(24, 844) }}
                                  >
                                    <Text
                                      style={{
                                        fontFamily: "Poppins_500Medium",
                                        fontSize: RFValue(14, 844),
                                        color: this.checkIfParticipantsExist(
                                          key?.id
                                        )
                                          ? COLORS.monoBlack500
                                          : COLORS.monoBlack900,
                                      }}
                                    >
                                      {key?.displayName}
                                    </Text>
                                    <Text>
                                      {key?.subCategoryNames &&
                                        key?.subCategoryNames?.length > 0 &&
                                        key?.subCategoryNames.map(
                                          (key, index) => {
                                            return index < 1 ? (
                                              <Text
                                                style={{
                                                  fontFamily:
                                                    "Poppins_400Regular",
                                                  fontSize: RFValue(12, 844),
                                                  color: COLORS.monoBlack500,
                                                }}
                                              >
                                                {key.name}
                                              </Text>
                                            ) : null;
                                          }
                                        )}
                                      {key?.subCategoryNames?.length > 1 ? (
                                        <Text
                                          style={{
                                            fontFamily: "Poppins_400Regular",
                                            fontSize: RFValue(12, 844),
                                            color: COLORS.monoBlack500,
                                          }}
                                        >
                                          {` +${
                                            key.subCategoryNames.length - 1
                                          }`}
                                        </Text>
                                      ) : null}
                                    </Text>

                                    <Text
                                      style={{
                                        fontFamily: "Poppins_400Regular",
                                        fontSize: RFValue(14, 844),
                                        color: COLORS.monoBlack500,
                                      }}
                                    >
                                      {this.handleSplitText(key?.bio)}
                                    </Text>
                                  </View>
                                </View>
                                {this.checkIfParticipantsExist(key?.id) ? (
                                  <SvgUri
                                    svgXmlData={SVGS.GREEN_CIRCLE_CHECK}
                                    width={RFValue(24, 844)}
                                    height={RFValue(24, 844)}
                                  />
                                ) : (
                                  <TouchableWithoutFeedback
                                    onPress={() => {
                                      var temp = participants;
                                      var arr = {
                                        id: key?.id,
                                        inCircle: false,
                                        profileImageUrl: key.profileImageUrl,
                                        displayName: key?.displayName,
                                        expoToken: key?.expoToken,
                                      };
                                      temp?.push(arr);
                                      this.setState({ participants: temp });
                                    }}
                                  >
                                    <Icon
                                      type="feather"
                                      name="plus-circle"
                                      size={20}
                                      color={COLORS.monoBlack500}
                                    />
                                  </TouchableWithoutFeedback>
                                )}
                              </View>
                            );
                          } else {
                            return null;
                          }
                        }
                      })
                    ) : (
                      <NothingHere
                        text="Nothing Here! Comeback later 👋"
                        image={IMAGES.NoPending}
                      />
                    )}
                  </>
                )}
                {guloading ? (
                  <View style={Styles.userCardView}>
                    <View style={[Styles.skeletonUserCard]}>
                      <Skeleton styles={Styles.sCardProfile} />
                      <View style={Styles.sCardBlock}>
                        <Skeleton
                          styles={[Styles.sCardStick, { width: "80%" }]}
                        />
                        <Skeleton
                          styles={[Styles.sCardStick, { width: "50%" }]}
                        />
                      </View>
                    </View>
                  </View>
                ) : null}
              </ScrollView>
            )}
          </>
        )}
      </View>
    );
  }
}
const mapStateToProps = (state) => {
  const {
    projects,
    projectAction,
    circle,
    saved,
    collab,
    getUser,
    userSearch,
    profile,
  } = state;
  return {
    projects,
    projectAction,
    circle,
    saved,
    collab,
    getUser,
    userSearch,
    profile,
  };
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
    addParticipants: (userId, tokenDetail, projectId, participants) => {
      dispatch({
        type: projectActionTypes.ADD_MEMBERS,
        userId,
        tokenDetail,
        projectId,
        participants,
      });
    },
    callApiToGetTrendingUser: (userId, tokenDetail, params) => {
      dispatch({
        type: getUserDiscoverTypes.GET_TRENDING_USER_DISCOVERY,
        userId,
        tokenDetail,
        params,
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
    callSearchProfileApi: (userId, tokenDetail, name, query) => {
      dispatch({
        type: userSearchTypes.SEARCH_USER_PROFILE,
        userId,
        tokenDetail,
        name,
        query,
      });
    },
    callApiToGetNearByUser: (
      userId,
      tokenDetail,
      recordOffset,
      recordPerPage
    ) => {
      dispatch({
        type: getUserDiscoverTypes.GET_NEAR_BY_USER_DISCOVERY,
        userId,
        tokenDetail,
        recordOffset,
        recordPerPage,
      });
    },
    resetRecordOffset: () => {
      dispatch({
        type: getUserDiscoverTypes.RESET_OFF_SET_VALUE,
      });
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(AddMember);
