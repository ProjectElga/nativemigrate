import React, { Component } from "react";

import {
  Text,
  View,
  Image,
  ScrollView,
  SafeAreaView,
  StyleSheet,
  TouchableWithoutFeedback,
  Modal,
  TouchableOpacity,
  TextInput,
} from "react-native";
import COLORS from "../../../../themes/colors";
import { RFValue } from "react-native-responsive-fontsize";
import SvgUri from "expo-svg-uri";
import SVGS from "../../../../constants/SvgUri";
import AsyncStorage from "@react-native-async-storage/async-storage";
import STORAGE_KEY from "../../../../constants/StorageKeys";
export default class CitationCard extends Component {
  state = {
    clicked: false,
    showModal: false,
    userId: "",
    comment: "",
  };
  handleClick() {
    this.setState({ clicked: !this.state.clicked });
  }
  componentDidMount = async () => {
    const data = this.props.data;
    this.setState({
      userId: await AsyncStorage.getItem(STORAGE_KEY.USER_ID),

      comment: data?.comment,
    });
  };

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
            <TouchableOpacity
              onPress={() => {
                this.props.onPress ? this.props.onPress() : null;
                this.setState({
                  showModal: false,
                });
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
                  Edit Citation
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    );
  };
  render() {
    const data = this.props.data;
    const { userId } = this.state;
    console.log("userId", userId, data);
    return (
      <View style={Styles.wrapper}>
        {this.renderModal()}
        <TouchableWithoutFeedback
          onLongPress={() => {
            userId == data?.profile?.id
              ? this.setState({
                  showModal: true,
                })
              : null;
          }}
          disabled={this.props.disabled}
          onPress={() => {
            this.handleClick();
          }}
        >
          <View style={{ flexDirection: "row" }}>
            <Image
              source={{ uri: data?.profile?.profileImageUrl }}
              style={this.props.isComment ? Styles.imageComment : Styles.image}
            />

            <View style={Styles.textWrapper}>
              <Text style={Styles.userName}>{data?.profile?.displayName}</Text>
              {this.state.clicked ? (
                <Text style={Styles.comment}>{data?.comment}</Text>
              ) : (
                <Text style={Styles.comment}>{data?.comment}</Text>
              )}
            </View>
          </View>
        </TouchableWithoutFeedback>
      </View>
    );
  }
}

const Styles = StyleSheet.create({
  wrapper: {
    width: "100%",
    paddingVertical: RFValue(10, 844),
  },
  image: {
    width: RFValue(48, 844),
    height: RFValue(48, 844),
    position: "relative",
    borderRadius: RFValue(50, 844),
    borderWidth:1.5,
    borderColor:COLORS.monoGhost500
  },
  imageComment: {
    width: RFValue(36, 844),
    height: RFValue(36, 844),
    position: "relative",
    borderRadius: RFValue(50, 844),
    borderWidth:1.5,
    borderColor:COLORS.monoGhost500
  },
  textWrapper: {
    alignItems: "flex-start",
    width: "80%",
  },
  userName: {
    fontFamily: "Poppins_500Medium",
    fontSize: RFValue(14, 844),
    color: COLORS.monoBlack700,
    paddingHorizontal: RFValue(24, 844),
    resizeMode: "contain",
  },
  comment: {
    fontFamily: "Poppins_400Regular",
    fontSize: RFValue(14, 844),
    color: COLORS.monoBlack500,
    marginHorizontal: RFValue(24, 844),
    resizeMode: "contain",
  },
});
