import React, { Component } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import STORAGE_KEY from "../../../../constants/StorageKeys";
import COLORS from "../../../../themes/colors";
import { RFValue } from "react-native-responsive-fontsize";
import Styles from "./Styles";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import SvgUri from "expo-svg-uri";
import SVGS from "../../../../constants/SvgUri";
import { connect } from "react-redux";
import { profileTypes } from "../../../../reducers/profile/profile";
import { useNavigation } from "@react-navigation/native";
import { notificationTypes } from "../../../../reducers/notifications/notification";
import * as Analytics from "expo-firebase-analytics";
import { profilePercentageTypes } from "../../../../reducers/profile/profilePercentage";
import { convertToPercentage } from "../../../../utils/ConvertPercentage";

class Header extends Component {
  onClickProfile = (page) => {
    const { navigation } = this.props;
    navigation.navigate("BrandProfile");
  };
  async componentDidMount() {
    const userId = await AsyncStorage.getItem(STORAGE_KEY.USER_ID);
    const tokenDetail = await AsyncStorage.getItem(STORAGE_KEY.ACCESS_TOKEN);
    const entityId = await AsyncStorage.getItem(STORAGE_KEY.USER_ID);
    this.props.callProfileApi(userId, tokenDetail, entityId);
    this.props.callUserPercentageApi(userId, tokenDetail);
    const requestParam = {
      id: userId,
      recordOffset: 0,
      recordPerPage: 100,
      isRead: false,
    };
    this.props.callNotificationApi(requestParam, tokenDetail);
  }
  onClickNotification = (page) => {
    const { navigation } = this.props;
    navigation.navigate("Notifications");
  };
  render() {
    const { navigation } = this.props;
    const {
      profile: { profileData = {}, gtProfileloading },
    } = this.props;
    const { profileImageUrl = "", isCreator = true } = profileData;
    const { notification } = this.props;
    const { isNewNotification } = notification;
    const { profilePercentageData: { profilePercentage = 0 } = {} } =
      this.props.profilePercentage;
    return (
      <View style={Styles.wrapper}>
        {!this.props.isDetail ? (
          <SvgUri
            svgXmlData={SVGS.SHAER_LOGO}
            width={RFValue(100, 844)}
            height={RFValue(26, 844)}
          />
        ) : (
          <View>
            <TouchableOpacity onPress={this.props.onPressBack}>
              <View style={Styles.flexBox}>
                <Icon
                  name="chevron-back-outline"
                  size={18}
                  color={COLORS.monoBlack900}
                />
                <View>
                  <Text style={Styles.pageTitle}>{this.props.pageTitle}</Text>
                </View>
              </View>
            </TouchableOpacity>
          </View>
        )}
        {/* {this.props.leftComponent()} */}

        <View style={Styles.headerIconView}>
          {!this.props.isHideSearch ? (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("Search");
              }}
            >
              <View
                style={[Styles.iconWrapper, { marginRight: RFValue(10, 844) }]}
              >
                <Icon name="ios-search" size={20} color="#000000" />
              </View>
            </TouchableOpacity>
          ) : null}
          {this.props.isShowFilter ? (
            <TouchableOpacity
              onPress={this.props.onPressFilter}
            >
              <View
                style={[Styles.iconWrapper, { marginRight: RFValue(10, 844) }]}
              >
                {this.props.filter()}
              </View>
            </TouchableOpacity>
          ) : null}
          {this.props.noBell ? null : (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("Notifications");
              }}
            >
              <View>
                {!isNewNotification ? null : (
                  <View
                    style={{
                      width: RFValue(8, 844),
                      height: RFValue(8, 844),
                      borderRadius: 12,
                      backgroundColor: COLORS.primaryTeal400,
                      position: "absolute",
                      top: 0,
                      right: 0,
                      zIndex: 5,
                    }}
                  ></View>
                )}
                <View style={Styles.iconWrapper}>
                  <SvgUri
                    width={RFValue(20, 844)}
                    height={RFValue(20, 844)}
                    svgXmlData={SVGS.NOTIFICATIONS}
                  />
                </View>
              </View>
            </TouchableOpacity>
          )}
          <TouchableOpacity
            onPress={async () => {
              // this.props.resetProfileAPI();
              if (isCreator) {
                navigation.navigate("Profile");
              } else {
                navigation.navigate("BrandSelfView");
              }

              Analytics.logEvent(`SelfView`, {
                contentType: "SelfView",
                userId: profileData?.id,
                displayName: profileData?.displayName,
                isCreator: profileData?.isCreator,
              });
              // this.props.navigation.navigate("BrandProfile", {
              //   userId: await AsyncStorage.getItem(STORAGE_KEY.USER_ID),
              //   tokenDetail: await AsyncStorage.getItem(STORAGE_KEY.ACCESS_TOKEN),
              //   selfView: true,
              // });
            }}
          >
            {convertToPercentage(profilePercentage) > 99 || !isCreator ? (
              <View
                style={[Styles.iconWrapper, { marginLeft: RFValue(10, 844) }]}
              >
                <Image source={{ uri: profileImageUrl }} style={Styles.icon} />
              </View>
            ) : (
              <View
                style={[
                  Styles.iconContainer,
                  {
                    borderWidth: 0,
                    borderColor:
                      convertToPercentage(profilePercentage) < 40
                        ? COLORS.teritiaryWarning
                        : convertToPercentage(profilePercentage) > 40 &&
                          convertToPercentage(profilePercentage) < 80
                        ? COLORS.monoOrange
                        : COLORS.primaryTeal400,
                    backgroundColor:
                      convertToPercentage(profilePercentage) < 40
                        ? COLORS.teritiaryWarning
                        : convertToPercentage(profilePercentage) > 40 &&
                          convertToPercentage(profilePercentage) < 80
                        ? COLORS.monoOrange
                        : COLORS.primaryTeal400,
                  },
                ]}
              >
                <View>
                  <Text
                    style={Styles.profileprogressText}
                  >{`${convertToPercentage(profilePercentage)}%`}</Text>
                </View>
                <View
                  style={[
                    Styles.iconWrapper,
                    Styles.iconPosition,
                    { borderColor: COLORS.monoGhost500 },
                  ]}
                >
                  <Image
                    source={{ uri: profileImageUrl }}
                    style={Styles.icon}
                  />
                </View>
              </View>
            )}
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
const mapStateToProps = (state) => {
  const { profile, notification, profilePercentage } = state;
  return { profile, notification, profilePercentage };
};

const mapDispatchToProps = (dispatch) => {
  return {
    callProfileApi: (userId, tokenDetail, entityId) => {
      dispatch({
        type: profileTypes.GET_PROFILE_DATA,
        userId,
        tokenDetail,
        entityId,
      });
    },
    callNotificationApi: (requestParam, tokenDetail) => {
      dispatch({
        type: notificationTypes.GET_NOTIFCATION,
        requestParam,
        tokenDetail,
      });
    },
    callUserPercentageApi: (id, tokenDetail) => {
      dispatch({
        type: profilePercentageTypes.FETCH_PROFILE_PERCENTAGE,
        id,
        tokenDetail,
      });
    },
    resetProfileAPI: () => {
      dispatch({ type: profileTypes.RESET_PROFILE_API });
    },
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(function (props) {
  const navigation = useNavigation();

  return <Header {...props} navigation={navigation} />;
});
