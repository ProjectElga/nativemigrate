import React, { useState } from "react";
import { Dimensions, RefreshControl, SafeAreaView, ScrollView, View } from "react-native";
import BottomNavBar from "../../components/multicellular/general/bottomNavBar/bottomNavBar";
import Header from "../../components/multicellular/discover/header";
import styles from "./Style";
import MainCategoryBox from "../../components/multicellular/userCategory/mainCategoryBox";
import { moodboardData } from "../../config/MoodBoardConfig";
import COLORS from "../../themes/colors";
import MoodBoardCard from "../../components/multicellular/moodboard/moodboardCard";
import MoodBoardItemCard from "../../components/multicellular/moodboard/moodBoarItemCard";
import ComingSoonCard from "../../components/multicellular/general/comingSoon";
export default function Moodboard(props) {
  const [refreshing, setRefreshing] = useState(false);
  const [activeItems, setActiveItems] = useState([]);
  const [activeCategory, setActiveCategory] = useState(
    moodboardData?.tabs[0]?.name
  );

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  const onPressSave = (item) =>{
    let arr = activeItems;
    arr.push(item);
    setActiveItems([...arr])
  }
  const renderHeader = () => {
    return (
      <Header
        isDetail={true}
        pageTitle={"Moodboard"}
        onPressBack={() => {
          props.navigation.goBack(null);
        }}
      />
    );
  };
  const handleSetCategory = async (item) => {
    // props.resetRecordOffset();
    // setActiveSubCategoryId(item.id);
    // const userId = await AsyncStorage.getItem(STORAGE_KEY.USER_ID);
    // const tokenDetail = await AsyncStorage.getItem(STORAGE_KEY.ACCESS_TOKEN);
    setActiveCategory(item.name);
    // callApiToGetUserFromSubCategory(userId, tokenDetail, item.id, 0, 10);
  };
  const renderTabs = () => {
    const { tabs = [] } = moodboardData;
    return (
      <View>
        {tabs && tabs.length > 0 && (
          <ScrollView
            horizontal={true}
            overScrollMode={"never"}
            showsHorizontalScrollIndicator={false}
          >
            {tabs.map((item, index) => {
              return (
                <MainCategoryBox
                  bgColor={COLORS.monoWhite900}
                  text={item.name}
                  onPress={() => {
                    handleSetCategory(item);
                  }}
                  isActive={activeCategory === item.name}
                  key={index}
                />
              );
            })}
          </ScrollView>
        )}
      </View>
    );
  };
  const renderCardLayout = () => {
    return (
      <ScrollView
        contentContainerStyle={styles.scrollViewCardLayout}
        showsVerticalScrollIndicator={false}
      >
        <MoodBoardCard />
        <ComingSoonCard
            image="https://images.unsplash.com/photo-1543362906-acfc16c67564?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=465&q=80"
            title="Moodboards"
            line1="Build your Moodboard for your next Project"
            line2="Store & Collect Links, Media files on Cloud"
            line3="Share & Collaborate with Other creators"
          />
      </ScrollView>
    );
  };
  const renderItemCardLayout = () => {
    const width = Dimensions.get("window").width / 2 - 25;
    return (
      <ScrollView
        contentContainerStyle={styles.scrollViewCardLayout}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.itemCardContainer}>
          <View style={styles.mr_5}>
            {moodboardData?.moodBoardCardItems
              ?.filter((_, i) => i % 2 === 0)
              .map((item, index) => (
                <View style={styles.itemCard} key={index}>
                  <MoodBoardItemCard
                    image={item}
                    text={`Thumbnail Ideas #${index + 1}`}
                    width={width}
                    onPressSave={()=>onPressSave(item)}
                    isSaved={activeItems.includes(item)}
                    aspectratio={
                      moodboardData?.aspectRatios[index % 6]?.aspectratio
                    }
                  />
                </View>
              ))}
          </View>
          <View style={styles.ml_5}>
            {moodboardData?.moodBoardCardItems
              ?.filter((_, i) => i % 2 !== 0)
              .map((item, index) => (
                <View style={styles.itemCard} key={index}>
                  <MoodBoardItemCard
                    image={item}
                    text={`Thumbnail Ideas #${index + 1}`}
                    width={width}
                    onPressSave={()=>onPressSave(item)}
                    isSaved={activeItems.includes(item)}
                    aspectratio={
                      moodboardData?.aspectRatios[
                        (moodboardData?.moodBoardCardItems?.length -
                          (index + 1)) %
                          6
                      ]?.aspectratio
                    }
                  />
                </View>
              ))}
          </View>
        </View>
      </ScrollView>
    );
  };
  const renderMainLayout = () => {
    return (
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {renderTabs()}
        {activeCategory !== "All Items"
          ? renderCardLayout()
          : renderItemCardLayout()}
      </ScrollView>
    );
  };
  return (
    <SafeAreaView>
      <View style={styles.wrapper}>
        {renderHeader()}
        {renderMainLayout()}
      </View>
      <BottomNavBar activeTab="Explore" />
    </SafeAreaView>
  );
}
