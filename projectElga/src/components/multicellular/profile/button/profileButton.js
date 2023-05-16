import React, { Component } from "react";
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Text,
  Image,
  Platform,
  TouchableOpacity,
} from "react-native";
import COLORS from "../../../../themes/colors";
import { RFValue } from "react-native-responsive-fontsize";

export default class ProfileButton extends Component {
  render() {
    return (
      <TouchableOpacity
        onPress={this.props.onPress}
        style={[
          Styles.button,
          {
            height: this.props.height ? this.props.height : RFValue(56, 844),
            backgroundColor: this.props.bg,
            borderWidth: this.props.borderWidth,
            width: this.props.width,
          },
        ]}
      >
        <View style={Styles.button}>
          {this.props.image ? (
            <Image source={this.props.image} style={Styles.image} />
          ) : this.props.svg ? (
            this.props.svg()
          ) : null}

          {this.props.isIcon && this.props.children}
          {this.props.text ? (
            <Text style={[Styles.buttonText, { color: this.props.textColor,fontSize:this.props.fontSize }]}>
              {this.props.text}
            </Text>
          ) : null}
        </View>
      </TouchableOpacity>
    );
  }
}
const Styles = StyleSheet.create({
  button: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    borderRadius: RFValue(12, 844),

    paddingHorizontal: RFValue(6, 844),
  },

  buttonText: {
    paddingHorizontal: RFValue(5, 844),
    fontFamily: "Poppins_600SemiBold",
    fontSize: Platform.OS === "ios" ? RFValue(16, 844) : RFValue(18, 844),
    alignSelf: "center",
    lineHeight: RFValue(24, 844),
  },
  image: {
    width: RFValue(18, 844),
    height: RFValue(18, 844),
    alignSelf: "center",
    marginRight: RFValue(8, 844),
    resizeMode: "contain",
  },
});
