import React, { Component } from "react";
import { RFValue } from "react-native-responsive-fontsize";
import {
  View,
  Image,
  TouchableWithoutFeedback,
  Dimensions,
  Text,
} from "react-native";
import COLORS from "../../../../themes/colors";
import WebView from "react-native-webview";
import { LinearGradient } from "expo-linear-gradient";
const width = Dimensions.get("window").width - RFValue(32, 844);

export default class VideoComp extends Component {
  constructor() {
    super();
    this.state = {
      clicked: false,
    };
  }
  render() {
    return (
      <View
        style={{
          borderBottomLeftRadius: RFValue(16, 844),
          borderBottomRightRadius: RFValue(16, 844),
          backgroundColor: COLORS.monoWhite900,
        }}
      >
        <View
          style={{
            width: width,
            height: undefined,
            aspectRatio: 16 / 9,
            justifyContent: "space-between",
          }}
        >
          {this.state.clicked ? (
            <WebView
              javaScriptEnabled={true}
              domStorageEnabled={true}
              source={{
                uri: `https://www.youtube.com/embed/${this.props.mediaId}`,
              }}
            />
          ) : (
            <TouchableWithoutFeedback
              onPress={() => {
                this.setState({
                  clicked: true,
                });
              }}
            >
              <Image
                style={{
                  width: "100%",
                  height: "100%",
                }}
                source={{
                  uri: `http://img.youtube.com/vi/${this.props.mediaId}/mqdefault.jpg`,
                }}
              />
            </TouchableWithoutFeedback>
          )}
          {/* <View
            style={{
              position: "absolute",
       
              backgroundColor: "rgba(0,0,0,0.6)",
              top: 8,
              right: 12,
              paddingHorizontal: 8,
              borderRadius: RFValue(12, 844),
            }}
          >
            <Text
              style={{ color: COLORS.monoWhite900, fontSize: RFValue(14, 844) }}
            >
              {this.props.current + "/" + this.props.total}
            </Text>
          </View> */}
          <LinearGradient
            style={{
              borderBottomLeftRadius: RFValue(16, 844),
              borderBottomRightRadius: RFValue(16, 844),
              position: "absolute",
              bottom: 0,
              width:"100%"
            }}
            colors={[
              "rgba(0,0,0,0.6)",
              "rgba(0,0,0,0.5)",
              "rgba(0,0,0,0.4)",
              "rgba(0,0,0,0.3)",
              "rgba(0,0,0,0.1)",

              "rgba(0,0,0,0.01)",
            ]}
            start={{ x: 0, y: 1 }}
            end={{ x: 0, y: 0 }}
          >
            <View
              style={{
                width: "100%",
                paddingTop: RFValue(20, 844),
                paddingBottom: RFValue(12, 844),
                paddingLeft: RFValue(16, 844),
                borderBottomLeftRadius: RFValue(16, 844),
                borderBottomRightRadius: RFValue(16, 844),
              }}
            >
              <Text
                style={{
                  marginTop: RFValue(12, 844),
                  color: COLORS.monoWhite900,
                  fontSize: RFValue(16, 844),
                  fontFamily: "Poppins_500Medium",
                  marginRight:16
                }}
                numberOfLines={1}
              >
                {this.props.title}
              </Text>
              <Text
                style={{
                  //marginTop: RFValue(12, 844),
                  color: COLORS.monoWhite900,
                  fontSize: RFValue(14, 844),
                  fontFamily: "Poppins_400Regular",
                  marginRight:16
                }}
                numberOfLines={1}
              >
                {this.props.description}
              </Text>
            </View>
          </LinearGradient>
        </View>
      </View>
    );
  }
}
