import React, { Component } from "react";

import {
  View,
  ScrollView,
  TextInput,
  Text,
  Image,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
} from "react-native";
import ProfileButton from "../../../components/multicellular/profile/button/profileButton";
import Icon from "react-native-vector-icons/Ionicons";
import ProfileHeader from "../../../components/multicellular/profile/header/header";
import SVGS from "../../../constants/SvgUri";
import SvgUri from "expo-svg-uri";
import SCREENSIZE from "../../../constants/ScreenSize";
import COLORS from "../../../themes/colors";
import { RFValue } from "react-native-responsive-fontsize";
import profile from "../../../assets/jsons/discover/profiles.json";
import SaveButtons from "../../../components/multicellular/profile/saveButton/saveButtons";
export default class AllChats extends Component {
  render() {
    return (
      <View
        style={{
          backgroundColor: COLORS.monoWhite900,
          height: "100%",
          justifyContent: "space-between",
        }}
      >
        <View style={styles.wrapper}>
          <ProfileHeader
            text="Pressed Ad Ca.."
            showBackIcon={false}
            fontSize={RFValue(24, 844)}
            rightComponent={() => {
              return (
                <TouchableOpacity
                  onPress={() => {
                    this.props.navigation.goBack(null);
                  }}
                >
                  <SvgUri width={20} height={20} svgXmlData={SVGS.GREYCLOSE} />
                </TouchableOpacity>
              );
            }}
          />
          {/* <SearchBarWithFilter
        onPress={() => {
          this.props.navigation.navigate("Search");
        }}
       
      /> */}
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={styles.scroll}
          >
            <View style={{ marginBottom: 8 }}>
              <View style={styles.divider}></View>
              {profile.map((value, index) => {
                return (
                  <View>
                    <TouchableWithoutFeedback
                      onPress={() => {
                        if (index === 2) {
                          this.props.navigation.navigate("ChatTest", {
                            userName: value.name,
                          });
                        } else {
                          this.props.navigation.navigate("Chat", {
                            userName: value.name,
                          });
                        }
                      }}
                      style={styles.chatButton}
                    >
                      <View key={index} style={styles.card}>
                        <View
                          style={{
                            flexDirection: "row",
                            alignItems: "center",
                          }}
                        >
                          <Image
                            source={{ uri: value.image }}
                            style={styles.image}
                          />
                          <View style={{ marginLeft: RFValue(12, 844) }}>
                            <Text style={styles.profileName}>{value.name}</Text>
                            <Text style={styles.chatText}>
                              I’ve Sent over the files...
                            </Text>
                          </View>
                        </View>

                        <View style={styles.chatNumber}>
                          <Text
                            style={{
                              color: COLORS.monoWhite900,
                              fontSize: RFValue(12, 844),
                            }}
                          >
                            5
                          </Text>
                        </View>
                      </View>
                    </TouchableWithoutFeedback>
                    <View style={styles.divider}></View>
                  </View>
                );
              })}
            </View>
          </ScrollView>
        </View>

        {/* <View style={styles.buttonWrapper}>
          <ProfileButton
            bg={COLORS.primaryTeal500}
            text="Responses"
            textColor={COLORS.monoWhite900}
            width="55%"
            onPress={() => {
              this.props.navigation.navigate("Responses");
            }}
            children={<SvgUri width="16" height="26" svgXmlData={SVGS.PAGE} />}
            isIcon
          />
          <ProfileButton
            bg={COLORS.monoGhost500}
            text="Edit"
            textColor={COLORS.monoBlack500}
            width="40%"
            onPress={() => {
              // this.props.navigation.navigate("CollabRequest");
            }}
            isIcon
            children={<SvgUri width="16" height="26" svgXmlData={SVGS.EDIT} />}
          />
        </View> */}
        <View
          style={{
            width: "100%",
            flexDirection: "row",
            paddingVertical: RFValue(16, 844),
            paddingHorizontal: RFValue(16, 844),
            backgroundColor: COLORS.monoWhite900,
            justifyContent: "space-between",
            height: SCREENSIZE.BottomNavBarViewPortForButtons,
          }}
        >
          <ProfileButton
            bg={COLORS.primaryTeal500}
            text="Responses"
            textColor={COLORS.monoWhite900}
            width="55%"
            height={RFValue(50, 844)}
            onPress={() => {
              this.props.navigation.navigate("Responses");
            }}
            children={<SvgUri width="16" height="26" svgXmlData={SVGS.PAGE} />}
            isIcon
          />
          <ProfileButton
            bg={COLORS.monoGhost500}
            text="Edit"
            textColor={COLORS.monoBlack500}
            width="40%"
            height={RFValue(50, 844)}
            onPress={() => {
              // this.props.navigation.navigate("CollabRequest");
            }}
            //isIcon
            children={<SvgUri width="16" height="26" svgXmlData={SVGS.EDIT} />}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: RFValue(16, 844),
    paddingTop: RFValue(48, 844),
    backgroundColor: COLORS.monoWhite900,
    height: SCREENSIZE.ScreenHeightViewPortForButtons,
  },
  input: {
    paddingRight: RFValue(10, 844),
    paddingLeft: 0,
    color: COLORS.monoWhite900,
    fontFamily: "Poppins_500Medium",
    fontSize: RFValue(12, 844),
    alignItems: "center",
    width: "70%",
  },
  searchSection: {
    // flex: 2,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: COLORS.monoGhost500,
    paddingVertical: RFValue(8, 844),
    borderRadius: RFValue(12, 844),
    paddingHorizontal: RFValue(16, 844),
  },
  searchIcon: {
    padding: RFValue(10, 844),
  },
  scroll: { paddingBottom: 8, marginTop: RFValue(16, 844) },
  divider: {
    width: "100%",
    borderColor: COLORS.monoGhost500,
    borderWidth: 1,
  },
  card: {
    flexDirection: "row",
    paddingVertical: RFValue(16, 844),
    paddingHorizontal: RFValue(12, 844),
    alignItems: "center",
    justifyContent: "space-between",
  },
  image: {
    width: RFValue(48, 844),
    height: RFValue(48, 844),
    borderRadius: RFValue(32, 844),
  },
  profileName: {
    fontFamily: "Poppins_500Medium",
    fontSize: RFValue(14, 844),
    color: COLORS.monoBlack900,
  },
  chatText: {

    fontFamily: "Poppins_400Regular",
    fontSize: RFValue(14, 844),
    color: COLORS.monoBlack500,

  },
  buttonWrapper: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",

    paddingHorizontal: RFValue(16, 844),

    height: "10%",
    backgroundColor: COLORS.monoWhite900,
  },
  chatButton: {
    borderRadius: 50,
    width: RFValue(24, 844),
    height: RFValue(24, 844),
  },
  chatNumber: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: COLORS.primaryTeal400,
    alignItems: "center",
    justifyContent: "center",
  },
});
