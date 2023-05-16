import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

import STORAGE_KEY from "../constants/StorageKeys";
import URLS from "../constants/Urls";
import logout from "../utils/Logout";
import navigationService from "../utils/NavigationClass";

const instance = axios.create({
  baseURL: URLS.BASE_URL,
  headers: { "Content-Type": "application/json" },
});
const instanceV2 = axios.create({
  baseURL: URLS.BASE_URL_V2,
  headers: { "Content-Type": "application/json" },
});

instance.interceptors.request.use(
  async (config) => {
    const accessToken = await AsyncStorage.getItem(STORAGE_KEY.ACCESS_TOKEN);
    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);
instance.interceptors.response.use(
  (response) => {
    return response;
  },
  async function (error) {
    const originalRequest = error.config;
    let refreshToken = await AsyncStorage.getItem(STORAGE_KEY.REFRESH_TOKEN);
    if (refreshToken && error.response.status === 401) {
      originalRequest._retry = true;
      const headers = {
        Authorization: `Bearer ${refreshToken}`,
      };
      return axios
        .get(`http://35.154.198.31:8080/elga-roma/token/regenerate`,
          {
            headers: headers
          })
        .then(async (res) => {
          if (res.status === 200) {
            await AsyncStorage.setItem(STORAGE_KEY.ACCESS_TOKEN, res.data.access_token);
            await AsyncStorage.setItem(STORAGE_KEY.REFRESH_TOKEN, res.data.refresh_token);
            originalRequest.headers["Authorization"] = `Bearer ${res.data.access_token}`;
            return axios(originalRequest);
          } else {
            logout();
            Promise.reject(error);
          }
        })
        .catch((error) => {
          logout();
          Promise.reject(error);
        });
    }
    return Promise.reject(error);
  }
);

export function makePostApiCall(apiUrl, body, token, params, contentType) {
  const headers = {
    "Content-Type": contentType ? contentType : "application/json",
    Authorization: `Bearer ${token}`,
  };
  // console.log("headers>>",headers);
  // console.log("params>>",params);
  // console.log("apiUrl>>",apiUrl);
  // console.log("body>>",body);

  return instance
    .post(apiUrl, body, { headers: headers, params: params })
    .then((responseJson) => {
      // console.log("responseJson>>",apiUrl,responseJson);
      return responseJson.data;
    })
    .catch((error) => {
      console.log("error>>", error);
    });
}

export function makePostApiCallV2(apiUrl, body, token, params, contentType) {
  const headers = {
    // "Content-Type": contentType ? contentType : "application/json",
    Authorization: `Bearer ${token}`,
  };
  // console.log("headers>>",headers);
  // console.log("params>>",params);
  // console.log("apiUrl>>",apiUrl);
  return instanceV2
    .post(apiUrl, body, { headers: headers, params: params })
    .then((responseJson) => {
      return responseJson.data;
    })
    .catch((error) => {
      console.log("POST REQ ERROR: ", error);
    });
}

export function makePutApiCall(apiUrl, body, token, params) {
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
  return instance
    .put(apiUrl, body, { headers: headers, params: params })
    .then((responseJson) => {
      return responseJson.data;
    })
    .catch((error) => {
      if (401 === error.response.status) {
      }
      console.log("PUT REQ ERROR: ", error);
    });
}

export function makeGetApiCall(apiUrl, params, token, contentType) {
  const headers = {
    Authorization: `Bearer ${token}`,
    // "Content-Type": contentType ? contentType : "application/json",
  };
  // console.log("headers>>",headers);
  // console.log("params>>",params);
  // console.log("apiUrl>>",apiUrl);
  return instance
    .get(apiUrl, { headers: headers, params: params })
    .then((responseJson) => {
      // console.log("responseJson>>",apiUrl,responseJson);
      return responseJson.data;
    })
    .catch((error) => {
      console.log("GET REQ ERROR: ", error);
      return error;
    });
}
export function makeGetApiCallWithoutStatus(apiUrl, params, token, contentType) {
  const headers = {
    Authorization: `Bearer ${token}`,
    "Content-Type": contentType ? contentType : "application/json",
  };
  return instance
    .get(apiUrl, { headers: headers, params: params })
    .then((responseJson) => {
      return responseJson;
    })
    .catch((error) => {
      console.log("GET REQ ERROR: sign up ", error);
      return error;
    });
}
export function makeGetApiV2Call(apiUrl, params, token) {

  const headers = {
    Authorization: `Bearer ${token}`,
  };
  return instanceV2
    .get(apiUrl, { headers: headers, params: params })
    .then((responseJson) => {
      return responseJson.data;
    })
    .catch((error) => {
      console.log("GET REQ ERROR: ", error);
      return error;
    });
}

export function makeDeleteApiCall(apiUrl, params, token) {
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  // console.log("headers>>",headers);
  // console.log("params>>",params);
  // console.log("apiUrl>>",apiUrl);
  return instance
    .delete(apiUrl, { headers: headers, params: params })
    .then((responseJson) => {
      // console.log("responseJson>>",JSON.stringify(responseJson));
      return responseJson.data;
    })
    .catch((error) => {
      console.log("GET REQ ERROR: ", error);
      return error;
    });
}
export function makeDeleteApiV2Call(apiUrl, params, token) {
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  // console.log("headers>>",headers);
  // console.log("params>>",params);
  // console.log("apiUrl>>",apiUrl);

  return instanceV2
    .delete(apiUrl, { headers: headers, params: params })
    .then((responseJson) => {
      return responseJson.data;
    })
    .catch((error) => {
      console.log("GET REQ ERROR: ", error);
      return error;
    });
}
export function makeUploadImageApiCall(apiUrl, params) {
  return instance
    .post(apiUrl, params)
    .then((responseJson) => {
      return responseJson.data;
    })
    .catch((error) => {
      if (401 === error.response.status) {
      }
      alert("POST REQ ERROR: ", error);
    });
}
