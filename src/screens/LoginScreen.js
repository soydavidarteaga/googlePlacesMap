/* eslint-disable prettier/prettier */
import { GoogleSignin, GoogleSigninButton, statusCodes } from '@react-native-google-signin/google-signin';
import * as React from 'react';
import { View } from 'react-native';
import generalStyles from '../styles/generalStyles';

let LoginScreen = ({navigation}) => {
  GoogleSignin.configure({
    scopes: ['email', 'name', 'avatar'], // [Android] what API you want to access on behalf of the user, default is email and profile
    webClientId: '487882154826-j039qtg79gvoujgs767hna304j98djo2.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
    offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
  });
  let signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      console.log('Loggeo')
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
        console.log('Sesion cancelada')
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
        console.log('Operacion en proceso')
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
        console.log('No tiene google Play services');
      } else {
        // some other error happened
        navigation.navigate('Home');
      }
    }
  }
  return (
    <View style={generalStyles.root}>
      <GoogleSigninButton 
        onPress={signIn}
      />
    </View>
  );
};

export default LoginScreen;
