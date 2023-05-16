// import React, { Component } from "react";
// import { View } from "react-native";
// import SocialButton from "../../../components/multicellular/social/SocialButton";
// import Input from "../../../components/multicellular/social/Input";
// import IdentityHeader from "../../../components/multicellular/identity/header/header";
// import styles from "./Style";
// import IMAGES from "../../../themes/Images";
// import Footer from "../../../components/multicellular/general/onBoardFooter/Footer";
// import { UserMetaTypes } from "../../../reducers/onboard/userMeta";
// import { connect } from "react-redux";
// import STRINGS from "../../../constants/Strings";
// import { makePostApiCall } from "../../../api";
// import URLS from "../../../constants/Urls";
// import SnackBar from "../../../components/unicellular/snackbar";
// import { RFValue } from "react-native-responsive-fontsize";

// class Social extends Component {
//   constructor() {
//     super();
//     this.state = {
//       instagramPress: false,
//       youtubePress: false,
//       showNextButton: true,
//       username: "",
//       error: false,
//     };
//   }
//   handleNextButtonClick = async () => {
//     // this.props.navigation.navigate("Profile");
//     const userId = STRINGS.USER_ID;
//     const tokenDetail = STRINGS.TOKEN;
//     try {
//       if (this.state.username !== "") {
//         const params = {
//           userId: userId,
//           username: this.state.username,
//         };
//         let response = await makePostApiCall(
//           URLS.API_ASSIGN_USER_IDENTITY,
//           params,
//           tokenDetail,
//           params
//         );
//         if (typeof response.status !== "undefined" && response.status) {
//           this.props.navigation.navigate("CreatorProfile");
//         } else {
//           this.setState({ error: true });
//         }
//       } else {
//         this.setState({ error: true });
//       }
//     } catch (error) {
//       this.setState({ error: true });
//     }
//   };
//   _renderHeaderText = () => {
//     const userId = this.props.navigation.getParam("userId");
//     const tokenDetail = this.props.navigation.getParam("tokenDetail");
//     return (
//       <IdentityHeader
//         onPress={() => {
//           this.props.navigation.navigate("Profile", {
//             selfView: true,
//             userId: userId,
//             tokenDetail: tokenDetail,
//           });
//         }}
//         title="Socials"
//         subtitle="Link you Socal Media"
//         details="It enhances the visibility of your porfile & makes you more discoverable (Link at least one social channel)"
//       />
//     );
//   };
//   _renderInstagramButton = () => {
//     const { userMeta: { instagramUsername = "" } = {} } = this.props.userMeta;
//     if (this.state.instagramPress) {
//       return (
//         <Input
//           placeholder="Enter Username"
//           value={this.state.username}
//           onChangeText={(value) => {
//             this.setState({
//               username: value,
//             });
//           }}
//           image={IMAGES.Instagram}
//         />
//       );
//     } else {
//       return (
//         <SocialButton
//           gradient={["#FEDA77", "#F58529", "#DD2A7B", "#8134AF", "#515BD4"]}
//           image={IMAGES.Instagram}
//           onPress={() => {
//             this.setState({ instagramPress: true, youtubePress: false });
//           }}
//           text={
//             instagramUsername && instagramUsername !== ""
//               ? instagramUsername
//               : "Link your Instagram"
//           }
//         />
//       );
//     }
//   };
//   _renderYoutubeButton = () => {
    
//     if (this.state.youtubePress) {
//       return <Input placeholder="Enter channel link" image={IMAGES.Youtube} />;
//     } else {
//       return (
//         <SocialButton
//           width={RFValue(30, 844)}
//           gradient={["#FF2221", "#E70100"]}
//           height={RFValue(30, 844)}
//           image={IMAGES.Youtube}
//           onPress={() => {
//             this.setState({ youtubePress: true, instagramPress: false });
//           }}
//           text="Link your Youtube"
//         />
//       );
//     }
//   };

//   render() {
//     return (
//       <View style={styles.wrapper}>
//         <View style={styles.topContainer}>
//           {this._renderHeaderText()}
//           <View style={styles.buttonContainer}>
//             {this._renderInstagramButton()}
//             {this._renderYoutubeButton()}
//           </View>
//         </View>
//         {this.state.error && (
//           <SnackBar
//             visible={this.state.error}
//             onDismiss={() => {
//               this.setState({ error: false });
//             }}
//             text={STRINGS.USER_NAME_INVALID}
//           />
//         )}
//         <Footer
//           currentPosition={3}
//           showBackText={true}
//           positionRelative
//           showNextButton={true}
//           onBackPress={() => {
//             this.props.navigation.goBack(null);
//           }}
//           onNextPress={this.handleNextButtonClick}
//         />
//       </View>
//     );
//   }
// }
// const mapStateToProps = (state) => {
//   const { userMeta, signup } = state;
//   return { userMeta, signup };
// };

// const mapDispatchToProps = (dispatch) => ({
//   callUserMetaApi: (userId, tokenDetail) => {
//     dispatch({
//       type: UserMetaTypes.FETCH_USER_META,
//       userId,
//       tokenDetail,
//     });
//   },
// });

// export default connect(mapStateToProps, mapDispatchToProps)(Social);
