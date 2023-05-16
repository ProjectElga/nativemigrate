import { LinearGradient } from "expo-linear-gradient";
import SvgUri from "expo-svg-uri";
import React, { useState } from "react";
import {
  Share,
  View,
  Button,
  Text,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  ImageBackground,
} from "react-native";
import { Icon } from "react-native-elements";
import { RFValue } from "react-native-responsive-fontsize";
import SVGS from "../../constants/SvgUri";
import COLORS from "../../themes/colors";
import styles from "./style";
import Carousel, { Pagination } from "react-native-snap-carousel";
import { cardInfo } from "../../assets/jsons/profile/general";
import { rewardTypes } from "../../reducers/rewards/rewards";
import AsyncStorage from "@react-native-async-storage/async-storage";
import STORAGE_KEY from "../../constants/StorageKeys";
import { connect } from "react-redux";
const width = Dimensions.get("window").width;
const RewardPage = (props) => {
  const [activeDotIndex, setActiveDotIndex] = useState(0);
  const onShare = async () => {
    const shareOptions = {
      title: "Shaer Reward",
      message:
        "Hi,\n\nI recently joined Shaer. Its a Messaging & File sharing platform for Creators & Creative Teams. I would love to have you there.\n \nDownload Link Below: \nhttps://play.google.com/store/apps/details?id=elgaroma.com&referrer=utm_source%3Delgaroma_app%26utm_medium%3Drewards_page%26utm_campaign%3Dearly_supporters",
      url: "https://play.google.com/store/apps/details?id=elgaroma.com&referrer=utm_source%3Delgaroma_app%26utm_medium%3Drewards_page%26utm_campaign%3Dearly_supporters",
      subject: "Subject",
    };
    const userId = await AsyncStorage.getItem(STORAGE_KEY.USER_ID);
    const tokenDetail = await AsyncStorage.getItem(STORAGE_KEY.ACCESS_TOKEN);
    try {
      const result = await Share.share(shareOptions);
      if (result.action === Share.sharedAction) {
        props.addRewardShare(userId, tokenDetail);
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };
  const pagination = () => {
    return (
      <Pagination
        dotsLength={3}
        activeDotIndex={activeDotIndex}
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
  };
  const _renderItem = ({ item, index }) => {
    return (
      <LinearGradient
        start={[1, 0]}
        end={[0, 1]}
        colors={["#FF8844", "#FE29E9"]}
        style={{ borderRadius: RFValue(16, 844) }}
      >
        <ImageBackground
          source={{ uri: item.image }}
          imageStyle={{
            width: "100%",
            height: "100%",
            overflow: "hidden",
            borderRadius: RFValue(16, 844),
          }}
          style={styles.rewardCardGradient}
        >
          <Text style={styles.shareText}>{item.title}</Text>
          <Text style={[styles.shareSubText, { width: "70%" }]}>
            {item.subtitle}
          </Text>
        </ImageBackground>
      </LinearGradient>
    );
  };
  return (
    <View>
      <View style={styles.wrapper}>
        <View style={styles.backIcon}>
          <TouchableOpacity
            onPress={() => {
              props.navigation.goBack();
            }}
          >
            <Icon
              name="chevron-left"
              type="feather"
              size={24}
              color={COLORS.monoWhite900}
            />
          </TouchableOpacity>
        </View>
        <Text style={styles.headerText}>Spread the word & Get Rewarded!</Text>
      </View>
      <View style={styles.shareCard}>
        <LinearGradient
          start={[1, 0]}
          end={[0, 1]}
          colors={["#7B61FF", "#FB46FB", "#FFC200"]}
          style={styles.shareGradient}
        >
          <Text style={styles.shareText}>Refer Now!</Text>
          <Text style={styles.shareSubText}>
            Copy the URL below and Invite your Friends
          </Text>
          <TouchableOpacity onPress={onShare} style={styles.shareButton}>
            <Text style={styles.linkText}>
              https://play.google.com/shaer
            </Text>
            <SvgUri
              svgXmlData={SVGS.SHARE_DOTS}
              height={RFValue(24, 844)}
              width={RFValue(24, 844)}
            />
          </TouchableOpacity>
        </LinearGradient>
      </View>
      <View style={styles.rewardTypesWrapper}>
        <View style={{ paddingHorizontal: RFValue(16, 844) }}>
          <Text style={styles.rewardTypesText}>Rewards</Text>
          <Text
            style={[
              styles.rewardTypesSubtext,
              {
                fontFamily: "Poppins_500Medium",
              },
            ]}
          >
            Become Shaer's early supporter
          </Text>
          <Text style={styles.rewardTypesSubtext}>
            We will continue to add exciting rewards!
          </Text>
        </View>
        <View style={{ marginTop: 12, paddingHorizontal: RFValue(18, 844) }}>
          <LinearGradient
            start={[1, 0]}
            end={[0, 1]}
            colors={["#FF8844", "#FE29E9"]}
            style={{ borderRadius: RFValue(16, 844) }}
          >
            <ImageBackground
              source={{ uri: cardInfo.image }}
              imageStyle={{
                width: "100%",
                height: "100%",
                overflow: "hidden",
                borderRadius: RFValue(16, 844),
              }}
              style={styles.rewardCardGradient}
            >
              <Text style={styles.shareText}>{cardInfo.title}</Text>
              <Text style={[styles.shareSubText, { width: "70%" }]}>
                {cardInfo.subtitle}
              </Text>
            </ImageBackground>
          </LinearGradient>
        </View>
      </View>
    </View>
  );
};
const mapStateToProps = (state) => {
  const { rewards } = state;
  return { rewards };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addRewardShare: (userId, tokenDetail) => {
      dispatch({
        type: rewardTypes.ADD_SHARE,
        userId,
        tokenDetail,
      });
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(RewardPage);
