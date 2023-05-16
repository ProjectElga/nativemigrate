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
import { RFValue } from "react-native-responsive-fontsize";
import ToggleSwitch from "toggle-switch-react-native";
import COLORS from "../../../../themes/colors";
export default class ToggleComp extends Component {
  constructor() {
    super();
    this.state = {
      isOn: true,
    };
  }
  render() {
    return (
      <View>
        <View
          style={{
            paddingVertical: RFValue(24, 844),
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Text
            style={{
              fontFamily: "Poppins_600SemiBold",
              fontSize: RFValue(16, 844),
              color: COLORS.monoBlack700,
            }}
          >
            {this.props.text}
          </Text>
          <ToggleSwitch
            isOn={this.state.isOn}
            onColor={COLORS.primaryTeal400}
            size="medium"
            onToggle={() => {
              this.setState({ isOn: !this.state.isOn });
            }}
          />
        </View>
        {this.props.showDivider ? (
          <View
            style={{ borderWidth: 0.7, borderColor: COLORS.monoBrightGray }}
          ></View>
        ) : null}
      </View>
    );
  }
}
