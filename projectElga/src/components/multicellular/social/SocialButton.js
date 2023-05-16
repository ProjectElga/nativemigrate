import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import shadow from "../../../constants/shadow";
import COLORS from "../../../themes/colors";
import IMAGES from "../../../themes/Images";
import { ScaledSheet } from "react-native-size-matters";
import { LinearGradient } from "expo-linear-gradient";
//import { LinearTextGradient } from "react-native-text-gradient";
export default class SocialButton extends Component {
  constructor() {
    super()
  }
  render() {
    return (
      <TouchableOpacity
      disabled={this.props.inactive}
        onPress={() => {
          this.props.onPress();
        }}
      >
        <View
          style={[
            styles.button,
            {
              borderWidth: this.props.borderWidth ? this.props.borderWidth : 0,
            },
          ]}
        >
          <Image
            source={this.props.uri ? { uri: this.props.image } : this.props.image}
            style={[
              styles.icon,
              {
                width: this.props.width ? this.props.width : RFValue(26, 844),
                height: this.props.height
                  ? this.props.height
                  : RFValue(26, 844),
              },
            ]}
          />
          {/* <LinearGradient
          style={[styles.button, shadow]}
          colors={
            this.props.gradient ? this.props.gradient : COLORS.monoWhite900
          }
          start={{ x: 0, y: 1 }}
          end={{ x: 1, y: 0 }}
        > */}
          <Text style={[styles.text,{color: this.props.inactive?COLORS.monoBlack500:COLORS.monoBlack700,}]}>{this.props.text}</Text>
          {/* </LinearGradient> */}
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: COLORS.monoWhite900,
    marginTop: RFValue(24, 844),
    width: "100%",
    height: RFValue(64, 844),
    borderRadius: RFValue(15, 844),
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",

    borderColor: COLORS.monoChromeBlack,
  },
  icon: {
    resizeMode: "contain",
    marginHorizontal: 10,
    borderRadius:RFValue(8,844),
 
  },
  text: {
    marginTop: 3,
    fontFamily: "Poppins_500Medium",

    fontSize: RFValue(14, 844),
  },
});
