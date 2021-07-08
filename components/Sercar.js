import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import Micon from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import {useNavigation} from '@react-navigation/native';

export default function Sercar(props) {
const navigation = useNavigation()
  return (  
    <View
      style={{
        backgroundColor: 'white',
        flex: 1,
        width: 260,
        borderRadius: 10,
        margin: 20,
        height: '95%',
        marginRight: 35,
      }}>
      <View style={{flex: 4}}>
        <Image
          source={props.item.img}
          style={{
            resizeMode: 'contain',
            width: '100%',
            // marginTop: 10,
            marginLeft: 35,
            height: '100%',
          }}
        />
      </View>
      <View style={{flex: 4, justifyContent: 'center'}}>
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            // marginTop: -35,
          }}>
          <Image
            source={props.item.symbol}
            style={{
              borderRadius: 70,
              height: 50,
              width: 50,
              resizeMode: 'contain',
              // marginRight: 10,
            }}
          />
          <View style={{flexDirection: 'column'}}>
            <Text
              style={{
                color: 'black',
                fontSize: 25,
                fontWeight: 'bold',
                // margin: 10,
              }}>
              {props.item.model}
            </Text>
            <Text
              style={{
                color: 'black',
                fontSize: 25,
                fontWeight: 'bold',
                // marginTop: 0,
              }}>
              {props.item.company}
            </Text>
          </View>
        </View>
        <View style={{flex: 1, flexDirection: 'column', marginTop: 10}}>
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'space-evenly',
              flexDirection: 'row',
            }}>
            <View
              style={{
                padding: 5,
                borderRadius: 10,
                backgroundColor: '#ffe0b2',
                alignItems: 'center',
              }}>
              <Micon name="gas-station" size={30} color="#ff9100" />
              <Text>56 km/h</Text>
            </View>
            <View
              style={{
                padding: 5,
                borderRadius: 10,
                backgroundColor: '#ffe0b2',
                alignItems: 'center',
              }}>
              <Icon name="cogs" size={30} color="#ff9100" />
              <View style={{alignItems: 'flex-start', flexDirection: 'row'}}>
                <Text style={{fontSize: 14, lineHeight: 20}}>5</Text>
                <Text style={{fontSize: 10, lineHeight: 15}}>th</Text>
                <Text style={{fontSize: 14, lineHeight: 20}}> Time</Text>
              </View>
            </View>
          </View>
        </View>
      </View>
      <View
        style={{
          flex: 2,
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 0,
        }}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Getdeatils', {item:props.item});
          }}>
          <View>
            <Text
              style={{
                fontWeight: '400',
                fontSize: 20,
                padding: 10,
                backgroundColor: 'black',
                // borderRadius: 15,
                paddingHorizontal: 50,
                color: '#ff9100',
              }}>
              Get Details
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  header: {
    flex: 1,
    justifyContent: 'center',
    // alignItems:'center',
  },
  footer: {
    flex: 8,
    marginBottom: 20,
  },
  img: {},
});
