import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";

import COLORS from "../../../themes/colors";
export default class AuthHeader extends Component {
  render() {
    return (
      <View style={Styles.wrapper}>
        <View>
          <Text style={Styles.title}>{this.props.title}<Text style={Styles.titleSmall}>{this.props.titleSmall}</Text></Text>
    
          <Text style={Styles.subtitle}>{this.props.subtitle}</Text>
          {this.props.description ? (
            <Text style={Styles.description}>{this.props.description}</Text>
          ) : null}
        </View>
        {this.props.rightComp ? this.props.rightComp() : null}
      </View>
    );
  }
}
const Styles = StyleSheet.create({
  wrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  title: {
    fontFamily: "Poppins_500Medium",
    fontSize: RFValue(24, 844),
    color: COLORS.primaryTeal400,
  },
  subtitle: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: RFValue(32, 844),
    color: COLORS.monoBlack900,
  },
  titleSmall:{
    fontFamily: "Poppins_500Medium",
    fontSize: RFValue(14, 844),
    color: COLORS.primaryTeal400,
  },
  description: {
    fontFamily: "Poppins_400Regular",
    fontSize: RFValue(14, 844),
    color: COLORS.monoChatGray,
  },
});
