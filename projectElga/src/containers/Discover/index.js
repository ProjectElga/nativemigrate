import React, {
  useState,
  useCallback,
  useMemo,
  useRef,
  useEffect,
} from "react";
import { connect, useSelector } from "react-redux";
import {
  View,
  ScrollView,
  TextInput,
  Text,
  Image,
  KeyboardAvoidingView,
  TouchableOpacity,
  FlatList,
} from "react-native";
import BottomNavBar from "../../components/multicellular/general/bottomNavBar/bottomNavBar";
import { useIsFocused } from "@react-navigation/native";
import * as Location from "expo-location";

import AsyncStorage from "@react-native-async-storage/async-storage";
import STORAGE_KEY from "../../constants/StorageKeys";
import styles from "./Styles";
import Header from "../../components/multicellular/discover/header";
import CategoryCard from "../../components/multicellular/discover/categoryCard";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/Ionicons";
import SearchBarWithFilter from "../../components/multicellular/general/searchBar";
import Filter from "../../components/multicellular/discover/discoverFilter";
import UserCard from "../../components/multicellular/general/userCard";
import Detail from "./Detail";
import IMAGES from "../../themes/Images";
import { RFValue } from "react-native-responsive-fontsize";
import { categoryTypes } from "../../reducers/discover/category";
import STRINGS from "../../constants/Strings";
import { getUserDiscoverTypes } from "../../reducers/discover/getUser";
import { getTrendingUserDiscoverTypes } from "../../reducers/discover/getTrendingUser";
import DiscoverLoader from "./loader";
import URLS from "../../constants/Urls";
import { makePostApiCall } from "../../api";
import { locationTypes } from "../../reducers/location/location";
import Skeleton from "../../components/multicellular/general/skeleton/skeleton";
import shadow from "../../constants/shadow";
import ENUM from "../../constants/Enum";
import { projectTypes } from "../../reducers/projects/projects";
import { circleTypes } from "../../reducers/projects/circle";
import LocationModal from "../../components/multicellular/general/locationModal";
import * as Analytics from "expo-firebase-analytics";
import HeaderFilter from "../../components/multicellular/discover/discoverFilter/HeaderFilter";

