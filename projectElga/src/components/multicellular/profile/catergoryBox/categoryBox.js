import React, { useState } from "react";
import { withNavigation } from "react-navigation";
import { TouchableOpacity } from "react-native";
import { Text, View, Image, StyleSheet, } from "react-native";
import COLORS from "../../../../themes/colors";
import { RFValue } from "react-native-responsive-fontsize";
import SvgUri from "expo-svg-uri";
import IMAGES from "../../../../themes/Images";

function CategoryBox(props) {
  return (
    <TouchableOpacity onPress={props.onPress} key={props.key}>
      <View
        style={[
          Styles.mcContainer,
          {
            backgroundColor: props.isActive ? COLORS.monoWhite900 : null,
          },
        ]}
      >
        <View
          style={{
            width: RFValue(32, 844),
            height: RFValue(32, 844),
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Image
            source={props.iconImage}
            style={{
              width:
                props.iconImage == IMAGES.citationInactive ||
                  props.iconImage == IMAGES.citationActive
                  ? "100%"
                  : props.iconImage == IMAGES.linkActive ||
                    props.iconImage == IMAGES.linkInactive
                    // props.iconImage == IMAGES.companyActive ||
                    // props.iconImage == IMAGES.companyInactive
                    ? "70%"
                    : "85%",
              height:
                props.iconImage == IMAGES.citationInactive ||
                  props.iconImage == IMAGES.citationActive
                  ? "100%"
                  : props.iconImage == IMAGES.linkActive ||
                    props.iconImage == IMAGES.linkInactive
                    ? "70%"
                    : "85%",
              resizeMode: "contain",
            }}
          />
        </View>
        {props.isActive ? (
          <Text style={Styles.mcText}>{props.text}</Text>
        ) : null}
      </View>
    </TouchableOpacity>
  );
}
export default CategoryBox;

const Styles = StyleSheet.create({
  mcContainer: {
    paddingHorizontal: RFValue(16, 844),
    justifyContent: "center",
    flexDirection: "row",
    height: RFValue(48, 844),
    borderRadius: RFValue(200, 844),
    justifyContent: "center",
    alignItems: "center",
  },

  mcText: {
    fontFamily: "Poppins_500Medium",
    fontSize: RFValue(14, 844),
    color: COLORS.monoBlack700,
    marginLeft: 8,
  },
});
