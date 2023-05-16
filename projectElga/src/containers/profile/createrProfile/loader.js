import React, { Component, useState } from "react";
import { View, Animated, Dimensions, TouchableOpacity } from "react-native";
import { Icon } from "react-native-elements";

import { RFValue } from "react-native-responsive-fontsize";
import BottomNavBar from "../../../components/multicellular/general/bottomNavBar/bottomNavBar";
import Skeleton from "../../../components/multicellular/general/skeleton/skeleton";
import CategoryBox from "../../../components/multicellular/profile/catergoryBox/categoryBox";
import ProfileHeader from "../../../components/multicellular/profile/header/header";
import COLORS from "../../../themes/colors";
import Styles from "./Style";
const width = Dimensions.get("window").width;
export default class CreatorLoader extends Component {
  constructor() {
    super();
    this.state = {
      activeCategory: "Social",
    };
  }

  handleSetCategory = (item) => {
    this.setState({
      activeCategory: item,
    });
  };

  renderPicDetail = () => {
    return (
      <View style={Styles.detailCard}>
        <View style={Styles.picDetailWrapper}>
          <View style={Styles.profilePicture}>
            <Skeleton styles={Styles.profileImage} />
          </View>
          <View style={Styles.skeletonWrapper}>
            <Skeleton styles={[Styles.skeletonPicCard, { width: "50%" }]} />
            <Skeleton styles={[Styles.skeletonPicCard, { width: "70%" }]} />
            <Skeleton styles={[Styles.skeletonPicCard, { width: "70%" }]} />
          </View>
        </View>
        <Skeleton
          styles={[
            Styles.skeletonPicCard,
            { width: "100%", height: RFValue(48, 844) },
          ]}
        />
        <Skeleton
          styles={[
            Styles.skeletonPicCard,
            { width: "100%", height: RFValue(100, 844) },
          ]}
        />
        <View style={Styles.skeletonButtons}>
          <Skeleton
            styles={[
              Styles.skeletonPicCard,
              { width: "48%", height: RFValue(64, 844) },
            ]}
          />
          <Skeleton
            styles={[
              Styles.skeletonPicCard,
              { width: "48%", height: RFValue(64, 844) },
            ]}
          />
        </View>
      </View>
    );
  };
  renderCategoryTab = () => {
    return (
      <View style={Styles.categoryBar}>
        {this.props?.category.map((value, index) => (
          <CategoryBox
            key={index}
            text={value}
            onPress={() => {
              this.handleSetCategory(value);
            }}
            isActive={this.state.activeCategory == value}
          />
        ))}
      </View>
    );
  };
  renderSocial = () => {
    return (
      <View
        style={[
          Styles.skeletonInstaWrapper,
          { marginTop: RFValue(16, 844), width: "100%" },
        ]}
      >
        <Skeleton styles={[Styles.skeletonInstaCard, { marginLeft: 0 }]} />
        <Skeleton styles={Styles.skeletonInstaCard} />
        <Skeleton styles={Styles.skeletonInstaCard} />
        <Skeleton styles={Styles.skeletonInstaCard} />
      </View>
    );
  };
  renderFolio = () => {
    return (
      <View
        style={[Styles.skeletonFolioWrapper, { marginTop: RFValue(0, 844) }]}
      >
        <Skeleton styles={Styles.skeletonFolioCard} />
        <Skeleton styles={Styles.skeletonFolioCard} />
        <Skeleton styles={Styles.skeletonFolioCard} />
        <Skeleton styles={Styles.skeletonFolioCard} />
      </View>
    );
  };
  renderCitations = () => {
    return (
      <View style={Styles.citationWrapper}>
        <View style={Styles.skeletonCitationWrapper}>
          <View>
            <Skeleton styles={Styles.skeletonCitationImage} />
          </View>
          <View style={Styles.skeletonWrapper}>
            <Skeleton styles={[Styles.skeletonPicCard, { width: "50%" }]} />
            <Skeleton styles={[Styles.skeletonPicCard, { width: "90%" }]} />
          </View>
        </View>
        <View style={Styles.skeletonCitationWrapper}>
          <View>
            <Skeleton styles={Styles.skeletonCitationImage} />
          </View>
          <View style={Styles.skeletonWrapper}>
            <Skeleton styles={[Styles.skeletonPicCard, { width: "50%" }]} />
            <Skeleton styles={[Styles.skeletonPicCard, { width: "90%" }]} />
          </View>
        </View>
        <View style={Styles.skeletonCitationWrapper}>
          <View>
            <Skeleton styles={Styles.skeletonCitationImage} />
          </View>
          <View style={Styles.skeletonWrapper}>
            <Skeleton styles={[Styles.skeletonPicCard, { width: "50%" }]} />
            <Skeleton styles={[Styles.skeletonPicCard, { width: "90%" }]} />
          </View>
        </View>
      </View>
    );
  };

  render() {
    return (
      <View
        style={{
          height: "100%",
          backgroundColor: COLORS.monoGhost500,
        }}
      >
        <View
          style={{
            justifyContent: "flex-end",
            marginTop: RFValue(16, 844),
          }}
        >
          <View style={Styles.wrapper}>
            {/* <TouchableWithoutFeedback
              onPress={() => {
                this.setState({
                  view: !this.state.view,
                });
              }}
            >
              <View
                style={{
                  zIndex: 3,
                  paddingHorizontal: RFValue(16, 844),
                  height: 120,
                  paddingTop: RFValue(64, 844),
                  alignItems: "center",
                }}
              >
                <ProfileHeader
                  color={COLORS.monoWhite900}
                  text={null}
                  width={width - 30}
                  showChevron={true}
                  onPressBack={() => {
                    this.props.navigation.goBack(null);
                  }}
                  rightComponent={() => {
                    return (
                      <TouchableOpacity

                      >
                        <View></View>
                      </TouchableOpacity>
                    );
                  }}
                />
              </View>
            </TouchableWithoutFeedback> */}
            {this.props.onPress ? (
              <ProfileHeader
                height={RFValue(96, 844)}
                color={COLORS.monoWhite900}
                //text={this.handleSplitText(userName)}
                width={width - 24}
                icon="chevron-left"
                // showBackIcon={true}
                marginBottom={0}
                //paddingTop={24}
                rightComponent={() => {
                  return (
                    <TouchableOpacity
                      style={Styles.profileHeaderBtn}
                      onPress={this.props.onPress}
                    >
                      <Icon name="settings" type="feather" size={20} />
                    </TouchableOpacity>
                  );
                }}
              />
            ) : (
              <View style={{ height: RFValue(96, 844) }}></View>
            )}
            <View>
              {this.renderPicDetail()}
              {this.renderCategoryTab()}
              {this.state.activeCategory == "Social"
                ? this.renderSocial()
                : this.state.activeCategory == "Citations"
                ? this.renderCitations()
                : this.renderFolio()}
            </View>
          </View>
          <BottomNavBar />
        </View>
      </View>
    );
  }
}
