import React, { Component } from "react";
import { connect } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { View, ScrollView, Text, TouchableWithoutFeedback } from "react-native";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import NothingHere from "../../../components/multicellular/general/nothingHere/nothingHere";

import Header from "../../../components/multicellular/discover/header";
import profile from "../../../assets/jsons/profile/profiledetails";
import FolioCard from "../../../components/multicellular/profile/folioCard/folioCard";
import ProjectCard from "../../../components/multicellular/profile/projectCard/projectCard";
import folios from "../../../assets/jsons/profile/folio";
import STORAGE_KEY from "../../../constants/StorageKeys";
import BottomNavBar from "../../../components/multicellular/general/bottomNavBar/bottomNavBar";
import UserCard from "../../../components/multicellular/general/userCard";
import styles from "./Style";
import IMAGES from "../../../themes/Images";
import { RFValue } from "react-native-responsive-fontsize";
import COLORS from "../../../themes/colors";
import SearchBarWithFilter from "../../../components/multicellular/general/searchBar";
import { savedTypes } from "../../../reducers/saved/saved";
import { OpportunityForYou } from "../../../assets/jsons/profile/opportunityList";
import { makePostApiCall } from "../../../api";
import URLS from "../../../constants/Urls";
import ComingSoonCard from "../../../components/multicellular/general/comingSoon";
import { circleTypes } from "../../../reducers/projects/circle";
import * as Analytics from "expo-firebase-analytics";

