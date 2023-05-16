import React, { Component } from "react";
import { RFValue } from "react-native-responsive-fontsize";
import {
  View,
  Image,
  TouchableWithoutFeedback,
  Dimensions,
  Text,
} from "react-native";
import COLORS from "../../../../themes/colors";
import WebView from "react-native-webview";
import { LinearGradient } from "expo-linear-gradient";
const cheerio = require("cheerio");
const getUrls = require("get-urls");
const fetch = require("node-fetch");
const width = Dimensions.get("window").width - RFValue(32, 844);

export default class InstaComp extends Component {
  constructor() {
    super();
    this.state = {
      clicked: false,
      extract: "",
    };
  }
  componentDidMount() {
    console.log("this.props.value?.permalink", this.props.permalink);
    this.handleExtract(this.props.value?.permalink);
  }
  handleExtract = async (url) => {
    const res = await fetch(url);
    const html = await res.text();
    const $ = cheerio.load(html);
    const extract = {
      url,
      title: $("title").first().text(),
      favicon:
        $('link[rel="shortcut icon"]').attr("href") ||
        $('link[rel="icon"]').attr("href"),
      description:
        $('meta[property="og:description"]').attr("content") ||
        $('meta[name="description"]').attr("content"),
      image: $('meta[property="og:image"]').attr("content"),
      video:
        $('meta[property="og:_aato _ab1k _ab1l"]').attr("content") ||
        $('meta[property="og:_aato _ab1k _ab1l:url"]').attr("content"),
    };
    this.setState({
      extract: extract,
    });
    return extract;
  };
  render() {
    console.log("extract", this.state.extract);
    return (
      <TouchableWithoutFeedback onPress={this.props.onPress}>
        <View
          style={{
            width: "33%",
            height: undefined,
            aspectRatio: 1 / 1,
            margin: 0.5,
            zIndex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Image
            source={{
              uri: this.state.extract?.image,
            }}
            style={{
              width: "100%",
              height: "100%",
              resizeMode: "cover",

              borderBottomLeftRadius:
                this.props.index == 3 ? RFValue(16, 844) : null,
              borderBottomRightRadius:
                this.props.index == 5 ? RFValue(16, 844) : null,
            }}
          />
        </View>
      </TouchableWithoutFeedback>
    );
  }
}
