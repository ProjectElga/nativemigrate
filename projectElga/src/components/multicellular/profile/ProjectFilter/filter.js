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
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { ScrollView } from "react-native-gesture-handler";
import COLORS from "../../../../themes/colors";
import { RFValue } from "react-native-responsive-fontsize";
import IMAGES from "../../../../themes/Images";

const ProjectFilter = (props) => {
  const bottomSheetModalRef = useRef(null);
  const [nearMe, setNearMe] = useState(0);
  const [toggleValue, setToggleValue] = useState(false);
  const [avgLikes, setAvgLikes] = useState(0);
  const [engRate, setEngRate] = useState(0);
  const [audience, setAudience] = useState(0);
  const [isScrollEnable, setIsScrollEnable] = useState(true);
  const projectTypes = ["Opportunity", "Collab"];
  const [selectedProjectType, setSelectedProjectType] = useState("Opportunity");
  const transactionTypes = ["Paid", "Network", "Barter", "Split"];
  const [selectedTransactionType, setSelectedTransactionType] =
    useState("Paid");

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
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);
  const handleDismissModalPress = useCallback(() => {
    bottomSheetModalRef.current?.dismiss();
  }, []);

  const handleSheetChanges = useCallback((index) => {
    // console.log("handleSheetChanges", index);
  }, []);
  const snapPoints = useMemo(() => ["35%", "35%"], []);
  const renderProjectType = () => {
    return (
      <View style={{ marginTop: RFValue(24, 844) }}>
        <Text
          style={{
            fontFamily: "Poppins_700Bold",
            fontSize: RFValue(16, 844),
            color: COLORS.monoBlack900,
          }}
        >
          Project Type
        </Text>
        <View style={styles.textIconContainer}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            overScrollMode="never"
          >
            {projectTypes.map((item, index) => {
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
                              : COLORS.primaryTeal500,
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

        <View style={{marginTop:RFValue(32,844)}}>
          <Text
            style={{
              fontFamily: "Poppins_700Bold",
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
                                : COLORS.primaryTeal500,
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
      <TouchableWithoutFeedback onPress={handlePresentModalPress}>
        <View style={styles.filterContainer}>
          <View style={styles.iconWrapper}>
            <Image source={IMAGES.Menu} style={styles.icon} />
          </View>
        </View>
      </TouchableWithoutFeedback>
      <BottomSheetModal
        ref={bottomSheetModalRef}
        index={1}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
        enableContentPanningGesture={isScrollEnable}
      >
        <View style={styles.modalWrapper}>
          <View style={styles.modalHeader}>
            <TouchableWithoutFeedback onPress={handleDismissModalPress}>
              <Icon name="ios-close" size={24} color="#aaaaaa" />
            </TouchableWithoutFeedback>
            <Text style={styles.filtersText}>Filters</Text>
            <TouchableWithoutFeedback onPress={handleDismissModalPress}>
              <Text style={styles.saveText}>Save</Text>
            </TouchableWithoutFeedback>
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
      </BottomSheetModal>
    </View>
  );
};
const styles = StyleSheet.create({
  filterContainer: {
    backgroundColor: COLORS.monoWhite900,
    paddingHorizontal: RFValue(16, 844),
    paddingVertical: RFValue(16, 844),
    borderRadius: RFValue(12, 844),
    marginLeft: RFValue(16, 844),

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
    fontFamily: "Poppins_600SemiBold",
    fontSize: RFValue(12, 844),
    lineHeight: RFValue(24, 844),
  },
  modalWrapper: { paddingHorizontal: RFValue(24, 844) },
  modalHeader: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 8,
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
  },
});
export default ProjectFilter;
