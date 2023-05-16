import { LinearGradient } from "expo-linear-gradient";
import SvgUri from "expo-svg-uri";
import * as VideoThumbnails from "expo-video-thumbnails";
import React, { Component } from "react";
import { RFValue } from "react-native-responsive-fontsize";
import {
  View,
  Image,
  Text,
  StyleSheet,
  ImageBackground,
  Modal,
  TouchableWithoutFeedback,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Platform,
} from "react-native";
import { ResizeMode, Video } from "expo-av";
import { Icon } from "react-native-elements";
import * as WebBrowser from "expo-web-browser";
import Carousel, { Pagination } from "react-native-snap-carousel";
import shadow from "../../../../constants/shadow";
import SVGS from "../../../../constants/SvgUri";

import COLORS from "../../../../themes/colors";
import IMAGES from "../../../../themes/Images";
import Skeleton from "../../general/skeleton/skeleton";
import WebView from "react-native-webview";
import VideoComp from "./videoComp";
import InstaComp from "./instaComp";
const height = Dimensions.get("window").height;
const width = Dimensions.get("window").width - RFValue(32, 844);
export default class SocialCard extends Component {
  constructor() {
    super();
    this.state = {
      modalVisible: false,
      modalText: "",
      modalImage: "",
      modalLikes: "",
      modalCaption: "",
      loaded: false,
      images: [
        "https://images.unsplash.com/photo-1634986666676-ec8fd927c23d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1935&q=80",
        "https://images.unsplash.com/photo-1506929562872-bb421503ef21?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=468&q=80",
        "https://images.unsplash.com/photo-1568849676085-51415703900f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80",
        "https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=480&q=80",
        "https://images.unsplash.com/photo-1507608616759-54f48f0af0ee?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80",
        "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
      ],
      activeSlide: 0,
      img: [],
      modalType: "",
    };
  }

