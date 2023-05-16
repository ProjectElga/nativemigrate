import React, { Component, useState } from "react";
import {
  View,
  Image,
  TouchableWithoutFeedback,
  ImageBackground,
  Text,
  ScrollView,
  StyleSheet,
} from "react-native";
import { Icon } from "react-native-elements";
import Styles from "./Styles";
import ProfileHeader from "../../../components/multicellular/profile/header/header";
import COLORS from "../../../themes/colors";
import ProfileCard from "../../../components/multicellular/opportunity/profileCard/profileCard";
import { RFValue } from "react-native-responsive-fontsize";
export default class Responses extends Component {
  renderTopCard = () => {
    return (
      <View style={Styles.topCard}>
        <Text style={Styles.overviewText}>Overview</Text>
        <View style={Styles.overviewNumberContainer}>
          <View style={Styles.overviewComponent}>
            <Text style={Styles.number}>16</Text>
            <Text style={Styles.numberText}>Responses</Text>
          </View>

          <View style={Styles.overviewComponent}>
            <Text style={Styles.number}>48</Text>
            <Text style={Styles.numberText}>Saved</Text>
          </View>

          <View style={Styles.overviewComponent}>
            <Text style={Styles.number}>63</Text>
            <Text style={Styles.numberText}>Visited</Text>
          </View>
        </View>
      </View>
    );
  };

  renderBottomCard = () => {
    return (
      <View style={Styles.bottomCardScroll}>
        <View style={Styles.bottomCard}>
          <Text style={Styles.oppTitle}>Opp Title</Text>
          <Text style={Styles.oppSubtitle}>
            Individual Responses from Content Creators
          </Text>

          <ProfileCard />
          <ProfileCard />
          <ProfileCard />
          <ProfileCard />
          <ProfileCard />
        </View>
      </View>
    );
  };

  render() {
    return (
      <View style={Styles.wrapper}>
        <ProfileHeader
          text="Responses"
          rightComponent={() => {
            return (
              <TouchableWithoutFeedback
                onPress={() => {
                  this.props.navigation.goBack(null);
                }}
              >
                <Icon
                  color={COLORS.monoBlack500}
                  name="x"
                  type="feather"
                  size={20}
                />
              </TouchableWithoutFeedback>
            );
          }}
        />
        <ScrollView showsVerticalScrollIndicator={false} overScrollMode="never">
          {this.renderTopCard()}
          <View
            style={{
              width: "100%",
              borderColor: COLORS.monoGhost500,
              borderWidth: 1,
            //  marginTop: RFValue(24, 844),
            }}
          ></View>
          {this.renderBottomCard()}
        </ScrollView>
      </View>
    );
  }
}
