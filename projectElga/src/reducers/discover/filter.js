import mirrorKeyValue from "mirror-key-value";

/* ------------- Types ------------- */

export const filterStates = mirrorKeyValue([
  "RESET_FILTER",
  "SET_PLATFORM",
  "SET_BUSINESS_PROFILE",
  "SET_DISTANCE",
  "SET_TRENDING",
  "SET_FILTER_A",
  "SET_FILTER_B",
  "SET_FILTER_C",
]);

const {
  RESET_FILTER,
  SET_PLATFORM,
  SET_BUSINESS_PROFILE,
  SET_DISTANCE,
  SET_TRENDING,
  SET_FILTER_A,
  SET_FILTER_B,
  SET_FILTER_C,
} = filterStates;

/* ------------- Initial State ------------- */

const INITIAL_STATE = {
  isFilterUpdated: false,
  platform: "INSTAGRAM",
  distance: 1000000,
  trending: false,
  businessProfile: false,
  minFilterA: 0,
  maxFilterA: 100000,
  minFilterB: 0,
  maxFilterB: 100000,
  minFilterC: 0,
  maxFilterC: 100000,
};

/* ------------- Reducer ------------- */

export default function reducer(state = INITIAL_STATE, action) {
  const { type, data } = action;
  switch (type) {
   
    case SET_PLATFORM:

      return {
        ...state,
        platform: action.platform,
      };
    case SET_BUSINESS_PROFILE:
      return {
        ...state,
        businessProfile: action.businessProfile,
      };
    case SET_DISTANCE:
      return {
        ...state,
        distance: action.distance,
      };
    case SET_TRENDING:
      return {
        ...state,
        trending: action.trending,
      };
    case SET_FILTER_A:
      console.log("action",action)
      return {
        ...state,
        minFilterA: action.minFilterA,
        maxFilterA: action.maxFilterA,
      };
    case SET_FILTER_B:
      console.log("state",state)
      return {
        ...state,
        minFilterB: action.minFilterB,
        maxFilterB: action.maxFilterB,
      };
    case SET_FILTER_C:
      return {
        ...state,
        minFilterC: action.minFilterC,
        maxFilterC: action.maxFilterC,
      };

    case RESET_FILTER:
      return {
        ...state,
        platform: null,
        distance: null,
        trending: false,
        businessProfile: false,
        minFilterA: 0,
        maxFilterA: 100000,
        minFilterB: 0,
        maxFilterB: 100000,
        minFilterC: 0,
        maxFilterC: 100000,
      };
    default:
      return state;
  }
}
