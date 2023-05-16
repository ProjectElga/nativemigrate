
import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
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

const Stack = createNativeStackNavigator();

function Navigation() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="SplashScreen" component={SplashScreen} />
                 <Stack.Screen name="LoginScreen" component={LoginScreen} />
                {/*<Stack.Screen name="OtpScreen" component={OtpScreen} />
                <Stack.Screen name="BasicDetailsName" component={BasicDetailsName} />
                <Stack.Screen name="BasicDetailsUsername" component={BasicDetailsUsername} />
                <Stack.Screen name="Identity" component={Identity} />
                <Stack.Screen name="More" component={More} />
                <Stack.Screen name="Social" component={Social} />
                <Stack.Screen name="CreatorProfile" component={CreatorProfile} />
                <Stack.Screen name="BrandProfile" component={BrandProfile} />

                <Stack.Screen name="Discover" component={Discover} /> */}

            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default Navigation;