import React, { useEffect, useState } from "react";
import {
  Dimensions,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  View,
  TouchableOpacity,
  Text,
} from "react-native";
import BottomNavBar from "../../components/multicellular/general/bottomNavBar/MoodboardBottomNavbar";
import ComingSoonCard from "../../components/multicellular/general/comingSoon";
import Header from "./chatComponent/Header";
import styles from "./MoodBoardStyle";
import Styles from "./Styles";

import MainCategoryBox from "../../components/multicellular/userCategory/mainCategoryBox";
import { moodboardData } from "../../config/MoodBoardConfig";
import COLORS from "../../themes/colors";
import MoodBoardCard from "../../components/multicellular/moodboard/moodboardCard";
import MoodBoardItemCard from "../../components/multicellular/moodboard/moodBoarItemCard";
import { useNavigation } from "@react-navigation/native";
import { RFValue } from "react-native-responsive-fontsize";
export default function ChatMoodboard(props) {
  const [refreshing, setRefreshing] = useState(false);
  const [memberName, setMemberName] = useState([]);
  const [images, setImages] = useState([]);
  const [activeCategory, setActiveCategory] = useState(
    moodboardData?.tabs[0]?.name
  );
  // route information
  const navigation = useNavigation();
  const { route } = props;
  const { ChatRoomData } = route.params;
  function onSwipeLeft() {
    navigation.goBack();
  }
  //useEffect
  useEffect(() => {
    var names = [];
    names.push(ChatRoomData?.loggedUser?.displayName);
    ChatRoomData?.participants?.map((value, index) => {
      return names.push(value?.displayName);
    });
    setMemberName([...names]);
    
    var images = [];
    ChatRoomData?.participants?.map((value, index) => {
      images.push(value?.profileImageUrl);
    });
    ChatRoomData?.type == "CIRCLE"
      ? null
      : images.push(ChatRoomData?.loggedUser?.profileImageUrl);
    setImages(images);
  }, []);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);
  const renderHeader = () => {
    return (
      <Header
        projectName={
          ChatRoomData.type == "CIRCLE"
            ? ChatRoomData?.participants[0]?.displayName
            : ChatRoomData?.name
        }
        images={images}
        onPress={() => {
          ChatRoomData?.type == "CIRCLE"
            ? navigation.navigate("CircleInfo", {
                contact: ChatRoomData?.participants,
              })
            : navigation.navigate("ProjectInfo", {
                data: ChatRoomData,
                images: images,
              });
        }}
        onBackClick={() => {
          navigation.goBack();
        }}
        onMenuClick={() => null}
        subText={"1 Boards"}
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
                  bgColor={COLORS.monoGhost500}
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
        <MoodBoardCard isShowBorder />
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
        style={styles.innerWrapper}
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
        <View
          style={[Styles.chatToggleWrapper, { marginBottom: RFValue(8, 844) }]}
        >
          <TouchableOpacity style={Styles.chatToggle} onPress={onSwipeLeft}>
            <View>
              <Text style={Styles.chatToggleText}>Message</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={[Styles.chatToggle, Styles.chatActiveToggle]}
          >
            <View>
              <Text
                style={[Styles.chatToggleText, Styles.chatActiveToggleText]}
              >
                Moodboard
              </Text>
            </View>
          </TouchableOpacity>
        </View>
        {renderMainLayout()}
      </View>
      <BottomNavBar activeTab="Explore" />
    </SafeAreaView>
  );
}
