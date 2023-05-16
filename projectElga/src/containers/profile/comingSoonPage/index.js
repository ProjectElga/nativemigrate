import SvgUri from "expo-svg-uri";
import React, { Component } from "react";
import {
  Image,
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableWithoutFeedback,
} from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import { withNavigation } from "react-navigation";
import ProfileButton from "../../../components/multicellular/profile/button/profileButton";
import SVGS from "../../../constants/SvgUri";
import COLORS from "../../../themes/colors";
import IMAGES from "../../../themes/Images";
import styles from "./style";
export default class ComingSoonPage extends Component {
  render() {
    return (
      <View
        style={styles.wrapper}
      >
        <TouchableWithoutFeedback
          onPress={() => {
            this.props.navigation.goBack(null);
          }}
        >
          <View
            style={styles.crossIcon}
          >
            <SvgUri width={20} height={20} svgXmlData={SVGS.GREYCLOSE} />
          </View>
        </TouchableWithoutFeedback>
        <ImageBackground
          style={styles.imageBgWrapper}
          imageStyle={{ width: "110%", height: "100%" }}
          source={IMAGES.walletPage}
        >
          <Text
            style={styles.comingSoonText}
          >
            COMING SOON
          </Text>
          <Text
            style={styles.paymentsText}
          >
            Wallet
          </Text>
          <Text
            style={styles.descriptionText}
          >
            Payments is comming soon on Shaer. No more dependencies on Third party payment solutions.
          </Text>
        </ImageBackground>

       <View style={styles.bottomSheetWrapper}>
          <Text
            style={styles.bottomSheetTitle}
          >
            Payments Are now easier!
          </Text>
          <View
            style={styles.centerTextWrapper}
          >
            <View style={styles.textWrapper}>
              <View
                style={styles.greenTickWrapper}
              >
                <SvgUri
                  width={RFValue(8, 844)}
                  height={RFValue(8, 844)}
                  svgXmlData={SVGS.TICK}
                />
              </View>
              <Text
                style={styles.tickTexts}
              >
                Generate & Track invoices
              </Text>
            </View>

          <View style={styles.textWrapper}>
              <View
                style={styles.greenTickWrapper}
              >
                <SvgUri
                  width={RFValue(8, 844)}
                  height={RFValue(8, 844)}
                  svgXmlData={SVGS.TICK}
                />
              </View>
              <Text
                style={styles.tickTexts}
              >
               pay & Get paid on Time
              </Text>
            </View>

            <View style={{ flexDirection: "row", width: "100%" }}>
               <View
                style={styles.greenTickWrapper}
              >
                <SvgUri
                  width={RFValue(8, 844)}
                  height={RFValue(8, 844)}
                  svgXmlData={SVGS.TICK}
                />
              </View>
              <Text
                style={styles.tickTexts}
              >
               Earn trust with Escrow

              </Text>
            </View>
          </View>
          <View
            style={styles.buttonWrapper}
          >
            <ProfileButton
              bg={COLORS.monoWhite900}
              text="Coming Soon"
              borderWidth={1}
              textColor={COLORS.monoBlack700}
              width="100%"
              onPress={() => {
                null;
              }}
            />
           
          </View> 
        </View>
      </View>
    );
  }
}
