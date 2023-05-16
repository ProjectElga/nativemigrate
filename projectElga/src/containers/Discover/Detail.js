import React, { useEffect, useState, useRef } from "react";
import { View, Text, ScrollView, Image } from "react-native";
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
import { withNavigationFocus } from "react-navigation";
import { makePostApiCall } from "../../api";
import URLS from "../../constants/Urls";
import { useNavigation } from "@react-navigation/native";
import { circleTypes } from "../../reducers/projects/circle";
import { isCloseToBottom } from "../../utils/LazyLoading";
import shadow from "../../constants/shadow";
import Skeleton from "../../components/multicellular/general/skeleton/skeleton";
import NothingHere from "../../components/multicellular/general/nothingHere/nothingHere";

const Detail = (props) => {
  // renders
  const navigation = useNavigation();
  const [categoryList, setCategoryList] = useState([]);
  const [activeCategory, setActiveCategory] = useState("");
  const [activeSubCategoryId, setActiveSubCategoryId] = useState("");
  const [addtoCircleClick, setAddtoCircleClick] = useState(false);
  const [activeId, setActiveId] = useState([]);
  const [show, setShow] = useState(true);
  const getUser = useSelector((state) => state.getUser);
  const {
    getDiscoverUser,
    guloading,
    savedArray,
    recordOffset,
    recordPerPage,
    isMoreData,
  } = getUser;
  const { callApiToGetUserFromCategory, callApiToGetUserFromSubCategory } = props;

  useEffect(() => {
    setCategoryList(props.categoryData);
  }, []);

  const handleSetCategory = async (item) => {
    props.resetRecordOffset();
    setActiveSubCategoryId(item.id);
    const userId = await AsyncStorage.getItem(STORAGE_KEY.USER_ID);
    const tokenDetail = await AsyncStorage.getItem(STORAGE_KEY.ACCESS_TOKEN);
    setActiveCategory(item.name);
    callApiToGetUserFromSubCategory(userId, tokenDetail, item.id, 0, 10);
  };
  const retrieveMore = async () => {
    const userId = await AsyncStorage.getItem(STORAGE_KEY.USER_ID);
    const tokenDetail = await AsyncStorage.getItem(STORAGE_KEY.ACCESS_TOKEN);
    if (activeCategory === "") {
      callApiToGetUserFromCategory(
        userId,
        tokenDetail,
        props.activeCategoryId,
        recordOffset,
        recordPerPage
      );
    } else {
      callApiToGetUserFromSubCategory(
        userId,
        tokenDetail,
        activeSubCategoryId,
        recordOffset,
        recordPerPage
      );
    }
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
          navigation.navigate("Chat", {
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
  const _renderCategory = () => {
    return (
      <View>
        {props.categoryData && props.categoryData.length > 0 && (
          <ScrollView
            horizontal={true}
            overScrollMode={"never"}
            showsHorizontalScrollIndicator={false}
          >
            {props.categoryData.map((item, index) => {
              return (
                <MainCategoryBox
                  bgColor={COLORS.monoWhite900}
                  text={item.name}
                  onPress={() => {
                    handleSetCategory(item);
                  }}
                  isActive={activeCategory === item.name}
                  key={index}
                />
              );
            })}
          </ScrollView>
        )}
      </View>
    );
  };
  const renderNothingHere = () => (
    <NothingHere
    text="Nothing Here! Comeback later 👋"
    image={IMAGES.NoPending}/>
  )
  return (
    <ScrollView
      style={[styles.bodyWrapper, { marginTop: RFValue(16, 844) }]}
      onScroll={({ nativeEvent }) => {
        if (isCloseToBottom(nativeEvent) && isMoreData && !guloading) {
          retrieveMore();
        }
      }}
    >
      {show ? (
        <View>
          {_renderCategory()}
          <View style={styles.userCardDetailView}>
            {getDiscoverUser &&
              getDiscoverUser.length > 0 ?
              getDiscoverUser.map((item, index) => {
                return (
                  <UserCard
                    onPress={() => {
                      navigation.navigate(
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
                                navigation.navigate("Projects", {
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
              }) : renderNothingHere()}
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
      ) : (
        renderNothingHere()
      )}
    </ScrollView>
  );
};
const mapStateToProps = (state) => {
  const { discover, projects } = state;
  return { discover, projects };
};

const mapDispatchToProps = (dispatch) => {
  return {
    callApiToGetUserFromSubCategory: (
      userId,
      tokenDetail,
      subcategoryId,
      recordOffset,
      recordPerPage
    ) => {
      dispatch({
        type: getUserDiscoverTypes.GET_USER_DISCOVERY,
        userId,
        tokenDetail,
        subcategoryId,
        recordOffset,
        recordPerPage,
      });
    },
    callApiToGetUserFromCategory: (userId, tokenDetail, categoryId, recordOffset,
      recordPerPage) => {
      dispatch({
        type: getUserDiscoverTypes.GET_USER_DISCOVERY,
        userId,
        tokenDetail,
        categoryId,
        recordOffset,
        recordPerPage
      });
    },
    resetRecordOffset: () => {
      dispatch({
        type: getUserDiscoverTypes.RESET_OFF_SET_VALUE,
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
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Detail);
