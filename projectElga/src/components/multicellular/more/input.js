import React, { Component } from "react";

import { StyleSheet, TextInput, Text, View } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import COLORS from "../../../themes/colors";
export default class MoreInput extends Component {
  render() {
    return (
      <View
        style={{
          backgroundColor: this.props.color
            ? this.props.color
            : COLORS.monoWhite900,
          borderColor: this.props.error ? COLORS.teritiaryRed500 : null,
          borderWidth: this.props.error ? 2 : null,
          marginTop: RFValue(24, 844),
          width: "100%",
          height: "auto",
          borderRadius: RFValue(16, 844),
          paddingHorizontal: RFValue(20, 844),
          justifyContent: "space-between",
          alignItems: "center",
          flexDirection: "row"
        }}
      >
        <TextInput
          style={[styles.input, { width: this.props.error ? "80%" : "100%" }]}
          textAlign="left"
          onChangeText={this.props.onChangeText}
          value={this.props.value ? this.props.value : null}
          placeholderTextColor={COLORS.monoBlack500}
          placeholder={this.props.placeholder}
          editable
          autoCapitalize='none'
        />
        {this.props.showErrorMsg ? (
          <Text
            style={{
              fontSize: RFValue(12, 844),
              fontFamily: "Poppins_500Medium",
              color: COLORS.teritiaryRed500,
            }}
          >
            Required
          </Text>
        ) : null}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  input: {
    fontFamily: "Poppins_400Regular",
    fontSize: RFValue(14, 844),
    color: COLORS.monoBlack900,
    paddingVertical: RFValue(16, 844),
  },
});