  generateThumbnail = async (url) => {
    try {
      const result = await VideoThumbnails.getThumbnailAsync(url, {
        time: 15000,
      });
      return uri;
    } catch (e) {
      console.warn(e);
    }
  };
  renderModal = () => {
    const { modalText, modalImage, modalLikes, modalCaption, modalType } =
      this.state;
    return (
      <Modal
        transparent={true}
        animationType="fade"
        visible={this.state.modalVisible}
      >
        <TouchableWithoutFeedback
          onPress={() => {
            this.setState({
              modalVisible: false,
            });
          }}
        >
          <View style={styles.modalWrapper}>
            <View style={{ alignItems: "center", justifyContent: "center" }}>
              <TouchableWithoutFeedback>
                <View style={styles.modalUpperContainer}>
                  <View
                    style={[
                      styles.likeContainer,
                      {
                        width: RFValue(80, 844),
                        position: "absolute",
                        zIndex: 2,
                        top: 20,
                        left: 20,
                      },
                    ]}
                  >
                    <SvgUri
                      svgXmlData={SVGS.RED_HEART}
                      width={RFValue(16, 844)}
                      height={RFValue(16, 844)}
                      style={{ marginBottom: 2 }}
                    />
                    <Text
                      style={{
                        fontFamily: "Poppins_600SemiBold",
                        fontSize: RFValue(12, 844),
                        color: COLORS.monoBlack700,
                        marginLeft: 8,
                      }}
                    >
                      {modalLikes}
                    </Text>
                  </View>

                  {modalType == "VIDEO" ? (
                    <Video
                      source={{ uri: modalImage }}
                      useNativeControls={true}
                      resizeMode="cover"
                      style={{
                        width: RFValue(356, 844),
                        height: undefined,
                        aspectRatio: 1 / 1,
                        borderTopLeftRadius: RFValue(12, 844),
                        borderTopRightRadius: RFValue(12, 844),
                      }}
                    />
                  ) : (
                    <Image
                      source={{ uri: modalImage }}
                      style={{
                        width: RFValue(356, 844),
                        height: undefined,
                        aspectRatio: 1 / 1,
                        borderTopLeftRadius: RFValue(12, 844),
                        borderTopRightRadius: RFValue(12, 844),
                      }}
                    />
                  )}
                </View>
              </TouchableWithoutFeedback>
              <View
                style={{
                  backgroundColor: COLORS.monoWhite900,
                  padding: RFValue(16, 844),
                  borderBottomLeftRadius: RFValue(16, 844),
                  borderBottomRightRadius: RFValue(16, 844),
                  width: RFValue(356, 844),
                }}
              >
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Image
                    style={{
                      width: RFValue(28, 844),
                      height: RFValue(28, 844),
                      resizeMode: "contain",
                    }}
                    source={
                      this.props.cardType == "instagram"
                        ? IMAGES.InstagramColored
                        : IMAGES.Youtube
                    }
                  />
                  <Text
                    style={{
                      fontFamily: "Poppins_600SemiBold",
                      fontSize: RFValue(16, 844),
                      color: COLORS.monoBlack900,
                      marginLeft: RFValue(16, 844),
                    }}
                  >
                    {modalText}
                  </Text>
                </View>
                <Text
                  style={{
                    fontFamily: "Poppins_500Medium",
                    fontSize: RFValue(12, 844),
                    lineHeight: RFValue(24, 844),
                    color: COLORS.monoBlack700,
                    marginTop: RFValue(16, 844),
                  }}
                >
                  {modalCaption}
                </Text>
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    );
  };
  handleSplitText = (text) => {
    if (text?.length > 40) {
      return text.substring(0, 35) + "...";
    } else {
      return text;
    }
  };
  renderCarouselItems = ({ item, index }) => {
    return (
      <VideoComp
        mediaId={item?.ytMediaId}
        title={item?.title}
        total={this.props.mediaData.length}
        current={index + 1}
        description={item?.description}
      />

      /* <ImageBackground
          source={{
            uri: item?.video,
          }}
          imageStyle={{
            width: width,
            height: undefined,
            aspectRatio: 16 / 9,
            resizeMode: "cover",
            borderBottomLeftRadius: RFValue(16, 844),
            borderBottomRightRadius: RFValue(16, 844),
          }}
          style={{
            width: width,
            height: undefined,
            aspectRatio: 16 / 9,
            justifyContent: "flex-end",
          }}
        >
          <View
            style={{
              alignSelf: "flex-end",

              position: "absolute",
              top: 10,
              right: 10,
              marginBottom: RFValue(28, 844),
              justifyContent: "space-between",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <View
              style={{
                width: RFValue(36, 844),
                height: RFValue(20, 844),
                borderRadius: RFValue(16, 844),
                backgroundColor: "rgba(0,0,0,0.5)",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text
                style={{
                  color: COLORS.monoWhite900,
                  fontSize: RFValue(12, 844),
                }}
              >
                {index + 1}/{this.state.images.length}
              </Text>
            </View>
          </View>
          <LinearGradient
            style={{
              borderBottomLeftRadius: RFValue(16, 844),
              borderBottomRightRadius: RFValue(16, 844),
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
                  fontSize: RFValue(14, 844),
                  fontFamily: "Poppins_400Regular",
                }}
              >
                {this.handleSplitText(
                  "Lorem ipsum dolor sit amet, consectetur adipi"
                )}
              </Text>
            </View>
          </LinearGradient>
        </ImageBackground> */
    );
  };
  get pagination() {
    return (
      <Pagination
        dotsLength={this.props.mediaData?.length}
        activeDotIndex={this.state.activeSlide}
        containerStyle={{ backgroundColor: "transparent", paddingVertical: 1 }}
        dotContainerStyle={{ marginHorizontal: 5 }}
        dotStyle={{
          width: 24,
          height: 6,
          borderRadius: 5,
          margin: 0,
          backgroundColor: "#696969",
        }}
        inactiveDotStyle={{
          width: 8,
          height: 8,
          borderRadius: 8,
          margin: 0,
          backgroundColor: COLORS.primaryTeal300,
        }}
        inactiveDotOpacity={0.5}
      />
    );
  }
  renderCarousel = () => {
    return (
      <View style={styles.carouselContainer}>
        <Carousel
          ref={(c) => {
            this._carousel = c;
          }}
          data={this.props.mediaData}
          renderItem={this.renderCarouselItems}
          sliderWidth={width}
          itemWidth={width}
          layout="default"
          onSnapToItem={(index) => this.setState({ activeSlide: index })}
        />
      </View>
    );
  };
  handleLinksPress = async (url) => {
    let result = await WebBrowser.openBrowserAsync(url);
  };
  render() {
    return (
      <View style={styles.wrapper}>
        {this.renderModal()}
        <View style={styles.header}>
          <View style={{ flexDirection: "row" }}>
            <Image source={this.props.icon} style={styles.headerIcon} />
            <Text style={styles.headerText}>{this.props.text}</Text>
          </View>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Icon
              name="users"
              type="feather"
              size={16}
              color={COLORS.monoBlack500}
            />
            <Text style={styles.followerText}>{this.props.follower}</Text>
          </View>
        </View>

        <View
          style={{
            flexDirection: "row",
            flexWrap: "wrap",
            borderBottomLeftRadius: RFValue(16, 844),
            borderBottomRightRadius: RFValue(16, 844),
            backgroundColor: COLORS.monoWhite900,
            overflow: "hidden",
          }}
        >
          {this.props.type == "insta" &&
            this.props.mediaData &&
            this.props.mediaData?.length > 0 &&
            this.props.mediaData.map((value, index) => {
              //console.log("media",value)
              return (
                <InstaComp
                  index={index}
                  value={value}
                  onPress={() => {
                    // this.setState({
                    //   modalVisible: true,
                    //   modalText: this.props.text,
                    //   modalImage: value.image,
                    //   modalLikes: value.like,
                    //   modalCaption: value.caption,
                    //   modalType: value.mediaType,
                    // });
                    this.handleLinksPress(value.permalink);
                  }}
                />
              );
            })}
          {this.props.type == "youtube" && this.renderCarousel()}
          {this.props.type == "youtube" && (
            <TouchableOpacity
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "row",
                width: "100%",
                paddingVertical:RFValue(10,844)
              }}
            >
              {this.pagination}
            </TouchableOpacity>
          )}
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  wrapper: {
    marginTop: RFValue(16, 844),
    width: "100%",
    alignSelf: "center",
    borderTopLeftRadius: RFValue(16, 844),
    borderTopRightRadius: RFValue(16, 844),
    borderBottomLeftRadius: RFValue(16, 844),
    borderBottomRightRadius: RFValue(16, 844),
    backgroundColor: COLORS.monoWhite900,
  },
  modalWrapper: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    //borderRadius: RFValue(16, 844),
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalUpperContainer: {
    height: RFValue(356, 844),
    padding: RFValue(24, 844),
    justifyContent: "center",
  },
  componentWrapper: {
    height: "100%",
    padding: 4,
    justifyContent: "space-between",
  },
  likeContainer: {
    width: 40,
    backgroundColor: COLORS.monoWhite900,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 2,
    borderRadius: RFValue(12, 844),
  },

