import SvgUri from "expo-svg-uri";
import React, { Component } from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import SVGS from "../../../constants/SvgUri";
import COLORS from "../../../themes/colors";

export default class EditPlus extends Component {
  render() {
    return (
      <TouchableOpacity onPress={this.props.onPress} >
        <View style={[styles.wrapper, {
          borderColor: this.props.error ? COLORS.teritiaryWarning : COLORS.monoBlack500,
          borderWidth: this.props.error ? RFValue(2, 844) : 1,
        }]}>
          <SvgUri
            svgXmlData={SVGS.PLUS_GREY}
            width={RFValue(24, 844)}
            height={RFValue(24, 844)}
          />
        </View>
        {this.props.error ?
        <View style={styles.errorTextView}>
          <Text
            style={{
              fontSize: RFValue(12, 844),
              fontFamily: "Poppins_500Medium",
              color: COLORS.teritiaryRed500,
              marginLeft: RFValue(12, 844)

            }}
          >
            Required
          </Text>
        </View>:null}
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    marginTop: RFValue(16, 844),
    borderWidth: 1,
    borderColor: COLORS.monoBlack500,
    borderRadius: RFValue(12, 844),
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: RFValue(56, 844),
    paddingVertical: RFValue(24, 844),
    height: RFValue(56, 844),
    width: RFValue(124, 844),
  },
  errorTextView: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "flex-end",
    marginTop: RFValue(4, 844)
  },
});
