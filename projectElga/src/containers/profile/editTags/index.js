import SvgUri from "expo-svg-uri";
import React, { Component } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from "react-native";
import { Icon } from "react-native-elements";
import { RFValue } from "react-native-responsive-fontsize";
import { withNavigation } from "react-navigation";
import { connect } from "react-redux";
import Header from "../../../components/multicellular/discover/header";
import SearchBarWithFilter from "../../../components/multicellular/general/searchBar";
import SVGS from "../../../constants/SvgUri";
import { genreSearchTypes } from "../../../reducers/genres/genreSearch";
import COLORS from "../../../themes/colors";
import AsyncStorage from "@react-native-async-storage/async-storage";
import STORAGE_KEY from "../../../constants/StorageKeys";
import FormData from "form-data";
import {
  genreAddTypes,
  genreAssignTypes,
} from "../../../reducers/genres/assignGenre";
import ProfileHeader from "../../../components/multicellular/profile/header/header";
import { popularGenreTypes } from "../../../reducers/search/popularGenre";
import { profileTypes } from "../../../reducers/profile/profile";
class EditTags extends Component {
  constructor() {
    super();
    this.state = {
      recents: [
        "Dancer",
        "Comedy",
        "Standup",
        "nft",
        "guitarist",
        "VisualArts",
      ],
      resultNames: [],
      selectedGenres: [],
      popularGenre: [],
      searchText: "",
      results: [],
      selected: [
        "Singer",
        "Composer",
        "Beat Boxing",
        "Song Writer",
        "Background Music Composer",
      ],
      searchTags: ["Music", "Music Composer", "Musician"],
    };
  }
  componentDidMount = async () => {
    const {
      profile: { genreArr = [] },
    } = this.props;
    const { popularGenreData = [] } = this.props.popularGenre;

    const userId = await AsyncStorage.getItem(STORAGE_KEY.USER_ID);
    const tokenDetail = await AsyncStorage.getItem(STORAGE_KEY.ACCESS_TOKEN);
    this.props.callpopularGenreApi(userId, tokenDetail);
    this.setState({
      selectedGenres: genreArr,
      popularGenre: popularGenreData,
    });
    console.log("selectedGenres", genreArr);
    console.log("popularGenre", popularGenreData);
  };
  handleFilter = async (event) => {
    this.setState({
      searchText: event.replace(/\s/g, ""),
    });
    const {
      genreSearch: { genreSearchData = [] },
    } = this.props;
    const userId = await AsyncStorage.getItem(STORAGE_KEY.USER_ID);
    const tokenDetail = await AsyncStorage.getItem(STORAGE_KEY.ACCESS_TOKEN);

    this.props.callSearchGenreApi(
      userId,
      tokenDetail,
      event.replace(/\s/g, "")
    );
    const searchWord = event.replace(/\s/g, "");
    const newFilter = genreSearchData.filter((value) => {
      const genres = [...this.state.resultNames];
      genres.push(value.tag.toLowerCase());
      this.setState({
        resultNames: genres,
      });
      return value.tag.toLowerCase().includes(searchWord.toLowerCase());
    });

    if (searchWord === "") {
      this.setState({
        results: [],
      });
    } else {
      this.setState({
        results: [...newFilter],
      });
    }
  };

