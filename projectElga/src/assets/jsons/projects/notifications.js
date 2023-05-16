import React from "react";
import SVGS from "../../../constants/SvgUri";
import SvgUri from "expo-svg-uri";
import IMAGES from "../../../themes/Images";
import { Image } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
const NOTIFICATIONS = [
  {
    message: "Anisha Chauhan accepted your Collaboration Request",
    thumbnail: (
      <Image
        source={IMAGES.Sample_profile}
        style={{
          width: RFValue(56, 844),
          height: RFValue(56, 844),
          resizeMode: "contain",
        }}
      />
    ),
    date: "21-02-2021",
  },
  {
    message: "Someone Added a Citation to your Profile.",
    thumbnail: (
      <SvgUri width={20} height={20} svgXmlData={SVGS.WHITE_CHAT} zindex />
    ),
    date: "21-02-2021",
  },
  {
    message: "Your Saved Oppurtunity Enrollment Deadline is Due on 24-05-2022",
    thumbnail: (
      <SvgUri
        width={20}
        height={20}
        svgXmlData={SVGS.BRIEFCASE_OUTLINE}
        zindex
      />
    ),
    date: "21-02-2021",
  },
  {
    message:
      "Someone posted a New Oppurtunity Near you, Enroll now or Save it for later.",
    thumbnail: (
      <SvgUri
        width={20}
        height={20}
        svgXmlData={SVGS.BRIEFCASE_OUTLINE}
        zindex
      />
    ),
    date: "21-02-2021",
  },
  {
    message: "Trending creators this week, Check them out.",
    thumbnail:  <SvgUri width={20} height={20} svgXmlData={SVGS.FIRE} zindex />,
    date: "21-02-2021",
  },
  {
    message: "Someone saved your Folio",
    thumbnail: (
      <Image
        source={IMAGES.RedSaved}
        style={{
          width: RFValue(16, 844),
          height: RFValue(16, 844),
          resizeMode: "contain",
        }}
      />
    ),
    date: "21-02-2021",
  },
  {
    message: "Upcoming Events",
    thumbnail:  <SvgUri width={20} height={20} svgXmlData={SVGS.CALENDAR} zindex />,
    date: "21-02-2021",
  },
  {
    message: "Anisha Chauhan accepted your Collaboration Request",
    thumbnail: (
      <Image
        source={IMAGES.Sample_profile}
        style={{
          width: RFValue(56, 844),
          height: RFValue(56, 844),
          resizeMode: "contain",
        }}
      />
    ),
    date: "21-02-2021",
  },
  {
    message: "Someone Added a Citation to your Profile.",
    thumbnail: (
      <SvgUri width={20} height={20} svgXmlData={SVGS.WHITE_CHAT} zindex />
    ),
    date: "21-02-2021",
  },
  {
    message: "Your Saved Oppurtunity Enrollment Deadline is Due on 24-05-2022",
    thumbnail: (
      <SvgUri
        width={20}
        height={20}
        svgXmlData={SVGS.BRIEFCASE_OUTLINE}
        zindex
      />
    ),
    date: "21-02-2021",
  },
  {
    message:
      "Someone posted a New Oppurtunity Near you, Enroll now or Save it for later.",
    thumbnail: (
      <SvgUri
        width={20}
        height={20}
        svgXmlData={SVGS.BRIEFCASE_OUTLINE}
        zindex
      />
    ),
    date: "21-02-2021",
  },
  {
    message: "Trending creators this week, Check them out.",
    thumbnail:  <SvgUri width={20} height={20} svgXmlData={SVGS.FIRE} zindex />,
    date: "21-02-2021",
  },
  {
    message: "Someone saved your Folio",
    thumbnail: (
      <Image
        source={IMAGES.RedSaved}
        style={{
          width: RFValue(16, 844),
          height: RFValue(16, 844),
          resizeMode: "contain",
        }}
      />
    ),
    date: "21-02-2021",
  },
  {
    message: "Upcoming Events",
    thumbnail:  <SvgUri width={20} height={20} svgXmlData={SVGS.CALENDAR} zindex />,
    date: "21-02-2021",
  },
];
export default NOTIFICATIONS;
