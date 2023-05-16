import React, { useEffect, useState, useRef } from "react";
import { View, Text, ScrollView, Image, StyleSheet } from "react-native";
import UserCard from "../../components/multicellular/general/userCard";
import userList from "../../assets/jsons/discover/profiles.json";
import IMAGES from "../../themes/Images";
import { RFValue } from "react-native-responsive-fontsize";
import styles from "./Styles";
import COLORS from "../../themes/colors";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import MainCategoryBox from "../../components/multicellular/userCategory/mainCategoryBox";
import { connect, useSelector } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import STORAGE_KEY from "../../constants/StorageKeys";
import { getUserDiscoverTypes } from "../../reducers/discover/getUser";
import STRINGS from "../../constants/Strings";
import Header from "../../components/multicellular/discover/header";
import SearchBarWithFilter from "../../components/multicellular/general/searchBar";
import Filter from "../../components/multicellular/discover/discoverFilter";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import SCREENSIZE from "../../constants/ScreenSize";
import BottomNavBar from "../../components/multicellular/general/bottomNavBar/bottomNavBar";
import { filterStates } from "../../reducers/discover/filter";
import { makePostApiCall } from "../../api";
import URLS from "../../constants/Urls";
import Skeleton from "../../components/multicellular/general/skeleton/skeleton";
import shadow from "../../constants/shadow";
import { circleTypes } from "../../reducers/projects/circle";
import { isCloseToBottom } from "../../utils/LazyLoading";
const FilterPage = (props) => {
  // renders
  const [categoryList, setCategoryList] = useState([]);
  const [activeCategory, setActiveCategory] = useState("");
  const [show, setShow] = useState(true);
  const [addtoCircleClick, setAddtoCircleClick] = useState(false);
  const [activeId, setActiveId] = useState([]);

  const getUser = useSelector((state) => state.getUser);
  const {
    getDiscoverUser,
    guloading,
    savedArray,
    isMoreData,
    recordOffset,
    recordPerPage,
  } = getUser;
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
  useEffect(() => {
    getData();

    // setCategoryList(props.categoryData);
  }, []);
  const getData = async () => {
    props.resetRecordOffset();
    const userId = await AsyncStorage.getItem(STORAGE_KEY.USER_ID);
    const tokenDetail = await AsyncStorage.getItem(STORAGE_KEY.ACCESS_TOKEN);
    let params = {};
    if (platform === "INSTAGRAM") {
      params = {
        id: userId,
        trending: true,
        distance: distance,
        trending: trending,
        businessProfile: businessProfile,
        minFilterA: minFilterA,
        maxFilterA: maxFilterA,
        minFilterB: minFilterB,
        maxFilterB: maxFilterB,
        minFilterC: minFilterC,
        maxFilterC: maxFilterC,
        recordOffset: 0,
        recordPerPage: 10,
      };
    } else {
      params = {
        id: userId,
        trending: true,
        platform: platform,
        distance: distance,
        trending: trending,
        businessProfile: businessProfile,
        minFilterA: minFilterA,
        maxFilterA: maxFilterA,
        minFilterB: minFilterB,
        maxFilterB: maxFilterB,
        minFilterC: minFilterC,
        maxFilterC: maxFilterC,
        recordOffset: 0,
        recordPerPage: 10,
      };
    }

    props.callApiToGetTrendingUser(params, tokenDetail);
  };
  const retrieveMore = async () => {
    const userId = await AsyncStorage.getItem(STORAGE_KEY.USER_ID);
    const tokenDetail = await AsyncStorage.getItem(STORAGE_KEY.ACCESS_TOKEN);

    let params = {};
    if (platform === "INSTAGRAM") {
      params = {
        id: userId,
        trending: true,
        distance: distance,
        trending: trending,
        businessProfile: businessProfile,
        minFilterA: minFilterA,
        maxFilterA: maxFilterA,
        minFilterB: minFilterB,
        maxFilterB: maxFilterB,
        minFilterC: minFilterC,
        maxFilterC: maxFilterC,
        recordOffset: recordOffset,
        recordPerPage: recordPerPage,
      };
    } else {
      params = {
        id: userId,
        trending: true,
        platform: platform,
        distance: distance,
        trending: trending,
        businessProfile: businessProfile,
        minFilterA: minFilterA,
        maxFilterA: maxFilterA,
        minFilterB: minFilterB,
        maxFilterB: maxFilterB,
        minFilterC: minFilterC,
        maxFilterC: maxFilterC,
        recordOffset: recordOffset,
        recordPerPage: recordPerPage,
      };
    }

    props.callApiToGetTrendingUser(params, tokenDetail);
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
  const handleOnPressMessage = (id) => {
    const { projectsData = [] } = props.projects;

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
  const handleCircleRequest = async (id) => {
    const localUserId = await AsyncStorage.getItem(STORAGE_KEY.USER_ID);
    const tokenDetail = await AsyncStorage.getItem(STORAGE_KEY.ACCESS_TOKEN);
    const requestParam = {
      senderUserId: localUserId,
      receiverUserId: id,
    };
    setAddtoCircleClick(true);
    let arr = activeId;
    arr.push(id);
    setActiveId([...arr]);
    props.sendCircleRequest(requestParam, tokenDetail);
  };
  //   const handleSetCategory = async (item) => {
  //     const userId = await AsyncStorage.getItem(STORAGE_KEY.USER_ID);
  //     const tokenDetail = await AsyncStorage.getItem(STORAGE_KEY.ACCESS_TOKEN);
  //     setActiveCategory(item.name);
  //     callApiToGetUserFromCategory(userId, tokenDetail, item.id);
  //   };
  //   const _renderCategory = () => {
  //     return (
  //       <View>
  //         {props.categoryData && props.categoryData.length > 0 && (
  //           <ScrollView
  //             horizontal={true}
  //             overScrollMode={"never"}
  //             showsHorizontalScrollIndicator={false}
  //           >
  //             {props.categoryData.map((item, index) => {
  //               return (
  //                 <MainCategoryBox
  //                   bgColor={COLORS.monoWhite900}
  //                   text={item.name}
  //                   onPress={() => {
  //                     handleSetCategory(item);
  //                   }}
  //                   isActive={activeCategory === item.name}
  //                   key={index}
  //                 />
  //               );
  //             })}
  //           </ScrollView>
  //         )}
  //       </View>
  //     );
  //   };
  const _renderInput = () => {
    return (
      <SearchBarWithFilter
        onPress={() => {
          props.navigation.navigate("Search");
        }}
      />
    );
  };
  return (
    <BottomSheetModalProvider>
      <View style={[styles.wrapper, { paddingHorizontal: RFValue(16, 844) }]}>
        <Header
          isDetail={true}
          pageTitle={"Filter"}
          onPressBack={() => {
            props.resetFilter();
            props.navigation.goBack(null);
          }}
        />

        {_renderInput()}
        <ScrollView
          showsVerticalScrollIndicator={false}
          onScroll={({ nativeEvent }) => {
            if (isCloseToBottom(nativeEvent) && isMoreData && !guloading) {
              retrieveMore();
            }
          }}
        >
          <View style={{ marginTop: RFValue(20, 844) }}>
            {guloading ? (
              <View style={styles.userCardView}>
                <View style={[shadow, styles.skeletonUserCard]}>
                  <Skeleton styles={styles.sCardProfile} />
                  <View style={styles.sCardBlock}>
                    <Skeleton styles={[styles.sCardStick, { width: "80%" }]} />
                    <Skeleton styles={[styles.sCardStick, { width: "50%" }]} />
                  </View>
                </View>

                <View style={[shadow, styles.skeletonUserCard]}>
                  <Skeleton styles={styles.sCardProfile} />
                  <View style={styles.sCardBlock}>
                    <Skeleton styles={[styles.sCardStick, { width: "80%" }]} />
                    <Skeleton styles={[styles.sCardStick, { width: "50%" }]} />
                  </View>
                </View>
              </View>
            ) : getDiscoverUser && getDiscoverUser.length > 0 ? (
              getDiscoverUser.map((item, index) => {
                return (
                  <UserCard
                    onPress={() => {
                      props.navigation.navigate(
                        !item?.isCreator ? "BrandProfile" : "CreatorProfile",
                        {
                          selfView: false,
                          userId: item.id,
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
                    isAdmin={!item?.isCreator}
                    userData={item}
                    key={index}
                    isSaved={checkIsSaved(item)}
                    onPressSaved={() => handleIsSavedClicked(item)}
                  />
                );
              })
            ) : (
              <View
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  marginTop: RFValue(40, 844),
                }}
              >
                <Image
                  source={IMAGES.eleven}
                  style={{ width: 300, height: 220, resizeMode: "contain" }}
                />
                <Text
                  style={{
                    fontFamily: "Poppins_500Medium",
                    fontSize: RFValue(16, 844),
                    color: COLORS.monoBlack500,
                    marginTop: RFValue(16, 844),
                  }}
                >
                  Nothing Here! Comeback later 👋
                </Text>
              </View>
            )}
          </View>
        </ScrollView>
      </View>
      <BottomNavBar activeTab="Network" />
    </BottomSheetModalProvider>
  );
};
const Styles = StyleSheet.create({
  wrapper: {
    paddingTop: RFValue(48, 844),
    backgroundColor: COLORS.monoGhost500,
    height: SCREENSIZE.ScreenHeightViewPort,
  },
});
const mapStateToProps = (state) => {
  const { discover, filter, projects } = state;
  return { discover, filter, projects };
};

const mapDispatchToProps = (dispatch) => {
  return {
    callApiToGetUserFromCategory: (userId, tokenDetail, subcategoryId) => {
      dispatch({
        type: getUserDiscoverTypes.GET_USER_DISCOVERY,
        userId,
        tokenDetail,
        subcategoryId,
      });
    },
    setSavedArray: (savedData) => {
      dispatch({
        type: getUserDiscoverTypes.SET_USER_SAVED_REDUCER,
        savedData,
      });
    },
    callApiToGetTrendingUser: (params, tokenDetail) => {
      dispatch({
        type: getUserDiscoverTypes.GET_TRENDING_USER_DISCOVERY,
        params,
        tokenDetail,
      });
    },
    resetRecordOffset: () => {
      dispatch({
        type: getUserDiscoverTypes.RESET_OFF_SET_VALUE,
      });
    },
    callApiToGetTrendingUser: (params, tokenDetail) => {
      dispatch({
        type: getUserDiscoverTypes.GET_TRENDING_USER_DISCOVERY,
        params,
        tokenDetail,
      });
    },
    sendCircleRequest: (requestParam, tokenDetail) => {
      dispatch({
        type: circleTypes.SEND_CIRCLE_REQ,
        requestParam,
        tokenDetail,
      });
    },
    resetFilter: () => {
      dispatch({
        type: filterStates.RESET_FILTER,
      });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FilterPage);
