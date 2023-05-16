import SvgUri from "expo-svg-uri";
import React, {
  Component,
  useRef,
  useCallback,
  useMemo,
  useState,
} from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import SVGS from "../../../../constants/SvgUri";
import COLORS from "../../../../themes/colors";
import {
  BottomSheetModal,
  BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";
import { withNavigation } from "react-navigation";

import SCREENSIZE from "../../../../constants/ScreenSize";
export default function ActionFooter(props) {
  const bottomSheetModalRef = useRef(null);

  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);
  const handleDismissModalPress = useCallback(() => {
    bottomSheetModalRef.current?.dismiss();
  }, []);

  const handleSheetChanges = useCallback((index) => {
    // console.log("handleSheetChanges", index);
  }, []);
  const snap = Platform.OS == "ios" ? "28%" : "28%";
  const snapPoints = useMemo(() => [snap, snap], []);

  const tags = ["Add Images", "Add Attachments", "Save Draft"];
  const icons = [SVGS.WHITE_IMAGE, SVGS.WHITE_ATTACHMENT, SVGS.WHITE_DRAFT];
  const bgColor = [
    COLORS.teritiaryBlue,
    COLORS.teritiaryWarning,
    COLORS.primaryTeal400,
  ];
  const renderTagSheet = () => {
    return (
      <BottomSheetModal
        ref={bottomSheetModalRef}
        index={1}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
        style={{ padding: RFValue(24, 844) }}
      >
        <View>
          <TouchableOpacity
            onPress={() => {
              props.onPressImage ? props.onPressImage() : null;
            }}
          >
            <View style={[styles.sheetTab, { marginTop: RFValue(20, 844) }]}>
              <View
                style={[styles.iconContainer, { backgroundColor: bgColor[0] }]}
              >
                <SvgUri
                  svgXmlData={icons[0]}
                  width={RFValue(24, 844)}
                  height={RFValue(24, 844)}
                />
              </View>
              <Text style={styles.sheetText}>{tags[0]}</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity>
            <View style={[styles.sheetTab, { marginTop: RFValue(20, 844) }]}>
              <View
                style={[styles.iconContainer, { backgroundColor: bgColor[1] }]}
              >
                <SvgUri
                  svgXmlData={icons[1]}
                  width={RFValue(24, 844)}
                  height={RFValue(24, 844)}
                />
              </View>
              <Text style={styles.sheetText}>{tags[1]}</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity>
            <View style={[styles.sheetTab, { marginTop: RFValue(20, 844) }]}>
              <View
                style={[styles.iconContainer, { backgroundColor: bgColor[2] }]}
              >
                <SvgUri
                  svgXmlData={icons[2]}
                  width={RFValue(24, 844)}
                  height={RFValue(24, 844)}
                />
              </View>
              <Text style={styles.sheetText}>{tags[2]}</Text>
            </View>
          </TouchableOpacity>
        </View>
      </BottomSheetModal>
    );
  };

  return (
    <View style={styles.footerWrapper}>
      <TouchableOpacity
        onPress={() => {
          handlePresentModalPress();
        }}
        style={styles.footerInner}
      >
        <View style={styles.iconView}>
          <View style={styles.iconViewBtn}>
            <TouchableOpacity>
              <SvgUri
                svgXmlData={SVGS.IMAGE}
                width={RFValue(24, 844)}
                height={RFValue(24, 844)}
                style={styles.btn}
              />
            </TouchableOpacity>
            <TouchableOpacity>
              <SvgUri
                svgXmlData={SVGS.ATTACHMENT}
                width={RFValue(24, 844)}
                height={RFValue(24, 844)}
                style={styles.btn}
              />
            </TouchableOpacity>
            <TouchableOpacity>
              <SvgUri
                svgXmlData={SVGS.BLACK_DRAFT}
                width={RFValue(24, 844)}
                height={RFValue(24, 844)}
                style={styles.btn}
              />
            </TouchableOpacity>
          </View>
          <TouchableOpacity>
            <View>
              <Text
                style={{
                  color: COLORS.monoBlack900,
                  fontSize: RFValue(24, 844),
                  alignSelf: "center",

                  marginBottom: 8,

                  textAlignVertical: "center",
                }}
              >
                ...
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
      {renderTagSheet()}
    </View>
  );
}
const styles = StyleSheet.create({
  sheetTab: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: RFValue(28, 844),
  },
  iconContainer: {
    width: RFValue(48, 844),
    height: RFValue(48, 844),
    borderRadius: RFValue(30, 844),
    alignItems: "center",
    justifyContent: "center",
  },
  sheetText: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: RFValue(16, 844),
    color: COLORS.monoBlack700,
    marginLeft: RFValue(24, 844),
  },
  iconView: {
    flexDirection: "row",
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: RFValue(20, 844),
  },
  iconViewBtn: {
    flexDirection: "row",
    height: "100%",
    width: "50%",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  btn: {
    marginRight: RFValue(30, 844),
  },
  footerInner: {
    flexDirection: "row",
    height: "100%",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: RFValue(24, 844),
  },
  footerWrapper: {
    height: "100%",
    borderTopColor: COLORS.monoGhost500,
    borderTopWidth: 1.5,
    backgroundColor: COLORS.monoWhite900,
  },
});
