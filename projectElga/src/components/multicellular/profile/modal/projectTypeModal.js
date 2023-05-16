import React, { Component } from "react";
import {
  View,
  Text,
  Image,
  Dimensions,
  TouchableWithoutFeedback,
  ScrollView,
  TextInput,
  KeyboardAvoidingView,
  ImageBackground,
  Modal,
  TouchableOpacity,
  Platform,
} from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import COLORS from "../../../../themes/colors";
import Carousel, { Pagination } from "react-native-snap-carousel";

export default class ProjectModal extends Component {
  constructor() {
    super();
    this.state = {
      activeSlide: 0,
    };
  }
  _renderItem({ item, index }) {
    return (
      <TouchableWithoutFeedback>
        <View
          style={{
            backgroundColor: COLORS.monoWhite900,

            shadowColor: "#555555",
            shadowOpacity: 0.05,
            elevation: 3,
            shadowOffset: {
              width: 0,
              height: 2,
            },
            height: RFValue(340, 844),
            alignItems: "center",
            borderRadius: RFValue(16, 844),
            paddingHorizontal: RFValue(36, 844),
            paddingVertical: RFValue(32, 844),
          }}
        >
          <Image source={item.image} style={{ width: "100%", height: "50%" }} />

          <Text
            style={{
              marginTop: RFValue(32, 844),
              fontFamily: "Poppins_600SemiBold",
              fontSize: RFValue(16, 844),
              color: COLORS.monoBlack700,
            }}
          >
            {item.title}
          </Text>

          <Text
            style={{
              marginTop: RFValue(12, 844),
              fontFamily: "Poppins_400Regular",
              fontSize: RFValue(12, 844),
              color: COLORS.monoBlack500,
              textAlign: "center",
            }}
          >
            {item.subtitle}
          </Text>
        </View>
      </TouchableWithoutFeedback>
    );
  }
  get pagination() {
    const entries = this.props.data;
    return (
      <Pagination
        dotsLength={entries.length}
        activeDotIndex={this.state.activeSlide}
        containerStyle={{ backgroundColor: "rgba(0, 0, 0, 0)" }}
        dotStyle={{
          width: 24,
          height: 10,
          borderRadius: 5,
          marginHorizontal: Platform.OS == "ios" ? 8 : 4,
          backgroundColor: "#696969",
        }}
        inactiveDotStyle={{
          width: 15,
          height: 15,
          borderRadius: 8,
          marginHorizontal: Platform.OS == "ios" ? 4 : 2,
          backgroundColor: COLORS.monoWhite900,
        }}
        inactiveDotOpacity={1}
      />
    );
  }
  render() {
    return (
      <Modal
        transparent={true}
        animationType="fade"
        visible={this.props.visible}
        style={{
          width: "100%",
          height: "100%",
          justifyContent: "center",
          borderWidth:2
        }}
      >
        <TouchableWithoutFeedback
          onPress={() => {
            this.props.onPress ? this.props.onPress() : null;
          }}
        >
          <View
            style={{
              width: "100%",
              height: "100%",
              justifyContent: "center",
              alignItems: "center",
              shadowOpacity: 0.05,
              backgroundColor: "#0000004a",
              borderRadius: RFValue(16, 844),
            }}
          >
            <View
              style={{
                width: RFValue(260, 844),
                alignSelf: "center",
              }}
            >
              <Carousel
                ref={(c) => {
                  this._carousel = c;
                }}
                data={this.props.data}
                renderItem={this._renderItem}
                sliderWidth={RFValue(260, 844)}
                itemWidth={RFValue(260, 844)}
                onSnapToItem={(index) => this.setState({ activeSlide: index })}
              />
              <TouchableWithoutFeedback>
                {this.pagination}
              </TouchableWithoutFeedback>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    );
  }
}
