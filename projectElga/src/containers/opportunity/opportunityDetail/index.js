import React, { useState } from "react";
import {
  View,
  Image,
  ImageBackground,
  Text,
  ScrollView,
  TouchableWithoutFeedback,
} from "react-native";
import SvgUri from "expo-svg-uri";
import SVGS from "../../../constants/SvgUri";
import IMAGES from "../../../themes/Images";
import Styles from "./Styles";
import { RFValue } from "react-native-responsive-fontsize";
import folios from "../../../assets/jsons/profile/folio";
import ProfileButton from "../../../components/multicellular/profile/button/profileButton";
import COLORS from "../../../themes/colors";
import SaveIcon from "../../../components/multicellular/general/saveIcon";
import OpportunityEnroll from "../opportunityEnroll";
import { Icon } from "react-native-elements";
// variables
const description =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sollicitudin vitae ultricies facilisis turpis suspendisse commodo enim, enim. Et sit lectus scelerisque vitae tempus magna a cras nisl. Ac tortor in venenatis, non ";
const OpportunityDetail = (props) => {
  const [isEnroll, setIsEnroll] = useState(false);
  const [isResponsesOpen, setIsResponsesOpen] = useState(false);
  const [view, setView] = useState(true);

  const handleCloseEnrol = () => {
    setIsEnroll(false);
  };
  const data = props.navigation.getParam("data")
  const _renderDetail = () => {
    return (
      <View style={Styles.innerContainer}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          overScrollMode={"never"}
        >
          <TouchableWithoutFeedback
            onPress={() => {
              setView(!view);
            }}
          >
            <Text style={Styles.titleText}>
             {data.title}
            </Text>
          </TouchableWithoutFeedback>
          <View style={Styles.subtitleContainer}>
            <Image
              source={IMAGES.Sample_profile}
              style={{
                width: RFValue(16, 844),
                height: RFValue(16, 844),
                resizeMode: "contain",
              }}
            ></Image>
            <Text style={Styles.subtitleText}>
              {"Anisha Chauhan" + " | " + "Date: 23-08-21"}
            </Text>

            <View style={Styles.category1}>
              <Text style={Styles.category1Text}>{"Paid"}</Text>
            </View>
          </View>
          <Text style={Styles.descriptionText}>{data.description}</Text>
          <View
            style={{
              borderWidth: 1,
              borderColor: COLORS.monoGhost500,
              width: "100%",
              marginTop: RFValue(20, 844),
            }}
          ></View>
          {_renderProjectDetail()}
        </ScrollView>
        {view ? _renderTppBottom() : _renderFppBottom()}
      </View>
    );
  };
  const _renderProjectDetail = () => {
    return (
      <View style={Styles.projectDetailContainer}>
        <Text
          style={{
            fontFamily: "Poppins_600SemiBold",
            fontSize: RFValue(16, 844),
            color: COLORS.monoBlack900,
          }}
        >
          Project Details
        </Text>

        <View
          style={{
            marginTop: RFValue(16, 844),
            width: "100%",
          }}
        >
          <Text
            style={{
              fontFamily: "Poppins_500Medium",
              fontSize: RFValue(16, 844),
              color: COLORS.monoBlack900,
              lineHeight: RFValue(24, 844),
            }}
          >
            Deadline:{" "}
          </Text>
          <Text
            style={{
              fontFamily: "Poppins_400Regular",
              fontSize: RFValue(14, 844),

              color: COLORS.monoBlack700,
              lineHeight: RFValue(24, 844),
            }}
          >
            23-02-2020{" "}
          </Text>
        </View>

        <View
          style={{
            marginTop: RFValue(16, 844),
            width: "100%",
          }}
        >
          <Text
            style={{
              fontFamily: "Poppins_500Medium",
              fontSize: RFValue(16, 844),
              color: COLORS.monoBlack900,
              lineHeight: RFValue(24, 844),
            }}
          >
            Budget:{" "}
          </Text>
          <Text
            style={{
              fontFamily: "Poppins_400Regular",
              fontSize: RFValue(14, 844),

              color: COLORS.monoBlack700,
              lineHeight: RFValue(24, 844),
            }}
          >
            {"$1000 for every 100k Reach. Engagement rate must be >20%"}
          </Text>
        </View>

        <View
          style={{
            marginTop: RFValue(16, 844),
            width: "100%",
            flexWrap: "wrap",
          }}
        >
          <Text
            style={{
              fontFamily: "Poppins_500Medium",
              fontSize: RFValue(16, 844),
              color: COLORS.monoBlack900,
              lineHeight: RFValue(24, 844),
            }}
          >
            Deliverable:{" "}
          </Text>
          <Text
            style={{
              fontFamily: "Poppins_400Regular",
              fontSize: RFValue(14, 844),

              color: COLORS.monoBlack700,
              flexShrink: 1,
              lineHeight: RFValue(24, 844),
              flexWrap: "wrap",
            }}
          >
            Promotion Reels: Campaign story line will be shared
          </Text>
        </View>
      </View>
    );
  };
  const _renderTppBottom = () => {
    return (
      <View style={Styles.buttonWrapper}>
        <ProfileButton
          bg={COLORS.primaryTeal500}
          text="Apply"
          textColor={COLORS.monoWhite900}
          width="100%"
          onPress={() => {
            // this.props.navigation.navigate("CollabRequest");
            setIsEnroll(true);
          }}
        />
        {/* <View style={Styles.saveButton}>
          <SaveIcon />
        </View> */}
      </View>
    );
  };
  const _renderFppBottom = () => {
    return (
      <View style={Styles.buttonWrapper}>
        <ProfileButton
          bg={COLORS.primaryTeal500}
          text="Responses"
          textColor={COLORS.monoWhite900}
          width="55%"
          onPress={() => {
            props.navigation.navigate("Responses");
            setIsResponsesOpen(true);
          }}
          children={<SvgUri width="16" height="26" svgXmlData={SVGS.PAGE} />}
          isIcon
        />
        <ProfileButton
          bg={COLORS.monoGhost500}
          text="Edit"
          textColor={COLORS.monoBlack700}
          width="40%"
          onPress={() => {
            // this.props.navigation.navigate("CollabRequest");
            setIsResponsesOpen(true);
          }}
          isIcon
          children={
            <SvgUri width="16" height="26" svgXmlData={SVGS.EDIT_BLACK} />
          }
        />
      </View>
    );
  };
  const _renderMainView = () => {
    return (
      <View style={Styles.container}>
        <ImageBackground
          source={data.thumbnail}
          style={{
            width: "100%",
            height: undefined,
            flexWrap: "wrap",
            aspectRatio: 16 / 9,
            resizeMode: "contain",
          }}
        >
          <View style={Styles.categoryContainer}>
            <Icon
              name="chevron-left"
              type="feather"
              size={28}
              color={COLORS.monoWhite900}
              onPress={() => {
                props.navigation.goBack(null);
              }}
            />
          </View>

          <View
            style={{
              width: RFValue(40, 844),
              height: RFValue(40, 844),
              zIndex: 100,
              position: "absolute",
              top: RFValue(52, 844),
              right: RFValue(26, 844),
              backgroundColor: COLORS.monoWhite900,
              borderRadius: RFValue(20, 844),
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <SaveIcon />
          </View>
        </ImageBackground>
        {_renderDetail()}
      </View>
    );
  };
  return (
    <View>
      {isEnroll ? (
        <OpportunityEnroll onCloseEnroll={handleCloseEnrol} />
      ) : (
        _renderMainView()
      )}
    </View>
  );
};
export default OpportunityDetail;
