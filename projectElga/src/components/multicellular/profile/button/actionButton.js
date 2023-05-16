import React, { Component, useState } from "react";
import {
  View,
  Image,
  Text,
  Animated,
  ScrollView,
  Dimensions,
  Platform,
  StyleSheet,
  Modal,
  TouchableWithoutFeedback
} from "react-native";
import { Icon } from "react-native-elements";
import COLORS from "../../../../themes/colors";
import { RFValue } from "react-native-responsive-fontsize";

import IMAGES from "../../../../themes/Images";
const height = Dimensions.get("window").height;
const width = Dimensions.get("screen").width;

export default class ActionButton extends Component {
  render() {
    return (

        <TouchableWithoutFeedback
          onPress={() => {
            this.props.onPress?this.props.onPress():null
          }}
        >
          <View style={Styles.button}>
            <Icon
              name="plus"
              type="ant-design"
              size={20}
              color={COLORS.monoWhite900}
            />
          </View>
        </TouchableWithoutFeedback>

    );
  }
}

const Styles = StyleSheet.create({
  optionContainer: {
    borderRadius: RFValue(20, 844),
    backgroundColor: COLORS.monoWhite900,
    justifyContent: "space-between",
  },
  divider: {
    borderWidth: 1,
    borderColor: "#eeeeee",
  },
  optionButton: {
    flexDirection: "row",
    justifyContent: "flex-start",
    paddingHorizontal: RFValue(24, 844),
    alignItems: "center",
    paddingBottom: RFValue(36, 844),
    paddingTop: RFValue(44, 844),
  },
  optionText: {
    lineHeight: RFValue(18, 844),
    fontFamily: "Poppins_700Bold",
    color: COLORS.primaryTeal500,
    fontSize: RFValue(16, 844),
    marginLeft: RFValue(16, 844),
    alignSelf: "center",
  },

  button: {
    marginTop: RFValue(10, 844),
    backgroundColor: COLORS.monoBlack900,
    width: RFValue(56, 844),
    height: RFValue(40, 844),
    borderRadius: RFValue(20, 844),
    alignItems: "center",
    justifyContent: "center",
  },
  icon: {
    width: RFValue(24, 844),
    height: RFValue(24, 844),
  },
});