class Saved extends Component {
  constructor() {
    super();
    this.state = {
      categories: ["Profiles","Folios"],
      activeTab: "Profiles",
      show: false,
      // addtoCircleClick: false,
      // activeId: ""
    };
  }
  componentDidMount = async () => {
    const userId = await AsyncStorage.getItem(STORAGE_KEY.USER_ID);
    const tokenDetail = await AsyncStorage.getItem(STORAGE_KEY.ACCESS_TOKEN);
    this.props.callSavedApi(userId, tokenDetail, "USER", "", false);
  };
  async callApiForProject(tab) {
    const userId = await AsyncStorage.getItem(STORAGE_KEY.USER_ID);
    const tokenDetail = await AsyncStorage.getItem(STORAGE_KEY.ACCESS_TOKEN);
    if (tab === "Profiles") {
      this.props.callSavedApi(userId, tokenDetail, "USER");
    }
    // if (tab === "Opportunities") {
    //   this.props.callSavedApi(userId, tokenDetail, "OPPORTUNITY");
    // }
    // if (tab === "Folios") {
    //   this.props.callSavedApi(userId, tokenDetail, "FOLIO");
    // }
  }
  handleFilter = async (event) => {
    this.setState({ searchText: event });
    const { activeTab } = this.state;
    const userId = await AsyncStorage.getItem(STORAGE_KEY.USER_ID);
    const tokenDetail = await AsyncStorage.getItem(STORAGE_KEY.ACCESS_TOKEN);
    if (event?.length > 0) {
      if (activeTab === "Profiles") {
        this.props.callSavedApi(userId, tokenDetail, "USER", event, true);
      }
      // if (activeTab === "Opportunities") {
      //   this.props.callSavedApi(userId, tokenDetail, "OPPORTUNITY", event, true);
      // }
      // if (activeTab === "Folios") {
      //   this.props.callSavedApi(userId, tokenDetail, "FOLIO", event, true);
      // }
    } else {
      if (activeTab === "Profiles") {
        this.props.callSavedApi(userId, tokenDetail, "USER");
      }
      // if (activeTab === "Opportunities") {
      //   this.props.callSavedApi(userId, tokenDetail, "OPPORTUNITY");
      // }
      // if (activeTab === "Folios") {
      //   this.props.callSavedApi(userId, tokenDetail, "FOLIO");
      // }
    }
  };
  changeTab = async (value) => {
    const {
      profile: { profileData = {} },
    } = this.props;
    this.setState({ activeTab: value });
    const userId = await AsyncStorage.getItem(STORAGE_KEY.USER_ID);
    const tokenDetail = await AsyncStorage.getItem(STORAGE_KEY.ACCESS_TOKEN);
    Analytics.logEvent("screen_view", {
      firebase_screen: value,
      userId: profileData?.id,
      displayName: profileData?.displayName,
      isCreator: profileData?.isCreator,
    });
    if (this.state.searchText?.length > 0) {
      if (value === "Profiles") {
        this.props.callSavedApi(
          userId,
          tokenDetail,
          "USER",
          this.state.searchText,
          true
        );
      }
      // if (value === "Opportunities") {
      //   this.props.callSavedApi(userId, tokenDetail, "OPPORTUNITY", this.state.searchText, true);
      // }
      // if (value === "Folios") {
      //   this.props.callSavedApi(userId, tokenDetail, "FOLIO", this.state.searchText, true);
      // }
    } else {
      if (value === "Profiles") {
        this.props.callSavedApi(userId, tokenDetail, "USER");
      }
      // if (value === "Opportunities") {
      //   this.props.callSavedApi(userId, tokenDetail, "OPPORTUNITY");
      // }
      // if (value === "Folios") {
      //   this.props.callSavedApi(userId, tokenDetail, "FOLIO");
      // }
    }
  };
  searchSavedItem = async () => {
    const { activeTab } = this.state;
    const userId = await AsyncStorage.getItem(STORAGE_KEY.USER_ID);
    const tokenDetail = await AsyncStorage.getItem(STORAGE_KEY.ACCESS_TOKEN);
    if (activeTab === "Profiles") {
      this.props.callSavedApi(
        userId,
        tokenDetail,
        "USER",
        this.state.searchText,
        true
      );
    }
    if (activeTab === "Opportunities") {
      this.props.callSavedApi(
        userId,
        tokenDetail,
        "OPPORTUNITY",
        this.state.searchText,
        true
      );
    }
    if (activeTab === "Folios") {
      this.props.callSavedApi(
        userId,
        tokenDetail,
        "FOLIO",
        this.state.searchText,
        true
      );
    }
  };
  renderInput = () => {
    return (
      <SearchBarWithFilter
        enableInput={true}
        onChangeText={this.handleFilter}
        returnKeyType="search"
        onSubmitEditing={this.searchSavedItem}
      />
    );
  };
  handleIsSavedClicked = async (item) => {
    const { savedArray = [] } = this.props.saved;

    let array = savedArray;
    const userId = await AsyncStorage.getItem(STORAGE_KEY.USER_ID);
    const tokenDetail = await AsyncStorage.getItem(STORAGE_KEY.ACCESS_TOKEN);
    const saveEntity = "USER";
    let params = {
      id: userId,
      entityId: item.id,
      saveEntity: saveEntity,
    };
    let response = await makePostApiCall(
      URLS.API_SAVE_ENTITY(item.id),
      {},
      tokenDetail,
      params
    );
    if (typeof response.status !== "undefined" && response.status) {
      if (array.some((data) => data.id === item.id)) {
        // let index = array.indexOf(item);
        let index = array
          .map(function (e) {
            return e.id;
          })
          .indexOf(item?.id);
        array.splice(index, 1);
        this.props.setSavedArray([...array]);
      } else {
        array.push(item);
        this.props.setSavedArray([...array]);
      }
    } else {
      alert("error>>" + JSON.stringify(response.message));
    }
  };

  checkIsSaved = (item) => {
    const { savedArray = [] } = this.props.saved;
    return savedArray.some((data) => data.id === item.id);
  };
  // handleOnPressMessage = (id) => {
  //   const { projectsData = [], } = this.props.projects;

