import React from "react";
import SvgUri from "expo-svg-uri";
import { useSelector } from "react-redux";
import { Image, Text, View, TouchableOpacity } from "react-native";
import SVGS from "../../../../constants/SvgUri";
import { RFValue } from "react-native-responsive-fontsize";
import { Styles } from "./Styles";
import shadow from "../../../../constants/shadow";

export default function MoodBoardItemCard(props) {
  const { text, image, width, aspectratio, onPressSave, isSaved } = props;
  const renderIconContainer = () => {
    return (
      <TouchableOpacity
        onPress={onPressSave}
        style={[Styles.svgIconContainer, shadow]}
      >
        <SvgUri
          svgXmlData={isSaved ? SVGS.ACTIVE_STAR : SVGS.INACTIVE_STAR}
          width={RFValue(16, 844)}
          height={RFValue(16, 844)}
        />
      </TouchableOpacity>
    );
  };
  return (
    <View style={[Styles.wrapper, shadow, { width: width }]}>
      <Image
        source={{
          uri: image,
        }}
        style={[Styles.profile, { height: width * aspectratio }]}
      />
      <View style={Styles.bottomContainer}>
        <Text style={Styles.title}>{text}</Text>
      </View>
      {renderIconContainer()}
    </View>
  );
}
