import React, { useEffect, useState } from "react";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { Icon } from "react-native-elements";
import { Text, View, TextInput, ScrollView, Dimensions,TouchableOpacity } from "react-native";
import Styles from "./Style";
import MainCategoryBox from "../../../components/multicellular/userCategory/mainCategoryBox";
import SubCategoryBox from "../../../components/multicellular/userCategory/subCategoryBox";
import STRINGS from "../../../constants/Strings";
import AsyncStorage from "@react-native-async-storage/async-storage";
import STORAGE_KEY from "../../../constants/StorageKeys";
import BottomNavBar from "../../../components/multicellular/general/bottomNavBar/bottomNavBar";
import Tag from "../../../components/multicellular/userCategory/tag";
import IMAGES from "../../../themes/Images";
import SnackBar from "../../../components/unicellular/snackbar";
import Footer from "../../../components/multicellular/general/onBoardFooter/Footer";
import { connect, useSelector } from "react-redux";
import { categoryTypes } from "../../../reducers/onboard/userCategory";
import { assignIdentity } from "../../../reducers/onboard/identity";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import ProfileHeader from "../../../components/multicellular/profile/header/header";
import COLORS from "../../../themes/colors";
import { RFValue } from "react-native-responsive-fontsize";
import Skeleton from "../../../components/multicellular/general/skeleton/skeleton";
import { profileTypes } from "../../../reducers/profile/profile";
import AuthHeader from "../../../components/multicellular/auth/header";

