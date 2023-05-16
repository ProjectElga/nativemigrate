import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  TextInput,
  Image,
} from "react-native";
import Header from "../../components/multicellular/discover/header";
import AsyncStorage from "@react-native-async-storage/async-storage";
import STORAGE_KEY from "../../constants/StorageKeys";
import COLORS from "../../themes/colors";
import { RFValue } from "react-native-responsive-fontsize";
import ProfileHeader from "../../components/multicellular/profile/header/header";
import SVGS from "../../constants/SvgUri";
import SvgUri from "expo-svg-uri";
import Icon from "react-native-vector-icons/Ionicons";
import userList from "../../assets/jsons/discover/profiles.json";
import UserCard from "../../components/multicellular/general/userCard";
import { ScrollView } from "react-native-gesture-handler";
import IMAGES from "../../themes/Images";
import { getUserDiscoverTypes } from "../../reducers/discover/getUser";
import styles from "./Style";
import SearchBarWithFilter from "../../components/multicellular/general/searchBar";
import Filter from "../../components/multicellular/discover/discoverFilter";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { userSearchTypes } from "../../reducers/search/userSearch";
import { connect } from "react-redux";
import STRINGS from "../../constants/Strings";
import Skeleton from "../../components/multicellular/general/skeleton/skeleton";
import shadow from "../../constants/shadow";
import NothingHere from "../../components/multicellular/general/nothingHere/nothingHere";
import { withNavigation, withNavigationFocus } from "react-navigation";
import { popularGenreTypes } from "../../reducers/search/popularGenre";
import { makePostApiCall } from "../../api";
import URLS from "../../constants/Urls";
import { circleTypes } from "../../reducers/projects/circle";
import { isCloseToBottom } from "../../utils/LazyLoading";
import * as Analytics from "expo-firebase-analytics";

