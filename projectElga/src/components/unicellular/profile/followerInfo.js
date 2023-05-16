import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Platform,
  Modal,
  ImageBackground,
  Dimensions,
} from "react-native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { RFValue } from "react-native-responsive-fontsize";
import COLORS from "../../../themes/colors";
import IMAGES from "../../../themes/Images";

export default class FollowerInfo extends Component {
  render() {
    return (
      <View style={Styles.wrapper}>
        <View style={{ alignItems: "center" }}>
          <Text
            style={[
              !this.props.isCustomStyle
                ? Styles.number
                : this.props.numberStyle,
              {
                color: this.props.color
                  ? this.props.color
                  : COLORS.monoBlack700,
              },
            ]}
          >
            {this.props.number}
          </Text>
          <Text
            style={
              !this.props.isCustomStyle ? Styles.text : this.props.textStyle
            }
          >
            {this.props.text}
          </Text>
        </View>
      </View>
    );
  }
}

const Styles = StyleSheet.create({
  wrapper: {
    alignItems: "center",
    justifyContent: "center",
  
  },
  number: {
    fontSize: Platform.OS === "ios" ? RFValue(20, 844) : RFValue(20, 844),
    fontFamily: "Poppins_700Bold",
    marginBottom:RFValue(-4,844)

  },
  text: {
    color: COLORS.monoBlack500,
    fontSize: Platform.OS === "ios" ? RFValue(10, 844) : RFValue(14, 844),
    fontFamily: "Poppins_400Regular",
  },
});
