import SvgUri from "expo-svg-uri";
import React, { Component } from "react";
import {
  Dimensions,
  View,
  Image,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import { Icon } from "react-native-elements";
import { RFValue } from "react-native-responsive-fontsize";
import * as Sharing from 'expo-sharing';
import * as FileSystem from "expo-file-system";
import { withNavigationFocus } from "react-navigation";
import SVGS from "../../constants/SvgUri";
import COLORS from "../../themes/colors";
const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

class ImagePreview extends Component {
 
   downloadFile = async (uri) => {
    // const downloadInstance = FileSystem.createDownloadResumable(
    //   uri,
    //   FileSystem.documentDirectory + "image.jpg"
    // );
    try {

      const result = await FileSystem.downloadAsync(
        //file uri
        uri,
        //path to save
        FileSystem.documentDirectory + new Date().toISOString() + "." + getFileExtention(uri),
      );
      console.log(result)
      Sharing.shareAsync(result.uri, {});
      
      saveFile(result.uri)
    } catch (err) {
      ('Download Failed')
    }
  }
  render() {
    const { route } = this.props;
    const { image } = route.params;
    return (
      <ImageBackground
        source={{ uri:image }}
        style={{
          width: width,
          height: height,
          alignItems: "flex-start",
          justifyContent: "space-between",
          paddingTop: RFValue(60, 844),
          paddingRight: RFValue(28, 844),
          paddingLeft: RFValue(28, 844),

          backgroundColor: "black",
          flexDirection:"row"
        }}
        imageStyle={{ resizeMode: "contain" }}
      >
        <TouchableOpacity
          onPress={() => {
            this.downloadFile(image)
          }}
        >
          <View
            style={{
             // backgroundColor: COLORS.monoGhost500,
              height: RFValue(40, 844),
              width: RFValue(40, 844),
              borderRadius: RFValue(20, 844),
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <SvgUri
              svgXmlData={SVGS.DOWNLOAD_ICON}
              width={RFValue(28, 844)}
              height={RFValue(28, 844)}
            />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            this.props.navigation.goBack(null);
          }}
        >
          <View
            style={{
              backgroundColor: COLORS.monoGhost500,
              height: RFValue(40, 844),
              width: RFValue(40, 844),
              borderRadius: RFValue(20, 844),
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Icon
              name="plus"
              type="feather"
              color={COLORS.monoBlack500}
              style={{
                transform: [{ rotate: "45deg" }],
              }}
            />
          </View>
        </TouchableOpacity>
      </ImageBackground>
    );
  }
}
export default ImagePreview
