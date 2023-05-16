import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import SvgUri from "expo-svg-uri";
import { Text, View, TouchableOpacity } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import CreatorCard from "../../components/multicellular/general/creatorCard";
import shadow from "../../constants/shadow";
import STORAGE_KEY from "../../constants/StorageKeys";
import SVGS from "../../constants/SvgUri";
import styles from "./NearByStyles";
import { connect, useSelector } from "react-redux";
import { getUserDiscoverTypes } from "../../reducers/discover/getUser";
import { circleTypes } from "../../reducers/projects/circle";
import { categoryTypes } from "../../reducers/discover/category";
import IMAGES from "../../themes/Images";

function NearBy(props) {
  const [addtoCircleClick, setAddtoCircleClick] = useState(false);
  const [activeId, setActiveId] = useState([]);

  const navigation = useNavigation();
  const {
    callApiToGetNearByUser,
    callResetDiscover,
    sendCircleRequest,
    isFocused,
    callResetRecordOffset,
  } = props;
  const getUser = useSelector((state) => state.getUser);
  const { getDiscoverUser, guloading } = getUser;

  useEffect(() => {
    if (isFocused) {
      callResetRecordOffset();
      effect();
    }
  }, [isFocused]);

  const effect = async () => {
    const userId = await AsyncStorage.getItem(STORAGE_KEY.USER_ID);
    const tokenDetail = await AsyncStorage.getItem(STORAGE_KEY.ACCESS_TOKEN);

    callApiToGetNearByUser(userId, tokenDetail, 0, 10);
    return () => {
      callResetDiscover();
    };
  };
  const handleNavigation = () => {
    navigation.navigate("Discover");
  };
  const handleCircleRequest = async (receiverUserId) => {
    const userId = await AsyncStorage.getItem(STORAGE_KEY.USER_ID);
    const tokenDetail = await AsyncStorage.getItem(STORAGE_KEY.ACCESS_TOKEN);
    const requestParam = {
      senderUserId: userId,
      receiverUserId: receiverUserId,
    };
    sendCircleRequest(requestParam, tokenDetail);
    setAddtoCircleClick(true);
    let arr = activeId;
    arr.push(receiverUserId);
    setActiveId([...arr]);
  };
  const renderTopSection = () => {
    return (
      <View style={styles.infoContainer}>
        <View style={[styles.svgIconContainer, shadow]}>
          <SvgUri
            svgXmlData={SVGS.MY_CIRCLE}
            width={RFValue(20, 844)}
            height={RFValue(20, 844)}
          />
        </View>
        <View style={styles.infoTextContainer}>
          <Text style={styles.infoText}>
            <Text style={styles.infoTextSpan}> Circle</Text> is your Personal
            Contact List Add People to get access to them
          </Text>
        </View>
      </View>
    );
  };

  const renderBottomSection = () => {
    return (
      <View>
        <View>
          <Text style={styles.sectionTitle}>Creatives Near You:</Text>
        </View>
        <View style={styles.bottomCardWrapper}>
          {getDiscoverUser &&
            getDiscoverUser.length > 0 &&
            getDiscoverUser.map((item, index) => {
              return index < 10 ? (
                <View style={styles.creatorCard} key={index}>
                  <CreatorCard
                    onPress={() => {
                      navigation.navigate(
                        !item?.isCreator ? "BrandProfile" : "CreatorProfile",
                        {
                          selfView: false,
                          userId: item?.id,
                          displayName: item?.displayName,
                        }
                      );
                    }}
                    onCirclePress={
                      addtoCircleClick && activeId.includes(item.id)
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
                    isAccepted={item?.circleStatus === "ACCEPTED"}
                    image={
                      addtoCircleClick && activeId?.includes(item.id)
                        ? IMAGES.RequestSentRed
                        : typeof item?.circleStatus === "undefined"
                        ? IMAGES.sendRequest
                        : item?.circleStatus === "PENDING"
                        ? IMAGES.RequestSentRed
                        : item?.circleStatus === "SENT"
                        ? IMAGES.RequestSentIcon
                        : "Accept Request"
                    }
                    userData={item}
                  />
                </View>
              ) : null;
            })}
        </View>
        <View style={styles.infoBtnContainer}>
          <TouchableOpacity
            style={styles.exploreBtn}
            onPress={handleNavigation}
          >
            <Text style={styles.infoTextSpan}>Explore More</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };
  return (
    <View>
      <View style={styles.wrapper}>
        {renderTopSection()}
        {getDiscoverUser && getDiscoverUser.length > 0 && renderBottomSection()}
      </View>
    </View>
  );
}
const mapStateToProps = (state) => {
  const { getTrendingUser } = state;
  return { getTrendingUser };
};

const mapDispatchToProps = (dispatch) => {
  return {
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
    callResetDiscover: () => {
      dispatch({
        type: getUserDiscoverTypes.RESET_REDUCER,
      });
    },
    callResetRecordOffset: () => {
      dispatch({
        type: getUserDiscoverTypes.RESET_OFF_SET_VALUE,
      });
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(NearBy);
