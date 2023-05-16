import React, { Component, useState } from "react";
import {
  View,
  Image,
  Text,
  Animated,
  ScrollView,
  StyleSheet,
  TouchableWithoutFeedback,
} from "react-native";
import Styles from "./style";
import ProfileHeader from "../../../../components/multicellular/profile/header/header";
import Icon from "react-native-vector-icons/Ionicons";
import { RFValue } from "react-native-responsive-fontsize";
import IMAGES from "../../../../themes/Images";
import COLORS from "../../../../themes/colors";
import ToggleSwitch from "toggle-switch-react-native";
import Input from "../../../../components/multicellular/social/Input";
import ToggleComp from "../../../../components/multicellular/profile/settingNotification";
export default class NotifcationSetting extends Component {
  _renderHeader = () => {
    return (
      <ProfileHeader
        text="Notifications"
        rightComponent={() => {
          return (
            <TouchableWithoutFeedback
              onPress={() => {
                this.props.navigation.goBack(null);
              }}
            >
              <Icon name="ios-close" size={24} color="#aaaaaa" />
            </TouchableWithoutFeedback>
          );
        }}
      />
    );
  };
  render() {
    return (
      <View style={Styles.wrapper}>
        {this._renderHeader()}
        <View
          style={{
            backgroundColor: COLORS.monoGhost500,
            borderRadius: RFValue(16, 844),
            width:"100%",
            paddingHorizontal: RFValue(16, 844),marginTop:RFValue(24,844)
          }}
        >
          <ToggleComp text="Collaboration" showDivider={true}/>
          <ToggleComp text="Oppurtunities" showDivider={true}/>
          <ToggleComp text="Comments" showDivider={true}/>
          <ToggleComp text="Saved" showDivider={true}/>
          <ToggleComp text="Citations"/>


          </View>
      </View>
    );
  }
}
