import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Image,
} from 'react-native';
// import {TextInput} from 'react-native-paper';
import LinearGradient from 'react-native-linear-gradient';
import {User} from './Ldata';
import * as Animatable from 'react-native-animatable';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import auth from '@react-native-firebase/auth';
// import Firebase from '@react-native-firebase/app';

export default function Loginscreen({navigation}) {
  const [data, setdata] = useState({
    email: '',
    password: '',
    isemail: true,
    ispass: true,
  });
  const [isloading, setisloading] = useState(false)
  const handleSignUp = () => {
    if (data.email == '' || data.password == '') {
      Alert.alert('Wrong Input!', 'username or password Can not empty', [
        {text: 'okay'},
      ]);
    } else {
      const {email, password} = data;
      auth()
        .createUserWithEmailAndPassword(email, password)
        .then(() => navigation.replace('Home'))
        .catch(error => console.log(error));
    }
  };


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
        <Animatable.View style={styles.footer} animation="fadeInUpBig">
          <View style={{marginTop: 20, margin: 20}}>
            <View style={{flexDirection: 'row'}}>
              <Icon
                name="user"
                size={30}
                color="#ff9100"
                style={{marginTop: 23}}
              />
              <TextInput
                style={[styles.txtinput,{marginLeft:12}]}
                //   autoFocus={true}

                placeholderTextColor="white"
                placeholder="Enter Name"
                // onChangeText={text => emailval(text)}
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
                style={styles.txtinput}
                //   autoFocus={true}

                placeholderTextColor="white"
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
                style={styles.txtinput}
                placeholderTextColor="white"
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
          <TouchableOpacity onPress={handleSignUp}>
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
                  <Text style={styles.buttonText}>Sign Up</Text>
                  <Icon name="sign-in" size={23} color="white" />
                </View>
              </LinearGradient>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Login');
            }}>
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: 50,
              }}>
              <Text style={{fontSize: 18, fontWeight: 'bold', color: 'white'}}>
                Already have an account?
                <Text style={{color: '#ff9100'}}> Sign In</Text>
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
  footer: {
    flex: 8,
    backgroundColor: '#212121',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    marginTop: 10,
  },
  txtinput: {
    borderRadius: 10,
    borderColor: 'white',
    borderWidth: 2,
    margin: 10,
    padding: 10,
    fontSize: 15,
    color: 'white',
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
});
