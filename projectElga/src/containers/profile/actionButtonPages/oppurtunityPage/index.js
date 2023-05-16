import React, { Component } from "react";
import {
  View,
  Text,
  Image,
  Dimensions,
  TouchableWithoutFeedback,
  ScrollView,
  TextInput,
  KeyboardAvoidingView,
  ImageBackground,
  Modal,
  TouchableOpacity,
  Platform,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import SaveButtons from "../../../../components/multicellular/profile/saveButton/saveButtons";
import ProfileHeader from "../../../../components/multicellular/profile/header/header";
import IMAGES from "../../../../themes/Images";
import Styles from "./Style";
import Carousel, { Pagination } from "react-native-snap-carousel";

import { RFValue } from "react-native-responsive-fontsize";
import TextInputWithText from "../../../../components/multicellular/profile/textInput/textInput";
import COLORS from "../../../../themes/colors";
import DatePicker from "react-native-datepicker";
import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";
import MODALS from "../../../../assets/jsons/profile/oppModal";
import Tag from "../../../../components/multicellular/userCategory/tag";
import MODALSPR from "../../../../assets/jsons/profile/projectModal";
import SCREENSIZE from "../../../../constants/ScreenSize";
import InputBox from "../../../../components/multicellular/profile/actionButtonInput";
import ActionButtonFooter from "../../../../components/multicellular/profile/actionButtonFooter";
import SelectTag from "../../../../components/multicellular/profile/selectTag";
import ProjectModal from "../../../../components/multicellular/profile/modal/projectTypeModal";
const height = Dimensions.get("window").height;
const width = Dimensions.get("window").width;

export default class OppurtunityPage extends Component {
  constructor() {
    super();
    this.state = {
      activeSlide: 0,
      projectTypes: ["Paid", "Barter", "Split", "Network"],
      oppurtunityTypes: [
        "Campaign",
        "Freelance",
        "Audition",
        "Networking",
        "Internship",
        "Events",
      ],
      categories: [
        "Photographer",
        "Film Director",
        "Actor",
        "Cinematographer",
        "Video Editor",
      ],
      image: "",
      title: "lorem ipsum",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla non maecenas neque blandit. Puruslibero pellentesque porttitor velit  #openforcollaboration",
      deadline: "15-05-2015",
      selectedProjectType: "Paid",
      selectedOpportunityPage: "Campaign",
      projectBudget: "250",
      oppModal: false,
      oppModalpr: false,
      barterDetails: "lorem ipsum",
      recieverShare: "40",
      deliverables:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla non maecenas neque blandit. Puruslibero pellentesque porttitor velit  #openforcollaboration",
      activeTag: "",
      activeType: "",
    };
  }
  getPermissionAsync = async () => {
    if (Platform.OS !== "web") {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== "granted") {
        alert("Sorry, we need camera roll permissions to make this work!");
      } else {
        this.selectImage();
      }
    }
  };

  selectImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [16, 9],
        quality: 1,
      });
      if (!result.cancelled) {
        this.setState({ image: result.uri });
      }
    } catch (E) {
      console.log(E);
    }
  };

  renderAddImageCard = () => {
    return (
      <View style={Styles.addImageContainer}>
        <TouchableWithoutFeedback
          onPress={() => {
            this.getPermissionAsync();
          }}
        >
          <Image source={IMAGES.Plus} style={Styles.plusIcon} />
        </TouchableWithoutFeedback>
      </View>
    );
  };
  renderHeader = () => {
    return (
      <ProfileHeader
        text="Opportunity"
        showBackIcon={true}
        fontSize={RFValue(24, 844)}
        onBackPress={() => {
          this.props.navigation.goBack(null);
        }}
        rightComponent={() => {
          return (
            <TouchableWithoutFeedback>
              <View style={Styles.saveButton}>
                <Text style={Styles.saveText}>Post</Text>
              </View>
            </TouchableWithoutFeedback>
          );
        }}
      />
    );
  };
  renderImage = () => {
    return (
      <ImageBackground
        source={{ uri: this.state.image }}
        style={Styles.image}
        imageStyle={{ borderRadius: RFValue(16, 844) }}
      >
        <TouchableWithoutFeedback
          onPress={() => {
            this.setState({ image: "" });
          }}
        >
          <Image source={IMAGES.GreenCross} style={Styles.crossImage} />
        </TouchableWithoutFeedback>
      </ImageBackground>
    );
  };

  renderEnterTitle = () => {
    return (
      <View style={{ marginTop: RFValue(16, 844) }}>
        <InputBox multiline={false} text="Title" width={"90%"} />
      </View>
    );
  };
  renderDescription = () => {
    return (
      <View style={{ height: RFValue(200, 844) }}>
        <InputBox
          multiline={true}
          height={RFValue(200, 844)}
          placeholder="Description"
          noDivider={true}
          onChangeText={(text) => {
            //  setdescription(text);
          }}
        />
      </View>
    );
  };
  // renderOpportunityType = () => {
  //   return (
  //     <View style={{ marginTop: RFValue(24, 844) }}>
  //       <View style={Styles.textContainer}>
  //         <Text style={Styles.componentText}>Opportunity Type</Text>
  //         <TouchableWithoutFeedback
  //           onPress={() => {
  //             this.setState({
  //               oppModal: true,
  //             });
  //           }}
  //         >
  //           <Image
  //             source={IMAGES.Info}
  //             style={{ width: RFValue(24, 844), height: RFValue(24, 844) }}
  //           />
  //         </TouchableWithoutFeedback>
  //       </View>
  //       <View style={Styles.textIconContainer}>
  //         <ScrollView
  //           horizontal
  //           showsHorizontalScrollIndicator={false}
  //           overScrollMode="never"
  //         >
  //           {this.state.oppurtunityTypes.map((item, index) => {
  //             return (
  //               <TouchableWithoutFeedback
  //                 onPress={() => {
  //                   this.setState({
  //                     selectedOpportunityPage: item,
  //                   });
  //                 }}
  //               >
  //                 <View
  //                   style={[
  //                     Styles.projectTypeCard,
  //                     {
  //                       backgroundColor:
  //                         this.state.selectedOpportunityPage == item
  //                           ? COLORS.primaryTeal500
  //                           : COLORS.monoGhost500,
  //                     },
  //                   ]}
  //                 >
  //                   <Text
  //                     style={[
  //                       Styles.projectTypeCardText,
  //                       {
  //                         color:
  //                           this.state.selectedOpportunityPage == item
  //                             ? COLORS.monoWhite900
  //                             : COLORS.primaryTeal500,
  //                       },
  //                     ]}
  //                   >
  //                     {item}
  //                   </Text>
  //                 </View>
  //               </TouchableWithoutFeedback>
  //             );
  //           })}
  //         </ScrollView>
  //       </View>
  //     </View>
  //   );
  // };
  // renderDeadline = () => {
  //   return (
  //     <View style={{ marginTop: RFValue(24, 844) }}>
  //       <Text style={Styles.componentText}>Deadline</Text>
  //       <View>
  //         <DatePicker
  //           style={Styles.datePicker}
  //           date={this.state.deadline}
  //           mode="date"
  //           //placeholder="select date"
  //           format="DD-MM-YYYY"
  //           //minDate="2016-05-01"
  //           //maxDate="2016-06-01"
  //           confirmBtnText="Confirm"
  //           cancelBtnText="Cancel"
  //           showIcon={false}
  //           onDateChange={(date) => {
  //             this.setState({ deadline: date });
  //           }}
  //           customStyles={{
  //             dateText: {
  //               color: "#AAAAAA",
  //               fontFamily: "Poppins_700Bold",
  //               fontSize: RFValue(16, 844),
  //             },
  //           }}
  //         />
  //       </View>
  //     </View>
  //   );
  // };
  // renderProjectType = () => {
  //   return (
  //     <View style={{ marginTop: RFValue(24, 844) }}>
  //       <View style={Styles.textContainer}>
  //         <Text style={Styles.componentText}>Project Type</Text>
  //         <TouchableWithoutFeedback
  //           onPress={() => {
  //             this.setState({
  //               oppModalpr: true,
  //             });
  //           }}
  //         >
  //           <Image
  //             source={IMAGES.Info}
  //             style={{ width: RFValue(24, 844), height: RFValue(24, 844) }}
  //           />
  //         </TouchableWithoutFeedback>
  //       </View>
  //       <View style={Styles.textIconContainer}>
  //         <ScrollView
  //           horizontal
  //           showsHorizontalScrollIndicator={false}
  //           overScrollMode="never"
  //         >
  //           {this.state.projectTypes.map((item, index) => {
  //             return (
  //               <TouchableWithoutFeedback
  //                 onPress={() => {
  //                   this.setState({
  //                     selectedProjectType: item,
  //                   });
  //                 }}
  //               >
  //                 <View
  //                   style={[
  //                     Styles.projectTypeCard,
  //                     {
  //                       backgroundColor:
  //                         this.state.selectedProjectType == item
  //                           ? COLORS.primaryTeal500
  //                           : COLORS.monoGhost500,
  //                     },
  //                   ]}
  //                 >
  //                   <Text
  //                     style={[
  //                       Styles.projectTypeCardText,
  //                       {
  //                         color:
  //                           this.state.selectedProjectType == item
  //                             ? COLORS.monoWhite900
  //                             : COLORS.primaryTeal500,
  //                       },
  //                     ]}
  //                   >
  //                     {item}
  //                   </Text>
  //                 </View>
  //               </TouchableWithoutFeedback>
  //             );
  //           })}
  //         </ScrollView>
  //       </View>
  //     </View>
  //   );
  // };
  renderBarterDetails = () => {
    return <InputBox multiline={true} text="Barter Detail" />;
  };
  renderRecieverShare = () => {
    return (
      <InputBox
        multiline={false}
        width="70%"
        text="Reciever share (%)"
        rightComponent={() => {
          return (
            <Image
              source={IMAGES.Info}
              style={{
                width: RFValue(20, 844),
                height: RFValue(20, 844),
                borderWidth: 2,
              }}
            />
          );
        }}
      />
    );
  };
  renderProjectBudget = () => {
    return (
      <InputBox
        multiline={false}
        width="70%"
        text="Budget"
        rightComponent={() => {
          return (
            <View style={Styles.rupeesContainer}>
              <Text style={Styles.rupeesText}>₹₹₹</Text>
            </View>
          );
        }}
      />
    );
  };

  renderDeliverables = () => {
    return <InputBox multiline={false} text="Deliverables" width={"77%"} />;
  };
  // renderLookingFor = () => {
  //   return (
  //     <View
  //       style={{ marginTop: RFValue(24, 844), marginBottom: RFValue(24, 844) }}
  //     >
  //       <Text style={Styles.componentText}>Looking For</Text>
  //       <TouchableWithoutFeedback
  //         onPress={() => {
  //           this.props.navigation.navigate("EditCategory", {
  //             identity: "Creator",
  //             categories: this.state.categories,
  //           });
  //         }}
  //       >
  //         <View style={Styles.pricingPlusContainer}>
  //           <Image source={IMAGES.Plus} style={Styles.icon} />
  //         </View>
  //       </TouchableWithoutFeedback>
  //       <View
  //         style={{
  //           flexDirection: "row",
  //           flexWrap: "wrap",
  //           marginTop: RFValue(24, 844),
  //         }}
  //       >
  //         {this.state.categories.map((category, index) => {
  //           return (
  //             <Tag
  //               category={category}
  //               onPress={() => {
  //                 const categories = this.state.categories;
  //                 categories.splice(index, 1);
  //                 this.setState({
  //                   categories: [...categories],
  //                 });
  //               }}
  //               key={index}
  //             />
  //           );
  //         })}
  //       </View>
  //     </View>
  //   );
  // };
  renderInputs = () => {
    return (
      <View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginLeft: RFValue(16, 844),
            marginTop: RFValue(16, 844),
          }}
        >
          <SelectTag
            tags={["Campaign", "Freelance", "Audition", "Event"]}
            title="Select Type"
            onPressInfo={() => {
              this.setState({
                oppModal: true,
              });
            }}
            onPress={(tag) => {
              this.setState({
                activeType: tag,
              });
            }}
          />
          <View style={{ marginLeft: 8 }}>
            <SelectTag
              tags={["Paid", "Barter", "Split", "Network"]}
              title="Select Tag"
              onPress={(tag) => {
                this.setState({
                  activeTag: tag,
                });
              }}
              onPressInfo={() => {
                this.setState({
                  oppModalpr: true,
                });
              }}
            />
          </View>
        </View>
        {this.renderEnterTitle()}
        {this.state.activeTag == "Split"
          ? this.renderRecieverShare()
          : this.state.activeTag == "Barter"
          ? this.renderBarterDetails()
          : this.state.activeTag == "Paid"
          ? this.renderProjectBudget()
          : null}
        {this.renderDeliverables()}
        {this.renderDescription()}
      </View>
    );
  };

  _renderItem({ item, index }) {
    return (
      <TouchableWithoutFeedback>
        <View
          style={{
            backgroundColor: COLORS.monoWhite900,

            shadowColor: "#555555",
            shadowOpacity: 0.05,
            elevation: 3,
            shadowOffset: {
              width: 0,
              height: 2,
            },
            height: RFValue(340, 844),
            alignItems: "center",
            borderRadius: RFValue(16, 844),
            paddingHorizontal: RFValue(36, 844),
            paddingVertical: RFValue(32, 844),
          }}
        >
          <Image source={item.image} style={{ width: "100%", height: "50%" }} />

          <Text
            style={{
              marginTop: RFValue(32, 844),
              fontFamily: "Poppins_600SemiBold",
              fontSize: RFValue(16, 844),
              color: COLORS.monoBlack700,
            }}
          >
            {item.title}
          </Text>

          <Text
            style={{
              marginTop: RFValue(12, 844),
              fontFamily: "Poppins_400Regular",
              fontSize: RFValue(12, 844),
              color: COLORS.monoBlack500,
              textAlign: "center",
            }}
          >
            {item.subtitle}
          </Text>
        </View>
      </TouchableWithoutFeedback>
    );
  }
  get pagination() {
    const entries = this.state.oppModal ? MODALS : MODALSPR;
    return (
      <Pagination
        dotsLength={entries.length}
        activeDotIndex={this.state.activeSlide}
        containerStyle={{ backgroundColor: "rgba(0, 0, 0, 0)" }}
        dotStyle={{
          width: 24,
          height: 10,
          borderRadius: 5,
          marginHorizontal: Platform.OS == "ios" ? 8 : 4,
          backgroundColor: "#696969",
        }}
        inactiveDotStyle={{
          width: 15,
          height: 15,
          borderRadius: 8,
          marginHorizontal: Platform.OS == "ios" ? 4 : 2,
          backgroundColor: COLORS.monoWhite900,
        }}
        inactiveDotOpacity={1}
      />
    );
  }

  renderModal() {
    return (
      <Modal
        transparent={true}
        animationType="fade"
        visible={this.state.oppModal}
      >
        <TouchableWithoutFeedback
          onPress={() => {
            this.setState({
              oppModal: false,
              activeSlide: 0,
            });
          }}
        >
          <View
            style={{
              width: "100%",
              height: "100%",
              justifyContent: "center",
              alignItems: "center",
              shadowOpacity: 0.05,

              backgroundColor: "#0000004a",
              borderRadius: RFValue(16, 844),
            }}
          >
            <View
              style={{
                width: RFValue(260, 844),

                alignSelf: "center",
              }}
            >
              <Carousel
                ref={(c) => {
                  this._carousel = c;
                }}
                data={MODALS}
                renderItem={this._renderItem}
                sliderWidth={RFValue(260, 844)}
                itemWidth={RFValue(260, 844)}
                onSnapToItem={(index) => this.setState({ activeSlide: index })}
              />
              <TouchableWithoutFeedback>
                {this.pagination}
              </TouchableWithoutFeedback>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    );
  }

  render() {
    return (
      <BottomSheetModalProvider>
        <View style={{ backgroundColor: COLORS.monoWhite900, height: "100%" }}>
          <KeyboardAwareScrollView style={Styles.wrapper}>
            <View
              style={{
                paddingRight: RFValue(8, 844),
                paddingLeft: RFValue(16, 844),
              }}
            >
              {this.renderHeader()}
            </View>
            <ScrollView
              keyboardShouldPersistTaps="never"
              showsVerticalScrollIndicator={false}
              overScrollMode="always"
              contentContainerStyle={Styles.bodyWrapper}
            >
              <View style={{ paddingHorizontal: RFValue(16, 844) }}>
                {this.state.image == ""
                  ? this.renderAddImageCard()
                  : this.renderImage()}
              </View>
              {this.renderInputs()}
            </ScrollView>
          </KeyboardAwareScrollView>

          <View
            style={{
              height: "10%",
              position: "absolute",
              marginTop: height - height / 10,
              width: "100%",
            }}
          >
            <ActionButtonFooter />
          </View>

          <ProjectModal
            visible={this.state.oppModal}
            onPress={() => {
              this.setState({
                oppModal: false,
              });
            }}
            data={MODALS}
          />
          <ProjectModal
            visible={this.state.oppModalpr}
            onPress={() => {
              this.setState({
                oppModalpr: false,
              });
            }}
            data={MODALSPR}
          />
        </View>
      </BottomSheetModalProvider>
    );
  }
}
