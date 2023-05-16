import React, { Component } from "react";
import { View, StyleSheet } from "react-native";
import ProfileButton from "../button/profileButton";
import IMAGES from "../../../../themes/Images";
import COLORS from "../../../../themes/colors";
import SCREENSIZE from "../../../../constants/ScreenSize";
import { RFValue } from "react-native-responsive-fontsize";
export default class SaveButtons extends Component {
  render() {
    return (
      <View style={[Styles.buttonContainer, { height: this.props.height }]}>
        <ProfileButton
          text={this.props.button1Text}
          bg={COLORS.monoGhost500}
          width="48%"
          image={this.props.image1 ? this.props.image1 : null}
          textColor={COLORS.monoBlack500}
          onPress={() => {
            console.log("log");
          }}
        />
        <ProfileButton
          text={this.props.button2Text}
          bg={COLORS.primaryTeal500}
          width="48%"
          image={this.props.image2 ? this.props.image2 : null}
          textColor={COLORS.monoWhite900}
          onPress={() => {
            this.props.button2Press
              ? this.props.button2Press()
              : console.log("log");
          }}
        />
      </View>
    );
  }
}

const Styles = StyleSheet.create({
  buttonContainer: {
    width: "100%",
    flexDirection: "row",
    paddingVertical: RFValue(16, 844),
    paddingHorizontal: RFValue(16, 844),
    backgroundColor: COLORS.monoWhite900,
    justifyContent: "space-between",


    // borderWidth:2
  },
});