class Search extends Component {
  constructor() {
    super();
    this.state = {
      recents: [
        "Dancer",
        "Comedy",
        "Standup",
        "nft",
        "guitarist",
        "VisualArts",
      ],
      activeTab: 0,
      categories: [
        { title: "Profile", value: 0 },
        { title: "Tag", value: 1 },
        { title: "Category", value: 2 },
      ],
      selectedRecents: "",
      selectedGenre: "",
      searchText: "",
      results: [],
      tabActive: true,
      addtoCircleClick: false,
      activeId: [],
    };
  }
  async componentDidMount() {
    this.props.resetRecordOffset();
    const {
      profile: { profileData = {} },
    } = this.props;
    Analytics.logEvent("screen_view", {
      firebase_screen: "Search",
      userId: profileData?.id,
      displayName: profileData?.displayName,
      isCreator: profileData?.isCreator,
    });
    const userId = await AsyncStorage.getItem(STORAGE_KEY.USER_ID);
    const tokenDetail = await AsyncStorage.getItem(STORAGE_KEY.ACCESS_TOKEN);
    let params = {
      id: userId,
      trending: true,
      businessProfile: false,
      recordOffset: 0,
      recordPerPage: 10,
    };
    this.props.callpopularUserApi(params, tokenDetail, userId);
  }
  handleFilter = async (event) => {
    this.setState({
      searchText: event,
    });

    const userId = await AsyncStorage.getItem(STORAGE_KEY.USER_ID);
    const tokenDetail = await AsyncStorage.getItem(STORAGE_KEY.ACCESS_TOKEN);
    const query = "profile";
    this.props.callSearchProfileApi(userId, tokenDetail, event, query);
    const searchWord = event;
    const newFilter = userList.filter((value) => {
      return value.name.toLowerCase().includes(searchWord.toLowerCase());
    });

    if (searchWord === "") {
      this.setState({
        results: [],
      });
    } else {
      this.setState({
        results: [...newFilter],
      });
    }
  };
  handleIsSavedClicked = async (item) => {
    const { savedArray } = this.props.getUser;
    let array = savedArray;
    const userId = await AsyncStorage.getItem(STORAGE_KEY.USER_ID);
    const tokenDetail = await AsyncStorage.getItem(STORAGE_KEY.ACCESS_TOKEN);
    const saveEntity = "USER";
    let params = {
      id: userId,
      entityId: item.id,
      saveEntity: saveEntity,
    };
    const response = await makePostApiCall(
      URLS.API_SAVE_ENTITY(item.id),
      {},
      tokenDetail,
      params
    );
    if (typeof response.status !== "undefined" && response.status) {
      if (array.some((data) => data.id === item.id)) {
        // let index = array.indexOf(item);
        let index = array
          .map(function (e) {
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
  checkIsSaved = (item) => {
    const { savedArray } = this.props.getUser;
    console.log("savedArray------------------->", this.props.getUser);
    return savedArray.some((data) => data.id === item.id);
  };
  handleOnPressMessage = (id) => {
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
  handleCircleRequest = async (id) => {
    const userId = await AsyncStorage.getItem(STORAGE_KEY.USER_ID);
    const tokenDetail = await AsyncStorage.getItem(STORAGE_KEY.ACCESS_TOKEN);
    const requestParam = {
      senderUserId: userId,
      receiverUserId: id,
    };
    let arr = this.state.activeId;
    arr.push(id);
    this.setState({ addtoCircleClick: true, activeId: [...arr] });
    this.props.sendCircleRequest(requestParam, tokenDetail);
  };
  handleSplitText = (text) => {
    if (text?.length > 24) {
      return text.substring(0, 24) + "...";
    } else {
      return text;
    }
  };
  _renderResult = () => {
    const { userSearchData = [], loading, error } = this.props.userSearch;
    return userSearchData && userSearchData?.length > 0 ? (
      userSearchData.map((item, index) => {
        return (
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.navigate(
                !item?.isCreator ? "BrandProfile" : "CreatorProfile",
                {
                  selfView: false,
                  userId: item.id,
                }
              );
            }}
          >
            <View style={styles.resultWrapper} key={index}>
              <Image
                style={styles.resultImage}
                source={{ uri: item.profileImageUrl }}
              />
              <View>
                <Text style={styles.resultText}>
                  {item?.displayName || item?.name}
                </Text>
                <Text style={styles.resultTextSmall}>
                  @{this.handleSplitText(item?.userName)}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        );
      })
    ) : (
      <View>
        <NothingHere text="No user Found!" image={IMAGES.NoPending} />
      </View>
    );
  };
  _renderResultGenre = () => {
    const { userSearchData = [], loading, error } = this.props.userSearch;
    return userSearchData && userSearchData?.length > 0 ? (
      userSearchData.map((item, index) => {
        return (
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.navigate("SearchDetail", {
                searchType: "generalTag",
                eventQuery: item?.tag,
                tabActive: false,
              });
            }}
          >
            <View style={styles.resultWrapper} key={index}>
              <View style={styles.resultImage}>
                <SvgUri
                  width={20}
                  height={20}
                  svgXmlData={SVGS.BLACK_HASHTAG}
                  zindex
                />
              </View>
              <View>
                <Text style={styles.resultText}>{item?.tag}</Text>
              </View>
            </View>
          </TouchableOpacity>
        );
      })
    ) : (
      <View>
        <NothingHere text="No user Found!" image={IMAGES.NoPending} />
      </View>
    );
  };
  _renderResultCategory = () => {
    const { userSearchData = [] } = this.props.userSearch;
    return userSearchData && userSearchData?.length > 0 ? (
      userSearchData.map((item, index) => {
        return (
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.navigate("SearchDetail", {
                searchType: "generalCategory",
                eventQuery: item?.name,
                tabActive: false,
              });
            }}
          >
            <View style={styles.resultWrapper} key={index}>
              <View style={styles.resultImage}>
                <SvgUri
                  width={20}
                  height={20}
                  svgXmlData={SVGS.BLACK_HASHTAG}
                  zindex
                />
              </View>
              <View>
                <Text style={styles.resultText}>{item?.name}</Text>
              </View>
            </View>
          </TouchableOpacity>
        );
      })
    ) : (
      <View>
        <NothingHere text="No user Found!" image={IMAGES.NoPending} />
      </View>
    );
  };
  async callApiForProject(tab) {
    const userId = await AsyncStorage.getItem(STORAGE_KEY.USER_ID);
    const tokenDetail = await AsyncStorage.getItem(STORAGE_KEY.ACCESS_TOKEN);

    if (tab === 0) {
      this.props.callSearchProfileApi(
        userId,
        tokenDetail,
        this.state.searchText,
        "profile"
      );
    }
    if (tab === 1) {
      this.props.callSearchProfileApi(
        userId,
        tokenDetail,
        this.state.searchText,
        "tag"
      );
    }
    if (tab === 2) {
      this.props.callSearchProfileApi(
        userId,
        tokenDetail,
        this.state.searchText,
        "category"
      );
    }
    const searchWord = this.state.searchText;
    const newFilter = userList.filter((value) => {
      return value.name.toLowerCase().includes(searchWord.toLowerCase());
    });

    if (searchWord === "") {
      this.setState({
        results: [],
      });
    } else {
      this.setState({
        results: [...newFilter],
      });
    }
  }
  handleChangeToggle(value) {
    this.setState({
      activeTab: value.value,
      comingSoonVisible: !this.state.comingSoonVisible,
    });
    this.callApiForProject(value.value);
  }
  renderCategoryTab = () => {
    return (
      <View style={styles.categoryTab}>
        {this.state.categories.map((value, index) => {
          return (
            <TouchableOpacity onPress={() => this.handleChangeToggle(value)}>
              <View
                key={index}
                // style={[
                //   styles.categorybutton,
                //   {
                //     shadowOpacity:
                //       this.state.activeTab == value.value ? 0.1 : 0,
                //     backgroundColor:
                //       this.state.activeTab == value.value
                //         ? COLORS.primaryTeal500
                //         : COLORS.monoGhost500,
                //     flexDirection: "row",
                //     alignItems: "center",
                //     justifyContent: "center",
                //   },
                // ]}
                style={[
                  styles.projectTypeCard,
                  {
                    backgroundColor:
                      this.state.activeTab == value.value
                        ? COLORS.monoBlack900
                        : COLORS.monoGhost500,
                  },
                ]}
              >
                <Text
                  style={[
                    styles.projectTypeCardText,
                    {
                      color:
                        this.state.activeTab == value.value
                          ? COLORS.monoWhite900
                          : COLORS.monoBlack700,
                    },
                  ]}
                >
                  {value.title}
                </Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  };
  _renderPopularSection = () => {
    const { getDiscoverUser, guloading } = this.props.getUser;

    return (
      <>
        <Text style={styles.tagTitle}>
          {getDiscoverUser && getDiscoverUser.length > 0
            ? "Popular Creators"
            : null}
        </Text>
        <View style={styles.userCardView}>
          {getDiscoverUser &&
            getDiscoverUser.length > 0 &&
            getDiscoverUser.map((item, index) => {
              return (
                <UserCard
                  onPressSaved={() => this.handleIsSavedClicked(item)}
                  onPress={() => {
                    this.props.navigation.navigate(
                      !item?.isCreator ? "BrandProfile" : "CreatorProfile",
                      {
                        selfView: false,
                        userId: item.id,
                      }
                    );
                  }}
                  onCirclePress={
                    item?.circleStatus === "ACCEPTED"
                      ? () => this.handleOnPressMessage(item.id)
                      : this.state.addtoCircleClick &&
                        activeId.includes(item.id)
                      ? null
                      : typeof item?.circleStatus === "undefined"
                      ? () => this.handleCircleRequest(item.id)
                      : item?.circleStatus === "PENDING"
                      ? () => {
                          this.props.navigation.navigate("Projects", {
                            activeTab: 3,
                            activeSection: "Pending",
                          });
                        }
                      : null
                  }
                  isSaved={this.checkIsSaved(item)}
                  buttonColor={item?.circleStatus === "ACCEPTED"}
                  circletext={
                    this.state.addtoCircleClick &&
                    this.state.activeId.includes(item.id)
                      ? "Request Sent"
                      : typeof item?.circleStatus === "undefined"
                      ? "Add to Circle"
                      : item?.circleStatus === "ACCEPTED"
                      ? "Message"
                      : item?.circleStatus === "SENT"
                      ? "Request Sent"
                      : "Accept Request"
                  }
                  border={true}
                  isAdmin={!item?.isCreator}
                  userData={item}
                />
              );
            })}
          {guloading ? (
            <View style={[shadow, styles.skeletonUserCard]}>
              <Skeleton styles={styles.sCardProfile} />
              <View style={styles.sCardBlock}>
                <Skeleton styles={[styles.sCardStick, { width: "80%" }]} />
                <Skeleton styles={[styles.sCardStick, { width: "50%" }]} />
              </View>
            </View>
          ) : null}
        </View>
      </>
    );
  };
  renderPopularGenresection = (data) => {
    return (
      <View>
        <Text style={styles.tagTitle}>Popular Tags</Text>
        <View
          style={{
            flexWrap: "wrap",
            flexDirection: "row",
            marginTop: 8,
          }}
        >
          {data.map((item, index) => {
            return (
              <TouchableOpacity
                key={index}
                onPress={() => {
                  this.setState({
                    selectedGenre: item?.tag,
                  });
                  this.props.navigation.navigate("SearchDetail", {
                    eventQuery: item?.tag,
                    searchType: "generalTag",
                    tabActive: false,
                  });
                }}
              >
                <View
                  style={[
                    styles.projectTypeCard,
                    {
                      backgroundColor:
                        this.state.selectedGenre == item?.tag
                          ? COLORS.monoBlack900
                          : COLORS.monoGhost500,
                    },
                  ]}
                >
                  <Text
                    style={[
                      styles.projectTypeCardText,
                      {
                        color:
                          this.state.selectedGenre == item?.tag
                            ? COLORS.monoWhite900
                            : COLORS.monoBlack700,
                      },
                    ]}
                  >
                    #{item?.tag}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    );
  };
  retrieveMore = async () => {
    const { recordOffset, recordPerPage } = this.props.getUser;
    const userId = await AsyncStorage.getItem(STORAGE_KEY.USER_ID);
    const tokenDetail = await AsyncStorage.getItem(STORAGE_KEY.ACCESS_TOKEN);

    let params = {
      id: userId,
      trending: true,
      recordOffset: recordOffset,
      recordPerPage: recordPerPage,
      businessProfile: false,
    };
    this.props.callpopularUserApi(params, tokenDetail, userId);
  };
  render() {
    const { popularGenreData = [] } = this.props.popularGenre;
    const { isMoreData, guloading } = this.props.getUser;
    return (
      <BottomSheetModalProvider>
        <View style={styles.wrapper}>
          {/* <ProfileHeader
            height={RFValue(48, 844)}
            marginBottom={0}
            text="Search"
            showBackIcon={false}
            onBackPress={() => {
              this.props.navigation.goBack(null);
            }}
            rightComponent={() => {
              return (
                <TouchableOpacity
                  onPress={() => {
                    this.props.navigation.goBack(null);
                  }}
                >
                  <SvgUri width={20} height={20} svgXmlData={SVGS.GREYCLOSE} />
                </TouchableOpacity>
              );
            }}
          /> */}
          <Header
            isDetail={true}
            pageTitle={"Search"}
            onPressBack={() => {
              this.props.navigation.goBack(null);
            }}
            isHideSearch
          />
          <View>
            {this.state.searchText == "" ? (
              <SearchBarWithFilter
                enableInput={true}
                bgColor={COLORS.monoGhost500}
                onChangeText={this.handleFilter}
                returnKeyType="search"
              />
            ) : (
              <SearchBarWithFilter
                enableInput={true}
                bgColor={COLORS.monoGhost500}
                onChangeText={this.handleFilter}
                returnKeyType="search"
                onIconPress={() => {}}
                onSubmitEditing={() => {
                  this.props.navigation.navigate("SearchDetail", {
                    searchType: "profile",
                    eventQuery: this.state.searchText,
                    tabActive: true,
                  });
                }}
              />
            )}
          </View>
          {this.state.searchText == "" ? (
            <ScrollView
              overScrollMode="always"
              showsVerticalScrollIndicator={false}
              style={{ marginTop: RFValue(24, 844) }}
              onScroll={({ nativeEvent }) => {
                if (isCloseToBottom(nativeEvent) && isMoreData && !guloading) {
                  this.retrieveMore();
                }
              }}
            >
              {/* <View>
                <Text style={[styles.tagTitle, { marginTop: 0 }]}>Recent</Text>
                <View
                  style={{
                    flexWrap: "wrap",
                    flexDirection: "row",
                    marginTop: 8,
                  }}
                >
                  {this.state.recents.map((item, index) => {
                    return (
                      <TouchableOpacity
                        key={index}
                        onPress={() => {
                          this.setState({
                            selectedRecents: item,
                          });
                        }}
                      >
                        <View
                          style={[
                            styles.projectTypeCard,
                            {
                              backgroundColor:
                                this.state.selectedRecents == item
                                  ? COLORS.primaryTeal500
                                  : COLORS.monoGhost500,
                            },
                          ]}
                        >
                          <Text
                            style={[
                              styles.projectTypeCardText,
                              {
                                color:
                                  this.state.selectedRecents == item
                                    ? COLORS.monoWhite900
                                    : COLORS.monoBlack700,
                              },
                            ]}
                          >
                            #{item}
                          </Text>
                        </View>
                      </TouchableOpacity>
                    );
                  })}
                </View>
              </View> */}
              {popularGenreData &&
                popularGenreData?.length > 0 &&
                this.renderPopularGenresection(popularGenreData)}
              {this._renderPopularSection()}
            </ScrollView>
          ) : (
            <ScrollView
              showsVerticalScrollIndicator={false}
              overScrollMode="always"
            >
              {this.renderCategoryTab()}
              {this.state.activeTab === 0 && this._renderResult()}
              {this.state.activeTab === 1 && this._renderResultGenre()}
              {this.state.activeTab === 2 && this._renderResultCategory()}
            </ScrollView>
          )}
        </View>
      </BottomSheetModalProvider>
    );
  }
}

const mapStateToProps = (state) => {
  const { userSearch, getUser, popularGenre, projects, profile } = state;
  return { userSearch, getUser, popularGenre, projects, profile };
};

const mapDispatchToProps = (dispatch) => {
  return {
    callSearchProfileApi: (userId, tokenDetail, name, query) => {
      dispatch({
        type: userSearchTypes.SEARCH_USER_PROFILE,
        userId,
        tokenDetail,
        name,
        query,
      });
    },
    resetRecordOffset: () => {
      dispatch({
        type: getUserDiscoverTypes.RESET_OFF_SET_VALUE,
      });
    },
    sendCircleRequest: (requestParam, tokenDetail) => {
      dispatch({
        type: circleTypes.SEND_CIRCLE_REQ,
        requestParam,
        tokenDetail,
      });
    },
    setSavedArray: (savedData) => {
      dispatch({
        type: getUserDiscoverTypes.SET_USER_SAVED_REDUCER,
        savedData,
      });
    },
    callpopularUserApi: (params, tokenDetail, userId) => {
      dispatch({
        type: getUserDiscoverTypes.GET_TRENDING_USER_DISCOVERY,
        params,
        tokenDetail,
      });
      dispatch({
        type: popularGenreTypes.GET_POPULAR_GENRE,
        userId,
        tokenDetail,
      });
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Search);
