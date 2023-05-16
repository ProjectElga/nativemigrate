import React, { Component } from "react";
import {
  View,
  Image,
  Dimensions,
  TouchableWithoutFeedback,
  ScrollView,
  ImageBackground,
  KeyboardAvoidingView,
  Text,
} from "react-native";

import ProfileHeader from "../../../../components/multicellular/profile/header/header";
import COLORS from "../../../../themes/colors";
import IMAGES from "../../../../themes/Images";
import Styles from "./Style";
import SaveButtons from "../../../../components/multicellular/profile/saveButton/saveButtons";
import { RFValue } from "react-native-responsive-fontsize";

import Carousel from "react-native-snap-carousel";
import TextInputWithText from "../../../../components/multicellular/profile/textInput/textInput";
import Indicators from "../../../../components/multicellular/general/indicators";

import * as Permissions from "expo-permissions";
import SCREENSIZE from "../../../../constants/ScreenSize";
import ActionButtonFooter from "../../../../components/multicellular/profile/actionButtonFooter";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import InputBox from "../../../../components/multicellular/profile/actionButtonInput";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const height = Dimensions.get("window").height;
const width = Dimensions.get("window").width - RFValue(32, 844);

export default class FolioPage extends Component {
  constructor() {
    super();
    this.state = {
      title: "lorem ipsum",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla non maecenas neque blandit. Purus libero pellentesque porttitor velit. #openforcollaboration",
      images: [],
    };
  }

  getPermissionAsync = async () => {
    if (Platform.OS !== "web") {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== "granted") {
        alert("Sorry, we need camera roll permissions to make this work!");
      } else {
        this.selectImage();
      }
    }
  };

  selectImage = async () => {};
  renderAddImageCard = () => {
    return (
      <View style={Styles.addImageContainer}>
        <TouchableWithoutFeedback
          onPress={() => {
            this.getPermissionAsync();
          }}
        >
          <Image source={IMAGES.Plus} style={Styles.plusIcon} />
        </TouchableWithoutFeedback>
      </View>
    );
  };
  renderHeader = () => {
    return (
      <ProfileHeader
        text="Folio"
        showBackIcon={true}
        fontSize={RFValue(24, 844)}
        onBackPress={() => {
          this.props.navigation.goBack(null);
        }}
        rightComponent={() => {
          return (
            <TouchableWithoutFeedback>
              <View style={Styles.saveButton}>
                <Text style={Styles.saveText}>Post</Text>
              </View>
            </TouchableWithoutFeedback>
          );
        }}
      />
    );
  };
  renderCarouselItems = ({ item, index }) => {
    return (
      <View>
        {/* {item == " " ? (
          this.renderAddImageCard()
        ) : ( */}
        <ImageBackground
          source={item}
          style={Styles.image}
          imageStyle={{ borderRadius: RFValue(16, 844) }}
        >
          <TouchableWithoutFeedback
            onPress={() => {
              const images = this.state.images;
              images.splice(index, 1);
              this.setState({ images: [...images] });
            }}
          >
            <Image source={{ uri: this.state.i }} style={Styles.crossImage} />
          </TouchableWithoutFeedback>
          <View style={{ alignSelf: "center" }}>
            <Indicators
              totalIndicators={this.state.images.length}
              currentPosition={index + 1}
            />
          </View>
        </ImageBackground>
        {/* )} */}
      </View>
    );
  };
  renderCarousel = () => {
    return (
      <View style={Styles.carouselContainer}>
        <Carousel
          ref={(c) => {
            this._carousel = c;
          }}
          data={this.state.images}
          renderItem={this.renderCarouselItems}
          sliderWidth={width}
          itemWidth={width}
          layout="default"
        />
      </View>
    );
  };

  renderDescription = () => {
    return (
      <View style={{ height: RFValue(300, 844) }}>
        <InputBox
          multiline={true}
          height={RFValue(300, 844)}
          placeholder="Description"
          noDivider={true}
          onChangeText={(text) => {
            //  setdescription(text);
          }}
        />
      </View>
    );
  };
  render() {
    return (
      <BottomSheetModalProvider>
        <View style={{ backgroundColor: COLORS.monoWhite900, height: "90%" }}>
          <KeyboardAwareScrollView
            style={Styles.wrapper}
            behavior="padding"
            enabled
          >
            <View
              style={{
                paddingRight: RFValue(8, 844),
                paddingLeft: RFValue(16, 844),
              }}
            >
              {this.renderHeader()}
            </View>
            <ScrollView
              keyboardShouldPersistTaps="never"
              showsVerticalScrollIndicator={false}
              overScrollMode="always"
              contentContainerStyle={Styles.bodyWrapper}
            >
              <View style={{ paddingHorizontal: RFValue(16, 844) }}>
                {this.state.images.length == 0
                  ? this.renderAddImageCard()
                  : this.renderCarousel()}
              </View>
              {this.renderDescription()}
            </ScrollView>
          </KeyboardAwareScrollView>
        </View>
        <View style={{ height: "10%" }}>
          <ActionButtonFooter />
        </View>
      </BottomSheetModalProvider>
    );
  }
}
