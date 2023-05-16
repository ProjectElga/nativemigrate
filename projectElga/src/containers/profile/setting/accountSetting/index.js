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
import SocialButton from "../../../../components/multicellular/social/SocialButton";
import ProfileHeader from "../../../../components/multicellular/profile/header/header";
import Icon from "react-native-vector-icons/Ionicons";
import { RFValue } from "react-native-responsive-fontsize";
import IMAGES from "../../../../themes/Images";
import COLORS from "../../../../themes/colors";
import Styles from "./style"
import TextInputWithText from "../../../../components/multicellular/profile/textInput/textInput";
import Input from "../../../../components/multicellular/social/Input";
export default class AccountSettings extends Component {
  constructor() {
    super();
    this.state = {
      email: "abc@gmail.com",
      phone: "+91 98989 89898",
      address:
        "Address: 91springboard technopark, 74/II, “C” Cross Road, Opp Gate No 2, MIDC 400 093, Seepz, Andheri East, Mumbai, Maharashtra",
      instagramPress: false,
      instagram: "alexWang",
      youtubePress: false,
      youtube: "alexWang",
    };
  }
  _renderHeader = () => {
    return (
      <ProfileHeader
        text="Account"
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
  _renderInput = () => {
    return (
      <View style={{ marginTop: 8 }}>
        <TextInputWithText
          text="Add email"
          placeholder="Input Text"
          value={this.state.email}
          onChangeText={(value) => {
            this.setState({
              email: value,
            });
          }}
        />
        <TextInputWithText
          text="Add Phone"
          placeholder="Input Text"
          value={this.state.phone}
          keyboardType="numeric"
          onChangeText={(value) => {
            this.setState({
              phone: value,
            });
          }}
        />
        <TextInputWithText
          multiline={true}
          placeholder="Input Text"
          text="Add Address"
          value={this.state.address}
          height="big"
          onChangeText={(value) => {
            this.setState({ address: value });
          }}
        />
      </View>
    );
  };
  _renderInstagramButton = () => {
    if (this.state.instagramPress) {
      return (
        <Input
          value={this.state.instagram}
          onChangeText={(value) => {
            this.setState({
              instagram: value,
            });
          }}
          bgcolor={COLORS.monoGhost500}
          placeholder="Enter Username"
          image={IMAGES.Instagram}
        />
      );
    } else {
      return (
        <SocialButton
          bgcolor={COLORS.monoGhost500}
          image={IMAGES.Instagram}
          onPress={() => {
            this.setState({ instagramPress: true, youtubePress: false });
          }}
          text="Change Linked Account"
        />
      );
    }
  };
  _renderYoutubeButton = () => {
    if (this.state.youtubePress) {
      return (
        <Input
          bgcolor={COLORS.monoGhost500}
          placeholder="Enter channel link"
          image={IMAGES.Youtube}
          value={this.state.youtube}
          onChangeText={(value) => {
            this.setState({
              youtube: value,
            });
          }}
        />
      );
    } else {
      return (
        <SocialButton
          bgcolor={COLORS.monoGhost500}
          image={IMAGES.Youtube}
          onPress={() => {
            this.setState({ youtubePress: true, instagramPress: false });
          }}
          text="Change Linked Account"
        />
      );
    }
  };

  render() {
    return (
      <View style={Styles.wrapper}>
        {this._renderHeader()}
        <ScrollView overScrollMode="never" showsVerticalScrollIndicator={false}>
          <View style={{ paddingBottom: RFValue(36, 844) }}>
            {this._renderInput()}
            <View style={Styles.bottomWrapper}>
              <Text style={Styles.changeSocials}>Change Socials</Text>
              <View>
                {this._renderInstagramButton()}
                {this._renderYoutubeButton()}
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}


