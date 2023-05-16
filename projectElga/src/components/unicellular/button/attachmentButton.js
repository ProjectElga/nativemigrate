import React, { Component } from "react";
import {
  Text,
  View,
  Image,
  Dimensions,
  TouchableWithoutFeedback,
  ScrollView,
  StyleSheet,
} from "react-native";
import SvgUri from "expo-svg-uri";
import SVGS from "../../../constants/SvgUri";
import { RFValue } from "react-native-responsive-fontsize";
import COLORS from "../../../themes/colors";
export default class AttachmentButton extends Component {
  render() {
    return (
      <TouchableWithoutFeedback>
        <View style={Styles.attachmentBtn}>
          <View style={Styles.attachmentBtnicon}>
            <SvgUri
              width={RFValue(24, 844)}
              height={RFValue(24, 844)}
              svgXmlData={SVGS.ATTACHMENT}
            />
          </View>
          <Text style={Styles.attachmentBtnText}>Attachments</Text>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const Styles = StyleSheet.create({
  attachmentBtn: {
    backgroundColor: COLORS.monoGhost500,
    padding: 12,
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: RFValue(16, 844),
    borderRadius: RFValue(16, 844),
  },
  attachmentBtnText: {
    fontSize: RFValue(12, 844),
    fontFamily: "Poppins_500Medium",
    color: COLORS.monoBlack700,
  },
  attachmentBtnicon: {
    paddingTop: 5,
    paddingRight: 5,
  },
});