  addGenres = (item) => {
    console.log("itemadd", item);
    this.setState({ searchText: "", resultNames: [] });

    const selected = [...this.state.selectedGenres];
    console.log("selected", selected);

    console.log("selectedState", this.state.selectedGenres);
    if (!selected.some((el) => el.id === item.id)) {
      selected.push(item);
      this.setState({
        selectedGenres: selected,
      });
    }
  };
  componentWillReceiveProps(nextProps, nextState) {
    const { genreResponse = {}, isSuccessfull } = nextProps.assignGenre;
    if (isSuccessfull) {
      var item = genreResponse.data[0];
      this.props.resetAssignGenre();
      console.log("genreResponse", genreResponse.data[0]);
      //this.addGenres(genreResponse.data[0]);

      const selected = [...this.state.selectedGenres];
      console.log("selected", selected);
      console.log("selectedState", this.state.selectedGenres);
      if (!selected.some((el) => el.id === item.id)) {
        selected.push(item);
        this.setState({
          selectedGenres: selected,
        });
      }
      this.setState({
        searchText: "",
      });

   
    }
  }
  assignIdtoTag = async (tag) => {
    var newTag = tag.trim().toLowerCase();
    const xyz = [{ tag: newTag }];
    const {
      assignGenre: { genreResponse = {}, isSuccessfull },
    } = this.props;
    const userId = await AsyncStorage.getItem(STORAGE_KEY.USER_ID);
    const tokenDetail = await AsyncStorage.getItem(STORAGE_KEY.ACCESS_TOKEN);
    this.props.callAssignGenreApi(userId, tokenDetail, xyz);
  };
  handleSubmit = async () => {
    const xyz = [...this.state.selectedGenres];

    this.props.setGenreArrReducer([...xyz]);

    this.props.navigation.navigate("EditPage", {
      type: "Creator",
    });
  };
  renderSelected = () => {
    return (
      <View>
        {/* <Text style={styles.tagTitle}>Selected Tags</Text> */}
        <View
          style={{
            flexWrap: "wrap",
            flexDirection: "row",
            marginTop: 8,
          }}
        >
          {this.state.selectedGenres?.map((item, index) => {
            return (
              <TouchableOpacity
                key={index}
                onPress={() => {
                  var temp = [...this.state.selectedGenres];
                  temp.splice(index, 1);
                  this.setState({
                    selectedGenres: temp,
                  });
                }}
              >
                <View
                  style={[
                    styles.projectTypeCard,
                    {
                      backgroundColor: COLORS.monoBlack900,
                      flexDirection: "row",
                      alignItems: "center",
                    },
                  ]}
                >
                  <Text
                    style={[
                      styles.projectTypeCardText,
                      {
                        color: COLORS.monoWhite900,
                      },
                    ]}
                  >
                    #{item.tag}
                  </Text>
                  <Icon
                    style={{ marginLeft: 8 }}
                    name="x"
                    type="feather"
                    size={12}
                    color={COLORS.monoWhite900}
                  />
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    );
  };

  renderPopular = () => {
    return (
      <View>
        <Text style={styles.tagTitle}>Popular Tags</Text>
        <View
          style={{
            flexWrap: "wrap",
            flexDirection: "row",
            marginTop: 8,
          }}
        >
          {this.state.popularGenre.length > 0 &&
            this.state.popularGenre?.map((item, index) => {
              return (
                <TouchableWithoutFeedback
                  key={index}
                  onPress={() => {
                    console.log("item", item);
                    this.addGenres(item);
                    var temp = [...this.state.popularGenre];
                    temp.splice(index, 1);
                    this.setState({
                      popularGenre: temp,
                    });
                  }}
                >
                  <View
                    style={[
                      styles.projectTypeCard,
                      {
                        backgroundColor:
                          //   this.state.selectedGenre == item
                          //     ? COLORS.primaryTeal500
                          //     :
                          COLORS.monoGhost500,
                      },
                    ]}
                  >
                    <Text
                      style={[
                        styles.projectTypeCardText,
                        {
                          color:
                            //   this.state.selectedGenre == item
                            //     ? COLORS.monoWhite900
                            COLORS.monoBlack700,
                        },
                      ]}
                    >
                      #{item?.tag}
                    </Text>
                  </View>
                </TouchableWithoutFeedback>
              );
            })}
        </View>
      </View>
    );
  };
  renderSearchTags = () => {
    return (
      <View>
        {this.state.results.map((key, index) => {
          return (
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                marginTop: RFValue(24, 844),
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  //justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <View
                  style={{
                    backgroundColor: COLORS.monoGhost500,
                    width: RFValue(40, 844),
                    height: RFValue(40, 844),
                    borderRadius: RFValue(12, 844),

                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Text style={{ color: COLORS.primaryTeal500 }}>#</Text>
                </View>
                <Text
                  style={{
                    fontFamily: "Poppins_600SemiBold",
                    color: COLORS.monoBlack900,
                    fontSize: RFValue(16, 844),
                    marginLeft: RFValue(12, 844),
                  }}
                >
                  {key.tag}
                </Text>
              </View>
              <TouchableOpacity
                onPress={() => {
                  this.addGenres(key);
                }}
              >
                <SvgUri
                  svgXmlData={SVGS.PLUS_GREY}
                  width={RFValue(24, 844)}
                  height={RFValue(24, 844)}
                />
              </TouchableOpacity>
            </View>
          );
        })}
      </View>
    );
  };
  render() {
    return (
      <View style={styles.wrapper}>
        <ProfileHeader
          text="Edit Tags"
          showBackIcon={true}
          onBackPress={() => {
            this.props.navigation.goBack(null);
          }}
          rightComponent={() => {
            return (
              <TouchableWithoutFeedback onPress={this.handleSubmit}>
                <View style={styles.saveButton}>
                  <Text style={styles.saveText}>Select</Text>
                </View>
              </TouchableWithoutFeedback>
            );
          }}
        />
        <SearchBarWithFilter
          value={this.state.searchText}
          enableInput={true}
          bgColor={COLORS.monoGhost500}
          onChangeText={this.handleFilter}
          icon={
            !this.state.resultNames.includes(
              this.state.searchText.trim().toLowerCase()
            )
              ? () => {
                  return (
                    <TouchableOpacity
                      disabled={this.state.searchText == ""}
                      onPress={() => {
                        !this.state.resultNames.includes(
                          this.state.searchText.trim().toLowerCase()
                        )
                          ? this.assignIdtoTag(this.state.searchText)
                          : null;
                      }}
                    >
                      <View>
                        <SvgUri
                          svgXmlData={SVGS.PLUS_GREY}
                          width={RFValue(24, 844)}
                          height={RFValue(24, 844)}
                        />
                      </View>
                    </TouchableOpacity>
                  );
                }
              : () => {
                  return <View></View>;
                }
          }
        />
        {this.state.searchText == "" ? (
          <>
            {this.renderSelected()}
            {this.renderPopular()}
          </>
        ) : (
          this.renderSearchTags()
        )}
      </View>
    );
  }
}
const mapStateToProps = (state) => {
  const { genreSearch, assignGenre, profile, popularGenre } = state;
  return { genreSearch, assignGenre, profile, popularGenre };
};

const mapDispatchToProps = (dispatch) => {
  return {
    callSearchGenreApi: (userId, tokenDetail, name) => {
      dispatch({
        type: genreSearchTypes.SEARCH_GENRE,
        userId,
        tokenDetail,
        name,
      });
    },
    callpopularGenreApi: (userId, tokenDetail) => {
      dispatch({
        type: popularGenreTypes.GET_POPULAR_GENRE,
        userId,
        tokenDetail,
      });
    },
    setGenreArrReducer: (data) => {
      dispatch({ type: profileTypes.SET_GENRE_ARRAY_FOR_EDIT, data });
    },
    callAssignGenreApi: (userId, tokenDetail, body) => {
      dispatch({
        type: genreAssignTypes.ASSIGN_GENRE,
        userId,
        tokenDetail,
        body,
      });
    },
    resetAssignGenre: () => {
      dispatch({ type: genreAssignTypes.RESET_ASSIGN_GENRE });
    },
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withNavigation(EditTags));

const styles = StyleSheet.create({
  wrapper: {
    paddingTop: RFValue(48, 844),
    backgroundColor: COLORS.monoWhite900,
    height: "100%",
    paddingHorizontal: RFValue(16, 844),
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
    fontFamily: "Poppins_500Medium",
    fontSize: RFValue(14, 844),
  },
  tagTitle: {
    color: COLORS.monoBlack900,
    fontFamily: "Poppins_700Bold",
    fontSize: RFValue(16, 844),
    marginLeft: 8,
    marginTop: RFValue(24, 844),
  },
  saveText: {
    fontSize: RFValue(14, 844),
    fontFamily: "Poppins_500Medium",
    color: COLORS.monoWhite900,
  },
  saveButton: {
    paddingHorizontal: RFValue(16, 844),
    paddingVertical: RFValue(10, 844),
    backgroundColor: COLORS.primaryTeal400,
    borderRadius: RFValue(200, 844),
    alignItems: "center",
    justifyContent: "center",
  },
});
