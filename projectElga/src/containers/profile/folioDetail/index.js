import React, { Component } from "react";
import {
  Animated,
  View,
  StyleSheet,
  PanResponder,
  Text,
  Image,
  Dimensions,
  TouchableWithoutFeedback,
  ScrollView,
  Modal,
  TextInput,
  ImageBackground,
} from "react-native";
import GestureRecognizer, {
  swipeDirections,
} from "react-native-swipe-gestures";
import SaveIcon from "../../../components/multicellular/general/saveIcon";
import IMAGES from "../../../themes/Images";
import COLORS from "../../../themes/colors";
import CitationCard from "../../../components/multicellular/profile/citationCard/citationCard";
import FolioCard from "../../../components/multicellular/profile/folioCard/folioCard";
import Styles from "./Style";
import { RFValue } from "react-native-responsive-fontsize";
import folios from "../../../assets/jsons/profile/folio";
import { Icon } from "react-native-elements";
import SvgUri from "expo-svg-uri";
import SVGS from "../../../constants/SvgUri";
const height = Dimensions.get("window").height;
const width = Dimensions.get("window").width;

export default class FolioDetail extends Component {
  state = {
    saved: false,
    modalVisible: false,
    data: this.data,
  };

  data = this.props.navigation.getParam("data");
  profile = this.props.navigation.getParam("profile");

  renderHeader = () => {
    return (
      <View
        style={{
          zIndex: 1,
          flexDirection: "row",
          alignItems: "flex-start",

          marginTop: RFValue(32, 844),
          justifyContent: "space-between",
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <View
            style={{
              width: RFValue(64, 844),
              height: RFValue(64, 844),
              borderRadius: RFValue(32, 844),
            }}
          >
            <Image
              source={{ uri: this.props.navigation.getParam("image") }}
              style={{
                width: RFValue(64, 844),
                height: RFValue(64, 844),
                position: "relative",
                borderRadius: RFValue(32, 844),
              }}
            />
          </View>
          <View>
            <View style={Styles.titleContainer}>
              <Text style={Styles.titleText}>{this.data.title}</Text>
            </View>
            <View style={Styles.subtitleContainer}>
              <Text style={Styles.subtitleText}>
                {this.profile.profileName + " | " + this.data.date}
              </Text>
            </View>
          </View>
        </View>
        <Icon type="material" name="more-vert" size={24} color={COLORS.monoBlack900}/>
      </View>
    );
  };
  handleCrossPress = () => {
    this.props.navigation.goBack(null);
  };

  render() {
    return (
      <View style={Styles.container}>
        <View
          style={{
            height: "88%",
          }}
        >
          <TouchableWithoutFeedback
            onPress={() => {
              this.handleCrossPress();
            }}
          >
            <View
              style={{
                zIndex: 100,
                position: "absolute",
                top: RFValue(52, 844),
                left: RFValue(26, 844),
              }}
            >
              <Icon
                name="chevron-left"
                type="feather"
                size={20}
                color={COLORS.monoWhite900}
              />
            </View>
          </TouchableWithoutFeedback>
          <View
            style={{
              zIndex: 100,
              position: "absolute",
              top: RFValue(44, 844),
              right: RFValue(26, 844),
              width: RFValue(40, 844),
              height: RFValue(40, 844),
              backgroundColor: COLORS.monoWhite900,
              borderRadius: RFValue(20, 844),
            }}
          >
            <SaveIcon />
          </View>
          <View
            style={{
              zIndex: 100,
              position: "absolute",
              top: RFValue(44, 844),
              right: RFValue(80, 844),
              width: RFValue(40, 844),
              height: RFValue(40, 844),
              backgroundColor: COLORS.monoWhite900,
              borderRadius: RFValue(20, 844),
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <SvgUri
              svgXmlData={SVGS.SHARE}
              width={RFValue(24, 844)}
              height={RFValue(24, 844)}
            />
          </View>

          <ScrollView
            showsVerticalScrollIndicator={false}
            overScrollMode={"never"}
            contentContainerStyle={{ justifyContent: "flex-end", zIndex: 0 }}
          >
            {this.data.images.map((value, index) => {
              return (
                <ImageBackground
                  key={index}
                  source={value}
                  style={{
                    width: width,
                    height: undefined,
                    flexWrap: "wrap",
                    aspectRatio: 16 / 9,

                    resizeMode: "contain",
                  }}
                ></ImageBackground>
              );
            })}
          </ScrollView>
        </View>
        <GestureRecognizer
          onSwipeUp={() => {
            this.setState({ modalVisible: !this.state.modalVisible });
          }}
          style={{ height: "100%", width: "100%" }}
        >
          <View style={Styles.headerContainer}>{this.renderHeader()}</View>
        </GestureRecognizer>
        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.modalVisible}
        >
          <View style={{ height: "100%", justifyContent: "flex-end" }}>
            <View style={Styles.modalWrapper}>
              <GestureRecognizer
                onSwipeDown={() => {
                  this.setState({ modalVisible: !this.state.modalVisible });
                }}
                style={{
                  height: RFValue(108, 844),
                  width: "100%",
                  zIndex: 100,
                }}
              >
                <TouchableWithoutFeedback
                  onPress={() => {
                    this.setState({ modalVisible: !this.state.modalVisible });
                  }}
                >
                  {this.renderHeader()}
                </TouchableWithoutFeedback>
              </GestureRecognizer>
              <ScrollView
                showsVerticalScrollIndicator={false}
                overScrollMode={"never"}
              >
                <Text style={Styles.descriptionText}>
                  {this.data.description}
                </Text>
                <View style={Styles.divider}></View>
                <Text style={Styles.addComment}>Add Comments</Text>
                <TextInput
                  placeholder="Type your comment here"
                  placeholderTextColor={COLORS.monoBlack500}
                  style={Styles.commentInput}
                />
                <CitationCard
                  disabled={true}
                  image={
                    "https://images.unsplash.com/photo-1529665253569-6d01c0eaf7b6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1085&q=80"
                  }
                  userName="John Ive"
                  previewComment="Wonderful Pictures, absloutely gorgeous snaps as always!"
                />
                <CitationCard
                  disabled={true}
                  image={
                    "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=389&q=80"
                  }
                  userName="Rohit"
                  previewComment="Beautiful World, Beautiful Landscapes, Beautiful Scenery!"
                />
                <Text style={Styles.seeMore}>See More</Text>
                <View style={Styles.divider}></View>
                <Text style={Styles.similarProjects}>Similar Projects</Text>

                <View
                  style={{
                    width: "100%",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    marginTop: RFValue(16, 844),
                  }}
                >
                  <ScrollView
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    overScrollMode={"never"}
                  >
                    {folios.map((value, index) => {
                      return (
                        <View
                          key={index}
                          style={{ marginRight: RFValue(16, 844) }}
                        >
                          <FolioCard
                            thumbnail={value.thumbnail}
                            title={value.title}
                            date={value.date}
                            onPress={() => {
                              this.data = value;
                              this.setState({
                                data: this.data,
                                modalVisible: false,
                              });
                            }}
                          />
                        </View>
                      );
                    })}
                  </ScrollView>
                </View>
              </ScrollView>
            </View>
          </View>
        </Modal>
      </View>
    );
  }
}
