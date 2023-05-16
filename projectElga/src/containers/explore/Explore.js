import React, { useCallback, useEffect } from "react";
import {
  RefreshControl,
  SafeAreaView,
  ScrollView,
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
  Image,
  Linking,
} from "react-native";
import { connect, useSelector } from "react-redux";
import { RFValue } from "react-native-responsive-fontsize";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Header from "../../components/multicellular/discover/header";
import ActionButton from "../../components/multicellular/explore/actionButton";
import BottomNavBar from "../../components/multicellular/general/bottomNavBar/bottomNavBar";
import LinkCard from "../../components/multicellular/profile/linkCard";
import Carousel, { Pagination } from "react-native-snap-carousel";
import { exploreData } from "../../config/ExploreConfig";
import shadow from "../../constants/shadow";
import STORAGE_KEY from "../../constants/StorageKeys";
import { getFeedListTypes } from "../../reducers/explore/feed";
import { convertToPercentage } from "../../utils/ConvertPercentage";

import styles from "./Styles";
import FeedCard from "../../components/multicellular/explore/feedCard";
import { isCloseToBottom } from "../../utils/LazyLoading";
import Skeleton from "../../components/multicellular/general/skeleton/skeleton";
import LocationModal from "../../components/multicellular/general/locationModal";
import * as CAMPAIGN from "../../config/campaignConfig";
import { Dimensions } from "react-native";
const admediaUrl =
  "https://oasis-arrow-553.notion.site/Creator-Challenges-a49f6559d9f4453d809017644ca0fdb1";
