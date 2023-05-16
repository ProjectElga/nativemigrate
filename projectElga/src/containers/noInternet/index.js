import SvgUri from "expo-svg-uri";
import React, { Component, useEffect, useState } from "react";
import { View, Text } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import SVGS from "../../constants/SvgUri";
import COLORS from "../../themes/colors";

export default class NoInternet extends Component {
  render() {
    return (
      <View
        style={{
          width: "100%",
          height: "100%",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <SvgUri
          svgXmlData={SVGS.NO_INTERNET}
          width={RFValue(300, 844)}
          height={RFValue(180, 844)}
        />
        <Text
          style={{
            marginTop: RFValue(36, 844),
            fontFamily: "Poppins_500Medium",
            fontSize: RFValue(16, 844),
            color: COLORS.monoBlack500,
          }}
        ></Text>
      </View>
    );
  }
}