const Discover = (props) => {
  const [activeLink, setActiveLink] = useState("Trending");
  const isFocused = useIsFocused();
  const [showDetail, setShowDetail] = useState(false);
  const [activeCategoryId, setActiveCategoryId] = useState("");
  const [showDetailTitle, setShowDetailTitle] = useState("");
  const [categoryData, setCategoryData] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [addtoCircleClick, setAddtoCircleClick] = useState(false);
  const [activeId, setActiveId] = useState([]);

  const filter = useSelector((state) => state.filter);
  const {
    platform = "",
    distance,
    trending,
    businessProfile,
    minFilterA,
    maxFilterA,
    minFilterB,
    maxFilterB,
    minFilterC,
    maxFilterC,
  } = filter;
  // variables
  const snapPoints = useMemo(() => ["55%", "75%"], []);
  const {
    callCategoryApi,
    callApiToGetUserFromCategory,
    callApiToGetTrendingUser,
    callApiToGetNearByUser,
    callResetLoader,
    callResetDiscover,
  } = props;
  const profile = useSelector((state) => state.profile);
  const { profileData } = profile;
  const getTrendingUser = useSelector((state) => state.getTrendingUser);
  const getUser = useSelector((state) => state.getUser);
  const {
    getDiscoverUser,
    guloading,
    savedArray,
    recordOffset,
    recordPerPage,
    isMoreData,
  } = getUser;

  const discover = useSelector((state) => state.discover);
  const cover = [IMAGES.cover1, IMAGES.cover2];
  // const { getTrendingUsers,guloading } = getTrendingUser;
  const { category_Data, loading } = discover;
  const readLocation = async () => {
    const location = await AsyncStorage.getItem(STORAGE_KEY.USER_LOCATION);
    if (location) {
      return true;
    }
    return false;
  };
  useEffect(() => {
    setActiveLink("Trending");
    if (isFocused) {
      effect();
    }
  }, [isFocused, showDetail]);

  const effect = async () => {
    props.resetRecordOffset();
    const userId = await AsyncStorage.getItem(STORAGE_KEY.USER_ID);
    const tokenDetail = await AsyncStorage.getItem(STORAGE_KEY.ACCESS_TOKEN);
    //let isLocation = await readLocation();
    // if (!isLocation) {
    //   (async () => {
    //     let { status } = await Location.requestForegroundPermissionsAsync();
    //     if (status !== "granted") {
    //       console.log("Permission to access location was denied");
    //       return;
    //     }
    //     let location = await Location.getCurrentPositionAsync({});
    //     const { coords: { latitude = 0, longitude = 0 } = {} } = location;
    //     props.callLocationApi(userId, tokenDetail, latitude, longitude);
    //     await AsyncStorage.setItem(STORAGE_KEY.USER_LOCATION, location);
    //   })();
    // }
    // if (isLocation) {
    //   const { coords: { latitude = 0, longitude = 0 } = {} } =
    //     await AsyncStorage.getItem(STORAGE_KEY.USER_LOCATION);
    //   props.callLocationApi(userId, tokenDetail, latitude, longitude);
    // }
    if (!showDetail) {
      // props.callApiToGetNearByUser(userId, tokenDetail, 0, 10);
      let params = {
        id: userId,
        trending: true,
        businessProfile: false,
        recordOffset: 0,
        recordPerPage: 10,
      };
      callApiToGetTrendingUser(params, tokenDetail);
      props.callCategoryApi(userId, tokenDetail);
    }
    props.callprojectApi(userId, tokenDetail, ENUM.ONGOING);
    return () => {
      callResetDiscover();
    };
  };
  const handleIsSavedClicked = async (item) => {
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
        props.setSavedArray([...array]);
      } else {
        array.push(item);
        props.setSavedArray([...array]);
      }
    } else {
      alert("error>>" + JSON.stringify(response.message));
    }
  };
  const checkIsSaved = (item) => {
    return savedArray.some((data) => data.id === item.id);
  };
  const handleClickOnCategory = async (item, title) => {
    const userId = await AsyncStorage.getItem(STORAGE_KEY.USER_ID);
    const tokenDetail = await AsyncStorage.getItem(STORAGE_KEY.ACCESS_TOKEN);
    props.resetRecordOffset();
    setShowDetail(true);
    setCategoryData(item?.subcategory);
    setActiveCategoryId(item.id);
    callApiToGetUserFromCategory(userId, tokenDetail, item.id, 0, 10);
    setShowDetailTitle(title);
  };

  const _renderInput = () => {
    return (
      <SearchBarWithFilter
        onPress={() => {
          Analytics.logEvent(`Discover_SearchBar`, {
            contentType: "search",
            userId: profileData?.id,
            displayName: profileData?.displayName,
            isCreator: profileData?.isCreator,
          });
          props.navigation.navigate("Search");
        }}
        filter={() => {
          return (
            <Filter
              onPress={async () => {
                props.navigation.navigate("FilterPage");
              }}
            />
          );
        }}
      />
    );
  };
  const onChangeToggleNearMe = async () => {
    props.resetRecordOffset();
    const userId = await AsyncStorage.getItem(STORAGE_KEY.USER_ID);
    const tokenDetail = await AsyncStorage.getItem(STORAGE_KEY.ACCESS_TOKEN);
    props.callApiToGetNearByUser(userId, tokenDetail, 0, 10);
    setActiveLink("NearMe");
  };
  const onChangeToggleTrending = async () => {
    props.resetRecordOffset();
    const userId = await AsyncStorage.getItem(STORAGE_KEY.USER_ID);
    const tokenDetail = await AsyncStorage.getItem(STORAGE_KEY.ACCESS_TOKEN);
    let params = {
      id: userId,
      trending: true,
      businessProfile: false,
      recordOffset: 0,
      recordPerPage: 10,
    };
    callApiToGetTrendingUser(params, tokenDetail);
    setActiveLink("Trending");
  };

  const handleCircleRequest = async (receiverUserId) => {
    Analytics.logEvent(`Discovery_AddToCircle`, {
      contentType: "Add To Circle",
      userId: profileData?.id,
      displayName: profileData?.displayName,
      isCreator: profileData?.isCreator,
    });

    const userId = await AsyncStorage.getItem(STORAGE_KEY.USER_ID);
    const tokenDetail = await AsyncStorage.getItem(STORAGE_KEY.ACCESS_TOKEN);
    const requestParam = {
      senderUserId: userId,
      receiverUserId: receiverUserId,
    };
    props.sendCircleRequest(requestParam, tokenDetail);
    setAddtoCircleClick(true);
    let arr = activeId;
    arr.push(receiverUserId);
    setActiveId([...arr]);
  };
  const _renderToggle = () => {
    return (
      <View style={styles.toggleSwitchView}>
        <TouchableOpacity onPress={onChangeToggleTrending}>
          <View style={styles.flexBoxCenter}>
            <Text
              style={
                activeLink === "Trending"
                  ? styles.toggleSwitchActive
                  : styles.toggleSwitch
              }
            >
              Trending
            </Text>
            {activeLink === "Trending" && (
              <View style={styles.toggleSwitchActiveIcon}></View>
            )}
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={onChangeToggleNearMe}>
          <View style={styles.flexBoxCenter}>
            {activeLink === "NearMe" && (
              <View style={styles.toggleSwitchActiveIcon}></View>
            )}
            <Text
              style={
                activeLink === "NearMe"
                  ? styles.toggleSwitchActive
                  : styles.toggleSwitch
              }
            >
              Near Me
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  };
  const handleOnPressMessage = (id) => {
    const { loading, projectsData = [], error } = props.projects;
    Analytics.logEvent(`Discovery_Message`, {
      contentType: "Message",
      userId: profileData?.id,
      displayName: profileData?.displayName,
      isCreator: profileData?.isCreator,
    });
    projectsData?.projectList &&
      projectsData?.projectList.length > 0 &&
      projectsData?.projectList?.map((value, index) => {
        if (value.type == "CIRCLE" && value.participants[0].id == id) {
          props.navigation.navigate("Chat", {
            ChatRoomData: value,
            //membersName: data.participants,
            // memberProfile: data,
            // memberIds: data,
            //conversationImage: data[0].profileImageUrl,
          });
        }
      });
  };
  const retrieveMore = async () => {
    console.log("recordOffset called");
    const userId = await AsyncStorage.getItem(STORAGE_KEY.USER_ID);
    const tokenDetail = await AsyncStorage.getItem(STORAGE_KEY.ACCESS_TOKEN);
    if (activeLink === "NearMe") {
      props.callApiToGetNearByUser(
        userId,
        tokenDetail,
        recordOffset,
        recordPerPage
      );
    } else {
      let params = {
        id: userId,
        trending: true,
        recordOffset: recordOffset,
        recordPerPage: recordPerPage,
        businessProfile: false,
      };
      callApiToGetTrendingUser(params, tokenDetail);
    }
  };
  const renderDetailInfo = () => {
    return (
      <View
        style={{ paddingBottom: RFValue(24, 844), marginTop: RFValue(8, 844) }}
      >
        {/* <View style={styles.bodyWrapper}>
              <Text style={styles.sectionTitle}>Explore</Text>
            </View> */}
        <ScrollView
          horizontal={true}
          overScrollMode={"never"}
          style={styles.horizontalScrollView}
          showsHorizontalScrollIndicator={false}
        >
          {category_Data &&
            category_Data.length > 0 &&
            category_Data.map((item, index) => {
              return (
                <View
                  style={{
                    marginRight: index === category_Data.length - 1 ? 16 : 0,
                  }}
                >
                  <CategoryCard
                    image={item.picUrl}
                    text={item.name}
                    onPress={() => handleClickOnCategory(item, item.name)}
                  />
                </View>
              );
            })}
        </ScrollView>
        <View style={styles.bodyWrapper}>
          {/* {getDiscoverUser && getDiscoverUser.length > 0 && <LocationModal />} */}
          {_renderToggle()}
          <View style={styles.userCardView}>
            {getDiscoverUser &&
              getDiscoverUser.length > 0 &&
              getDiscoverUser.map((item, index) => {
                return (
                  <UserCard
                    onPress={() => {
                      props.navigation.navigate(
                        !item?.isCreator ? "BrandProfile" : "CreatorProfile",
                        {
                          selfView: false,
                          userId: item?.id,
                          displayName: item?.displayName,
                        }
                      );
                    }}
                    onCirclePress={
                      item?.circleStatus === "ACCEPTED"
                        ? () => handleOnPressMessage(item.id)
                        : addtoCircleClick && activeId.includes(item.id)
                        ? null
                        : typeof item?.circleStatus === "undefined"
                        ? () => handleCircleRequest(item.id)
                        : item?.circleStatus === "PENDING"
                        ? () => {
                            props.navigation.navigate("Projects", {
                              activeTab: 3,
                              activeSection: "Pending",
                            });
                          }
                        : null
                    }
                    buttonColor={item?.circleStatus === "ACCEPTED"}
                    circletext={
                      addtoCircleClick && activeId.includes(item.id)
                        ? "Request Sent"
                        : typeof item?.circleStatus === "undefined"
                        ? "Add to Circle"
                        : item?.circleStatus === "ACCEPTED"
                        ? "Message"
                        : item?.circleStatus === "SENT"
                        ? "Request Sent"
                        : "Accept Request"
                    }
                    collab={true}
                    cover={cover[index]}
                    isAdmin={!item?.isCreator}
                    userData={item}
                    key={index}
                    isSaved={checkIsSaved(item)}
                    onPressSaved={() => handleIsSavedClicked(item)}
                  />
                );
              })}
            {guloading ? (
              <View style={styles.userCardView}>
                <View style={[shadow, styles.skeletonUserCard]}>
                  <Skeleton styles={styles.sCardProfile} />
                  <View style={styles.sCardBlock}>
                    <Skeleton styles={[styles.sCardStick, { width: "80%" }]} />
                    <Skeleton styles={[styles.sCardStick, { width: "50%" }]} />
                  </View>
                </View>
              </View>
            ) : null}
          </View>
        </View>
      </View>
    );
  };
  const isCloseToBottom = ({
    layoutMeasurement,
    contentOffset,
    contentSize,
  }) => {
    const paddingToBottom = 20;
    return (
      layoutMeasurement.height + contentOffset.y >=
      contentSize.height - paddingToBottom
    );
  };
  return (
    <View>
      {category_Data &&
      Object.keys(category_Data).length === 0 &&
      Object.getPrototypeOf(category_Data) === Object.prototype ? (
        loading ? (
          <DiscoverLoader />
        ) : (
          <View>
            <View style={styles.wrapper}>
              <View style={{ paddingHorizontal: RFValue(16, 844) }}>
                <Header
                  isDetail={showDetail}
                  pageTitle={showDetailTitle}
                  onPressBack={() => {
                    setShowDetail(false);
                  }}
                  isHideSearch
                />
                {_renderInput()}
              </View>
            </View>
            <BottomNavBar activeTab="Network" />
          </View>
        )
      ) : (
        <View>
          <View style={styles.wrapper}>
            <View style={{ paddingHorizontal: RFValue(16, 844) }}>
              <Header
                isDetail={showDetail}
                pageTitle={showDetailTitle}
                onPressBack={() => {
                  setShowDetail(false);
                }}
                filter={() => {
                  return (
                    <HeaderFilter
                      onPress={async () => {
                        props.navigation.navigate("FilterPage");
                      }}
                    />
                  );
                }}
                isHideSearch={showDetail}
                isShowFilter={showDetail ? false : true}
              />

              {/* {_renderInput()} */}
            </View>
            {showDetail ? (
              <Detail
                categoryData={categoryData}
                isAdmin={isAdmin}
                activeCategoryId={activeCategoryId}
                onPress={() => {
                  props.navigation.navigate("BrandProfile");
                }}
              />
            ) : (
              <ScrollView
                showsVerticalScrollIndicator={false}
                overScrollMode="never"
                onScroll={({ nativeEvent }) => {
                  if (
                    isCloseToBottom(nativeEvent) &&
                    isMoreData &&
                    !guloading
                  ) {
                    retrieveMore();
                  }
                }}
              >
                {renderDetailInfo()}
              </ScrollView>
            )}
          </View>

          <BottomNavBar activeTab="Network" />
        </View>
      )}
    </View>
  );
};
const mapStateToProps = (state) => {
  const { discover, getTrendingUser, filter, circle, projects } = state;
  return { discover, getTrendingUser, filter, circle, projects };
};