export const SLIDER_WIDTH = Dimensions.get("window").width - 30;
export const ITEM_WIDTH = Dimensions.get("window").width - 30;
function Explore(props) {
  const [refreshing, setRefreshing] = React.useState(false);
  const isCarousel = React.useRef(null);
  const { callApiToGetFeed, resetRecordOffset } = props;
  const isFocused = useIsFocused();
  const navigation = useNavigation();
  // profilePercentage reducer
  const profilePercentageReducer = useSelector(
    (state) => state.profilePercentage
  );
  const { profilePercentageData: { profilePercentage = 0 } = {} } =
    profilePercentageReducer;

  // profile reducer
  const profile = useSelector((state) => state.profile);
  const { profileData } = profile;
  const { isCreator = true } = profileData;

  // feed reducer
  const feed = useSelector((state) => state.feed);
  const { feedData, loading, recordOffset, recordPerPage, isMoreData } = feed;

  //useEffect api call
  useEffect(() => {
    if (isFocused) {
      effect();
    }
  }, [isFocused]);

  // api call
  const effect = async () => {
    resetRecordOffset();
    const userId = await AsyncStorage.getItem(STORAGE_KEY.USER_ID);
    const tokenDetail = await AsyncStorage.getItem(STORAGE_KEY.ACCESS_TOKEN);
    let params = {
      id: userId,
      recordOffset: 0,
      recordPerPage: 10,
    };
    // callApiToGetFeed(params, tokenDetail);
  };

  // retrive more data
  const retrieveMore = async () => {
    const userId = await AsyncStorage.getItem(STORAGE_KEY.USER_ID);
    const tokenDetail = await AsyncStorage.getItem(STORAGE_KEY.ACCESS_TOKEN);

    let params = {
      id: userId,
      recordOffset: recordOffset,
      recordPerPage: recordPerPage,
    };
    // callApiToGetFeed(params, tokenDetail);
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    effect();
    setTimeout(() => {
      setRefreshing(false);
    }, 500);
  }, []);
  const onClickNavigation = (page) => {
    const { navigation } = props;
    navigation.navigate(page);
  };
  //Views
  const renderHeader = () => {
    return <Header />;
  };
  const renderActionButton = () => {
    return (
      <View
        style={[
          styles.actionButtonWrapper,
          styles.actionButtonWidth,
          styles.mb12,
        ]}
      >
        {exploreData?.actionButton &&
          exploreData?.actionButton?.length > 0 &&
          exploreData?.actionButton?.map((item, index) => {
            return (
              <TouchableOpacity
                style={[
                  styles.actionButtonContainer,
                  index === 1 ? { width: "40%", marginLeft: "3%" } : null,
                ]}
                key={index?.toString()}
                onPress={() => onClickNavigation(item?.pageUrl)}
              >
                <ActionButton text={item?.title} image={item?.image} />
              </TouchableOpacity>
            );
          })}
      </View>
    );
  };
  const renderInfoCard = () => {
    return (
      <View style={styles.actionButtonWrapper}>
        <TouchableOpacity
          style={[styles.smallCardContainer, shadow]}
          onPress={() => onClickNavigation("Discover")}
        >
          <ImageBackground
            style={[styles.smallCardView, shadow]}
            source={{ uri: exploreData?.creator?.image }}
            resizeMode="cover"
            imageStyle={{ backgroundColor: "#DAE2F8" }}
          >
            <View>
              <Text style={styles.smallCardTitle}>
                {exploreData?.creator?.title}
              </Text>
              <Text style={styles.smallCardSubTitle}>
                {exploreData?.creator?.subTitle}
              </Text>
            </View>
          </ImageBackground>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.smallCardContainer, shadow]}
          onPress={() => onClickNavigation("Moodboard")}
        >
          <ImageBackground
            style={[styles.smallCardView, shadow]}
            source={{ uri: exploreData?.store?.image }}
            resizeMode="cover"
            imageStyle={{ backgroundColor: "#DAE2F8" }}
          >
            <View>
              <Text style={styles.smallCardTitle}>
                {exploreData?.store?.title}
              </Text>
              <Text style={styles.smallCardSubTitle}>
                {exploreData?.store?.subTitle}
              </Text>
            </View>
          </ImageBackground>
        </TouchableOpacity>
      </View>
    );
  };

  const renderMediaKit = () => {
    return (
      <TouchableOpacity
        style={styles.actionButtonWrapper}
        onPress={() => onClickNavigation("ProfileProgress")}
      >
        <View style={styles.mediaKitContainer}>
          <ImageBackground
            style={[styles.mediaKitInner]}
            source={{ uri: exploreData?.mediaKit?.image }}
            resizeMode="cover"
            imageStyle={{ backgroundColor: "#DAE2F8" }}
          >
            <Text style={styles.smallCardMediaKitTitle}>
              {exploreData?.mediaKit?.title}
            </Text>
            <View>
              <Text style={styles.smallCardMediaKitNumber}>
                {convertToPercentage(profilePercentage)}%
              </Text>
              <Text style={styles.smallCardMediaKitsmallText}>there</Text>
            </View>
            <Text style={styles.smallCardMediaKitSubTitle}>
              {exploreData?.mediaKit?.subTitle}
            </Text>
          </ImageBackground>
        </View>
      </TouchableOpacity>
    );
  };

  const renderLinkCardLayout = () => {
    return (
      <View
        style={
          convertToPercentage(profilePercentage) < 99 && isCreator
            ? styles.feedLayout
            : styles.feedLayout2
        }
      >
        <View>
          <View style={styles.titleSection}>
            <View style={styles.divider} />
            <Text style={styles.pageTitle}>Discover Feed</Text>
            <View style={styles.divider} />
          </View>
        </View>
        <View>
          {feedData &&
            feedData?.length > 0 &&
            feedData?.map((item, index) => {
              return <FeedCard data={item} isCreator={true} key={index} />;
            })}
          {loading ? (
            <>
              <View style={styles.userCardView}>
                <View style={[shadow, styles.skeletonUserCard]}>
                  <Skeleton styles={styles.sCardProfile} />
                  <View style={styles.sCardBlock}>
                    <Skeleton styles={[styles.sCardStick, { width: "80%" }]} />
                    <Skeleton styles={[styles.sCardStick, { width: "50%" }]} />
                  </View>
                </View>
                <View style={[shadow, styles.skeletonUserCard]}>
                  <Skeleton styles={styles.sCardProfile} />
                  <View style={styles.sCardBlock}>
                    <Skeleton styles={[styles.sCardStick, { width: "80%" }]} />
                    <Skeleton styles={[styles.sCardStick, { width: "50%" }]} />
                  </View>
                </View>
              </View>
            </>
          ) : null}
        </View>
      </View>
    );
  };
  const handlePress = useCallback((link) => {
    // Checking if the link is supported for links with custom URL scheme.
    // const supported = Linking.canOpenURL(link);

    // if (supported) {
    //   // Opening the link with some app, if the URL scheme is "http" the web link should be opened
    //   // by some browser in the mobile
    //   Linking.openURL(link);
    // } else {
    //   Alert.alert(`Don't know how to open this URL: ${link}`);
    // }
    navigation.navigate("CreatorChallenges");
  }, []);
  const carouselCardItem = (item, index) => {
    return (
      <TouchableOpacity
        style={styles.adContainer}
        onPress={() => handlePress(item.url)}
        key={index?.toString()}
      >
        <ImageBackground
          style={[shadow, styles.adImages]}
          source={{ uri: item.image }}
          resizeMode="cover"
        />
      </TouchableOpacity>
    );
  };
  const renderAds = () => {
    return (
      <View style={styles.slideStyle}>
        {/* <Carousel
          ref={isCarousel}
          data={CAMPAIGN.Campaign}
          renderItem={carouselCardItem}
          sliderWidth={SLIDER_WIDTH}
          itemWidth={ITEM_WIDTH}
          autoplay={true}
          autoplayDelay={10000}
          autoplayInterval={5000}
          loop
        /> */}
        {CAMPAIGN.Campaign?.map((item, index) => {
          return carouselCardItem(item, index);
        })}
      </View>
    );
  };
  const renderMainLayout = () => {
    return (
      <ScrollView
        contentContainerStyle={styles.scrollView}
        showsVerticalScrollIndicator={false}
        // refreshControl={
        //   <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        // }
        // onScroll={({ nativeEvent }) => {
        //   if (isCloseToBottom(nativeEvent) && isMoreData && !loading) {
        //     retrieveMore();
        //   }
        // }}
      >
        {renderActionButton()}
        {renderAds()}
        {renderInfoCard()}
        {convertToPercentage(profilePercentage) < 99 &&
          isCreator &&
          renderMediaKit()}
        {/* {renderLinkCardLayout()} */}
      </ScrollView>
    );
  };
  return (
    <SafeAreaView>
      <View style={styles.wrapper}>
        {renderHeader()}
        {renderMainLayout()}
        {feedData && feedData?.length > 0 && <LocationModal />}
      </View>
      <BottomNavBar activeTab="Explore" />
    </SafeAreaView>
  );
}
const mapStateToProps = (state) => {
  const { feed } = state;
  return { feed };
};

const mapDispatchToProps = (dispatch) => {
  return {
    callApiToGetFeed: (params, tokenDetail) => {
      dispatch({
        type: getFeedListTypes.GET_FEED_LIST,
        params,
        tokenDetail,
      });
    },
    resetRecordOffset: () => {
      dispatch({
        type: getFeedListTypes.RESET_OFF_SET_VALUE,
      });
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Explore);
