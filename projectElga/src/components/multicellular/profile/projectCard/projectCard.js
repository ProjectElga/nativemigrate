import React, { Component } from "react";
import {
  Text,
  View,
  Image,
  StyleSheet,
  Share,
  Dimensions,
  Platform,
  ImageBackground,
} from "react-native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import COLORS from "../../../../themes/colors";
import IMAGES from "../../../../themes/Images";
import { RFValue } from "react-native-responsive-fontsize";
import SaveIcon from "../../general/saveIcon";
import shadow from "../../../../constants/shadow";
import SvgUri from "expo-svg-uri";
import SVGS from "../../../../constants/SvgUri";

const width = Dimensions.get("window").width - RFValue(33, 844);
export default class ProjectCard extends Component {
  state = {
    saved: false,
  };
  handleSplitText = (text) => {
    if (text?.length > 55) {
      return text.substring(0, 55) + "...";
    } else {
      return text;
    }
  };
  render() {
    const shareOptions = {
      title: "Shaer folio",
      message: "https://www.elgaroma.com",
      url: "www.elgaroma.com",
      subject: "Subject",
    };
    return (
      <View
        style={[
          Styles.wrapper,
          shadow,
          { width: this.props.width ? this.props.width : width },
        ]}
      >
        <TouchableWithoutFeedback onPress={this.props.onPress}>
          <ImageBackground
            source={this.props.thumbnail}
            style={Styles.bgImg}
            imageStyle={Styles.imageStyle}
          >
            <View
              style={{
                justifyContent: "space-between",
                alignItems: "flex-start",
                flexDirection: "row",
                paddingHorizontal: RFValue(24, 844),
                paddingTop: RFValue(16, 844),
              }}
            >
              <View style={Styles.category1}>
                <Text style={Styles.category1Text}>{this.props.category1}</Text>
              </View>

              <View
                style={{
                  width: RFValue(28, 844),
                  height: RFValue(28, 844),
                  backgroundColor: COLORS.monoWhite900,
                  borderRadius: RFValue(20, 844),
                  alignItems: "center",
                  justifyContent: "center",
                  padding: 8,
                }}
              >
                <SvgUri
                  svgXmlData={SVGS.SHARE}
                  width={RFValue(16, 844)}
                  height={RFValue(16, 844)}
                />
              </View>
            </View>
            {/* <View
              style={{
                backgroundColor: COLORS.monoBlack900,
                borderBottomRightRadius: RFValue(12, 844),
                borderTopRightRadius: RFValue(12, 844),
                padding: 4,
                marginBottom: RFValue(16, 844),
                width: 50,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text
                style={{
                  fontFamily: "Poppins_600SemiBold",
                  fontSize: 8,
                  color: COLORS.monoWhite900,
                }}
              >
                2h ago
              </Text>
            </View> */}
          </ImageBackground>
        </TouchableWithoutFeedback>
        <View style={Styles.bottomContainer}>
          <Image
            source={this.props.imagePic}
            style={{
              width: RFValue(48, 844),
              height: RFValue(48, 844),
              borderRadius: RFValue(24, 844),
            }}
          />
          <View style={{ width: "75%",marginLeft:RFValue(12,844) }}>
            <TouchableWithoutFeedback>
              <Text style={Styles.titleText} numberOfLines={2}>
                {this.handleSplitText(
                 this.props.title
                )}
              </Text>
              <Text style={Styles.byText}>Budget : 5000 per project</Text>
            </TouchableWithoutFeedback>
          </View>
          <SaveIcon isSaved={this.props.isSaved} />
        </View>
      </View>
    );
  }
}

const Styles = StyleSheet.create({
  wrapper: {
    backgroundColor: COLORS.monoWhite900,
    borderRadius: RFValue(16, 844),
    marginTop: RFValue(24, 844),
    shadowColor: "#555555",
    shadowOpacity: 0.05,
    elevation: 1,
    justifyContent: "space-between",
  },
  bgImg: {
    width: "100%",
    height: undefined,
    aspectRatio: 16 / 9,
    justifyContent: "space-between",
  },
  imageStyle: {
    borderTopLeftRadius: RFValue(16, 844),
    borderTopRightRadius: RFValue(16, 844),
  },
  bottomContainer: {
    backgroundColor: COLORS.monoWhite900,
    paddingVertical: RFValue(16, 844),
    paddingHorizontal: RFValue(12, 844),
    borderBottomLeftRadius: RFValue(16, 844),
    borderBottomRightRadius: RFValue(16, 844),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  titleText: {
    fontFamily: "Poppins_600SemiBold",
    color: COLORS.monoBlack900,
    fontSize: RFValue(16, 844),
  },
  byText: {
    marginTop: RFValue(0, 844),
    fontFamily: "Poppins_400Regular",
    color: COLORS.monoBlack700,
    fontSize: RFValue(14, 844),
  },
  forwardIcon: {
    width: RFValue(20, 844),
    height: RFValue(20, 844),
    resizeMode: "contain",
  },

  category1: {
    borderRadius: RFValue(12, 844),
    backgroundColor: COLORS.primaryTeal400,
    height: RFValue(20, 844),
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 4,
  },
  category1Text: {
    color: COLORS.monoWhite900,
    fontSize: RFValue(12, 844),
    fontFamily: "Poppins_400Regular",
    marginHorizontal: RFValue(8, 844),
    marginTop: 1,
  },
  category2: {
    borderRadius: RFValue(12, 844),
    backgroundColor: COLORS.monoGhost500,
    marginTop: RFValue(24, 844),
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    height: RFValue(16, 844),
  },
  category2Text: {
    color: COLORS.primaryTeal500,
    fontSize: RFValue(8, 844),
    fontFamily: "Poppins_600SemiBold",
    marginHorizontal: RFValue(8, 844),
  },
});
