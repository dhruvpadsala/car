import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Platform,
  PermissionsAndroid,
  TextInput,
  ScrollView,
} from 'react-native';
import DatePicker from 'react-native-datepicker';
import CheckBox from 'react-native-check-box';
import ModalDropdown from 'react-native-modal-dropdown';
import {launchImageLibrary} from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import * as Animatable from 'react-native-animatable';
import firestore from '@react-native-firebase/firestore';

const Adddriver = ({navigation}) => {
  const [filePath, setFilePath] = useState('');
  const [joindate, setjoinDate] = useState(new Date());
  const [ischeck, setischeck] = useState(false);
  const [data, setdata] = useState({
    name: '',
    number: '',
    cartake: '',
    joiningDate: joindate,
    hire: ischeck,
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
      console.log('base64 -> ', response.base64);
      console.log('uri -> ', response.uri);
      console.log('width -> ', response.width);
      console.log('height -> ', response.height);
      console.log('fileSize -> ', response.fileSize);
      console.log('type -> ', response.type);
      console.log('fileName -> ', response.fileName);
      setFilePath(response.assets[0]);
    });
  };
  const Adddrive =async () => {
    console.log(
      'Driver Data=======',
      data.name,
      data.number,
      data.cartake,
      data.fuelType,
      data.joiningDate,
      data.hire,
    );
    await firestore()
      .collection('Driver')
      .add(data)
      .then(() => {
        console.log('User added!');
      })
      .catch(err => {
        console.log('errrrrrrr', err);
      });
  };
  return (
    <View style={{backgroundColor: '#212121', flex: 1}}>
      <View style={styles.header}>
        <View
          style={{
            flexDirection: 'row',
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
            <Text style={styles.titleText}>Add Driver data info</Text>
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
              placeholder="Driver Name"
              placeholderTextColor="#ff9100"
              style={{marginLeft: 20, fontSize: 15, color: 'black'}}
              onChangeText={text => {
                setdata({
                  ...data,
                  name: text,
                });
              }}
            />
            <View style={styles.line}></View>
            <TextInput
              placeholder="Driver Number"
              placeholderTextColor="#ff9100"
              style={{marginLeft: 20, fontSize: 15, color: 'black'}}
              onChangeText={text => {
                setdata({
                  ...data,
                  number: text,
                });
              }}
            />
            <View style={styles.line}></View>
            <TextInput
              placeholder="how many car carrying"
              keyboardType="numeric"
              placeholderTextColor="#ff9100"
              style={{marginLeft: 20, fontSize: 15, color: 'black'}}
              onChangeText={text => {
                setdata({
                  ...data,
                  cartake: text,
                });
              }}
            />
            <View style={styles.line}></View>
            <View style={{marginLeft: 20}}>
              <Text style={{color: '#ff9100', fontSize: 15}}>
                Select Joinnig date :
              </Text>
              <DatePicker
                style={{
                  width: 200,
                  marginTop: 10,
                  marginBottom: 5,
                  color: 'white',
                }}
                date={joindate}
                maxDate={joindate}
                customStyles={{backgroundColor: '#212121'}}
                mode="date"
                placeholder="select date"
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
                onDateChange={setjoinDate}
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
                rightText={'Check driver hire for company'}
              />
            </View>
            <View style={styles.line}></View>
            <View style={{marginLeft: 20, marginTop: 5, marginBottom: 5}}>
              <Text style={{color: '#ff9100', marginBottom: 5, fontSize: 15}}>
                Which car carying
              </Text>
              <ModalDropdown
                options={['Model S', 'Ghost', 'Ferrari', 'Fortuner', 'Jeep']}
                multipleSelect={true}
                textStyle={{color: 'black', fontSize: 15}}
                dropdownStyle={{width: '30%'}}
                dropdownTextStyle={{fontSize: 15}}
              />
            </View>
            <View style={styles.line}></View>
            <TouchableOpacity onPress={Adddrive}>
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

export default Adddriver;

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
