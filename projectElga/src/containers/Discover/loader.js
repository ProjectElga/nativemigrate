import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import React, { Component, useState } from "react";
import { Text, View } from "react-native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { RFValue } from "react-native-responsive-fontsize";
import Filter from "../../components/multicellular/discover/discoverFilter";
import Header from "../../components/multicellular/discover/header";
import BottomNavBar from "../../components/multicellular/general/bottomNavBar/bottomNavBar";
import SearchBarWithFilter from "../../components/multicellular/general/searchBar";
import Skeleton from "../../components/multicellular/general/skeleton/skeleton";
import shadow from "../../constants/shadow";
import COLORS from "../../themes/colors";
import styles from "./Styles";
const DiscoverLoader = () => {
  const [activeLink, setActiveLink] = useState("NearMe");
  const [showDetail, setShowDetail] = useState(false);
  const [showDetailTitle, setShowDetailTitle] = useState("");
  const _renderInput = () => {
    return (
      <SearchBarWithFilter
        onPress={() => {
          props.navigation.navigate("Search");
        }}
        filter={() => {
          return <Filter />;
        }}
      />
    );
  };

  const _renderCategories = () => {
    return (
      <View style={styles.skeletonCategoriesWrapper}>
        <View style={styles.skeletonCategoryCard}>
          <Skeleton styles={styles.sCategoryStick} />
        </View>
        <View style={styles.skeletonCategoryCard}>
          <Skeleton styles={styles.sCategoryStick} />
        </View>
        <View style={styles.skeletonCategoryCard}>
          <Skeleton styles={styles.sCategoryStick} />
        </View>
      </View>
    );
  };
  const _renderToggle = () => {
    return (
      <View style={styles.toggleSwitchView}>
        <TouchableWithoutFeedback
          onPress={() => {
            setActiveLink("Trending");
          }}
        >
          <View style={styles.flexBoxCenter}>
            {activeLink === "Trending" && (
              <View style={styles.toggleSwitchActiveIcon}></View>
            )}
            <Text
              style={
                activeLink === "Trending"
                  ? styles.toggleSwitchActive
                  : styles.toggleSwitch
              }
            >
              Trending
            </Text>
          </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback
          onPress={() => {
            setActiveLink("NearMe");
          }}
        >
          <View style={styles.flexBoxCenter}>
            <Text
              style={
                activeLink === "NearMe"
                  ? styles.toggleSwitchActive
                  : styles.toggleSwitch
              }
            >
              Near Me
            </Text>
            {activeLink === "NearMe" && (
              <View style={styles.toggleSwitchActiveIcon}></View>
            )}
          </View>
        </TouchableWithoutFeedback>
      </View>
    );
  };

  return (
    <BottomSheetModalProvider>
      <View style={styles.wrapper}>
        <View style={{ paddingHorizontal: RFValue(16, 844) }}>
          <Header
            isDetail={showDetail}
            pageTitle={showDetailTitle}
            onPressBack={() => {
              setShowDetail(false);
            }}
            
          />
        </View>
        {_renderCategories()}
        <View style={styles.bodyWrapper}>
          {_renderToggle()}
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

            <View style={[shadow, styles.skeletonUserCard]}>
              <Skeleton styles={styles.sCardProfile} />
              <View style={styles.sCardBlock}>
                <Skeleton styles={[styles.sCardStick, { width: "80%" }]} />
                <Skeleton styles={[styles.sCardStick, { width: "50%" }]} />
              </View>
            </View>
          </View>
        </View>
      </View>
      <BottomNavBar activeTab="Network" />
    </BottomSheetModalProvider>
  );
};

export default DiscoverLoader;
