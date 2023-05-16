import { Platform } from "react-native";

const SCREENSIZE={
    ScreenHeightViewPort:Platform.OS==='ios'?"91%":"92%",
    BottomNavBarViewPort:Platform.OS==='ios'?"9%":"8%",
    ScreenHeightViewPortForButtons:Platform.OS==='ios'?"88%":"90%",
    BottomNavBarViewPortForButtons:Platform.OS==='ios'?"12%":"10%",

}
export default SCREENSIZE;