import mirrorKeyValue from "mirror-key-value";

/* ------------- Types ------------- */

export const locationTypes = mirrorKeyValue([
  "SEND_LOCATION_DATA",
  "SEND_LOCATION_DATA_INDICATOR",
  "SEND_LOCATION_DATA_SUCCESS",
  "SEND_LOCATION_DATA_FAILED",
]);

const {
  SEND_LOCATION_DATA,
  SEND_LOCATION_DATA_INDICATOR,
  SEND_LOCATION_DATA_SUCCESS,
  SEND_LOCATION_DATA_FAILED,
} = locationTypes;

/* ------------- Initial State ------------- */
//doing this
const INITIAL_STATE = {
  locationData: [],
  loading: false,
  error: false,
  errorMsg: "",
  isLocationSuccess:false
};

/* ------------- Reducer ------------- */

export default function reducer(state = INITIAL_STATE, action) {
  const { type, data } = action;
  switch (type) {
    case SEND_LOCATION_DATA:
      return { ...state, ...data };
    case SEND_LOCATION_DATA_INDICATOR:
      return {
        ...state,
        loading: true,
        errorMsg: "",
        error: false,
        isLocationSuccess:false
      };
    case SEND_LOCATION_DATA_SUCCESS:
      const locationData = action.response.data;
      return {
        ...state,
        loading: false,
        error: false,
        errorMsg: "",
        locationData: action.response.data,
        isLocationSuccess:true
      };
    case SEND_LOCATION_DATA_FAILED:
      //console.log("response in reducer error >>",action.message)

      return {
        ...state,
        loading: false,
        errorMsg: action.message,
        error: true,
        isLocationSuccess:false
      };

    default:
      return state;
  }
}
