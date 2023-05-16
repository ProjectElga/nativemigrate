import React, { useEffect, useState, useRef } from "react";
import { View, Text, ScrollView, Image } from "react-native";
import UserCard from "../../components/multicellular/general/userCard";
import userList from "../../assets/jsons/discover/profiles.json";
import IMAGES from "../../themes/Images";

import styles from "./Styles";
import MainCategoryBox from "../../components/multicellular/userCategory/mainCategoryBox";
import folios from "../../assets/jsons/profile/folio";
import ProjectCard from "../../components/multicellular/profile/projectCard/projectCard";
import ComingSoonCard from "../../components/multicellular/general/comingSoon";
const Detail = (props) => {
  // renders
  const [categoryList, setCategoryList] = useState([]);
  const [activeCategory, setActiveCategory] = useState("");

  useEffect(() => {
    setCategoryList(props.categoryData);
  });
  const handleSetCategory = (item) => {
    setActiveCategory(item);
  };
  return (
    <View style={styles.bodyWrapper}>
       {/* <ComingSoonCard
        image={IMAGES.circle}
        title="Portfolios"
        line1="Add people to your Circles"
        line2="Directly chat with people in your circle."
      /> */}
      {/* <View style={styles.listContainer}>
      {folios.map((value, index) => {
            return (
              <View style={{marginRight:12}}>
              <ProjectCard
                key={index}
                thumbnail={value.thumbnail}
                title={value.title}
                date={value.date}
                category1={value.category1}
                category2={value.category2}
              />
              </View>
            );
          })}
      </View> */}
    </View>
  );
};

export default Detail;
