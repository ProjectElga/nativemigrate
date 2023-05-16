import React from "react";
import SvgUri from "expo-svg-uri";
import { Text, View, TouchableOpacity } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import SVGS from "../../../../constants/SvgUri";
import styles from "./Styles";
import shadow from "../../../../constants/shadow";

function CircleNotFound(props) {
  const { btnText } = props;
  const renderTopSection = () => {
    return (
      <View style={styles.infoContainer}>
        <View style={[styles.svgIconContainer, shadow]}>
          <SvgUri
            svgXmlData={SVGS.MY_CIRCLE}
            width={RFValue(20, 844)}
            height={RFValue(20, 844)}
          />
        </View>
        <View style={styles.infoTextContainer}>
          <Text style={styles.infoText}>
            <Text style={styles.infoTextSpan}> Circle</Text> is your Personal
            Contact List
          </Text>
          <Text style={styles.infoText}>Add People to get access to them.</Text>
        </View>
      </View>
    );
  };

  const renderBottomSection = () => {
    return (
      <View>
        <View style={styles.infoBtnContainer}>
          <TouchableOpacity style={styles.exploreBtn} onPress={props?.onPress}>
            <Text style={styles.infoTextSpan}>{btnText}</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };
  return (
    <View>
      <View style={styles.wrapper}>
        {renderTopSection()}
        {renderBottomSection()}
      </View>
    </View>
  );
}
export default CircleNotFound;