const mapDispatchToProps = (dispatch) => {
  return {
    callCategoryApi: (userId, tokenDetail) => {
      dispatch({ type: categoryTypes.GET_CATEGORY_DATA, userId, tokenDetail });
    },
    setSavedArray: (savedData) => {
      dispatch({
        type: getUserDiscoverTypes.SET_USER_SAVED_REDUCER,
        savedData,
      });
    },
    callApiToGetUserFromCategory: (
      userId,
      tokenDetail,
      categoryId,
      recordOffset,
      recordPerPage
    ) => {
      dispatch({
        type: getUserDiscoverTypes.GET_USER_DISCOVERY,
        userId,
        tokenDetail,
        categoryId,
        recordOffset,
        recordPerPage,
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
    callApiToGetTrendingUser: (params, tokenDetail) => {
      dispatch({
        type: getUserDiscoverTypes.GET_TRENDING_USER_DISCOVERY,
        params,
        tokenDetail,
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
    callResetLoader: () => {
      dispatch({
        type: getUserDiscoverTypes.RESET_LOADER,
      });
    },
    callResetDiscover: () => {
      dispatch({
        type: categoryTypes.RESET_LOADER,
      });
    },
    sendCircleRequest: (requestParam, tokenDetail) => {
      dispatch({
        type: circleTypes.SEND_CIRCLE_REQ,
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
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Discover);
