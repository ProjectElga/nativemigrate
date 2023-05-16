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
  Modal,
  TouchableWithoutFeedback
} from "react-native";

import COLORS from "../../../../themes/colors";
import IMAGES from "../../../../themes/Images";
import { RFValue } from "react-native-responsive-fontsize";
import shadow from "../../../../constants/shadow";
import SaveIcon from "../../general/saveIcon";
import SvgUri from "expo-svg-uri";
import SVGS from "../../../../constants/SvgUri";
import { Icon } from "react-native-elements";

const width = Dimensions.get("window").width - RFValue(48, 844);
export default class FolioCard extends Component {
  state = {
    saved: false,
    showModal: false,
  };
  cardType = this.props.cardType;
  renderModal = () => {
    return (
      <Modal
        visible={this.state.showModal}
        transparent={true}
        animationType="fade"
      >
        <TouchableWithoutFeedback
          onPress={() => {
            this.setState({
              showModal: false,
            });
          }}
        >
          <View
            style={{
              width: "100%",
              height: "100%",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "rgba(0, 0, 0, 0.5)",
            }}
          >
            <View
              style={{
                width: RFValue(248, 844),
                height: RFValue(64, 844),
                backgroundColor: COLORS.monoWhite900,
                borderRadius: RFValue(16, 844),
                alignItems: "center",
                flexDirection: "row",
                paddingHorizontal: RFValue(20, 844),
              }}
            >
              <SvgUri
                svgXmlData={SVGS.RED_DUSTBIN}
                width={RFValue(24, 844)}
                height={RFValue(24, 844)}
              />
              <Text
                style={{
                  marginLeft: RFValue(12, 844),
                  color: COLORS.teritiaryWarning,
                  fontSize: RFValue(14, 844),
                  fontFamily: "Poppins_500Medium",
                }}
              >
                Delete Folio
              </Text>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    );
  };
  render() {
    const shareOptions = {
      title: "Shaer folio",
      message: "https://www.elgaroma.com",
      url: "www.elgaroma.com",
      subject: "Subject",
    };
    return (
      <View style={[Styles.wrapper, shadow]}>
        {this.renderModal()}
        <TouchableWithoutFeedback
          onLongPress={() => {
            this.setState({
              showModal: true,
            });
          }}
          onPress={() => {
            this.props.onPress();
          }}
        >
          <ImageBackground
            source={this.props.thumbnail}
            style={{
              width: width / 2,
              height: width / 2 - RFValue(20, 844),
              alignItems: "flex-end",

              backgroundColor:
                this.cardType == "Add" ? COLORS.primaryTeal400 : null,
              alignItems: this.cardType == "Add" ? "center" : null,
              justifyContent: this.cardType == "Add" ? "center" : null,
              borderTopLeftRadius: RFValue(16, 844),
              borderTopRightRadius: RFValue(16, 844),
            }}
            imageStyle={Styles.bgImg}
          >
            {this.cardType == "Add" ? (
              <View>
                <SvgUri
                  svgXmlData={SVGS.WHITE_PLUS}
                  height={RFValue(40, 844)}
                  width={RFValue(40, 844)}
                />
              </View>
            ) : (
              <View
                style={{
                  width: RFValue(28, 844),
                  height: RFValue(28, 844),
                  backgroundColor: COLORS.monoWhite900,
                  borderRadius: RFValue(20, 844),
                  alignItems: "center",
                  justifyContent: "center",
                  padding: 8,
                  alignSelf: "flex-end",
                  margin: RFValue(12, 844),
                }}
              >
                <SvgUri
                  svgXmlData={SVGS.SHARE}
                  width={RFValue(12, 844)}
                  height={RFValue(12, 844)}
                />
              </View>
            )}
          </ImageBackground>
        </TouchableWithoutFeedback>
        <View style={Styles.bottomContainer}>
          <View>
            <TouchableWithoutFeedback
              onPress={() => {
                this.props.onPress();
              }}
            >
              <Text style={Styles.titleText}>{this.props.title}</Text>
              {/* <Text style={Styles.dateText}>{this.props.date}</Text> */}
            </TouchableWithoutFeedback>
          </View>
          {this.cardType == "Add" ? (
            <View style={{ height: RFValue(40, 844) }}></View>
          ) : (
            <SaveIcon isSaved={this.props.isSaved} />
          )}
        </View>
      </View>
    );
  }
}

const Styles = StyleSheet.create({
  wrapper: {
    width: width / 2,
    borderRadius: RFValue(16, 844),
    marginBottom: RFValue(16, 844),
    shadowColor: "#555555",
    shadowOpacity: 0.05,
    elevation: 3,
    shadowOffset: {
      width: 0,
      height: 0,
    },
  },
  bgImg: {
    borderTopLeftRadius: RFValue(12, 844),
    borderTopRightRadius: RFValue(12, 844),
  },
  bottomContainer: {
    backgroundColor: COLORS.monoWhite900,
    paddingVertical: RFValue(4, 844),
    paddingRight: RFValue(4, 844),
    paddingLeft: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomLeftRadius: RFValue(12, 844),
    borderBottomRightRadius: RFValue(12, 844),
  },
  titleText: {
    fontFamily: "Poppins_500Medium",
    color: COLORS.monoBlack900,
    fontSize: RFValue(14, 844),
  },
  dateText: {
    fontFamily: "Poppins_600SemiBold",
    color: COLORS.primaryTeal500,
    fontSize: RFValue(8, 844),
  },
  forwardIcon: {
    width: RFValue(16, 844),
    height: RFValue(16, 844),
    resizeMode: "contain",
  },
});
