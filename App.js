import React,{useState,useEffect} from 'react';
import {
  StyleSheet,
  AsyncStorage,
} from 'react-native';
import Card from './components/Card';
import Detailing from './components/Detailing';
import Dashboard from './components/Dashboard';
import Splashscreen from './components/Splashscreen';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer, DefaultTheme, DarkTheme} from '@react-navigation/native';
import Login from './components/Loginscreen';
import Garage from './components/Garage';
import Getdeatils from './components/Getdeatils';
import Addcar from './components/Addcar';
import Adddriver from './components/Adddriver';
import Register from './components/Register';
import axios from 'axios';


const HomeStack = createStackNavigator();
const Drawer = createDrawerNavigator();
const HomeStackScreen = () => {

  return (
    <HomeStack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <HomeStack.Screen name="Spashscreen" component={Splashscreen} />
      <HomeStack.Screen name="Home" component={Card} />
      <HomeStack.Screen name="Detailing" component={Detailing} />
      <HomeStack.Screen name="Login" component={Login} />
      <Drawer.Screen name="Garage" component={Garage} />
      <HomeStack.Screen name="Getdeatils" component={Getdeatils} />
      <HomeStack.Screen name="Addcar" component={Addcar} />
      <HomeStack.Screen name="Adddriver" component={Adddriver} />
      <HomeStack.Screen name="Register" component={Register} />
      <HomeStack.Screen
        name="Profile"
        component={Dashboard}
      />
    </HomeStack.Navigator>
  );
};

const App = () => {
   const [ison, setison] = useState(false);
   useEffect(async () => {
     let isonic = await AsyncStorage.getItem('toggleval');
     console.log('isonic==>app.js', isonic);
     setison(isonic == 'true');
   }, [ison]);
   useEffect(() => {
      axios.get("http://b2b.yoursthangam.com/api/customer/cityList/12")
      .then((response)=>{
        console.log("response from city ===>",response.data.data[0]);
      })
      .catch((Error)=>{
        console.log("Error==>",Error)
      })
   }, [])
  return (
    <NavigationContainer theme={ison ? DarkTheme : DefaultTheme}>
      <Drawer.Navigator
        drawerContentOptions={{
          inactiveTintColor: ison ? 'white' : 'black',
          activeTintColor: ison ? 'white' : 'black',
          activeBackgroundColor: '#ffa726',
          // backgroundColor: ison ? styles.darktheme : styles.whitetheme,
          color: ison ? 'white' : 'black',
          itemStyle: {marginVertical: 5},
          itemTextColor: 'white',
        }}
        // drawerStyle={ison ? styles.darktheme : styles.whitetheme}
        // // drawerContent={props => <Drawerscreen {...props} />}
      >
        <Drawer.Screen name="Home" component={HomeStackScreen} />
        <Drawer.Screen name="Garage" component={Garage} />

        <Drawer.Screen name="Profile" component={Dashboard} />
      </Drawer.Navigator>
    </NavigationContainer>
    // <Card/>
  );
};
const styles = StyleSheet.create({
  darktheme: {
    backgroundColor: 'white',
  },
  whitetheme: {
    backgroundColor: '#212121',
  },
  darktxt: {
    color: 'white',
  },
  whitetxt: {
    color: 'black',
  },
});

export default App;
