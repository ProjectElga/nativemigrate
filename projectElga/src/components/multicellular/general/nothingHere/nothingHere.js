import React, { Component, useEffect } from "react";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { Text, View, Image, Dimensions } from "react-native";
import IMAGES from "../../../../themes/Images";
import COLORS from "../../../../themes/colors";
import { RFValue } from "react-native-responsive-fontsize";
export default class NothingHere extends Component {
  render() {
    return (
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          height: this.props.height ? this.props.height : 500,
          //marginTop: RFValue(40, 844),
          alignSelf: "center",
          display:"flex",
   
        }}
      >
        <Image
          source={this.props.image}
          style={{
            width: RFValue(300, 844),
            height: RFValue(180, 844),
            resizeMode: "contain",
          }}
        />
        <Text
          style={{
            fontFamily: "Poppins_500Medium",
            fontSize: RFValue(16, 844),
            color: COLORS.monoBlack500,
            marginTop: RFValue(16, 844),
          }}
        >
          {this.props.text}
        </Text>
      </View>
    );
  }
}
