import React, { useEffect } from "react";

import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";

import { Component } from "react";
import Indicators from "../indicators";
import NextButton from "../nextButton";
import COLORS from "../../../../themes/colors";
import { RFValue } from "react-native-responsive-fontsize";
import { Pagination } from "react-native-snap-carousel";
import SvgUri from "expo-svg-uri";
import SVGS from "../../../../constants/SvgUri";

const height = Dimensions.get("window").height;
export default class Footer extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <View style={Styles.wrapper}>
        <TouchableOpacity
          onPress={() => {
            this.props.onBackPress();
          }}
        >
          <Text style={Styles.backText}>Back</Text>
        </TouchableOpacity>
        {this.props.hideNext ? null : (
          <View style={{ alignSelf: "flex-end", width: "45%" }}>
            {/* <NextButton
           
          /> */}
            <TouchableOpacity
              onPress={() => {
                this.props.onNextPress();
              }}
            >
              <View style={Styles.button}>
                <Text style={Styles.buttonText}> Finish Setup</Text>
                <SvgUri
                  svgXmlData={SVGS.CHECK_CIRCLE_WHITE}
                  width={RFValue(24, 844)}
                  height={RFValue(24, 844)}
                  style={{ marginLeft: 8 }}
                />
              </View>
            </TouchableOpacity>
          </View>
        )}
      </View>
    );
  }
}
const Styles = StyleSheet.create({
  wrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    alignItems: "center",
  },
  button: {
    height: RFValue(56, 844),
    backgroundColor: COLORS.primaryTeal400,
    borderRadius: RFValue(16, 844),
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  buttonText: {
    fontFamily: "Poppins_500Medium",
    fontSize: RFValue(16, 844),
    color: COLORS.monoWhite900,
  },
  backText: {
    fontSize: 16,
    fontFamily: "Poppins_500Medium",
    color: COLORS.monoBlack700,
    lineHeight: RFValue(24, 844),
  },
});