  //   projectsData?.projectList &&
  //     projectsData?.projectList.length > 0 &&
  //     projectsData?.projectList?.map((value, index) => {
  //       if (value.type == "CIRCLE" && value.participants[0].id == id) {
  //         this.props.navigation.navigate("Chat", {
  //           ChatRoomData: value,
  //         });
  //       }
  //     });
  // };
  // handleCircleRequest = async (receiverUserId) => {
  //   console.log("working", receiverUserId);
  //   const userId = await AsyncStorage.getItem(STORAGE_KEY.USER_ID);
  //   const tokenDetail = await AsyncStorage.getItem(STORAGE_KEY.ACCESS_TOKEN);
  //   const requestParam = {
  //     senderUserId: userId,
  //     receiverUserId: receiverUserId,
  //   };
  //   this.props.sendCircleRequest(requestParam, tokenDetail);
  //   this.setState({
  //     addtoCircleClick: true,
  //     activeId: receiverUserId
  //   })
  // };
  renderCategoryTab = () => {
    return (
      <View style={styles.categoryTab}>
        {this.state.categories.map((value, index) => {
          return (
            <TouchableWithoutFeedback
              onPress={() => {
                this.changeTab(value);
              }}
            >
              <View
                key={index}
                style={[
                  styles.categorybutton,
                  {
                    shadowOpacity: this.state.activeTab == value ? 0.1 : 0,
                    backgroundColor:
                      this.state.activeTab == value
                        ? COLORS.monoBlack900
                        : COLORS.monoWhite900,
                  },
                ]}
              >
                <Text
                  style={[
                    styles.categoryText,
                    {
                      color:
                        this.state.activeTab == value
                          ? COLORS.monoWhite900
                          : COLORS.monoBlack500,
                    },
                  ]}
                >
                  {value}
                </Text>
              </View>
            </TouchableWithoutFeedback>
          );
        })}
      </View>
    );
  };
  renderProfiles = () => {
    const { savedData: { data = [] } = {} } = this.props.saved;
    const { addtoCircleClick, activeId } = this.state;
    return (
      <ScrollView
        overScrollMode="never"
        showsVerticalScrollIndicator={false}
        style={styles.userCardView}
      >
        {data && data?.length > 0 ? (
          <View>
            {data.map((item, index) => {
                    console.log("data",this.state.searchText,data)
              return (
                <UserCard
                  isAdmin={!item?.isCreator}
                  dontShowBrand={!item?.isCreator}
                  // onCirclePress={
                  //   item?.circleStatus === "ACCEPTED"
                  //     ? () => this.handleOnPressMessage(item.id)
                  //     : (addtoCircleClick && activeId === item.id)
                  //       ? null
                  //       : typeof item?.circleStatus === "undefined"
                  //         ? () => this.handleCircleRequest(item.id)
                  //         : item?.circleStatus === "PENDING"
                  //           ? () => {
                  //             this.props.navigation.navigate("Projects", {
                  //               activeTab: 3,
                  //               activeSection: "Pending",
                  //             });
                  //           }
                  //           : null
                  // }
                  // buttonColor={typeof item?.circleStatus !== "undefined"}
                  // circletext={
                  //   (addtoCircleClick && activeId === item.id) ? "Request Sent" :
                  //     typeof item?.circleStatus === "undefined"
                  //       ? "Add to Circle"
                  //       : item?.circleStatus === "ACCEPTED"
                  //         ? "Message"
                  //         : item?.circleStatus === "SENT"
                  //           ? "Request Sent"
                  //           : "Pending"
                  // }
                  // collab={true}
                  hideActionBtn={true}
                  userData={item}
                  key={index}
                  isSavedPage
                  isSaved={this.checkIsSaved(item)}
                  onPressSaved={() => this.handleIsSavedClicked(item)}
                  onPress={() => {
                    this.props.navigation.navigate(
                      !item?.isCreator ? "BrandProfile" : "CreatorProfile",
                      {
                        selfView: false,
                        userId: item.id,
                      }
                    );
                  }}
                />
              );
            })}
          </View>
        ) : (
          <NothingHere
            text="lonely! Save profiles from discover 😊"
            image={IMAGES.airport}
          />
        )}
      </ScrollView>
    );
  };
  renderOpportunities = () => {
    return (
      // <ScrollView
      //   overScrollMode="never"
      //   showsVerticalScrollIndicator={false}
      //   style={styles.userCardView}
      // >
      //   <View
      //     style={{
      //       paddingBottom: RFValue(16, 844),
      //       marginTop: RFValue(-16, 844),
      //     }}
      //   >
      //     {OpportunityForYou.map((value, index) => {
      //       return (
      //         <View style={{ width: "100%" }}>
      //           <ProjectCard
      //             isSaved={true}
      //             // title={value.title}
      //             imagePic={value.profileImage}
      //             key={index}
      //             width="100%"
      //             thumbnail={value.thumbnail}
      //             title={value.title}
      //             date={value.date}
      //             category1={value.category1}
      //             category2={value.category2}
      //             onPress={() => {
      //               this.props.navigation.navigate("OpportunityDetail", {
      //                 data: value,
      //                 thumbnail: value.thumbnail,
      //                 // profile: profile,
      //               });
      //             }}
      //           />
      //         </View>
      //       );
      //     })}
      //   </View>
      // </ScrollView>
      <ComingSoonCard
        image="https:images.unsplash.com/photo-1517816428104-797678c7cf0c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
        title="Links"
        line1="Save it for later"
        line2="Give your best shot"
      />
    );
  };
  renderFolio = () => {
    return (
      // <ScrollView
      //   overScrollMode="never"
      //   showsVerticalScrollIndicator={false}
      //   style={styles.userCardView}
      // >
      //   <View style={styles.folioWrapper}>
      //     {folios.map((value, index) => {
      //       return (
      //         <FolioCard
      //           key={index}
      //           thumbnail={value.thumbnail}
      //           isSaved
      //           title={value.title}
      //           date={value.date}
      //           onPress={() => {
      //             this.props.navigation.navigate("FolioDetail", {
      //               data: value,
      //               profile: profile,
      //             });
      //           }}
      //         />
      //       );
      //     })}
      //   </View>
      // </ScrollView>
      <ComingSoonCard
        image="https://images.unsplash.com/photo-1562448079-b5631888445f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=435&q=80"
        title="Save for Folio"
        line1="Collect folios you appriciate"
        line2="Get inspired & Inspire"
      />
    );
  };
  render() {
    const {
      saved: { isS, savedData = {} },
    } = this.props;
    console.log(savedData);
    return (
      <View>
        <BottomSheetModalProvider>
          <View style={styles.wrapper}>
            <Header />
            {this.renderInput()}
            {this.renderCategoryTab()}
            {this.state.activeTab == "Profiles"
              ? this.renderProfiles()
              : this.state.activeTab == "Folios"
              ? this.renderFolio()
              : this.renderOpportunities()}
          </View>

          <BottomNavBar activeTab="Saved" />
        </BottomSheetModalProvider>
      </View>
    );
  }
}
const mapStateToProps = (state) => {
  const { saved ,profile} = state;
  return { saved,profile };
};

const mapDispatchToProps = (dispatch) => {
  return {
    callSavedApi: (userId, tokenDetail, saveEntity, key, isSearch) => {
      dispatch({
        type: savedTypes.SAVED_DATA,
        userId,
        tokenDetail,
        saveEntity,
        key,
        isSearch,
      });
    },
    setSavedArray: (savedData) => {
      dispatch({ type: savedTypes.SET_USER_SAVED_REDUCER, savedData });
    },
    sendCircleRequest: (requestParam, tokenDetail) => {
      dispatch({
        type: circleTypes.SEND_CIRCLE_REQ,
        requestParam,
        tokenDetail,
      });
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Saved);
