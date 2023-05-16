import React, { Component } from "react";
import {
  View,
  Image,
  Text,
  TextInput,
  StyleSheet,
  TouchableWithoutFeedback,
} from "react-native";
import { Input } from "react-native-elements";
import COLORS from "../../../../themes/colors";
import { RFValue } from "react-native-responsive-fontsize";
export default class TextInputWithText extends Component {
  render() {
    return (
      <View style={Styles.componentContainer}>
        <View style={Styles.titleContainer}>
          <Text
            style={[
              Styles.componentText,
              {
                color: this.props.textColor
                  ? this.props.textColor
                  : COLORS.primaryTeal500,
              },
            ]}
          >
            {this.props.text}
          </Text>
          <View>
            {this.props.rightTextComponent
              ? this.props.rightTextComponent()
              : null}
          </View>
        </View>
        <View>
          <View style={{ flexDirection: "row" }}>
            <TextInput
              placeholder={
                this.props.placeholder ? this.props.placeholder : null
              }
              multiline={this.props.multiline ? this.props.multiline : false}
              editable={this.props.editable ? this.props.editable : true}
              value={this.props.value}
              textAlign={this.props.textAlign ? this.props.textAlign : null}
              keyboardType={
                this.props.keyboardType ? this.props.keyboardType : null
              }
              style={[
                Styles.inputBar,
                {
                  borderColor: this.props.error ? COLORS.teritiaryWarning: 'transparent',
                  borderWidth: this.props.error ? RFValue(2, 844): 0,
                  textAlignVertical: this.props.height == "big" ? "top" : null,
                  paddingTop: this.props.height == "big" ? RFValue(12, 844) : null,
                  height:
                    this.props.height == "big"
                      ? RFValue(138, 844)
                      : RFValue(56, 844),
                  width: this.props.width ? this.props.width : "100%",
                  lineHeight:
                    this.props.height == "big" ? RFValue(28, 844) : null,
                },
              ]}
              onChangeText={(text) => {
                this.props.onChangeText(text);
              }}
            />
            
            {this.props.rightInputComponent
              ? this.props.rightInputComponent()
              : null}
          </View>
          <View style={Styles.errorTextView}>
          {this.props.error ? (
              <Text
                style={{
                  fontSize: RFValue(12, 844),
                  fontFamily: "Poppins_500Medium",
                  color: COLORS.teritiaryRed500,
                  marginRight: RFValue(12, 844)
                }}
              >
                Required
              </Text>
            ) : null}
          </View>

        </View>
      </View>
    );
  }
}

const Styles = StyleSheet.create({
  componentContainer: {
    width: "100%",
    marginTop: RFValue(24, 844),
  },
  titleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: RFValue(8, 844),
    alignItems: "flex-end",
  },
  errorTextView:{
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "flex-end",
  },
  componentText: {
    fontFamily: "Poppins_700Bold",
    fontSize: RFValue(16, 844),
  },
  inputBar: {
    paddingHorizontal: RFValue(24, 844),
    fontSize: RFValue(14, 844),
    fontFamily: "Poppins_400Regular",
    color: COLORS.monoBlack700,
    marginTop: RFValue(12, 844),
    borderRadius: RFValue(12, 844),
    backgroundColor: COLORS.monoGhost500,

  },
});