function EditCategory(props) {
  const userCategory = useSelector((state) => state.userCategory);
  const { signup, profile } = useSelector((state) => state);
  const { profileData, categoriesArr = [] } = profile;
  const [categoryList, setCategoryList] = useState([]);
  const [activeCategory, setActiveCategory] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [activeSubCategory, setActiveSubCategory] = useState("a");
  const [subCategoryList, setSubCategoryList] = useState([]);
  const [showSubCategory, setShowSubCategory] = useState(false);
  const [showSelectedTag, setShowSelectedTag] = useState(true);
  const [showNextButton, setShowNextButton] = useState(false);
  const [isNew, setIsNew] = useState(true);
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(categoriesArr);

  const { loading, isAssignedSuccess, categoryData, isSuccessfull } =
    userCategory;
  const { callCategoryApi } = props;
  const { route, navigation } = props;
  const { identity } = route?.params;
  useEffect(() => {
    effect();
  }, [isSuccessfull, isAssignedSuccess, identity]);
  const effect = async () => {
    const userId = await AsyncStorage.getItem(STORAGE_KEY.USER_ID);
    const tokenDetail = await AsyncStorage.getItem(STORAGE_KEY.ACCESS_TOKEN);
    const isCreator = identity === 1;
    props.resetIdentityReducer();
    if (isSuccessfull && !isNew) {
      setCategoryList(categoryData);
    } else {
      callCategoryApi(userId, tokenDetail, isCreator);
      setIsNew(false);
    }
    if (isAssignedSuccess) {
      handleNextButtonClick();
      props.resetUserCategory();
    }
  };
  const handleSetCategory = (item) => {
    setActiveCategory(item?.name);
    setSubCategoryList(item?.subcategory);
    setShowSubCategory(true);
    setShowSelectedTag(false);
  };
  const handleSelectedTag = () => {
    setShowSubCategory(false);
    setShowSelectedTag(true);
  };
  const height = Dimensions.get("window").height;
  const handleSetSubCategory = (item) => {
    const array = selectedCategory;
    if (array.some((data) => data.id === item.id)) {
      // let index = array.indexOf(item);
      let index = array
        .map(function (e) {
          return e.id;
        })
        .indexOf(item?.id);
      array.splice(index, 1);
      setSelectedCategory([...array]);
    } else {
      if (selectedCategory.length === 2 && identity == 2) {
        setShowSnackbar(true);
      }
      if (selectedCategory.length === 5 && identity != 2) {
        setShowSnackbar(true);
      }
      if (array.length < 2 && identity == 2) {
        array.push(item);
        setSelectedCategory([...array]);

        setActiveSubCategory(item);
      }
      if (array.length < 5 && identity != 2) {
        array.push(item);
        setSelectedCategory([...array]);
        setActiveSubCategory(item);
      }
    }
    if (selectedCategory.length > 0) {
      setShowNextButton(true);
    } else {
      setShowNextButton(false);
    }
  };
  const handleSubmitForm = async () => {
    const isCreator = identity === 1;
    const requestBody = selectedCategory;
    const userId = await AsyncStorage.getItem(STORAGE_KEY.USER_ID);
    const tokenDetail = await AsyncStorage.getItem(STORAGE_KEY.ACCESS_TOKEN);
    if (selectedCategory.length > 0) {
      props.assignCategoryApi(userId, requestBody, tokenDetail, isCreator);
      handleNextButtonClick();
    } else {
      setShowSnackbar(true);
    }
  };
  const handleNextButtonClick = async () => {
    const userId = await AsyncStorage.getItem(STORAGE_KEY.USER_ID);
    const tokenDetail = await AsyncStorage.getItem(STORAGE_KEY.ACCESS_TOKEN);
    if (identity === 2) {
      props.navigation.navigate("More", {
        userId: userId,
        tokenDetail: tokenDetail,
      });
    } else {
      props.navigation.navigate("Social", {
        userId: userId,
        tokenDetail: tokenDetail,
      });
    }
  };
  const checkActive = (item) => {
    return selectedCategory.some((data) => data.id === item.id);
  };
  const searchCategory = (text) => {
    setSearchValue(text);
  };
  const search = () => {
    let value = categoryList.filter(function (el) {
      return el.mainCategory === searchValue;
    });
    setCategoryList(value);
  };
  const _renderInput = () => {
    return (
      <View>
        <View style={Styles.searchSection}>
          <TextInput
            style={Styles.input}
            placeholder="Search"
            underlineColorAndroid="transparent"
            onChangeText={(text) => searchCategory(text)}
            value={searchValue}
          />
          <TouchableOpacity onPress={search}>
            <Icon
              style={Styles.searchIcon}
              name="ios-search"
              size={20}
              color="#aaaaaa"
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  };
  const _renderCategories = () => {
    return (
      categoryList && (
        <View style={Styles.categoryContainer}>
          <View style={Styles.horizontalView}>
            {
              <MainCategoryBox
                onPress={() => {
                  handleSelectedTag();
                  setActiveCategory("");
                }}
                isIcon={true}
                icon={
                  activeCategory == ""
                    ? IMAGES.ChecksquareWhite
                    : IMAGES.Checksquare
                }
                isActive={activeCategory == ""}
              />
            }
            <ScrollView
              horizontal={true}
              overScrollMode={"never"}
              showsHorizontalScrollIndicator={false}
              style={{ marginLeft: 6 }}
            >
              {categoryList.map((item, index) => {
                return (
                  <MainCategoryBox
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
          </View>
          <View
            style={{
              borderWidth: 0.5,
              borderColor: COLORS.monoBrightGray,
              width: "120%",
              marginTop: RFValue(24, 844),
              marginLeft: -24,
            }}
          ></View>
          {showSubCategory && <ScrollView>{renderSubCategories()}</ScrollView>}
          {showSelectedTag && <ScrollView>{renderTags()}</ScrollView>}
        </View>
      )
    );
  };

  const renderSubCategories = () => {
    return (
      <ScrollView
        style={{
          //marginRight:35,
          flexWrap: "wrap",
        }}
        // horizontal={true}
      >
        <View style={Styles.subCategoryContainer}>
          {subCategoryList?.map((item, index) => {
            return (
              <SubCategoryBox
                text={item.name}
                onPress={() => {
                  handleSetSubCategory(item);
                }}
                isActive={checkActive(item)}
                key={index.toString()}
              />
            );
          })}
        </View>
      </ScrollView>
    );
  };
  const renderTags = () => {
    return (
      <View style={Styles.subCategoryContainer}>
        {selectedCategory?.map((category, index) => {
          return (
            <Tag
              category={category.name}
              onPress={() => {
                handleSetSubCategory(category);
              }}
              key={index}
            />
          );
        })}
      </View>
    );
  };
  const _renderHeaderText = () => {
    return (
      <View>
        {identity == 2 ? (
          <>
            <Text style={Styles.headerText}>Whom?</Text>
            <Text style={Styles.headerSubTitleText}>I Represent...</Text>
            <Text style={Styles.headerDetailText}>
              Select, what describes your work the best
            </Text>
          </>
        ) : (
          <>
            <Text style={Styles.headerText}>What ?</Text>
            <Text style={Styles.headerSubTitleText}>
              Describe, What you do...
            </Text>
            <Text style={Styles.headerDetailText}>
              Brag about it, You deserve it. (Add upto 5)
            </Text>
          </>
        )}
      </View>
    );
  };
  const _skeletonLoader = () => {
    return (
      <View style={Styles.categoryContainer}>
        <View style={Styles.horizontalView}>
          <Skeleton styles={Styles.sMainBox} />
          <Skeleton styles={Styles.sMainBox} />
          <Skeleton styles={Styles.sMainBox} />
          <Skeleton styles={Styles.sMainBox} />
        </View>
        <View
          style={{
            borderWidth: 0.5,
            borderColor: COLORS.monoBrightGray,
            width: "120%",
            marginTop: RFValue(24, 844),
            marginLeft: -24,
          }}
        ></View>
        <View style={[Styles.subCategoryContainer, { flexWrap: "wrap" }]}>
          <Skeleton borderRadius={RFValue(12, 844)} styles={Styles.sSubBox} />
          <Skeleton borderRadius={RFValue(12, 844)} styles={Styles.sSubBox} />
          <Skeleton borderRadius={RFValue(12, 844)} styles={Styles.sSubBox} />
          <Skeleton borderRadius={RFValue(12, 844)} styles={Styles.sSubBox} />
          <Skeleton borderRadius={RFValue(12, 844)} styles={Styles.sSubBox} />
          <Skeleton borderRadius={RFValue(12, 844)} styles={Styles.sSubBox} />
          <Skeleton borderRadius={RFValue(12, 844)} styles={Styles.sSubBox} />
          <Skeleton borderRadius={RFValue(12, 844)} styles={Styles.sSubBox} />
        </View>
      </View>
    );
  };

  const _renderheader = () => {
    return (
      <View style={Styles.headerContainer}>
        <ProfileHeader
          text="Categories"
          showBackIcon={true}
          onBackPress={() => {
            props.navigation.goBack(null);
          }}
          rightComponent={() => {
            return (
              <TouchableOpacity
                onPress={() => {
                  props.setCategoryArrReducer([...selectedCategory]);
                  props.navigation.navigate("EditPage", {
                    type: "Creator",
                  });
                }}
              >
                <Text style={Styles.saveText}>Select</Text>
              </TouchableOpacity>
            );
          }}
        />
        {/* {_renderInput()} */}
      </View>
    );
  };
  //   const handleBackButtonClick = () => {
  //     props.navigation.goBack(null);
  //   };
  return (
    <View>
      {/* <BottomSheetModalProvider> */}
        <View style={Styles.wrapper}>
          {loading ? (
            <View>{_skeletonLoader()}</View>
          ) : (
            <View>
              <ProfileHeader
                text="Edit Categories"
                showBackIcon={true}
                onBackPress={() => {
                  props.navigation.goBack(null);
                }}
                rightComponent={() => {
                  return (
                    <TouchableOpacity
                      onPress={() => {
                        props.setCategoryArrReducer([...selectedCategory]);
                        props.navigation.navigate("EditPage", {
                          type: "Creator",
                        });
                      }}
                    >
                      <View style={Styles.saveButton}>
                        <Text style={Styles.saveText}>Select</Text>
                      </View>
                    </TouchableOpacity>
                  );
                }}
              />

              {_renderCategories()}
            </View>
          )}

          {showSnackbar && (
            <SnackBar
              visible={showSnackbar}
              onDismiss={() => {
                setShowSnackbar(false);
              }}
              text={STRINGS.tagsSelectedLimit}
            />
          )}
        </View>
        <BottomNavBar />
      {/* </BottomSheetModalProvider> */}
    </View>
  );
}
const mapStateToProps = (state) => {
  const { userCategory } = state;
  return { userCategory };
};

const mapDispatchToProps = (dispatch) => ({
  callCategoryApi: (userId, tokenDetail, isCreator) => {
    dispatch({
      type: categoryTypes.GET_USER_CATEGORY_LIST,
      userId,
      tokenDetail,
      isCreator,
    });
  },
  resetIdentityReducer: () => {
    dispatch({ type: assignIdentity.RESET_ASSIGN_IDENTITY });
  },
  setCategoryArrReducer: (data) => {
    dispatch({ type: profileTypes.SET_CATEGORY_ARRAY_FOR_EDIT, data });
  },
  resetUserCategory: () => {
    dispatch({ type: categoryTypes.RESET_CATEGORY_LIST });
  },
  assignCategoryApi: (userId, requestBody, tokenDetail, isCreator) => {
    dispatch({
      type: categoryTypes.ASSIGN_SUB_CATEGORIES,
      userId,
      requestBody,
      tokenDetail,
      isCreator,
    });
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)((EditCategory));
