import * as GoogleSignIn from 'expo-google-sign-in';
GoogleConifg = async () => {
  await GoogleSignIn.initAsync({
    clientId: '533301591748-lnm95s0e0ctorv3db5hb6creuh0fd01d.apps.googleusercontent.com',
    // isOfflineEnabled: true,
    // isPromptEnabled:true,
    scopes: [GoogleSignIn.SCOPES.PROFILE, GoogleSignIn.SCOPES.EMAIL]
  });
};
export default GoogleConifg;