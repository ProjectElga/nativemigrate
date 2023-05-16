import mirrorKeyValue from "mirror-key-value";
import AsyncStorage from "@react-native-async-storage/async-storage";
import STORAGE_KEY from "../../constants/StorageKeys";

/* ------------- Types ------------- */

export const regenerateTokenTypes = mirrorKeyValue([
    "REGENERATE_TOKEN",
    "REGENERATE_TOKEN_INDICATOR",
    "REGENERATE_TOKEN_SUCCESS",
    "REGENERATE_TOKEN_FAILED",
    "RESET_REGENERATE_TOKEN",
]);

const {
    REGENERATE_TOKEN,
    REGENERATE_TOKEN_INDICATOR,
    REGENERATE_TOKEN_SUCCESS,
    REGENERATE_TOKEN_FAILED,
    RESET_REGENERATE_TOKEN,
} = regenerateTokenTypes;

/* ------------- Initial State ------------- */

const INITIAL_STATE = {
    loading: false,
    error: false,
    errorMsg: "",
    data: {},
    isGenerated: false
};

/* ------------- Reducer ------------- */

export default function reducer(state = INITIAL_STATE, action) {
    const { type, data } = action;
    try {
        switch (type) {
            //RegisterOTPgen
            case REGENERATE_TOKEN:
                return { ...state, ...data };
            case REGENERATE_TOKEN_INDICATOR:
                return {
                    ...state,
                    loading: true,
                    errorMsg: "",
                    error: false,
                    isGenerated: false
                };
            case REGENERATE_TOKEN_SUCCESS:
                const response = action.response.data;
                return {
                    ...state,
                    loading: false,
                    data: response,
                    errorMsg: "",
                    error: false,
                    isGenerated: true
                };

            case REGENERATE_TOKEN_FAILED:
                return {
                    ...state,
                    loading: false,
                    errorMsg: action.message,
                    error: true,
                    isGenerated: false
                };

            case RESET_REGENERATE_TOKEN:
                return INITIAL_STATE;

            default:
                return state;
        }
    } catch (error) {
        console.log("error>>", error)
    }

}
