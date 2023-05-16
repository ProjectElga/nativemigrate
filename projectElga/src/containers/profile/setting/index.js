import React, { Component, useContext, useState } from "react";
import {
  View,
  Linking,
  Text,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import * as GoogleSignIn from "expo-google-sign-in";
import { connect } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Icon from "react-native-vector-icons/Ionicons";
import IMAGES from "../../../themes/Images";
import COLORS from "../../../themes/colors";
import ProfileHeader from "../../../components/multicellular/profile/header/header";

import BottomNavBar from "../../../components/multicellular/general/bottomNavBar/bottomNavBar";

import STORAGE_KEY from "../../../constants/StorageKeys";
import { SignupTypes } from "../../../reducers/auth/signup";
import Styles from "./style";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { CredentialsContext } from "../../../utils/credentialsContext";
import logout from "../../../utils/Logout";
import { profileTypes } from "../../../reducers/profile/profile";
import { useNavigation } from "@react-navigation/native";
import LINKS from "../../../constants/Links";

function Setting(props) {
  const { storedCredentials, setStoredCredentials } =
    useContext(CredentialsContext);
  const navigate = useNavigation();
  const logoutHandle = () => {
    props.resetUserLoginToken();
    props.resetUser();
    props.resetUserProfile();
    logout();
    // props.navigation.navigate("LoginScreen");
  };
  const handleRedirect = (url) => {
    props.navigation.navigate(url);
  };
  const handleLinking = (url) => {
    Linking.openURL(url);
  };
  const _renderOptionView = ({ text, onPress, style }) => {
    return (
      <TouchableOpacity onPress={onPress} style={[Styles.optionView, style]}>
        <Text style={Styles.optionText}>{text}</Text>
        <Icon name="chevron-forward-outline" size={24} color="#aaaaaa" />
      </TouchableOpacity>
    );
  };
  const _renderOptionLogout = ({ text, onPress, style }) => {
    return (
      <TouchableOpacity
        onPress={logoutHandle}
        style={[Styles.logoutOptionView, style]}
      >
        <Text style={Styles.logoutOptionText}>{text}</Text>
        <Icon
          name="exit-outline"
          style={Styles.logoutIcon}
          size={24}
          color={COLORS.teritiaryRed500}
        />
      </TouchableOpacity>
    );
  };
  const _handlePress = (value) => {
    props.navigation.navigate(value);
  };
  const _renderNotification = () => {
    return (
      <View>
        <View style={Styles.viewBox}>
          <Text style={Styles.titleText}>General</Text>
          <View style={Styles.optionBoxContainer}>
            {_renderOptionView({
              text: "Account",
              onPress: () => {
                _handlePress("AccountSettings");
              },
              style: Styles.bottomBorder,
            })}
            {_renderOptionView({
              text: "Notification",
              onPress: () => handleRedirect("Notifications"),
              // onPress: () => {
              //   _handlePress("NotifcationSetting");
              // },
            })}
          </View>
        </View>
        <View></View>
      </View>
    );
  };
  const _renderPrivacy = () => {
    return (
      <View>
        <View style={Styles.viewBox}>
          <Text style={Styles.titleText}>Policy</Text>
          <View style={Styles.optionBoxContainer}>
            {_renderOptionView({
              text: "Terms of service",
              onPress: () => handleLinking(LINKS.TERMS_OF_USES),
              style: Styles.bottomBorder,
            })}
            {_renderOptionView({
              text: "Privacy policy",
              onPress: () => handleLinking(LINKS.PRIVACY_POLICY),
            })}
          </View>
        </View>
        <View></View>
      </View>
    );
  };

  const _renderMore = () => {
    return (
      <View>
        <View style={Styles.viewBox}>
          <Text style={Styles.titleText}>More</Text>
          <View style={Styles.optionBoxContainer}>
          {_renderOptionView({
              text: "Join our Discord",
              onPress: () => handleLinking(LINKS.DISCORD),
              style: Styles.bottomBorder,
            })}
            {_renderOptionView({
              text: "Invite Friends",
              onPress: () => handleRedirect("RewardPage"),
              style: Styles.bottomBorder,
            })}
            {_renderOptionView({
              text: "Rate the App",
              onPress: () => handleLinking(LINKS.GOOGLE_PLAY_STORE),
              style: Styles.bottomBorder,
            })}
            {/* {_renderOptionView({
              text: "Contact Developer",
              onPress: () => handleLinking(LINKS.GOOGLE_PLAY_STORE),
              style: Styles.bottomBorder,
            })} */}
            {_renderOptionLogout({ text: "Logout", onPress: logout })}
          </View>
        </View>
      </View>
    );
  };
  const _renderVersion = () => {
    return (
      <View style={Styles.versionTextView}>
        <Text style={Styles.versionText}>App version 0.0.1</Text>
      </View>
    );
  };

  return (
    <BottomSheetModalProvider>
      <View>
        <View style={Styles.wrapper}>
          <ProfileHeader
            text="Settings"
            rightComponent={() => {
              return (
                <TouchableOpacity
                  onPress={() => {
                    props.navigation.goBack(null);
                  }}
                >
                  <Icon name="ios-close" size={24} color="#aaaaaa" />
                </TouchableOpacity>
              );
            }}
          />
          <ScrollView
            showsVerticalScrollIndicator={false}
            overScrollMode={"never"}
            disable
            style={Styles.detailContainer}
          >
            {/* {_renderNotification()} */}
            {_renderPrivacy()}
            {_renderMore()}
            {/* {_renderVersion()} */}
          </ScrollView>
        </View>
        <BottomNavBar />
      </View>
    </BottomSheetModalProvider>
  );
}

const mapStateToProps = (state) => {
  const { signup } = state;
  return signup;
};

const mapDispatchToProps = (dispatch) => {
  return {
    resetUserLoginToken: () => {
      dispatch({ type: SignupTypes.RESET_LOGIN_TOKEN });
    },
    resetUser: () => {
      dispatch({type: SignupTypes.RESET_REGISTER_STATE})
    },
    resetUserProfile: () => {
      dispatch({ type: profileTypes.RESET_PROFILE_API });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Setting);
