import React, { Component } from "react";
import { View, Text, Platform, TextInput } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import COLORS from "../../../../themes/colors";
import { Input } from "react-native-elements";

export default class InputFieldLink extends Component {
  render() {
    return (
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          borderBottomColor: COLORS.monoBrightGray,
          borderBottomWidth: this.props.noDivider ? 0 : 1,
          paddingHorizontal: RFValue(12, 844),
          paddingVertical:
            Platform.OS == "ios" ? RFValue(16, 844) : RFValue(12, 844),
          backgroundColor: COLORS.monoWhite900,
          borderRadius:this.props.borderRadius?this.props.borderRadius:null

        }}
      >
        <Text
          style={{
            fontFamily: "Poppins_500Medium",
            fontSize: RFValue(14, 844),
            color: COLORS.monoBlack500,
            paddingLeft: RFValue(16, 844),
          }}
        >
          {this.props.text ? this.props.text + " : " : null}
        </Text>
        <TextInput
          keyboardType={this.props.keyboardType}
          style={{
            width: this.props.width ? this.props.width : "100%",
            height: this.props.height ? this.props.height : "100%",
            textAlignVertical: this.props.height ? "top" : "center",
            // paddingLeft: Platform.OS == "ios" ? 4 : 0,
            //marginTop: Platform.OS == "ios" ? 0 : 4,
            //alignItems:"center",
            backgroundColor: COLORS.monoWhite900,
            fontFamily: "Poppins_400Regular",
            fontSize: RFValue(14, 844),
            color: COLORS.monoBlack700,
            paddingTop: this.props.multiline ? 4 : 0, //includeFontPadding:false,
            paddingRight:
              Platform.OS == "ios" ? RFValue(16, 844) : RFValue(24, 844),
          }}
          onChangeText={(text) => {
            this.props.onChangeText ? this.props.onChangeText(text) : null;
          }}
          multiline={this.props.multiline}
          placeholder={this.props.placeholder}
          placeholderTextColor={COLORS.monoBlack500}
          value={this.props.value}
          //onFocus={this.props.onFocus()}
        />

        {this.props.rightComponent ? this.props.rightComponent() : null}
      </View>
    );
  }
}
