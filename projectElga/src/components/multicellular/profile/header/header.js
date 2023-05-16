import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Icon } from "react-native-elements";
import COLORS from "../../../../themes/colors";
import IMAGES from "../../../../themes/Images";
import { RFValue } from "react-native-responsive-fontsize";

import SvgUri from "expo-svg-uri";
import SVGS from "../../../../constants/SvgUri";

export default class ProfileHeader extends Component {
  render() {
    return (
      <View
        style={[
          Styles.wrapper,
          {
            paddingTop: this.props.paddingTop ? this.props.paddingTop : null,
            height: this.props.height ? this.props.height : null,
            paddingHorizontal: this.props.showBackIcon ? 0 : RFValue(10, 844),
            width: this.props.width ? this.props.width : "100%",
          },
        ]}
      >
        <TouchableOpacity
          onPress={() => {
            this.props.onBackPress();
          }}
        >
          <View style={Styles.titleContaier}>
            {this.props.showBackIcon ? (
              <Icon
                style={{ width: RFValue(20, 844), height: RFValue(20, 844) }}
                name={
                  this.props.icon
                    ? this.props.icon
                    : "x"
                }
                size={20}
                type="feather"
                color={this.props.icon?COLORS.monoWhite900:"#aaaaaa"}
                //color={this.props.showChevron ? COLORS.monoWhite900 : "#aaaaaa"}
              />
            ) : null}

            <Text
              ellipsizeMode="middle"
              numberOfLines={1}
              style={[
                Styles.text,
                {
                  marginLeft: this.props.showBackIcon ? 8 : null,
                  color: this.props.color
                    ? this.props.color
                    : COLORS.monoBlack900,
                  fontSize: this.props.fontSize
                    ? this.props.fontSize
                    : RFValue(24, 844),
                },
              ]}
            >
              {this.props.text}
            </Text>
          </View>
        </TouchableOpacity>
        {this.props.rightComponent()}
      </View>
    );
  }
}
const Styles = StyleSheet.create({
  wrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingRight: RFValue(10, 844),
    zIndex: 1,
    marginBottom: RFValue(20, 844),
  },
  text: {
    fontFamily: "Poppins_700Bold",
    marginTop: 4,
  },
  titleContaier: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
});
