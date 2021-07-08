import React, {useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Platform,
  PermissionsAndroid,
  TextInput,
  KeyboardAvoidingView,
  ScrollView,
  Keyboard,
} from 'react-native';
import DatePicker from 'react-native-datepicker';
import CheckBox from 'react-native-check-box';
import ModalDropdown from 'react-native-modal-dropdown';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import * as Animatable from 'react-native-animatable';
import firestore from '@react-native-firebase/firestore';
var RNFS = require('react-native-fs');



const Addcar = ({route,navigation}) => {
   const item = route.params;
   console.log('addcar data=======', item);
  const [filePath, setFilePath] = useState('');
  const [insurancedate, setinsuranceDate] = useState(item ? item.insurance : new Date());
  const [pucDate, setpucDate] = useState(item ? item.puc : new Date());
  const [ischeck, setischeck] = useState(item ? item.companyUse : false);
  const [data, setdata] = useState({
    carname: item ? item.company : '',
    carnumber: item ? item.carnumber : '',
    ownername: item ? item.owner : '',
    fuelType: '',
  });
  

  

  const requestCameraPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          {
            title: 'Camera Permission',
            message: 'App needs camera permission',
          },
        );
        // If CAMERA Permission is granted
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        return false;
      }
    } else return true;
  };

  const requestExternalWritePermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: 'External Storage Write Permission',
            message: 'App needs write permission',
          },
        );
        // If WRITE_EXTERNAL_STORAGE Permission is granted
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        alert('Write permission err', err);
      }
      return false;
    } else return true;
  };

  const chooseFile = type => {
    let options = {
      mediaType: type,
      maxWidth: 300,
      maxHeight: 550,
      quality: 1,
    };
    launchImageLibrary(options, response => {
      console.log('Response = ', response);

      if (response.didCancel) {
        alert('User cancelled camera picker');
        return;
      } else if (response.errorCode == 'camera_unavailable') {
        alert('Camera not available on device');
        return;
      } else if (response.errorCode == 'permission') {
        alert('Permission not satisfied');
        return;
      } else if (response.errorCode == 'others') {
        alert(response.errorMessage);
        return;
      }
      console.log('base64 -> ', response.assets[0].base64);
      console.log('uri -> ', response.assets[0].uri);
      console.log('width -> ', response.assets[0].width);
      console.log('height -> ', response.assets[0].height);
      console.log('fileSize -> ', response.assets[0].fileSize);
      console.log('type -> ', response.assets[0].type);
      console.log('fileName -> ', response.assets[0].fileName);
      setFilePath(response.assets[0]);
    });
  };
  const fuelType=['Petrol', 'Diesel', 'Electric']

  const addData = async () => {
    const data123 = {
      // id: 1,
      carnameF: data.carname,
      carnumberF: data.carnumber,
      carownerF: data.ownername,
      insuranceDateF: insurancedate,
      pucDateF:pucDate,
      fuelTypeF:data.fuelType,
    };
    console.log("filePath============",filePath.uri)
    console.log('data====', data123);

    await firestore()
      .collection('Car')
      .add(data123)
      .then(() => {
        console.log('User added!');
      })
      .catch(err => {
        console.log('errrrrrrr', err);
      });
      console.log("last==================")
    //  setdata('');
  };
  return (
    <View style={{backgroundColor: '#212121', flex: 1}}>
      <View style={styles.header}>
        <View
          style={{
            flexDirection: 'row',
            // backgroundColor: 'red',
          }}>
          <View>
            <Icon
              name="arrow-left"
              size={25}
              color="white"
              style={{margin: 10}}
              onPress={() => navigation.goBack()}
            />
          </View>
          <View>
            <Text style={styles.titleText}>Add Car data info</Text>
          </View>
        </View>
        <View style={{flex: 1, margin: 5}}>
          <TouchableOpacity
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'flex-end',
            }}
            onPress={() => chooseFile('photo')}>
            <Image
              source={
                filePath.uri
                  ? {uri: filePath.uri}
                  : require('../images/chooseimg.jpg')
              }
              style={[styles.imageStyle, {flex: 7}]}
            />
          </TouchableOpacity>
        </View>
      </View>
      <Animatable.View style={styles.footer} animation="fadeInUpBig">
        <ScrollView
          style={{flex: 1}}
          contentContainerStyle={{
            justifyContent: 'center',
            alignItems: 'center',
            paddingBottom: 30,
          }}>
          <View
            style={{
              backgroundColor: 'white',
              borderRadius: 20,
              width: '85%',
              flex: 1,
            }}>
            <TextInput
              placeholder="Car Name"
              placeholderTextColor="#ff9100"
              value={data.carname}
              style={{marginLeft: 20, fontSize: 15, color: 'black'}}
              onChangeText={text => {
                setdata({
                  ...data,
                  carname: text,
                });
              }}
            />
            <View style={styles.line}></View>
            <TextInput
              placeholder="Car Number"
              value={data.carnumber}
              placeholderTextColor="#ff9100"
              style={{marginLeft: 20, fontSize: 15, color: 'black'}}
              onChangeText={text => {
                setdata({
                  ...data,
                  carnumber: text,
                });
              }}
            />
            <View style={styles.line}></View>
            <TextInput
              placeholder="Car Owner"
              value={data.ownername}
              placeholderTextColor="#ff9100"
              style={{marginLeft: 20, fontSize: 15, color: 'black'}}
              onChangeText={text => {
                setdata({
                  ...data,
                  ownername: text,
                });
              }}
            />
            <View style={styles.line}></View>
            <View style={{marginLeft: 20}}>
              <Text style={{color: '#ff9100', fontSize: 15}}>
                Select End date of insurance :
              </Text>
              <DatePicker
                style={{
                  width: 200,
                  marginTop: 10,
                  marginBottom: 5,
                  color: 'white',
                }}
                date={insurancedate}
                mode="date"
                format="YYYY-MM-DD"
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                customStyles={{
                  dateIcon: {
                    position: 'absolute',
                    left: 0,
                    top: 4,
                    marginLeft: 0,
                  },
                  dateInput: {
                    marginLeft: 36,
                    color: 'white',
                  },
                }}
                onDateChange={setinsuranceDate}
              />
            </View>
            <View style={styles.line}></View>
            <View style={{marginLeft: 20}}>
              <Text style={{color: '#ff9100', fontSize: 15}}>
                Select End date of Puc :
              </Text>
              <DatePicker
                style={{
                  width: 200,
                  marginTop: 10,
                  marginBottom: 10,
                  color: 'white',
                }}
                date={pucDate}
                mode="date"
                placeholder="select date"
                format="YYYY-MM-DD"
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                androidVariant="nativeAndroid"
                customStyles={{
                  dateIcon: {
                    position: 'absolute',
                    left: 0,
                    top: 4,
                    marginLeft: 0,
                  },
                  dateInput: {
                    marginLeft: 36,
                    color: 'white',
                  },
                }}
                onDateChange={setpucDate}
              />
            </View>
            <View style={styles.line}></View>
            <View
              style={{
                justifyContent: 'space-around',
                flexDirection: 'row',
                marginBottom: 5,
                marginTop: 5,
              }}>
              <CheckBox
                style={{flex: 1, marginLeft: 20}}
                onClick={() => setischeck(!ischeck)}
                isChecked={ischeck}
                checkBoxColor="#ff9100"
                rightTextStyle={{color: '#ff9100', fontSize: 15}}
                rightText={'check if car is use for company'}
              />
            </View>
            <View style={styles.line}></View>
            <View style={{marginLeft: 20, marginTop: 5, marginBottom: 5}}>
              <Text style={{color: '#ff9100', marginBottom: 5, fontSize: 15}}>
                Fuel Type
              </Text>
              <ModalDropdown
                options={fuelType}
                textStyle={{color: 'black', fontSize: 15}}
                dropdownStyle={{width: '30%'}}
                dropdownTextStyle={{fontSize: 15}}
                onSelect={value =>
                  setdata({
                    ...data,
                    fuelType: fuelType[value],
                  })
                }
              />
            </View>
            <View style={styles.line}></View>
            <TouchableOpacity onPress={addData}>
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginBottom: -22,
                }}>
                <View
                  style={{
                    backgroundColor: '#ff9100',
                    borderRadius: 15,
                    width: '40%',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: 5,
                  }}>
                  <Text
                    style={{
                      fontWeight: 'bold',
                      fontSize: 20,
                      color: 'white',
                      padding: 10,
                    }}>
                    Submit
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </Animatable.View>
    </View>
  );
};

export default Addcar;

const styles = StyleSheet.create({
  line: {
    color: 'white',
    borderWidth: 0.7,
    borderColor: 'grey',
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 5,
  },

  titleText: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingVertical: 10,
    color: 'white',
    marginLeft: 60,
  },
  textStyle: {
    padding: 10,
    color: 'black',
    textAlign: 'center',
  },
  buttonStyle: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 5,
    marginVertical: 10,
    width: 250,
  },
  imageStyle: {
    resizeMode: 'contain',
    width: '100%',
    height: 200,
    borderRadius: 10,
    // marginTop:10,
  },
  header: {
    flex: 4,
  },
  footer: {
    flex: 6,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxContainer: {
    flexDirection: 'row',
    // marginBottom: 20,
  },
  checkbox: {
    alignSelf: 'center',
  },
  label: {
    margin: 8,
  },
});
