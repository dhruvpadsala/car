import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ImageBackground,
} from 'react-native';
import Icon from 'react-native-vector-icons/dist/FontAwesome';

export default function Detailing({route, navigation}) {
  // detailimg, subhead, driver, model, symbol, company, phonenumber;
  const item = route.params;
  console.log("item====",item)
  return (
    <View style={{flex: 1}}>
      <ImageBackground
        source={item.detailimg}
        style={{flex: 1, resizeMode: 'contain', opacity: 0.8}}>
        <View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: 5,
            }}>
            <Icon
              name="arrow-left"
              size={25}
              style={{marginLeft: 5}}
              color="white"
              onPress={() => navigation.goBack()}
            />
            <Text style={{color: 'white', fontSize: 25, fontWeight: 'bold'}}>
              {item.model}
            </Text>
            <Icon
              name="edit"
              size={27}
              color="white"
              style={{marginTop: 5, marginRight: 5}}
              onPress={() => navigation.navigate('Addcar', item)}
            />
          </View>
          <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <Text style={{color: '#ff9100', fontSize: 19, fontWeight: 'bold'}}>
              Registration Number And Date
            </Text>
          </View>

          <View style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
            <Text
              style={{
                color: '#ff9100',
                fontSize: 20,
                color: 'black',
                fontWeight: 'bold',
              }}>
              {item.carnumber}
            </Text>
            <Text
              style={{
                color: '#ff9100',
                fontSize: 20,
                color: 'black',
                fontWeight: 'bold',
              }}>
              19-Feb-2021
            </Text>
          </View>
          <View style={styles.line}></View>
          <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <Text style={{color: '#ff9100', fontSize: 19, fontWeight: 'bold'}}>
              Fuel Type
            </Text>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
              <Text
                style={{
                  color: '#ff9100',
                  fontSize: 20,
                  color: 'black',
                  fontWeight: 'bold',
                }}>
                {item.subhead}
              </Text>
            </View>
          </View>
          <View style={styles.line}></View>
          <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <Text style={{color: '#ff9100', fontSize: 19, fontWeight: 'bold'}}>
              Insurance Validity Up To
            </Text>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
              <Text
                style={{
                  color: '#ff9100',
                  fontSize: 20,
                  color: 'black',
                  fontWeight: 'bold',
                }}>
                {item.insurance.toLocaleDateString()}
              </Text>
            </View>
          </View>
          <View style={styles.line}></View>
          <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <Text style={{color: '#ff9100', fontSize: 19, fontWeight: 'bold'}}>
              Puc Up To
            </Text>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
              <Text
                style={{
                  color: '#ff9100',
                  fontSize: 20,
                  color: 'black',
                  fontWeight: 'bold',
                }}>
                {item.puc.toLocaleDateString()}
              </Text>
            </View>
          </View>
          <View style={styles.line}></View>
          <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <Text style={{color: '#ff9100', fontSize: 19, fontWeight: 'bold'}}>
              Owner And Driver
            </Text>
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
            <Text
              style={{
                color: '#ff9100',
                fontSize: 20,
                color: 'black',
                fontWeight: 'bold',
              }}>
              {item.owner}
            </Text>
            <Text
              style={{
                color: '#ff9100',
                fontSize: 20,
                color: 'black',
                fontWeight: 'bold',
              }}>
              {item.driver}
            </Text>
          </View>
          <View style={styles.line}></View>
        </View>
      </ImageBackground>
    </View>
  );
}
const styles = StyleSheet.create({
  line: {
    color: 'white',
    borderWidth: 1,
    borderColor: 'white',
    margin:10
  },
});
