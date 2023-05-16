import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  StyleSheet,
  View,
  Alert,
  Modal,
  Dimensions,
  TouchableOpacity,
  Image,
} from "react-native";
import qs from "qs";
import axios from "axios";
import { WebView } from "react-native-webview";
import SvgUri from "expo-svg-uri";
import SVGS from "../../constants/SvgUri";
const { width, height } = Dimensions.get("window");

const patchPostMessageJsCode = `(${String(function () {
  var originalPostMessage = window.postMessage;
  var patchedPostMessage = function (message, targetOrigin, transfer) {
    originalPostMessage(message, targetOrigin, transfer);
  };
  patchedPostMessage.toString = function () {
    return String(Object.hasOwnProperty).replace(
      "hasOwnProperty",
      "postMessage"
    );
  };
  window.postMessage = patchedPostMessage;
})})();`;

export default class Instagram extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      key: 1,
    };
  }

  show() {
    this.setState({ modalVisible: true });
  }

  hide() {
    this.setState({ modalVisible: false });
  }
  async handleUsernameFromLongliveAccessToken(userId, accessToken) {
    console.log("userId>>", userId);
    console.log("accessToken>>", accessToken);
    let httpUserName = axios.create({
      baseURL: "https://graph.instagram.com",
    });
    let param = {
      access_token: res.data.access_token,
      fields: "username,id",
    };
    let resUserName = await httpUserName
      .get(`v11.0/${userId}`, { params: param })
      .catch((error) => {
        console.log(error.response);
        this.props.onLoginFailure(results);
      });

    if (resUserName) {
      console.log("resUser>>", resUserName);
    } else {
      this.props.onLoginFailure(results);
    }
  }
  async apiInstagramForUserName(appSecret, access_token, results,user_id) {
    let httpUser = axios.create({
      baseURL: "https://graph.instagram.com",
    });
    let param = {
      client_secret: appSecret,
      access_token: access_token,
      grant_type: "ig_exchange_token",
    };
    let resUser = await httpUser
      .get("/access_token", { params: param })
      .catch((error) => {
        console.log(error.response);
        this.props.onLoginFailure(results);
      });

    if (resUser) {
      console.log("resUser>>", resUser.data.access_token);
      let userId = user_id;
      let accessToken = resUser.data.access_token;
      console.log("userId>>", userId);
      console.log("accessToken>>", accessToken);
      let httpUserName = axios.create({
        baseURL: "https://graph.instagram.com",
      });
      let param = {
        access_token: accessToken,
        fields: "username,id",
      };
      let resUserName = await httpUserName
        .get(`v11.0/${userId}`, { params: param })
        .catch((error) => {
          console.log(error.response);
          this.props.onLoginFailure(results);
        });

      if (resUserName) {
        console.log("resUserName>>", resUserName.data.username);
        this.props.onLoginSuccess({ access_token: accessToken, userId, username: resUserName.data.username })
      } else {
        this.props.onLoginFailure(results);
      }
    } else {
      this.props.onLoginFailure(results);
    }
    this.props.onLoginSuccess(res.data, results);

  }
  async onNavigationStateChange(webViewState) {
    const { url } = webViewState;
    const { key } = this.state;
    const { appId, appSecret, redirectUrl, responseType } = this.props;

    if (
      webViewState.title === "Instagram" &&
      webViewState.url === "https://www.instagram.com/"
    ) {
      this.setState({ key: key + 1 });
    }
    if (url && url.startsWith(this.props.redirectUrl)) {
      this.webView.stopLoading();
      const match = url.match(/(#|\?)(.*)/);
      const results = qs.parse(match[2]);
      console.log("results>>", results);
      this.hide();
      if (results.access_token) {
        // Keeping this to keep it backwards compatible, but also returning raw results to account for future changes.
        // this.props.onLoginSuccess(results.access_token, results);
        this.apiInstagramForUserName(appSecret, results.access_token, results)

      } else if (results.code) {
        //Fetching to get token with appId, appSecret and code
        let { code } = results;
        code = code.split("#_").join("");
        if (responseType === "code" && !appSecret) {
          if (code) {
            this.apiInstagramForUserName(appSecret, code, results)
          } else {
            this.props.onLoginFailure(results);
          }
        } else {
          let headers = { "Content-Type": "application/x-www-form-urlencoded" };
          let http = axios.create({
            baseURL: "https://api.instagram.com/oauth/access_token",
            headers: headers,
          });
          let form = new FormData();
          form.append("client_id", appId);
          form.append("client_secret", appSecret);
          form.append("grant_type", "authorization_code");
          form.append("redirect_uri", redirectUrl);
          form.append("code", code);
          let res = await http.post("/", form).catch((error) => {
            console.log(error.response);
            return false;
          });

          if (res) {
            console.log("res>>", res);
            this.apiInstagramForUserName(appSecret, res.data.access_token, results, res.data.user_id)
          }

          else {
            this.props.onLoginFailure(results);
          }
        }
      } else {
        this.props.onLoginFailure(results);
      }
    }
  }

  onMessage(reactMessage) {
    try {
      const json = JSON.parse(reactMessage.nativeEvent.data);
      if (json && json.error_type) {
        this.hide();
        this.props.onLoginFailure(json);
      }
    } catch (err) { }
  }

  renderClose() {
    const { renderClose } = this.props;
    if (renderClose) {
      return renderClose();
    }
    return (
      <SvgUri width={20} height={20} svgXmlData={SVGS.GREYCLOSE} />
    );
  }

  onClose() {
    const { onClose } = this.props;
    if (onClose) {
      onClose();
    }
    // Reuse hide state update logic
    this.hide();
  }

  renderWebview() {
    const { appId, appSecret, redirectUrl, scopes, responseType } = this.props;
    const { key } = this.state;

    let ig_uri = `https://api.instagram.com/oauth/authorize/?client_id=${appId}&redirect_uri=${redirectUrl}&response_type=${responseType}&scope=${scopes.join(
      ","
    )}`;

    return (
      <WebView
        {...this.props}
        key={key}
        style={[styles.webView, this.props.styles.webView]}
        source={{ uri: ig_uri }}
        startInLoadingState
        onNavigationStateChange={this.onNavigationStateChange.bind(this)}
        onError={this.onNavigationStateChange.bind(this)}
        onMessage={this.onMessage.bind(this)}
        ref={(webView) => {
          this.webView = webView;
        }}
        injectedJavaScript={patchPostMessageJsCode}
      />
    );
  }

  render() {
    const { wrapperStyle, containerStyle, closeStyle } = this.props;

    // Bind onClose to onRequestClose callback rather than hide to ensure that the (optional)
    // onClose callback provided by client is called when dialog is dismissed
    return (
      <Modal
        animationType={"slide"}
        visible={this.state.modalVisible}
        onRequestClose={this.onClose.bind(this)}
        transparent
      >
        <View style={[styles.container, containerStyle]}>
          <View style={[styles.wrapper, wrapperStyle]}>
            {this.renderWebview()}
          </View>
          <TouchableOpacity
            onPress={() => this.onClose()}
            style={[styles.close, closeStyle]}
            accessibilityComponentType={"button"}
            accessibilityTraits={["button"]}
          >
            {this.renderClose()}
          </TouchableOpacity>
        </View>
      </Modal>
    );
  }
}
const propTypes = {
  appId: PropTypes.string.isRequired,
  appSecret: PropTypes.string,
  redirectUrl: PropTypes.string,
  scopes: PropTypes.array,
  onLoginSuccess: PropTypes.func,
  modalVisible: PropTypes.bool,
  onLoginFailure: PropTypes.func,
  responseType: PropTypes.string,
  containerStyle: PropTypes.object,
  wrapperStyle: PropTypes.object,
  closeStyle: PropTypes.object,
};

const defaultProps = {
  redirectUrl: "https://google.com",
  styles: {},
  scopes: ["user_profile", "user_media"],
  onLoginSuccess: (token) => {
    Alert.alert("Alert Title", "Token: " + token, [{ text: "OK" }], {
      cancelable: false,
    });
  },
  onLoginFailure: (failureJson) => {
    console.debug(failureJson);
  },
  responseType: "code",
};

Instagram.propTypes = propTypes;
Instagram.defaultProps = defaultProps;

const styles = StyleSheet.create({
  webView: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    paddingVertical: 40,
    paddingHorizontal: 10,
  },
  wrapper: {
    flex: 1,
    borderRadius: 5,
    borderWidth: 5,
    borderColor: "rgba(0, 0, 0, 0.6)",
  },
  close: {
    position: "absolute",
    top: 35,
    right: 5,
    backgroundColor: "#000",
    borderWidth: 2,
    borderColor: "rgba(0, 0, 0, 0.4)",
    width: 30,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 15,
  },
  imgClose: {
    width: 30,
    height: 30,
  },
});
