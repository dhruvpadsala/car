import React,{useState,useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
  AsyncStorage,
} from 'react-native';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';

export default function Dashboard({navigation}) {
  const [ison, setison] = useState('')
  useEffect(async() => {
     let isonic = await AsyncStorage.getItem('toggleval');
     console.log('isonic==>dashboard', isonic);
     setison(isonic === 'true');
  }, [])
  return (
    <>
      <View style={{flex: 1, backgroundColor: '#ff9100'}}>
        <View style={styles.header}>
          <Icon
            name="arrow-left"
            size={25}
            color="white"
            style={{margin: 10}}
            onPress={() => navigation.goBack()}
          />
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: 10,
            }}>
            <Image
              source={require('../images/profile.jpg')}
              style={styles.img}
            />
            <Text
              style={{
                color: 'white',
                fontSize: 20,
                fontWeight: 'bold',
                marginTop: 10,
              }}>
              Dhruv Padsala
            </Text>
          </View>
        </View>
        <Animatable.View
          style={ison ? styles.darkfooter : styles.whitefooter}
          animation="fadeInUpBig">
          <View style={styles.items}>
            <View style={{flexDirection: 'row', flex: 1}}>
              <Icon name="car" size={25} color="#ff9100" />
              <Text
                style={[
                  {fontSize: 18, paddingLeft: 20},
                  ison ? styles.darktxt : styles.whitetxt,
                ]}>
                Car
              </Text>
            </View>

            <Text
              style={[
                {fontSize: 18, flex: 1},
                ison ? styles.darktxt : styles.whitetxt,
              ]}>
              Model S
            </Text>
          </View>
          <View style={ison ? styles.darkline : styles.whiteline}></View>
          <View style={styles.items}>
            <View style={{flexDirection: 'row', flex: 1}}>
              <Icon name="phone" size={25} color="#ff9100" />
              <Text
                style={[
                  {fontSize: 18, paddingLeft: 20},
                  ison ? styles.darktxt : styles.whitetxt,
                ]}>
                phone
              </Text>
            </View>

            <Text
              style={[
                {fontSize: 18, flex: 1},
                ison ? styles.darktxt : styles.whitetxt,
              ]}>
              74123589631
            </Text>
          </View>
          <View style={ison ? styles.darkline : styles.whiteline}></View>
          <View style={styles.items}>
            <View style={{flexDirection: 'row', flex: 1}}>
              <Icon name="sticky-note" size={25} color="#ff9100" />
              <Text
                style={[
                  {fontSize: 18, paddingLeft: 20},
                  ison ? styles.darktxt : styles.whitetxt,
                ]}>
                Puc
              </Text>
            </View>
            <Text
              style={[
                {fontSize: 18, flex: 1},
                ison ? styles.darktxt : styles.whitetxt,
              ]}>
              Active : 12-feb-2021
            </Text>
          </View>
          <View style={ison ? styles.darkline : styles.whiteline}></View>
          <View style={styles.items}>
            <View style={{flexDirection: 'row', flex: 1}}>
              <Image
                source={require('../images/insurance.jpg')}
                style={{width: 25, height: 25}}
              />
              <Text
                style={[
                  {fontSize: 18, paddingLeft: 20},
                  ison ? styles.darktxt : styles.whitetxt,
                ]}>
                Insurance
              </Text>
            </View>

            <Text
              style={[
                {fontSize: 18, flex: 1},
                ison ? styles.darktxt : styles.whitetxt,
              ]}>
              Active : 19-feb-2025
            </Text>
          </View>
          <View style={ison ? styles.darkline : styles.whiteline}></View>
          <View style={styles.items}>
            <View style={{flexDirection: 'row', flex: 1}}>
              <Icon name="cogs" size={25} color="#ff9100" />

              <Text
                style={[
                  {fontSize: 18, paddingLeft: 20},
                  ison ? styles.darktxt : styles.whitetxt,
                ]}>
                Service
              </Text>
            </View>

            <Text
              style={[
                {fontSize: 18, flex: 1},
                ison ? styles.darktxt : styles.whitetxt,
              ]}>
              10 days to go
            </Text>
          </View>
          <View style={ison ? styles.darkline : styles.whiteline}></View>
          <TouchableOpacity
            onPress={
              () => {
                AsyncStorage.removeItem('toggleval');
                AsyncStorage.removeItem('userdata');
                navigation.reset({
                  index: 0,
                  routes: [{name: 'Home'}],
                });

                // navigation.replace('Login', {fromScreen: 'Profile'});
                // navigation.navigate("Home")
                console.log('preesses..........');
              }
              // navigation.reset("Login")}
              // navigation.popToTop() && navigation.navigate('Login');
            }
            style={{marginTop: 10}}>
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
              <LinearGradient
                colors={['#ffb74d', '#ffa726', '#ff9100']}
                style={styles.linearGradient}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Text style={styles.buttonText}>Sign Out</Text>
                  <Icon name="sign-out" size={23} color="white" />
                </View>
              </LinearGradient>
            </View>
          </TouchableOpacity>
        </Animatable.View>
      </View>
    </>
  );
}
const styles = StyleSheet.create({
  header: {
    flex: 3,
    backgroundColor: '#ff9100',
  },
  darkfooter: {
    flex: 7,
    backgroundColor: '#212121',
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
  },
  whitefooter: {
    flex: 7,
    backgroundColor: 'white',
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
  },
  darktxt: {
    color: 'white',
  },
  whitetxt: {
    color: 'black',
  },
  img: {
    resizeMode: 'cover',
    // width: Dimensions.get('window').width,
    // height: '50%',
    borderRadius: 50,
    // marginTop
    width: 100,
    height: 100,
    marginTop: -30,
  },
  items: {
    flexDirection: 'row',
    // justifyContent: 'space-between',
    alignItems: 'center',
    margin: 10,
    borderRadius: 10,
    padding: 5,
  },
  darkline: {
    color: 'white',
    borderWidth: 1,
    borderColor: 'white',
    marginLeft: 20,
    marginRight: 20,
  },
  whiteline: {
    color: 'black',
    borderWidth: 1,
    borderColor: 'black',
    marginLeft: 20,
    marginRight: 20,
  },
  linearGradient: {
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 15,
    padding: 5,
    width: '40%',
  },
  buttonText: {
    fontSize: 18,
    fontFamily: 'Gill Sans',
    textAlign: 'center',
    margin: 10,
    color: '#ffffff',
    backgroundColor: 'transparent',
  },
});
