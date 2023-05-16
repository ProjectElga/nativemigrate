import React, { useState, useCallback, useMemo, useRef } from "react";
import { connect, useSelector } from "react-redux";
import {
  View,
  ScrollView,
  TextInput,
  Text,
  Image,
  Dimensions,
} from "react-native";
import BottomNavBar from "../../components/multicellular/general/bottomNavBar/bottomNavBar";
import folios from "../../assets/jsons/profile/folio";
import {
  BottomSheetModal,
  BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";
import categoryList from "../../assets/jsons/discover/opportunitiesCategory.json";
import userList from "../../assets/jsons/discover/profiles.json";
import styles from "./Styles";
import Header from "../../components/multicellular/discover/header";
import CategoryCard from "../../components/multicellular/discover/categoryCard";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/Ionicons";
import UserCard from "../../components/multicellular/general/userCard";
import Detail from "./Detail";
import { RFValue } from "react-native-responsive-fontsize";
import SearchBarWithFilter from "../../components/multicellular/general/searchBar";
import Filter from "../../components/multicellular/discover/discoverFilter";
import ProjectCard from "../../components/multicellular/profile/projectCard/projectCard";
import OppFilter from "../../components/multicellular/opportunity/profileCard/oppFilter";
import {
  OpportunityByCreator,
  OpportunityForYou,
} from "../../assets/jsons/profile/opportunityList";
import OppLoader from "./mainPageLoader";
import ComingSoonCard from "../../components/multicellular/general/comingSoon";
import * as Analytics from "expo-firebase-analytics";

import IMAGES from "../../themes/Images";
const width = Dimensions.get("window").width - RFValue(48, 844);
const Opportunity = (props) => {
  const [activeLink, setActiveLink] = useState("NearMe");
  const [showDetail, setShowDetail] = useState(false);
  const [showDetailTitle, setShowDetailTitle] = useState("");
  const [categoryData, setCategoryData] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const profile = useSelector((state) => state.profile)
  const {profileData}=profile

  // variables


  // callbacks

  const handleClickOnCategory = (item, title) => {
    setShowDetail(true);
    setCategoryData(item.subCategories);
    setShowDetailTitle(title);
    setIsAdmin(item.isAdmin);
  };
  const _renderInput = () => {
    return (
      <SearchBarWithFilter
        onPress={() => {
          Analytics.logEvent(`Discover_SearchBar`, {
            contentType: "search",
            userId: profileData?.id,
            displayName: profileData?.displayName,
            isCreator: profileData?.isCreator,
          });
          props.navigation.navigate("Search");
        }}
        filter={() => {
          return <OppFilter />;
        }}
      />
    );
  };

  const _renderOpportunities = (sectionTitle, array) => {
    return (
      <View style={styles.opportunityView}>
        <View style={styles.bodyWrapper}>
          <View style={styles.flexBoxSpaceBetween}>
            <Text style={styles.sectionsubTitle}>{sectionTitle}</Text>
          </View>
        </View>
        <View style={{ marginHorizontal: RFValue(16, 844) }}>
          <ComingSoonCard
            image="https:images.unsplash.com/photo-1517816428104-797678c7cf0c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
            title="Opportunities"
            line1="Find relevant opportunities & Projects"
            line2="Connect directly with stakeholders"
          />
        </View>
        {/* <ScrollView
          horizontal={false}
          overScrollMode={"never"}
          style={styles.horizontalScrollView}
          showsHorizontalScrollIndicator={false}
        >
          <View style={{ alignItems: "center" }}>
            {array.map((value, index) => {
              return (
                <View
                  style={{ paddingHorizontal: RFValue(16, 844), width: "100%" }}
                >
                  <ProjectCard
                 // title={value.title}
                    imagePic={value.profileImage}
                    key={index}
                    width="100%"
                    thumbnail={value.thumbnail}
                    title={value.title}
                    date={value.date}
                    category1={value.category1}
                    category2={value.category2}
                    onPress={() => {
                      props.navigation.navigate("OpportunityDetail", {
                        data: value,
                        thumbnail:value.thumbnail
                        // profile: profile,
                      });
                    }}
                  />
                </View>
              );
            })}
          </View>
        </ScrollView> */}
      </View>
    );
  };

  const _renderDetailInfo = () => {
    return (
      <View>
        <ScrollView
          horizontal={true}
          overScrollMode={"never"}
          style={[
            styles.horizontalScrollView,
            { paddingLeft: RFValue(16, 844), marginTop: 8 },
          ]}
          showsHorizontalScrollIndicator={false}
        >
          {categoryList.map((item, index) => {
            return (
              <View
                style={{
                  marginRight: index === categoryList.length - 1 ? 16 : 0,
                }}
              >
                <CategoryCard
                  key={index.toString()}
                  image={item.imageLink}
                  text={item.mainCategory}
                />
              </View>
            );
          })}
        </ScrollView>
        <View>
          {_renderOpportunities("Explore Opportunities", OpportunityForYou)}
        </View>
      </View>
    );
  };
  const loading = false;
  return (
    <View>
      {loading ? (
        <OppLoader />
      ) : (
        <View>

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
              <ScrollView
                showsVerticalScrollIndicator={false}
                overScrollMode="never"
                style={{ marginTop: RFValue(16, 844) }}
              >
                {showDetail ? (
                  <Detail categoryData={categoryData} isAdmin={isAdmin} />
                ) : (
                  _renderDetailInfo()
                )}
              </ScrollView>
            </View>

            <BottomNavBar activeTab="Opportunities" />
 
        </View>
      )}
    </View>
  );
};

export default Opportunity
