import React, { useEffect, useState } from "react";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { withNavigation } from "react-navigation";
import Icon from "react-native-vector-icons/Ionicons";
import {
  Text,
  View,
  TextInput,
  ScrollView,
  Dimensions,
} from "react-native";
import Styles from "./Style";
import MainCategoryBox from "../../../components/multicellular/userCategory/mainCategoryBox";
// import MainCategoryBox from "../../../components/multicellular/userCategory/mainCategoryBox";
import SubCategoryBox from "../../../components/multicellular/userCategory/subCategoryBox";
import STRINGS from "../../../constants/Strings";
import genres from "../../../assets/jsons/profile/genre.json";
import Tag from "../../../components/multicellular/userCategory/tag";
import IMAGES from "../../../themes/Images";
import SnackBar from "../../../components/unicellular/snackbar";
import Footer from "../../../components/multicellular/general/onBoardFooter/Footer";

function UserGenre(props) {
  const [genreList, setGenreList] = useState(genres);
  const [activeGenre, setActiveGenre] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [activeSubGenre, setActiveSubGenre] = useState("");
  const [subGenreList, setSubGenreList] = useState([]);
  const [showSubGenre, setShowSubGenre] = useState(false);
  const [showSelectedTag, setShowSelectedTag] = useState(false);
  const [showNextButton, setShowNextButton] = useState(false);
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [selectedGenre, setSelectedGenre] = useState([]);
//   const userCategory = useSelector((state) => state.userCategory);
//   const {loading,error,errorMsg,categoryData,isSuccessfull}=userCategory;
//   useEffect(() => {
//     // const userId = "8311aaa6-e7a3-4b54-8b2b-eb4cb90a1df4";
//     // const tokenDetail ="Bearer 33333";
//     // props.callCategoryApi(userId,tokenDetail)
//     console.log("categoryData>>",categoryData);
//     if(isSuccessfull){
//       console.log("categoryData>>",categoryData);
//     }
//     // if (searchValue === "") {
//     //   if (identity == 2 || identity == 3 || identity == 4) {
//     //     setGenreList(AdminstratorCategory);
//     //   } else {
//     //     setGenreList(CreatorCategory);
//     //   }
//     // }
//   });
//   let identity = props.navigation.getParam("identity");
  const handleSetGenre = (item) => {
    setActiveGenre(item.mainGenre);
    setSubGenreList(item.subGenres);
    setShowSubGenre(true);
    setShowSelectedTag(false);
  };
  const handleSelectedTag = () => {
    setShowSubGenre(false);
    setShowSelectedTag(true);
  };
  const height = Dimensions.get("window").height;
  const handleSetSubGenre = (item) => {
    const array = selectedGenre;
    if (array.includes(item)) {
      let index = array.indexOf(item);
      array.splice(index, 1);
      setSelectedGenre([...array]);
    } else {
      if (selectedGenre.length === 5) {
        setShowSnackbar(true);
      }
      if (array.length < 5) {
        array.push(item);
        setSelectedGenre([...array]);
        setActiveSubGenre(item);
      }
    }
    if (selectedGenre.length > 0) {
      setShowNextButton(true);
    } else {
      setShowNextButton(false);
    }
  };
 
  const handleNextButtonClick = () => {
      //puch lena
    // if (identity == 2 || identity == 3 || identity == 4) {
    //   props.navigation.navigate("More");
    // } else {
    //   props.navigation.navigate("Social");
    // }
    props?.navigation?.navigate("BrandProfile");
  };
  const checkActive = (item) => {
    return selectedGenre.includes(item);
  };
  const searchGenre = (text) => {
    setSearchValue(text);

  };
  const search =()=>{
    let value = genreList.filter(function (el)
    {
      console.log("mainGenre>>",el.mainGenre)
      return el.mainGenre === searchValue ;
    });
    setGenreList(value);
  }
  const _renderInput = () => {
    return (
      <View>
        <View style={Styles.searchSection}>
          <TextInput
            style={Styles.input}
            placeholder="Add #genres"
            underlineColorAndroid="transparent"
            onChangeText={(text) => searchGenre(text)}
            value={searchValue}

          />
          <TouchableWithoutFeedback onPress={search}>
            <Icon
              style={Styles.searchIcon}
              name="ios-search"
              size={20}
              color="#aaaaaa"
            />
          </TouchableWithoutFeedback>
        </View>
      </View>
    );
  };
  const _renderGenres = () => {
    return (
      genreList && (
        <View style={Styles.categoryContainer}>
          <View style={Styles.horizontalView}>
            {
              <MainCategoryBox
                onPress={handleSelectedTag}
                isIcon={true}
                icon={IMAGES.Checksquare}
              />
            }
            <ScrollView
              horizontal={true}
              overScrollMode={"never"}
              showsHorizontalScrollIndicator={false}
            >
              {genreList.map((item, index) => {
                return (
                  <MainCategoryBox
                    text={item.mainGenre}
                    onPress={() => {
                      handleSetGenre(item);
                    }}
                    isActive={activeGenre === item.mainGenre}
                    key={index}
                  />
                );
              })}
            </ScrollView>
          </View>
          {showSubGenre && <ScrollView>{_renderSubGenres()}</ScrollView>}
          {showSelectedTag && <ScrollView>{_renderTags()}</ScrollView>}
        </View>
      )
    );
  };

  const _renderSubGenres = () => {
    return (
      <ScrollView
        style={{
          //marginRight:35,
          flexWrap: "wrap",
          marginTop: 10,
        }}
        // horizontal={true}
      >
        <View style={Styles.subCategoryContainer}>
          {subGenreList.map((item, index) => {
            if (index < 8) {
              return (
                <SubCategoryBox
                  text={item}
                  onPress={() => {
                    handleSetSubGenre(item);
                  }}
                  isActive={checkActive(item)}
                  key={index}
                />
              );
            }
          })}
        </View>
      </ScrollView>
    );
  };
  const _renderTags = () => {
    return (
      <View style={Styles.subCategoryContainer}>
        {selectedGenre.map((category, index) => {
          return (
            <Tag
              category={category}
              onPress={() => {
                handleSetSubGenre(category);
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
        <Text style={Styles.headerText}>#Genre</Text>
        <Text style={Styles.headerSubTitleText}>I am good at...</Text>
        <Text style={Styles.headerDetailText}>
          Skills, interests or Genres. (Add upto 5)
        </Text>
      </View>
    );
  };
  const _renderheader = () => {
    return (
      <View style={Styles.headerContainer}>
        {_renderHeaderText()}
        {_renderInput()}
      </View>
    );
  };

  // const handleBackButtonClick = () => {
  //  props.navigation.goBack(null);
  // };
  return (
    <View style={Styles.pageWrapper}>
      <View style={{ height: height - 150 }}>
        {_renderheader()}
        {/* {_renderTags()} */}
        {_renderGenres()}
      </View>
      <Footer
        currentPosition={3}
        showBackText={false}
        showNextButton={showNextButton}
        onNextPress={() => {
          handleNextButtonClick();
        }}
      />
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
  );
}

export default (UserGenre)

