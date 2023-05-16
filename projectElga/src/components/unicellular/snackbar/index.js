import React from "react";
import { View, StyleSheet, Text, Dimensions } from "react-native";
import { Snackbar } from "react-native-paper";
import { RFValue } from "react-native-responsive-fontsize";
import COLORS from "../../../themes/colors";
const width = Dimensions.get("screen").width;
export default function SnackBar(props) {
  return (
    <View
      style={{
        width: width - 32,
        height: "100%",
        justifyContent: "flex-start",
        alignItems: "center",

        position: "absolute",
        alignSelf: "center",
      }}
    >
      <View
        style={{
          height: RFValue(72, 844),
          marginTop: RFValue(64,844),
          alignSelf: "center",
          width: "100%",
        }}
      >
        <Snackbar
          visible={props.visible}
          onDismiss={props.onDismiss}
          style={{
            width: "100%",
            backgroundColor: COLORS.monoWhite900,
            paddingHorizontal: RFValue(8, 844),
            height: RFValue(72, 844),
            borderRadius: RFValue(16, 844),
            alignSelf: "center",
          }}
          action={{
            label: "Close",
            onPress: props.onDismiss,
          }}
        >
          <View styles={Styles.container}>
            <Text style={Styles.title}>{props.text}</Text>
          </View>
        </Snackbar>
      </View>
    </View>
  );
}
const Styles = StyleSheet.create({
  container: {
    width: "100%",
    position: "absolute",
    bottom: RFValue(10, 844),
    zIndex: 100,
  },
  title: {
    fontFamily: "Poppins_400Regular",
    color: COLORS.teritiaryRed500,
    fontSize: RFValue(14, 844),
  },
});
