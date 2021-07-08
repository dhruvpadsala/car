import React, {useState} from 'react';
import {View, Text, StyleSheet, Image, Dimensions,TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import * as Animatable from 'react-native-animatable';

export default function Getdeatils({route,navigation}) {
    const {item}=route.params
    const [data, setdata] = useState("required")
    const required=`While most garages offer general repairs and services, you can increase business by offering niche repairs which other auto body shops may not provide. Some examples of specialized repairs and services include repainting, detailing and collision repair`
    const done=`A mechanic will look at your car's condition and check parts for wear and tear, like brakes, oil, filters and engine belt. It's common for the garage to replace your oil filter as part of the service. They may recommend that you replace other car parts too.`
    const getdata=(status)=>{
        setdata(status)
    }
    return (
      <View style={{backgroundColor: '#ff9100', flex: 1}}>
        <View style={styles.header}>
          <Icon
            name="arrow-left"
            size={25}
            color="white"
            style={{margin: 10}}
            onPress={() => navigation.navigate("Garage")}
          />
        </View>
        <View style={styles.footer}>
          <View>
            <Image source={item.img} style={styles.img} />
          </View>
          <View
            style={{
              marginLeft: 10,
              flexDirection: 'row',
              justifyContent: 'space-around',
            }}>
            <View style={{flexDirection: 'column'}}>
              <Text style={{color: 'white', fontSize: 20}}>{item.model}</Text>
              <Text style={{color: 'white', fontSize: 25, fontWeight: 'bold'}}>
                {item.company}
              </Text>
            </View>
            <View
              style={{
                backgroundColor: '#ff9100',
                justifyContent: 'center',
                paddingHorizontal: 20,
                borderRadius: 20,
              }}>
              <Text
                style={{
                  fontSize: 20,
                  color: 'white',
                  fontWeight: 'bold',
                  padding: 10,
                }}>
                15550{' '}
                <Icon
                  name="rupee"
                  size={20}
                  color="white"
                  onPress={() => {
                    navigation.toggleDrawer();
                  }}
                />
              </Text>
            </View>
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
            <TouchableOpacity
              onPress={() => getdata('required')}
              style={data == 'required' ? styles.active : styles.inactive}>
              <Text
                style={{
                  color: 'white',
                  fontSize: 18,
                  justifyContent: 'center',
                }}>
                required
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => getdata('done')}
              style={data == 'done' ? styles.active : styles.inactive}>
              <Text
                style={{
                  color: 'white',
                  fontSize: 18,
                  justifyContent: 'center',
                }}>
                What done?
              </Text>
            </TouchableOpacity>
          </View>
          <View style={{margin: 10}}>
            <Text style={{color: 'white', fontSize: 18}}>
              {data == 'required' ? required : done}
            </Text>
          </View>
        </View>
      </View>
    );
}
const styles = StyleSheet.create({
  header: {
    flex: 1,
  },
  footer: {
    flex: 9,
    backgroundColor: '#212121',
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
  },
  img: {
    resizeMode: 'contain',
    width: Dimensions.get('window').width,
    borderRadius: 15,
  },
    active: {
      backgroundColor: '#ff9100',
      padding: 8,
      margin: 10,
      borderRadius: 20,
      paddingHorizontal: 20,
    },
    inactive: {
    borderColor: '#ff9100',
    borderWidth: 2,
    padding: 8,
    margin: 10,
    borderRadius: 20,
    paddingHorizontal: 20,
  },
});
