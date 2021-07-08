import React, {useState,useRef} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Image,
  ActivityIndicator,
  AsyncStorage,
} from 'react-native';
// import {TextInput} from 'react-native-paper';
import LinearGradient from 'react-native-linear-gradient';
import {User} from './Ldata';
import * as Animatable from 'react-native-animatable';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import auth from '@react-native-firebase/auth';
import ToggleSwitch from 'toggle-switch-react-native';

export default function Loginscreen({navigation}) {
  // const [email, setemail] = useState('');
  // const [password, setpassword] = useState('');
  const passRef = useRef();
  const [isloading, setisloading] = useState(false);
  const [ison, setison] = useState(true)
  const [data, setdata] = useState({
    email: 'Dhruv@gmail.com',
    password: 'dhruv123456',
    isemail: true,
    ispass: true,
  });
  const handleLogin = () => {
    setisloading(true);
    const {email, password} = data;
    if (data.email == '' || data.password == '0') {
      setisloading(false);
      // navigation.replace('Home');
      Alert.alert('Wrong Input!', 'username or password Can not empty', [
        {text: 'okay'},
      ]);
    } else {
      auth()
        .signInWithEmailAndPassword(email, password)
        .then(async(res) => {
          console.log('emaildata from firebase', res.user);
          try {
            await AsyncStorage.setItem('userdata', JSON.stringify(res.user));
          } catch (error) {
            console.log('error=========', error);
          }
          try {
            await AsyncStorage.setItem('toggleval', ison.toString());
          } catch (error) {
            console.log('error=>>', ison);
          }
          navigation.replace('Home');
        })
        .catch(err => {
          setisloading(false);
          Alert.alert('Invalid User!', 'username or password is incorrect', [
            {text: 'okay'},
          ]);
        });
    }
  };
  const toggleval = async () => {
    setison(!ison);
    
  };

  function getdata() {
    let userfound = false;

    for (let i = 0; i < User.length; i++) {
      if (data.email == User[i].email && data.password == User[i].password) {
        userfound = true;
        return navigation.replace('Home');
      }
    }

    if (userfound == false) {
      Alert.alert('Invalid User!', 'username or password is incorrect', [
        {text: 'okay'},
      ]);
      return;
    }
  }

  const emailval = text => {
    if (text.trim().length <= 4) {
      setdata({...data, email: text, isemail: false});
    } else {
      setdata({
        ...data,
        email: text,
        isemail: true,
      });
    }
  };
  const passval = val => {
    if (val.trim().length <= 8) {
      setdata({
        ...data,
        password: val,
        ispass: false,
      });
    } else {
      setdata({
        ...data,
        password: val,
        ispass: true,
      });
    }
  };

  return (
    <>
      <View style={{flex: 1, backgroundColor: '#ffa726'}}>
        {isloading && (
          <View
            style={{
              position: 'absolute',
              height: '100%',
              width: '100%',
              alignItems: 'center',
              justifyContent: 'center',
              flex: 1,
              backgroundColor: '#ffffff40',
              zIndex: 2,
              bottom: 0,
            }}>
            <Image
              source={require('../images/animation_500_kqjdajo9.gif')}
              style={{height: '25%', width: '25%', resizeMode: 'contain'}}
            />
          </View>
        )}
        <View style={styles.header}>
          <Image
            source={require('../images/logo2-removebg-preview.jpg')}
            style={{height: 200, width: 200, resizeMode: 'contain'}}
          />
        </View>
        <Animatable.View
          style={!ison ? styles.darkfooter : styles.whitefooter}
          animation="fadeInUpBig">
          <View style={{marginTop: 20, margin: 20}}>
            <View style={{justifyContent: 'flex-end', alignItems: 'flex-end'}}>
              <ToggleSwitch
                isOn={ison}
                onColor="green"
                offColor="#212121"
                label={ison?"Dark Mode":"White Mode"}
                labelStyle={ison?styles.darksignup : styles.whitesignup}
                size="medium"
                onToggle={ison=>toggleval(ison)}
              />
            </View>
            <View style={{flexDirection: 'row'}}>
              <Icon
                name="envelope"
                size={25}
                color="#ff9100"
                style={{marginTop: 23}}
              />
              <TextInput
                style={ison ? styles.darktxtinput : styles.whitetxtinput}
                //   autoFocus={true}
                value={data.email}
                placeholderTextColor={ison ? 'white' : 'black'}
                onSubmitEditing={() => {
                  passRef.current.focus();
                }}
                placeholder="Enter Email"
                onChangeText={text => emailval(text)}
              />
            </View>
            {data.isemail ? null : (
              <Animatable.View animation="fadeInLeft">
                <Text style={{color: 'red', fontSize: 15}}>
                  username or email must be 4 character
                </Text>
              </Animatable.View>
            )}
            <View style={{flexDirection: 'row'}}>
              <Icon
                name="unlock-alt"
                size={35}
                color="#ff9100"
                style={{marginTop: 20}}
              />
              <TextInput
                style={ison ? styles.darktxtinput : styles.whitetxtinput}
                ref={passRef}
                value={data.password}
                placeholderTextColor={ison ? 'white' : 'black'}
                secureTextEntry={true}
                placeholder="Enter Password"
                onChangeText={val => passval(val)}
              />
            </View>
            {data.ispass ? null : (
              <Animatable.View animation="fadeInLeft">
                <Text style={{color: 'red', fontSize: 15}}>
                  password must be 8 character
                </Text>
              </Animatable.View>
            )}
          </View>
          <TouchableOpacity onPress={handleLogin}>
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
                  <Text style={styles.buttonText}>Sign in</Text>
                  <Icon name="sign-in" size={23} color="white" />
                </View>
              </LinearGradient>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Register');
            }}>
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: 50,
              }}>
              <Text style={ison?styles.darksignup : styles.whitesignup}>
                Don't have an account?
                <Text style={{color: '#ff9100'}}> Sign Up</Text>
              </Text>
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
    backgroundColor: '#ffa726',
    justifyContent: 'center',
    alignItems: 'center',
  },
  darkfooter: {
    flex: 8,
    backgroundColor: 'white',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    marginTop: 10,
  },
  whitefooter: {
    flex: 8,
    backgroundColor: '#212121',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    marginTop: 10,
  },

  darktxtinput: {
    borderRadius: 10,
    borderColor: 'white',
    borderWidth: 2,
    margin: 10,
    padding: 10,
    fontSize: 15,
    color: 'white',
    width: '90%',
  },
  whitetxtinput: {
    borderRadius: 10,
    borderColor: 'black',
    borderWidth: 2,
    margin: 10,
    padding: 10,
    fontSize: 15,
    color: 'black',
    width: '90%',
  },
  linearGradient: {
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 15,
    padding: 8,
    width: '50%',
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'Gill Sans',
    textAlign: 'center',
    margin: 10,
    color: '#ffffff',
    backgroundColor: 'transparent',
  },
  darksignup: {
    fontSize: 18,
    fontWeight: '800',
    color: 'white',
  },
  whitesignup: {
    fontSize: 18,
    fontWeight: '800',
    color: 'black',
  },
});
