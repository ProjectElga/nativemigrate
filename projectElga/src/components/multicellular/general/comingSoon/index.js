import React, { Component } from "react";

import {
  View,
  ScrollView,
  TextInput,
  Text,
  Image,
  Dimensions,
  TouchableWithoutFeedback,
  ImageBackground,
} from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import COLORS from "../../../../themes/colors";
import IMAGES from "../../../../themes/Images";

export default class ComingSoonCard extends Component {
  render() {
    return (
      <View>
        <ImageBackground
          style={{
            borderRadius: RFValue(24, 844),
            width: "100%",
            height: undefined,
            aspectRatio: 1 / 1,
            alignSelf: "center",
            marginTop: RFValue(16, 844),
          }}
          imageStyle={{
            borderRadius: RFValue(24, 844),
            width: "100%",
            height: undefined,
            aspectRatio: 1 / 1,
          }}
          source={this.props.image ? { uri: this.props.image } : IMAGES.circle}
        >
          <ImageBackground
            style={{
              borderRadius: RFValue(24, 844),
              width: "100%",
              height: undefined,
              aspectRatio: 1 / 1,
              backgroundColor: "rgba(0,0,0,0.7)",
            }}
          >
            <View
              style={{
                borderRadius: RFValue(24, 844),
                width: "100%",
                height: undefined,
                aspectRatio: 1 / 1,
                padding: RFValue(32, 844),
                justifyContent: "flex-start",
              }}
            >
              <Text
                style={{
                  fontFamily: "Poppins_600SemiBold",
                  fontSize: RFValue(16, 844),
                  color: COLORS.monoWhite900,
                }}
              >
                {this.props?.notificationTitle || 'Coming Soon'}
              </Text>
              <Text
                style={{
                  fontFamily: "Poppins_600SemiBold",
                  fontSize: RFValue(32, 844),
                  color: COLORS.monoWhite900,
                  marginVertical: RFValue(8, 844),
                }}
              >
                {this.props.title}
              </Text>
              <View
                style={{
                  width: "100%",
                  borderColor: COLORS.monoWhite900,
                  borderWidth: 1,
                }}
              ></View>
              <View
                style={{
                  paddingVertical: RFValue(24, 844),
                  justifyContent: "flex-start",
                  height: "50%",
                }}
              >
                <Text
                  style={{
                    fontFamily: "Poppins_400Regular",
                    fontSize: RFValue(16, 844),
                    color: COLORS.monoWhite900,
                  }}
                >
                  {this.props.line1}
                </Text>
                <Text
                  style={{
                    marginTop: RFValue(24, 844),
                    fontFamily: "Poppins_400Regular",
                    fontSize: RFValue(16, 844),
                    color: COLORS.monoWhite900,
                  }}
                >
                  {this.props.line2}
                </Text>
                 <Text
                  style={{
                    marginTop: RFValue(24, 844),
                    fontFamily: "Poppins_400Regular",
                    fontSize: RFValue(16, 844),
                    color: COLORS.monoWhite900,
                  }}
                >
                  {this.props.line3}
                </Text> 
              </View>
              {this.props?.isNotification ? null :
                <TouchableWithoutFeedback>
                  <View
                    style={{
                      backgroundColor: COLORS.monoWhite900,
                      borderRadius: RFValue(12, 844),
                      paddingVertical: RFValue(12, 844),
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Text
                      style={{
                        fontFamily: "Poppins_600SemiBold",
                        fontSize: RFValue(16, 844),
                        color: COLORS.monoBlack900,
                      }}
                    >
                      Coming Soon
                    </Text>
                  </View>
                </TouchableWithoutFeedback>}
            </View>
          </ImageBackground>
        </ImageBackground>
      </View>
    );
  }
}
