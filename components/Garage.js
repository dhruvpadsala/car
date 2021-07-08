import React,{useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  FlatList,   
} from 'react-native';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import Micon from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import Sercar from './Sercar';
import Data from './Data';


export default function Garage({navigation}) {
  let filteredata = Data.filter(item=>item.garagestatus==true)
  // console.log('filtered data=====', filteredata);
  return (
    <View style={{backgroundColor: '#ff9100', flex: 1}}>
      <Icon
        name="arrow-left"
        size={25}
        color="white"
        style={{margin: 10}}
        onPress={() => navigation.navigate("Home")}
      />
      <View style={styles.header}>
        <Text
          style={{
            fontSize: 30,
            color: 'white',
            fontWeight: 'bold',
            marginLeft: 20,
            marginTop: -20,
          }}>
          See All Garage Vehicles
        </Text>
      </View>
      <View style={styles.footer}>
        <FlatList
          horizontal={true}
          data={filteredata}
          showsHorizontalScrollIndicator={false}
          renderItem={({item}) => {
            return <Sercar item={item} navigation={navigation} />;
          }}
          keyExtractor={item => item.id}
        />
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
});