  horizontalScrollView: {
    paddingLeft: RFValue(16, 844),
  },
  likeText: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 6,
    color: COLORS.primaryTeal500,
    marginLeft: 2,
  },
  carouselContainer: {
    width: "100%",
    height: undefined,
    aspectRatio: 16 / 9,
  },
  header: {
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    padding: RFValue(16, 844),
  },
  imageTitle: {
    color: COLORS.monoGhost500,
    fontSize: 8,
    fontFamily: "Poppins_600SemiBold",
  },
  headerIcon: {
    width: RFValue(24, 844),
    height: RFValue(24, 844),
    resizeMode: "contain",
  },
  headerText: {
    fontFamily: "Poppins_500Medium",
    fontSize: RFValue(14, 844),
    color: COLORS.monoBlack900,
    paddingLeft: RFValue(16, 844),
  },
  image: {
    marginLeft: RFValue(16, 844),
    marginLeft: RFValue(16, 844),
    padding: RFValue(12, 844),
  },
  followerText: {
    fontFamily: "Poppins_500Medium",
    fontSize: RFValue(14, 844),
    color: COLORS.monoBlack500,
    marginLeft: 4,
  },
  imageTitleContainer: {
    backgroundColor: COLORS.monoBlack500,
    padding: 5,
  },
});
