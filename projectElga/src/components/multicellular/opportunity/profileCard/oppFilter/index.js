import React, { useState, useCallback, useMemo, useRef } from "react";
import {
  BottomSheetModal,
  BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";
import {
  View,
  TextInput,
  Text,
  Image,
  TouchableWithoutFeedback,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { ScrollView } from "react-native-gesture-handler";
import COLORS from "../../../../../themes/colors";
import { RFValue } from "react-native-responsive-fontsize";
import IMAGES from "../../../../../themes/Images";
import { BottomSheet } from "react-native-elements";
import * as Analytics from "expo-firebase-analytics";
import { useSelector } from "react-redux";

const OppFilter = (props) => {
  const [nearMe, setNearMe] = useState(0);
  const [toggleValue, setToggleValue] = useState(false);
  const [avgLikes, setAvgLikes] = useState(0);
  const [engRate, setEngRate] = useState(0);
  const [audience, setAudience] = useState(0);
  const [isScrollEnable, setIsScrollEnable] = useState(true);
  const sortBy = ["Recent Postings", "Closing Soon", "By Creators"];
  const [selectedProjectType, setSelectedProjectType] = useState("Opportunity");
  const transactionTypes = ["Paid", "Network", "Barter", "Split"];
  const [showFilter, setShowFilter] = useState(false);
  const [selectedTransactionType, setSelectedTransactionType] =
    useState("Paid");
    const profile = useSelector((state) => state.profile);
    const { profileData } = profile;
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
  const [selectedShow, setSelectedShow] = useState("Genre");

  const renderProjectType = () => {
    return (
      <View style={{ marginTop: RFValue(24, 844) }}>
        <Text
          style={{
            fontFamily: "Poppins_500Medium",
            fontSize: RFValue(16, 844),
            color: COLORS.monoBlack900,
          }}
        >
          Transaction Type
        </Text>
        <View style={styles.textIconContainer}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            overScrollMode="never"
          >
            {transactionTypes.map((item, index) => {
              return (
                <TouchableWithoutFeedback
                  onPress={() => {
                    setSelectedProjectType(item);
                  }}
                >
                  <View
                    style={[
                      styles.projectTypeCard,
                      {
                        backgroundColor:
                          selectedProjectType == item
                            ? COLORS.primaryTeal500
                            : COLORS.monoGhost500,
                      },
                    ]}
                  >
                    <Text
                      style={[
                        styles.projectTypeCardText,
                        {
                          color:
                            selectedProjectType == item
                              ? COLORS.monoWhite900
                              : COLORS.monoChatGray,
                        },
                      ]}
                    >
                      {item}
                    </Text>
                  </View>
                </TouchableWithoutFeedback>
              );
            })}
          </ScrollView>
        </View>

        <View style={{ marginTop: RFValue(32, 844) }}>
          <Text
            style={{
              fontFamily: "Poppins_500Medium",
              fontSize: RFValue(14, 844),
              color: COLORS.monoBlack900,
            }}
          >
            Sort By
          </Text>
          <View style={styles.textIconContainer}>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              overScrollMode="never"
            >
              {sortBy.map((item, index) => {
                return (
                  <TouchableWithoutFeedback
                    onPress={() => {
                      setSelectedTransactionType(item);
                    }}
                  >
                    <View
                      style={[
                        styles.projectTypeCard,
                        {
                          backgroundColor:
                            selectedTransactionType == item
                              ? COLORS.primaryTeal500
                              : COLORS.monoGhost500,
                        },
                      ]}
                    >
                      <Text
                        style={[
                          styles.projectTypeCardText,
                          {
                            color:
                              selectedTransactionType == item
                                ? COLORS.monoWhite900
                                : COLORS.monoChatGray,
                          },
                        ]}
                      >
                        {item}
                      </Text>
                    </View>
                  </TouchableWithoutFeedback>
                );
              })}
            </ScrollView>
          </View>
        </View>
      </View>
    );
  };
  return (
    <View>
      <TouchableWithoutFeedback
        onPress={() => {
          Analytics.logEvent(`Opportunity_Filter`, {
            contentType: "filter",
            userId: profileData?.id,
            displayName: profileData?.displayName,
            isCreator: profileData?.isCreator,
          });
          setShowFilter(true);
        }}
      >
        <View style={styles.filterContainer}>
          <View style={styles.iconWrapper}>
            <Image source={IMAGES.Menu} style={styles.icon} />
          </View>
        </View>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback
        onPress={() => {
          setShowFilter(false);
        }}
      >
        <BottomSheet isVisible={showFilter}>
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
                  setShowFilter(false);
                }}
              >
                <Icon name="ios-close" size={24} color="#aaaaaa" />
              </TouchableOpacity>
              <Text style={styles.filtersText}>Filters</Text>
              <TouchableOpacity
                onPress={() => {
                  setShowFilter(false);
                }}
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
                width: "100%",
                marginHorizontal: RFValue(-16, 844),
                alignSelf: "center",
                marginTop: RFValue(16, 844),
              }}
            ></View>
            {renderProjectType()}
          </View>
        </BottomSheet>
      </TouchableWithoutFeedback>
    </View>
  );
};
const styles = StyleSheet.create({
  filterContainer: {
    backgroundColor: COLORS.monoWhite900,
    paddingHorizontal: RFValue(18, 844),

    borderRadius: RFValue(12, 844),
    marginLeft: RFValue(8, 844),
    height: RFValue(55, 844),
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
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
    paddingHorizontal: RFValue(16, 844),
    paddingVertical: RFValue(8, 844),
    alignItems: "center",
    justifyContent: "center",
    borderRadius: RFValue(12, 844),
    marginRight: RFValue(12, 844),
  },
  textIconContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: RFValue(12, 844),
  },
  projectTypeCardText: {
    fontFamily: "Poppins_500Medium",
    fontSize: RFValue(14, 844),
    lineHeight: RFValue(24, 844),
  },
  modalWrapper: {
    paddingHorizontal: RFValue(24, 844),
    backgroundColor: COLORS.monoWhite900,
    paddingTop: RFValue(12, 844),
  paddingBottom: RFValue(20, 844),
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
export default OppFilter;
