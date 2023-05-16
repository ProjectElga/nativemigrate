import React, { Component } from "react";
import {
  createStackNavigator,
  CardStyleInterpolators,
} from "react-navigation-stack";
import { createAppContainer, StackNavigator, } from "react-navigation";
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
import FilterPage from "../containers/Discover/filter"
const forFade = ({ current }) => ({
  cardStyle: {
    opacity: current.progress,
  },
});

const AppNavigation = createStackNavigator(
  {
    // Auth: {
    //   screen: Auth,
    //   navigationOptions: {
    //     headerShown: false,
    //     tabBarVisible: false,
    //     cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
    //   },
    // },
    SplashScreen: {
      screen: SplashScreen,
      navigationOptions: {
        headerShown: false,
        tabBarVisible: false,
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      },
    },
    LoginScreen: {
      screen: LoginScreen,
      navigationOptions: {
        headerShown: false,
        tabBarVisible: false,
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      },
    },
    OtpScreen: {
      screen: OtpScreen,
      navigationOptions: {
        headerShown: false,
        tabBarVisible: false,
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      },
    },
    BasicDetailsName: {
      screen: BasicDetailsName,
      navigationOptions: {
        headerShown: false,
        tabBarVisible: false,
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      },
    },
    BasicDetailsUsername: {
      screen: BasicDetailsUsername,
      navigationOptions: {
        headerShown: false,
        tabBarVisible: false,
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      },
    },
    Identity: {
      screen: Identity,
      navigationOptions: {
        headerShown: false,
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      },
    },
    More: {
      screen: More,
      navigationOptions: {
        headerShown: false,
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      },
    },
    UserCategory: {
      screen: UserCategory,
      navigationOptions: {
        headerShown: false,
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      },
    },
    Social: {
      screen: Social,
      navigationOptions: {
        headerShown: false,
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      },
    },
    CreatorProfile: {
      screen: CreatorProfile,
      navigationOptions: {
        headerShown: false,
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      },
    },
    BrandProfile: {
      screen: BrandProfile,
      navigationOptions: {
        headerShown: false,
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      },
    },
    Profile: {
      screen: SelfViewProfile,
      navigationOptions: {
        headerShown: false,
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      },
    },
    BrandSelfView: {
      screen: BrandSelfView,
      navigationOptions: {
        headerShown: false,
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      },
    },
    FolioDetail: {
      screen: FolioDetail,
      navigationOptions: { headerShown: false },
      animationEnabled: false,
    },
    EditPage: {
      screen: EditPage,
      navigationOptions: { headerShown: false, animationEnabled: false },
    },
    Setting: {
      screen: Setting,
      navigationOptions: { headerShown: false, animationEnabled: false },
    },

    FolioPage: {
      screen: FolioPage,
      navigationOptions: { headerShown: false, animationEnabled: false },
    },

    OppurtunityPage: {
      screen: OppurtunityPage,
      navigationOptions: { headerShown: false },
    },
    CollabPage: {
      screen: CollabPage,
      navigationOptions: { headerShown: false },
    },
    Discover: {
      screen: Discover,
      navigationOptions: { headerShown: false, animationEnabled: false },
    },
    EditCategory: {
      screen: EditCategory,
      navigationOptions: { headerShown: false },
    },
    CollabRequest: {
      screen: CollabRequest,
      navigationOptions: {
        headerShown: false,
        cardStyleInterpolator: forFade,
      },
    },
    EditCompany: {
      screen: EditCompany,
      navigationOptions: { headerShown: false },
    },
    OpportunityDetail: {
      screen: OpportunityDetail,
      navigationOptions: { headerShown: false },
    },
    EditSkills: {
      screen: EditSkills,
      navigationOptions: { headerShown: false },
    },
    Opportunity: {
      screen: Opportunity,
      navigationOptions: { headerShown: false, animationEnabled: false },
    },
    Saved: {
      screen: Saved,
      navigationOptions: { headerShown: false, animationEnabled: false },
    },
    Responses: {
      screen: Responses,
      navigationOptions: { headerShown: false },
    },
    Projects: {
      screen: Projects,
      navigationOptions: { headerShown: false, animationEnabled: false },
    },
    AllChats: {
      screen: AllChats,
      navigationOptions: { headerShown: false },
    },
    ArchivedPage: {
      screen: ArchivedPage,
      navigationOptions: { headerShown: false },
    },
    Chat: {
      screen: Chat,
      navigationOptions: { headerShown: false },
    },
    Search: {
      screen: Search,
      navigationOptions: { headerShown: false },
    },
    SearchDetail: {
      screen: SearchDetail,
      navigationOptions: { headerShown: false },
    },
    Notifications: {
      screen: Notifications,
      navigationOptions: { headerShown: false },
    },
    SuccessPage: {
      screen: SuccessPage,
      navigationOptions: { headerShown: false },
    },
    // ChatTest: {
    //   screen: ChatTest,
    //   navigationOptions: { headerShown: false },
    // },
    UserGenre: {
      screen: UserGenre,
      navigationOptions: { headerShown: false },
    },
    SavedDrafts: {
      screen: SavedDrafts,
      navigationOptions: { headerShown: false },
    },
    AccountSettings: {
      screen: AccountSettings,
      navigationOptions: { headerShown: false },
    },
    NotifcationSetting: {
      screen: NotifcationSetting,
      navigationOptions: { headerShown: false },
    },
    PendingPage: {
      screen: PendingPage,
      navigationOptions: { headerShown: false },
    },
    ComingSoonPage: {
      screen: ComingSoonPage,
      navigationOptions: { headerShown: false },
    },
    Collaborates: {
      screen: Collaborates,
      navigationOptions: { headerShown: false },
    },
    UserList: {
      screen: UserList,
      navigationOptions: { headerShown: false },
    },
    ChatRoom: {
      screen: ChatRoom,
      navigationOptions: { headerShown: false },
    },
    ImagePreview: {
      screen: ImagePreview,
      navigationOptions: { headerShown: false },
    },
    EditTags: {
      screen: EditTags,
      navigationOptions: { headerShown: false },
    },
    CircleInfo: {
      screen: CircleInfo,
      navigationOptions: { headerShown: false },
    },
    ProjectInfo: {
      screen: ProjectInfo,
      navigationOptions: { headerShown: false },
    },
    AddParticipants: {
      screen: AddParticipants,
      navigationOptions: { headerShown: false },
    },
    AddMember: {
      screen: addMemberToChat,
      navigationOptions: { headerShown: false },
    },
    FilterPage: {
      screen: FilterPage,
      navigationOptions: { headerShown: false },
    },
  },
  {
    mode: "card",
    transitionConfig: () => ({
      screenInterpolator: CardStackStyleInterpolator.forVertical,
    }),
  }
);

export default createAppContainer(AppNavigation);
