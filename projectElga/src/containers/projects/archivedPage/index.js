import SvgUri from "expo-svg-uri";
import React, { Component } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  Text,
  ScrollView,
} from "react-native";

import SVGS from "../../../constants/SvgUri";
import SCREENSIZE from "../../../constants/ScreenSize";
import COLORS from "../../../themes/colors";
import { RFValue } from "react-native-responsive-fontsize";
import IMAGES from "../../../themes/Images";
import { Icon } from "react-native-elements";
import ProfileButton from "../../../components/multicellular/profile/button/profileButton";
export default class ArchivedPage extends Component {
  renderFile = () => {
    return (
      <View style={styles.fileCard}>
        <Image
          source={IMAGES.bg1}
          style={[
            styles.fileImage,
            {
              borderTopLeftRadius: RFValue(16, 844),
              borderBottomLeftRadius: RFValue(16, 844),
            },
          ]}
        />
        <View style={styles.fileTextContainer}>
          <Text style={styles.fileNameText}>File_name_47.jpg</Text>
          <Text style={styles.fileSizeText}>2,000 KB</Text>
        </View>
        <View style={{ padding: RFValue(12, 844) }}>
          <Icon
            color={COLORS.monoBlack500}
            name="arrow-down"
            type="feather"
            size={16}
          />
        </View>
      </View>
    );
  };

