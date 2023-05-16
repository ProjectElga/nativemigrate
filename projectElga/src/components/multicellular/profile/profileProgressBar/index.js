import React, { Component } from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import COLORS from "../../../../themes/colors";
import SVGS from "../../../../constants/SvgUri";
import SvgUri from "expo-svg-uri";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";

export default function ProfileProgressBar(props) {
  const navigation = useNavigation();
  const { percentage } = props;
  const handlePress = () => {
    navigation.navigate("ProfileProgress");
  };
  return (
    <TouchableOpacity onPress={handlePress}>
      <View style={Styles.container}>
        <View>
          <Text style={Styles.title}>Your profile is {percentage}% complete</Text>
          <Text style={Styles.description}>
            Complete your profile to get discovered
          </Text>
          {/* <ProgressView
          progressTintColor="orange"
          trackTintColor="blue"
          progress={0.7}
          /> */}
        </View>
        <View>
          <SvgUri
            width={10}
            height={10}
            svgXmlData={SVGS.CHEVRON_RIGHT}
            zindex
          />
        </View>
      </View>
      <View style={Styles.progressbarContainer}>
        <LinearGradient
          style={[Styles.progressbar, { width: `${percentage}%` }]}
          colors={[percentage < 80 ? COLORS.monoOrange:"#109A7F", percentage < 80 ? COLORS.monoOrange : "#52CCB3", percentage < 40 ? COLORS.teritiaryWarning : percentage > 40 && percentage < 80 ? COLORS.monoOrange : "#01F2C1", percentage < 40 ? COLORS.teritiaryWarning : percentage > 40 && percentage < 80 ? COLORS.monoOrange : "#4D9BFF"]}
          start={{ x: 0, y: 1 }}
          end={{ x: 1, y: 0 }}
        />
      </View>
    </TouchableOpacity>
  );
}

const Styles = StyleSheet.create({
  container: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    marginTop: RFValue(20, 844),
    width: "100%",
  },
  title: {
    fontFamily: "Poppins_500Medium",
    color: COLORS.monoBlack900,
    fontSize: RFValue(14, 844),
  },
  description: {
    fontFamily: "Poppins_400Regular",
    color: COLORS.monoBlack500,
    fontSize: RFValue(14, 844),
    marginTop: RFValue(4, 844),
  },
  progressbar: {
    height: RFValue(4, 844),
    borderRadius: RFValue(10, 844),
  },
  progressbarContainer: {
    height: RFValue(4, 844),
    borderRadius: RFValue(10, 844),
    width: "100%",
    backgroundColor: COLORS.monoChromeBlack,
    marginTop: RFValue(12, 844),
    marginBottom: RFValue(20, 844),
  },
});
