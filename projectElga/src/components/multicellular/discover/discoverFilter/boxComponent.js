import React, { Component } from "react";
import { View, Text, TextInput } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import COLORS from "../../../../themes/colors";
export default class BoxComp extends Component {
  render() {
    return (
      <View style={{ width: "100%" }}>
        <Text
          style={{
            fontFamily: "Poppins_500Medium",
            fontSize: RFValue(16, 844),
            color: COLORS.monoBlack900,
            marginTop: RFValue(16, 844),
          }}
        >
          {this.props.title}
        </Text>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: RFValue(16, 844),
          }}
        >
          <View
            style={{
              width: "48%",
              backgroundColor: COLORS.monoGhost500,
              height: RFValue(48, 844),
              borderRadius: RFValue(20, 844),
              marginLeft: 4,
              flexDirection: "row",
              paddingHorizontal: RFValue(16, 844),
              alignItems: "center",
            }}
          >
            <Text
              style={{
                fontFamily: "Poppins_500Medium",
                fontSize: RFValue(14, 844),
                color: COLORS.monoBlack900,
              }}
            >
              Min :
            </Text>
            <TextInput
              value={this.props.minValue}
              keyboardType="numeric"
              style={{
                width: "80%",
                marginLeft: 4,
                fontFamily: "Poppins_500Medium",
                fontSize: RFValue(14, 844),
                color: COLORS.monoBlack900,
              }}
              onChangeText={(value) => {
                this.props.onChangeTextMin(value);
              }}
              placeholder="E.g : 0"
              placeholderTextColor={COLORS.monoBlack500}
            />
          </View>
          <View
            style={{
              width: "48%",
              backgroundColor: COLORS.monoGhost500,
              height: RFValue(48, 844),
              borderRadius: RFValue(20, 844),
              flexDirection: "row",
              paddingHorizontal: RFValue(16, 844),
              alignItems: "center",
            }}
          >
            <Text
              style={{
                fontFamily: "Poppins_500Medium",
                fontSize: RFValue(14, 844),
                color: COLORS.monoBlack900,
              }}
            >
              Max :
            </Text>
            <TextInput
              value={this.props.maxValue}
              onChangeText={(value) => {
                this.props.onChangeTextMax(value);
              }}
              keyboardType="number-pad"
              style={{
                marginLeft: 4,
                width: "80%",
                fontFamily: "Poppins_500Medium",
                fontSize: RFValue(14, 844),
                color: COLORS.monoBlack900,

              }}
              placeholder="E.g : 1000000"
            />
          </View>
        </View>
      </View>
    );
  }
}
