import Identity from "../containers/onBoard/identity";
import LoginScreen from "../containers/auth/numberScreen";
import Auth from "../containers/auth";
import UserCategory from "../containers/onBoard/userCategory";
import Social from "../containers/onBoard/socials";
import More from "../containers/onBoard/more";
import BrandProfile from "../containers/profile/brandProfile/index";
import FolioDetail from "../containers/profile/folioDetail/index";
import EditPage from "../containers/profile/editPage";
import Setting from "../containers/profile/setting";
import FolioPage from "../containers/profile/actionButtonPages/folioPage";
import OppurtunityPage from "../containers/profile/actionButtonPages/oppurtunityPage";
import CollabPage from "../containers/profile/actionButtonPages/collabPage";
import CreatorProfile from "../containers/profile/createrProfile";
import Discover from "../containers/Discover";
import EditCategory from "../containers/profile/editCategory";
import CollabRequest from "../containers/profile/collabRequest";
import Opportunity from "../containers/opportunity";
import EditCompany from "../containers/profile/editCompany";
import OpportunityDetail from "../containers/opportunity/opportunityDetail";
import EditSkills from "../containers/profile/editSkills";
import Saved from "../containers/profile/saved";
import Responses from "../containers/opportunity/response";
import Projects from "../containers/projects";
import AllChats from "../containers/projects/allChats";
import ArchivedPage from "../containers/projects/archivedPage";
import Chat from "../containers/chat/index";
import Search from "../containers/search";
import Notifications from "../containers/notifications";
import SuccessPage from "../containers/projects/successPage/success";
// import ChatTest from "../containers/chat/ChatTest";
import UserGenre from "../containers/onBoard/userGenre";
import SavedDrafts from "../containers/profile/savedDrafts";
import AccountSettings from "../containers/profile/setting/accountSetting";
import NotifcationSetting from "../containers/profile/setting/notificationSetting";
import PendingPage from "../containers/projects/pendingPage";
import ComingSoonPage from "../containers/profile/comingSoonPage";
import Collaborates from "../containers/profile/collaboratorsPage";
import UserList from "../containers/chat/UserList";
import ImagePreview from "../containers/chat/imagePreview";
// import Chat from "../containers/chat";
import ChatRoom from "../containers/chat/ChatRoom";
import SelfViewProfile from "../containers/profile/createrProfile/SelfViewProfile";
import EditTags from "../containers/profile/editTags";
import AddParticipants from "../containers/profile/actionButtonPages/addParticipants";
import OtpScreen from "../containers/auth/otp";
import BasicDetailsName from "../containers/onBoard/basicDetailsName";
import BasicDetailsUsername from "../containers/onBoard/basicDetailsUsername";
import SearchDetail from "../containers/search/SearchDetail";
import SplashScreen from "../containers/auth/SplashScreen";
import BrandSelfView from "../containers/profile/brandProfile/BrandSelfView";
import CircleInfo from "../containers/chat/circleContactInfo";
import ProjectInfo from "../containers/chat/projectContactInfo";
import addMemberToChat from "../containers/profile/actionButtonPages/addMemberToChat";
import FilterPage from "../containers/Discover/filter";
const routes = [
  // {
  //   screen: SplashScreen,
  //   screenName: "SplashScreen",
  //   navigationOptions: {
  //     headerShown: false,
  //     tabBarVisible: false,
  //   },
  // },
  {
    screen: LoginScreen,
    screenName: "LoginScreen",
  },
  {
    screen: OtpScreen,
    screenName: "OtpScreen",
  },
  // {
  //   screen: BasicDetailsName,
  //   screenName: "BasicDetailsName",
  //   navigationOptions: {
  //     headerShown: false,
  //     tabBarVisible: false,
      
  //   },
  // },
  // {
  //   screen: BasicDetailsUsername,
  //   screenName: "BasicDetailsUsername",
  //   navigationOptions: {
  //     headerShown: false,
  //     tabBarVisible: false,
      
  //   },
  // },
  // {
  //   screen: Identity,
  //   screenName: "Identity",
  //   navigationOptions: {
  //     headerShown: false,
      
  //   },
  // },
  // {
  //   screen: More,
  //   screenName: "More",
  //   navigationOptions: {
  //     headerShown: false,
      
  //   },
  // },
  // {
  //   screen: UserCategory,
  //   screenName: "UserCategory",
  //   navigationOptions: {
  //     headerShown: false,
      
  //   },
  // },
  // {
  //   screen: Social,
  //   screenName: "Social",
  //   navigationOptions: {
  //     headerShown: false,
      
  //   },
  // },
  // {
  //   screen: CreatorProfile,
  //   screenName: "CreatorProfile",
  //   navigationOptions: {
  //     headerShown: false,
      
  //   },
  // },
  // {
  //   screen: BrandProfile,
  //   screenName: "BrandProfile",
  //   navigationOptions: {
  //     headerShown: false,
      
  //   },
  // },
  // {
  //   screen: SelfViewProfile,
  //   screenName: "SelfViewProfile",
  //   navigationOptions: {
  //     headerShown: false,
      
  //   },
  // },
  // {
  //   screen: BrandSelfView,
  //   screenName: "BrandSelfView",
  //   navigationOptions: {
  //     headerShown: false,
      
  //   },
  // },
  // {
  //   screen: FolioDetail,
  //   screenName: "FolioDetail",
  //   navigationOptions: { headerShown: false },
  //   animationEnabled: false,
  // },
  // {
  //   screen: EditPage,
  //   screenName: "EditPage",
  //   navigationOptions: { headerShown: false, animationEnabled: false },
  // },
  // {
  //   screen: Setting,
  //   screenName: "Setting",
  //   navigationOptions: { headerShown: false, animationEnabled: false },
  // },
  // {
  //   screen: FolioPage,
  //   screenName: "FolioPage",
  //   navigationOptions: { headerShown: false, animationEnabled: false },
  // },
  // {
  //   screen: OppurtunityPage,
  //   screenName: "OppurtunityPage",
  //   navigationOptions: { headerShown: false },
  // },
  // {
  //   screen: CollabPage,
  //   screenName: "CollabPage",
  //   navigationOptions: { headerShown: false },
  // },
  // {
  //   screen: Discover,
  //   screenName: "Discover",
  //   navigationOptions: { headerShown: false, animationEnabled: false },
  // },
  // {
  //   screen: EditCategory,
  //   screenName: "EditCategory",
  //   navigationOptions: { headerShown: false },
  // },
  // {
  //   screen: CollabRequest,
  //   screenName: "CollabRequest",
  //   navigationOptions: {
  //     headerShown: false,
  //   },
  // },
  // {
  //   screen: EditCompany,
  //   screenName: "EditCompany",
  //   navigationOptions: { headerShown: false },
  // },
  // {
  //   screen: OpportunityDetail,
  //   screenName: "OpportunityDetail",
  //   navigationOptions: { headerShown: false },
  // },
  // {
  //   screen: EditSkills,
  //   screenName: "EditSkills",
  //   navigationOptions: { headerShown: false },
  // },
  // {
  //   screen: Opportunity,
  //   screenName: "Opportunity",
  //   navigationOptions: { headerShown: false, animationEnabled: false },
  // },
  // {
  //   screen: Saved,
  //   screenName: "Saved",
  //   navigationOptions: { headerShown: false, animationEnabled: false },
  // },
  // {
  //   screen: Responses,
  //   screenName: "Responses",
  //   navigationOptions: { headerShown: false },
  // },
  // {
  //   screen: Projects,
  //   screenName: "Projects",
  //   navigationOptions: { headerShown: false, animationEnabled: false },
  // },
  // {
  //   screen: AllChats,
  //   screenName: "AllChats",
  //   navigationOptions: { headerShown: false },
  // },
  // {
  //   screen: ArchivedPage,
  //   screenName: "ArchivedPage",
  //   navigationOptions: { headerShown: false },
  // },
  // {
  //   screen: Chat,
  //   screenName: "Chat",
  //   navigationOptions: { headerShown: false },
  // },
  // {
  //   screen: Search,
  //   screenName: "Search",
  //   navigationOptions: { headerShown: false },
  // },
  // {
  //   screen: SearchDetail,
  //   screenName: "SearchDetail",
  //   navigationOptions: { headerShown: false },
  // },
  // {
  //   screen: Notifications,
  //   screenName: "Notifications",
  //   navigationOptions: { headerShown: false },
  // },
  // {
  //   screen: SuccessPage,
  //   screenName: "SuccessPage",
  //   navigationOptions: { headerShown: false },
  // },
  // {
  //   screen: UserGenre,
  //   screenName: "UserGenre",
  //   navigationOptions: { headerShown: false },
  // },
  // {
  //   screen: SavedDrafts,
  //   screenName: "SavedDrafts",
  //   navigationOptions: { headerShown: false },
  // },
  // {
  //   screen: AccountSettings,
  //   screenName: "AccountSettings",
  //   navigationOptions: { headerShown: false },
  // },
  // {
  //   screen: NotifcationSetting,
  //   screenName: "NotifcationSetting",
  //   navigationOptions: { headerShown: false },
  // },
  // {
  //   screen: PendingPage,
  //   screenName: "PendingPage",
  //   navigationOptions: { headerShown: false },
  // },
  // {
  //   screen: ComingSoonPage,
  //   screenName: "ComingSoonPage",
  //   navigationOptions: { headerShown: false },
  // },
  // {
  //   screen: Collaborates,
  //   screenName: "Collaborates",
  //   navigationOptions: { headerShown: false },
  // },
  // {
  //   screen: UserList,
  //   screenName: "UserList",
  //   navigationOptions: { headerShown: false },
  // },
  // {
  //   screen: ChatRoom,
  //   screenName: "ChatRoom",
  //   navigationOptions: { headerShown: false },
  // },
  // {
  //   screen: ImagePreview,
  //   screenName: "ImagePreview",
  //   navigationOptions: { headerShown: false },
  // },
  // {
  //   screen: EditTags,
  //   screenName: "EditTags",
  //   navigationOptions: { headerShown: false },
  // },
  // {
  //   screen: CircleInfo,
  //   screenName: "CircleInfo",
  //   navigationOptions: { headerShown: false },
  // },
  // {
  //   screen: ProjectInfo,
  //   screenName: "ProjectInfo",
  //   navigationOptions: { headerShown: false },
  // },
  // {
  //   screen: AddParticipants,
  //   screenName: "AddParticipants",
  //   navigationOptions: { headerShown: false },
  // },
  // {
  //   screen: addMemberToChat,
  //   screenName: "AddMember",
  //   navigationOptions: { headerShown: false },
  // },
  // {
  //   screen: FilterPage,
  //   screenName: "FilterPage",
  //   navigationOptions: { headerShown: false },
  // },
];

export default routes;