import React, { Component } from "react";
import { StyleSheet, TextInput, Image, View, Dimensions } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import COLORS from "../../../themes/colors";

export default class Input extends Component {
  render() {
    return (
      <View
        style={[
          styles.input,
          {
            backgroundColor: this.props.bgcolor
              ? this.props.bgcolor
              : COLORS.monoWhite900,
          },
        ]}
      >
        <Image source={this.props.image} style={styles.icon} />
        <TextInput
          value={this.props.value ? this.props.value : null}
          onChangeText={this.props.onChangeText}
          placeholder={this.props.placeholder}
          placeholderTextColor={COLORS.monoBlack500}
          style={
            this.props.value?.length > 0
              ? styles.inputTextBlack
              : styles.inputText
          }
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  input: {
    marginTop: RFValue(16, 844),

    width: "100%",
    height: RFValue(72, 844),
    borderRadius: RFValue(16, 844),
    paddingHorizontal: RFValue(20, 844),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  icon: {
    width: RFValue(23, 844),
    height: RFValue(23, 844),
    resizeMode: "contain",
    marginRight: RFValue(16, 844),
  },
  inputText: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: RFValue(12,844),
    color: COLORS.monoBlack900,
    width: "100%",
  },
  inputTextBlack: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: RFValue(12,844),
    color: COLORS.monoBlack900,
    width: "100%",
  },
});
