import React, { Component } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import STORAGE_KEY from "../../constants/StorageKeys";
import ProfileHeader from "../../components/multicellular/profile/header/header";
import SVGS from "../../constants/SvgUri";
import SvgUri from "expo-svg-uri";
import UserCard from "../../components/multicellular/general/userCard";
import { ScrollView } from "react-native-gesture-handler";
import IMAGES from "../../themes/Images";
import { getUserDiscoverTypes } from "../../reducers/discover/getUser";
import styles from "./Style";
import SearchBarWithFilter from "../../components/multicellular/general/searchBar";
// import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { userSearchTypes } from "../../reducers/search/userSearch";
import { connect } from "react-redux";
import NothingHere from "../../components/multicellular/general/nothingHere/nothingHere";
import { withNavigation } from "react-navigation";
import { popularGenreTypes } from "../../reducers/search/popularGenre";
import COLORS from "../../themes/colors";
import { RFValue } from "react-native-responsive-fontsize";
import Filter from "../../components/multicellular/discover/discoverFilter";
class SearchDetail extends Component {
  constructor() {
    super();
    this.state = {
      activeTab: 0,
      tabActive: false,
      eventQuery: "",
      categories: [
        { title: "Profile", value: 0 },
        { title: "Tag", value: 1 },
        { title: "Category", value: 2 },
      ],
    };
  }
  async componentDidMount() {
    const { route } = this.props;
    const { eventQuery, searchType, tabActive } = route.params;
    this.setState({ tabActive: tabActive, eventQuery: eventQuery })
    const userId = await AsyncStorage.getItem(STORAGE_KEY.USER_ID);
    const tokenDetail = await AsyncStorage.getItem(STORAGE_KEY.ACCESS_TOKEN);
    const event = eventQuery;
    // const searchType = this.props.navigation.getParam("searchType");
    this.props.callSearchProfileApi(userId, tokenDetail, event, searchType);
  }
  handleChangeToggle(value) {
    this.setState({
      activeTab: value.value,
    });
    this.callApiSearch(value.value);
  }
  async callApiSearch(tab) {
    const { route } = this.props;
    const { eventQuery } = route.params;
    const userId = await AsyncStorage.getItem(STORAGE_KEY.USER_ID);
    const tokenDetail = await AsyncStorage.getItem(STORAGE_KEY.ACCESS_TOKEN);
    const searchText = eventQuery;
    if (tab === 0) {
      this.props.callSearchProfileApi(
        userId,
        tokenDetail,
        searchText,
        "profile"
      );
    }
    if (tab === 1) {
      this.props.callSearchProfileApi(
        userId,
        tokenDetail,
        searchText,
        "generalTag"
      );
    }
    if (tab === 2) {
      this.props.callSearchProfileApi(
        userId,
        tokenDetail,
        searchText,
        "generalCategory"
      );
    }
  }
  renderCategoryTab = () => {
    return (
      <View style={[styles.categoryTab, { marginBottom: RFValue(8, 844) }]}>
        {this.state.categories.map((value, index) => {
          return (
            <TouchableWithoutFeedback
              onPress={() => this.handleChangeToggle(value)}
            >
              <View
                key={index}
                // style={[
                //   styles.categorybutton,
                //   {
                //     shadowOpacity:
                //       this.state.activeTab == value.value ? 0.1 : 0,
                //     backgroundColor:
                //       this.state.activeTab == value.value
                //         ? COLORS.primaryTeal500
                //         : COLORS.monoGhost500,
                //     flexDirection: "row",
                //     alignItems: "center",
                //     justifyContent: "center",
                //   },
                // ]}
                style={[
                  styles.projectTypeCard,
                  {
                    backgroundColor:
                      this.state.activeTab == value.value
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
                        this.state.activeTab == value.value
                          ? COLORS.monoWhite900
                          : COLORS.monoBlack700,
                    },
                  ]}
                >
                  {value.title}
                </Text>
              </View>
            </TouchableWithoutFeedback>
          );
        })}
      </View>
    );
  };
  _renderResult = () => {
    const { userSearchData = [], loading, error } = this.props.userSearch;
    return userSearchData && userSearchData?.length > 0 ? (
      userSearchData.map((item, index) => {
        return (
          <UserCard
            onPress={() => {
              this.props.navigation.navigate(
                !item?.isCreator ? "BrandProfile" : "CreatorProfile",
                {
                  selfView: false,
                  userId: item.id,
                }
              );
            }}
            hideActionBtn={true}
            border={true}
            isAdmin={!item?.isCreator}
            userData={item}
          />
        );
      })
    ) : (
      <View>
        <NothingHere text="No user Found!" image={IMAGES.NoPending} />
      </View>
    );
  };
  renderMainLayout = () => {
    const { eventQuery, tabActive } = this.state;
    return (
      <>
        <ProfileHeader
          icon="search"
          text={`#${eventQuery}`}
          showSearchIcon={true}
          onBackPress={() => {
            this.props.navigation.goBack(null);
          }}
          rightComponent={() => {
            return (
              <TouchableOpacity
                onPress={() => {
                  this.props.navigation.goBack(null);
                }}
              >
                <SvgUri width={20} height={20} svgXmlData={SVGS.GREYCLOSE} />
              </TouchableOpacity>
            );
          }}
        />
        <View>
          <SearchBarWithFilter
            onPress={() => {
              this.props.navigation.navigate("Search");
            }}
            bgColor={COLORS.monoGhost500}

          // filter={() => {
          //     return (
          //       <Filter
          //         onPress={async () => {
          //           props.navigation.navigate("FilterPage");

          //         }}
          //         bgColor={COLORS.monoGhost500}
          //       />
          //     );
          //   }}
          />
        </View>
        {tabActive &&
          this.renderCategoryTab()}
        <ScrollView
          showsVerticalScrollIndicator={false}
          overScrollMode="always"
          style={{ marginTop: RFValue(12, 844) }}
        >
          {this._renderResult()}
        </ScrollView>
      </>
    )
  }
  render() {

    return (
      <View style={styles.wrapper}>
        {this.renderMainLayout()}
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  const { userSearch, getUser, popularGenre } = state;
  return { userSearch, getUser, popularGenre };
};

const mapDispatchToProps = (dispatch) => {
  return {
    callSearchProfileApi: (userId, tokenDetail, name, query) => {
      dispatch({
        type: userSearchTypes.SEARCH_USER_PROFILE,
        userId,
        tokenDetail,
        name,
        query,
      });
    },
    callpopularUserApi: (userId, tokenDetail) => {
      dispatch({
        type: getUserDiscoverTypes.GET_TRENDING_USER_DISCOVERY,
        userId,
        tokenDetail,
      });
      dispatch({
        type: popularGenreTypes.GET_POPULAR_GENRE,
        userId,
        tokenDetail,
      });
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(SearchDetail);
