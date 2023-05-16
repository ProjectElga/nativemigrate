import React, { Component, useState } from "react";
import {
  View,
  Image,
  TouchableWithoutFeedback,
  ImageBackground,
  Text,
  ScrollView,
  StyleSheet,
} from "react-native";
import { Icon } from "react-native-elements";
import profile from "../../../../assets/jsons/profile/profiledetails";

//import Icon from "react-native-vector-icons/Ionicons";
import { RFValue } from "react-native-responsive-fontsize";
import COLORS from "../../../../themes/colors";

import ProfileButton from "../../profile/button/profileButton";
import IMAGES from "../../../../themes/Images";
import FollowerInfoBar from "../../profile/followerInfoBar/followerInfoBar";
export default class ProfileCard extends Component {
  constructor() {
    super();
    this.state = {
      expand: false,
    };
  }

  renderPicDetail = () => {
    return (
      <TouchableWithoutFeedback
        onPress={() => {
          this.setState({ expand: !this.state.expand });
        }}
      >
        <View style={Styles.picDetailWrapper}>
          <View style={{ flexDirection: "row" }}>
            <View style={Styles.profilePicture}>
              <Image source={profile.profilePic} style={Styles.profileImage} />
            </View>
            <View style={{ marginLeft: 16, justifyContent: "center" }}>
              <Text style={Styles.profileNameText}>{profile.profileName}</Text>
              <Text style={Styles.categoryText}>{profile.categories}</Text>
            </View>
          </View>

          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Icon
              color={COLORS.monoBlack500}
              name={this.state.expand ? "chevron-up" : "chevron-down"}
              type="feather"
              size={20}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  };

  renderButtons = () => {
    return (
      <View style={Styles.buttonWrapper}>
        <ProfileButton
          bg={COLORS.monoGhost500}
          text="Reject"
          textColor={COLORS.primaryTeal500}
          width="48%"
          onPress={() => {
            alert("Coming soon");
          }}
        />
        <ProfileButton
          bg={COLORS.primaryTeal500}
          text="Accept"
          textColor={COLORS.monoWhite900}
          width="48%"
          onPress={() => {
            this.props.navigation.navigate("EditPage", { type: "Creator" });
          }}
        />
      </View>
    );
  };
  renderDeliverable = () => {
    return (
      <View style={{ marginTop: RFValue(24, 844) }}>
        <Text style={Styles.deliverable}>Deliverable</Text>
        <Text style={Styles.deliverableSubtext}>
          Lorem ipsum dolar si amet, amet si dolar si amet lorem ipsum si amet.
        </Text>
      </View>
    );
  };
  renderFile = () => {
    return (
      <View style={Styles.fileCard}>
        <Image
          source={IMAGES.bg1}
          style={[
            Styles.fileImage,
            {
              borderTopLeftRadius: RFValue(16, 844),
              borderBottomLeftRadius: RFValue(16, 844),
            },
          ]}
        />
        <View style={Styles.fileTextContainer}>
          <Text style={Styles.fileNameText}>File_name_47.jpg</Text>
          <Text style={Styles.fileSizeText}>2,000 KB</Text>
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
    return (
      <View>
        {this.renderPicDetail()}
        {this.state.expand ? (
          <View>
            <FollowerInfoBar
              followers="21K"
              AvgReach="1.3K"
              EngRate="0.4%"
              Collabs="12"
            />

            {this.renderButtons()}
            {this.renderDeliverable()}

            <ScrollView
              showsHorizontalScrollIndicator={false}
              overScrollMode="never"
              horizontal
              style={{
                marginHorizontal: RFValue(-24, 844),
              }}
            >
              
                <View style={Styles.fileContainer}>
                  {this.renderFile()}
                  {this.renderFile()}
                </View>
           
            </ScrollView>
            <View style={Styles.divider}></View>
          </View>
        ) : null}
      </View>
    );
  }
}

const Styles = StyleSheet.create({
  wrapper: {
    backgroundColor: COLORS.monoGhost500,
    paddingHorizontal: RFValue(16, 844),
    paddingTop: RFValue(64, 844),
    height: "100%",
  },
  divider: {
    width: "100%",
    borderColor: COLORS.monoGhost500,
    borderWidth: 1,
    marginTop: RFValue(24, 844),
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
    height:RFValue(72,844)
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
  topCard: {
    backgroundColor: COLORS.monoWhite900,
    borderRadius: RFValue(24, 844),
    paddingVertical: RFValue(24, 844),
    paddingHorizontal: RFValue(28, 844),
  },
  bottomCard: {
    marginTop: RFValue(24, 844),
    backgroundColor: COLORS.monoWhite900,
    borderRadius: RFValue(24, 844),
    paddingVertical: RFValue(24, 844),
    paddingHorizontal: RFValue(28, 844),
  },
  overviewText: {
    color: COLORS.monoBlack900,
    fontFamily: "Poppins_700Bold",
    fontSize: RFValue(18, 844),
  },
  overviewNumberContainer: {
    flexDirection: "row",
    marginTop: RFValue(24, 844),
    justifyContent: "space-between",
  },
  overviewComponent: {
    alignItems: "center",
    justifyContent: "center",
  },
  number: {
    fontSize: 32,
    color: COLORS.primaryTeal500,
    fontFamily: "Poppins_700Bold",
  },
  numberText: {
    fontFamily: "Poppins_700Bold",
    fontSize: RFValue(12, 844),
    color: COLORS.monoBlack900,
  },
  buttonWrapper: {
    marginTop: RFValue(24, 844),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  picDetailWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: RFValue(24, 844),
  },
  profilePicture: {
    width: RFValue(64, 844),
    height: RFValue(64, 844),
    borderRadius: RFValue(50, 844),
  },
  profileImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
    borderRadius:50
  },
  profileNameText: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: RFValue(16, 844),
    color: COLORS.monoBlack900,
  },
  userNameText: {
    fontFamily: "Poppins_500Medium",
    fontSize: 12,
    color: COLORS.monoBlack500,
    marginTop: RFValue(8, 844),
  },
  categoryText: {
    marginTop: RFValue(8, 844),
    fontFamily: "Poppins_500Medium",
    fontSize: RFValue(12,844),
    color: COLORS.monoBlack700,
    paddingTop: RFValue(2, 844),
  },
  deliverable: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: RFValue(12, 844),
    color: COLORS.monoBlack700,
    marginLeft: 2,
  },
  deliverableSubtext: {
    fontFamily: "Poppins_500Medium",
    fontSize: RFValue(12, 844),
    color: COLORS.monoBlack500,

    marginTop: 8,
  },
});
