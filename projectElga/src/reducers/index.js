import { combineReducers } from "redux";
import projects from "./projects/projects";
import signup from "./auth/signup";
import userCategory from "./onboard/userCategory";
import identity from "./onboard/identity";
import more from "./onboard/more";
import socials from "./onboard/socials";
import citation from "./profile/citations";
import profile from "./profile/profile";
import userMeta from "./onboard/userMeta";
import discover from "./discover/category";
import getUser from "./discover/getUser";
import getTrendingUser from "./discover/getTrendingUser";
import collab from "./actionButton/collab";
import edit from "./profile/edit";
import saved from "./saved/saved";
import projectDetail from "./projects/projectDetail";
import projectAction from "./projects/projectAction";
import instagram from "./profile/instagram";
import circle from "./projects/circle";
import location from "./location/location";
import userSearch from "./search/userSearch";
import media from "./media/media";
import popularGenre from "./search/popularGenre";
import genreSearch from "./genres/genreSearch";
import youtube from "./profile/youtube";
import assignGenre from "./genres/assignGenre";
import addLinks from "./profile/addLinks";
import filter from "./discover/filter";
import regenerateToken from "./auth/regenerateToken";
import thirdPartyProfile from "./profile/thirdPartyProfile";
import notification from "./notifications/notification";
import archiveChat from "./projects/archiveChat";
import rewards from "./rewards/rewards";
import profilePercentage from "./profile/profilePercentage";
import feed from "./explore/feed";
import feedAction from "./explore/feedAction";
import feedDetail from "./explore/feedDetail";

const appReducer = combineReducers({
  projects,
  signup,
  userCategory,
  identity,
  more,
  socials,
  citation,
  profile,
  userMeta,
  discover,
  getUser,
  getTrendingUser,
  collab,
  saved,
  projectDetail,
  projectAction,
  instagram,
  circle,
  edit,
  location,
  userSearch,
  media,
  popularGenre,
  youtube,
  genreSearch,
  assignGenre,
  addLinks,
  filter,
  regenerateToken,
  thirdPartyProfile,
  notification,
  archiveChat,
  rewards,
  profilePercentage,
  feed,
  feedAction,
  feedDetail,
});
const rootReducer = (state, action) => {
  return appReducer(state, action);
};
export default rootReducer;
