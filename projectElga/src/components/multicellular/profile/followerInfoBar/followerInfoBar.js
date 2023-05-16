import React, { Component } from "react";
import {
  View,
  StyleSheet,
  Modal,
  Image,
  ImageBackground,
  TouchableOpacity,
  Text,
} from "react-native";

import { RFValue } from "react-native-responsive-fontsize";
import shadow from "../../../../constants/shadow";
import COLORS from "../../../../themes/colors";
import IMAGES from "../../../../themes/Images";
import FollowerInfo from "../../../unicellular/profile/followerInfo";

export default class FollowerInfoBar extends Component {
  constructor() {
    super();
    this.state = {
      activeToggle: "",
    };
  }
  componentDidMount() {
    let activeToggle = this.props.activeToggle;
    this.setState({
      activeToggle: activeToggle,
    });
  }
  render() {
    const follower =
      this.state.activeToggle == "insta"
        ? this.props.instaFollowers
        : this.props.youtubeFollowers;
    const avgReach =
      this.state.activeToggle == "insta"
        ? this.props.instaAvgReach
        : this.props.youtubeAvgReach;
    const engRate =
      this.state.activeToggle == "insta"
        ? this.props.instaEngRate
        : this.props.youtubeEngRate;
    const collabs =
      this.state.activeToggle == "insta"
        ? this.props.instaCollabs
        : this.props.youtubeCollabs;
    return (
      <View style={{ paddingTop: RFValue(12, 844) }}>
        <View
          style={{
            justifyContent: "space-between",
            alignItems: "center",
            flexDirection: "row",
          }}
        >
          <View
            style={{
              padding: 4,
              backgroundColor: COLORS.monoGhost500,
              flexDirection: "row",
              width: RFValue(120, 844),
              borderRadius: RFValue(48, 844),
              //paddingTop: RFValue(12, 844),
            }}
          >
            <TouchableOpacity
              onPress={() => {
                this.setState({
                  activeToggle: "insta",
                });
              }}
            >
              <View
                style={[
                  this.state.activeToggle == "insta" && shadow,
                  {
                    width: RFValue(56, 844),
                    height: RFValue(40, 844),
                    backgroundColor:
                      this.state.activeToggle == "insta"
                        ? COLORS.monoWhite900
                        : null,
                    borderRadius: RFValue(24, 844),
                    alignItems: "center",
                    justifyContent: "center",
                  },
                ]}
              >
                <Image
                  source={IMAGES.InstagramColored}
                  style={{
                    width: RFValue(20, 844),
                    height: RFValue(20, 844),
                    resizeMode: "contain",
                  }}
                />
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                this.setState({
                  activeToggle: "youtube",
                });
              }}
            >
              <View
                style={[
                  this.state.activeToggle == "youtube" && shadow,
                  {
                    width: RFValue(56, 844),
                    height: RFValue(40, 844),
                    backgroundColor:
                      this.state.activeToggle == "youtube"
                        ? COLORS.monoWhite900
                        : null,
                    borderRadius: RFValue(24, 844),
                    alignItems: "center",
                    justifyContent: "center",
                  },
                ]}
              >
                <Image
                  source={IMAGES.YoutubeRed}
                  style={{
                    width: RFValue(20, 844),
                    height: RFValue(20, 844),
                    resizeMode: "contain",
                  }}
                />
              </View>
            </TouchableOpacity>
            {/* <TouchableOpacity
            onPress={() => {
              this.setState({
                activeToggle: "all",
              });
            }}
          >
            <View
              style={{
                width: RFValue(56, 844),
                height: RFValue(40, 844),
                backgroundColor:
                  this.state.activeToggle == "all" ? COLORS.monoWhite900 : null,
                borderRadius: RFValue(24, 844),
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text
                style={{
                  fontFamily: "Poppins_500Medium",
                  fontSize: RFValue(14, 844),
                  color: COLORS.monoBlack700,
                }}
              >
                All
              </Text>
            </View>
          </TouchableOpacity> */}
          </View>
          {/* { this.props.collab&&<TouchableOpacity>
            <View style={Styles.btn}>
              <Text style={Styles.btnText}>Collab</Text>
            </View>
          </TouchableOpacity>} */}
        </View>
        {/* {this.state.activeToggle == "all" && (
          <Text
            style={{
              fontFamily: "Poppins_500Medium",
              fontSize: RFValue(14, 844),
              color: COLORS.monoBlack500,
              marginTop: RFValue(18, 844),
            }}
          >
            Instagram
          </Text>
        )} */}
        <View style={Styles.followerDetailContainer}>
          <FollowerInfo
            number={follower}
            text="Audience"
            image={IMAGES.rect1}
            marginLeft={RFValue(28, 844)}
            subtitle="Total Number of people reached thru your Posts"
          />
          <FollowerInfo
            number={avgReach}
            text="Avg. Imp"
            image={IMAGES.rect2}
            marginLeft={RFValue(100, 844)}
            subtitle="Total number of likes across your social media"
          />
          <FollowerInfo
            number={this.state.activeToggle == "youtube" ? engRate : engRate}
            text={
              this.state.activeToggle == "youtube"
                ? "Avg. W. Time"
                : "Eng. Rate"
            }
            image={IMAGES.rect2}
            marginLeft={RFValue(208, 844)}
            //title={this.state.activeToggle != "insta" ? "Avg. Watch time" :"Eng. Rate"}
            subtitle="Total Engagement rate across your social media"
          />
          <TouchableOpacity
            onPress={() => {
              this.props.onPressColab ? this.props.onPressColab() : null;
            }}
          >
            <FollowerInfo
              color={COLORS.primaryTeal400}
              number={collabs}
              text="Collabs"
              image={IMAGES.rect3}
              marginLeft={RFValue(272, 844)}
              title="Collabs"
              subtitle="Number of Collaborations made thru the App."
            />
          </TouchableOpacity>
        </View>
        {/* {this.state.activeToggle == "all" && (
          <View
            style={{
              width: "100%",
              borderColor: COLORS.monoBrightGray,
              borderWidth: 0.5,
              marginTop: RFValue(18, 844),
            }}
          ></View>
        )} */}
        {/* {this.state.activeToggle == "all" && (
          <Text
            style={{
              fontFamily: "Poppins_500Medium",
              fontSize: RFValue(14, 844),
              color: COLORS.monoBlack500,
              marginTop: RFValue(18, 844),
            }}
          >
            Youtube
          </Text>
        )} */}
        {/* {this.state.activeToggle == "all" && (
          <View style={Styles.followerDetailContainer}>
            <FollowerInfo
              number={this.props.followers ? this.props.followers : 12}
              text="Audience"
              image={IMAGES.rect1}
              marginLeft={RFValue(28, 844)}
              title="Audience"
              subtitle="Total Number of people reached thru your Posts"
            />
            <FollowerInfo
              number={this.props.AvgReach ? this.props.AvgReach : 23}
              text="Avg. Likes"
              image={IMAGES.rect2}
              marginLeft={RFValue(100, 844)}
              title="Avg. Likes"
              subtitle="Total number of likes across your social media"
            />
            <FollowerInfo
              number={this.props.EngRate ? this.props.EngRate : 54}
              text="Eng. Rate"
              image={IMAGES.rect2}
              marginLeft={RFValue(208, 844)}
              title="Eng. Rate"
              subtitle="Total Engagement rate across your social media"
            />
            <TouchableOpacity
              onPress={() => {
                this.props.onPressColab ? this.props.onPressColab() : null;
              }}
            >
              <FollowerInfo
                color={COLORS.primaryTeal400}
                number={this.props.Collabs ? this.props.Collabs : 90}
                text="Collabs"
                image={IMAGES.rect3}
                marginLeft={RFValue(272, 844)}
                title="Collabs"
                subtitle="Number of Collaborations made thru the App."
              />
            </TouchableOpacity>
          </View>
        )} */}
      </View>
    );
  }
}

const Styles = StyleSheet.create({
  followerDetailContainer: {
    marginTop: RFValue(12, 844),
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  btn: {
    backgroundColor: COLORS.primaryTeal500,
    paddingVertical: RFValue(12, 844),
    paddingHorizontal: RFValue(36, 844),
    justifyContent: "center",
    alignItems: "center",
    borderRadius: RFValue(24, 844),
  },
  btnText: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: RFValue(14, 844),
    color: COLORS.monoWhite900,
  },
});
