import React, {useState, useEffect} from 'react';
import { View, Text,ScrollView ,SafeAreaView,Button,AsyncStorage} from 'react-native'
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from 'react-native-google-signin';
import auth from '@react-native-firebase/auth';
// import {GoogleSignin, statusCodes} from 'react-native-google-signin';

export default function Goggle() {  
    const [loggedIn, setloggedIn] = useState(false);
    const [userInfo, setuserInfo] = useState([]);

    // useEffect(() => {  
    //    GoogleSignin.configure({
    //      scopes: CONFIG.GOOGLE_SERVICE.SCOPES,
    //      webClientId: CONFIG.GOOGLE_SERVICE.CLIENT_ID,
    //      offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
    //    });
    // }, [])

    const _signIn = async () => {
        console.log("presses--------------->")
        try {
        console.log('signin Inside=================');
        await GoogleSignin.hasPlayServices({
          showPlayServicesUpdateDialog: true,
        });
        const userInfo = await GoogleSignin.signIn();
        console.log('User Info --> ', userInfo);
        setUserInfo(userInfo);
    //       await GoogleSignin.hasPlayServices();
    //   console.log('signin google sign in=================');

    //       const userInfo = await GoogleSignin.signIn();
    //       setState({userInfo});
    //       console.log('userinfo===>', userInfo);
        } catch (error) {
            console.log("error----->",error)
          if (error.code === statusCodes.SIGN_IN_CANCELLED) {
            // user cancelled the login flow
          } else if (error.code === statusCodes.IN_PROGRESS) {
            // operation (e.g. sign in) is in progress already
          } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
            // play services not available or outdated
          } else {
            // some other error happened
          }
        }   
    };
    const signOut = async () => {
    try {
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
      setloggedIn(false);
      setuserInfo([]);
    } catch (error) {
      console.error(error);
    }
  };
    return (
        <>
          <View >
            <View >
              <GoogleSigninButton
                style={{width: 192, height: 48}}
                size={GoogleSigninButton.Size.Wide}
                color={GoogleSigninButton.Color.Dark}
                onPress={_signIn}
              />
            </View>
            <View >
              {!loggedIn && <Text>You are currently logged out</Text>}
              {loggedIn && (
                <Button
                  onPress={signOut}
                  title="LogOut"
                  color="red"></Button>
              )}
            </View>
          </View>
        </>
    )
}
