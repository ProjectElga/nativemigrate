import React, { Component } from "react";
import { View, Text, StyleSheet, TextInput ,TouchableWithoutFeedback} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import COLORS from "../../../../themes/colors";
import { RFValue } from "react-native-responsive-fontsize";
import Filter from "../../discover/discoverFilter";

export default class SearchBarWithFilter extends Component {
  render() {
    return (
      // <View style={styles.inputWrapper}>
      //   <TouchableWithoutFeedback
      //     onPress={() => {
      //       this.props.onPress ? this.props.onPress() : null;
      //     }}
      //   >
      //     <View
      //       style={[
      //         styles.searchSection,
      //         {
      //           backgroundColor: this.props.bgColor
      //             ? this.props.bgColor
      //             : COLORS.monoWhite900,
      //         },
      //       ]}
      //     >
      //       {this.props.enableInput ? (
      //         <TextInput
      //           value={this.props.value}
      //           autoFocus
      //           style={styles.activeInput}
      //           placeholder="Search"
      //           placeholderTextColor={COLORS.monoBlack500}
      //           underlineColorAndroid="transparent"
      //           onChangeText={(text) => {
      //             this.props.onChangeText(text);
      //           }}
      //         />
      //       ) : (
      //         <View
      //           style={[
      //             styles.input,
      //             { width: this.props.filter ? "70%" : "90%" },
      //           ]}
      //         >
      //           <Text style={styles.inputText}>Search</Text>
      //         </View>
      //       )}
      //       {this.props.icon ? (
      //         this.props.icon()
      //       ) : (
      //         <Icon
      //           style={styles.searchIcon}
      //           name="ios-search"
      //           size={20}
      //           color="#aaaaaa"
      //         />
      //       )}
      //     </View>
      //   </TouchableWithoutFeedback>
      //
      // </View>
      <View style={styles.inputWrapper}>
         <TouchableWithoutFeedback
          onPress={() => {
            this.props.onPress ? this.props.onPress() : null;
          }}
        >
        <View
          style={[
            styles.searchSection,
            {
              backgroundColor: this.props.bgColor
                ? this.props.bgColor
                : COLORS.monoWhite900,
              width: this.props.filter ? "83%" : "100%",
            },
          ]}
        >
          {this.props.enableInput ? (
            <TextInput
              value={this.props.value}
              //autoFocus
              style={styles.activeInput}
              placeholder="Search"
              placeholderTextColor={COLORS.monoBlack500}
              underlineColorAndroid="transparent"
              onChangeText={(text) => {
                this.props.onChangeText(text);
              }}
              onFocus={()=>{
                this.props.onFocus ? this.props.onFocus() : null;
              }}
              returnKeyType={this.props.returnKeyType}
              onSubmitEditing={this.props.onSubmitEditing}
            />
          ) : (
            <View style={styles.input}>
              <Text style={styles.inputText}>Search</Text>
            </View>
          )}
          {this.props.icon ? (
            this.props.icon()
          ) : (
            <TouchableWithoutFeedback onPress={()=>{
              this.props.onIconPress ? this.props.onIconPress() : null;
            }}>
            <Icon
              style={styles.searchIcon}
              name="ios-search"
              size={20}
              color="#aaaaaa"
            />
            </TouchableWithoutFeedback>
          )}
        </View>
        </TouchableWithoutFeedback>
        <View style={{ zIndex: 1 }}>
          {this.props.filter ? this.props.filter() : null}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  inputWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    zIndex: 1,
    height: RFValue(55, 844),
    
  },
  searchSection: {
    // flex: 2,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: RFValue(4, 844),
    borderRadius: RFValue(12, 844),
    paddingHorizontal: RFValue(16, 844),
    width: "100%",
    height: "100%",
  },
  input: {
    paddingRight: RFValue(10, 844),
    paddingLeft: 0,
    //alignItems: "",
    width: "80%",
  },
  activeInput: {
    paddingRight: RFValue(10, 844),
    paddingLeft: 0,
    color: COLORS.monoBlack900,
    fontFamily: "Poppins_500Medium",
    fontSize: RFValue(14, 844),
    alignItems: "center",

    width: "80%",
  },
  inputText: {
    color: COLORS.monoBlack500,
    fontFamily: "Poppins_500Medium",
    fontSize: RFValue(14, 844),
  },
  searchIcon: {
    padding: RFValue(10, 844),
  },
});
