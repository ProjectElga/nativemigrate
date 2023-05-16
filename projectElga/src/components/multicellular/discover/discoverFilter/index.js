import React, {
  useState,
  useCallback,
  useMemo,
  useRef,
  useEffect,
} from "react";
import {
  View,
  TextInput,
  Text,
  Image,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
} from "react-native";
import shadow from "../../../../constants/shadow";

import { ScrollView } from "react-native-gesture-handler";
import COLORS from "../../../../themes/colors";
import { RFValue } from "react-native-responsive-fontsize";
import IMAGES from "../../../../themes/Images";
import Icon from "react-native-vector-icons/Ionicons";
import SVGS from "../../../../constants/SvgUri";
import SvgUri from "expo-svg-uri";
import Slider from "@react-native-community/slider";
import ToggleSwitch from "toggle-switch-react-native";
import SliderComponent from "./filterSliderComponent";

import { connect, useSelector } from "react-redux";
import MultiSliderComp from "./multiSlider";
import { filterStates } from "../../../../reducers/discover/filter";
import BoxComp from "./boxComponent";
import { BottomSheet } from "react-native-elements";
import { secondsToHms } from "../../../../utils/SocialNumberFormat";
import * as Analytics from "expo-firebase-analytics";
const width = Dimensions.get("window").width - 60;
const Filter = (props) => {
  const bottomSheetModalRef = useRef(null);
  const [nearMe, setNearMe] = useState(500);
  const [nearMeMin, setNearMeMin] = useState(0);

  const [toggleValue, setToggleValue] = useState(false);

  const [toggleValueBrand, setToggleValueBrand] = useState(false);
  const [activeToggle, setActiveToggle] = useState("INSTAGRAM");
  const [avgLikes, setAvgLikes] = useState(1000000);
  const [avgLikesMin, setAvgLikesMin] = useState(0);

  const [engRate, setEngRate] = useState(50);
  const [engRateMin, setEngRateMin] = useState(0);
  const [audience, setAudience] = useState(1000000);
  const [audienceMin, setAudienceMin] = useState(0);
  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const [isScrollEnable, setIsScrollEnable] = useState(true);
  const {
    setPlarformState,
    setDistanceState,
    setTrendingState,
    setBusinessProfileState,
    setFilterAState,
    setFilterBState,
    setFilterCState,
  } = props;
  const handleScrollGestureEnable = () => {
    setIsScrollEnable(true);
  };
  const handleScrollDisable = () => {
    setIsScrollEnable(false);
  };
  const show = [
    "Genre",
    "Creators",
    "Sub Categories",
    "Brands",
    "Agencies",
    "Prod. House",
  ];
  const profile = useSelector((state) => state.profile);
  const { profileData } = profile;
  const [selectedShow, setSelectedShow] = useState("Genre");
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);
  const handleDismissModalPress = useCallback(() => {
    bottomSheetModalRef.current?.dismiss();
  }, []);

  const handleSheetChanges = useCallback((index) => {
    // console.log("handleSheetChanges", index);
  }, []);
  const snapPoints = useMemo(() => ["55%", "73%"], []);
  const filter = useSelector((state) => state.filter);
  // const {
  //   platform = "",
  //   distance,
  //   trending,
  //   businessProfile,
  //   minFilterA,
  //   maxFilterA,
  //   minFilterB,
  //   maxFilterB,
  //   minFilterC,
  //   maxFilterC,
  // } = filter;

  // useEffect(() => {

  //   console.log(
  //     "paramsFilterComp",
  //     distance,
  //     businessProfile,
  //     platform,
  //     activeToggle,
  //     trending
  //   );
  //   console.log(
  //     "paramsFilterComp",
  //     minFilterA,
  //     maxFilterA,
  //     minFilterB,
  //     maxFilterB,
  //     minFilterC,
  //     maxFilterC
  //   );
  // });
  const renderCreatorReach = () => {
    return (
      <View
        style={{
          flexDirection: "row",
          marginTop: RFValue(32, 844),
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <View
          style={{
            borderWidth: 1,
            borderColor: COLORS.monoGhost500,

            width: "75%",
          }}
        ></View>
        <Text
          style={{
            fontFamily: "Poppins_500Medium",
            fontSize: RFValue(12, 844),
            color: COLORS.monoBlack500,
          }}
        >
          Creator Reach
        </Text>
      </View>
    );
  };
  const renderBusinessProfile = () => {
    return (
      <View
        style={{
          marginTop: RFValue(32, 844),
          alignItems: "center",
          justifyContent: "space-between",
          flexDirection: "row",
        }}
      >
        <Text
          style={{
            fontFamily: "Poppins_500Medium",
            fontSize: RFValue(16, 844),
            color: COLORS.monoBlack900,
          }}
        >
          Business Profile
        </Text>
        <ToggleSwitch
          isOn={toggleValueBrand}
          onColor={COLORS.primaryTeal500}
          size="medium"
          onToggle={() => {
            setBusinessProfileState(!toggleValueBrand);
            setToggleValueBrand(!toggleValueBrand);
          }}
        />
      </View>
    );
  };
  const renderPlatforms = () => {
    return (
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          marginTop: RFValue(32, 844),
        }}
      >
        <Text
          style={{
            fontFamily: "Poppins_500Medium",
            fontSize: RFValue(16, 844),
            color: COLORS.monoBlack900,
          }}
        >
          Platforms
        </Text>
        <View
          style={{
            padding: 4,
            backgroundColor: COLORS.monoGhost500,
            flexDirection: "row",
            width: RFValue(120, 844),
            borderRadius: RFValue(48, 844),
          }}
        >
          <TouchableOpacity
            disabled={toggleValueBrand}
            onPress={() => {
              setPlarformState(null);
              setActiveToggle("INSTAGRAM");
              setEngRate(50.0);
            }}
          >
            <View
              style={[
                activeToggle == "INSTAGRAM" && !toggleValueBrand && shadow,
                {
                  width: RFValue(56, 844),
                  height: RFValue(40, 844),
                  backgroundColor:
                    activeToggle == "INSTAGRAM" && !toggleValueBrand
                      ? COLORS.monoWhite900
                      : COLORS.monoGhost500,
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
            disabled={toggleValueBrand}
            onPress={() => {
              setPlarformState("YOUTUBE");
              setEngRate(9000);
              setActiveToggle("YOUTUBE");
            }}
          >
            <View
              style={[
                activeToggle == "YOUTUBE" && !toggleValueBrand && shadow,
                {
                  width: RFValue(56, 844),
                  height: RFValue(40, 844),
                  backgroundColor:
                    activeToggle == "YOUTUBE" && !toggleValueBrand
                      ? COLORS.monoWhite900
                      : COLORS.monoGhost500,
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
        </View>
      </View>
    );
  };
  const renderTrending = () => {
    return (
      <View
        style={{
          marginTop: RFValue(32, 844),
          alignItems: "center",
          justifyContent: "space-between",
          flexDirection: "row",
        }}
      >
        <Text
          style={{
            fontFamily: "Poppins_500Medium",
            fontSize: RFValue(16, 844),
            color: COLORS.monoBlack900,
          }}
        >
          Trending
        </Text>
        <ToggleSwitch
          disabled={toggleValueBrand}
          isOn={toggleValue}
          onColor={COLORS.primaryTeal500}
          size="medium"
          onToggle={(isOn) => {
            setTrendingState(isOn);
            setToggleValue(isOn);
          }}
        />
      </View>
    );
  };
  const handleSave = () => {
    setIsFilterVisible(false);

    props.onPress ? props.onPress() : null;
  };
  //1000-1k
  //10,000=10k
  //1,00,000=100k
  //10,00,000=1m

  const getNumber = (num) => {
    var number = num.toString();
    if (number.length == 4) {
      number = number.slice(0, 1) + "k";
    }
    if (number.length == 5) {
      number = number.slice(0, 2) + "k";
    }
    if (number.length == 6) {
      number = number.slice(0, 3) + "k";
    }
    if (number.length == 7) {
      number = number.slice(0, 1) + "m";
    }

    return number;
  };
  return (
    <View>
      <TouchableOpacity
        onPress={() => {
          Analytics.logEvent(`Discover_Filter`, {
            contentType: "filter",
            userId: profileData?.id,
            displayName: profileData?.displayName,
            isCreator: profileData?.isCreator,
          });
          setIsFilterVisible(true);
        }}
      >
        <View
          style={[
            styles.filterContainer,
            {
              backgroundColor: props.bgColor
                ? props.bgColor
                : COLORS.monoWhite900,
            },
          ]}
        >
          <View style={styles.iconWrapper}>
            <Image source={IMAGES.Menu} style={styles.icon} />
          </View>
        </View>
      </TouchableOpacity>
      <BottomSheet isVisible={isFilterVisible}>
        <View style={styles.modalWrapper}>
          <View
            style={{
              borderWidth: 2,
              width: RFValue(40, 844),
              alignSelf: "center",
              borderColor: COLORS.monoBlack700,
              borderRadius: RFValue(24, 844),
            }}
          ></View>
          <View style={styles.modalHeader}>
            <TouchableOpacity
              style={{ position: "absolute", left: 0 }}
              onPress={() => {
                setIsFilterVisible(false);
              }}
            >
              <Icon name="ios-close" size={24} color="#aaaaaa" />
            </TouchableOpacity>
            <Text style={styles.filtersText}>Filters</Text>
            <TouchableOpacity
              onPress={handleSave}
              style={{ position: "absolute", right: 0 }}
            >
              <View style={styles.saveButton}>
                <Text style={styles.saveText}>Save</Text>
              </View>
            </TouchableOpacity>
          </View>
          <View
            style={{
              borderWidth: 1,
              borderColor: COLORS.monoGhost500,
              marginTop: RFValue(12, 844),
            }}
          ></View>
          <ScrollView
            showsVerticalScrollIndicator={false}
            overScrollMode="never"
            style={{ height: "90%" }}
            contentContainerStyle={{ alignItems: "center" }}
          >
            <View
              style={{
                marginBottom: 40,
                width: width,
                justifyContent: "center",
              }}
              onTouchStart={handleScrollDisable}
              onTouchEnd={handleScrollGestureEnable}
            >
              <Text
                style={{
                  fontFamily: "Poppins_500Medium",
                  fontSize: RFValue(16, 844),
                  color: COLORS.monoBlack900,
                  marginTop: RFValue(24, 844),
                }}
              >
                Near Me
              </Text>
              <SliderComponent
                step={1}
                value={nearMe}
                minValue={0}
                maxValue={500}
                leftFooter={Math.round(nearMeMin) + " kms"}
                rightFooter={Math.round(nearMe) + " kms"}
                //step={10}
                onValueChange={(value) => {
                  setDistanceState(value);
                  setNearMe(value);
                }}
              />

              {renderBusinessProfile()}
              {renderPlatforms()}
              {renderTrending()}
              {renderCreatorReach()}
              {/* <MultiSliderComp
                minValue={audienceMin}
                maxValue={audience}
                min={0}
                max={1000000}
                title="Audience"
                leftFooter={getNumber(audienceMin)}
                rightFooter={getNumber(audience)}
                onValuesChange={(value) => {
                  setFilterAState(value[0], value[1]);
                  setAudienceMin(value[0]);
                  setAudience(value[1]);
                }}
              /> */}

              <BoxComp
                title={
                  activeToggle == "INSTAGRAM" ? "Followers" : "Subscribers"
                }
                minValue={audienceMin}
                maxValue={audience}
                onChangeTextMin={(value) => {
                  setAudienceMin(value);
                  setFilterAState(Number(value), Number(audience));
                }}
                onChangeTextMax={(value) => {
                  setAudience(value);
                  setFilterAState(Number(audienceMin), Number(value));
                }}
              />

              <BoxComp
                title="Avg. Impressions"
                minValue={avgLikesMin}
                maxValue={avgLikes}
                onChangeTextMin={(value) => {
                  setAvgLikesMin(value);
                  setFilterBState(Number(value), Number(avgLikes));
                }}
                onChangeTextMax={(value) => {
                  setAvgLikes(value);
                  setFilterBState(Number(avgLikesMin), Number(value));
                }}
              />

              {/* <MultiSliderComp
                step={0.1}
                minValue={avgLikesMin}
                maxValue={avgLikes}
                min={0}
                max={1000000}
                title="Avg. Likes"
                leftFooter={getNumber(avgLikesMin)}
                rightFooter={getNumber(avgLikes)}
                onValuesChange={(value) => {
                  setFilterBState(value[0], value[1]);
                  setAvgLikesMin(value[0]);
                  setAvgLikes(value[1]);
                }}
              /> */}

              <MultiSliderComp
                step={activeToggle == "INSTAGRAM" ? 0.1 : 1}
                minValue={engRateMin}
                maxValue={engRate}
                min={0.0}
                max={activeToggle == "INSTAGRAM" ? 50 : 9000}
                title={
                  activeToggle == "INSTAGRAM" ? "Eng. Rate" : "Avg. W. Time"
                }
                leftFooter={
                  activeToggle == "INSTAGRAM"
                    ? engRateMin.toFixed(1) + "%"
                    : secondsToHms(engRateMin)
                }
                rightFooter={
                  activeToggle == "INSTAGRAM"
                    ? engRate.toFixed(1) + "%"
                    : secondsToHms(engRate)
                }
                onValuesChange={(value) => {
                  setFilterCState(Number(value[0]), Number(value[1]));
                  setEngRateMin(value[0]);
                  setEngRate(value[1]);
                }}
              />
            </View>
          </ScrollView>
        </View>
      </BottomSheet>
    </View>
  );
};
const mapStateToProps = (state) => {
  const { filter } = state;
  return { filter };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setPlarformState: (platform) => {
      dispatch({
        type: filterStates.SET_PLATFORM,
        platform: platform,
      });
    },
    setDistanceState: (distance) => {
      dispatch({
        type: filterStates.SET_DISTANCE,
        distance: distance,
      });
    },
    setTrendingState: (trending) => {
      dispatch({
        type: filterStates.SET_TRENDING,
        distance: trending,
      });
    },
    setBusinessProfileState: (businessProfile) => {
      dispatch({
        type: filterStates.SET_BUSINESS_PROFILE,
        businessProfile: businessProfile,
      });
    },
    setFilterAState: (minFilterA, maxFilterA) => {
      dispatch({
        type: filterStates.SET_FILTER_A,
        minFilterA: minFilterA,
        maxFilterA: maxFilterA,
      });
    },
    setFilterBState: (minFilterB, maxFilterB) => {
      dispatch({
        type: filterStates.SET_FILTER_B,
        minFilterB: minFilterB,
        maxFilterB: maxFilterB,
      });
    },
    setFilterCState: (minFilterC, maxFilterC) => {
      dispatch({
        type: filterStates.SET_FILTER_B,
        minFilterC: minFilterC,
        maxFilterC: maxFilterC,
      });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Filter);

const styles = StyleSheet.create({
  filterContainer: {
    paddingHorizontal: RFValue(18, 844),

    borderRadius: RFValue(12, 844),
    marginLeft: RFValue(8, 844),
    height: RFValue(55, 844),
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  modalWrapper: {
    paddingHorizontal: RFValue(24, 844),
    backgroundColor: COLORS.monoWhite900,
    paddingTop: RFValue(12, 844),
    marginBottom: RFValue(-20, 844),
    borderTopLeftRadius: RFValue(24, 844),
    borderTopRightRadius: RFValue(24, 844),
  },
  modalHeader: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    height: RFValue(48, 844),
    width: "100%",
  },
  saveText: {
    fontFamily: "Poppins_700Bold",
    fontSize: RFValue(12, 844),
    color: COLORS.primaryTeal500,
    alignSelf: "center",
  },
  filtersText: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: RFValue(16, 844),
    color: COLORS.monoBlack500,
    marginTop: 2,
  },
  iconWrapper: {
    width: RFValue(24, 844),
    height: RFValue(24, 844),
    borderRadius: RFValue(50, 844),
  },

  icon: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
  projectTypeCard: {
    marginTop: RFValue(16, 844),
    paddingHorizontal: RFValue(16, 844),
    paddingVertical: RFValue(12, 844),
    alignItems: "center",
    justifyContent: "center",
    borderRadius: RFValue(12, 844),
    marginRight: RFValue(12, 844),
  },
  projectTypeCardText: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: RFValue(12, 844),
  },
  saveText: {
    fontSize: RFValue(14, 844),
    fontFamily: "Poppins_500Medium",
    color: COLORS.monoWhite900,
  },
  saveButton: {
    marginRight: RFValue(-12, 844),
    paddingHorizontal: RFValue(16, 844),
    paddingVertical: RFValue(10, 844),
    backgroundColor: COLORS.primaryTeal400,
    borderRadius: RFValue(200, 844),
    alignItems: "center",
    justifyContent: "center",
  },
});
