import React from "react";
import SvgUri from "expo-svg-uri";
import { Text, View } from "react-native";
import SVGS from "../../../../constants/SvgUri";
import { RFValue } from "react-native-responsive-fontsize";
import shadow from "../../../../constants/shadow";
import { Styles } from "./Styles";

export default function ActionButton(props) {
  const { text, image } = props;
  return (
    <View style={[Styles.wrapper, shadow]}>
      <SvgUri
        svgXmlData={SVGS.PLUS_BLACK}
        width={RFValue(18, 844)}
        height={RFValue(18, 844)}
      />
      <View>
        <Text style={Styles.text}>{text}</Text>
      </View>
    </View>
  );
}
