import React, { Component } from "react";

import {
  View,
  Image,
  Text,
  TouchableOpacity,
  TextInput,
  TouchableWithoutFeedback,
  ScrollView,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import Styles from "./Style";
import ProfileHeader from "../../../components/multicellular/profile/header/header";
import SvgUri from "expo-svg-uri";
import SVGS from "../../../constants/SvgUri";
import IMAGES from "../../../themes/Images";
import { RFValue } from "react-native-responsive-fontsize";
import COLORS from "../../../themes/colors";
import folios from "../../../assets/jsons/profile/folio";
import SearchBarWithFilter from "../../../components/multicellular/general/searchBar";
export default class SavedDrafts extends Component {
  constructor() {
    super();
    this.state = {
      oppExpand: false,
      folioExpand: false,
      collabExpand: false,
    };
  }

  onClickProfile = (page) => {
    this.props.navigation.navigate("BrandProfile");
  };

  onClickNotification = (page) => {
    this.props.navigation.navigate("Notifications");
  };

  renderHeader = () => {
    return (
      <ProfileHeader
        text="Saved Drafts"
        showBackIcon={true}
        onBackPress={() => {
          this.props.navigation.goBack(null);
        }}
        rightComponent={() => {
          return (
            <View style={Styles.headerIconView}>
              <TouchableWithoutFeedback onPress={this.onClickNotification}>
                <View style={Styles.iconWrapper}>
                  <SvgUri
                    width={RFValue(24, 844)}
                    height={RFValue(24, 844)}
                    svgXmlData={SVGS.BELL}
                  />
                </View>
              </TouchableWithoutFeedback>
              <TouchableWithoutFeedback onPress={this.onClickProfile}>
                <View style={Styles.iconWrapper}>
                  <Image source={IMAGES.Sample_profile} style={Styles.icon} />
                </View>
              </TouchableWithoutFeedback>
            </View>
          );
        }}
      />
    );
  };
  renderSearch = () => {
    return (
      <SearchBarWithFilter
        enableInput={true}
        bgColor={COLORS.monoGhost500}
        onChangeText={null}
        
      />
    );
  };
  renderExpandedView = (value) => {
    return (
      <View>
        {value ? (
          <View style={{ paddingBottom: RFValue(56, 844) }}>
            {folios.map((item, index) => {
              return (
                <View>
                  <View style={Styles.divider}></View>
                  <View style={Styles.expandCard}>
                    <Image style={Styles.thumbnail} source={item.thumbnail} />
                    <View style={Styles.expandCardRightWrapper}>
                      <Text style={Styles.rightCardTitle}>
                        No Subject / Title
                      </Text>
                      <Text style={Styles.rightCardSubtitle}>
                        Let’s work on this by this week and have a discussion...
                      </Text>
                    </View>
                  </View>
                </View>
              );
            })}
          </View>
        ) : null}
      </View>
    );
  };
  renderOpportunities = () => {
    return (
      <TouchableWithoutFeedback
        onPress={() => {
          this.setState({
            oppExpand: !this.state.oppExpand,
          });
        }}
      >
        <View>
          <View>
            <View style={Styles.cardWrapper}>
              <Text style={Styles.titleText}>Opportunities</Text>
              <Icon
                color={COLORS.monoBlack500}
                name={this.state.oppExpand ? "chevron-down" : "chevron-up"}
                type="feather"
                size={20}
              />
            </View>
          </View>
          {this.renderExpandedView(this.state.oppExpand)}
          <View style={Styles.divider}></View>
        </View>
      </TouchableWithoutFeedback>
    );
  };
  renderFolio = () => {
    return (
      <TouchableWithoutFeedback
        onPress={() => {
          this.setState({
            folioExpand: !this.state.folioExpand,
          });
        }}
      >
        <View>
          <View style={Styles.cardWrapper}>
            <Text style={Styles.titleText}>Folio</Text>
            <Icon
              color={COLORS.monoBlack500}
              name={this.state.folioExpand ? "chevron-down" : "chevron-up"}
              type="feather"
              size={20}
            />
          </View>
          <View>{this.renderExpandedView(this.state.folioExpand)}</View>
          <View style={Styles.divider}></View>
        </View>
      </TouchableWithoutFeedback>
    );
  };
  renderCollab = () => {
    return (
      <TouchableWithoutFeedback
        onPress={() => {
          this.setState({
            collabExpand: !this.state.collabExpand,
          });
        }}
      >
        <View>
          <View style={Styles.cardWrapper}>
            <Text style={Styles.titleText}>Collab Requests</Text>
            <Icon
              color={COLORS.monoBlack500}
              name={this.state.collabExpand ? "chevron-down" : "chevron-up"}
              type="feather"
              size={20}
            />
          </View>
          <View>{this.renderExpandedView(this.state.collabExpand)}</View>
          <View style={Styles.divider}></View>
        </View>
      </TouchableWithoutFeedback>
    );
  };
  render() {
    return (
      <View style={Styles.wrapper}>
        {this.renderHeader()}
        {this.renderSearch()}
        <ScrollView showsVerticalScrollIndicator={false} overScrollMode="never">
          <View
            style={{
              paddingBottom: RFValue(24, 844),
              marginTop: RFValue(16, 844),
            }}
          >
            {this.renderOpportunities()}
            {this.renderFolio()}
            {this.renderCollab()}
          </View>
        </ScrollView>
      </View>
    );
  }
}
