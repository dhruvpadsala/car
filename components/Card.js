import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  TextInput,
  AsyncStorage,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import * as Animatable from 'react-native-animatable';
import Details from './Details';
import Data from './Data';
import ActionButton from 'react-native-action-button';
import firestore from '@react-native-firebase/firestore';

const Card = ({route,navigation}) => {

  const [ison, setison] = useState('')
  const [data, setdata] = useState('All');
  const [cardata, setcardata] = useState(Data);
  const [searchbar, setsearchbar] = useState(false);
  const [searchresult, setsearchresult] = useState('');
  const [text, settext] = useState('');
  const [loading, setLoading] = useState(true);
  const [carf, setcarf] = useState([]);
  const ref = firestore().collection('Car');
  const actions = [
    {
      text: 'Accessibility',
      icon: <Icon name="car" size={25} color="white" />,
      name: 'bt_accessibility',
      position: 2,
    },
    {
      text: 'Language',
      icon: <Icon name="car" size={25} color="white" />,
      name: 'bt_language',
      position: 1,
    },
  ];
  useEffect(async () => {

  let isonic = await AsyncStorage.getItem('toggleval'); 
  console.log("isonic",isonic)
  setison(isonic === 'true')

    return ref.onSnapshot(querySnapshot => {
      const list = [];
      querySnapshot.forEach(doc => {
        const {
          carnameF,
          carnumberF,
          carownerF,
          fuelTypeF,
          insuranceDateF,
          pucDateF,
        } = doc.data();
        list.push({
          id: doc.id,
          carnameF,
          carnumberF,
          carownerF,
          fuelTypeF,
          insuranceDateF,
          pucDateF,
        });
      });
      setcarf(list);
      if (loading) {
        setLoading(false);
      }
      console.log('carf======data', list);
    });
  }, []);
  function funcavailable(status) {
    setdata(status);
    // console.log(data)
    if (status == 'All') {
      let filterData = Data.filter(item =>
        item.model.toLowerCase().match(text.toLowerCase()),
      );
      setcardata(filterData);
    } else {
      let filterData = Data.filter(
        item =>
          item.status == status &&
          item.model.toLowerCase().match(text.toLowerCase()),
      );
      setcardata(filterData);
      // console.log("filterdata==================",filterData)
    }
  }
  function searchres(searchtext) {
    settext(searchtext);
    console.log('setext=======', text);
    let filteredName;
    if (data == 'All') {
      filteredName = Data.filter(item =>
        item.model.toLowerCase().match(searchtext.toLowerCase()),
      );
      setcardata(filteredName);
    } else {
      filteredName = Data.filter(
        item =>
          item.status == data &&
          item.model.toLowerCase().match(searchtext.toLowerCase()),
      );
      setcardata(filteredName);
    }
  }
  return (
    <>
      <View style={ison ? styles.dark : styles.white}>
        <View
          style={{
            flexDirection: 'row',
            marginTop: 2,
            alignItems: 'center',
            height: 50,
          }}>
          <TouchableOpacity style={{alignItems: 'flex-start', marginLeft: 10}}>
            <Icon
              name="bars"
              size={25}
              style={ison ? styles.darkcontaint : styles.whitecontaint}
              // color={ison ? styles.darkcontaint : styles.whitecontaint}
              onPress={() => {
                navigation.toggleDrawer();
              }}
            />
          </TouchableOpacity>
          {searchbar == false ? (
            <View style={{alignItems: 'center', flex: 1}}>
              <Text
                style={[
                  {fontSize: 25, fontWeight: 'bold'},
                  ison ? styles.darkcontaint : styles.whitecontaint,
                ]}>
                Home
              </Text>
            </View>
          ) : (
            <View style={{alignItems: 'center', flex: 1}}>
              <Animatable.View
                animation="slideInDown"
                // iterationCount={5}
                direction="alternate"
                style={{width: '85%', alignItems: 'center'}}>
                <TextInput
                  style={[
                    {
                      borderRadius: 10,
                      borderWidth: 2,
                      // flex: 1,
                      width: '85%',
                      height: 40,
                      // padding:5,
                      fontSize: 15,
                      alignItems: 'center',
                    },
                    ison ? styles.darktxtinput : styles.whitetxtinput,
                  ]}
                  autoFocus={true}
                  onChangeText={text => {
                    searchres(text);
                  }}
                />
              </Animatable.View>
            </View>
          )}
          <TouchableOpacity
            style={{alignItems: 'flex-end', marginRight: 10}}
            onPress={() => {
              if (searchbar == true) {
                searchres('');
              }
              setsearchbar(!searchbar);
            }}>
            {searchbar == false ? (
              <Icon
                name="search"
                size={25}
                style={ison ? styles.darkcontaint : styles.whitecontaint}
                // color={ison ? styles.whitecontaint : styles.darkcontaint}
              />
            ) : (
              <Icon
                name="times-circle"
                size={25}
                style={ison ? styles.darkcontaint : styles.whitecontaint}
                // color={ison ? styles.whitecontaint : styles.darkcontaint}
              />
            )}
          </TouchableOpacity>
        </View>
        <View style={{flexDirection: 'row'}}>
          <ScrollView horizontal={true}>
            {/* <LinearGradient colors={['#4c669f', '#3b5998', '#192f6a']}> */}
            <TouchableOpacity
              style={data == 'Available' ? styles.active : styles.inactive}
              onPress={() => funcavailable('Available')}>
              <Text
                style={[
                  {fontSize: 18},
                  ison ? styles.darkcontaint : styles.whitecontaint,
                ]}>
                Available
              </Text>
            </TouchableOpacity>
            {/* </LinearGradient> */}
            <TouchableOpacity
              style={data == 'Unavailable' ? styles.active : styles.inactive}
              onPress={() => funcavailable('Unavailable')}>
              <Text
                style={[
                  {fontSize: 18},
                  ison ? styles.darkcontaint : styles.whitecontaint,
                ]}>
                Unavailable
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={data == 'All' ? styles.active : styles.inactive}
              onPress={() => funcavailable('All')}>
              <Text
                style={[
                  {fontSize: 18},
                  ison ? styles.darkcontaint : styles.whitecontaint,
                ]}>
                All
              </Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      <View style={[{flex: 1, width: '100%'},ison?styles.darkcontaint:styles.whitecontaint]}>
          <FlatList
            data={cardata}
            numColumns={2}
            style={{flex: 1, width: '100%'}}
            renderItem={({item}) => {
              return (
                <Details item={item} navigation={navigation} ison={ison} />
              );
            }}
            keyExtractor={item => item.id}
          />

          {/* Rest of the app comes ABOVE the action button component !*/}
          <ActionButton buttonColor="#ff9100" useNativeDriver={false}>
            <ActionButton.Item
              buttonColor="#9b59b6"
              title="Add Car"
              titleColor="white"
              titleBgColor="#212121"
              onPress={() => {
                navigation.navigate('Addcar');
              }}>
              <Icon name="car" style={styles.actionButtonIcon} />
            </ActionButton.Item>
            <ActionButton.Item
              buttonColor="#3498db"
              title="Add Driver"
              titleColor="white"
              titleBgColor="#212121"
              onPress={() => {
                navigation.navigate('Adddriver');
              }}>
              <Icon name="male" style={styles.actionButtonIcon} />
            </ActionButton.Item>
          </ActionButton>
        </View>
      </View>
    </>
  );
};
const styles = StyleSheet.create({
  dark: {flex: 1, backgroundColor: '#212121'},
  white: {flex: 1, backgroundColor: 'white'},
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: 'white',
  },
  active: {
    backgroundColor: '#ff9100',
    padding: 8,
    margin: 10,
    borderRadius: 20,
    paddingHorizontal: 20,
    color: 'black',
  },
  inactive: {
    borderColor: '#ff9100',
    borderWidth: 2,
    padding: 8,
    margin: 10,
    borderRadius: 20,
    paddingHorizontal: 20,
    color: 'black',
  },
  darkcontaint: {
    color: 'white',
  },
  whitecontaint: {
    color: 'black',
  },
  borderdark: {
    borderColor: 'white',
  },
  borderwhite: {
    borderColor: 'black',
  },
  darktxtinput: {
    borderColor: 'white',
    color: 'white',
  },
  whitetxtinput: {
    borderColor: 'black',
    color: 'black',
  },
});
export default Card;