  render() {
    const identity = this.props.navigation.getParam("identity");
    return (
      <View>
        <View style={styles.wrapper}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                fontFamily: "Poppins_700Bold",
                fontSize: RFValue(20, 844),
                color: COLORS.primaryTeal500,
              }}
            >
              Cafeteria ad campaign
            </Text>
            <TouchableOpacity
              onPress={() => {
                this.props.navigation.goBack(null);
              }}
            >
              <SvgUri width={20} height={20} svgXmlData={SVGS.GREYCLOSE} />
            </TouchableOpacity>
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginTop: RFValue(12, 844),
            }}
          >
            <Image source={IMAGES.Sample_profile} style={styles.smallImage} />
            <Text style={styles.profileName}>
              Anisha Chouhan | Date: 23-08-22
            </Text>
            <View style={styles.category}>
              <Text style={styles.categoryText}>Barter</Text>
            </View>
            <View style={[styles.category,{backgroundColor:COLORS.monoGhost500}]}>
              <Text style={[styles.categoryText,{color:COLORS.primaryTeal500}]}>Opportunities</Text>
            </View>
          </View>
          <View style={{ marginTop: RFValue(16, 844) }}>
            <Text
              style={{
                fontFamily: "Poppins_500Medium",
                fontSize: RFValue(12, 844),
                color: COLORS.monoBlack700,
                lineHeight: RFValue(24, 844),
              }}
            >
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Sollicitudin vitae ultricies facilisis turpis suspendisse commodo
              enim, enim. Et sit lectus scelerisque vitae tempus magna a cras
              nisl. Ac tortor in venenatis, non.
            </Text>
          </View>
          <View
            style={{
              width: "100%",
              borderWidth: 1,
              borderColor: COLORS.monoGhost500,
              marginTop: RFValue(24, 844),
            }}
          ></View>
          <View style={{ marginTop: RFValue(24, 844) }}>
            <Text
              style={{
                fontFamily: "Poppins_700Bold",
                fontSize: RFValue(20, 844),
                color: COLORS.primaryTeal500,
              }}
            >
              Project Details
            </Text>

            <View
              style={{
                marginTop: RFValue(16, 844),
                width: "100%",
              }}
            >
              <Text
                style={{
                  fontFamily: "Poppins_700Bold",
                  fontSize: RFValue(12, 844),
                  color: COLORS.primaryTeal500,
                  lineHeight: RFValue(24, 844),
                }}
              >
                Deadline:{" "}
              </Text>
              <Text
                style={{
                  fontFamily: "Poppins_600SemiBold",
                  fontSize: RFValue(12, 844),
                  color: COLORS.monoBlack700,
                  lineHeight: RFValue(24, 844),
                }}
              >
                23-02-2020{" "}
              </Text>
            </View>

            <View
              style={{
                marginTop: RFValue(16, 844),
                width: "100%",
              }}
            >
              <Text
                style={{
                  fontFamily: "Poppins_700Bold",
                  fontSize: RFValue(12, 844),
                  color: COLORS.primaryTeal500,
                  lineHeight: RFValue(24, 844),
                }}
              >
                Budget:{" "}
              </Text>
              <Text
                style={{
                  fontFamily: "Poppins_600SemiBold",
                  fontSize: RFValue(12, 844),
                  color: COLORS.monoBlack700,
                  lineHeight: RFValue(24, 844),
                }}
              >
                {" $1000 for every 100k Reach. Engagement rate must be >20%"}
              </Text>
            </View>

            <View
              style={{
                marginTop: RFValue(16, 844),
                width: "100%",
                flexWrap: "wrap",
              }}
            >
              <Text
                style={{
                  fontFamily: "Poppins_700Bold",
                  fontSize: RFValue(12, 844),
                  color: COLORS.primaryTeal500,
                  lineHeight: RFValue(24, 844),
                }}
              >
                Deliverable:{" "}
              </Text>
              <Text
                style={{
                  fontFamily: "Poppins_600SemiBold",
                  fontSize: RFValue(12, 844),
                  color: COLORS.monoBlack700,
                  flexShrink: 1,
                  lineHeight: RFValue(24, 844),
                }}
              >
                Promotion Reels: Campaign story line will be shared
              </Text>
            </View>

            {identity == "collab" ? (
              <View
                style={{
                  borderWidth: 1,
                  borderColor: COLORS.monoGhost500,
                  width: "100%",
                  marginTop: RFValue(24, 844),
                }}
              ></View>
            ) : (
              <View
                style={{
                  flexDirection: "row",
                  width: "100%",
                  justifyContent: "space-between",
                  alignItems: "center",

                  marginTop: RFValue(16, 844),
                }}
              >
                <View
                  style={{
                    borderWidth: 1,
                    borderColor: COLORS.monoGhost500,
                    width: "80%",
                  }}
                ></View>
                <Text
                  style={{
                    fontFamily: "Poppins_600SemiBold",
                    fontSize: 10,
                    color: COLORS.monoBlack500,
                    alignSelf: "flex-end",
                  }}
                >
                  Response
                </Text>
              </View>
            )}

            {identity == "collab" ? (
              <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                style={{
                  marginHorizontal: RFValue(-16, 844),
                  marginTop: RFValue(24, 844),
                  paddingLeft: RFValue(16, 844),
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                
                    paddingRight: RFValue(16, 844),
                  }}
                >
                  <Image
                    source={IMAGES.bg1}
                    style={{
                      width: RFValue(326, 844),
                      height: null,
                      aspectRatio: 16 / 9,
                      borderRadius: RFValue(16, 844),
                    }}
                  />
                  <Image
                    source={IMAGES.bg1}
                    style={{
                      width: RFValue(326, 844),
                      height: null,
                      aspectRatio: 16 / 9,
                      borderRadius: RFValue(16, 844),
                      marginLeft: 12,
                    }}
                  />

                  <Image
                    source={IMAGES.bg1}
                    style={{
                      width: RFValue(326, 844),
                      height: null,
                      aspectRatio: 16 / 9,
                      borderRadius: RFValue(16, 844),
                      marginLeft: 12,
                      marginRight: RFValue(16, 844),
                    }}
                  />
                </View>
              </ScrollView>
            ) : (
              <View
                style={{ flexDirection: "row", marginTop: RFValue(28, 844) }}
              >
                <Image
                  source={IMAGES.Sample_profile}
                  style={{ width: RFValue(32, 844), height: RFValue(32, 844) }}
                />
                <View style={{ marginLeft: RFValue(12, 844) }}>
                  <Text
                    style={{
                      fontFamily: "Poppins_700Bold",
                      fontSize: 12,
                      color: COLORS.monoBlack900,
                      lineHeight: RFValue(18, 844),
                    }}
                  >
                    Bhagat Krishna
                  </Text>
                  <Text
                    style={{
                      fontFamily: "Poppins_600SemiBold",
                      fontSize: 12,
                      color: COLORS.monoBlack700,
                      lineHeight: RFValue(24, 844),
                      marginTop: 4,
                    }}
                  >
                    Hi, Kindly accept the deliverables attached
                  </Text>
                </View>
              </View>
            )}
          </View>

          {identity == "collab" ? null : (
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              style={{
                marginHorizontal: RFValue(-16, 844),

                paddingLeft: RFValue(16, 844),
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  marginTop: RFValue(28, 844),
                  paddingRight: RFValue(16, 844),
                }}
              >
                {this.renderFile()}
                {this.renderFile()}
                {this.renderFile()}
              </View>
            </ScrollView>
          )}
        </View>
        {identity == "collab" ? (
          <View
            style={{
              height: SCREENSIZE.BottomNavBarViewPortForButtons,
              backgroundColor: COLORS.monoWhite900,
              alignItems: "center",
              flexDirection: "row",
              justifyContent: "space-between",
              paddingHorizontal: RFValue(24, 844),
            }}
          >
            <ProfileButton
              bg={COLORS.primaryTeal500}
              text="Reject"
              textColor={COLORS.monoWhite900}
              width="48%"
              onPress={() => {
                this.props.navigation.navigate("Responses");
              }}
              //children={<SvgUri width="16" height="26" svgXmlData={SVGS.PAGE} />}
              //isIcon
            />
            <ProfileButton
              bg={COLORS.monoGhost500}
              text="Accept"
              textColor={COLORS.monoBlack500}
              width="48%"
              onPress={() => {
                // this.props.navigation.navigate("CollabRequest");
              }}
              //isIcon
              //children={<SvgUri width="16" height="26" svgXmlData={SVGS.EDIT} />}
            />
          </View>
        ) : (null
          // <View
          //   style={{
          //     height: SCREENSIZE.BottomNavBarViewPortForButtons,
          //     backgroundColor: COLORS.monoWhite900,
          //     alignItems: "flex-start",
          //     paddingHorizontal: RFValue(24, 844),
          //   }}
          // >
          //   {/* <ProfileButton
          //     image={IMAGES.Archive}
          //     bg="#eeeeee"
          //     text="Archived"
          //     textColor={COLORS.monoBlack500}
          //     width="100%"
          //     onPress={() => {
          //       null;
          //     }}
          //   /> */}
          // </View>
        )}
      </View>
    );
  }
}
const styles = StyleSheet.create({
  wrapper: {
    paddingTop: RFValue(64, 844),
    backgroundColor: COLORS.monoWhite900,
    height: SCREENSIZE.ScreenHeightViewPortForButtons,
    paddingBottom: RFValue(0, 844),
    paddingHorizontal: RFValue(24, 844),
  },
  smallImage: {
    width: RFValue(16, 844),
    height: RFValue(16, 844),
    borderRadius: RFValue(6, 844),
  },
  profileName: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: RFValue(12, 844),
    color: COLORS.monoBlack500,
    marginLeft: 8,
  },

  category: {
    borderRadius: RFValue(12, 844),
    backgroundColor: COLORS.primaryTeal400,
    height: RFValue(16, 844),
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 8,
  },
  categoryText: {
    color: COLORS.monoWhite900,
    fontSize: 8,
    fontFamily: "Poppins_600SemiBold",
    marginHorizontal: RFValue(8, 844),
  },
  fileContainer: {
    flexDirection: "row",
    marginTop: RFValue(24, 844),
    paddingRight: RFValue(8, 844),
    paddingLeft: RFValue(24, 844),
  },
  fileCard: {
    backgroundColor: COLORS.monoGhost500,
    borderRadius: RFValue(16, 844),
    flexDirection: "row",
    marginRight: RFValue(16, 844),
    height: RFValue(72, 844),
  },
  fileImage: { width: RFValue(72, 844), height: RFValue(72, 844) },
  fileNameText: {
    fontSize: RFValue(12, 844),
    fontFamily: "Poppins_500Medium",
    color: COLORS.monoBlack700,
  },
  fileTextContainer: {
    marginLeft: RFValue(16, 844),
    paddingVertical: RFValue(12, 844),
    justifyContent: "space-evenly",
  },
  fileSizeText: {
    fontSize: 8,
    fontFamily: "Poppins_500Medium",
    color: COLORS.monoBlack700,
  },
});
