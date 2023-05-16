import React, { Component } from "react";
import { ScaledSheet } from "react-native-size-matters";

import {
  ActivityIndicator,
  Text,
  TouchableWithoutFeedback,
  View,
  Image,
  TouchableOpacity,
} from "react-native";
//import COLORS from "../../../themes/colors";
import { withNavigation } from "react-navigation";
import { RFValue } from "react-native-responsive-fontsize";
import COLORS from "../../../themes/colors";

import SvgUri from "expo-svg-uri";
class LoginButton extends Component {
  render() {
    return (
      <TouchableOpacity onPress={()=>{this.props.onPress()}}>
        <View style={{}}>
          <View
            style={[
              styles.container,
              {
                backgroundColor: this.props.backgroundColor,
                marginTop: this.props.marginTop ? this.props.marginTop : null,
              },
            ]}
          >
            <View style={styles.iconView}>
              <SvgUri
                svgXmlData={this.props.icon}
                width={RFValue(24, 844)}
                height={RFValue(24, 844)}
              />
            </View>
            {this.props.loading ? (
              <ActivityIndicator
                style={[styles.buttonText, styles.loaderSnipper]}
                size="small"
                color={this.props.textColor}
                animating
              />
            ) : (
              <Text
                style={[
                  styles.buttonText,
                  {
                    marginLeft: this.props.marginLeft,
                  },
                ]}
              >
                {this.props.text}
              </Text>
            )}
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = ScaledSheet.create({
  container: {
    width: RFValue(320, 844),
    height: RFValue(56, 844),
    borderRadius: 200,
    alignItems: "center",
    justifyContent: "flex-start",
    flexDirection: "row",
    borderColor: COLORS.monoBlack500,
    borderWidth: 0.5,
    paddingLeft: RFValue(18, 844),
    paddingRight: RFValue(30, 844),
  },
  loaderSnipper: { position: "absolute", right: "50%" },
  buttonText: {
    height:RFValue(24,844),
    marginTop:2,
    fontSize: RFValue(16, 844),
    paddingLeft: "20@ms0.3",
    color: COLORS.monoBlack900,
    fontFamily: "Poppins_600SemiBold",

  },

  iconView: {
    marginRight: 0,
    alignItems:"center",
    justifyContent:"center"

  },
});
export default withNavigation(LoginButton);
