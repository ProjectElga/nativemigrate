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
const OppLoader = () => {
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
  const _renderProjectCard = () => {
    return (
      <View style={styles.sProjectCardWrapper}>
        <Skeleton styles={styles.skeletonImage} />
        <View style={styles.sCardBottomView}>
          <Skeleton styles={[styles.sCardStick, { width: "50%" }]} />

          <Skeleton
            styles={[
              styles.sCardStick,
              { width: "30%", marginTop: RFValue(16, 844) },
            ]}
          />
        </View>
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
          {_renderInput()}
        </View>
        {_renderCategories()}
        <View style={{ paddingHorizontal: RFValue(16, 844) }}>
          {_renderProjectCard()}
          {_renderProjectCard()}
        </View>
      </View>
      <BottomNavBar activeTab="Opportunities" />
    </BottomSheetModalProvider>
  );
};

export default OppLoader;
